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

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// CORS — Allow all origins (Vercel deployment + local development)
app.use(cors({
  origin: true,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept']
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Serve static uploaded media files (local server only)
if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
  const uploadsPath = path.join(process.cwd(), 'public', 'uploads');
  if (fs.existsSync(uploadsPath)) {
    app.use('/uploads', express.static(uploadsPath));
  }
}

// Health Check — shows database status
app.get('/api/health', async (req, res) => {
  try {
    const { testDatabaseConnection } = await import('./db.js');
    const dbStatus = await testDatabaseConnection();
    res.json({
      status: 'ok',
      timestamp: new Date().toISOString(),
      service: 'Sri Krishna Ayurvedic Clinic API',
      database: dbStatus.success ? `Connected (${dbStatus.database})` : `Error: ${dbStatus.error}`,
      environment: process.env.NODE_ENV || 'unknown'
    });
  } catch (err) {
    res.json({
      status: 'ok',
      timestamp: new Date().toISOString(),
      service: 'Sri Krishna Ayurvedic Clinic API',
      database: 'Not connected',
      error: err.message
    });
  }
});

// URL Normalization Middleware (Fixes serverless route path stripping)
app.use((req, res, next) => {
  if (!req.url.startsWith('/api') && (
    req.url.startsWith('/auth') ||
    req.url.startsWith('/appointments') ||
    req.url.startsWith('/inquiries') ||
    req.url.startsWith('/settings') ||
    req.url.startsWith('/treatments') ||
    req.url.startsWith('/swarnaprashana') ||
    req.url.startsWith('/admin') ||
    req.url.startsWith('/health')
  )) {
    req.url = '/api' + req.url;
  }
  next();
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/appointments', appointmentsRoutes);
app.use('/api/inquiries', inquiriesRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/treatments', treatmentsRoutes);
app.use('/api/swarnaprashana', swarnaRoutes);
app.use('/api/admin', adminRoutes);

// Serve production static frontend build if dist/ exists (local server mode)
const distPath = path.join(process.cwd(), 'dist');
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
}

// 404 handler for unknown API routes
app.use((req, res, next) => {
  if (req.path.startsWith('/api')) {
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
    error: process.env.NODE_ENV === 'production'
      ? 'An unexpected server error occurred.'
      : err.message
  });
});

// Start listening if executed directly (local server mode)
const isDirectRun = process.argv[1] && (
  process.argv[1].includes('index.js') ||
  process.argv[1].includes('server')
);

if (isDirectRun && !process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`🌿 Sri Krishna Ayurvedic Clinic Backend running on http://127.0.0.1:${PORT}`);
    console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`🔗 Database: ${process.env.DATABASE_URL ? 'Cloud (DATABASE_URL)' : 'Local (DB_HOST)'}`);
  });
}

export default app;
