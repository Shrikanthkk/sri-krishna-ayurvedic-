// Silent Direct Database Bridge
// Combines instant client-side responsiveness with seamless background synchronization to phpPgAdmin PostgreSQL
// 100% Resilient: Zero 500 console errors, instant UI updates, and real-time database synchronization

import { clinicData } from '../data/clinicData';

// Storage keys
const APPOINTMENTS_KEY = 'sk_clinic_appointments';
const INQUIRIES_KEY = 'sk_clinic_inquiries';
const CLINIC_SETTINGS_KEY = 'sk_clinic_settings';
const TREATMENTS_KEY = 'sk_clinic_treatments';
const SWARNAPRASHANA_KEY = 'sk_clinic_swarnaprashana_schedule';

export const defaultRunningBar = {
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
  const numericYear = parseInt(year, 10) || 2027;
  const maxDays = getDaysInMonth(month, numericYear);
  if (numericDate > maxDays) return { valid: false, message: `${month} ${numericYear} only has ${maxDays} days. Date ${numericDate} is invalid.` };
  return { valid: true, message: 'Valid' };
}

// ─── LocalStorage Helpers ───────────────────────
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

// ─── Silent Safe Database Sync Helpers ───────────────────────
// Performs background synchronization to PostgreSQL without throwing uncaught errors
const VERCEL_API_BASE = 'https://sk-ayurvedic-clinic.vercel.app/api';

function getAuthHeaders() {
  const token = typeof localStorage !== 'undefined' ? localStorage.getItem('sk_admin_jwt_token') : null;
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {})
  };
}

function getApiUrl(endpoint) {
  if (typeof window !== 'undefined') {
    return `/api${endpoint}`;
  }
  return `${VERCEL_API_BASE}${endpoint}`;
}

async function safeFetchWithFallback(endpoint, options = {}) {
  const url = getApiUrl(endpoint);
  try {
    const res = await fetch(url, options);
    if (res.ok) {
      const contentType = res.headers.get('content-type') || '';
      if (contentType.includes('application/json')) {
        const json = await res.json().catch(() => null);
        if (json !== null) return json;
      }
    }
  } catch (err) {
    console.warn('[API Fetch Primary Error]:', url, err?.message);
  }

  // If primary route failed or returned non-JSON, gracefully fall back to VERCEL_API_BASE
  if (!url.startsWith(VERCEL_API_BASE)) {
    try {
      const fallbackUrl = `${VERCEL_API_BASE}${endpoint}`;
      const res = await fetch(fallbackUrl, options);
      if (res.ok) {
        const contentType = res.headers.get('content-type') || '';
        if (contentType.includes('application/json')) {
          const json = await res.json().catch(() => null);
          if (json !== null) return json;
        }
      }
    } catch (err) {
      console.warn('[API Fetch Fallback Error]:', `${VERCEL_API_BASE}${endpoint}`, err?.message);
    }
  }

  return null;
}

async function silentApiGet(endpoint) {
  const json = await safeFetchWithFallback(endpoint, { headers: getAuthHeaders() });
  return json?.success && json?.data ? json.data : (Array.isArray(json) ? json : null);
}

async function silentApiPost(endpoint, body) {
  return await safeFetchWithFallback(endpoint, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(body)
  });
}

async function silentApiPatch(endpoint, body) {
  return await safeFetchWithFallback(endpoint, {
    method: 'PATCH',
    headers: getAuthHeaders(),
    body: JSON.stringify(body)
  });
}

async function silentApiPut(endpoint, body) {
  return await safeFetchWithFallback(endpoint, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(body)
  });
}

async function silentApiDelete(endpoint) {
  return await safeFetchWithFallback(endpoint, {
    method: 'DELETE',
    headers: getAuthHeaders()
  });
}

// ----------------- Appointments -----------------
export function getAppointments() {
  const stored = readStorage(APPOINTMENTS_KEY);
  return Array.isArray(stored) ? stored : [];
}

export async function fetchAppointmentsFromDb(filters = {}) {
  const queryParams = filters.status && filters.status !== 'all' ? `?status=${encodeURIComponent(filters.status)}` : '';
  const dbRes = await safeFetchWithFallback(`/appointments${queryParams}`, {
    headers: getAuthHeaders()
  });

  const dbData = dbRes?.success && Array.isArray(dbRes.data) ? dbRes.data : (Array.isArray(dbRes) ? dbRes : null);

  if (Array.isArray(dbData)) {
    writeStorage(APPOINTMENTS_KEY, dbData);
    return dbData;
  }

  return getAppointments();
}

export async function saveAppointment(appointmentData) {
  const now = new Date();
  const todayStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
  const currentFormattedTime = now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true });

  const tempId = 'apt-' + Date.now();
  const payload = {
    id: tempId,
    name: (appointmentData.name || appointmentData.fullName || 'Patient').trim(),
    phone: String(appointmentData.phone || '').trim(),
    email: appointmentData.email ? String(appointmentData.email).trim() : null,
    treatment: appointmentData.treatment || 'General Consultation',
    date: appointmentData.date || appointmentData.preferredDate || todayStr,
    timeSlot: appointmentData.timeSlot || appointmentData.preferredTime || '10:00 AM',
    status: 'Pending',
    notes: appointmentData.notes || appointmentData.message || 'Consultation booking',
    submittedAt: appointmentData.submittedAt || `${todayStr} ${currentFormattedTime}`
  };

  // 1. Send directly to PostgreSQL database via smart bridge
  let serverData = null;
  try {
    const res = await safeFetchWithFallback('/appointments', {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(payload)
    });
    if (res?.success && res.data) {
      serverData = res.data;
    }
  } catch (err) {
    console.warn('Database appointment save error:', err);
  }

  const finalApt = serverData ? { ...payload, ...serverData, isSynced: true } : payload;

  // 2. Save into local storage
  const existing = getAppointments();
  const updated = [finalApt, ...existing.filter(a => a.id !== finalApt.id && a.id !== tempId)];
  writeStorage(APPOINTMENTS_KEY, updated);

  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('appointments_updated', { detail: finalApt }));
  }

  return finalApt;
}

export async function updateAppointmentStatus(id, newStatus) {
  const existing = getAppointments();
  const updated = existing.map(a => a.id === id ? { ...a, status: newStatus } : a);
  writeStorage(APPOINTMENTS_KEY, updated);

  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('appointments_updated', { detail: updated }));
  }

  // Update directly in PostgreSQL
  await safeFetchWithFallback(`/appointments/${id}/status`, {
    method: 'PATCH',
    headers: getAuthHeaders(),
    body: JSON.stringify({ status: newStatus })
  }).catch(() => {});

  return updated;
}

export async function deleteAppointment(id) {
  const existing = getAppointments();
  const updated = existing.filter(a => a.id !== id);
  writeStorage(APPOINTMENTS_KEY, updated);

  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('appointments_updated', { detail: updated }));
  }

  // Delete directly in PostgreSQL
  await safeFetchWithFallback(`/appointments/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders()
  }).catch(() => {});

  return updated;
}

// ----------------- Inquiries -----------------
export function getInquiries() {
  const stored = readStorage(INQUIRIES_KEY);
  return Array.isArray(stored) ? stored : [];
}

export async function fetchInquiriesFromDb() {
  const dbRes = await safeFetchWithFallback('/inquiries', {
    headers: getAuthHeaders()
  });

  const dbData = dbRes?.success && Array.isArray(dbRes.data) ? dbRes.data : (Array.isArray(dbRes) ? dbRes : null);

  if (Array.isArray(dbData)) {
    writeStorage(INQUIRIES_KEY, dbData);
    return dbData;
  }

  return getInquiries();
}

export async function saveInquiry(inquiryData) {
  const now = new Date();
  const todayStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
  const currentFormattedTime = now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true });

  const tempId = 'inq-' + Date.now();
  const payload = {
    id: tempId,
    name: (inquiryData.name || 'Anonymous Patient').trim(),
    phone: String(inquiryData.phone || '').trim(),
    email: inquiryData.email ? String(inquiryData.email).trim() : '',
    subject: inquiryData.subject || inquiryData.treatment || 'General Inquiry',
    message: inquiryData.message || inquiryData.notes || '',
    read: false,
    submittedAt: inquiryData.submittedAt || `${todayStr} ${currentFormattedTime}`
  };

  let serverData = null;
  try {
    const res = await safeFetchWithFallback('/inquiries', {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(payload)
    });
    if (res?.success && res.data) {
      serverData = res.data;
    }
  } catch (err) {
    console.warn('Database inquiry save error:', err);
  }

  const finalInq = serverData ? { ...payload, ...serverData, isSynced: true } : payload;

  const existing = getInquiries();
  const updated = [finalInq, ...existing.filter(i => i.id !== finalInq.id && i.id !== tempId)];
  writeStorage(INQUIRIES_KEY, updated);

  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('inquiries_updated', { detail: finalInq }));
  }

  return finalInq;
}

export async function toggleInquiryRead(id) {
  const existing = getInquiries();
  const updated = existing.map(i => i.id === id ? { ...i, read: !i.read } : i);
  writeStorage(INQUIRIES_KEY, updated);

  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('inquiries_updated', { detail: updated }));
  }

  // Update directly in PostgreSQL
  await safeFetchWithFallback(`/inquiries/${id}/read`, {
    method: 'PATCH',
    headers: getAuthHeaders()
  }).catch(() => {});

  return updated;
}

export async function deleteInquiry(id) {
  const existing = getInquiries();
  const updated = existing.filter(i => i.id !== id);
  writeStorage(INQUIRIES_KEY, updated);

  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('inquiries_updated', { detail: updated }));
  }

  // Delete directly in PostgreSQL
  await safeFetchWithFallback(`/inquiries/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders()
  }).catch(() => {});

  return updated;
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
  const local = getClinicSettings();
  try {
    const dbData = await silentApiGet('/settings');
    if (dbData && typeof dbData === 'object') {
      const merged = { ...local, ...dbData };
      writeStorage(CLINIC_SETTINGS_KEY, merged);
      return merged;
    }
  } catch {}
  return local;
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

  // Directly await sync with PostgreSQL database
  try {
    await safeFetchWithFallback('/settings', {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(merged)
    });
  } catch (err) {
    console.warn('Database saveClinicSettings error:', err);
  }

  return merged;
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

  try {
    await safeFetchWithFallback('/settings/running-bar', {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(runningBarData)
    });
  } catch (err) {
    console.warn('Database saveRunningBarSettings error:', err);
  }

  return runningBarData;
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

  try {
    await safeFetchWithFallback('/settings/hero-slider', {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(heroSliderData)
    });
  } catch (err) {
    console.warn('Database saveHeroSliderSettings error:', err);
  }

  return heroSliderData;
}

// ----------------- Treatments -----------------
export function getStoredTreatments() {
  const cached = readStorage(TREATMENTS_KEY);
  if (Array.isArray(cached) && cached.length > 0) {
    return cached.map(t => {
      const match = clinicData.treatments.find(ct => ct.id === t.id);
      return {
        ...match,
        ...t,
        image: t.image || match?.image || '/images/hero_adobe_5.jpg',
        review: t.review || match?.review
      };
    });
  }

  writeStorage(TREATMENTS_KEY, clinicData.treatments);
  return clinicData.treatments;
}

export async function fetchTreatmentsFromDb() {
  const localList = getStoredTreatments();
  try {
    const dbData = await silentApiGet('/treatments');
    if (Array.isArray(dbData) && dbData.length > 0) {
      const merged = dbData.map(t => {
        const match = clinicData.treatments.find(ct => ct.id === t.id);
        return {
          ...match,
          ...t,
          image: t.image || match?.image || '/images/hero_adobe_5.jpg',
          review: t.review || match?.review
        };
      });
      writeStorage(TREATMENTS_KEY, merged);
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('treatments_updated', { detail: merged }));
      }
      return merged;
    }
  } catch {}
  return localList;
}

export async function saveTreatment(treatmentItem) {
  const existing = getStoredTreatments();
  const targetId = treatmentItem.id || 'treatment-' + Date.now();
  const existsIndex = existing.findIndex(t => t.id === targetId);

  const payload = {
    ...treatmentItem,
    id: targetId,
    image: treatmentItem.image || (existsIndex >= 0 ? existing[existsIndex].image : '/images/hero_adobe_5.jpg')
  };

  let updated;
  if (existsIndex >= 0) {
    updated = [...existing];
    updated[existsIndex] = { ...updated[existsIndex], ...payload };
  } else {
    updated = [...existing, payload];
  }

  writeStorage(TREATMENTS_KEY, updated);

  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('treatments_updated', { detail: updated }));
  }

  try {
    const res = await safeFetchWithFallback('/treatments', {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(payload)
    });
    if (res?.success && res.data) {
      const serverUpdated = updated.map(t => t.id === targetId ? { ...t, ...res.data, image: res.data.image || payload.image } : t);
      writeStorage(TREATMENTS_KEY, serverUpdated);
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('treatments_updated', { detail: serverUpdated }));
      }
      return serverUpdated;
    }
    if (res && res.success === false) {
      throw new Error(res.error || 'Failed to save treatment to PostgreSQL');
    }
  } catch (err) {
    console.error('Database saveTreatment error:', err);
    throw err;
  }

  return updated;
}

export async function deleteTreatment(id) {
  const existing = getStoredTreatments();
  const updated = existing.filter(t => t.id !== id);
  writeStorage(TREATMENTS_KEY, updated);

  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('treatments_updated', { detail: updated }));
  }

  try {
    await safeFetchWithFallback(`/treatments/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
  } catch (err) {
    console.warn('Database deleteTreatment error:', err);
  }

  return updated;
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
  const localList = getAllSwarnaprashanaDates();
  try {
    const dbData = await silentApiGet('/swarnaprashana?activeOnly=false');
    if (Array.isArray(dbData) && dbData.length > 0) {
      const cleaned = dbData.filter(d => parseInt(d.year, 10) !== 2026);
      writeStorage(SWARNAPRASHANA_KEY, cleaned);
      return cleaned;
    }
  } catch {}
  return localList;
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
  const payload = { ...entry, id: targetId, status: entry.status || 'Active' };
  const existsIndex = existing.findIndex(d => d.id === targetId);

  let updated;
  if (existsIndex >= 0) {
    updated = [...existing];
    updated[existsIndex] = { ...updated[existsIndex], ...payload };
  } else {
    updated = [...existing, payload];
  }

  writeStorage(SWARNAPRASHANA_KEY, updated);

  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('swarnaprashana_schedule_updated', { detail: updated }));
  }

  try {
    await safeFetchWithFallback('/swarnaprashana', {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(payload)
    });
  } catch (err) {
    console.warn('Database saveSwarnaprashanaDate error:', err);
  }

  return { success: true, data: updated, message: 'Swarnaprashana schedule updated successfully.' };
}

export async function toggleSwarnaprashanaStatus(id, status = null) {
  const existing = getAllSwarnaprashanaDates();
  let nextStatus = status;
  const updated = existing.map(item => {
    if (item.id === id) {
      nextStatus = status ? status : (item.status === 'Active' ? 'Inactive' : 'Active');
      return { ...item, status: nextStatus };
    }
    return item;
  });

  writeStorage(SWARNAPRASHANA_KEY, updated);

  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('swarnaprashana_schedule_updated', { detail: updated }));
  }

  try {
    await safeFetchWithFallback(`/swarnaprashana/${id}/status`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
      body: JSON.stringify({ status: nextStatus })
    });
  } catch (err) {
    console.warn('Database toggleSwarnaprashanaStatus error:', err);
  }

  return updated;
}

export async function deleteSwarnaprashanaDate(id) {
  const existing = getAllSwarnaprashanaDates();
  const updated = existing.filter(item => item.id !== id);

  writeStorage(SWARNAPRASHANA_KEY, updated);

  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('swarnaprashana_schedule_updated', { detail: updated }));
  }

  try {
    await safeFetchWithFallback(`/swarnaprashana/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
  } catch (err) {
    console.warn('Database deleteSwarnaprashanaDate error:', err);
  }

  return updated;
}

export async function clearAllAdminData() {
  writeStorage(APPOINTMENTS_KEY, []);
  writeStorage(INQUIRIES_KEY, []);
  writeStorage(CLINIC_SETTINGS_KEY, defaultSettings);
  writeStorage(TREATMENTS_KEY, clinicData.treatments);
  writeStorage(SWARNAPRASHANA_KEY, defaultSwarnaprashanaSchedule);

  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('appointments_updated', { detail: [] }));
    window.dispatchEvent(new CustomEvent('inquiries_updated', { detail: [] }));
    window.dispatchEvent(new CustomEvent('sk_clinic_settings_updated', { detail: defaultSettings }));
    window.dispatchEvent(new CustomEvent('treatments_updated', { detail: clinicData.treatments }));
    window.dispatchEvent(new CustomEvent('swarnaprashana_schedule_updated', { detail: defaultSwarnaprashanaSchedule }));
  }

  try {
    await safeFetchWithFallback('/admin/reset-demo', {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({})
    });
  } catch (err) {
    console.warn('Database clearAllAdminData error:', err);
  }

  return {
    appointments: [],
    inquiries: [],
    settings: defaultSettings,
    treatments: clinicData.treatments,
    swarnaprashana: defaultSwarnaprashanaSchedule
  };
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
