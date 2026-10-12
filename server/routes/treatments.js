import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { query } from '../db.js';
import { verifyToken, requireAdmin } from '../middleware/auth.js';

const router = Router();

// Configure Multer in-memory storage for Serverless & Vercel compatibility
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml'];
  if (allowedTypes.includes(file.mimetype.toLowerCase())) {
    cb(null, true);
  } else {
    cb(new Error('Only JPG, JPEG, PNG, GIF, SVG, and WebP image files are allowed.'));
  }
};

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB maximum
  fileFilter
});

// POST /api/treatments/upload (Upload Treatment Image)
router.post('/upload', (req, res) => {
  upload.single('image')(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({ success: false, error: 'Image size exceeds 10 MB limit.' });
      }
      return res.status(400).json({ success: false, error: `Upload error: ${err.message}` });
    } else if (err) {
      return res.status(400).json({ success: false, error: err.message || 'Invalid file uploaded.' });
    }

    if (!req.file) {
      return res.status(400).json({ success: false, error: 'No image file provided.' });
    }

    // Convert buffer to Base64 Data URL for serverless resilience
    const base64 = req.file.buffer.toString('base64');
    const imageUrl = `data:${req.file.mimetype};base64,${base64}`;

    return res.json({
      success: true,
      url: imageUrl,
      filename: req.file.originalname,
      size: req.file.size,
      mimetype: req.file.mimetype,
      message: 'Treatment image processed successfully.'
    });
  });
});

// GET /api/treatments
router.get('/', async (req, res) => {
  try {
    const result = await query('SELECT * FROM treatments WHERE is_active = true ORDER BY number ASC, created_at ASC');
    const mapped = result.rows.map(row => {
      let parsedBenefits = [];
      if (Array.isArray(row.benefits)) {
        parsedBenefits = row.benefits;
      } else if (row.benefits && typeof row.benefits === 'object') {
        parsedBenefits = Array.isArray(row.benefits) ? row.benefits : Object.values(row.benefits);
      } else if (typeof row.benefits === 'string') {
        try {
          const p = JSON.parse(row.benefits);
          parsedBenefits = Array.isArray(p) ? p : [p];
        } catch {
          parsedBenefits = [row.benefits];
        }
      }

      return {
        id: row.id,
        number: row.number,
        title: row.title,
        subtitle: row.subtitle,
        description: row.description,
        benefits: parsedBenefits,
        duration: row.duration,
        image: row.image,
        link: row.link
      };
    });
    return res.json({ success: true, data: mapped });
  } catch (err) {
    console.error('Error fetching treatments from PostgreSQL:', err);
    return res.status(500).json({ success: false, error: err.message, data: [] });
  }
});

// POST /api/treatments (Admin Save / Edit)
router.post('/', async (req, res) => {
  try {
    const item = req.body;
    if (!item.title) {
      return res.status(400).json({ success: false, error: 'Treatment title is required.' });
    }

    const id = item.id || 'treatment-' + Date.now();
    const countRes = await query('SELECT COUNT(*) FROM treatments');
    const total = parseInt(countRes.rows[0].count, 10);
    const number = item.number || String(total + 1).padStart(2, '0');
    const benefitsJson = JSON.stringify(item.benefits || ["Authentic Ayurvedic care", "Root-cause relief"]);

    const result = await query(
      `INSERT INTO treatments (id, number, title, subtitle, description, benefits, duration, image, link, is_active)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, true)
        ON CONFLICT (id) DO UPDATE SET
          title = EXCLUDED.title,
          subtitle = EXCLUDED.subtitle,
          description = EXCLUDED.description,
          benefits = EXCLUDED.benefits,
          duration = EXCLUDED.duration,
          image = CASE 
            WHEN EXCLUDED.image IS NOT NULL AND EXCLUDED.image != '' THEN EXCLUDED.image 
            ELSE treatments.image 
          END,
          link = COALESCE(EXCLUDED.link, treatments.link),
          updated_at = CURRENT_TIMESTAMP
        RETURNING *`,
      [
        id,
        number,
        item.title.trim(),
        item.subtitle || 'Ayurvedic Care',
        item.description || 'Custom treatment protocol prepared by Dr. Anand Krishna.',
        benefitsJson,
        item.duration || '45 Minutes',
        item.image || '/images/hero_adobe_5.jpg',
        item.link || '/treatments/' + id
      ]
    );

    return res.json({ success: true, data: result.rows[0], message: 'Treatment saved successfully.' });
  } catch (err) {
    console.error('Error saving treatment:', err);
    return res.status(500).json({ success: false, error: 'Failed to save treatment.' });
  }
});

// DELETE /api/treatments/:id (Admin)
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await query('DELETE FROM treatments WHERE id = $1 RETURNING id', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, error: 'Treatment not found.' });
    }

    return res.json({ success: true, message: 'Treatment removed successfully.' });
  } catch (err) {
    console.error('Error deleting treatment:', err);
    return res.status(500).json({ success: false, error: 'Failed to delete treatment.' });
  }
});

export default router;
