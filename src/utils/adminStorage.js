// Utility helper to bridge PostgreSQL database APIs with client-side reactivity
// ALL data is stored ONLY in PostgreSQL - localStorage is used ONLY as a read-cache for instant UI rendering
import { clinicData } from '../data/clinicData';
import { api } from '../services/api';

// Cache keys - used ONLY for instant initial render, always overwritten by fresh DB data
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
  // 2027 Schedule (Pushya Nakshatra)
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
  const numericYear = parseInt(year, 10) || 2026;
  const maxDays = getDaysInMonth(month, numericYear);
  if (numericDate > maxDays) return { valid: false, message: `${month} ${numericYear} only has ${maxDays} days. Date ${numericDate} is invalid.` };
  return { valid: true, message: 'Valid' };
}

// ─── Read cache helpers (for instant first-render only) ───────────────────────
function readCache(key) {
  try { const s = localStorage.getItem(key); return s ? JSON.parse(s) : null; } catch { return null; }
}
function writeCache(key, data) {
  try { localStorage.setItem(key, JSON.stringify(data)); } catch {}
}

// ----------------- Appointments -----------------
export function getAppointments() {
  return readCache(APPOINTMENTS_KEY) || [];
}

export async function fetchAppointmentsFromDb(filters = {}) {
  const data = await api.getAppointments(filters); // throws on error — caller handles it
  writeCache(APPOINTMENTS_KEY, data);
  return data;
}

export async function saveAppointment(appointmentData) {
  const result = await api.createAppointment(appointmentData); // throws on error
  if (result.data) {
    const existing = readCache(APPOINTMENTS_KEY) || [];
    writeCache(APPOINTMENTS_KEY, [result.data, ...existing.filter(a => a.id !== result.data.id)]);
    return result.data;
  }
  return null;
}

export async function updateAppointmentStatus(id, newStatus) {
  await api.updateAppointmentStatus(id, newStatus); // throws on error
  const data = await api.getAppointments();
  writeCache(APPOINTMENTS_KEY, data);
  return data;
}

export async function deleteAppointment(id) {
  await api.deleteAppointment(id); // throws on error
  const data = await api.getAppointments();
  writeCache(APPOINTMENTS_KEY, data);
  return data;
}

// ----------------- Inquiries -----------------
export function getInquiries() {
  return readCache(INQUIRIES_KEY) || [];
}

export async function fetchInquiriesFromDb() {
  const data = await api.getInquiries(); // throws on error
  writeCache(INQUIRIES_KEY, data);
  return data;
}

export async function saveInquiry(inquiryData) {
  const result = await api.createInquiry(inquiryData); // throws on error
  if (result.data) {
    const existing = readCache(INQUIRIES_KEY) || [];
    writeCache(INQUIRIES_KEY, [result.data, ...existing.filter(i => i.id !== result.data.id)]);
    return result.data;
  }
  return null;
}

export async function toggleInquiryRead(id) {
  await api.toggleInquiryRead(id); // throws on error
  const data = await api.getInquiries();
  writeCache(INQUIRIES_KEY, data);
  return data;
}

export async function deleteInquiry(id) {
  await api.deleteInquiry(id); // throws on error
  const data = await api.getInquiries();
  writeCache(INQUIRIES_KEY, data);
  return data;
}

// ----------------- Settings -----------------
export function getClinicSettings() {
  return readCache(CLINIC_SETTINGS_KEY) || defaultSettings;
}

export async function fetchClinicSettingsFromDb() {
  const data = await api.getClinicSettings(); // throws on error
  const result = data || defaultSettings;
  writeCache(CLINIC_SETTINGS_KEY, result);
  return result;
}

export async function saveClinicSettings(newSettings) {
  await api.saveClinicSettings(newSettings); // throws on error
  writeCache(CLINIC_SETTINGS_KEY, newSettings);
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('sk_clinic_settings_updated', { detail: newSettings }));
    window.dispatchEvent(new CustomEvent('sk_running_bar_updated', { detail: newSettings.runningBar }));
    window.dispatchEvent(new CustomEvent('sk_hero_slider_updated', { detail: newSettings.heroSlider }));
  }
  return newSettings;
}

export function getRunningBarSettings() {
  return getClinicSettings().runningBar || defaultRunningBar;
}

export async function saveRunningBarSettings(runningBarData) {
  await api.updateRunningBarSettings(runningBarData); // throws on error
  const currentSettings = getClinicSettings();
  const updatedSettings = { ...currentSettings, runningBar: runningBarData };
  writeCache(CLINIC_SETTINGS_KEY, updatedSettings);
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('sk_running_bar_updated', { detail: runningBarData }));
  }
  return runningBarData;
}

export function getHeroSliderSettings() {
  return getClinicSettings().heroSlider || defaultHeroSlider;
}

export async function saveHeroSliderSettings(heroSliderData) {
  await api.updateHeroSliderSettings(heroSliderData); // throws on error
  const currentSettings = getClinicSettings();
  const updatedSettings = { ...currentSettings, heroSlider: heroSliderData };
  writeCache(CLINIC_SETTINGS_KEY, updatedSettings);
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('sk_hero_slider_updated', { detail: heroSliderData }));
  }
  return heroSliderData;
}

// ----------------- Treatments -----------------
export function getStoredTreatments() {
  const cached = readCache(TREATMENTS_KEY);
  if (cached && cached.length > 0) {
    return cached.map(t => {
      const match = clinicData.treatments.find(ct => ct.id === t.id);
      return { ...t, review: t.review || match?.review };
    });
  }
  return clinicData.treatments;
}

export async function fetchTreatmentsFromDb() {
  const data = await api.getTreatments(); // throws on error
  if (Array.isArray(data)) {
    if (data.length > 0) {
      const merged = data.map(t => {
        const match = clinicData.treatments.find(ct => ct.id === t.id);
        return { ...t, review: t.review || match?.review };
      });
      writeCache(TREATMENTS_KEY, merged);
      return merged;
    }
    // DB returned empty array — clear cache so we don't show stale data
    writeCache(TREATMENTS_KEY, []);
    return [];
  }
  return getStoredTreatments(); // truly null/undefined response only
}

export async function saveTreatment(treatmentItem) {
  try {
    await api.saveTreatment(treatmentItem);
    const refreshed = await fetchTreatmentsFromDb();
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('treatments_updated', { detail: refreshed }));
    }
    return refreshed;
  } catch (err) {
    console.error('Error saving treatment to PostgreSQL:', err);
    const existing = getStoredTreatments();
    const existsIndex = existing.findIndex(t => t.id === treatmentItem.id);
    let updated;
    if (existsIndex >= 0) {
      updated = [...existing];
      updated[existsIndex] = { ...updated[existsIndex], ...treatmentItem };
    } else {
      updated = [...existing, { ...treatmentItem, id: treatmentItem.id || 'treatment-' + Date.now() }];
    }
    localStorage.setItem(TREATMENTS_KEY, JSON.stringify(updated));
    return updated;
  }
  // Step 2: Re-fetch the full list from DB to confirm and update cache
  const refreshed = await api.getTreatments();
  if (Array.isArray(refreshed)) {
    writeCache(TREATMENTS_KEY, refreshed);
    return refreshed;
  }
  // Worst case: return at least the saved item wrapped in an array
  return saveResult.data ? [saveResult.data] : [];
}

export async function deleteTreatment(id) {
  try {
    await api.deleteTreatment(id);
    const refreshed = await fetchTreatmentsFromDb();
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('treatments_updated', { detail: refreshed }));
    }
    return refreshed;
  } catch (err) {
    console.error('Error deleting treatment in PostgreSQL:', err);
    const existing = getStoredTreatments();
    const updated = existing.filter(t => t.id !== id);
    localStorage.setItem(TREATMENTS_KEY, JSON.stringify(updated));
    return updated;
  }
}

// ----------------- Swarnaprashana -----------------
export function getAllSwarnaprashanaDates() {
  return readCache(SWARNAPRASHANA_KEY) || defaultSwarnaprashanaSchedule;
}

export async function fetchSwarnaprashanaScheduleFromDb(params = {}) {
  const data = await api.getSwarnaprashanaSchedule(params); // throws on error
  if (Array.isArray(data)) {
    writeCache(SWARNAPRASHANA_KEY, data);
    return data;
  }
  return getAllSwarnaprashanaDates();
}

export function getSwarnaprashanaSchedule({ year = null, activeOnly = true } = {}) {
  const allDates = getAllSwarnaprashanaDates();
  let filtered = [...allDates];
  if (activeOnly) filtered = filtered.filter(item => item.status === 'Active');
  if (year !== null && year !== undefined && year !== 'all') {
    const targetYear = parseInt(year, 10);
    filtered = filtered.filter(item => parseInt(item.year, 10) === targetYear);
  }
  return filtered.sort((a, b) => {
    const yrA = parseInt(a.year, 10) || 2026;
    const yrB = parseInt(b.year, 10) || 2026;
    if (yrA !== yrB) return yrA - yrB;
    const monthA = MONTH_NAMES.indexOf(a.month);
    const monthB = MONTH_NAMES.indexOf(b.month);
    if (monthA !== monthB && monthA !== -1 && monthB !== -1) return monthA - monthB;
    return (parseInt(a.date, 10) || 1) - (parseInt(b.date, 10) || 1);
  });
}

export function getAvailableScheduleYears() {
  const allDates = getAllSwarnaprashanaDates();
  const yearsSet = new Set(allDates.map(d => parseInt(d.year, 10) || 2027));
  if (yearsSet.size === 0) {
    yearsSet.add(2027);
  }
  return Array.from(yearsSet).sort((a, b) => a - b);
}

export async function saveSwarnaprashanaDate(entry) {
  const validation = validatePushyaDate(entry);
  if (!validation.valid) return { success: false, error: validation.message };

  const apiRes = await api.saveSwarnaprashanaDate(entry); // throws on error
  if (apiRes && apiRes.success === false) return { success: false, error: apiRes.error || 'Failed to save date.' };

  const refreshed = await api.getSwarnaprashanaSchedule({ activeOnly: false });
  if (Array.isArray(refreshed)) {
    writeCache(SWARNAPRASHANA_KEY, refreshed);
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('swarnaprashana_schedule_updated', { detail: refreshed }));
    }
  }
  return { success: true, data: refreshed, message: 'Swarnaprashana schedule updated successfully.' };
}

export async function toggleSwarnaprashanaStatus(id, status = null) {
  await api.toggleSwarnaprashanaStatus(id, status); // throws on error
  const refreshed = await api.getSwarnaprashanaSchedule({ activeOnly: false });
  if (Array.isArray(refreshed)) {
    writeCache(SWARNAPRASHANA_KEY, refreshed);
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('swarnaprashana_schedule_updated', { detail: refreshed }));
    }
  }
  return refreshed;
}

export async function deleteSwarnaprashanaDate(id) {
  await api.deleteSwarnaprashanaDate(id); // throws on error
  const refreshed = await api.getSwarnaprashanaSchedule({ activeOnly: false });
  if (Array.isArray(refreshed)) {
    writeCache(SWARNAPRASHANA_KEY, refreshed);
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('swarnaprashana_schedule_updated', { detail: refreshed }));
    }
  }
  return refreshed;
}

export async function clearAllAdminData() {
  await api.resetAdminDemoData();
  const [apts, inqs, sets, trts, sw] = await Promise.all([
    api.getAppointments(),
    api.getInquiries(),
    api.getClinicSettings(),
    api.getTreatments(),
    api.getSwarnaprashanaSchedule({ activeOnly: false })
  ]);
  writeCache(APPOINTMENTS_KEY, apts);
  writeCache(INQUIRIES_KEY, inqs);
  writeCache(CLINIC_SETTINGS_KEY, sets);
  writeCache(TREATMENTS_KEY, trts);
  writeCache(SWARNAPRASHANA_KEY, sw);
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('swarnaprashana_schedule_updated', { detail: sw }));
  }
  return { appointments: apts, inquiries: inqs, settings: sets, treatments: trts, swarnaprashana: sw };
}

// ----------------- Phone Validation & Formatting -----------------
export function cleanTenDigitPhone(val = '') {
  if (!val) return '';
  const digits = String(val).replace(/\D/g, '');
  if (digits.length === 12 && digits.startsWith('91')) return digits.slice(2, 12);
  if (digits.length === 11 && digits.startsWith('0')) return digits.slice(1, 11);
  return digits.slice(0, 10);
}

export function validateTenDigitPhone(val = '') {
  const cleaned = cleanTenDigitPhone(val);
  if (!cleaned) return { isValid: false, message: 'Phone number is required.' };
  if (cleaned.length < 10) return { isValid: false, message: `Phone number must be exactly 10 digits (currently ${cleaned.length} digits).` };
  if (!/^[6-9]\d{9}$/.test(cleaned)) return { isValid: false, message: 'Please enter a valid 10-digit mobile number (starts with 6, 7, 8, or 9).' };
  if (/^(\d)\1{9}$/.test(cleaned)) return { isValid: false, message: 'Repeated digits are not allowed. Please enter a genuine mobile number.' };
  if (/(\d)\1{5,}/.test(cleaned)) return { isValid: false, message: 'Consecutive repeated digits are not allowed. Please enter a genuine mobile number.' };
  const uniqueDigits = new Set(cleaned.split(''));
  if (uniqueDigits.size <= 2) return { isValid: false, message: 'Invalid phone pattern. Please enter a genuine 10-digit mobile number.' };
  const dummyNumbers = ['1234567890', '9876543210', '0123456789', '9898989898', '9000000000', '8000000000', '7000000000', '6000000000', '9123456789', '8123456789', '7123456789'];
  if (dummyNumbers.includes(cleaned)) return { isValid: false, message: 'Dummy or test numbers are not allowed. Please enter a genuine mobile number.' };
  return { isValid: true, message: '', cleaned };
}
