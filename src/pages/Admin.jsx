import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  Calendar, 
  MessageSquare, 
  Search, 
  Filter, 
  CheckCircle, 
  Clock, 
  XCircle, 
  Trash2, 
  Mail, 
  Phone, 
  Lock, 
  Unlock, 
  RefreshCw, 
  Building2, 
  MapPin, 
  Check, 
  Eye, 
  ExternalLink,
  Shield,
  Save,
  Edit3,
  Award,
  Plus,
  Stethoscope,
  Sparkles,
  CalendarDays,
  AlertCircle
} from 'lucide-react';
import PageHero from '../components/PageHero';
import Breadcrumb from '../components/Breadcrumb';
import { clinicData } from '../data/clinicData';
import { 
  getAppointments, 
  updateAppointmentStatus, 
  deleteAppointment, 
  getInquiries, 
  toggleInquiryRead, 
  deleteInquiry, 
  getClinicSettings,
  saveClinicSettings,
  getStoredTreatments,
  saveTreatment,
  deleteTreatment,
  clearAllAdminData,
  defaultSettings,
  getAllSwarnaprashanaDates,
  saveSwarnaprashanaDate,
  deleteSwarnaprashanaDate,
  toggleSwarnaprashanaStatus,
  getAvailableScheduleYears,
  MONTH_NAMES
} from '../utils/adminStorage';

export default function Admin() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTabParam = searchParams.get('tab') || 'appointments';
  
  const [activeTab, setActiveTab] = useState(activeTabParam);
  const [pin, setPin] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [pinError, setPinError] = useState(false);

  const [appointments, setAppointments] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [settings, setSettings] = useState(defaultSettings);
  const [treatments, setTreatments] = useState([]);

  // Swarnaprashana Schedule State
  const [swarnaSchedule, setSwarnaSchedule] = useState([]);
  const [swarnaYears, setSwarnaYears] = useState([2026]);
  const [swarnaFilterYear, setSwarnaFilterYear] = useState('2026');
  const [swarnaStatusFilter, setSwarnaStatusFilter] = useState('all');
  const [swarnaSearchQuery, setSwarnaSearchQuery] = useState('');
  const [swarnaNotice, setSwarnaNotice] = useState('');
  const [editingSwarnaDate, setEditingSwarnaDate] = useState(null);
  const [isSwarnaModalOpen, setIsSwarnaModalOpen] = useState(false);
  const [swarnaModalError, setSwarnaModalError] = useState('');

  const [settingsSavedNotice, setSettingsSavedNotice] = useState(false);
  const [treatmentNotice, setTreatmentNotice] = useState('');

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedInquiry, setSelectedInquiry] = useState(null);

  // Treatment Modal State (Add / Edit)
  const [editingTreatment, setEditingTreatment] = useState(null);
  const [isTreatmentModalOpen, setIsTreatmentModalOpen] = useState(false);

  // Load data on mount
  useEffect(() => {
    setAppointments(getAppointments());
    setInquiries(getInquiries());
    setSettings(getClinicSettings());
    setTreatments(getStoredTreatments());
    setSwarnaSchedule(getAllSwarnaprashanaDates());
    setSwarnaYears(getAvailableScheduleYears());
  }, []);

  // Synchronize tab state with search params
  useEffect(() => {
    setActiveTab(activeTabParam);
  }, [activeTabParam]);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    setSearchParams({ tab: tabId });
  };

  const handlePinSubmit = (e) => {
    e.preventDefault();
    if (username.trim().toLowerCase() === 'admin' && pin === '1234') {
      setIsAuthenticated(true);
      setPinError(false);
    } else {
      setPinError(true);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPin('');
    setUsername('');
    setPinError(false);
  };

  // Appointment actions
  const handleStatusChange = (id, newStatus) => {
    const updated = updateAppointmentStatus(id, newStatus);
    setAppointments(updated);
  };

  const handleDeleteAppointment = (id) => {
    if (window.confirm('Are you sure you want to delete this appointment record?')) {
      const updated = deleteAppointment(id);
      setAppointments(updated);
    }
  };

  // Inquiry actions
  const handleToggleRead = (id) => {
    const updated = toggleInquiryRead(id);
    setInquiries(updated);
  };

  const handleDeleteInquiry = (id) => {
    if (window.confirm('Are you sure you want to delete this inquiry message?')) {
      const updated = deleteInquiry(id);
      setInquiries(updated);
      if (selectedInquiry && selectedInquiry.id === id) {
        setSelectedInquiry(null);
      }
    }
  };

  // Settings Save action
  const handleSaveSettings = (e) => {
    e?.preventDefault();
    saveClinicSettings(settings);
    setSettingsSavedNotice(true);
    setTimeout(() => {
      setSettingsSavedNotice(false);
    }, 4000);
  };

  const handleResetSettings = () => {
    if (window.confirm('Reset clinic settings to original default values?')) {
      saveClinicSettings(defaultSettings);
      setSettings(defaultSettings);
      setSettingsSavedNotice(true);
      setTimeout(() => {
        setSettingsSavedNotice(false);
      }, 4000);
    }
  };

  // Treatment actions
  const handleOpenAddTreatment = () => {
    setEditingTreatment({
      id: '',
      title: '',
      subtitle: 'Ayurvedic Therapy',
      description: '',
      duration: '45 Minutes'
    });
    setIsTreatmentModalOpen(true);
  };

  const handleOpenEditTreatment = (item) => {
    setEditingTreatment({ ...item });
    setIsTreatmentModalOpen(true);
  };

  const handleSaveTreatmentModal = (e) => {
    e.preventDefault();
    if (!editingTreatment.title.trim()) return;

    const updated = saveTreatment(editingTreatment);
    setTreatments(updated);
    setIsTreatmentModalOpen(false);
    setTreatmentNotice(`Treatment "${editingTreatment.title}" updated successfully!`);
    setTimeout(() => setTreatmentNotice(''), 4000);
  };

  const handleDeleteTreatmentItem = (id, title) => {
    if (window.confirm(`Are you sure you want to delete the treatment "${title}"?`)) {
      const updated = deleteTreatment(id);
      setTreatments(updated);
      setTreatmentNotice(`Treatment "${title}" removed.`);
      setTimeout(() => setTreatmentNotice(''), 4000);
    }
  };

  // Swarnaprashana Schedule actions
  const handleOpenAddSwarnaDate = () => {
    const currentYr = swarnaFilterYear === 'all' ? 2026 : parseInt(swarnaFilterYear, 10) || 2026;
    setEditingSwarnaDate({
      id: '',
      month: 'January',
      date: '1',
      year: currentYr,
      full_date: `${currentYr}-01-01`,
      status: 'Active',
      display_order: swarnaSchedule.length + 1
    });
    setSwarnaModalError('');
    setIsSwarnaModalOpen(true);
  };

  const handleOpenEditSwarnaDate = (item) => {
    setEditingSwarnaDate({ ...item });
    setSwarnaModalError('');
    setIsSwarnaModalOpen(true);
  };

  const handleSaveSwarnaModal = (e) => {
    e.preventDefault();
    setSwarnaModalError('');
    
    const result = saveSwarnaprashanaDate(editingSwarnaDate);
    if (!result.success) {
      setSwarnaModalError(result.error);
      return;
    }

    setSwarnaSchedule(getAllSwarnaprashanaDates());
    setSwarnaYears(getAvailableScheduleYears());
    setIsSwarnaModalOpen(false);
    setSwarnaNotice('Swarnaprashana schedule updated successfully.');
    setTimeout(() => setSwarnaNotice(''), 4000);
  };

  const handleDeleteSwarnaItem = (id, month, date, year) => {
    if (window.confirm(`Are you sure you want to delete the Pushya Nakshatra date "${month} ${date}, ${year}"?`)) {
      const updated = deleteSwarnaprashanaDate(id);
      setSwarnaSchedule(updated);
      setSwarnaYears(getAvailableScheduleYears());
      setSwarnaNotice('Swarnaprashana schedule updated successfully.');
      setTimeout(() => setSwarnaNotice(''), 4000);
    }
  };

  const handleToggleSwarnaStatusItem = (id) => {
    const updated = toggleSwarnaprashanaStatus(id);
    setSwarnaSchedule(updated);
    setSwarnaNotice('Swarnaprashana schedule updated successfully.');
    setTimeout(() => setSwarnaNotice(''), 3000);
  };

  const handleRestoreDemo = () => {
    if (window.confirm('Reset admin database to demo records?')) {
      const { appointments: a, inquiries: i, settings: s, treatments: t, swarnaprashana: sw } = clearAllAdminData();
      setAppointments(a);
      setInquiries(i);
      setSettings(s);
      setTreatments(t);
      setSwarnaSchedule(sw);
      setSwarnaYears(getAvailableScheduleYears());
    }
  };

  // Calculations
  const pendingCount = appointments.filter(a => a.status === 'Pending').length;
  const confirmedCount = appointments.filter(a => a.status === 'Confirmed' || a.status === 'Completed').length;
  const unreadInquiriesCount = inquiries.filter(i => !i.read).length;

  // Filtered Appointments
  const filteredAppointments = appointments.filter(apt => {
    const matchesSearch = apt.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          apt.phone.includes(searchQuery) ||
                          apt.treatment.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || apt.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  // Filtered Inquiries
  const filteredInquiries = inquiries.filter(inq => {
    const matchesSearch = inq.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          inq.phone.includes(searchQuery) ||
                          inq.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          inq.message.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || 
                          (statusFilter === 'unread' && !inq.read) || 
                          (statusFilter === 'read' && inq.read);
    return matchesSearch && matchesStatus;
  });

  // ── Full-page login screen (shown when not authenticated) ──
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-forest-950 flex items-center justify-center px-4 relative overflow-hidden">

        {/* Decorative background elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-96 h-96 bg-brass-500/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-brass-500/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
          <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] bg-forest-900/40 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-md"
        >
          {/* Card */}
          <div className="bg-forest-900/80 backdrop-blur-sm border border-forest-700/50 rounded-3xl overflow-hidden shadow-2xl">

            {/* Header band */}
            <div className="bg-forest-800 px-8 py-6 flex flex-col items-center gap-3 border-b border-forest-700/50">
              <div className="w-14 h-14 rounded-2xl bg-brass-500 flex items-center justify-center shadow-elevated">
                <span className="font-serif font-bold text-forest-950 text-xl">SK</span>
              </div>
              <div className="text-center">
                <h1 className="font-serif text-cream-50 text-xl font-semibold leading-tight">Sri Krishna Ayurvedic Clinic</h1>
                <p className="text-brass-400 text-xs font-mono uppercase tracking-widest mt-0.5">Admin Portal</p>
              </div>
            </div>

            {/* Form body */}
            <div className="px-8 py-8">
              <h2 className="text-cream-50 font-serif text-lg font-medium mb-1">Welcome back</h2>
              <p className="text-cream-200/50 text-xs mb-6">Sign in to access the clinic management dashboard.</p>

              <form onSubmit={handlePinSubmit} className="space-y-4">

                {/* Username field */}
                <div className="space-y-1.5">
                  <label className="block text-[11px] font-bold uppercase tracking-widest text-brass-400">
                    Username
                  </label>
                  <div className="relative">
                    <Shield className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-cream-200/30 pointer-events-none" />
                    <input
                      type="text"
                      autoComplete="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="admin"
                      required
                      className="w-full pl-10 pr-4 py-3 bg-forest-950/60 border border-forest-700 rounded-xl text-cream-50 text-sm font-medium placeholder-cream-200/20 focus:outline-none focus:border-brass-500 transition-colors"
                    />
                  </div>
                </div>

                {/* Password field */}
                <div className="space-y-1.5">
                  <label className="block text-[11px] font-bold uppercase tracking-widest text-brass-400">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-cream-200/30 pointer-events-none" />
                    <input
                      type="password"
                      autoComplete="current-password"
                      maxLength={12}
                      value={pin}
                      onChange={(e) => setPin(e.target.value)}
                      placeholder="••••••••"
                      required
                      className="w-full pl-10 pr-4 py-3 bg-forest-950/60 border border-forest-700 rounded-xl text-cream-50 text-sm font-mono tracking-widest placeholder-cream-200/20 focus:outline-none focus:border-brass-500 transition-colors"
                    />
                  </div>
                </div>

                {/* Error message */}
                {pinError && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 px-4 py-2.5 bg-red-900/30 border border-red-700/40 rounded-xl"
                  >
                    <XCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                    <p className="text-xs text-red-300 font-medium">Invalid credentials. Please try again.</p>
                  </motion.div>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  className="w-full py-3.5 bg-brass-500 hover:bg-brass-400 text-forest-950 font-bold text-xs uppercase tracking-wider rounded-xl shadow-soft cursor-pointer transition-colors mt-2 flex items-center justify-center gap-2"
                >
                  <Unlock className="w-4 h-4" />
                  Sign In to Dashboard
                </button>
              </form>

              {/* Back link */}
              <div className="mt-6 text-center">
                <Link to="/" className="text-xs text-cream-200/40 hover:text-brass-400 transition-colors">
                  ← Back to main website
                </Link>
              </div>
            </div>
          </div>

          {/* Hint */}
          <p className="text-center text-[10px] text-cream-200/20 mt-4">
            Default: username <span className="font-mono text-brass-500/50">admin</span> • password <span className="font-mono text-brass-500/50">1234</span>
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full min-h-screen bg-cream-50"
    >
      {/* Dedicated Admin Header Bar (Replaces Public Navbar) */}
      <div className="bg-forest-950 text-cream-50 border-b border-forest-900 sticky top-0 z-40 py-3 px-4 sm:px-8 flex items-center justify-between shadow-elevated">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-brass-500 text-forest-950 flex items-center justify-center font-serif font-bold text-xs shadow-soft">
            SK
          </div>
          <div>
            <h1 className="font-serif text-sm sm:text-base font-medium text-cream-50 leading-tight flex items-center gap-2">
              <span>Sri Krishna Clinic</span>
              <span className="px-2 py-0.5 bg-brass-500/20 text-brass-400 text-[10px] font-mono font-bold uppercase rounded border border-brass-400/30">
                ADMIN PORTAL
              </span>
            </h1>
            <span className="text-[10px] text-cream-200/70 block">Doctor: Dr. Anand Krishna (BAMS) • Reception Desk</span>
          </div>
        </div>

        {/* Logout button */}
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-forest-900 hover:bg-red-900/60 text-cream-50 text-xs font-semibold uppercase tracking-wider rounded-full border border-forest-700 hover:border-red-700/60 flex items-center gap-1.5 transition-colors shadow-soft cursor-pointer"
        >
          <Lock className="w-3.5 h-3.5 text-brass-400" />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>

      <PageHero
        badge="CLINIC MANAGEMENT PORTAL"
        title="Admin Dashboard"
        subtitle="Manage patient appointments, contact inquiries, treatments directory, and clinic settings for Sri Krishna Ayurvedic Clinic."
        bgImage="/images/hero_stock_3.jpg"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Breadcrumb items={[{ label: 'Admin Dashboard' }]} />

        <div className="space-y-10">

            {/* Dashboard Overview Cards Header (Fee removed) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              
              <div className="bg-white p-6 rounded-2xl border border-earth-200 shadow-sm flex items-center justify-between">
                <div className="space-y-1">
                  <span className="text-[11px] font-bold text-earth-600 uppercase tracking-wider block">Total Appointments</span>
                  <span className="text-3xl font-serif font-semibold text-forest-950">{appointments.length}</span>
                  <span className="text-[11px] text-emerald-600 font-medium block">{pendingCount} Pending Approval</span>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-forest-100 text-forest-900 flex items-center justify-center shrink-0">
                  <Calendar className="w-6 h-6" />
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-earth-200 shadow-sm flex items-center justify-between">
                <div className="space-y-1">
                  <span className="text-[11px] font-bold text-earth-600 uppercase tracking-wider block">Contact Messages</span>
                  <span className="text-3xl font-serif font-semibold text-forest-950">{inquiries.length}</span>
                  <span className="text-[11px] text-brass-700 font-medium block">{unreadInquiriesCount} Unread Inquiry</span>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-brass-100 text-brass-800 flex items-center justify-center shrink-0">
                  <MessageSquare className="w-6 h-6" />
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-earth-200 shadow-sm flex items-center justify-between">
                <div className="space-y-1">
                  <span className="text-[11px] font-bold text-earth-600 uppercase tracking-wider block">Confirmed Patients</span>
                  <span className="text-3xl font-serif font-semibold text-forest-950">{confirmedCount}</span>
                  <span className="text-[11px] text-earth-600 block">{settings.doctorName} ({settings.experienceYears} yrs)</span>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                  <Users className="w-6 h-6" />
                </div>
              </div>

            </div>

            {/* Navigation Tabs & Controls Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-earth-200 pb-4">
              
              <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0">
                <button
                  onClick={() => handleTabChange('appointments')}
                  className={`px-5 py-2.5 text-xs font-semibold uppercase tracking-wider transition-all -skew-x-12 cursor-pointer border-0 ${
                    activeTab === 'appointments'
                      ? 'bg-forest-900 text-cream-50 shadow-soft'
                      : 'bg-white text-earth-800 hover:bg-cream-100 border border-earth-200'
                  }`}
                  style={{ borderRadius: '2px 6px 2px 6px' }}
                >
                  <span className="skew-x-12 flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-brass-400" />
                    <span>Appointments ({appointments.length})</span>
                  </span>
                </button>

                <button
                  onClick={() => handleTabChange('inquiries')}
                  className={`px-5 py-2.5 text-xs font-semibold uppercase tracking-wider transition-all -skew-x-12 cursor-pointer border-0 ${
                    activeTab === 'inquiries'
                      ? 'bg-forest-900 text-cream-50 shadow-soft'
                      : 'bg-white text-earth-800 hover:bg-cream-100 border border-earth-200'
                  }`}
                  style={{ borderRadius: '2px 6px 2px 6px' }}
                >
                  <span className="skew-x-12 flex items-center gap-2">
                    <MessageSquare className="w-3.5 h-3.5 text-brass-400" />
                    <span>Contact Messages ({inquiries.length})</span>
                    {unreadInquiriesCount > 0 && (
                      <span className="w-2 h-2 rounded-full bg-brass-400 animate-ping" />
                    )}
                  </span>
                </button>

                <button
                  onClick={() => handleTabChange('treatments')}
                  className={`px-5 py-2.5 text-xs font-semibold uppercase tracking-wider transition-all -skew-x-12 cursor-pointer border-0 ${
                    activeTab === 'treatments'
                      ? 'bg-forest-900 text-cream-50 shadow-soft'
                      : 'bg-white text-earth-800 hover:bg-cream-100 border border-earth-200'
                  }`}
                  style={{ borderRadius: '2px 6px 2px 6px' }}
                >
                  <span className="skew-x-12 flex items-center gap-2">
                    <Stethoscope className="w-3.5 h-3.5 text-brass-400" />
                    <span>Treatments ({treatments.length})</span>
                  </span>
                </button>

                <button
                  onClick={() => handleTabChange('swarnaprashana')}
                  className={`px-5 py-2.5 text-xs font-semibold uppercase tracking-wider transition-all -skew-x-12 cursor-pointer border-0 ${
                    activeTab === 'swarnaprashana'
                      ? 'bg-forest-900 text-cream-50 shadow-soft'
                      : 'bg-white text-earth-800 hover:bg-cream-100 border border-earth-200'
                  }`}
                  style={{ borderRadius: '2px 6px 2px 6px' }}
                >
                  <span className="skew-x-12 flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-brass-400" />
                    <span>Swarnaprashana Schedule ({swarnaSchedule.length})</span>
                  </span>
                </button>

                <button
                  onClick={() => handleTabChange('settings')}
                  className={`px-5 py-2.5 text-xs font-semibold uppercase tracking-wider transition-all -skew-x-12 cursor-pointer border-0 ${
                    activeTab === 'settings'
                      ? 'bg-forest-900 text-cream-50 shadow-soft'
                      : 'bg-white text-earth-800 hover:bg-cream-100 border border-earth-200'
                  }`}
                  style={{ borderRadius: '2px 6px 2px 6px' }}
                >
                  <span className="skew-x-12 flex items-center gap-2">
                    <Edit3 className="w-3.5 h-3.5 text-brass-400" />
                    <span>Clinic Settings</span>
                  </span>
                </button>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handleRestoreDemo}
                  className="px-3.5 py-2 bg-white text-earth-800 hover:bg-cream-100 text-xs font-semibold rounded-xl border border-earth-200 flex items-center gap-1.5 cursor-pointer shadow-sm"
                  title="Reset Demo Records"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-brass-600" />
                  <span>Restore Demo Data</span>
                </button>

                <button
                  onClick={handleLogout}
                  className="px-3.5 py-2 bg-forest-900 hover:bg-forest-800 text-cream-50 text-xs font-semibold rounded-xl flex items-center gap-1.5 cursor-pointer shadow-sm"
                >
                  <Lock className="w-3.5 h-3.5 text-brass-400" />
                  <span>Lock</span>
                </button>
              </div>

            </div>

            {/* TAB 1: APPOINTMENTS MANAGEMENT (Fee column removed) */}
            {activeTab === 'appointments' && (
              <div className="space-y-6">
                
                {/* Search & Filter Bar */}
                <div className="bg-white p-4 rounded-2xl border border-earth-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="relative w-full sm:w-80">
                    <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search patient name, phone, or treatment..."
                      className="w-full pl-10 pr-4 py-2 bg-cream-50 border border-earth-200 rounded-xl text-xs focus:outline-none focus:border-forest-800"
                    />
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <Filter className="w-4 h-4 text-earth-600 shrink-0" />
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="px-3 py-2 bg-cream-50 border border-earth-200 rounded-xl text-xs font-semibold text-forest-950 focus:outline-none"
                    >
                      <option value="all">All Statuses</option>
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>
                </div>

                {/* Appointments Table (Fee column removed) */}
                <div className="bg-white rounded-3xl border border-earth-200 shadow-elevated overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-forest-950 text-cream-50 uppercase tracking-wider font-semibold text-[11px]">
                        <tr>
                          <th className="py-4 px-6">ID & Timestamp</th>
                          <th className="py-4 px-6">Patient Name</th>
                          <th className="py-4 px-6">Phone / Email</th>
                          <th className="py-4 px-6">Treatment Service</th>
                          <th className="py-4 px-6">Date & Time Slot</th>
                          <th className="py-4 px-6">Status</th>
                          <th className="py-4 px-6 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-earth-100 text-earth-900 font-light">
                        {filteredAppointments.length === 0 ? (
                          <tr>
                            <td colSpan={7} className="py-12 text-center text-earth-600 font-serif italic text-base">
                              No appointment records found matching your filters.
                            </td>
                          </tr>
                        ) : (
                          filteredAppointments.map((apt) => (
                            <tr key={apt.id} className="hover:bg-cream-50/80 transition-colors">
                              <td className="py-4 px-6">
                                <span className="font-mono text-[11px] font-bold text-forest-900 block">{apt.id}</span>
                                <span className="text-[10px] text-gray-500">{apt.submittedAt}</span>
                              </td>
                              <td className="py-4 px-6 font-semibold text-forest-950 text-sm">
                                {apt.name}
                              </td>
                              <td className="py-4 px-6 space-y-0.5">
                                <p className="font-semibold text-brass-700">{apt.phone}</p>
                                <p className="text-[11px] text-gray-500">{apt.email}</p>
                              </td>
                              <td className="py-4 px-6">
                                <span className="px-2.5 py-1 bg-cream-100 text-forest-900 rounded-md font-medium text-[11px] block border border-earth-200">
                                  {apt.treatment}
                                </span>
                                {apt.notes && (
                                  <span className="text-[10px] text-gray-500 block truncate max-w-xs mt-0.5 italic">
                                    "{apt.notes}"
                                  </span>
                                )}
                              </td>
                              <td className="py-4 px-6 space-y-0.5">
                                <span className="font-semibold text-forest-950 block">{apt.date}</span>
                                <span className="text-[11px] text-emerald-700 font-medium block">{apt.timeSlot}</span>
                              </td>
                              <td className="py-4 px-6">
                                <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider inline-block ${
                                  apt.status === 'Confirmed' ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' :
                                  apt.status === 'Completed' ? 'bg-forest-100 text-forest-900 border border-forest-300' :
                                  apt.status === 'Cancelled' ? 'bg-red-100 text-red-800 border border-red-200' :
                                  'bg-amber-100 text-amber-900 border border-amber-300'
                                }`}>
                                  {apt.status}
                                </span>
                              </td>
                              <td className="py-4 px-6 text-right space-x-1">
                                <button
                                  onClick={() => handleStatusChange(apt.id, 'Confirmed')}
                                  className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-500 text-white text-[10px] font-bold rounded-lg transition-colors cursor-pointer"
                                  title="Mark Confirmed"
                                >
                                  Confirm
                                </button>
                                <button
                                  onClick={() => handleStatusChange(apt.id, 'Completed')}
                                  className="px-2.5 py-1 bg-forest-900 hover:bg-forest-800 text-white text-[10px] font-bold rounded-lg transition-colors cursor-pointer"
                                  title="Mark Completed"
                                >
                                  Done
                                </button>
                                <button
                                  onClick={() => handleDeleteAppointment(apt.id)}
                                  className="p-1 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                                  title="Delete Record"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

              </div>
            )}

            {/* TAB 2: INQUIRIES & CONTACT MESSAGES */}
            {activeTab === 'inquiries' && (
              <div className="space-y-6">
                
                {/* Search & Filter Bar */}
                <div className="bg-white p-4 rounded-2xl border border-earth-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="relative w-full sm:w-80">
                    <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search name, subject, phone, message..."
                      className="w-full pl-10 pr-4 py-2 bg-cream-50 border border-earth-200 rounded-xl text-xs focus:outline-none focus:border-forest-800"
                    />
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <Filter className="w-4 h-4 text-earth-600 shrink-0" />
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="px-3 py-2 bg-cream-50 border border-earth-200 rounded-xl text-xs font-semibold text-forest-950 focus:outline-none"
                    >
                      <option value="all">All Inquiries</option>
                      <option value="unread">Unread Only</option>
                      <option value="read">Read Only</option>
                    </select>
                  </div>
                </div>

                {/* Inquiries Table */}
                <div className="bg-white rounded-3xl border border-earth-200 shadow-elevated overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-forest-950 text-cream-50 uppercase tracking-wider font-semibold text-[11px]">
                        <tr>
                          <th className="py-4 px-6">Status & ID</th>
                          <th className="py-4 px-6">Visitor Name</th>
                          <th className="py-4 px-6">Phone / Email</th>
                          <th className="py-4 px-6">Subject</th>
                          <th className="py-4 px-6">Message Preview</th>
                          <th className="py-4 px-6">Submitted At</th>
                          <th className="py-4 px-6 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-earth-100 text-earth-900 font-light">
                        {filteredInquiries.length === 0 ? (
                          <tr>
                            <td colSpan={7} className="py-12 text-center text-earth-600 font-serif italic text-base">
                              No contact messages found.
                            </td>
                          </tr>
                        ) : (
                          filteredInquiries.map((inq) => (
                            <tr 
                              key={inq.id} 
                              className={`transition-colors ${!inq.read ? 'bg-cream-100/90 font-medium' : 'hover:bg-cream-50/80'}`}
                            >
                              <td className="py-4 px-6">
                                <span className={`px-2.5 py-0.5 text-[9px] font-bold uppercase rounded-full inline-block ${
                                  !inq.read ? 'bg-brass-500 text-forest-950' : 'bg-gray-200 text-gray-700'
                                }`}>
                                  {!inq.read ? 'UNREAD' : 'READ'}
                                </span>
                                <span className="font-mono text-[10px] text-gray-500 block mt-1">{inq.id}</span>
                              </td>
                              <td className="py-4 px-6 font-semibold text-forest-950 text-sm">
                                {inq.name}
                              </td>
                              <td className="py-4 px-6 space-y-0.5">
                                <p className="font-semibold text-brass-700">{inq.phone}</p>
                                <p className="text-[11px] text-gray-500">{inq.email}</p>
                              </td>
                              <td className="py-4 px-6 font-medium text-forest-900">
                                {inq.subject}
                              </td>
                              <td className="py-4 px-6">
                                <p className="text-xs text-earth-800 line-clamp-2 max-w-sm">
                                  {inq.message}
                                </p>
                              </td>
                              <td className="py-4 px-6 text-[11px] text-gray-500">
                                {inq.submittedAt}
                              </td>
                              <td className="py-4 px-6 text-right space-x-1 whitespace-nowrap">
                                <button
                                  onClick={() => setSelectedInquiry(inq)}
                                  className="px-2.5 py-1 bg-forest-900 hover:bg-forest-800 text-cream-50 text-[10px] font-bold rounded-lg transition-colors cursor-pointer"
                                >
                                  Read Full
                                </button>
                                <button
                                  onClick={() => handleToggleRead(inq.id)}
                                  className="px-2 py-1 bg-cream-200 hover:bg-cream-300 text-forest-950 text-[10px] font-bold rounded-lg transition-colors cursor-pointer"
                                >
                                  {inq.read ? 'Mark Unread' : 'Mark Read'}
                                </button>
                                <button
                                  onClick={() => handleDeleteInquiry(inq.id)}
                                  className="p-1 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                                  title="Delete Message"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Read Full Inquiry Modal */}
                <AnimatePresence>
                  {selectedInquiry && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onClick={() => setSelectedInquiry(null)}
                      className="fixed inset-0 z-50 bg-forest-950/80 backdrop-blur-md flex items-center justify-center p-4"
                    >
                      <motion.div
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.95, opacity: 0 }}
                        onClick={(e) => e.stopPropagation()}
                        className="bg-white rounded-3xl max-w-xl w-full p-8 border border-earth-200 shadow-elevated space-y-6 relative"
                      >
                        <button
                          onClick={() => setSelectedInquiry(null)}
                          className="absolute top-6 right-6 p-2 text-gray-400 hover:text-forest-950 rounded-full hover:bg-earth-100 transition-colors"
                        >
                          <XCircle className="w-5 h-5" />
                        </button>

                        <div className="space-y-1 border-b border-earth-200 pb-4">
                          <span className="text-[10px] font-bold uppercase text-brass-600 tracking-wider">
                            Inquiry Record #{selectedInquiry.id}
                          </span>
                          <h3 className="font-serif text-2xl text-forest-950 font-medium">
                            {selectedInquiry.subject}
                          </h3>
                          <p className="text-xs text-gray-500">Submitted: {selectedInquiry.submittedAt}</p>
                        </div>

                        <div className="space-y-3 text-xs">
                          <div className="grid grid-cols-2 gap-4 p-4 bg-cream-100 rounded-2xl">
                            <div>
                              <strong className="text-forest-950 block uppercase text-[10px]">Visitor Name:</strong>
                              <span className="text-sm font-semibold text-forest-900">{selectedInquiry.name}</span>
                            </div>
                            <div>
                              <strong className="text-forest-950 block uppercase text-[10px]">Phone Number:</strong>
                              <a href={`tel:${selectedInquiry.phone}`} className="text-sm font-bold text-brass-700 hover:underline">
                                {selectedInquiry.phone}
                              </a>
                            </div>
                          </div>

                          <div>
                            <strong className="text-forest-950 block uppercase text-[10px] mb-1">Email Address:</strong>
                            <a href={`mailto:${selectedInquiry.email}`} className="text-forest-900 font-semibold hover:underline">
                              {selectedInquiry.email}
                            </a>
                          </div>

                          <div className="pt-2">
                            <strong className="text-forest-950 block uppercase text-[10px] mb-1">Full Message:</strong>
                            <p className="p-4 bg-earth-50 rounded-2xl border border-earth-200 text-earth-900 leading-relaxed font-light text-sm">
                              {selectedInquiry.message}
                            </p>
                          </div>
                        </div>

                        <div className="pt-4 border-t border-earth-200 flex items-center justify-between">
                          <a
                            href={`https://wa.me/${selectedInquiry.phone.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(selectedInquiry.name)},%20thank%20you%20for%20contacting%20Sri%20Krishna%20Ayurvedic%20Clinic.`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider rounded-full flex items-center gap-2"
                          >
                            <MessageSquare className="w-4 h-4" />
                            <span>Reply via WhatsApp</span>
                          </a>

                          <button
                            onClick={() => setSelectedInquiry(null)}
                            className="px-5 py-2.5 bg-forest-900 text-cream-50 text-xs font-bold uppercase rounded-full"
                          >
                            Close View
                          </button>
                        </div>

                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>

              </div>
            )}

            {/* TAB 3: TREATMENTS DIRECTORY MANAGEMENT */}
            {activeTab === 'treatments' && (
              <div className="bg-white p-8 rounded-3xl border border-earth-200 shadow-elevated space-y-6">
                
                {/* Header & Add Button */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-earth-200 pb-6 gap-4">
                  <div className="space-y-1">
                    <span className="text-xs uppercase font-bold text-brass-600 tracking-wider">CLINICAL SERVICES DIRECTORY</span>
                    <h3 className="font-serif text-2xl text-forest-950 flex items-center gap-2">
                      <Stethoscope className="w-5 h-5 text-brass-600" />
                      <span>Manage Clinical Treatments & Services</span>
                    </h3>
                    <p className="text-xs text-earth-700">Update existing treatment titles, details, or add new treatment services. Changes immediately update the public website.</p>
                  </div>

                  <button
                    onClick={handleOpenAddTreatment}
                    className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider rounded-full shadow-soft flex items-center gap-2 cursor-pointer shrink-0"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add New Treatment</span>
                  </button>
                </div>

                {treatmentNotice && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-emerald-100 border border-emerald-300 text-emerald-900 rounded-2xl text-xs font-semibold flex items-center gap-2"
                  >
                    <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
                    <span>{treatmentNotice}</span>
                  </motion.div>
                )}

                {/* Treatment Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {treatments.map((t) => (
                    <div
                      key={t.id}
                      className="p-6 bg-cream-50 rounded-2xl border border-earth-200 flex flex-col justify-between space-y-4 hover:border-forest-800 transition-colors"
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="px-2.5 py-1 bg-white border border-earth-200 text-brass-700 font-bold text-[10px] uppercase rounded-md tracking-wider">
                            {t.subtitle}
                          </span>
                          <span className="font-mono text-xs font-bold text-gray-400">{t.number}</span>
                        </div>

                        <h4 className="font-serif text-xl font-medium text-forest-950 leading-snug">
                          {t.title}
                        </h4>

                        <p className="text-xs text-earth-800 leading-relaxed font-light line-clamp-3">
                          {t.description}
                        </p>
                      </div>

                      <div className="pt-4 border-t border-earth-200/80 flex items-center justify-between">
                        <span className="text-[11px] font-semibold text-emerald-700">{t.duration}</span>
                        
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleOpenEditTreatment(t)}
                            className="px-3 py-1.5 bg-forest-900 hover:bg-forest-800 text-cream-50 text-xs font-bold uppercase rounded-lg flex items-center gap-1 cursor-pointer"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                            <span>Edit</span>
                          </button>
                          <button
                            onClick={() => handleDeleteTreatmentItem(t.id, t.title)}
                            className="p-1.5 text-red-600 hover:bg-red-100 rounded-lg transition-colors cursor-pointer"
                            title="Delete Treatment"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Add / Edit Treatment Modal */}
                <AnimatePresence>
                  {isTreatmentModalOpen && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onClick={() => setIsTreatmentModalOpen(false)}
                      className="fixed inset-0 z-50 bg-forest-950/80 backdrop-blur-md flex items-center justify-center p-4"
                    >
                      <motion.div
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.95, opacity: 0 }}
                        onClick={(e) => e.stopPropagation()}
                        className="bg-white rounded-3xl max-w-lg w-full p-8 border border-earth-200 shadow-elevated space-y-6 relative"
                      >
                        <button
                          onClick={() => setIsTreatmentModalOpen(false)}
                          className="absolute top-6 right-6 p-2 text-gray-400 hover:text-forest-950 rounded-full hover:bg-earth-100 transition-colors"
                        >
                          <XCircle className="w-5 h-5" />
                        </button>

                        <div className="space-y-1 border-b border-earth-200 pb-4">
                          <span className="text-[10px] font-bold uppercase text-brass-600 tracking-wider">
                            {editingTreatment.id ? 'EDIT EXISTING TREATMENT' : 'ADD NEW CLINICAL SERVICE'}
                          </span>
                          <h3 className="font-serif text-2xl text-forest-950 font-medium">
                            {editingTreatment.id ? 'Update Treatment Details' : 'Create Treatment Service'}
                          </h3>
                        </div>

                        <form onSubmit={handleSaveTreatmentModal} className="space-y-4 text-xs">
                          <div>
                            <label className="block font-bold text-forest-950 uppercase mb-1">Treatment Title *</label>
                            <input
                              type="text"
                              required
                              value={editingTreatment.title}
                              onChange={(e) => setEditingTreatment({ ...editingTreatment, title: e.target.value })}
                              placeholder="e.g. Classical Shirodhara Stream"
                              className="w-full px-4 py-2.5 rounded-xl border border-earth-200 text-sm font-serif font-medium text-forest-950 focus:outline-none focus:border-forest-800"
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block font-bold text-forest-950 uppercase mb-1">Subtitle / Category</label>
                              <input
                                type="text"
                                value={editingTreatment.subtitle}
                                onChange={(e) => setEditingTreatment({ ...editingTreatment, subtitle: e.target.value })}
                                placeholder="e.g. Mind Relaxation"
                                className="w-full px-3.5 py-2.5 rounded-xl border border-earth-200 text-xs font-semibold focus:outline-none focus:border-forest-800"
                              />
                            </div>

                            <div>
                              <label className="block font-bold text-forest-950 uppercase mb-1">Duration</label>
                              <input
                                type="text"
                                value={editingTreatment.duration}
                                onChange={(e) => setEditingTreatment({ ...editingTreatment, duration: e.target.value })}
                                placeholder="e.g. 45 Minutes"
                                className="w-full px-3.5 py-2.5 rounded-xl border border-earth-200 text-xs font-semibold focus:outline-none focus:border-forest-800"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block font-bold text-forest-950 uppercase mb-1">Treatment Description *</label>
                            <textarea
                              rows={4}
                              required
                              value={editingTreatment.description}
                              onChange={(e) => setEditingTreatment({ ...editingTreatment, description: e.target.value })}
                              placeholder="Describe the clinical protocol, benefits, and Ayurvedic procedure..."
                              className="w-full p-3.5 rounded-xl border border-earth-200 text-xs font-light text-earth-900 leading-relaxed focus:outline-none focus:border-forest-800"
                            />
                          </div>

                          <div className="pt-4 border-t border-earth-200 flex items-center justify-end gap-3">
                            <button
                              type="button"
                              onClick={() => setIsTreatmentModalOpen(false)}
                              className="px-5 py-2.5 bg-cream-100 hover:bg-earth-200 text-earth-900 text-xs font-semibold rounded-full"
                            >
                              Cancel
                            </button>
                            <button
                              type="submit"
                              className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold uppercase rounded-full shadow-soft flex items-center gap-1.5 cursor-pointer"
                            >
                              <Save className="w-4 h-4" />
                              <span>Save Treatment</span>
                            </button>
                          </div>
                        </form>

                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>

              </div>
            )}

            {/* TAB 4: SWARNAPRASHANA SCHEDULE MANAGEMENT */}
            {activeTab === 'swarnaprashana' && (
              <div className="space-y-6">
                
                {/* Header & Success Notification */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-earth-200 pb-4 gap-4">
                  <div className="space-y-1">
                    <span className="text-xs uppercase font-bold text-brass-600 tracking-wider">
                      PUSHYA NAKSHATRA PEDIATRIC WELLNESS DATES
                    </span>
                    <h3 className="font-serif text-2xl text-forest-950 flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-brass-600" />
                      <span>Swarnaprashana Pushya Nakshatra Schedule</span>
                    </h3>
                    <p className="text-xs text-earth-700">
                      Manage dynamic Pushya Nakshatra dates, active/inactive visibility, and multi-year calendar synchronized in real-time with the public website.
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleOpenAddSwarnaDate}
                      className="px-5 py-2.5 bg-forest-900 hover:bg-forest-800 text-cream-50 text-xs font-bold uppercase tracking-wider rounded-xl shadow-soft flex items-center gap-2 cursor-pointer transition-colors"
                    >
                      <Plus className="w-4 h-4 text-brass-400" />
                      <span>Add New Date</span>
                    </button>
                  </div>
                </div>

                {/* Real-time Success Notification */}
                {swarnaNotice && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-emerald-500/15 border border-emerald-500/40 rounded-2xl flex items-center gap-3 text-emerald-900 text-xs font-semibold shadow-sm"
                  >
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{swarnaNotice}</span>
                  </motion.div>
                )}

                {/* Filter & Year Control Bar */}
                <div className="bg-white p-4 rounded-2xl border border-earth-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
                  
                  {/* Left: Year Filter Selector */}
                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <CalendarDays className="w-4 h-4 text-brass-600 shrink-0" />
                    <span className="text-xs font-bold text-forest-950 uppercase tracking-wider">Year:</span>
                    <select
                      value={swarnaFilterYear}
                      onChange={(e) => setSwarnaFilterYear(e.target.value)}
                      className="px-3 py-1.5 bg-cream-50 border border-earth-200 rounded-xl text-xs font-bold text-forest-950 focus:outline-none focus:border-forest-800"
                    >
                      <option value="all">All Years</option>
                      {swarnaYears.map(yr => (
                        <option key={yr} value={String(yr)}>{yr}</option>
                      ))}
                    </select>

                    <button
                      onClick={() => {
                        const newYearInput = prompt('Enter new year to add schedule (e.g. 2027, 2028):');
                        if (newYearInput) {
                          const yrNum = parseInt(newYearInput.trim(), 10);
                          if (!isNaN(yrNum) && yrNum >= 2020 && yrNum <= 2050) {
                            if (!swarnaYears.includes(yrNum)) {
                              setSwarnaYears(prev => [...prev, yrNum].sort((a,b) => a-b));
                            }
                            setSwarnaFilterYear(String(yrNum));
                          } else {
                            alert('Please enter a valid 4-digit year between 2020 and 2050.');
                          }
                        }
                      }}
                      className="px-2.5 py-1.5 bg-cream-100 hover:bg-cream-200 text-forest-900 rounded-xl text-[11px] font-semibold flex items-center gap-1 border border-earth-200 cursor-pointer"
                      title="Add a new year to calendar"
                    >
                      <Plus className="w-3 h-3 text-brass-600" />
                      <span>New Year</span>
                    </button>
                  </div>

                  {/* Right: Search & Status Filter */}
                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    <div className="relative w-full sm:w-56">
                      <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-2.5" />
                      <input
                        type="text"
                        value={swarnaSearchQuery}
                        onChange={(e) => setSwarnaSearchQuery(e.target.value)}
                        placeholder="Search month or date..."
                        className="w-full pl-9 pr-3 py-1.5 bg-cream-50 border border-earth-200 rounded-xl text-xs focus:outline-none focus:border-forest-800 text-forest-950"
                      />
                    </div>

                    <select
                      value={swarnaStatusFilter}
                      onChange={(e) => setSwarnaStatusFilter(e.target.value)}
                      className="px-3 py-1.5 bg-cream-50 border border-earth-200 rounded-xl text-xs font-semibold text-forest-950 focus:outline-none"
                    >
                      <option value="all">All Statuses</option>
                      <option value="Active">Active Only</option>
                      <option value="Inactive">Inactive Only</option>
                    </select>
                  </div>

                </div>

                {/* Swarnaprashana Dates Table */}
                <div className="bg-white rounded-3xl border border-earth-200 shadow-elevated overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-forest-950 text-cream-50 uppercase tracking-wider font-semibold text-[11px]">
                        <tr>
                          <th className="py-4 px-6">Order</th>
                          <th className="py-4 px-6">Month</th>
                          <th className="py-4 px-6">Date</th>
                          <th className="py-4 px-6">Year</th>
                          <th className="py-4 px-6">Full Date</th>
                          <th className="py-4 px-6">Status (Public Visibility)</th>
                          <th className="py-4 px-6 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-earth-100 text-earth-900 font-light">
                        {swarnaSchedule
                          .filter(item => {
                            const matchesYear = swarnaFilterYear === 'all' || String(item.year) === swarnaFilterYear;
                            const matchesStatus = swarnaStatusFilter === 'all' || item.status === swarnaStatusFilter;
                            const matchesSearch = item.month.toLowerCase().includes(swarnaSearchQuery.toLowerCase()) ||
                                                  String(item.date).includes(swarnaSearchQuery) ||
                                                  (item.full_date && item.full_date.includes(swarnaSearchQuery));
                            return matchesYear && matchesStatus && matchesSearch;
                          })
                          .sort((a, b) => {
                            const yrA = parseInt(a.year, 10) || 2026;
                            const yrB = parseInt(b.year, 10) || 2026;
                            if (yrA !== yrB) return yrA - yrB;
                            const mA = MONTH_NAMES.indexOf(a.month);
                            const mB = MONTH_NAMES.indexOf(b.month);
                            if (mA !== mB) return mA - mB;
                            const dA = parseInt(a.date, 10) || 1;
                            const dB = parseInt(b.date, 10) || 1;
                            if (dA !== dB) return dA - dB;
                            return (a.display_order || 0) - (b.display_order || 0);
                          })
                          .map((item, idx) => (
                            <tr key={item.id} className="hover:bg-cream-50/80 transition-colors">
                              <td className="py-3.5 px-6 font-mono font-bold text-gray-500">
                                {item.display_order || idx + 1}
                              </td>
                              <td className="py-3.5 px-6 font-semibold text-forest-950 text-sm">
                                {item.month}
                              </td>
                              <td className="py-3.5 px-6 font-mono font-bold text-brass-800 text-base">
                                {item.date}
                              </td>
                              <td className="py-3.5 px-6 font-mono font-semibold text-forest-900">
                                {item.year || 2026}
                              </td>
                              <td className="py-3.5 px-6 font-mono text-gray-600">
                                {item.full_date || `${item.year || 2026}-${String(MONTH_NAMES.indexOf(item.month) + 1).padStart(2, '0')}-${String(item.date).padStart(2, '0')}`}
                              </td>
                              <td className="py-3.5 px-6">
                                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full font-semibold text-[10px] uppercase border ${
                                  item.status === 'Active'
                                    ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                                    : 'bg-gray-100 text-gray-600 border-gray-300'
                                }`}>
                                  <span className={`w-1.5 h-1.5 rounded-full ${item.status === 'Active' ? 'bg-emerald-600 animate-pulse' : 'bg-gray-400'}`} />
                                  <span>{item.status}</span>
                                </span>
                              </td>
                              <td className="py-3.5 px-6 text-right">
                                <div className="flex items-center justify-end gap-1.5">
                                  <button
                                    onClick={() => handleToggleSwarnaStatusItem(item.id)}
                                    className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold border transition-colors cursor-pointer ${
                                      item.status === 'Active'
                                        ? 'bg-cream-100 text-earth-800 hover:bg-earth-200 border-earth-300'
                                        : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border-emerald-300'
                                    }`}
                                    title={item.status === 'Active' ? 'Deactivate (Hide from public website)' : 'Activate (Show on public website)'}
                                  >
                                    {item.status === 'Active' ? 'Deactivate' : 'Activate'}
                                  </button>

                                  <button
                                    onClick={() => handleOpenEditSwarnaDate(item)}
                                    className="p-1.5 text-forest-900 hover:bg-cream-200 rounded-lg transition-colors cursor-pointer"
                                    title="Edit Date"
                                  >
                                    <Edit3 className="w-4 h-4 text-forest-800" />
                                  </button>

                                  <button
                                    onClick={() => handleDeleteSwarnaItem(item.id, item.month, item.date, item.year)}
                                    className="p-1.5 text-red-600 hover:bg-red-100 rounded-lg transition-colors cursor-pointer"
                                    title="Delete Date"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Add / Edit Swarnaprashana Date Modal */}
                <AnimatePresence>
                  {isSwarnaModalOpen && editingSwarnaDate && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onClick={() => setIsSwarnaModalOpen(false)}
                      className="fixed inset-0 z-50 bg-forest-950/80 backdrop-blur-md flex items-center justify-center p-4"
                    >
                      <motion.div
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.95, opacity: 0 }}
                        onClick={(e) => e.stopPropagation()}
                        className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 border border-earth-200 shadow-elevated space-y-5 relative"
                      >
                        <button
                          onClick={() => setIsSwarnaModalOpen(false)}
                          className="absolute top-6 right-6 p-2 text-gray-400 hover:text-forest-950 rounded-full hover:bg-earth-100 transition-colors"
                        >
                          <XCircle className="w-5 h-5" />
                        </button>

                        <div className="space-y-1 border-b border-earth-200 pb-3">
                          <span className="text-[10px] font-bold uppercase text-brass-600 tracking-wider">
                            {editingSwarnaDate.id ? 'EDIT PUSHYA NAKSHATRA DATE' : 'ADD NEW PUSHYA NAKSHATRA DATE'}
                          </span>
                          <h3 className="font-serif text-2xl text-forest-950 font-medium">
                            {editingSwarnaDate.id ? 'Update Schedule Entry' : 'New Schedule Date'}
                          </h3>
                        </div>

                        {swarnaModalError && (
                          <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs flex items-start gap-2">
                            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                            <span>{swarnaModalError}</span>
                          </div>
                        )}

                        <form onSubmit={handleSaveSwarnaModal} className="space-y-4 text-xs">
                          
                          {/* Month & Date Grid */}
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="block font-bold text-forest-950 uppercase mb-1">Month *</label>
                              <select
                                required
                                value={editingSwarnaDate.month}
                                onChange={(e) => setEditingSwarnaDate({ ...editingSwarnaDate, month: e.target.value })}
                                className="w-full px-3 py-2.5 rounded-xl border border-earth-200 text-xs font-semibold focus:outline-none focus:border-forest-800 bg-white"
                              >
                                {MONTH_NAMES.map(m => (
                                  <option key={m} value={m}>{m}</option>
                                ))}
                              </select>
                            </div>

                            <div>
                              <label className="block font-bold text-forest-950 uppercase mb-1">Date (Day 1-31) *</label>
                              <input
                                type="number"
                                required
                                min="1"
                                max="31"
                                value={editingSwarnaDate.date}
                                onChange={(e) => setEditingSwarnaDate({ ...editingSwarnaDate, date: e.target.value })}
                                placeholder="e.g. 5 or 28"
                                className="w-full px-3.5 py-2.5 rounded-xl border border-earth-200 text-sm font-mono font-bold text-forest-950 focus:outline-none focus:border-forest-800"
                              />
                            </div>
                          </div>

                          {/* Year & Status Grid */}
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="block font-bold text-forest-950 uppercase mb-1">Year *</label>
                              <input
                                type="number"
                                required
                                min="2020"
                                max="2050"
                                value={editingSwarnaDate.year}
                                onChange={(e) => setEditingSwarnaDate({ ...editingSwarnaDate, year: parseInt(e.target.value, 10) || 2026 })}
                                className="w-full px-3.5 py-2.5 rounded-xl border border-earth-200 text-xs font-mono font-semibold focus:outline-none focus:border-forest-800"
                              />
                            </div>

                            <div>
                              <label className="block font-bold text-forest-950 uppercase mb-1">Status</label>
                              <select
                                value={editingSwarnaDate.status}
                                onChange={(e) => setEditingSwarnaDate({ ...editingSwarnaDate, status: e.target.value })}
                                className="w-full px-3 py-2.5 rounded-xl border border-earth-200 text-xs font-semibold focus:outline-none focus:border-forest-800 bg-white"
                              >
                                <option value="Active">Active (Visible)</option>
                                <option value="Inactive">Inactive (Hidden)</option>
                              </select>
                            </div>
                          </div>

                          {/* Full Date & Display Order */}
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="block font-bold text-forest-950 uppercase mb-1">Optional Full Date</label>
                              <input
                                type="date"
                                value={editingSwarnaDate.full_date || ''}
                                onChange={(e) => setEditingSwarnaDate({ ...editingSwarnaDate, full_date: e.target.value })}
                                className="w-full px-3 py-2 rounded-xl border border-earth-200 text-xs font-mono focus:outline-none focus:border-forest-800 bg-white"
                              />
                            </div>

                            <div>
                              <label className="block font-bold text-forest-950 uppercase mb-1">Display Order</label>
                              <input
                                type="number"
                                min="1"
                                value={editingSwarnaDate.display_order || 1}
                                onChange={(e) => setEditingSwarnaDate({ ...editingSwarnaDate, display_order: parseInt(e.target.value, 10) || 1 })}
                                className="w-full px-3.5 py-2 rounded-xl border border-earth-200 text-xs font-mono focus:outline-none focus:border-forest-800"
                              />
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="pt-4 border-t border-earth-200 flex items-center justify-end gap-3">
                            <button
                              type="button"
                              onClick={() => setIsSwarnaModalOpen(false)}
                              className="px-5 py-2.5 bg-cream-100 hover:bg-earth-200 text-earth-900 text-xs font-semibold rounded-full cursor-pointer"
                            >
                              Cancel
                            </button>
                            <button
                              type="submit"
                              className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold uppercase rounded-full shadow-soft flex items-center gap-1.5 cursor-pointer"
                            >
                              <Save className="w-4 h-4" />
                              <span>Save Date</span>
                            </button>
                          </div>

                        </form>

                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>

              </div>
            )}

            {/* TAB 5: EDITABLE CLINIC SETTINGS */}
            {activeTab === 'settings' && (
              <form onSubmit={handleSaveSettings} className="bg-white p-8 rounded-3xl border border-earth-200 shadow-elevated space-y-8">
                
                {/* Header & Success Alert */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-earth-200 pb-6 gap-4">
                  <div className="space-y-1">
                    <span className="text-xs uppercase font-bold text-brass-600 tracking-wider">EDITABLE CLINIC SYSTEM INFORMATION</span>
                    <h3 className="font-serif text-2xl text-forest-950 flex items-center gap-2">
                      <Edit3 className="w-5 h-5 text-brass-600" />
                      <span>Edit Clinic Details & Locations</span>
                    </h3>
                    <p className="text-xs text-earth-700">Update clinic addresses, doctor credentials, fee structure, and contact info in real-time.</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={handleResetSettings}
                      className="px-4 py-2.5 bg-cream-100 hover:bg-earth-200 text-earth-900 font-semibold text-xs uppercase tracking-wider rounded-full border border-earth-200 transition-all cursor-pointer"
                    >
                      Reset Defaults
                    </button>

                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider rounded-full shadow-soft flex items-center gap-2 transition-all cursor-pointer"
                    >
                      <Save className="w-4 h-4" />
                      <span>Save All Changes</span>
                    </button>
                  </div>
                </div>

                {settingsSavedNotice && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-emerald-100 border border-emerald-300 text-emerald-900 rounded-2xl text-xs font-semibold flex items-center gap-2"
                  >
                    <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
                    <span>Clinic settings updated & saved successfully in local database!</span>
                  </motion.div>
                )}

                {/* Section 1: Addresses */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs">
                  
                  {/* Main Address */}
                  <div className="space-y-3 p-6 bg-cream-100/80 rounded-2xl border border-earth-200">
                    <div className="flex items-center justify-between">
                      <h4 className="font-serif text-base text-forest-950 font-bold flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-brass-600" />
                        <span>Main Address (KR Puram)</span>
                      </h4>
                      <span className="text-[10px] font-bold text-brass-600 uppercase tracking-widest bg-white px-2 py-0.5 rounded border border-earth-200">Editable</span>
                    </div>

                    <textarea
                      rows={3}
                      value={settings.mainAddress}
                      onChange={(e) => setSettings({ ...settings, mainAddress: e.target.value })}
                      className="w-full p-3.5 bg-white border border-earth-200 rounded-xl text-xs font-medium text-forest-950 focus:outline-none focus:border-forest-800 leading-relaxed shadow-inner"
                    />
                  </div>

                  {/* Branch Address */}
                  <div className="space-y-3 p-6 bg-cream-100/80 rounded-2xl border border-earth-200">
                    <div className="flex items-center justify-between">
                      <h4 className="font-serif text-base text-forest-950 font-bold flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-emerald-600" />
                        <span>Branch Address (T.C. Palya)</span>
                      </h4>
                      <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-widest bg-white px-2 py-0.5 rounded border border-earth-200">Editable</span>
                    </div>

                    <textarea
                      rows={3}
                      value={settings.branchAddress}
                      onChange={(e) => setSettings({ ...settings, branchAddress: e.target.value })}
                      className="w-full p-3.5 bg-white border border-earth-200 rounded-xl text-xs font-medium text-forest-950 focus:outline-none focus:border-forest-800 leading-relaxed shadow-inner"
                    />
                  </div>

                </div>

                {/* Section 2: Practitioner & Doctor Details */}
                <div className="p-6 bg-white rounded-2xl border border-earth-200 space-y-4">
                  <h4 className="font-serif text-base text-forest-950 font-bold flex items-center gap-2 border-b border-earth-100 pb-3">
                    <Award className="w-4 h-4 text-brass-600" />
                    <span>Senior Practitioner & Qualifications</span>
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
                    <div>
                      <label className="block font-bold text-forest-950 uppercase text-[10px] mb-1">Doctor Name</label>
                      <input
                        type="text"
                        value={settings.doctorName}
                        onChange={(e) => setSettings({ ...settings, doctorName: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-cream-50 border border-earth-200 rounded-xl font-semibold text-forest-950 text-xs focus:outline-none focus:border-forest-800"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-forest-950 uppercase text-[10px] mb-1">Qualifications</label>
                      <input
                        type="text"
                        value={settings.qualifications}
                        onChange={(e) => setSettings({ ...settings, qualifications: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-cream-50 border border-earth-200 rounded-xl font-medium text-forest-950 text-xs focus:outline-none focus:border-forest-800"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-forest-950 uppercase text-[10px] mb-1">Reg Number</label>
                      <input
                        type="text"
                        value={settings.registrationNo}
                        onChange={(e) => setSettings({ ...settings, registrationNo: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-cream-50 border border-earth-200 rounded-xl font-mono text-forest-950 text-xs focus:outline-none focus:border-forest-800"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-forest-950 uppercase text-[10px] mb-1">Experience Years</label>
                      <input
                        type="text"
                        value={settings.experienceYears}
                        onChange={(e) => setSettings({ ...settings, experienceYears: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-cream-50 border border-earth-200 rounded-xl font-semibold text-forest-950 text-xs focus:outline-none focus:border-forest-800"
                      />
                    </div>
                  </div>
                </div>

                {/* Section 3: Fees & Contact Info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-xs">
                  
                  <div className="p-5 bg-cream-50 rounded-2xl border border-earth-200 space-y-2">
                    <label className="block font-bold text-forest-950 uppercase text-[10px]">Standard Consultation Fee</label>
                    <input
                      type="text"
                      value={settings.consultationFee}
                      onChange={(e) => setSettings({ ...settings, consultationFee: e.target.value })}
                      className="w-full px-3 py-2 bg-white border border-earth-200 rounded-xl font-bold text-forest-950 text-sm focus:outline-none focus:border-forest-800"
                    />
                    <input
                      type="text"
                      value={settings.feeNote}
                      onChange={(e) => setSettings({ ...settings, feeNote: e.target.value })}
                      className="w-full px-3 py-1.5 bg-white border border-earth-200 rounded-lg text-[11px] text-emerald-700 font-semibold focus:outline-none"
                    />
                  </div>

                  <div className="p-5 bg-cream-50 rounded-2xl border border-earth-200 space-y-2">
                    <label className="block font-bold text-forest-950 uppercase text-[10px]">Primary Contact Phone</label>
                    <input
                      type="text"
                      value={settings.phone}
                      onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                      className="w-full px-3 py-2 bg-white border border-earth-200 rounded-xl font-bold text-forest-950 text-sm focus:outline-none focus:border-forest-800"
                    />
                    <input
                      type="text"
                      value={settings.altPhone}
                      onChange={(e) => setSettings({ ...settings, altPhone: e.target.value })}
                      placeholder="Alt Phone Number"
                      className="w-full px-3 py-1.5 bg-white border border-earth-200 rounded-lg text-[11px] text-brass-700 font-semibold focus:outline-none"
                    />
                  </div>

                  <div className="p-5 bg-cream-50 rounded-2xl border border-earth-200 space-y-2">
                    <label className="block font-bold text-forest-950 uppercase text-[10px]">Clinic Email Address</label>
                    <input
                      type="email"
                      value={settings.email}
                      onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                      className="w-full px-3 py-2 bg-white border border-earth-200 rounded-xl font-semibold text-forest-950 text-xs focus:outline-none focus:border-forest-800"
                    />
                  </div>

                  <div className="p-5 bg-cream-50 rounded-2xl border border-earth-200 space-y-2">
                    <label className="block font-bold text-forest-950 uppercase text-[10px]">Working Hours & Schedule</label>
                    <input
                      type="text"
                      value={settings.workingHours}
                      onChange={(e) => setSettings({ ...settings, workingHours: e.target.value })}
                      className="w-full px-3 py-2 bg-white border border-earth-200 rounded-xl font-medium text-forest-950 text-xs focus:outline-none focus:border-forest-800"
                    />
                  </div>

                </div>

                {/* Bottom Save Action Bar */}
                <div className="pt-4 border-t border-earth-200 flex items-center justify-end gap-4">
                  <button
                    type="submit"
                    className="px-8 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-widest rounded-full shadow-elevated transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save All Settings Changes</span>
                  </button>
                </div>

              </form>
            )}

          </div>

      </div>
    </motion.div>
  );
}
