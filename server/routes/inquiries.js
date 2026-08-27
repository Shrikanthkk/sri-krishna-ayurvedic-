import { Router } from 'express';
import { query } from '../db.js';
import { verifyToken, requireAdmin } from '../middleware/auth.js';

const router = Router();

// GET /api/inquiries (Admin)
router.get('/', async (req, res) => {
  try {
    const result = await query('SELECT * FROM inquiries ORDER BY created_at DESC');
    const mapped = result.rows.map(row => ({
      id: row.id,
      name: row.name,
      phone: row.phone,
      email: row.email,
      subject: row.subject,
      message: row.message,
      read: row.is_read,
      submittedAt: row.submitted_at || (row.created_at ? new Date(row.created_at).toLocaleString('en-IN') : '')
    }));

    return res.json({ success: true, data: mapped });
  } catch (err) {
    console.error('Error fetching inquiries:', err);
    return res.status(500).json({ success: false, error: 'Failed to retrieve inquiries.' });
  }
});

// POST /api/inquiries (Public contact message)
router.post('/', async (req, res) => {
  try {
    const { name, fullName, phone, email, subject, message, preferredDate, preferredTime } = req.body;
    const visitorName = (name || fullName || '').trim();
    const visitorPhone = (phone || '').trim();

    if (!visitorName || !visitorPhone) {
      return res.status(400).json({ success: false, error: 'Name and Phone number are required.' });
    }

    const id = 'inq-' + Date.now();
    const inquirySubject = subject || (preferredDate ? `Consultation Request for ${preferredDate} (${preferredTime || 'Standard'})` : 'General Inquiry');
    const inquiryMessage = message || (preferredDate ? `Requested preferred date: ${preferredDate}, time slot: ${preferredTime || '10:00 AM - 1:00 PM'}` : 'No additional message provided.');
    const submittedAt = new Date().toLocaleString('en-IN', { dateStyle: 'short', timeStyle: 'short' });

    const result = await query(
      `INSERT INTO inquiries (id, name, phone, email, subject, message, is_read, submitted_at)
        VALUES ($1, $2, $3, $4, $5, $6, false, $7)
        RETURNING *`,
      [id, visitorName, visitorPhone, email ? email.trim() : null, inquirySubject, inquiryMessage, submittedAt]
    );

    const row = result.rows[0];
    const newInq = {
      id: row.id,
      name: row.name,
      phone: row.phone,
      email: row.email,
      subject: row.subject,
      message: row.message,
      read: row.is_read,
      submittedAt: row.submitted_at
    };

    return res.status(201).json({ success: true, data: newInq, message: 'Inquiry submitted successfully!' });
  } catch (err) {
    console.error('Error saving inquiry:', err);
    return res.status(500).json({ success: false, error: 'Failed to submit inquiry.' });
  }
});

// PATCH /api/inquiries/:id/read (Admin)
router.patch('/:id/read', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await query(
      `UPDATE inquiries SET is_read = NOT is_read, updated_at = CURRENT_TIMESTAMP WHERE id = $1 RETURNING *`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, error: 'Inquiry not found.' });
    }

    return res.json({ success: true, data: result.rows[0], message: 'Inquiry read status updated.' });
  } catch (err) {
    console.error('Error toggling inquiry read status:', err);
    return res.status(500).json({ success: false, error: 'Failed to update inquiry.' });
  }
});

// DELETE /api/inquiries/:id (Admin)
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await query('DELETE FROM inquiries WHERE id = $1 RETURNING id', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, error: 'Inquiry not found.' });
    }

    return res.json({ success: true, message: 'Inquiry deleted successfully.' });
  } catch (err) {
    console.error('Error deleting inquiry:', err);
    return res.status(500).json({ success: false, error: 'Failed to delete inquiry.' });
  }
});

export default router;
