const API_BASE_URL = typeof window !== 'undefined' && window.location.origin
  ? '/api'
  : 'http://localhost:5000/api';

function getAuthHeaders() {
  const token = typeof localStorage !== 'undefined' ? localStorage.getItem('sk_admin_jwt_token') : null;
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {})
  };
}

async function handleResponse(response) {
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const errorMessage = data.error || `HTTP error ${response.status}: ${response.statusText}`;
    throw new Error(errorMessage);
  }
  return data;
}

export const api = {
  // Auth
  async login({ username, email, password, pin }) {
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password, pin })
    });
    const data = await handleResponse(res);
    if (data.token && typeof localStorage !== 'undefined') {
      localStorage.setItem('sk_admin_jwt_token', data.token);
      localStorage.setItem('sk_admin_user', JSON.stringify(data.user));
    }
    return data;
  },

  async getCurrentUser() {
    const res = await fetch(`${API_BASE_URL}/auth/me`, {
      headers: getAuthHeaders()
    });
    return handleResponse(res);
  },

  logout() {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('sk_admin_jwt_token');
      localStorage.removeItem('sk_admin_user');
    }
  },

  // Appointments
  async getAppointments(filters = {}) {
    const params = new URLSearchParams();
    if (filters.status && filters.status !== 'all') params.append('status', filters.status);
    if (filters.search) params.append('search', filters.search);

    const queryString = params.toString() ? `?${params.toString()}` : '';
    const res = await fetch(`${API_BASE_URL}/appointments${queryString}`, {
      headers: getAuthHeaders()
    });
    const data = await handleResponse(res);
    return data.data || [];
  },

  async createAppointment(appointmentData) {
    const res = await fetch(`${API_BASE_URL}/appointments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(appointmentData)
    });
    return handleResponse(res);
  },

  async updateAppointmentStatus(id, status) {
    const res = await fetch(`${API_BASE_URL}/appointments/${id}/status`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
      body: JSON.stringify({ status })
    });
    return handleResponse(res);
  },

  async deleteAppointment(id) {
    const res = await fetch(`${API_BASE_URL}/appointments/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    return handleResponse(res);
  },

  // Inquiries
  async getInquiries() {
    const res = await fetch(`${API_BASE_URL}/inquiries`, {
      headers: getAuthHeaders()
    });
    const data = await handleResponse(res);
    return data.data || [];
  },

  async createInquiry(inquiryData) {
    const res = await fetch(`${API_BASE_URL}/inquiries`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(inquiryData)
    });
    return handleResponse(res);
  },

  async toggleInquiryRead(id) {
    const res = await fetch(`${API_BASE_URL}/inquiries/${id}/read`, {
      method: 'PATCH',
      headers: getAuthHeaders()
    });
    return handleResponse(res);
  },

  async deleteInquiry(id) {
    const res = await fetch(`${API_BASE_URL}/inquiries/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    return handleResponse(res);
  },

  // Clinic Settings
  async getClinicSettings() {
    const res = await fetch(`${API_BASE_URL}/settings`);
    const data = await handleResponse(res);
    return data.data;
  },

  async saveClinicSettings(settingsData) {
    const res = await fetch(`${API_BASE_URL}/settings`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(settingsData)
    });
    return handleResponse(res);
  },

  async resetClinicSettings() {
    const res = await fetch(`${API_BASE_URL}/settings/reset`, {
      method: 'POST',
      headers: getAuthHeaders()
    });
    return handleResponse(res);
  },

  // Treatments
  async getTreatments() {
    const res = await fetch(`${API_BASE_URL}/treatments`);
    const data = await handleResponse(res);
    return data.data || [];
  },

  async saveTreatment(treatmentItem) {
    const res = await fetch(`${API_BASE_URL}/treatments`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(treatmentItem)
    });
    return handleResponse(res);
  },

  async deleteTreatment(id) {
    const res = await fetch(`${API_BASE_URL}/treatments/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    return handleResponse(res);
  },

  // Swarnaprashana Schedule
  async getSwarnaprashanaSchedule({ year = null, activeOnly = false } = {}) {
    const params = new URLSearchParams();
    if (year && year !== 'all') params.append('year', year);
    if (activeOnly) params.append('activeOnly', 'true');

    const queryString = params.toString() ? `?${params.toString()}` : '';
    const res = await fetch(`${API_BASE_URL}/swarnaprashana${queryString}`);
    const data = await handleResponse(res);
    return data.data || [];
  },

  async saveSwarnaprashanaDate(entry) {
    const res = await fetch(`${API_BASE_URL}/swarnaprashana`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(entry)
    });
    return handleResponse(res);
  },

  async toggleSwarnaprashanaStatus(id) {
    const res = await fetch(`${API_BASE_URL}/swarnaprashana/${id}/status`, {
      method: 'PATCH',
      headers: getAuthHeaders()
    });
    return handleResponse(res);
  },

  async deleteSwarnaprashanaDate(id) {
    const res = await fetch(`${API_BASE_URL}/swarnaprashana/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    return handleResponse(res);
  },

  // Admin Reset
  async resetAdminDemoData() {
    const res = await fetch(`${API_BASE_URL}/admin/reset-demo`, {
      method: 'POST',
      headers: getAuthHeaders()
    });
    return handleResponse(res);
  }
};

export default api;
