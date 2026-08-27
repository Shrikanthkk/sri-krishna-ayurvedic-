import { Router } from 'express';
import { query } from '../db.js';
import { verifyToken, requireAdmin } from '../middleware/auth.js';

const router = Router();

// GET /api/appointments (Admin)
router.get('/', async (req, res) => {
  try {
    const { status, search } = req.query;
    let sql = 'SELECT * FROM appointments';
    const params = [];
    const conditions = [];

    if (status && status !== 'all') {
      params.push(status);
      conditions.push(`status = $${params.length}`);
    }

    if (search) {
      params.push(`%${search.trim()}%`);
      conditions.push(`(name ILIKE $${params.length} OR phone ILIKE $${params.length} OR treatment ILIKE $${params.length} OR email ILIKE $${params.length})`);
    }

    if (conditions.length > 0) {
      sql += ' WHERE ' + conditions.join(' AND ');
    }

    sql += ' ORDER BY created_at DESC';

    const result = await query(sql, params);
    
    // Map date format for frontend compatibility
    const mapped = result.rows.map(row => ({
      id: row.id,
      name: row.name,
      phone: row.phone,
      email: row.email,
      treatment: row.treatment,
      date: row.date ? new Date(row.date).toISOString().split('T')[0] : '',
      timeSlot: row.time_slot,
      status: row.status,
      notes: row.notes,
      submittedAt: row.submitted_at || (row.created_at ? new Date(row.created_at).toLocaleString('en-IN') : '')
    }));

    return res.json({ success: true, data: mapped });
  } catch (err) {
    console.error('Error fetching appointments:', err);
    return res.status(500).json({ success: false, error: 'Failed to retrieve appointments.' });
  }
});

// POST /api/appointments (Public booking)
router.post('/', async (req, res) => {
  try {
    const { name, phone, email, treatment, date, timeSlot, notes, message } = req.body;

    if (!name || !phone) {
      return res.status(400).json({ success: false, error: 'Full Name and Phone Number are required.' });
    }

    const id = 'apt-' + Date.now();
    const formattedDate = date || new Date().toISOString().split('T')[0];
    const formattedTimeSlot = timeSlot || '10:00 AM';
    const appointmentNotes = notes || message || 'Online consultation booking';
    const submittedAt = new Date().toLocaleString('en-IN', { dateStyle: 'short', timeStyle: 'short' });

    const result = await query(
      `INSERT INTO appointments (id, name, phone, email, treatment, date, time_slot, status, notes, submitted_at)
        VALUES ($1, $2, $3, $4, $5, $6, $7, 'Pending', $8, $9)
        RETURNING *`,
      [id, name.trim(), phone.trim(), email ? email.trim() : null, treatment || 'General Consultation', formattedDate, formattedTimeSlot, appointmentNotes, submittedAt]
    );

    const row = result.rows[0];
    const newApt = {
      id: row.id,
      name: row.name,
      phone: row.phone,
      email: row.email,
      treatment: row.treatment,
      date: row.date ? new Date(row.date).toISOString().split('T')[0] : formattedDate,
      timeSlot: row.time_slot,
      status: row.status,
      notes: row.notes,
      submittedAt: row.submitted_at
    };

    return res.status(201).json({ success: true, data: newApt, message: 'Appointment booked successfully!' });
  } catch (err) {
    console.error('Error saving appointment:', err);
    return res.status(500).json({ success: false, error: 'Failed to book appointment.' });
  }
});

// PATCH /api/appointments/:id/status (Admin)
router.patch('/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ success: false, error: 'Status is required.' });
    }

    const result = await query(
      `UPDATE appointments SET status = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *`,
      [status, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, error: 'Appointment not found.' });
    }

    return res.json({ success: true, data: result.rows[0], message: 'Appointment status updated.' });
  } catch (err) {
    console.error('Error updating appointment status:', err);
    return res.status(500).json({ success: false, error: 'Failed to update appointment.' });
  }
});

// DELETE /api/appointments/:id (Admin)
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await query('DELETE FROM appointments WHERE id = $1 RETURNING id', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, error: 'Appointment not found.' });
    }

    return res.json({ success: true, message: 'Appointment deleted successfully.' });
  } catch (err) {
    console.error('Error deleting appointment:', err);
    return res.status(500).json({ success: false, error: 'Failed to delete appointment.' });
  }
});

export default router;
