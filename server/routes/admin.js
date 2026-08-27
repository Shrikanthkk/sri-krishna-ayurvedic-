import { Router } from 'express';
import { seedDatabase } from '../scripts/seed.js';
import { verifyToken, requireAdmin } from '../middleware/auth.js';

const router = Router();

// POST /api/admin/reset-demo
router.post('/reset-demo', async (req, res) => {
  try {
    await seedDatabase({ closePool: false });
    return res.json({ success: true, message: 'Admin database reset to demo baseline.' });
  } catch (err) {
    console.error('Error resetting admin data:', err);
    return res.status(500).json({ success: false, error: 'Failed to reset database.' });
  }
});

export default router;
