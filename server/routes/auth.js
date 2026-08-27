import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { query } from '../db.js';
import { verifyToken } from '../middleware/auth.js';

const router = Router();

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { username, email, password, pin } = req.body;
    const loginIdentifier = (email || username || '').trim();
    const loginSecret = password || pin || '';

    if (!loginIdentifier || !loginSecret) {
      return res.status(400).json({ success: false, error: 'Username/Email and Password/PIN are required.' });
    }

    // Exact match lookup by email or username
    const result = await query(
      `SELECT id, name, email, phone, password_hash, role, is_active 
        FROM users 
        WHERE (LOWER(email) = LOWER($1) OR LOWER(name) = LOWER($1)) AND is_active = true 
        LIMIT 1`,
      [loginIdentifier]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ success: false, error: 'Invalid credentials.' });
    }

    const user = result.rows[0];
    const isMatch = await bcrypt.compare(loginSecret, user.password_hash);

    if (!isMatch) {
      return res.status(401).json({ success: false, error: 'Invalid credentials.' });
    }

    const secret = process.env.JWT_SECRET || 'sri_krishna_ayurvedic_super_secure_jwt_secret_key_2026';
    const token = jwt.sign(
      { id: user.id, name: user.name, email: user.email, role: user.role },
      secret,
      { expiresIn: '7d' }
    );

    return res.json({
      success: true,
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role
      }
    });
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ success: false, error: 'Internal server error during authentication.' });
  }
});

// POST /api/auth/register
router.post('/register', async (req, res) => {
  try {
    const { name, email, phone, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, error: 'Name, Email, and Password are required.' });
    }

    const normalizedEmail = email.trim().toLowerCase();

    // Check if email exists
    const existing = await query('SELECT id FROM users WHERE LOWER(email) = LOWER($1)', [normalizedEmail]);
    if (existing.rows.length > 0) {
      return res.status(409).json({ success: false, error: 'An account with this email already exists.' });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const userRole = role === 'admin' ? 'admin' : 'user';

    const insertResult = await query(
      `INSERT INTO users (name, email, phone, password_hash, role, is_active)
        VALUES ($1, $2, $3, $4, $5, true)
        RETURNING id, name, email, phone, role, created_at`,
      [name.trim(), normalizedEmail, phone || null, passwordHash, userRole]
    );

    const newUser = insertResult.rows[0];

    const secret = process.env.JWT_SECRET || 'sri_krishna_ayurvedic_super_secure_jwt_secret_key_2026';
    const token = jwt.sign(
      { id: newUser.id, name: newUser.name, email: newUser.email, role: newUser.role },
      secret,
      { expiresIn: '7d' }
    );

    return res.status(201).json({
      success: true,
      token,
      user: newUser
    });
  } catch (err) {
    console.error('Registration error:', err);
    return res.status(500).json({ success: false, error: 'Internal server error during registration.' });
  }
});

// GET /api/auth/me
router.get('/me', verifyToken, async (req, res) => {
  try {
    const result = await query(
      'SELECT id, name, email, phone, role, created_at FROM users WHERE id = $1 AND is_active = true',
      [req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, error: 'User not found or deactivated.' });
    }

    return res.json({ success: true, user: result.rows[0] });
  } catch (err) {
    console.error('Auth verification error:', err);
    return res.status(500).json({ success: false, error: 'Internal server error.' });
  }
});

export default router;
