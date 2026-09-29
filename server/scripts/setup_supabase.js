/**
 * Setup Supabase Cloud Database
 * This script:
 * 1. Connects directly to Supabase
 * 2. Creates all tables with correct schema (adds missing columns)
 * 3. Seeds admin user with correct credentials
 * 4. Seeds default clinic settings
 */

import pg from 'pg';
import bcrypt from 'bcryptjs';

const { Client } = pg;

// Try different pooler URL formats for Supabase
// Format 1: Session pooler (port 5432)
// Format 2: Transaction pooler (port 6543)
const SUPABASE_URL = process.env.DATABASE_URL || 
  'postgresql://postgres.yohzqktgzesenbwxvyld:Pramod%400605@aws-0-ap-south-1.pooler.supabase.com:6543/postgres?pgbouncer=true';

async function setupSupabase() {
  console.log('🔗 Connecting to Supabase...');
  const client = new Client({
    connectionString: SUPABASE_URL,
    ssl: { rejectUnauthorized: false }
  });

  await client.connect();
  console.log('✅ Connected to Supabase!');

  // Step 1: Create / Update Schema
  console.log('\n📋 Creating / Updating tables...');
  
  await client.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      phone VARCHAR(50),
      password_hash VARCHAR(255) NOT NULL,
      role VARCHAR(50) NOT NULL DEFAULT 'user',
      is_active BOOLEAN NOT NULL DEFAULT true,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
  `);

  await client.query(`
    CREATE TABLE IF NOT EXISTS appointments (
      id VARCHAR(100) PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      phone VARCHAR(50) NOT NULL,
      email VARCHAR(255),
      treatment VARCHAR(255) NOT NULL DEFAULT 'General Consultation',
      date DATE NOT NULL,
      time_slot VARCHAR(50) NOT NULL DEFAULT '10:00 AM',
      status VARCHAR(50) NOT NULL DEFAULT 'Pending',
      notes TEXT,
      submitted_at VARCHAR(100),
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
  `);

  await client.query(`
    CREATE TABLE IF NOT EXISTS inquiries (
      id VARCHAR(100) PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      phone VARCHAR(50) NOT NULL,
      email VARCHAR(255),
      subject VARCHAR(255) NOT NULL DEFAULT 'General Inquiry',
      message TEXT NOT NULL,
      is_read BOOLEAN NOT NULL DEFAULT false,
      submitted_at VARCHAR(100),
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
  `);

  await client.query(`
    CREATE TABLE IF NOT EXISTS clinic_settings (
      id VARCHAR(50) PRIMARY KEY DEFAULT 'default',
      main_address TEXT NOT NULL DEFAULT '',
      branch_address TEXT NOT NULL DEFAULT '',
      doctor_name VARCHAR(255) NOT NULL DEFAULT '',
      qualifications VARCHAR(255) NOT NULL DEFAULT '',
      registration_no VARCHAR(100) NOT NULL DEFAULT '',
      experience_years VARCHAR(50) NOT NULL DEFAULT '',
      consultation_fee VARCHAR(50) NOT NULL DEFAULT '',
      fee_note VARCHAR(100) NOT NULL DEFAULT '',
      phone VARCHAR(50) NOT NULL DEFAULT '',
      alt_phone VARCHAR(50) NOT NULL DEFAULT '',
      secondary_phone VARCHAR(50) DEFAULT '+91 98440 90626',
      email VARCHAR(255) NOT NULL DEFAULT '',
      working_hours VARCHAR(255) NOT NULL DEFAULT '',
      running_bar JSONB,
      hero_slider JSONB,
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // Add missing columns if they don't exist (for older schemas)
  await client.query(`ALTER TABLE clinic_settings ADD COLUMN IF NOT EXISTS secondary_phone VARCHAR(50) DEFAULT '+91 98440 90626';`);
  await client.query(`ALTER TABLE clinic_settings ADD COLUMN IF NOT EXISTS running_bar JSONB;`);
  await client.query(`ALTER TABLE clinic_settings ADD COLUMN IF NOT EXISTS hero_slider JSONB;`);

  await client.query(`
    CREATE TABLE IF NOT EXISTS treatments (
      id VARCHAR(100) PRIMARY KEY,
      number VARCHAR(10),
      title VARCHAR(255) NOT NULL,
      subtitle VARCHAR(255),
      description TEXT,
      benefits JSONB DEFAULT '[]'::jsonb,
      duration VARCHAR(100),
      image VARCHAR(255),
      link VARCHAR(255),
      is_active BOOLEAN NOT NULL DEFAULT true,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
  `);

  await client.query(`
    CREATE TABLE IF NOT EXISTS swarnaprashana_schedule (
      id VARCHAR(100) PRIMARY KEY,
      month VARCHAR(50) NOT NULL,
      date VARCHAR(10) NOT NULL,
      year INT NOT NULL DEFAULT 2026,
      full_date DATE,
      status VARCHAR(50) NOT NULL DEFAULT 'Active',
      display_order INT DEFAULT 1,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // Add unique constraint if not exists
  try {
    await client.query(`CREATE UNIQUE INDEX IF NOT EXISTS idx_swarna_year_month ON swarnaprashana_schedule(year, month);`);
  } catch (e) {
    console.log('Note: Swarnaprashana unique index already exists or skipped.');
  }

  // Create indexes
  await client.query(`CREATE INDEX IF NOT EXISTS idx_appointments_date ON appointments(date);`);
  await client.query(`CREATE INDEX IF NOT EXISTS idx_appointments_status ON appointments(status);`);
  await client.query(`CREATE INDEX IF NOT EXISTS idx_inquiries_read ON inquiries(is_read);`);

  console.log('✅ All tables created / updated successfully!');

  // Step 2: Seed Admin User
  console.log('\n👤 Setting up admin user...');
  const adminEmail = 'srikrishna@srikrishnaayurveda.com';
  const adminPassword = 'Srikrishna@321';
  const adminHash = await bcrypt.hash(adminPassword, 10);

  await client.query(`
    INSERT INTO users (name, email, phone, password_hash, role, is_active)
    VALUES ($1, $2, $3, $4, 'admin', true)
    ON CONFLICT (email) DO UPDATE SET
      password_hash = $4,
      role = 'admin',
      is_active = true,
      updated_at = CURRENT_TIMESTAMP;
  `, ['srikrishna', adminEmail, '+91 98440 90626', adminHash]);

  // Also add fallback admin
  const adminHash2 = await bcrypt.hash('1234', 10);
  await client.query(`
    INSERT INTO users (name, email, phone, password_hash, role, is_active)
    VALUES ($1, $2, $3, $4, 'admin', true)
    ON CONFLICT (email) DO UPDATE SET
      password_hash = $4,
      role = 'admin',
      is_active = true,
      updated_at = CURRENT_TIMESTAMP;
  `, ['admin', 'admin@srikrishnaayurveda.com', '+91 98440 90626', adminHash2]);

  console.log('✅ Admin users seeded:');
  console.log('   Email: srikrishna@srikrishnaayurveda.com | Password: Srikrishna@321');
  console.log('   Email: admin@srikrishnaayurveda.com      | Password: 1234');

  // Step 3: Seed Default Clinic Settings
  console.log('\n⚙️ Seeding default clinic settings...');

  const defaultRunningBar = {
    isPaused: false,
    speed: 'normal',
    separator: '✦',
    items: [
      { id: 'rb-1', type: 'badge', label: '', text: 'CLINIC TIMINGS', icon: 'Clock', enabled: true },
      { id: 'rb-2', type: 'announcement', label: '', text: 'We provide Ayurvedic care for all types of cancer', icon: 'Sparkles', enabled: true },
      { id: 'rb-3', type: 'timing', label: 'ANANDAPURA:', text: '6:30 PM to 9:30 PM', icon: 'MapPin', enabled: true },
      { id: 'rb-4', type: 'timing', label: 'KRISHNARAJAPURAM:', text: '9:00 AM to 10:30 AM', icon: 'MapPin', enabled: true }
    ]
  };

  const defaultHeroSlider = {
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
        card1: { title: 'Ancient Wisdom', subtitle: 'Charaka & Sushruta Samhita', icon: 'Sparkles', color: 'forest' },
        card2: { title: 'Divine Healing', subtitle: 'Classical Formulations', icon: 'Award', color: 'brass' }
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
        card1: { title: 'Tri-Dosha Harmony', subtitle: 'Vata • Pitta • Kapha', icon: 'ShieldCheck', color: 'brass' },
        card2: { title: 'Pure Botanicals', subtitle: 'Handcrafted Formulations', icon: 'Leaf', color: 'forest' }
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
        card1: { title: 'Personalized Care', subtitle: 'Comprehensive Nadi Evaluation', icon: 'HeartHandshake', color: 'forest' },
        card2: { title: '26+ Years Trust', subtitle: 'Dr. Anand Krishna (BAMS)', icon: 'Award', color: 'brass' }
      }
    ]
  };

  await client.query(`
    INSERT INTO clinic_settings (
      id, main_address, branch_address, doctor_name, qualifications,
      registration_no, experience_years, consultation_fee, fee_note,
      phone, alt_phone, secondary_phone, email, working_hours, running_bar, hero_slider, updated_at
    ) VALUES ('default', $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14::jsonb, $15::jsonb, CURRENT_TIMESTAMP)
    ON CONFLICT (id) DO UPDATE SET
      main_address = COALESCE(NULLIF(clinic_settings.main_address, ''), EXCLUDED.main_address),
      branch_address = COALESCE(NULLIF(clinic_settings.branch_address, ''), EXCLUDED.branch_address),
      doctor_name = COALESCE(NULLIF(clinic_settings.doctor_name, ''), EXCLUDED.doctor_name),
      qualifications = COALESCE(NULLIF(clinic_settings.qualifications, ''), EXCLUDED.qualifications),
      registration_no = COALESCE(NULLIF(clinic_settings.registration_no, ''), EXCLUDED.registration_no),
      experience_years = COALESCE(NULLIF(clinic_settings.experience_years, ''), EXCLUDED.experience_years),
      consultation_fee = COALESCE(NULLIF(clinic_settings.consultation_fee, ''), EXCLUDED.consultation_fee),
      fee_note = COALESCE(NULLIF(clinic_settings.fee_note, ''), EXCLUDED.fee_note),
      phone = COALESCE(NULLIF(clinic_settings.phone, ''), EXCLUDED.phone),
      alt_phone = COALESCE(NULLIF(clinic_settings.alt_phone, ''), EXCLUDED.alt_phone),
      secondary_phone = COALESCE(clinic_settings.secondary_phone, EXCLUDED.secondary_phone),
      email = COALESCE(NULLIF(clinic_settings.email, ''), EXCLUDED.email),
      working_hours = COALESCE(NULLIF(clinic_settings.working_hours, ''), EXCLUDED.working_hours),
      running_bar = COALESCE(clinic_settings.running_bar, EXCLUDED.running_bar),
      hero_slider = COALESCE(clinic_settings.hero_slider, EXCLUDED.hero_slider),
      updated_at = CURRENT_TIMESTAMP;
  `, [
    'No 426, Near Lakshmi Super Speciality Hospital, 3rd Main, Krishnarajapuram, Bangalore 560036',
    'No. 98, Opp Kanti Sweets, T. C. Palya Main Road, Anandapura, Krishnarajapuram, Bangalore 560036',
    'Dr. Anand Krishna',
    'BAMS (Bachelor of Ayurvedic Medicine & Surgery)',
    '13199',
    '26+',
    '₹50',
    'Fixed Fee at Visit',
    '+91 88924 09195',
    '+91 74062 90626',
    '+91 98440 90626',
    'dranandkrishna31@gmail.com',
    'Mon - Sat: 10:00 AM - 7:00 PM (Sunday Closed)',
    JSON.stringify(defaultRunningBar),
    JSON.stringify(defaultHeroSlider)
  ]);

  console.log('✅ Default clinic settings seeded!');

  // Step 4: Verify
  console.log('\n📊 Verification:');
  const tables = ['users', 'clinic_settings', 'treatments', 'appointments', 'inquiries', 'swarnaprashana_schedule'];
  for (const table of tables) {
    const res = await client.query(`SELECT COUNT(*) FROM "${table}"`);
    console.log(`   Table [${table}]: ${res.rows[0].count} rows`);
  }

  await client.end();
  console.log('\n🎉 Supabase setup complete! Your cloud database is ready for Vercel.');
  console.log('\n⚠️  IMPORTANT: Add this DATABASE_URL to your Vercel environment variables:');
  console.log(`DATABASE_URL=${SUPABASE_URL}`);
}

setupSupabase().catch((err) => {
  console.error('❌ Setup failed:', err.message);
  process.exit(1);
});
