import { Router } from 'express';
import { query } from '../db.js';
import { verifyToken, requireAdmin } from '../middleware/auth.js';

const router = Router();

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
  phone: "+91 98440 90626",
  altPhone: "+91 98440 90626",
  email: "dranandkrishna31@gmail.com",
  workingHours: "Mon - Sat: 10:00 AM - 7:00 PM (Sunday Closed)"
};

// GET /api/settings
router.get('/', async (req, res) => {
  try {
    const result = await query('SELECT * FROM clinic_settings WHERE id = $1', ['default']);
    if (result.rows.length === 0) {
      return res.json({ success: true, data: defaultSettings });
    }
    const row = result.rows[0];
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
      workingHours: row.working_hours
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
    await query(
      `INSERT INTO clinic_settings (
        id, main_address, branch_address, doctor_name, qualifications,
        registration_no, experience_years, consultation_fee, fee_note,
        phone, alt_phone, email, working_hours, updated_at
      ) VALUES ('default', $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, CURRENT_TIMESTAMP)
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
        s.workingHours || defaultSettings.workingHours
      ]
    );

    return res.json({ success: true, data: s, message: 'Clinic settings updated successfully.' });
  } catch (err) {
    console.error('Error saving settings:', err);
    return res.status(500).json({ success: false, error: 'Failed to update settings.' });
  }
});

// POST /api/settings/reset
router.post('/reset', async (req, res) => {
  try {
    await query(
      `INSERT INTO clinic_settings (
        id, main_address, branch_address, doctor_name, qualifications,
        registration_no, experience_years, consultation_fee, fee_note,
        phone, alt_phone, email, working_hours, updated_at
      ) VALUES ('default', $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, CURRENT_TIMESTAMP)
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
        defaultSettings.workingHours
      ]
    );

    return res.json({ success: true, data: defaultSettings, message: 'Settings reset to default.' });
  } catch (err) {
    console.error('Error resetting settings:', err);
    return res.status(500).json({ success: false, error: 'Failed to reset settings.' });
  }
});

export default router;
