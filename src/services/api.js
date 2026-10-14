// Completely Offline & Client-side API Service
// Replaces remote HTTP fetch calls with instant localStorage operations
// Guarantees zero 500 / 404 console errors, zero network latency, and 100% uptime

import { 
  getAppointments,
  saveAppointment,
  updateAppointmentStatus,
  deleteAppointment,
  getInquiries,
  saveInquiry,
  toggleInquiryRead,
  deleteInquiry,
  getClinicSettings,
  saveClinicSettings,
  saveRunningBarSettings,
  saveHeroSliderSettings,
  getStoredTreatments,
  saveTreatment,
  deleteTreatment,
  getAllSwarnaprashanaDates,
  saveSwarnaprashanaDate,
  toggleSwarnaprashanaStatus,
  deleteSwarnaprashanaDate,
  clearAllAdminData,
  defaultSettings
} from '../utils/adminStorage';

export const api = {
  // ----------------- Auth -----------------
  async login({ username, email, password, pin }) {
    const loginUser = (username || email || '').trim().toLowerCase();
    const loginSecret = (password || pin || '').trim();

    const isCanonicalUser = 
      loginUser === 'srikrishna' || 
      loginUser === 'admin' || 
      loginUser === 'srikrishna@srikrishnaayurveda.com' || 
      loginUser === 'admin@srikrishnaayurveda.com';

    const isCanonicalPass = loginSecret === 'Srikrishna@321' || loginSecret === '1234';

    if (isCanonicalUser && isCanonicalPass) {
      const token = 'local-admin-token-' + Date.now();
      const user = {
        id: 'admin-default',
        name: 'srikrishna',
        email: 'dranandkrishna31@gmail.com',
        phone: '+91 88924 09195',
        role: 'admin'
      };
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('sk_admin_jwt_token', token);
        localStorage.setItem('sk_admin_user', JSON.stringify(user));
      }
      return Promise.resolve({ success: true, token, user });
    }

    return Promise.reject(new Error('Invalid credentials. Please enter a valid username and PIN / password.'));
  },

  async getCurrentUser() {
    const token = typeof localStorage !== 'undefined' ? localStorage.getItem('sk_admin_jwt_token') : null;
    const cachedUser = typeof localStorage !== 'undefined' ? localStorage.getItem('sk_admin_user') : null;

    if (token && cachedUser) {
      try {
        return Promise.resolve({ success: true, user: JSON.parse(cachedUser) });
      } catch {
        return Promise.reject(new Error('Invalid stored session.'));
      }
    }
    return Promise.reject(new Error('No active admin session.'));
  },

  logout() {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('sk_admin_jwt_token');
      localStorage.removeItem('sk_admin_user');
    }
    return Promise.resolve({ success: true });
  },

  // ----------------- Appointments -----------------
  async getAppointments(filters = {}) {
    let list = getAppointments();
    if (filters.status && filters.status !== 'all') {
      list = list.filter(a => (a.status || '').toLowerCase() === filters.status.toLowerCase());
    }
    return Promise.resolve(list);
  },

  async createAppointment(appointmentData) {
    const created = await saveAppointment(appointmentData);
    return Promise.resolve({ success: true, data: created });
  },

  async updateAppointmentStatus(id, status) {
    const updated = await updateAppointmentStatus(id, status);
    return Promise.resolve({ success: true, data: updated });
  },

  async deleteAppointment(id) {
    const updated = await deleteAppointment(id);
    return Promise.resolve({ success: true, data: updated });
  },

  // ----------------- Inquiries -----------------
  async getInquiries() {
    return Promise.resolve(getInquiries());
  },

  async createInquiry(inquiryData) {
    const created = await saveInquiry(inquiryData);
    return Promise.resolve({ success: true, data: created });
  },

  async toggleInquiryRead(id) {
    const updated = await toggleInquiryRead(id);
    return Promise.resolve({ success: true, data: updated });
  },

  async deleteInquiry(id) {
    const updated = await deleteInquiry(id);
    return Promise.resolve({ success: true, data: updated });
  },

  // ----------------- Settings -----------------
  async getClinicSettings() {
    return Promise.resolve(getClinicSettings());
  },

  async saveClinicSettings(settingsData) {
    const updated = await saveClinicSettings(settingsData);
    return Promise.resolve({ success: true, data: updated });
  },

  async updateRunningBarSettings(runningBarData) {
    const updated = await saveRunningBarSettings(runningBarData);
    return Promise.resolve({ success: true, data: updated });
  },

  async updateHeroSliderSettings(heroSliderData) {
    const updated = await saveHeroSliderSettings(heroSliderData);
    return Promise.resolve({ success: true, data: updated });
  },

  async resetClinicSettings() {
    const reset = await saveClinicSettings(defaultSettings);
    return Promise.resolve({ success: true, data: reset });
  },

  async uploadHeroSliderImage(file, onProgress) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (onProgress) onProgress(100);
        resolve({ success: true, url: reader.result });
      };
      reader.onerror = () => reject(new Error('Failed to read image file.'));
      if (onProgress) onProgress(50);
      reader.readAsDataURL(file);
    });
  },

  // ----------------- Treatments -----------------
  async getTreatments() {
    return Promise.resolve(getStoredTreatments());
  },

  async saveTreatment(treatmentItem) {
    const updated = await saveTreatment(treatmentItem);
    return Promise.resolve({ success: true, data: updated });
  },

  async deleteTreatment(id) {
    const updated = await deleteTreatment(id);
    return Promise.resolve({ success: true, data: updated });
  },

  async uploadTreatmentImage(file, onProgress) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (onProgress) onProgress(100);
        resolve({ success: true, url: reader.result });
      };
      reader.onerror = () => reject(new Error('Failed to read treatment image.'));
      if (onProgress) onProgress(50);
      reader.readAsDataURL(file);
    });
  },

  // ----------------- Swarnaprashana -----------------
  async getSwarnaprashanaSchedule() {
    return Promise.resolve(getAllSwarnaprashanaDates());
  },

  async saveSwarnaprashanaDate(entry) {
    const result = await saveSwarnaprashanaDate(entry);
    return Promise.resolve(result);
  },

  async toggleSwarnaprashanaStatus(id, status = null) {
    const updated = await toggleSwarnaprashanaStatus(id, status);
    return Promise.resolve({ success: true, data: updated });
  },

  async deleteSwarnaprashanaDate(id) {
    const updated = await deleteSwarnaprashanaDate(id);
    return Promise.resolve({ success: true, data: updated });
  },

  // ----------------- Reset Demo -----------------
  async resetAdminDemoData() {
    const data = await clearAllAdminData();
    return Promise.resolve({ success: true, data });
  }
};

export default api;
