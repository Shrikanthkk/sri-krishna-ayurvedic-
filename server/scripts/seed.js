import bcrypt from 'bcryptjs';
import { query, pool } from '../db.js';

const defaultAppointments = [
  {
    id: 'apt-101',
    name: 'Ramesh Kumar',
    phone: '+91 98450 12345',
    email: 'ramesh.k@gmail.com',
    treatment: 'Nadi Pariksha (Pulse Diagnosis)',
    date: '2026-08-15',
    timeSlot: '10:30 AM',
    status: 'Confirmed',
    notes: 'Experiencing digestive acidity and fatigue.',
    submittedAt: '2026-08-12 10:15 AM'
  },
  {
    id: 'apt-102',
    name: 'Sunitha Narayan',
    phone: '+91 98440 90626',
    email: 'sunitha.n@yahoo.com',
    treatment: 'Integrative Cancer Care',
    date: '2026-08-16',
    timeSlot: '02:00 PM',
    status: 'Pending',
    notes: 'Lower back stiffness and knee joint discomfort.',
    submittedAt: '2026-08-12 02:45 PM'
  },
  {
    id: 'apt-103',
    name: 'Praveen Venkatesh',
    phone: '+91 97312 45678',
    email: 'praveen.v@outlook.com',
    treatment: 'Swarnaprashana Pediatric Care',
    date: '2026-08-18',
    timeSlot: '11:00 AM',
    status: 'Completed',
    notes: 'Child traditional gold drop wellness session.',
    submittedAt: '2026-08-11 05:20 PM'
  }
];

const defaultInquiries = [
  {
    id: 'inq-201',
    name: 'Anitha Sharma',
    phone: '+91 98801 23456',
    email: 'anitha.s@domain.com',
    subject: 'Integrative Cancer Care Consultation',
    message: 'Hello Doctor, I would like to inquire about supportive Ayurvedic therapies alongside ongoing chemo treatment for my father.',
    read: false,
    submittedAt: '2026-08-12 11:30 AM'
  },
  {
    id: 'inq-202',
    name: 'Kiran Raj',
    phone: '+91 99002 34567',
    email: 'kiran.raj@gmail.com',
    subject: 'Ayurvedic Consultation Details',
    message: 'Could you please provide details about the consultation schedule and timings at KR Puram main branch?',
    read: true,
    submittedAt: '2026-08-11 04:10 PM'
  }
];

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
  workingHours: "Mon - Sat: 10:00 AM - 7:00 PM (Sunday Closed)"
};

const defaultTreatments = [
  {
    id: "cancer-treatment",
    number: "01",
    title: "Integrative Cancer Care",
    subtitle: "Rasayana & Symptom Support",
    description: "Holistic herbal Rasayana protocols complementing conventional oncology to enhance immunity, reduce chemo-toxicity, and improve quality of life.",
    benefits: ["Immune system rejuvenation", "Reduces chemotherapy side effects", "Improves vitality & appetite"],
    duration: "Long-term Supportive Care",
    image: "/images/cancer_treatment.png",
    link: "/treatments/cancer-treatment"
  },
  {
    id: "swarnaprashana",
    number: "02",
    title: "Swarnaprashana (Gold Drops)",
    subtitle: "Pediatric Brain & Immunity Booster",
    description: "Ancient Rasayana drops prepared with 24k Suvarna Bhasma, Brahmi, Vacha, and organic honey administered on auspicious Pushya Nakshatra days for children aged 0-16.",
    benefits: ["Enhances memory & intellect (Medha)", "Builds natural disease immunity", "Improves physical stamina & digestion"],
    duration: "Monthly on Pushya Nakshatra",
    image: "/images/swarnaprashana_1.png",
    link: "/swarnaprashana"
  },
  {
    id: "vitiligo",
    number: "03",
    title: "Vitiligo (White Patches / Shwitra)",
    subtitle: "Melanocyte Stimulation Protocol",
    description: "Targeted Ayurvedic herbal formulations, blood purification (Rakta Shodhana), and dietary corrections to stimulate natural skin re-pigmentation.",
    benefits: ["Promotes melanin production", "Purifies blood toxins", "Prevents spread of depigmentation"],
    duration: "3 - 6 Months",
    image: "/images/vitiligo_treatment.jpg",
    link: "/treatments/vitiligo"
  },
  {
    id: "physiotherapy",
    number: "04",
    title: "Physiotherapy & Spine Rehab",
    subtitle: "Kati Basti & Joint Mobilization",
    description: "Integration of classical Marma therapy, herbal potli fomentation (Patra Pinda Sweda), and modern spinal alignment exercises for chronic pain.",
    benefits: ["Relieves sciatica & disc herniation", "Restores joint mobility", "Non-surgical pain management"],
    duration: "10 - 15 Sessions",
    image: "/images/physiotherapy_rehab.jpg",
    link: "/treatments/physiotherapy"
  },
  {
    id: "reduce-obesity",
    number: "05",
    title: "Weight & Metabolism Balance",
    subtitle: "Udvartana Powder Massage & Diet",
    description: "Deep herbal powder lymphatic scrubs (Udvartana) combined with Agni-stimulating medicines to burn stubborn Meda (fat) and normalize lipid profiles.",
    benefits: ["Targeted visceral fat reduction", "Accelerates basal metabolism", "Controls unhealthy food cravings"],
    duration: "30 - 60 Days",
    image: "/images/reduce_obesity.png",
    link: "/treatments/reduce-obesity"
  },
  {
    id: "joint-pain-arthritis",
    number: "06",
    title: "Joint Pain & Arthritis (Sandhivata)",
    subtitle: "Janu Basti & Anti-inflammatory Care",
    description: "Specialized warm medicated oil pooling (Janu Basti) and herbal Guggulu compounds that lubricate cartilage, reduce swelling, and eliminate morning stiffness.",
    benefits: ["Regenerates synovial fluid", "Eases osteoarthritis pain", "Restores pain-free walking"],
    duration: "14 - 28 Days",
    image: "/images/joint_pain_arthritis.png",
    link: "/treatments/joint-pain-arthritis"
  },
  {
    id: "skin-problems",
    number: "07",
    title: "Chronic Skin Diseases (Kushta)",
    subtitle: "Psoriasis, Eczema & Allergies",
    description: "Comprehensive blood-cleansing herbal decoctions and soothing Lepa therapies addressing root causes of chronic psoriasis, fungal infections, and hives.",
    benefits: ["Calms severe skin itching", "Clears scaly patches & lesions", "Prevents seasonal relapses"],
    duration: "4 - 12 Weeks",
    image: "/images/skin_problems.png",
    link: "/treatments/skin-problems"
  },
  {
    id: "alopecia",
    number: "08",
    title: "Alopecia (Hair Fall & Scalp Care)",
    subtitle: "Shirodhara & Nasya Protocol",
    description: "Medicated oil drip on forehead (Shirodhara) with customized herbal scalp pastes to nourish dormant follicles, prevent DHT damage, and eliminate dandruff.",
    benefits: ["Controls excessive hair thinning", "Promotes dense follicle regrowth", "Relieves stress-induced hair loss"],
    duration: "30 - 90 Days",
    image: "/images/hair_fall.png",
    link: "/treatments/alopecia"
  },
  {
    id: "sexual-disorders",
    number: "09",
    title: "Vajikarana & Reproductive Health",
    subtitle: "Confidential Vitality Restorative",
    description: "Discrete, evidence-backed classical Rasayana & Vajikarana botanical treatments for erectile strength, stamina, oligospermia, and hormonal balance.",
    benefits: ["100% confidential doctor consultation", "Boosts reproductive vitality", "Strengthens nervous stamina"],
    duration: "45 - 90 Days",
    image: "/images/doctor_consultation_corner.png",
    link: "/treatments/sexual-disorders"
  },
  {
    id: "de-addiction",
    number: "10",
    title: "Herbal De-addiction Support",
    subtitle: "Alcohol & Tobacco Withdrawal Relief",
    description: "Safe Ayurvedic herbal formulations reducing physiological cravings, detoxifying liver enzymes, and calming nervous anxiety during withdrawal.",
    benefits: ["Reduces severe cravings naturally", "Protects liver & brain neurons", "Restores emotional equilibrium"],
    duration: "60 - 90 Days",
    image: "/images/de_addiction.png",
    link: "/treatments/de-addiction"
  }
];

const defaultSwarnaprashanaSchedule = [
  { id: 'psh-2026-01', month: 'January', date: '5', year: 2026, full_date: '2026-01-05', status: 'Active', display_order: 1 },
  { id: 'psh-2026-02a', month: 'February', date: '1', year: 2026, full_date: '2026-02-01', status: 'Active', display_order: 2 },
  { id: 'psh-2026-02b', month: 'February', date: '28', year: 2026, full_date: '2026-02-28', status: 'Active', display_order: 3 },
  { id: 'psh-2026-03', month: 'March', date: '28', year: 2026, full_date: '2026-03-28', status: 'Active', display_order: 4 },
  { id: 'psh-2026-04', month: 'April', date: '24', year: 2026, full_date: '2026-04-24', status: 'Active', display_order: 5 },
  { id: 'psh-2026-05', month: 'May', date: '21', year: 2026, full_date: '2026-05-21', status: 'Active', display_order: 6 },
  { id: 'psh-2026-06', month: 'June', date: '18', year: 2026, full_date: '2026-06-18', status: 'Active', display_order: 7 },
  { id: 'psh-2026-07', month: 'July', date: '15', year: 2026, full_date: '2026-07-15', status: 'Active', display_order: 8 },
  { id: 'psh-2026-08', month: 'August', date: '11', year: 2026, full_date: '2026-08-11', status: 'Active', display_order: 9 },
  { id: 'psh-2026-09', month: 'September', date: '8', year: 2026, full_date: '2026-09-08', status: 'Active', display_order: 10 },
  { id: 'psh-2026-10', month: 'October', date: '5', year: 2026, full_date: '2026-10-05', status: 'Active', display_order: 11 },
  { id: 'psh-2026-11a', month: 'November', date: '1', year: 2026, full_date: '2026-11-01', status: 'Active', display_order: 12 },
  { id: 'psh-2026-11b', month: 'November', date: '29', year: 2026, full_date: '2026-11-29', status: 'Active', display_order: 13 },
  { id: 'psh-2026-12', month: 'December', date: '26', year: 2026, full_date: '2026-12-26', status: 'Active', display_order: 14 }
];

export async function seedDatabase(options = { closePool: true }) {
  console.log('Seeding PostgreSQL database with canonical clinic records...');
  try {
    // 1. Seed Admin User
    const adminPasswordHash = await bcrypt.hash('1234', 10);
    await query(`
      INSERT INTO users (name, email, phone, password_hash, role, is_active)
      VALUES ($1, $2, $3, $4, $5, $6)
      ON CONFLICT (email) DO UPDATE 
      SET password_hash = EXCLUDED.password_hash, role = EXCLUDED.role, is_active = true;
    `, ['Dr. Anand Krishna Admin', 'admin@srikrishnaayurveda.com', '+91 98440 90626', adminPasswordHash, 'admin', true]);

    await query(`
      INSERT INTO users (name, email, phone, password_hash, role, is_active)
      VALUES ($1, $2, $3, $4, $5, $6)
      ON CONFLICT (email) DO NOTHING;
    `, ['Clinic Administrator', 'admin', '+91 98440 90626', adminPasswordHash, 'admin', true]);

    console.log('✔ Admin user seeded (username: admin / email: admin@srikrishnaayurveda.com, PIN/password: 1234)');

    // 2. Seed Clinic Settings
    await query(`
      INSERT INTO clinic_settings (
        id, main_address, branch_address, doctor_name, qualifications,
        registration_no, experience_years, consultation_fee, fee_note,
        phone, alt_phone, email, working_hours, updated_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, CURRENT_TIMESTAMP)
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
        updated_at = CURRENT_TIMESTAMP;
    `, [
      defaultSettings.id,
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
    ]);
    console.log('✔ Clinic settings seeded.');

    // 3. Seed Appointments
    for (const apt of defaultAppointments) {
      await query(`
        INSERT INTO appointments (id, name, phone, email, treatment, date, time_slot, status, notes, submitted_at)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
        ON CONFLICT (id) DO NOTHING;
      `, [apt.id, apt.name, apt.phone, apt.email, apt.treatment, apt.date, apt.timeSlot, apt.status, apt.notes, apt.submittedAt]);
    }
    console.log('✔ Demo appointments seeded.');

    // 4. Seed Inquiries
    for (const inq of defaultInquiries) {
      await query(`
        INSERT INTO inquiries (id, name, phone, email, subject, message, is_read, submitted_at)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        ON CONFLICT (id) DO NOTHING;
      `, [inq.id, inq.name, inq.phone, inq.email, inq.subject, inq.message, inq.read, inq.submittedAt]);
    }
    console.log('✔ Demo contact inquiries seeded.');

    // 5. Seed Treatments
    for (const t of defaultTreatments) {
      await query(`
        INSERT INTO treatments (id, number, title, subtitle, description, benefits, duration, image, link, is_active)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, true)
        ON CONFLICT (id) DO UPDATE SET
          number = EXCLUDED.number,
          title = EXCLUDED.title,
          subtitle = EXCLUDED.subtitle,
          description = EXCLUDED.description,
          benefits = EXCLUDED.benefits,
          duration = EXCLUDED.duration,
          image = EXCLUDED.image,
          link = EXCLUDED.link;
      `, [t.id, t.number, t.title, t.subtitle, t.description, JSON.stringify(t.benefits), t.duration, t.image, t.link]);
    }
    console.log('✔ All 11 clinic treatments seeded.');

    // 6. Seed Swarnaprashana Schedule
    for (const s of defaultSwarnaprashanaSchedule) {
      await query(`
        INSERT INTO swarnaprashana_schedule (id, month, date, year, full_date, status, display_order)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        ON CONFLICT (id) DO UPDATE SET
          month = EXCLUDED.month,
          date = EXCLUDED.date,
          year = EXCLUDED.year,
          full_date = EXCLUDED.full_date,
          status = EXCLUDED.status,
          display_order = EXCLUDED.display_order;
      `, [s.id, s.month, s.date, s.year, s.full_date, s.status, s.display_order]);
    }
    console.log('✔ Swarnaprashana 2026 Pushya Nakshatra schedule seeded.');

    console.log('🎉 PostgreSQL Database seeding completed successfully!');
    return { success: true };
  } catch (err) {
    console.error('Seeding error:', err);
    throw err;
  } finally {
    if (options.closePool) {
      await pool.end();
    }
  }
}

if (process.argv[1] && process.argv[1].includes('seed.js')) {
  seedDatabase({ closePool: true });
}
