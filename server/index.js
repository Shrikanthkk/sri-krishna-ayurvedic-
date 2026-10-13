import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import authRoutes from './routes/auth.js';
import appointmentsRoutes from './routes/appointments.js';
import inquiriesRoutes from './routes/inquiries.js';
import settingsRoutes from './routes/settings.js';
import treatmentsRoutes from './routes/treatments.js';
import swarnaRoutes from './routes/swarnaprashana.js';
import adminRoutes from './routes/admin.js';

import db, { testDatabaseConnection } from './db.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Global Middleware
app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health Check
app.get('/api/health', async (req, res) => {
  const dbHealth = await testDatabaseConnection();
  res.json({
    status: dbHealth.success ? 'ok' : 'degraded',
    timestamp: new Date().toISOString(),
    service: 'Sri Krishna Ayurvedic Clinic API',
    database: dbHealth.database || 'PostgreSQL',
    dbConnected: dbHealth.success,
    serverTime: dbHealth.serverTime,
    pgVersion: dbHealth.version,
    error: dbHealth.error
  });
});

// API Routes (mounted at both /api/* and /* for Vercel serverless compatibility)
app.use('/api/auth', authRoutes);
app.use('/api/appointments', appointmentsRoutes);
app.use('/api/inquiries', inquiriesRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/treatments', treatmentsRoutes);
app.use('/api/swarnaprashana', swarnaRoutes);
app.use('/api/admin', adminRoutes);

// Also mount at root paths for when Vercel serverless strips /api prefix
app.use('/auth', authRoutes);
app.use('/appointments', appointmentsRoutes);
app.use('/inquiries', inquiriesRoutes);
app.use('/settings', settingsRoutes);
app.use('/treatments', treatmentsRoutes);
app.use('/swarnaprashana', swarnaRoutes);
app.use('/admin', adminRoutes);

// Serve production static frontend build if dist/ exists (local server mode)
const distPath = path.join(process.cwd(), 'dist');
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
}

// 404 handler for unknown API routes
app.use((req, res, next) => {
  if (req.path.startsWith('/api') || req.path.startsWith('/auth') || req.path.startsWith('/appointments') ||
      req.path.startsWith('/inquiries') || req.path.startsWith('/settings') || req.path.startsWith('/treatments') ||
      req.path.startsWith('/swarnaprashana') || req.path.startsWith('/admin')) {
    return res.status(404).json({ success: false, error: 'API endpoint not found.' });
  }
  // Serve SPA index.html for all other routes (local server only)
  if (fs.existsSync(distPath)) {
    return res.sendFile(path.join(distPath, 'index.html'));
  }
  next();
});

// Centralized Error Handler
app.use((err, req, res, next) => {
  console.error('Unhandled API Exception:', err.message);
  res.status(err.status || 500).json({
    success: false,
    error: err.message || 'An unexpected server error occurred.'
  });
});

// Start listening if not running in Vercel serverless or Vite environment
const isVite = process.argv.some(arg => typeof arg === 'string' && (arg.includes('vite') || arg.includes('preview')));

if (!process.env.VERCEL && !isVite) {
  app.listen(PORT, () => {
    console.log(`🌿 Sri Krishna Ayurvedic Clinic Backend running on port ${PORT}`);
    console.log(`📊 Environment: ${process.env.NODE_ENV || 'production'}`);
    console.log(`🔗 Database: ${process.env.DATABASE_URL ? process.env.DATABASE_URL.replace(/:([^@]+)@/, ':****@') : 'Local (DB_HOST)'}`);
  });
}

export default app;
