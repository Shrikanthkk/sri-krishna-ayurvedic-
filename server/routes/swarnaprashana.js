import { Router } from 'express';
import { query } from '../db.js';
import { verifyToken, requireAdmin } from '../middleware/auth.js';

const router = Router();

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

function formatRow(row) {
  let fullDateStr = '';
  if (row.full_date) {
    if (row.full_date instanceof Date) {
      fullDateStr = row.full_date.toISOString().split('T')[0];
    } else {
      fullDateStr = String(row.full_date).split('T')[0];
    }
  }

  return {
    id: row.id,
    month: row.month,
    date: String(row.date),
    year: parseInt(row.year, 10) || 2026,
    full_date: fullDateStr,
    status: row.status,
    display_order: parseInt(row.display_order, 10) || 1,
    created_at: row.created_at,
    updated_at: row.updated_at
  };
}

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

    sql += ` ORDER BY year ASC,
      CASE LOWER(month)
        WHEN 'january' THEN 1
        WHEN 'february' THEN 2
        WHEN 'march' THEN 3
        WHEN 'april' THEN 4
        WHEN 'may' THEN 5
        WHEN 'june' THEN 6
        WHEN 'july' THEN 7
        WHEN 'august' THEN 8
        WHEN 'september' THEN 9
        WHEN 'october' THEN 10
        WHEN 'november' THEN 11
        WHEN 'december' THEN 12
        ELSE display_order
      END ASC,
      CAST(date AS INTEGER) ASC`;

    const result = await query(sql, params);
    const mapped = result.rows.map(formatRow);

    return res.status(200).json({ success: true, data: mapped });
  } catch (err) {
    console.error('Error fetching swarnaprashana schedule:', err);
    return res.status(500).json({ success: false, error: 'Failed to retrieve Swarnaprashana schedule.' });
  }
});

// POST /api/swarnaprashana (Admin Create/Update Date)
router.post('/', async (req, res) => {
  try {
    const entry = req.body;
    if (!entry.month || entry.date === undefined || entry.date === null || entry.date === '') {
      return res.status(400).json({ success: false, error: 'Month and Date are required.' });
    }

    const numericYear = parseInt(entry.year, 10) || 2026;
    const numericDate = parseInt(entry.date, 10);
    const monthIndex = MONTHS.findIndex(m => m.toLowerCase() === String(entry.month).trim().toLowerCase()) + 1;

    if (monthIndex === 0) {
      return res.status(400).json({ success: false, error: 'Invalid month name specified.' });
    }

    const canonicalMonth = MONTHS[monthIndex - 1];
    const padMonth = String(monthIndex).padStart(2, '0');
    const padDate = String(numericDate).padStart(2, '0');
    const fullDate = entry.full_date || `${numericYear}-${padMonth}-${padDate}`;
    const id = entry.id || `psh-${numericYear}-${padMonth}`;

    // Duplicate Check: Verify whether that month/year already has a schedule entry under a different ID
    const dupCheck = await query(
      `SELECT id FROM swarnaprashana_schedule WHERE year = $1 AND LOWER(month) = LOWER($2) AND id != $3`,
      [numericYear, canonicalMonth, id]
    );

    if (dupCheck.rows.length > 0) {
      return res.status(409).json({
        success: false,
        error: `A schedule entry for ${canonicalMonth} ${numericYear} already exists in database.`
      });
    }

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
        canonicalMonth,
        String(numericDate),
        numericYear,
        fullDate,
        entry.status || 'Active',
        parseInt(entry.display_order, 10) || monthIndex
      ]
    );

    const isNew = !entry.id;
    return res.status(isNew ? 201 : 200).json({
      success: true,
      data: formatRow(result.rows[0]),
      message: 'Pushya Nakshatra date saved successfully.'
    });
  } catch (err) {
    if (err.code === '23505') { // PostgreSQL Unique Violation
      return res.status(409).json({
        success: false,
        error: `A schedule entry for ${req.body.month || ''} ${req.body.year || 2026} already exists.`
      });
    }
    console.error('Error saving swarnaprashana date:', err);
    return res.status(500).json({ success: false, error: 'Failed to save date in database.' });
  }
});

// PUT /api/swarnaprashana/:id (Admin Edit Date)
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const entry = { ...req.body, id };

    if (!entry.month || entry.date === undefined || entry.date === null || entry.date === '') {
      return res.status(400).json({ success: false, error: 'Month and Date are required.' });
    }

    const numericYear = parseInt(entry.year, 10) || 2026;
    const numericDate = parseInt(entry.date, 10);
    const monthIndex = MONTHS.findIndex(m => m.toLowerCase() === String(entry.month).trim().toLowerCase()) + 1;

    if (monthIndex === 0) {
      return res.status(400).json({ success: false, error: 'Invalid month name specified.' });
    }

    const canonicalMonth = MONTHS[monthIndex - 1];
    const padMonth = String(monthIndex).padStart(2, '0');
    const padDate = String(numericDate).padStart(2, '0');
    const fullDate = entry.full_date || `${numericYear}-${padMonth}-${padDate}`;

    // Check duplicate
    const dupCheck = await query(
      `SELECT id FROM swarnaprashana_schedule WHERE year = $1 AND LOWER(month) = LOWER($2) AND id != $3`,
      [numericYear, canonicalMonth, id]
    );

    if (dupCheck.rows.length > 0) {
      return res.status(409).json({
        success: false,
        error: `A schedule entry for ${canonicalMonth} ${numericYear} already exists in database.`
      });
    }

    const result = await query(
      `UPDATE swarnaprashana_schedule
        SET month = $1, date = $2, year = $3, full_date = $4, status = $5, display_order = $6, updated_at = CURRENT_TIMESTAMP
        WHERE id = $7
        RETURNING *`,
      [
        canonicalMonth,
        String(numericDate),
        numericYear,
        fullDate,
        entry.status || 'Active',
        parseInt(entry.display_order, 10) || monthIndex,
        id
      ]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, error: 'Schedule entry not found in database.' });
    }

    return res.status(200).json({
      success: true,
      data: formatRow(result.rows[0]),
      message: 'Pushya Nakshatra date updated.'
    });
  } catch (err) {
    if (err.code === '23505') {
      return res.status(409).json({
        success: false,
        error: `A schedule entry for ${req.body.month || ''} ${req.body.year || 2026} already exists.`
      });
    }
    console.error('Error updating swarnaprashana date:', err);
    return res.status(500).json({ success: false, error: 'Failed to update date in database.' });
  }
});

// PATCH /api/swarnaprashana/:id/status (Admin Toggle/Set Status)
router.patch('/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body || {};

    let result;
    if (status && (status === 'Active' || status === 'Inactive')) {
      result = await query(
        `UPDATE swarnaprashana_schedule
          SET status = $1, updated_at = CURRENT_TIMESTAMP
          WHERE id = $2
          RETURNING *`,
        [status, id]
      );
    } else {
      result = await query(
        `UPDATE swarnaprashana_schedule
          SET status = CASE WHEN status = 'Active' THEN 'Inactive' ELSE 'Active' END,
              updated_at = CURRENT_TIMESTAMP
          WHERE id = $1
          RETURNING *`,
        [id]
      );
    }

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, error: 'Schedule entry not found in database.' });
    }

    return res.status(200).json({
      success: true,
      data: formatRow(result.rows[0]),
      message: `Status updated to ${result.rows[0].status}.`
    });
  } catch (err) {
    console.error('Error toggling date status:', err);
    return res.status(500).json({ success: false, error: 'Failed to update status in database.' });
  }
});

// DELETE /api/swarnaprashana/:id (Admin Delete)
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await query('DELETE FROM swarnaprashana_schedule WHERE id = $1 RETURNING id', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, error: 'Schedule entry not found in database.' });
    }

    return res.status(200).json({ success: true, message: 'Schedule entry deleted permanently from database.' });
  } catch (err) {
    console.error('Error deleting swarnaprashana date:', err);
    return res.status(500).json({ success: false, error: 'Failed to delete schedule entry from database.' });
  }
});

export default router;
