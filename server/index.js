import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
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

// Global Middleware
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'Sri Krishna Ayurvedic Clinic API',
    database: 'PostgreSQL'
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/appointments', appointmentsRoutes);
app.use('/api/inquiries', inquiriesRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/treatments', treatmentsRoutes);
app.use('/api/swarnaprashana', swarnaRoutes);
app.use('/api/admin', adminRoutes);

// Centralized 404 handler for unknown APIs
app.use((req, res, next) => {
  if (req.path.startsWith('/api')) {
    return res.status(404).json({ success: false, error: 'API endpoint not found.' });
  }
  next();
});

// Centralized Error Handler
app.use((err, req, res, next) => {
  console.error('Unhandled API Exception:', err);
  res.status(500).json({
    success: false,
    error: process.env.NODE_ENV === 'production' ? 'An unexpected server error occurred.' : err.message
  });
});

// Start listening if executed directly
if (process.argv[1] && process.argv[1].includes('index.js')) {
  app.listen(PORT, () => {
    console.log(`🌿 Sri Krishna Ayurvedic Clinic Backend running on http://localhost:${PORT}`);
    console.log(`📊 PostgreSQL database connected.`);
  });
}

export default app;
