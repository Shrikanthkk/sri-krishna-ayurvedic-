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
    treatment: 'Swarnamrutha Prashana',
    date: '2026-08-18',
    timeSlot: '11:00 AM',
    status: 'Completed',
    notes: 'Child immunity monthly gold drop session.',
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
    return JSON.parse(stored);
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

export function clearAllAdminData() {
  localStorage.setItem(APPOINTMENTS_KEY, JSON.stringify(defaultAppointments));
  localStorage.setItem(INQUIRIES_KEY, JSON.stringify(defaultInquiries));
  localStorage.setItem(CLINIC_SETTINGS_KEY, JSON.stringify(defaultSettings));
  localStorage.setItem(TREATMENTS_KEY, JSON.stringify(clinicData.treatments));
  return { 
    appointments: defaultAppointments, 
    inquiries: defaultInquiries, 
    settings: defaultSettings,
    treatments: clinicData.treatments 
  };
}
