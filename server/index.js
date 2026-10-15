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

import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Production static frontend directory resolution
const distPath = fs.existsSync(path.join(process.cwd(), 'dist'))
  ? path.join(process.cwd(), 'dist')
  : path.join(__dirname, '../dist');

if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
}

// 404 handler for unknown API routes ONLY
app.use('/api', (req, res) => {
  return res.status(404).json({ success: false, error: 'API endpoint not found.' });
});

// Serve SPA index.html for all frontend routes (/admin, /treatments/*, /swarnaprashana, etc.)
app.use((req, res, next) => {
  if (req.method === 'GET') {
    const indexPath = path.join(distPath, 'index.html');
    if (fs.existsSync(indexPath)) {
      return res.sendFile(indexPath);
    }
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
