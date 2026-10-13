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

export const defaultTreatments = [
  {
    id: "joint-pain-arthritis",
    number: "01",
    title: "Chronic Diseases – Joint Pains (Arthritis)",
    subtitle: "Supportive Musculoskeletal Care",
    image: "/images/joint_pain_arthritis.png",
    description: "Ayurvedic therapy and herbal poultices for joint stiffness, mobility, and arthritis relief.",
    link: "/treatments/joint-pain-arthritis",
    benefits: ["Relieves joint stiffness & discomfort", "Supports mobility & flexibility", "Classical botanical applications"],
    duration: "45 - 60 Min Sessions"
  },
  {
    id: "skin-problems",
    number: "02",
    title: "Skin Problems",
    subtitle: "Ayurvedic Skin Wellness",
    image: "/images/skin_problems.png",
    description: "Personalized herbal Lepas and blood purification for healthy, glowing skin.",
    link: "/treatments/skin-problems",
    benefits: ["Balances Pitta & Rakta Dhatu", "Herbal Lepas & botanicals", "Dietary harmonization"],
    duration: "Personalized Care"
  },
  {
    id: "hair-fall",
    number: "03",
    title: "Alopecia (Hair Fall)",
    subtitle: "Ayurvedic Hair & Scalp Care",
    image: "/images/hair_fall.jpg",
    description: "Ayurvedic scalp oil therapies (Shiro Abhyanga) for alopecia, hair fall, and deep nourishment.",
    link: "/treatments/hair-fall",
    benefits: ["Addresses Khalitya & Palitya", "Shiro Abhyanga & botanical oils", "Deep scalp nourishment"],
    duration: "Therapeutic Regimen"
  },
  {
    id: "sexual-disorders",
    number: "04",
    title: "Sexual Disorders",
    subtitle: "Ayurvedic Wellness Support",
    image: "/images/consultation.png",
    description: "Personalized Ayurvedic wellness for vitality, reproductive balance, and stress relief.",
    link: "/treatments/sexual-disorders",
    benefits: ["Vajikarana & Shukra balance", "Vitality & stress management", "Confidential consultation"],
    duration: "Private Consultation"
  },
  {
    id: "de-addiction",
    number: "05",
    title: "De-addiction",
    subtitle: "Recovery & Wellness Support",
    image: "/images/de_addiction.png",
    description: "Holistic lifestyle, detoxification, and mind-calming Ayurvedic recovery support.",
    link: "/treatments/de-addiction",
    benefits: ["Dinacharya routine building", "Calming yoga & Pranayama", "Metabolic restoration"],
    duration: "Supportive Program"
  },
  {
    id: "diabetes",
    number: "06",
    title: "Diabetes",
    subtitle: "Metabolic Wellness Support",
    image: "/images/diabetes.jpg",
    description: "Metabolic and lifestyle support for healthy glycemic balance and digestive Agni.",
    link: "/treatments/diabetes",
    benefits: ["Madhumeha & Prameha care", "Optimizes Agni & metabolism", "Glycemic lifestyle support"],
    duration: "Long-term Wellness"
  },
  {
    id: "cancer-treatment",
    number: "07",
    title: "Cancer Treatment – All Types of Cancers",
    subtitle: "Supportive & Adjunct Care",
    image: "/images/cancer_treatment.jpg",
    description: "Supportive Ayurvedic wellness to enhance vitality, comfort, and quality of life.",
    link: "/treatments/cancer-treatment",
    benefits: ["Vitality & comfort support", "Digestive ease & nutrition", "Integrative coordination"],
    duration: "Supportive Consultation"
  },
  {
    id: "swarnaprashana",
    number: "08",
    title: "Swarnaprashana",
    subtitle: "Traditional Ayurvedic Child Wellness",
    image: "/images/swarnaprashana_child.png",
    description: "Traditional child immunity drops administered on Pushya Nakshatra under Ayurvedic guidance.",
    link: "/treatments/swarnaprashana",
    benefits: ["For children (0–16 Years)", "Given on Pushya Nakshatra", "Nurtures immunity & intellect"],
    duration: "Periodic Administration"
  },
  {
    id: "reduce-obesity",
    number: "09",
    title: "Reduce Obesity (Sthoulya & Weight Management)",
    subtitle: "Metabolic Fat Loss & Medoroga Care",
    image: "/images/reduce_obesity.jpg",
    description: "Ayurvedic weight management with Udwarthanam herbal powder therapies and metabolic detox.",
    link: "/treatments/reduce-obesity",
    benefits: ["Udwarthanam herbal scraping", "Visceral metabolic detox", "Revitalizes fat metabolism"],
    duration: "Personalized Program"
  },
  {
    id: "vitiligo",
    number: "10",
    title: "Vitiligo & White Patches (Shvitra Care)",
    subtitle: "Shvitra & Leucoderma • Skin Repigmentation",
    image: "/images/vitiligo_treatment.jpg",
    description: "Classical Shvitra care with Bakuchi herbal lepams and natural skin re-pigmentation support.",
    link: "/treatments/vitiligo",
    benefits: ["Bakuchi & Manjistha herbs", "Blood purification detox", "Stimulates natural pigment"],
    duration: "Personalized Protocol"
  },
  {
    id: "physiotherapy",
    number: "11",
    title: "Physiotherapy & Musculoskeletal Rehabilitation",
    subtitle: "Spine, Joint & Neurological Recovery",
    image: "/images/physiotherapy_rehab.jpg",
    description: "Integrated musculoskeletal rehabilitation, spine mobilization, and specialized Basti therapies.",
    link: "/treatments/physiotherapy",
    benefits: ["Spine decompression & mobility", "Kati Basti & Janu Basti", "Post-stroke & nerve recovery"],
    duration: "Therapeutic Sessions"
  }
];

// GET /api/treatments
router.get('/', async (req, res) => {
  try {
    const result = await query('SELECT * FROM treatments WHERE is_active = true ORDER BY number ASC, created_at ASC');
    if (result && result.rows && result.rows.length > 0) {
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
    }
    // Return fallback if table has no active rows
    return res.json({ success: true, data: defaultTreatments, fallback: true });
  } catch (err) {
    console.warn('Error fetching treatments from PostgreSQL, serving default treatments:', err.message);
    return res.json({ success: true, data: defaultTreatments, fallback: true });
  }
});

// POST /api/treatments (Admin Save / Edit)
router.post('/', async (req, res) => {
  try {
    const item = req.body;
    if (!item || !item.title) {
      return res.status(400).json({ success: false, error: 'Treatment title is required.' });
    }

    const id = item.id || 'treatment-' + Date.now();
    const countRes = await query('SELECT COUNT(*) FROM treatments');
    const total = parseInt(countRes.rows[0].count, 10);
    const number = item.number || String(total + 1).padStart(2, '0');
    const benefitsJson = JSON.stringify(
      Array.isArray(item.benefits) && item.benefits.length > 0
        ? item.benefits
        : ['Authentic Ayurvedic care', 'Root-cause relief']
    );

    const result = await query(
      `INSERT INTO treatments (id, number, title, subtitle, description, benefits, duration, image, link, is_active)
        VALUES ($1, $2, $3, $4, $5, $6::jsonb, $7, $8, $9, true)
        ON CONFLICT (id) DO UPDATE SET
          number    = EXCLUDED.number,
          title     = EXCLUDED.title,
          subtitle  = EXCLUDED.subtitle,
          description = EXCLUDED.description,
          benefits  = EXCLUDED.benefits,
          duration  = EXCLUDED.duration,
          image     = CASE 
            WHEN EXCLUDED.image IS NOT NULL AND EXCLUDED.image != '' THEN EXCLUDED.image 
            ELSE treatments.image 
          END,
          link      = COALESCE(EXCLUDED.link, treatments.link),
          is_active = true,
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

    const saved = result.rows[0];
    return res.json({
      success: true,
      data: {
        id: saved.id,
        number: saved.number,
        title: saved.title,
        subtitle: saved.subtitle,
        description: saved.description,
        benefits: typeof saved.benefits === 'string' ? JSON.parse(saved.benefits) : saved.benefits || [],
        duration: saved.duration,
        image: saved.image,
        link: saved.link
      },
      message: 'Treatment saved successfully to PostgreSQL database.'
    });
  } catch (err) {
    console.error('Error saving treatment to PostgreSQL:', err);
    return res.status(500).json({ success: false, error: `Failed to save treatment: ${err.message}` });
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
