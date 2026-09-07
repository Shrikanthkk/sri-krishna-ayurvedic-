import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { query } from '../db.js';
import { verifyToken, requireAdmin } from '../middleware/auth.js';

const router = Router();

// Configure Multer Storage for Hero Slider Images
const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'hero');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, `hero-${uniqueSuffix}${ext}`);
  }
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  if (allowedTypes.includes(file.mimetype.toLowerCase())) {
    cb(null, true);
  } else {
    cb(new Error('Only JPG, JPEG, PNG, and WebP image files are allowed.'));
  }
};

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB maximum
  fileFilter
});

export const defaultHeroSlider = {
  isPaused: false,
  autoSlideDuration: 5000,
  slides: [
    {
      id: 'hero-1',
      badge: 'Vedic Heritage',
      title: 'Classical Samhitas',
      subtitle: 'Vedic Healing Heritage & Sacred Samhitas',
      caption: 'Vedic Healing Heritage & Sacred Samhitas • Sri Krishna Ayurvedic Clinic',
      altText: 'Ayurveda Heritage and Dhanvantari classical scriptures',
      image: '/images/home_slider/ayurveda_heritage_dhanvantari.png',
      mobileImage: '',
      enabled: true,
      order: 1,
      card1: {
        title: 'Ancient Wisdom',
        subtitle: 'Charaka & Sushruta Samhita',
        icon: 'Sparkles',
        color: 'forest'
      },
      card2: {
        title: 'Divine Healing',
        subtitle: 'Classical Formulations',
        icon: 'Award',
        color: 'brass'
      }
    },
    {
      id: 'hero-2',
      badge: 'Tri-Dosha Balance',
      title: 'Mind-Body Harmony',
      subtitle: 'Harmonizing Vata, Pitta & Kapha with Pure Herbs',
      caption: 'Harmonizing Vata, Pitta & Kapha with Pure Herbs • Sri Krishna Ayurvedic Clinic',
      altText: 'Herbal preparation and tri-dosha balance therapies',
      image: '/images/home_slider/herbal_preparation_tridosha.png',
      mobileImage: '',
      enabled: true,
      order: 2,
      card1: {
        title: 'Tri-Dosha Harmony',
        subtitle: 'Vata • Pitta • Kapha',
        icon: 'ShieldCheck',
        color: 'brass'
      },
      card2: {
        title: 'Pure Botanicals',
        subtitle: 'Handcrafted Formulations',
        icon: 'Leaf',
        color: 'forest'
      }
    },
    {
      id: 'hero-3',
      badge: 'Doctor Consultation',
      title: 'Personalized Clinical Care',
      subtitle: '26+ Years Clinical Excellence • Dr. Anand Krishna (BAMS)',
      caption: '26+ Years Clinical Excellence • Dr. Anand Krishna (BAMS) • Sri Krishna Ayurvedic Clinic',
      altText: 'Doctor Anand Krishna consulting patient with pulse diagnosis',
      image: '/images/home_slider/doctor_patient_consultation.jpg',
      mobileImage: '',
      enabled: true,
      order: 3,
      card1: {
        title: 'Personalized Care',
        subtitle: 'Comprehensive Nadi Evaluation',
        icon: 'HeartHandshake',
        color: 'forest'
      },
      card2: {
        title: '26+ Years Trust',
        subtitle: 'Dr. Anand Krishna (BAMS)',
        icon: 'Award',
        color: 'brass'
      }
    }
  ]
};

export const defaultRunningBar = {
  isPaused: false,
  speed: 'normal', // 'slow' | 'normal' | 'fast'
  separator: '✦',
  items: [
    { id: 'rb-1', type: 'badge', label: '', text: 'CLINIC TIMINGS', icon: 'Clock', enabled: true },
    { id: 'rb-2', type: 'announcement', label: '', text: 'We provide Ayurvedic care for all types of cancer', icon: 'Sparkles', enabled: true },
    { id: 'rb-3', type: 'timing', label: 'ANANDAPURA:', text: '6:30 PM to 9:30 PM', icon: 'MapPin', enabled: true },
    { id: 'rb-4', type: 'timing', label: 'KRISHNARAJAPURAM:', text: '9:00 AM to 10:30 AM', icon: 'MapPin', enabled: true }
  ]
};

const defaultSettings = {
  id: 'default',
  mainAddress: "No 426, Near Lakshmi Super Speciality Hospital, 3rd Main, Krishnarajapuram, Bangalore 560036",
  branchAddress: "No. 98, Opp Kanti Sweets, T. C. Palya Main Road, Anandapura, Krishnarajapuram, Bangalore 560036",
  doctorName: "Dr. Anand Krishna",
  qualifications: "BAMS (Bachelor of Ayurvedic Medicine & Surgery)",
  registrationNo: "13199",
  experienceYears: "26+",
  consultationFee: "₹50",
  feeNote: "Fixed Fee at Visit",
  phone: "+91 88924 09195",
  altPhone: "+91 74062 90626",
  email: "dranandkrishna31@gmail.com",
  workingHours: "Mon - Sat: 10:00 AM - 7:00 PM (Sunday Closed)",
  runningBar: defaultRunningBar,
  heroSlider: defaultHeroSlider
};

// GET /api/settings
router.get('/', async (req, res) => {
  try {
    const result = await query('SELECT * FROM clinic_settings WHERE id = $1', ['default']);
    if (result.rows.length === 0) {
      return res.json({ success: true, data: defaultSettings });
    }
    const row = result.rows[0];
    const parsedRunningBar = row.running_bar
      ? (typeof row.running_bar === 'string' ? JSON.parse(row.running_bar) : row.running_bar)
      : defaultRunningBar;

    const parsedHeroSlider = row.hero_slider
      ? (typeof row.hero_slider === 'string' ? JSON.parse(row.hero_slider) : row.hero_slider)
      : defaultHeroSlider;

    const mapped = {
      id: row.id,
      mainAddress: row.main_address,
      branchAddress: row.branch_address,
      doctorName: row.doctor_name,
      qualifications: row.qualifications,
      registrationNo: row.registration_no,
      experienceYears: row.experience_years,
      consultationFee: row.consultation_fee,
      feeNote: row.fee_note,
      phone: row.phone,
      altPhone: row.alt_phone,
      email: row.email,
      workingHours: row.working_hours,
      runningBar: parsedRunningBar,
      heroSlider: parsedHeroSlider
    };
    return res.json({ success: true, data: mapped });
  } catch (err) {
    console.error('Error fetching settings:', err);
    return res.json({ success: true, data: defaultSettings });
  }
});

// PUT /api/settings (Admin)
router.put('/', async (req, res) => {
  try {
    const s = req.body;
    const runningBarJson = s.runningBar ? JSON.stringify(s.runningBar) : JSON.stringify(defaultRunningBar);
    const heroSliderJson = s.heroSlider ? JSON.stringify(s.heroSlider) : JSON.stringify(defaultHeroSlider);

    await query(
      `INSERT INTO clinic_settings (
        id, main_address, branch_address, doctor_name, qualifications,
        registration_no, experience_years, consultation_fee, fee_note,
        phone, alt_phone, email, working_hours, running_bar, hero_slider, updated_at
      ) VALUES ('default', $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13::jsonb, $14::jsonb, CURRENT_TIMESTAMP)
      ON CONFLICT (id) DO UPDATE SET
        main_address = EXCLUDED.main_address,
        branch_address = EXCLUDED.branch_address,
        doctor_name = EXCLUDED.doctor_name,
        qualifications = EXCLUDED.qualifications,
        registration_no = EXCLUDED.registration_no,
        experience_years = EXCLUDED.experience_years,
        consultation_fee = EXCLUDED.consultation_fee,
        fee_note = EXCLUDED.fee_note,
        phone = EXCLUDED.phone,
        alt_phone = EXCLUDED.alt_phone,
        email = EXCLUDED.email,
        working_hours = EXCLUDED.working_hours,
        running_bar = COALESCE(EXCLUDED.running_bar, clinic_settings.running_bar),
        hero_slider = COALESCE(EXCLUDED.hero_slider, clinic_settings.hero_slider),
        updated_at = CURRENT_TIMESTAMP;`,
      [
        s.mainAddress || defaultSettings.mainAddress,
        s.branchAddress || defaultSettings.branchAddress,
        s.doctorName || defaultSettings.doctorName,
        s.qualifications || defaultSettings.qualifications,
        s.registrationNo || defaultSettings.registrationNo,
        s.experienceYears || defaultSettings.experienceYears,
        s.consultationFee || defaultSettings.consultationFee,
        s.feeNote || defaultSettings.feeNote,
        s.phone || defaultSettings.phone,
        s.altPhone || defaultSettings.altPhone,
        s.email || defaultSettings.email,
        s.workingHours || defaultSettings.workingHours,
        runningBarJson,
        heroSliderJson
      ]
    );

    return res.json({ success: true, data: s, message: 'Clinic settings updated successfully.' });
  } catch (err) {
    console.error('Error saving settings:', err);
    return res.status(500).json({ success: false, error: 'Failed to update settings.' });
  }
});

// POST /api/settings/hero-slider/upload (Upload hero image)
router.post('/hero-slider/upload', (req, res) => {
  upload.single('image')(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({ success: false, error: 'Image size exceeds the maximum allowed limit of 5 MB.' });
      }
      return res.status(400).json({ success: false, error: `Upload error: ${err.message}` });
    } else if (err) {
      return res.status(400).json({ success: false, error: err.message || 'Invalid file uploaded.' });
    }

    if (!req.file) {
      return res.status(400).json({ success: false, error: 'No image file uploaded.' });
    }

    const imageUrl = `/uploads/hero/${req.file.filename}`;
    return res.json({
      success: true,
      url: imageUrl,
      filename: req.file.filename,
      size: req.file.size,
      mimetype: req.file.mimetype,
      message: 'Image uploaded successfully.'
    });
  });
});

// PUT /api/settings/hero-slider (Admin - Dedicated Hero Slider Update)
router.put('/hero-slider', async (req, res) => {
  try {
    const heroSliderData = req.body;
    if (!heroSliderData || !Array.isArray(heroSliderData.slides)) {
      return res.status(400).json({ success: false, error: 'Invalid hero slider data. "slides" array is required.' });
    }

    const jsonStr = JSON.stringify(heroSliderData);

    await query(
      `INSERT INTO clinic_settings (
        id, main_address, branch_address, doctor_name, qualifications,
        registration_no, experience_years, consultation_fee, fee_note,
        phone, alt_phone, email, working_hours, running_bar, hero_slider, updated_at
      ) VALUES ('default', $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13::jsonb, $14::jsonb, CURRENT_TIMESTAMP)
      ON CONFLICT (id) DO UPDATE SET
        hero_slider = $14::jsonb,
        updated_at = CURRENT_TIMESTAMP;`,
      [
        defaultSettings.mainAddress,
        defaultSettings.branchAddress,
        defaultSettings.doctorName,
        defaultSettings.qualifications,
        defaultSettings.registrationNo,
        defaultSettings.experienceYears,
        defaultSettings.consultationFee,
        defaultSettings.feeNote,
        defaultSettings.phone,
        defaultSettings.altPhone,
        defaultSettings.email,
        defaultSettings.workingHours,
        JSON.stringify(defaultRunningBar),
        jsonStr
      ]
    );

    return res.json({
      success: true,
      data: heroSliderData,
      message: 'Hero slider settings updated successfully.'
    });
  } catch (err) {
    console.error('Error saving hero slider settings:', err);
    return res.status(500).json({ success: false, error: 'Failed to update hero slider settings.' });
  }
});

// PUT /api/settings/running-bar (Admin - Dedicated Running Bar Update)
router.put('/running-bar', async (req, res) => {
  try {
    const runningBarData = req.body;
    if (!runningBarData || !Array.isArray(runningBarData.items)) {
      return res.status(400).json({ success: false, error: 'Invalid running bar data. "items" array is required.' });
    }

    const jsonStr = JSON.stringify(runningBarData);

    await query(
      `INSERT INTO clinic_settings (
        id, main_address, branch_address, doctor_name, qualifications,
        registration_no, experience_years, consultation_fee, fee_note,
        phone, alt_phone, email, working_hours, running_bar, updated_at
      ) VALUES ('default', $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13::jsonb, CURRENT_TIMESTAMP)
      ON CONFLICT (id) DO UPDATE SET
        running_bar = $13::jsonb,
        updated_at = CURRENT_TIMESTAMP;`,
      [
        defaultSettings.mainAddress,
        defaultSettings.branchAddress,
        defaultSettings.doctorName,
        defaultSettings.qualifications,
        defaultSettings.registrationNo,
        defaultSettings.experienceYears,
        defaultSettings.consultationFee,
        defaultSettings.feeNote,
        defaultSettings.phone,
        defaultSettings.altPhone,
        defaultSettings.email,
        defaultSettings.workingHours,
        jsonStr
      ]
    );

    return res.json({
      success: true,
      data: runningBarData,
      message: 'Running bar settings updated successfully.'
    });
  } catch (err) {
    console.error('Error saving running bar settings:', err);
    return res.status(500).json({ success: false, error: 'Failed to update running bar settings.' });
  }
});

// POST /api/settings/reset
router.post('/reset', async (req, res) => {
  try {
    const runningBarJson = JSON.stringify(defaultRunningBar);
    const heroSliderJson = JSON.stringify(defaultHeroSlider);
    await query(
      `INSERT INTO clinic_settings (
        id, main_address, branch_address, doctor_name, qualifications,
        registration_no, experience_years, consultation_fee, fee_note,
        phone, alt_phone, email, working_hours, running_bar, hero_slider, updated_at
      ) VALUES ('default', $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13::jsonb, $14::jsonb, CURRENT_TIMESTAMP)
      ON CONFLICT (id) DO UPDATE SET
        main_address = EXCLUDED.main_address,
        branch_address = EXCLUDED.branch_address,
        doctor_name = EXCLUDED.doctor_name,
        qualifications = EXCLUDED.qualifications,
        registration_no = EXCLUDED.registration_no,
        experience_years = EXCLUDED.experience_years,
        consultation_fee = EXCLUDED.consultation_fee,
        fee_note = EXCLUDED.fee_note,
        phone = EXCLUDED.phone,
        alt_phone = EXCLUDED.alt_phone,
        email = EXCLUDED.email,
        working_hours = EXCLUDED.working_hours,
        running_bar = EXCLUDED.running_bar,
        hero_slider = EXCLUDED.hero_slider,
        updated_at = CURRENT_TIMESTAMP;`,
      [
        defaultSettings.mainAddress,
        defaultSettings.branchAddress,
        defaultSettings.doctorName,
        defaultSettings.qualifications,
        defaultSettings.registrationNo,
        defaultSettings.experienceYears,
        defaultSettings.consultationFee,
        defaultSettings.feeNote,
        defaultSettings.phone,
        defaultSettings.altPhone,
        defaultSettings.email,
        defaultSettings.workingHours,
        runningBarJson,
        heroSliderJson
      ]
    );

    return res.json({ success: true, data: defaultSettings, message: 'Settings reset to default.' });
  } catch (err) {
    console.error('Error resetting settings:', err);
    return res.status(500).json({ success: false, error: 'Failed to reset settings.' });
  }
});

export default router;
