// Utility helper to manage persisted appointments, contact inquiries, editable clinic settings, and treatments in localStorage for the Admin Dashboard

import { clinicData } from '../data/clinicData';

const APPOINTMENTS_KEY = 'sk_clinic_appointments';
const INQUIRIES_KEY = 'sk_clinic_inquiries';
const CLINIC_SETTINGS_KEY = 'sk_clinic_settings';
const TREATMENTS_KEY = 'sk_clinic_treatments';

// Initial realistic demo seed data if localStorage is empty
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
    treatment: 'Panchakarma Detox Therapy',
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
    subject: 'Panchakarma Package Details',
    message: 'Could you please provide details about the 7-day Panchakarma detoxification schedule and timings at KR Puram main branch?',
    read: true,
    submittedAt: '2026-08-11 04:10 PM'
  }
];

export const defaultSettings = {
  mainAddress: "No 426, Near Lakshmi Super Speciality Hospital, 3rd Main, Krishnarajapuram, Bangalore 560036",
  branchAddress: "No. 98, Opp Kanti Sweets, T. C. Palya Main Road, Anandapura, Krishnarajapuram, Bangalore 560036",
  doctorName: "Dr. Anand Krishna",
  qualifications: "BAMS (Bachelor of Ayurvedic Medicine & Surgery)",
  registrationNo: "13199",
  experienceYears: "26+",
  consultationFee: "₹50",
  feeNote: "Fixed Fee at Visit",
  phone: "+91 98450 12345",
  altPhone: "+91 98440 90626",
  email: "dranandkrishna31@gmail.com",
  workingHours: "Mon - Sat: 10:00 AM - 7:00 PM (Sunday Closed)"
};

// Helper functions for Appointments
export function getAppointments() {
  try {
    const stored = localStorage.getItem(APPOINTMENTS_KEY);
    if (!stored) {
      localStorage.setItem(APPOINTMENTS_KEY, JSON.stringify(defaultAppointments));
      return defaultAppointments;
    }
    return JSON.parse(stored);
  } catch (err) {
    console.error('Error reading appointments from localStorage:', err);
    return defaultAppointments;
  }
}

export function saveAppointment(appointmentData) {
  try {
    const existing = getAppointments();
    const newAppointment = {
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
    const updated = [newAppointment, ...existing];
    localStorage.setItem(APPOINTMENTS_KEY, JSON.stringify(updated));
    return newAppointment;
  } catch (err) {
    console.error('Error saving appointment:', err);
    return null;
  }
}

export function updateAppointmentStatus(id, newStatus) {
  try {
    const existing = getAppointments();
    const updated = existing.map(apt => apt.id === id ? { ...apt, status: newStatus } : apt);
    localStorage.setItem(APPOINTMENTS_KEY, JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.error('Error updating appointment status:', err);
    return [];
  }
}

export function deleteAppointment(id) {
  try {
    const existing = getAppointments();
    const updated = existing.filter(apt => apt.id !== id);
    localStorage.setItem(APPOINTMENTS_KEY, JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.error('Error deleting appointment:', err);
    return [];
  }
}

// Helper functions for Contact Inquiries
export function getInquiries() {
  try {
    const stored = localStorage.getItem(INQUIRIES_KEY);
    if (!stored) {
      localStorage.setItem(INQUIRIES_KEY, JSON.stringify(defaultInquiries));
      return defaultInquiries;
    }
    return JSON.parse(stored);
  } catch (err) {
    console.error('Error reading inquiries from localStorage:', err);
    return defaultInquiries;
  }
}

export function saveInquiry(inquiryData) {
  try {
    const existing = getInquiries();
    const newInquiry = {
      id: 'inq-' + Date.now(),
      name: inquiryData.name || 'Anonymous Visitor',
      phone: inquiryData.phone || 'N/A',
      email: inquiryData.email || 'N/A',
      subject: inquiryData.subject || 'General Inquiry',
      message: inquiryData.message || 'No message content',
      read: false,
      submittedAt: new Date().toLocaleString('en-IN', { dateStyle: 'short', timeStyle: 'short' })
    };
    const updated = [newInquiry, ...existing];
    localStorage.setItem(INQUIRIES_KEY, JSON.stringify(updated));
    return newInquiry;
  } catch (err) {
    console.error('Error saving inquiry:', err);
    return null;
  }
}

export function toggleInquiryRead(id) {
  try {
    const existing = getInquiries();
    const updated = existing.map(inq => inq.id === id ? { ...inq, read: !inq.read } : inq);
    localStorage.setItem(INQUIRIES_KEY, JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.error('Error toggling inquiry read status:', err);
    return [];
  }
}

export function deleteInquiry(id) {
  try {
    const existing = getInquiries();
    const updated = existing.filter(inq => inq.id !== id);
    localStorage.setItem(INQUIRIES_KEY, JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.error('Error deleting inquiry:', err);
    return [];
  }
}

// Helper functions for Clinic Settings
export function getClinicSettings() {
  try {
    const stored = localStorage.getItem(CLINIC_SETTINGS_KEY);
    if (!stored) {
      localStorage.setItem(CLINIC_SETTINGS_KEY, JSON.stringify(defaultSettings));
      return defaultSettings;
    }
    return JSON.parse(stored);
  } catch (err) {
    console.error('Error reading clinic settings from localStorage:', err);
    return defaultSettings;
  }
}

export function saveClinicSettings(newSettings) {
  try {
    localStorage.setItem(CLINIC_SETTINGS_KEY, JSON.stringify(newSettings));
    return newSettings;
  } catch (err) {
    console.error('Error saving clinic settings:', err);
    return newSettings;
  }
}

// Helper functions for Treatments Management
export function getStoredTreatments() {
  try {
    const stored = localStorage.getItem(TREATMENTS_KEY);
    if (!stored) {
      localStorage.setItem(TREATMENTS_KEY, JSON.stringify(clinicData.treatments));
      return clinicData.treatments;
    }
    const parsed = JSON.parse(stored);
    if (!Array.isArray(parsed)) {
      localStorage.setItem(TREATMENTS_KEY, JSON.stringify(clinicData.treatments));
      return clinicData.treatments;
    }
    // Synchronize canonical treatments with latest images, links, and text
    const merged = clinicData.treatments.map(canonical => {
      const existing = parsed.find(item => item.id === canonical.id);
      return existing ? { ...existing, image: canonical.image, link: canonical.link, title: canonical.title, subtitle: canonical.subtitle } : canonical;
    });
    // Preserve any custom user-added treatments from admin
    const custom = parsed.filter(item => !clinicData.treatments.some(c => c.id === item.id));
    const finalTreatments = [...merged, ...custom];
    localStorage.setItem(TREATMENTS_KEY, JSON.stringify(finalTreatments));
    return finalTreatments;
  } catch (err) {
    console.error('Error reading stored treatments:', err);
    return clinicData.treatments;
  }
}

export function saveTreatment(treatmentItem) {
  try {
    const existing = getStoredTreatments();
    let updated;
    const existsIndex = existing.findIndex(t => t.id === treatmentItem.id);

    if (existsIndex >= 0) {
      // Edit existing
      updated = [...existing];
      updated[existsIndex] = { ...updated[existsIndex], ...treatmentItem };
    } else {
      // Add new treatment
      const newTreatment = {
        id: treatmentItem.id || 'treatment-' + Date.now(),
        number: String(existing.length + 1).padStart(2, '0'),
        title: treatmentItem.title || 'New Treatment Service',
        subtitle: treatmentItem.subtitle || 'Ayurvedic Care',
        description: treatmentItem.description || 'Custom treatment protocol prepared by Dr. Anand Krishna.',
        benefits: treatmentItem.benefits || ["Authentic Ayurvedic care", "Root-cause relief"],
        duration: treatmentItem.duration || 'Custom Duration'
      };
      updated = [...existing, newTreatment];
    }

    localStorage.setItem(TREATMENTS_KEY, JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.error('Error saving treatment:', err);
    return getStoredTreatments();
  }
}

export function deleteTreatment(id) {
  try {
    const existing = getStoredTreatments();
    const updated = existing.filter(t => t.id !== id);
    localStorage.setItem(TREATMENTS_KEY, JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.error('Error deleting treatment:', err);
    return [];
  }
}

// Helper functions for Swarnaprashana Schedule Management
const SWARNAPRASHANA_KEY = 'sk_clinic_swarnaprashana_schedule';

export const defaultSwarnaprashanaSchedule = [
  { id: 'psh-2026-01', month: 'January', date: '5', year: 2026, full_date: '2026-01-05', status: 'Active', display_order: 1, created_at: '2026-01-01', updated_at: '2026-01-01' },
  { id: 'psh-2026-02a', month: 'February', date: '1', year: 2026, full_date: '2026-02-01', status: 'Active', display_order: 2, created_at: '2026-01-01', updated_at: '2026-01-01' },
  { id: 'psh-2026-02b', month: 'February', date: '28', year: 2026, full_date: '2026-02-28', status: 'Active', display_order: 3, created_at: '2026-01-01', updated_at: '2026-01-01' },
  { id: 'psh-2026-03', month: 'March', date: '28', year: 2026, full_date: '2026-03-28', status: 'Active', display_order: 4, created_at: '2026-01-01', updated_at: '2026-01-01' },
  { id: 'psh-2026-04', month: 'April', date: '24', year: 2026, full_date: '2026-04-24', status: 'Active', display_order: 5, created_at: '2026-01-01', updated_at: '2026-01-01' },
  { id: 'psh-2026-05', month: 'May', date: '21', year: 2026, full_date: '2026-05-21', status: 'Active', display_order: 6, created_at: '2026-01-01', updated_at: '2026-01-01' },
  { id: 'psh-2026-06', month: 'June', date: '18', year: 2026, full_date: '2026-06-18', status: 'Active', display_order: 7, created_at: '2026-01-01', updated_at: '2026-01-01' },
  { id: 'psh-2026-07', month: 'July', date: '15', year: 2026, full_date: '2026-07-15', status: 'Active', display_order: 8, created_at: '2026-01-01', updated_at: '2026-01-01' },
  { id: 'psh-2026-08', month: 'August', date: '11', year: 2026, full_date: '2026-08-11', status: 'Active', display_order: 9, created_at: '2026-01-01', updated_at: '2026-01-01' },
  { id: 'psh-2026-09', month: 'September', date: '8', year: 2026, full_date: '2026-09-08', status: 'Active', display_order: 10, created_at: '2026-01-01', updated_at: '2026-01-01' },
  { id: 'psh-2026-10', month: 'October', date: '5', year: 2026, full_date: '2026-10-05', status: 'Active', display_order: 11, created_at: '2026-01-01', updated_at: '2026-01-01' },
  { id: 'psh-2026-11a', month: 'November', date: '1', year: 2026, full_date: '2026-11-01', status: 'Active', display_order: 12, created_at: '2026-01-01', updated_at: '2026-01-01' },
  { id: 'psh-2026-11b', month: 'November', date: '29', year: 2026, full_date: '2026-11-29', status: 'Active', display_order: 13, created_at: '2026-01-01', updated_at: '2026-01-01' },
  { id: 'psh-2026-12', month: 'December', date: '26', year: 2026, full_date: '2026-12-26', status: 'Active', display_order: 14, created_at: '2026-01-01', updated_at: '2026-01-01' }
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

// Fetch all Swarnaprashana dates from storage
export function getAllSwarnaprashanaDates() {
  try {
    const stored = localStorage.getItem(SWARNAPRASHANA_KEY);
    if (!stored) {
      localStorage.setItem(SWARNAPRASHANA_KEY, JSON.stringify(defaultSwarnaprashanaSchedule));
      return defaultSwarnaprashanaSchedule;
    }
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? parsed : defaultSwarnaprashanaSchedule;
  } catch (err) {
    console.error('Error reading swarnaprashana schedule:', err);
    return defaultSwarnaprashanaSchedule;
  }
}

// Fetch filtered Swarnaprashana schedule (e.g. For public frontend: activeOnly = true)
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

  // Sort by year, month index, then date
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

// Get distinct years in the schedule database
export function getAvailableScheduleYears() {
  const allDates = getAllSwarnaprashanaDates();
  const yearsSet = new Set(allDates.map(d => parseInt(d.year, 10) || 2026));
  yearsSet.add(2026);
  return Array.from(yearsSet).sort((a, b) => a - b);
}

// Save (Add / Edit) a Swarnaprashana date entry
export function saveSwarnaprashanaDate(entry) {
  try {
    const validation = validatePushyaDate(entry);
    if (!validation.valid) {
      throw new Error(validation.message);
    }

    const allDates = getAllSwarnaprashanaDates();
    const numericYear = parseInt(entry.year, 10) || 2026;
    const numericDate = parseInt(entry.date, 10);
    const monthIndex = MONTH_NAMES.indexOf(entry.month) + 1;
    const padMonth = String(monthIndex).padStart(2, '0');
    const padDate = String(numericDate).padStart(2, '0');
    const fullDate = entry.full_date || `${numericYear}-${padMonth}-${padDate}`;

    let updated;
    const existsIndex = allDates.findIndex(d => d.id === entry.id);

    if (existsIndex >= 0) {
      // Update existing date
      updated = [...allDates];
      updated[existsIndex] = {
        ...updated[existsIndex],
        month: entry.month,
        date: String(numericDate),
        year: numericYear,
        full_date: fullDate,
        status: entry.status || 'Active',
        display_order: parseInt(entry.display_order, 10) || updated[existsIndex].display_order || 1,
        updated_at: new Date().toISOString()
      };
    } else {
      // Add new date
      const newEntry = {
        id: entry.id || 'psh-' + Date.now(),
        month: entry.month,
        date: String(numericDate),
        year: numericYear,
        full_date: fullDate,
        status: entry.status || 'Active',
        display_order: parseInt(entry.display_order, 10) || (allDates.length + 1),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      updated = [...allDates, newEntry];
    }

    localStorage.setItem(SWARNAPRASHANA_KEY, JSON.stringify(updated));
    
    // Broadcast storage event for real-time reactivity
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('swarnaprashana_schedule_updated', { detail: updated }));
    }

    return { success: true, data: updated, message: 'Swarnaprashana schedule updated successfully.' };
  } catch (err) {
    console.error('Error saving swarnaprashana date:', err);
    return { success: false, error: err.message || 'Failed to save date.' };
  }
}

// Toggle date active/inactive status
export function toggleSwarnaprashanaStatus(id) {
  try {
    const allDates = getAllSwarnaprashanaDates();
    const updated = allDates.map(item => 
      item.id === id 
        ? { ...item, status: item.status === 'Active' ? 'Inactive' : 'Active', updated_at: new Date().toISOString() } 
        : item
    );
    localStorage.setItem(SWARNAPRASHANA_KEY, JSON.stringify(updated));
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('swarnaprashana_schedule_updated', { detail: updated }));
    }
    return updated;
  } catch (err) {
    console.error('Error toggling swarnaprashana status:', err);
    return getAllSwarnaprashanaDates();
  }
}

// Delete date
export function deleteSwarnaprashanaDate(id) {
  try {
    const allDates = getAllSwarnaprashanaDates();
    const updated = allDates.filter(item => item.id !== id);
    localStorage.setItem(SWARNAPRASHANA_KEY, JSON.stringify(updated));
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('swarnaprashana_schedule_updated', { detail: updated }));
    }
    return updated;
  } catch (err) {
    console.error('Error deleting swarnaprashana date:', err);
    return getAllSwarnaprashanaDates();
  }
}

export function clearAllAdminData() {
  localStorage.setItem(APPOINTMENTS_KEY, JSON.stringify(defaultAppointments));
  localStorage.setItem(INQUIRIES_KEY, JSON.stringify(defaultInquiries));
  localStorage.setItem(CLINIC_SETTINGS_KEY, JSON.stringify(defaultSettings));
  localStorage.setItem(TREATMENTS_KEY, JSON.stringify(clinicData.treatments));
  localStorage.setItem(SWARNAPRASHANA_KEY, JSON.stringify(defaultSwarnaprashanaSchedule));
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('swarnaprashana_schedule_updated', { detail: defaultSwarnaprashanaSchedule }));
  }
  return { 
    appointments: defaultAppointments, 
    inquiries: defaultInquiries, 
    settings: defaultSettings,
    treatments: clinicData.treatments,
    swarnaprashana: defaultSwarnaprashanaSchedule
  };
}

