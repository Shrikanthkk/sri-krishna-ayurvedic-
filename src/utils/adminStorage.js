// Utility helper to bridge PostgreSQL database APIs with client-side reactivity and fallback caching
import { clinicData } from '../data/clinicData';
import { api } from '../services/api';

const APPOINTMENTS_KEY = 'sk_clinic_appointments';
const INQUIRIES_KEY = 'sk_clinic_inquiries';
const CLINIC_SETTINGS_KEY = 'sk_clinic_settings';
const TREATMENTS_KEY = 'sk_clinic_treatments';
const SWARNAPRASHANA_KEY = 'sk_clinic_swarnaprashana_schedule';

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
  phone: "+91 98440 90626",
  altPhone: "+91 98440 90626",
  email: "dranandkrishna31@gmail.com",
  workingHours: "Mon - Sat: 10:00 AM - 7:00 PM (Sunday Closed)"
};

export const defaultSwarnaprashanaSchedule = [
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

export const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export function getDaysInMonth(monthName, year = 2026) {
  const monthMap = {
    January: 31,
    February: (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)) ? 29 : 28,
    March: 31,
    April: 30,
    May: 31,
    June: 30,
    July: 31,
    August: 31,
    September: 30,
    October: 31,
    November: 30,
    December: 31
  };
  return monthMap[monthName] || 31;
}

export function validatePushyaDate({ month, date, year }) {
  if (!month || !month.trim()) {
    return { valid: false, message: 'Month is required.' };
  }
  if (!MONTH_NAMES.includes(month)) {
    return { valid: false, message: `Invalid month selected: "${month}".` };
  }
  const numericDate = parseInt(date, 10);
  if (isNaN(numericDate) || numericDate < 1 || numericDate > 31) {
    return { valid: false, message: 'Date must be a valid number between 1 and 31.' };
  }
  const numericYear = parseInt(year, 10) || 2026;
  const maxDays = getDaysInMonth(month, numericYear);
  if (numericDate > maxDays) {
    return { valid: false, message: `${month} ${numericYear} only has ${maxDays} days. Date ${numericDate} is invalid.` };
  }
  return { valid: true, message: 'Valid' };
}

// ----------------- Appointments -----------------
export function getAppointments() {
  try {
    const stored = localStorage.getItem(APPOINTMENTS_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (err) {
    return [];
  }
}

export async function fetchAppointmentsFromDb(filters = {}) {
  try {
    const data = await api.getAppointments(filters);
    localStorage.setItem(APPOINTMENTS_KEY, JSON.stringify(data));
    return data;
  } catch (err) {
    console.error('Error fetching appointments from PostgreSQL:', err);
    return getAppointments();
  }
}

export async function saveAppointment(appointmentData) {
  try {
    const result = await api.createAppointment(appointmentData);
    if (result.data) {
      const existing = getAppointments();
      const updated = [result.data, ...existing.filter(a => a.id !== result.data.id)];
      localStorage.setItem(APPOINTMENTS_KEY, JSON.stringify(updated));
      return result.data;
    }
    return null;
  } catch (err) {
    console.error('Error saving appointment to PostgreSQL:', err);
    // Fallback local save
    const existing = getAppointments();
    const fallback = {
      id: 'apt-' + Date.now(),
      name: appointmentData.name || 'Anonymous Patient',
      phone: appointmentData.phone || 'N/A',
      email: appointmentData.email || 'N/A',
      treatment: appointmentData.treatment || 'General Consultation',
      date: appointmentData.date || new Date().toISOString().split('T')[0],
      timeSlot: appointmentData.timeSlot || '10:00 AM',
      status: 'Pending',
      notes: appointmentData.notes || appointmentData.message || 'Online booking request',
      submittedAt: new Date().toLocaleString('en-IN', { dateStyle: 'short', timeStyle: 'short' })
    };
    const updated = [fallback, ...existing];
    localStorage.setItem(APPOINTMENTS_KEY, JSON.stringify(updated));
    return fallback;
  }
}

export async function updateAppointmentStatus(id, newStatus) {
  try {
    await api.updateAppointmentStatus(id, newStatus);
    const existing = getAppointments();
    const updated = existing.map(apt => apt.id === id ? { ...apt, status: newStatus } : apt);
    localStorage.setItem(APPOINTMENTS_KEY, JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.error('Error updating appointment status in PostgreSQL:', err);
    const existing = getAppointments();
    const updated = existing.map(apt => apt.id === id ? { ...apt, status: newStatus } : apt);
    localStorage.setItem(APPOINTMENTS_KEY, JSON.stringify(updated));
    return updated;
  }
}

export async function deleteAppointment(id) {
  try {
    await api.deleteAppointment(id);
    const existing = getAppointments();
    const updated = existing.filter(apt => apt.id !== id);
    localStorage.setItem(APPOINTMENTS_KEY, JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.error('Error deleting appointment in PostgreSQL:', err);
    const existing = getAppointments();
    const updated = existing.filter(apt => apt.id !== id);
    localStorage.setItem(APPOINTMENTS_KEY, JSON.stringify(updated));
    return updated;
  }
}

// ----------------- Inquiries -----------------
export function getInquiries() {
  try {
    const stored = localStorage.getItem(INQUIRIES_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (err) {
    return [];
  }
}

export async function fetchInquiriesFromDb() {
  try {
    const data = await api.getInquiries();
    localStorage.setItem(INQUIRIES_KEY, JSON.stringify(data));
    return data;
  } catch (err) {
    console.error('Error fetching inquiries from PostgreSQL:', err);
    return getInquiries();
  }
}

export async function saveInquiry(inquiryData) {
  try {
    const result = await api.createInquiry(inquiryData);
    if (result.data) {
      const existing = getInquiries();
      const updated = [result.data, ...existing.filter(i => i.id !== result.data.id)];
      localStorage.setItem(INQUIRIES_KEY, JSON.stringify(updated));
      return result.data;
    }
    return null;
  } catch (err) {
    console.error('Error saving inquiry to PostgreSQL:', err);
    const existing = getInquiries();
    const fallback = {
      id: 'inq-' + Date.now(),
      name: inquiryData.name || inquiryData.fullName || 'Anonymous Visitor',
      phone: inquiryData.phone || 'N/A',
      email: inquiryData.email || 'N/A',
      subject: inquiryData.subject || 'General Inquiry',
      message: inquiryData.message || 'No message content',
      read: false,
      submittedAt: new Date().toLocaleString('en-IN', { dateStyle: 'short', timeStyle: 'short' })
    };
    const updated = [fallback, ...existing];
    localStorage.setItem(INQUIRIES_KEY, JSON.stringify(updated));
    return fallback;
  }
}

export async function toggleInquiryRead(id) {
  try {
    await api.toggleInquiryRead(id);
    const existing = getInquiries();
    const updated = existing.map(inq => inq.id === id ? { ...inq, read: !inq.read } : inq);
    localStorage.setItem(INQUIRIES_KEY, JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.error('Error toggling inquiry read in PostgreSQL:', err);
    const existing = getInquiries();
    const updated = existing.map(inq => inq.id === id ? { ...inq, read: !inq.read } : inq);
    localStorage.setItem(INQUIRIES_KEY, JSON.stringify(updated));
    return updated;
  }
}

export async function deleteInquiry(id) {
  try {
    await api.deleteInquiry(id);
    const existing = getInquiries();
    const updated = existing.filter(inq => inq.id !== id);
    localStorage.setItem(INQUIRIES_KEY, JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.error('Error deleting inquiry in PostgreSQL:', err);
    const existing = getInquiries();
    const updated = existing.filter(inq => inq.id !== id);
    localStorage.setItem(INQUIRIES_KEY, JSON.stringify(updated));
    return updated;
  }
}

// ----------------- Settings -----------------
export function getClinicSettings() {
  try {
    const stored = localStorage.getItem(CLINIC_SETTINGS_KEY);
    return stored ? JSON.parse(stored) : defaultSettings;
  } catch (err) {
    return defaultSettings;
  }
}

export async function fetchClinicSettingsFromDb() {
  try {
    const data = await api.getClinicSettings();
    const result = data || defaultSettings;
    localStorage.setItem(CLINIC_SETTINGS_KEY, JSON.stringify(result));
    return result;
  } catch (err) {
    console.error('Error fetching settings from PostgreSQL:', err);
    return getClinicSettings();
  }
}

export async function saveClinicSettings(newSettings) {
  try {
    await api.saveClinicSettings(newSettings);
    localStorage.setItem(CLINIC_SETTINGS_KEY, JSON.stringify(newSettings));
    return newSettings;
  } catch (err) {
    console.error('Error saving settings to PostgreSQL:', err);
    localStorage.setItem(CLINIC_SETTINGS_KEY, JSON.stringify(newSettings));
    return newSettings;
  }
}

// ----------------- Treatments -----------------
export function getStoredTreatments() {
  try {
    const stored = localStorage.getItem(TREATMENTS_KEY);
    return stored ? JSON.parse(stored) : clinicData.treatments;
  } catch (err) {
    return clinicData.treatments;
  }
}

export async function fetchTreatmentsFromDb() {
  try {
    const data = await api.getTreatments();
    if (Array.isArray(data) && data.length > 0) {
      localStorage.setItem(TREATMENTS_KEY, JSON.stringify(data));
      return data;
    }
    return getStoredTreatments();
  } catch (err) {
    console.error('Error fetching treatments from PostgreSQL:', err);
    return getStoredTreatments();
  }
}

export async function saveTreatment(treatmentItem) {
  try {
    await api.saveTreatment(treatmentItem);
    const refreshed = await api.getTreatments();
    localStorage.setItem(TREATMENTS_KEY, JSON.stringify(refreshed));
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
}

export async function deleteTreatment(id) {
  try {
    await api.deleteTreatment(id);
    const existing = getStoredTreatments();
    const updated = existing.filter(t => t.id !== id);
    localStorage.setItem(TREATMENTS_KEY, JSON.stringify(updated));
    return updated;
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
  try {
    const stored = localStorage.getItem(SWARNAPRASHANA_KEY);
    return stored ? JSON.parse(stored) : defaultSwarnaprashanaSchedule;
  } catch (err) {
    return defaultSwarnaprashanaSchedule;
  }
}

export async function fetchSwarnaprashanaScheduleFromDb(params = {}) {
  try {
    const data = await api.getSwarnaprashanaSchedule(params);
    if (Array.isArray(data) && data.length > 0) {
      localStorage.setItem(SWARNAPRASHANA_KEY, JSON.stringify(data));
      return data;
    }
    return getAllSwarnaprashanaDates();
  } catch (err) {
    console.error('Error fetching schedule from PostgreSQL:', err);
    return getAllSwarnaprashanaDates();
  }
}

export function getSwarnaprashanaSchedule({ year = null, activeOnly = true } = {}) {
  const allDates = getAllSwarnaprashanaDates();
  let filtered = [...allDates];

  if (activeOnly) {
    filtered = filtered.filter(item => item.status === 'Active');
  }

  if (year !== null && year !== undefined && year !== 'all') {
    const targetYear = parseInt(year, 10);
    filtered = filtered.filter(item => parseInt(item.year, 10) === targetYear);
  }

  return filtered.sort((a, b) => {
    const yearDiff = (parseInt(a.year, 10) || 2026) - (parseInt(b.year, 10) || 2026);
    if (yearDiff !== 0) return yearDiff;
    const monthA = MONTH_NAMES.indexOf(a.month);
    const monthB = MONTH_NAMES.indexOf(b.month);
    if (monthA !== monthB) return monthA - monthB;
    const dateDiff = (parseInt(a.date, 10) || 1) - (parseInt(b.date, 10) || 1);
    if (dateDiff !== 0) return dateDiff;
    return (a.display_order || 0) - (b.display_order || 0);
  });
}

export function getAvailableScheduleYears() {
  const allDates = getAllSwarnaprashanaDates();
  const yearsSet = new Set(allDates.map(d => parseInt(d.year, 10) || 2026));
  yearsSet.add(2026);
  return Array.from(yearsSet).sort((a, b) => a - b);
}

export async function saveSwarnaprashanaDate(entry) {
  try {
    const validation = validatePushyaDate(entry);
    if (!validation.valid) {
      return { success: false, error: validation.message };
    }
    await api.saveSwarnaprashanaDate(entry);
    const refreshed = await api.getSwarnaprashanaSchedule({ activeOnly: false });
    localStorage.setItem(SWARNAPRASHANA_KEY, JSON.stringify(refreshed));
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('swarnaprashana_schedule_updated', { detail: refreshed }));
    }
    return { success: true, data: refreshed, message: 'Swarnaprashana schedule updated successfully.' };
  } catch (err) {
    console.error('Error saving schedule date to PostgreSQL:', err);
    return { success: false, error: err.message || 'Failed to save date.' };
  }
}

export async function toggleSwarnaprashanaStatus(id) {
  try {
    await api.toggleSwarnaprashanaStatus(id);
    const refreshed = await api.getSwarnaprashanaSchedule({ activeOnly: false });
    localStorage.setItem(SWARNAPRASHANA_KEY, JSON.stringify(refreshed));
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('swarnaprashana_schedule_updated', { detail: refreshed }));
    }
    return refreshed;
  } catch (err) {
    console.error('Error toggling schedule status in PostgreSQL:', err);
    return getAllSwarnaprashanaDates();
  }
}

export async function deleteSwarnaprashanaDate(id) {
  try {
    await api.deleteSwarnaprashanaDate(id);
    const refreshed = await api.getSwarnaprashanaSchedule({ activeOnly: false });
    localStorage.setItem(SWARNAPRASHANA_KEY, JSON.stringify(refreshed));
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('swarnaprashana_schedule_updated', { detail: refreshed }));
    }
    return refreshed;
  } catch (err) {
    console.error('Error deleting schedule date in PostgreSQL:', err);
    return getAllSwarnaprashanaDates();
  }
}

export async function clearAllAdminData() {
  try {
    await api.resetAdminDemoData();
    const [apts, inqs, sets, trts, sw] = await Promise.all([
      api.getAppointments(),
      api.getInquiries(),
      api.getClinicSettings(),
      api.getTreatments(),
      api.getSwarnaprashanaSchedule({ activeOnly: false })
    ]);
    localStorage.setItem(APPOINTMENTS_KEY, JSON.stringify(apts));
    localStorage.setItem(INQUIRIES_KEY, JSON.stringify(inqs));
    localStorage.setItem(CLINIC_SETTINGS_KEY, JSON.stringify(sets));
    localStorage.setItem(TREATMENTS_KEY, JSON.stringify(trts));
    localStorage.setItem(SWARNAPRASHANA_KEY, JSON.stringify(sw));
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('swarnaprashana_schedule_updated', { detail: sw }));
    }
    return {
      appointments: apts,
      inquiries: inqs,
      settings: sets,
      treatments: trts,
      swarnaprashana: sw
    };
  } catch (err) {
    console.error('Error resetting admin data in PostgreSQL:', err);
    return {
      appointments: getAppointments(),
      inquiries: getInquiries(),
      settings: getClinicSettings(),
      treatments: getStoredTreatments(),
      swarnaprashana: getAllSwarnaprashanaDates()
    };
  }
}
