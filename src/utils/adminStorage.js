// Utility helper to manage persisted appointments, contact inquiries, editable clinic settings, treatments, and Swarnaprashana schedule in localStorage for the Admin Dashboard and Website
// 100% Client-side and Offline-ready: Zero external API calls, Zero 500 console errors, Instant UI reactivity

import { clinicData } from '../data/clinicData';

// Storage keys
const APPOINTMENTS_KEY = 'sk_clinic_appointments';
const INQUIRIES_KEY = 'sk_clinic_inquiries';
const CLINIC_SETTINGS_KEY = 'sk_clinic_settings';
const TREATMENTS_KEY = 'sk_clinic_treatments';
const SWARNAPRASHANA_KEY = 'sk_clinic_swarnaprashana_schedule';

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

export const defaultSettings = {
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
  secondaryPhone: "+91 98440 90626",
  email: "dranandkrishna31@gmail.com",
  workingHours: "Mon - Sat: 10:00 AM - 7:00 PM (Sunday Closed)",
  runningBar: defaultRunningBar,
  heroSlider: defaultHeroSlider
};

export const defaultSwarnaprashanaSchedule = [
  // 2027 Schedule (Pushya Nakshatra) - 13 canonical dates
  { id: 'psh-2027-01', month: 'January', date: '22', year: 2027, full_date: '2027-01-22', status: 'Active', display_order: 1 },
  { id: 'psh-2027-02', month: 'February', date: '19', year: 2027, full_date: '2027-02-19', status: 'Active', display_order: 2 },
  { id: 'psh-2027-03', month: 'March', date: '18', year: 2027, full_date: '2027-03-18', status: 'Active', display_order: 3 },
  { id: 'psh-2027-04', month: 'April', date: '15', year: 2027, full_date: '2027-04-15', status: 'Active', display_order: 4 },
  { id: 'psh-2027-05', month: 'May', date: '12', year: 2027, full_date: '2027-05-12', status: 'Active', display_order: 5 },
  { id: 'psh-2027-06', month: 'June', date: '8', year: 2027, full_date: '2027-06-08', status: 'Active', display_order: 6 },
  { id: 'psh-2027-07', month: 'July', date: '6', year: 2027, full_date: '2027-07-06', status: 'Active', display_order: 7 },
  { id: 'psh-2027-08-01', month: 'August', date: '2', year: 2027, full_date: '2027-08-02', status: 'Active', display_order: 8 },
  { id: 'psh-2027-08-02', month: 'August', date: '30', year: 2027, full_date: '2027-08-30', status: 'Active', display_order: 9 },
  { id: 'psh-2027-09', month: 'September', date: '26', year: 2027, full_date: '2027-09-26', status: 'Active', display_order: 10 },
  { id: 'psh-2027-10', month: 'October', date: '23', year: 2027, full_date: '2027-10-23', status: 'Active', display_order: 11 },
  { id: 'psh-2027-11', month: 'November', date: '19', year: 2027, full_date: '2027-11-19', status: 'Active', display_order: 12 },
  { id: 'psh-2027-12', month: 'December', date: '17', year: 2027, full_date: '2027-12-17', status: 'Active', display_order: 13 }
];

export const defaultAppointments = [
  {
    id: 'apt-101',
    name: 'Ramesh Kumar',
    phone: '9845012345',
    email: 'ramesh.k@gmail.com',
    treatment: 'Cancer Care & Oncology Support',
    date: '2027-02-15',
    timeSlot: '10:30 AM',
    status: 'Confirmed',
    notes: 'Supportive Rasayana consultation alongside medical treatment.',
    submittedAt: '2027-02-10 10:15 AM'
  },
  {
    id: 'apt-102',
    name: 'Sunitha Narayan',
    phone: '9844090626',
    email: 'sunitha.n@yahoo.com',
    treatment: 'Spine & Joint Care (Sandhivata)',
    date: '2027-02-16',
    timeSlot: '02:00 PM',
    status: 'Pending',
    notes: 'Lower back stiffness and knee joint discomfort.',
    submittedAt: '2027-02-11 02:45 PM'
  },
  {
    id: 'apt-103',
    name: 'Praveen Venkatesh',
    phone: '9731245678',
    email: 'praveen.v@outlook.com',
    treatment: 'Swarnaprashana Pediatric Care',
    date: '2027-02-19',
    timeSlot: '11:00 AM',
    status: 'Completed',
    notes: 'Traditional Pushya Nakshatra pediatric immunity drops.',
    submittedAt: '2027-02-11 05:20 PM'
  }
];

export const defaultInquiries = [
  {
    id: 'inq-201',
    name: 'Anitha Sharma',
    phone: '9880123456',
    email: 'anitha.s@gmail.com',
    subject: 'Integrative Ayurvedic Cancer Care',
    message: 'Hello Doctor, I would like to inquire about supportive Ayurvedic therapies for my father.',
    read: false,
    submittedAt: '2027-02-10 11:30 AM'
  },
  {
    id: 'inq-202',
    name: 'Kiran Raj',
    phone: '9900234567',
    email: 'kiran.raj@gmail.com',
    subject: 'Nadi Pariksha Timings',
    message: 'Could you please confirm Dr. Anand Krishna consultation timings at the KR Puram main branch?',
    read: true,
    submittedAt: '2027-02-09 04:10 PM'
  }
];

export const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export function getDaysInMonth(monthName, year = 2027) {
  const monthMap = {
    January: 31,
    February: (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)) ? 29 : 28,
    March: 31, April: 30, May: 31, June: 30, July: 31, August: 31,
    September: 30, October: 31, November: 30, December: 31
  };
  return monthMap[monthName] || 31;
}

export function validatePushyaDate({ month, date, year }) {
  if (!month || !month.trim()) return { valid: false, message: 'Month is required.' };
  if (!MONTH_NAMES.includes(month)) return { valid: false, message: `Invalid month selected: "${month}".` };
  const numericDate = parseInt(date, 10);
  if (isNaN(numericDate) || numericDate < 1 || numericDate > 31) return { valid: false, message: 'Date must be a valid number between 1 and 31.' };
  const numericYear = parseInt(year, 10) || 2027;
  const maxDays = getDaysInMonth(month, numericYear);
  if (numericDate > maxDays) return { valid: false, message: `${month} ${numericYear} only has ${maxDays} days. Date ${numericDate} is invalid.` };
  return { valid: true, message: 'Valid' };
}

// ─── LocalStorage Read/Write helpers ───────────────────────
function readStorage(key, fallback = null) {
  if (typeof localStorage === 'undefined') return fallback;
  try {
    const s = localStorage.getItem(key);
    return s ? JSON.parse(s) : fallback;
  } catch {
    return fallback;
  }
}

function writeStorage(key, data) {
  if (typeof localStorage === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (err) {
    console.warn(`Failed to write to localStorage for key ${key}:`, err);
  }
}

// ----------------- Appointments -----------------
export function getAppointments() {
  const stored = readStorage(APPOINTMENTS_KEY);
  if (!stored || !Array.isArray(stored) || stored.length === 0) {
    writeStorage(APPOINTMENTS_KEY, defaultAppointments);
    return defaultAppointments;
  }
  return stored;
}

export async function fetchAppointmentsFromDb(filters = {}) {
  let list = getAppointments();
  if (filters.status && filters.status !== 'all') {
    list = list.filter(a => (a.status || '').toLowerCase() === filters.status.toLowerCase());
  }
  return Promise.resolve(list);
}

export async function saveAppointment(appointmentData) {
  const now = new Date();
  const todayStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
  const currentFormattedTime = now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true });

  const created = {
    id: 'apt-' + Date.now(),
    name: (appointmentData.name || appointmentData.fullName || 'Patient').trim(),
    phone: String(appointmentData.phone || '').trim(),
    email: appointmentData.email ? String(appointmentData.email).trim() : null,
    treatment: appointmentData.treatment || 'General Consultation',
    date: appointmentData.date || appointmentData.preferredDate || todayStr,
    timeSlot: appointmentData.timeSlot || appointmentData.preferredTime || '10:00 AM',
    status: 'Pending',
    notes: appointmentData.notes || appointmentData.message || 'Consultation booking',
    submittedAt: appointmentData.submittedAt || `${todayStr} ${currentFormattedTime}`,
    isLocal: true
  };

  const existing = getAppointments();
  const updated = [created, ...existing.filter(a => a.id !== created.id)];
  writeStorage(APPOINTMENTS_KEY, updated);

  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('appointments_updated', { detail: created }));
  }

  return Promise.resolve(created);
}

export async function updateAppointmentStatus(id, newStatus) {
  const existing = getAppointments();
  const updated = existing.map(a => a.id === id ? { ...a, status: newStatus } : a);
  writeStorage(APPOINTMENTS_KEY, updated);

  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('appointments_updated', { detail: updated }));
  }

  return Promise.resolve(updated);
}

export async function deleteAppointment(id) {
  const existing = getAppointments();
  const updated = existing.filter(a => a.id !== id);
  writeStorage(APPOINTMENTS_KEY, updated);

  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('appointments_updated', { detail: updated }));
  }

  return Promise.resolve(updated);
}

// ----------------- Inquiries -----------------
export function getInquiries() {
  const stored = readStorage(INQUIRIES_KEY);
  if (!stored || !Array.isArray(stored) || stored.length === 0) {
    writeStorage(INQUIRIES_KEY, defaultInquiries);
    return defaultInquiries;
  }
  return stored;
}

export async function fetchInquiriesFromDb() {
  return Promise.resolve(getInquiries());
}

export async function saveInquiry(inquiryData) {
  const now = new Date();
  const todayStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
  const currentFormattedTime = now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true });

  const created = {
    id: 'inq-' + Date.now(),
    name: (inquiryData.name || 'Anonymous Patient').trim(),
    phone: String(inquiryData.phone || '').trim(),
    email: inquiryData.email ? String(inquiryData.email).trim() : '',
    subject: inquiryData.subject || inquiryData.treatment || 'General Inquiry',
    message: inquiryData.message || inquiryData.notes || '',
    read: false,
    submittedAt: inquiryData.submittedAt || `${todayStr} ${currentFormattedTime}`,
    isLocal: true
  };

  const existing = getInquiries();
  const updated = [created, ...existing.filter(i => i.id !== created.id)];
  writeStorage(INQUIRIES_KEY, updated);

  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('inquiries_updated', { detail: created }));
  }

  return Promise.resolve(created);
}

export async function toggleInquiryRead(id) {
  const existing = getInquiries();
  const updated = existing.map(i => i.id === id ? { ...i, read: !i.read } : i);
  writeStorage(INQUIRIES_KEY, updated);

  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('inquiries_updated', { detail: updated }));
  }

  return Promise.resolve(updated);
}

export async function deleteInquiry(id) {
  const existing = getInquiries();
  const updated = existing.filter(i => i.id !== id);
  writeStorage(INQUIRIES_KEY, updated);

  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('inquiries_updated', { detail: updated }));
  }

  return Promise.resolve(updated);
}

// ----------------- Settings -----------------
export function getClinicSettings() {
  const stored = readStorage(CLINIC_SETTINGS_KEY);
  if (!stored) {
    writeStorage(CLINIC_SETTINGS_KEY, defaultSettings);
    return defaultSettings;
  }
  return {
    ...defaultSettings,
    ...stored,
    runningBar: stored.runningBar || defaultRunningBar,
    heroSlider: stored.heroSlider || defaultHeroSlider
  };
}

export async function fetchClinicSettingsFromDb() {
  return Promise.resolve(getClinicSettings());
}

export async function saveClinicSettings(newSettings) {
  const current = getClinicSettings();
  const merged = { ...current, ...newSettings };
  writeStorage(CLINIC_SETTINGS_KEY, merged);

  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('sk_clinic_settings_updated', { detail: merged }));
    if (merged.runningBar) {
      window.dispatchEvent(new CustomEvent('sk_running_bar_updated', { detail: merged.runningBar }));
    }
    if (merged.heroSlider) {
      window.dispatchEvent(new CustomEvent('sk_hero_slider_updated', { detail: merged.heroSlider }));
    }
  }

  return Promise.resolve(merged);
}

export function getRunningBarSettings() {
  return getClinicSettings().runningBar || defaultRunningBar;
}

export async function saveRunningBarSettings(runningBarData) {
  const currentSettings = getClinicSettings();
  const updatedSettings = { ...currentSettings, runningBar: runningBarData };
  writeStorage(CLINIC_SETTINGS_KEY, updatedSettings);

  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('sk_running_bar_updated', { detail: runningBarData }));
  }

  return Promise.resolve(runningBarData);
}

export function getHeroSliderSettings() {
  return getClinicSettings().heroSlider || defaultHeroSlider;
}

export async function saveHeroSliderSettings(heroSliderData) {
  const currentSettings = getClinicSettings();
  const updatedSettings = { ...currentSettings, heroSlider: heroSliderData };
  writeStorage(CLINIC_SETTINGS_KEY, updatedSettings);

  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('sk_hero_slider_updated', { detail: heroSliderData }));
  }

  return Promise.resolve(heroSliderData);
}

// ----------------- Treatments -----------------
export function getStoredTreatments() {
  const cached = readStorage(TREATMENTS_KEY);
  if (Array.isArray(cached) && cached.length >= clinicData.treatments.length) {
    return cached.map(t => {
      const match = clinicData.treatments.find(ct => ct.id === t.id);
      return { ...match, ...t, review: t.review || match?.review };
    });
  }

  // Seed with canonical 11 treatments from clinicData
  writeStorage(TREATMENTS_KEY, clinicData.treatments);
  return clinicData.treatments;
}

export async function fetchTreatmentsFromDb() {
  return Promise.resolve(getStoredTreatments());
}

export async function saveTreatment(treatmentItem) {
  const existing = getStoredTreatments();
  const targetId = treatmentItem.id || 'treatment-' + Date.now();
  const existsIndex = existing.findIndex(t => t.id === targetId);

  let updated;
  if (existsIndex >= 0) {
    updated = [...existing];
    updated[existsIndex] = { ...updated[existsIndex], ...treatmentItem, id: targetId };
  } else {
    updated = [...existing, { ...treatmentItem, id: targetId }];
  }

  writeStorage(TREATMENTS_KEY, updated);

  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('treatments_updated', { detail: updated }));
  }

  return Promise.resolve(updated);
}

export async function deleteTreatment(id) {
  const existing = getStoredTreatments();
  const updated = existing.filter(t => t.id !== id);
  writeStorage(TREATMENTS_KEY, updated);

  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('treatments_updated', { detail: updated }));
  }

  return Promise.resolve(updated);
}

// ----------------- Swarnaprashana -----------------
export function getAllSwarnaprashanaDates() {
  const cached = readStorage(SWARNAPRASHANA_KEY);
  const rawList = Array.isArray(cached) && cached.length > 0 ? cached : defaultSwarnaprashanaSchedule;
  const filtered = rawList.filter(item => parseInt(item.year, 10) !== 2026);
  writeStorage(SWARNAPRASHANA_KEY, filtered);
  return filtered;
}

export async function fetchSwarnaprashanaScheduleFromDb() {
  return Promise.resolve(getAllSwarnaprashanaDates());
}

export function getSwarnaprashanaSchedule({ year = null, activeOnly = true } = {}) {
  const allDates = getAllSwarnaprashanaDates().filter(item => parseInt(item.year, 10) !== 2026);
  let filtered = [...allDates];
  if (activeOnly) filtered = filtered.filter(item => item.status === 'Active');
  if (year !== null && year !== undefined && year !== 'all') {
    const targetYear = parseInt(year, 10);
    filtered = filtered.filter(item => parseInt(item.year, 10) === targetYear);
  }
  return filtered.sort((a, b) => {
    const yrA = parseInt(a.year, 10) || 2027;
    const yrB = parseInt(b.year, 10) || 2027;
    if (yrA !== yrB) return yrA - yrB;
    const monthA = MONTH_NAMES.indexOf(a.month);
    const monthB = MONTH_NAMES.indexOf(b.month);
    if (monthA !== monthB && monthA !== -1 && monthB !== -1) return monthA - monthB;
    return (parseInt(a.date, 10) || 1) - (parseInt(b.date, 10) || 1);
  });
}

export function getAvailableScheduleYears() {
  const allDates = getAllSwarnaprashanaDates().filter(item => parseInt(item.year, 10) !== 2026);
  const yearsSet = new Set(allDates.map(d => parseInt(d.year, 10) || 2027));
  yearsSet.delete(2026);
  if (yearsSet.size === 0) {
    yearsSet.add(2027);
  }
  return Array.from(yearsSet).sort((a, b) => a - b);
}

export async function saveSwarnaprashanaDate(entry) {
  const validation = validatePushyaDate(entry);
  if (!validation.valid) return { success: false, error: validation.message };

  const existing = getAllSwarnaprashanaDates();
  const targetId = entry.id || `psh-${entry.year || 2027}-${String(MONTH_NAMES.indexOf(entry.month) + 1).padStart(2, '0')}-${String(entry.date).padStart(2, '0')}`;
  const existsIndex = existing.findIndex(d => d.id === targetId);

  let updated;
  if (existsIndex >= 0) {
    updated = [...existing];
    updated[existsIndex] = { ...updated[existsIndex], ...entry, id: targetId };
  } else {
    updated = [...existing, { ...entry, id: targetId, status: entry.status || 'Active' }];
  }

  writeStorage(SWARNAPRASHANA_KEY, updated);

  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('swarnaprashana_schedule_updated', { detail: updated }));
  }

  return Promise.resolve({ success: true, data: updated, message: 'Swarnaprashana schedule updated successfully.' });
}

export async function toggleSwarnaprashanaStatus(id, status = null) {
  const existing = getAllSwarnaprashanaDates();
  const updated = existing.map(item => {
    if (item.id === id) {
      const nextStatus = status ? status : (item.status === 'Active' ? 'Inactive' : 'Active');
      return { ...item, status: nextStatus };
    }
    return item;
  });

  writeStorage(SWARNAPRASHANA_KEY, updated);

  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('swarnaprashana_schedule_updated', { detail: updated }));
  }

  return Promise.resolve(updated);
}

export async function deleteSwarnaprashanaDate(id) {
  const existing = getAllSwarnaprashanaDates();
  const updated = existing.filter(item => item.id !== id);

  writeStorage(SWARNAPRASHANA_KEY, updated);

  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('swarnaprashana_schedule_updated', { detail: updated }));
  }

  return Promise.resolve(updated);
}

export async function clearAllAdminData() {
  writeStorage(APPOINTMENTS_KEY, defaultAppointments);
  writeStorage(INQUIRIES_KEY, defaultInquiries);
  writeStorage(CLINIC_SETTINGS_KEY, defaultSettings);
  writeStorage(TREATMENTS_KEY, clinicData.treatments);
  writeStorage(SWARNAPRASHANA_KEY, defaultSwarnaprashanaSchedule);

  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('appointments_updated', { detail: defaultAppointments }));
    window.dispatchEvent(new CustomEvent('inquiries_updated', { detail: defaultInquiries }));
    window.dispatchEvent(new CustomEvent('sk_clinic_settings_updated', { detail: defaultSettings }));
    window.dispatchEvent(new CustomEvent('treatments_updated', { detail: clinicData.treatments }));
    window.dispatchEvent(new CustomEvent('swarnaprashana_schedule_updated', { detail: defaultSwarnaprashanaSchedule }));
  }

  return Promise.resolve({
    appointments: defaultAppointments,
    inquiries: defaultInquiries,
    settings: defaultSettings,
    treatments: clinicData.treatments,
    swarnaprashana: defaultSwarnaprashanaSchedule
  });
}

// ----------------- Phone Validation & Formatting -----------------
export function cleanTenDigitPhone(val = '') {
  if (!val) return '';
  let digits = String(val).replace(/\D/g, '');
  if (digits.startsWith('91') && digits.length > 10) {
    digits = digits.slice(2);
  } else if (digits.startsWith('0') && digits.length > 10) {
    digits = digits.slice(1);
  }
  return digits.slice(0, 10);
}

export function validateTenDigitPhone(val = '') {
  const cleaned = cleanTenDigitPhone(val);
  if (!cleaned) return { isValid: false, message: 'Phone number is required.' };
  if (cleaned.length < 10) return { isValid: false, message: `Phone number must be 10 digits (currently ${cleaned.length} digits).` };
  if (!/^[6-9]\d{9}$/.test(cleaned)) return { isValid: false, message: 'Please enter a valid 10-digit mobile number (starts with 6, 7, 8, or 9).' };
  if (/^(\d)\1{9}$/.test(cleaned)) return { isValid: false, message: 'Please enter a valid 10-digit mobile number.' };
  return { isValid: true, message: '', cleaned };
}
