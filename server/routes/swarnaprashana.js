import { Router } from 'express';
import { query } from '../db.js';
import { verifyToken, requireAdmin } from '../middleware/auth.js';

const router = Router();

// GET /api/swarnaprashana
router.get('/', async (req, res) => {
  try {
    const { year, activeOnly } = req.query;
    let sql = 'SELECT * FROM swarnaprashana_schedule';
    const params = [];
    const conditions = [];

    if (activeOnly === 'true') {
      conditions.push("status = 'Active'");
    }

    if (year && year !== 'all') {
      params.push(parseInt(year, 10));
      conditions.push(`year = $${params.length}`);
    }

    if (conditions.length > 0) {
      sql += ' WHERE ' + conditions.join(' AND ');
    }

    sql += ' ORDER BY year ASC, display_order ASC, full_date ASC';

    const result = await query(sql, params);
    const mapped = result.rows.map(row => ({
      id: row.id,
      month: row.month,
      date: row.date,
      year: row.year,
      full_date: row.full_date ? new Date(row.full_date).toISOString().split('T')[0] : '',
      status: row.status,
      display_order: row.display_order,
      created_at: row.created_at,
      updated_at: row.updated_at
    }));

    return res.json({ success: true, data: mapped });
  } catch (err) {
    console.error('Error fetching swarnaprashana schedule:', err);
    return res.status(500).json({ success: false, error: 'Failed to retrieve Swarnaprashana schedule.' });
  }
});

// POST /api/swarnaprashana (Admin Add/Edit Date)
router.post('/', async (req, res) => {
  try {
    const entry = req.body;
    if (!entry.month || !entry.date) {
      return res.status(400).json({ success: false, error: 'Month and Date are required.' });
    }

    const id = entry.id || 'psh-' + Date.now();
    const numericYear = parseInt(entry.year, 10) || 2026;
    const numericDate = parseInt(entry.date, 10);
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const monthIndex = months.indexOf(entry.month) + 1;
    const padMonth = String(monthIndex).padStart(2, '0');
    const padDate = String(numericDate).padStart(2, '0');
    const fullDate = entry.full_date || `${numericYear}-${padMonth}-${padDate}`;

    const result = await query(
      `INSERT INTO swarnaprashana_schedule (id, month, date, year, full_date, status, display_order)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        ON CONFLICT (id) DO UPDATE SET
          month = EXCLUDED.month,
          date = EXCLUDED.date,
          year = EXCLUDED.year,
          full_date = EXCLUDED.full_date,
          status = EXCLUDED.status,
          display_order = EXCLUDED.display_order,
          updated_at = CURRENT_TIMESTAMP
        RETURNING *`,
      [
        id,
        entry.month,
        String(numericDate),
        numericYear,
        fullDate,
        entry.status || 'Active',
        parseInt(entry.display_order, 10) || 1
      ]
    );

    return res.json({ success: true, data: result.rows[0], message: 'Pushya Nakshatra date saved.' });
  } catch (err) {
    console.error('Error saving swarnaprashana date:', err);
    return res.status(500).json({ success: false, error: 'Failed to save date.' });
  }
});

// PATCH /api/swarnaprashana/:id/status (Admin Toggle)
router.patch('/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await query(
      `UPDATE swarnaprashana_schedule
        SET status = CASE WHEN status = 'Active' THEN 'Inactive' ELSE 'Active' END,
            updated_at = CURRENT_TIMESTAMP
        WHERE id = $1
        RETURNING *`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, error: 'Date not found.' });
    }

    return res.json({ success: true, data: result.rows[0], message: 'Status toggled.' });
  } catch (err) {
    console.error('Error toggling date status:', err);
    return res.status(500).json({ success: false, error: 'Failed to toggle status.' });
  }
});

// DELETE /api/swarnaprashana/:id (Admin)
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await query('DELETE FROM swarnaprashana_schedule WHERE id = $1 RETURNING id', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, error: 'Date not found.' });
    }

    return res.json({ success: true, message: 'Date removed.' });
  } catch (err) {
    console.error('Error deleting swarnaprashana date:', err);
    return res.status(500).json({ success: false, error: 'Failed to delete date.' });
  }
});

export default router;
