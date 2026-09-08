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
  AlertCircle,
  ArrowUp,
  ArrowDown,
  Play,
  Pause,
  Sliders,
  Star,
  Heart,
  Info,
  Upload,
  Image as ImageIcon,
  GripVertical,
  CheckCircle2,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';
import PageHero from '../components/PageHero';
import Breadcrumb from '../components/Breadcrumb';
import BelowNavbarAnimation, { renderRunningBarIcon } from '../components/BelowNavbarAnimation';
import HomeImageSlider from '../components/HomeImageSlider';
import { clinicData } from '../data/clinicData';
import { 
  getAppointments, 
  fetchAppointmentsFromDb,
  updateAppointmentStatus, 
  deleteAppointment, 
  getInquiries, 
  fetchInquiriesFromDb,
  toggleInquiryRead, 
  deleteInquiry, 
  getClinicSettings,
  fetchClinicSettingsFromDb,
  saveClinicSettings, 
  getStoredTreatments,
  fetchTreatmentsFromDb,
  saveTreatment, 
  deleteTreatment, 
  clearAllAdminData, 
  defaultSettings, 
  defaultRunningBar,
  saveRunningBarSettings,
  defaultHeroSlider,
  getHeroSliderSettings,
  saveHeroSliderSettings,
  getAllSwarnaprashanaDates,
  fetchSwarnaprashanaScheduleFromDb,
  saveSwarnaprashanaDate, 
  deleteSwarnaprashanaDate, 
  toggleSwarnaprashanaStatus, 
  getAvailableScheduleYears, 
  MONTH_NAMES 
} from '../utils/adminStorage';
import api from '../services/api';

export default function Admin() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTabParam = searchParams.get('tab') || 'appointments';
  
  const [activeTab, setActiveTab] = useState(activeTabParam);
  const [pin, setPin] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [pinError, setPinError] = useState(false);
  const [loadingAuth, setLoadingAuth] = useState(false);

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

  // Running Bar Settings State
  const [runningBar, setRunningBar] = useState(() => defaultSettings.runningBar || defaultRunningBar);
  const [isSavingRunningBar, setIsSavingRunningBar] = useState(false);
  const [runningBarNotice, setRunningBarNotice] = useState('');
  const [runningBarError, setRunningBarError] = useState('');
  const [editingMessage, setEditingMessage] = useState(null);
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  const [messageModalError, setMessageModalError] = useState('');

  // Hero Slider Settings State
  const [heroSlider, setHeroSlider] = useState(() => defaultSettings.heroSlider || defaultHeroSlider);
  const [isSavingHeroSlider, setIsSavingHeroSlider] = useState(false);
  const [heroSliderNotice, setHeroSliderNotice] = useState('');
  const [heroSliderError, setHeroSliderError] = useState('');
  const [editingSlide, setEditingSlide] = useState(null);
  const [isSlideModalOpen, setIsSlideModalOpen] = useState(false);
  const [slideModalError, setSlideModalError] = useState('');
  const [isUploadingDesktop, setIsUploadingDesktop] = useState(false);
  const [desktopUploadProgress, setDesktopUploadProgress] = useState(0);
  const [isUploadingMobile, setIsUploadingMobile] = useState(false);
  const [mobileUploadProgress, setMobileUploadProgress] = useState(0);
  const [deletingSlideId, setDeletingSlideId] = useState(null);
  const [draggedSlideIdx, setDraggedSlideIdx] = useState(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedInquiry, setSelectedInquiry] = useState(null);

  // Treatment Modal State (Add / Edit)
  const [editingTreatment, setEditingTreatment] = useState(null);
  const [isTreatmentModalOpen, setIsTreatmentModalOpen] = useState(false);
  const [isUploadingTreatmentImage, setIsUploadingTreatmentImage] = useState(false);
  const [treatmentImageProgress, setTreatmentImageProgress] = useState(0);
  const [treatmentModalError, setTreatmentModalError] = useState('');

  const loadData = async () => {
    try {
      const [apts, inqs, sets, trts, sw] = await Promise.all([
        fetchAppointmentsFromDb(),
        fetchInquiriesFromDb(),
        fetchClinicSettingsFromDb(),
        fetchTreatmentsFromDb(),
        fetchSwarnaprashanaScheduleFromDb({ activeOnly: false })
      ]);
      setAppointments(apts || []);
      setInquiries(inqs || []);
      setSettings(sets || defaultSettings);
      if (sets && sets.runningBar) {
        setRunningBar(sets.runningBar);
      }
      if (sets && sets.heroSlider) {
        setHeroSlider(sets.heroSlider);
      }
      setTreatments(trts || []);
      setSwarnaSchedule(sw || []);
      setSwarnaYears(getAvailableScheduleYears());
    } catch (err) {
      console.error('Error loading data from database:', err);
    }
  };

  // Load data and check existing JWT token on mount
  useEffect(() => {
    // Initial local read for instant render
    setAppointments(getAppointments());
    setInquiries(getInquiries());
    const initialSets = getClinicSettings();
    setSettings(initialSets);
    if (initialSets && initialSets.runningBar) {
      setRunningBar(initialSets.runningBar);
    }
    if (initialSets && initialSets.heroSlider) {
      setHeroSlider(initialSets.heroSlider);
    }
    setTreatments(getStoredTreatments());
    setSwarnaSchedule(getAllSwarnaprashanaDates());
    setSwarnaYears(getAvailableScheduleYears());

    // Check if valid token exists
    const token = typeof localStorage !== 'undefined' ? localStorage.getItem('sk_admin_jwt_token') : null;
    if (token) {
      api.getCurrentUser()
        .then((res) => {
          if (res.success && res.user?.role === 'admin') {
            setIsAuthenticated(true);
            loadData();
          }
        })
        .catch(() => {
          // Token expired or invalid
          api.logout();
        });
    }

    // Always fetch latest data from database
    loadData();
  }, []);

  // Synchronize tab state with search params
  useEffect(() => {
    setActiveTab(activeTabParam);
  }, [activeTabParam]);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    setSearchParams({ tab: tabId });
  };

  const handlePinSubmit = async (e) => {
    e.preventDefault();
    setLoadingAuth(true);
    setPinError(false);
    try {
      const res = await api.login({ username: username.trim(), pin: pin.trim() });
      if (res.success && res.user) {
        setIsAuthenticated(true);
        setPinError(false);
        await loadData();
      } else {
        setPinError(true);
      }
    } catch (err) {
      console.error('Admin authentication failed:', err);
      // Local demo password fallback for offline resilience
      if (username.trim().toLowerCase() === 'admin' && pin.trim() === '1234') {
        setIsAuthenticated(true);
        setPinError(false);
        loadData();
      } else {
        setPinError(true);
      }
    } finally {
      setLoadingAuth(false);
    }
  };

  const handleLogout = () => {
    api.logout();
    setIsAuthenticated(false);
    setPin('');
    setUsername('');
    setPinError(false);
  };

  // Appointment actions
  const handleStatusChange = async (id, newStatus) => {
    const updated = await updateAppointmentStatus(id, newStatus);
    setAppointments(updated);
  };

  const handleDeleteAppointment = async (id) => {
    if (window.confirm('Are you sure you want to delete this appointment record?')) {
      const updated = await deleteAppointment(id);
      setAppointments(updated);
    }
  };

  // Inquiry actions
  const handleToggleRead = async (id) => {
    const updated = await toggleInquiryRead(id);
    setInquiries(updated);
  };

  const handleDeleteInquiry = async (id) => {
    if (window.confirm('Are you sure you want to delete this inquiry message?')) {
      const updated = await deleteInquiry(id);
      setInquiries(updated);
      if (selectedInquiry && selectedInquiry.id === id) {
        setSelectedInquiry(null);
      }
    }
  };

  // Settings Save action
  const handleSaveSettings = async (e) => {
    e?.preventDefault();
    const updated = { ...settings, runningBar };
    await saveClinicSettings(updated);
    setSettings(updated);
    setSettingsSavedNotice(true);
    setTimeout(() => {
      setSettingsSavedNotice(false);
    }, 4000);
  };

  const handleResetSettings = async () => {
    if (window.confirm('Reset clinic settings to original default values?')) {
      await saveClinicSettings(defaultSettings);
      setSettings(defaultSettings);
      setRunningBar(defaultRunningBar);
      setSettingsSavedNotice(true);
      setTimeout(() => {
        setSettingsSavedNotice(false);
      }, 4000);
    }
  };

  // Running Bar Actions
  const handleOpenAddMessage = () => {
    setEditingMessage({
      id: '',
      type: 'timing',
      label: '',
      text: '',
      icon: 'MapPin',
      enabled: true
    });
    setMessageModalError('');
    setIsMessageModalOpen(true);
  };

  const handleOpenEditMessage = (item) => {
    setEditingMessage({ ...item });
    setMessageModalError('');
    setIsMessageModalOpen(true);
  };

  const handleSaveMessageModal = (e) => {
    e.preventDefault();
    if (!editingMessage.text?.trim() && !editingMessage.label?.trim()) {
      setMessageModalError('Please enter a message text or location label.');
      return;
    }

    const currentItems = [...(runningBar?.items || [])];
    if (editingMessage.id) {
      const idx = currentItems.findIndex(i => i.id === editingMessage.id);
      if (idx >= 0) {
        currentItems[idx] = { ...editingMessage };
      }
    } else {
      currentItems.push({
        ...editingMessage,
        id: 'rb-' + Date.now()
      });
    }

    setRunningBar(prev => ({ ...prev, items: currentItems }));
    setIsMessageModalOpen(false);
    setRunningBarNotice('Message saved in draft. Click "Update Running Bar" below to apply.');
    setTimeout(() => setRunningBarNotice(''), 4000);
  };

  const handleDeleteMessage = (id, text) => {
    if (window.confirm(`Delete message "${text || id}" from running bar?`)) {
      const currentItems = (runningBar?.items || []).filter(i => i.id !== id);
      setRunningBar(prev => ({ ...prev, items: currentItems }));
      setRunningBarNotice('Message deleted from draft. Click "Update Running Bar" to apply.');
      setTimeout(() => setRunningBarNotice(''), 4000);
    }
  };

  const handleToggleMessageStatus = (id) => {
    const currentItems = (runningBar?.items || []).map(i => i.id === id ? { ...i, enabled: !i.enabled } : i);
    setRunningBar(prev => ({ ...prev, items: currentItems }));
  };

  const handleMoveMessage = (index, direction) => {
    const currentItems = [...(runningBar?.items || [])];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= currentItems.length) return;
    const temp = currentItems[index];
    currentItems[index] = currentItems[targetIndex];
    currentItems[targetIndex] = temp;
    setRunningBar(prev => ({ ...prev, items: currentItems }));
  };

  const handleUpdateRunningBar = async (e) => {
    e?.preventDefault();
    setIsSavingRunningBar(true);
    setRunningBarError('');
    setRunningBarNotice('');

    try {
      if (!runningBar?.items || runningBar.items.length === 0) {
        throw new Error('Running bar must contain at least one message item.');
      }

      await saveRunningBarSettings(runningBar);
      setSettings(prev => ({ ...prev, runningBar }));
      setRunningBarNotice('✔ Running bar updated successfully in PostgreSQL database! Live site is updated.');
      setTimeout(() => setRunningBarNotice(''), 5000);
    } catch (err) {
      console.error('Failed to update running bar:', err);
      setRunningBarError(err.message || 'Failed to update running bar settings.');
    } finally {
      setIsSavingRunningBar(false);
    }
  };

  // ── Hero Slider Handlers ──
  const handleOpenAddSlide = () => {
    const currentSlides = heroSlider?.slides || [];
    setEditingSlide({
      id: '',
      badge: 'Vedic Heritage',
      title: '',
      subtitle: '',
      caption: '',
      altText: '',
      image: '',
      mobileImage: '',
      enabled: true,
      order: currentSlides.length + 1,
      card1: {
        title: 'Ancient Wisdom',
        subtitle: 'Charaka Samhita',
        icon: 'Sparkles',
        color: 'forest'
      },
      card2: {
        title: 'Authentic Care',
        subtitle: 'Classical Formulations',
        icon: 'Award',
        color: 'brass'
      }
    });
    setSlideModalError('');
    setIsSlideModalOpen(true);
  };

  const handleOpenEditSlide = (slide) => {
    setEditingSlide({
      ...slide,
      card1: slide.card1 ? { ...slide.card1 } : { title: '', subtitle: '', icon: 'Sparkles', color: 'forest' },
      card2: slide.card2 ? { ...slide.card2 } : { title: '', subtitle: '', icon: 'Award', color: 'brass' }
    });
    setSlideModalError('');
    setIsSlideModalOpen(true);
  };

  const handleDesktopFileSelect = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setSlideModalError('Desktop image size exceeds the 5 MB limit.');
      return;
    }

    const allowed = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!allowed.includes(file.type.toLowerCase())) {
      setSlideModalError('Please upload a JPG, JPEG, PNG, or WebP image file.');
      return;
    }

    setIsUploadingDesktop(true);
    setDesktopUploadProgress(20);
    setSlideModalError('');

    try {
      const res = await api.uploadHeroSliderImage(file, (percent) => {
        setDesktopUploadProgress(percent);
      });
      if (res && res.success && res.url) {
        setEditingSlide(prev => ({
          ...prev,
          image: res.url,
          altText: prev.altText || file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ')
        }));
      } else {
        throw new Error(res?.error || 'Failed to upload image.');
      }
    } catch (err) {
      console.error('Desktop image upload failed:', err);
      setSlideModalError(err.message || 'Image upload failed. Please try again.');
    } finally {
      setIsUploadingDesktop(false);
      setDesktopUploadProgress(0);
      e.target.value = '';
    }
  };

  const handleMobileFileSelect = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setSlideModalError('Mobile image size exceeds the 5 MB limit.');
      return;
    }

    const allowed = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!allowed.includes(file.type.toLowerCase())) {
      setSlideModalError('Please upload a JPG, JPEG, PNG, or WebP image file.');
      return;
    }

    setIsUploadingMobile(true);
    setMobileUploadProgress(20);
    setSlideModalError('');

    try {
      const res = await api.uploadHeroSliderImage(file, (percent) => {
        setMobileUploadProgress(percent);
      });
      if (res && res.success && res.url) {
        setEditingSlide(prev => ({
          ...prev,
          mobileImage: res.url
        }));
      } else {
        throw new Error(res?.error || 'Failed to upload mobile image.');
      }
    } catch (err) {
      console.error('Mobile image upload failed:', err);
      setSlideModalError(err.message || 'Mobile image upload failed. Please try again.');
    } finally {
      setIsUploadingMobile(false);
      setMobileUploadProgress(0);
      e.target.value = '';
    }
  };

  const handleSaveSlideModal = (e) => {
    e.preventDefault();
    if (!editingSlide.image) {
      setSlideModalError('Desktop image is required. Please upload an image.');
      return;
    }
    if (!editingSlide.title || !editingSlide.title.trim()) {
      setSlideModalError('Slide title is required.');
      return;
    }

    const currentSlides = [...(heroSlider?.slides || [])];
    const captionText = editingSlide.caption?.trim() || `${editingSlide.subtitle || editingSlide.title} • Sri Krishna Ayurvedic Clinic`;

    if (editingSlide.id) {
      const idx = currentSlides.findIndex(s => s.id === editingSlide.id);
      if (idx !== -1) {
        currentSlides[idx] = {
          ...editingSlide,
          caption: captionText
        };
      }
    } else {
      const newSlide = {
        ...editingSlide,
        id: 'hero-' + Date.now(),
        order: currentSlides.length + 1,
        caption: captionText
      };
      currentSlides.push(newSlide);
    }

    setHeroSlider(prev => ({ ...prev, slides: currentSlides }));
    setIsSlideModalOpen(false);
    setEditingSlide(null);
    setHeroSliderNotice('Slide updated in draft. Click "Update Hero Slider" below to save to database.');
    setTimeout(() => setHeroSliderNotice(''), 4000);
  };

  const handleDeleteSlide = (id) => {
    const currentSlides = (heroSlider?.slides || []).filter(s => s.id !== id);
    if (currentSlides.length === 0) {
      alert('The hero slider must contain at least one slide.');
      return;
    }
    const updated = currentSlides.map((s, idx) => ({ ...s, order: idx + 1 }));
    setHeroSlider(prev => ({ ...prev, slides: updated }));
    setDeletingSlideId(null);
    setHeroSliderNotice('Slide removed. Click "Update Hero Slider" below to apply changes.');
    setTimeout(() => setHeroSliderNotice(''), 4000);
  };

  const handleToggleSlideStatus = (id) => {
    const currentSlides = (heroSlider?.slides || []).map(s => 
      s.id === id ? { ...s, enabled: s.enabled === false ? true : false } : s
    );
    setHeroSlider(prev => ({ ...prev, slides: currentSlides }));
  };

  const handleSetFirstSlide = (index) => {
    if (index === 0) return;
    const currentSlides = [...(heroSlider?.slides || [])];
    const [selected] = currentSlides.splice(index, 1);
    currentSlides.unshift(selected);
    const updated = currentSlides.map((s, idx) => ({ ...s, order: idx + 1 }));
    setHeroSlider(prev => ({ ...prev, slides: updated }));
    setHeroSliderNotice(`"${selected.title}" is now set as the First Slide.`);
    setTimeout(() => setHeroSliderNotice(''), 4000);
  };

  const handleMoveSlide = (index, direction) => {
    const currentSlides = [...(heroSlider?.slides || [])];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= currentSlides.length) return;
    const temp = currentSlides[index];
    currentSlides[index] = currentSlides[targetIndex];
    currentSlides[targetIndex] = temp;
    const updated = currentSlides.map((s, idx) => ({ ...s, order: idx + 1 }));
    setHeroSlider(prev => ({ ...prev, slides: updated }));
  };

  const handleDragDropSlide = (targetIndex) => {
    if (draggedSlideIdx === null || draggedSlideIdx === targetIndex) return;
    const currentSlides = [...(heroSlider?.slides || [])];
    const [draggedItem] = currentSlides.splice(draggedSlideIdx, 1);
    currentSlides.splice(targetIndex, 0, draggedItem);
    const updated = currentSlides.map((s, idx) => ({ ...s, order: idx + 1 }));
    setHeroSlider(prev => ({ ...prev, slides: updated }));
    setDraggedSlideIdx(null);
  };

  const handleUpdateHeroSlider = async (e) => {
    e?.preventDefault();
    setIsSavingHeroSlider(true);
    setHeroSliderError('');
    setHeroSliderNotice('');

    try {
      if (!heroSlider?.slides || heroSlider.slides.length === 0) {
        throw new Error('Hero slider must contain at least one slide.');
      }

      await saveHeroSliderSettings(heroSlider);
      setSettings(prev => ({ ...prev, heroSlider }));
      setHeroSliderNotice('✔ Hero slider settings updated successfully in PostgreSQL database! Live site is updated.');
      setTimeout(() => setHeroSliderNotice(''), 5000);
    } catch (err) {
      console.error('Failed to update hero slider:', err);
      setHeroSliderError(err.message || 'Failed to update hero slider settings.');
    } finally {
      setIsSavingHeroSlider(false);
    }
  };

  // Treatment actions
  const handleOpenAddTreatment = () => {
    setEditingTreatment({
      id: '',
      title: '',
      subtitle: 'Ayurvedic Therapy',
      description: '',
      duration: '45 Minutes',
      image: ''
    });
    setTreatmentModalError('');
    setIsTreatmentModalOpen(true);
  };

  const handleOpenEditTreatment = (item) => {
    setEditingTreatment({ ...item, image: item.image || '' });
    setTreatmentModalError('');
    setIsTreatmentModalOpen(true);
  };

  const handleTreatmentImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setTreatmentModalError('Treatment image size exceeds the 5 MB limit.');
      return;
    }

    const allowed = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!allowed.includes(file.type.toLowerCase())) {
      setTreatmentModalError('Please upload a JPG, JPEG, PNG, or WebP image file.');
      return;
    }

    setIsUploadingTreatmentImage(true);
    setTreatmentImageProgress(20);
    setTreatmentModalError('');

    try {
      const res = await api.uploadTreatmentImage(file, (percent) => {
        setTreatmentImageProgress(percent);
      });
      if (res && res.success && res.url) {
        setEditingTreatment(prev => ({
          ...prev,
          image: res.url
        }));
      } else {
        throw new Error(res?.error || 'Failed to upload treatment image.');
      }
    } catch (err) {
      console.error('Treatment image upload failed:', err);
      setTreatmentModalError(err.message || 'Image upload failed. Please try again.');
    } finally {
      setIsUploadingTreatmentImage(false);
    }
  };

  const handleSaveTreatmentModal = async (e) => {
    e.preventDefault();
    if (!editingTreatment.title.trim()) return;

    const updated = await saveTreatment(editingTreatment);
    setTreatments(updated);
    setIsTreatmentModalOpen(false);
    setTreatmentNotice(`Treatment "${editingTreatment.title}" updated successfully in database!`);
    setTimeout(() => setTreatmentNotice(''), 4000);
  };

  const handleDeleteTreatmentItem = async (id, title) => {
    if (window.confirm(`Are you sure you want to delete the treatment "${title}"?`)) {
      const updated = await deleteTreatment(id);
      setTreatments(updated);
      setTreatmentNotice(`Treatment "${title}" removed from database.`);
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

  const handleSaveSwarnaModal = async (e) => {
    e.preventDefault();
    setSwarnaModalError('');
    
    const result = await saveSwarnaprashanaDate(editingSwarnaDate);
    if (!result.success) {
      setSwarnaModalError(result.error);
      return;
    }

    setSwarnaSchedule(getAllSwarnaprashanaDates());
    setSwarnaYears(getAvailableScheduleYears());
    setIsSwarnaModalOpen(false);
    setSwarnaNotice('Swarnaprashana schedule updated successfully in database.');
    setTimeout(() => setSwarnaNotice(''), 4000);
  };

  const handleDeleteSwarnaItem = async (id, month, date, year) => {
    if (window.confirm(`Are you sure you want to delete the Pushya Nakshatra date "${month} ${date}, ${year}"?`)) {
      const updated = await deleteSwarnaprashanaDate(id);
      setSwarnaSchedule(updated);
      setSwarnaYears(getAvailableScheduleYears());
      setSwarnaNotice('Swarnaprashana schedule updated in database.');
      setTimeout(() => setSwarnaNotice(''), 4000);
    }
  };

  const handleToggleSwarnaStatusItem = async (id) => {
    const updated = await toggleSwarnaprashanaStatus(id);
    setSwarnaSchedule(updated);
    setSwarnaNotice('Swarnaprashana status updated in database.');
    setTimeout(() => setSwarnaNotice(''), 3000);
  };

  const handleRestoreDemo = async () => {
    if (window.confirm('Reset admin database to baseline demo records in PostgreSQL?')) {
      const { appointments: a, inquiries: i, settings: s, treatments: t, swarnaprashana: sw } = await clearAllAdminData();
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
                      className="bg-cream-50 rounded-2xl border border-earth-200 flex flex-col justify-between overflow-hidden hover:border-forest-800 transition-all shadow-2xs group"
                    >
                      {/* Treatment Image Banner */}
                      <div className="relative h-44 w-full bg-earth-100 overflow-hidden border-b border-earth-200">
                        {t.image ? (
                          <img
                            src={t.image}
                            alt={t.title}
                            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                          />
                        ) : (
                          <div className="w-full h-full flex flex-col items-center justify-center bg-cream-100 text-earth-400 gap-1">
                            <ImageIcon className="w-8 h-8 stroke-1" />
                            <span className="text-[11px] font-medium">No Image Uploaded</span>
                          </div>
                        )}
                        <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-forest-950/80 backdrop-blur-sm text-brass-400 font-mono text-xs font-bold border border-brass-400/20">
                          {t.number || '01'}
                        </div>
                        <div className="absolute top-3 right-3">
                          <button
                            type="button"
                            onClick={() => handleOpenEditTreatment(t)}
                            className="px-2.5 py-1 rounded-lg bg-white/90 hover:bg-white text-forest-950 text-[11px] font-bold shadow-sm backdrop-blur-sm flex items-center gap-1 border border-earth-200/80 cursor-pointer transition-colors"
                            title="Edit or Upload Image"
                          >
                            <Upload className="w-3 h-3 text-brass-600" />
                            <span>Change Image</span>
                          </button>
                        </div>
                      </div>

                      <div className="p-6 flex flex-col justify-between flex-1 space-y-4">
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="px-2.5 py-1 bg-white border border-earth-200 text-brass-700 font-bold text-[10px] uppercase rounded-md tracking-wider">
                              {t.subtitle}
                            </span>
                            <span className="text-[11px] font-semibold text-emerald-700">{t.duration}</span>
                          </div>

                          <h4 className="font-serif text-xl font-medium text-forest-950 leading-snug">
                            {t.title}
                          </h4>

                          <p className="text-xs text-earth-800 leading-relaxed font-light line-clamp-3">
                            {t.description}
                          </p>
                        </div>

                        <div className="pt-4 border-t border-earth-200/80 flex items-center justify-between">
                          <span className="text-[10px] text-earth-500 font-mono truncate max-w-[150px]">
                            {t.image ? t.image.split('/').pop() : 'Default therapy banner'}
                          </span>
                          
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleOpenEditTreatment(t)}
                              className="px-3 py-1.5 bg-forest-900 hover:bg-forest-800 text-cream-50 text-xs font-bold uppercase rounded-lg flex items-center gap-1 cursor-pointer"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                              <span>Edit Details</span>
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
                      className="fixed inset-0 z-50 bg-forest-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto"
                    >
                      <motion.div
                        initial={{ scale: 0.95, opacity: 0, y: 15 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.95, opacity: 0, y: 15 }}
                        onClick={(e) => e.stopPropagation()}
                        className="bg-white rounded-3xl max-w-lg w-full border border-earth-200 shadow-elevated overflow-hidden flex flex-col my-auto max-h-[92vh]"
                      >
                        {/* Modal Header */}
                        <div className="px-6 py-4 bg-white border-b border-earth-200 flex items-center justify-between shrink-0">
                          <div>
                            <span className="text-[10px] font-bold uppercase text-brass-600 tracking-wider">
                              {editingTreatment.id ? 'EDIT EXISTING TREATMENT' : 'ADD NEW CLINICAL SERVICE'}
                            </span>
                            <h3 className="font-serif text-xl sm:text-2xl text-forest-950 font-medium leading-tight">
                              {editingTreatment.id ? 'Update Treatment Details' : 'Create Treatment Service'}
                            </h3>
                          </div>
                          <button
                            type="button"
                            onClick={() => setIsTreatmentModalOpen(false)}
                            className="p-1.5 text-gray-400 hover:text-forest-950 rounded-full hover:bg-earth-100 transition-colors cursor-pointer shrink-0"
                          >
                            <XCircle className="w-6 h-6" />
                          </button>
                        </div>

                        {/* Modal Scrollable Body */}
                        <form id="treatment-modal-form" onSubmit={handleSaveTreatmentModal} className="p-6 space-y-4 text-xs overflow-y-auto flex-1">
                          <div>
                            <label className="block font-bold text-forest-950 uppercase mb-1">Treatment Title *</label>
                            <input
                              type="text"
                              required
                              value={editingTreatment.title}
                              onChange={(e) => setEditingTreatment({ ...editingTreatment, title: e.target.value })}
                              placeholder="e.g. Classical Shirodhara Stream"
                              className="w-full px-3.5 py-2 rounded-xl border border-earth-200 text-sm font-serif font-medium text-forest-950 focus:outline-none focus:border-forest-800"
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="block font-bold text-forest-950 uppercase mb-1">Subtitle / Category</label>
                              <input
                                type="text"
                                value={editingTreatment.subtitle}
                                onChange={(e) => setEditingTreatment({ ...editingTreatment, subtitle: e.target.value })}
                                placeholder="e.g. Mind Relaxation"
                                className="w-full px-3 py-2 rounded-xl border border-earth-200 text-xs font-semibold focus:outline-none focus:border-forest-800"
                              />
                            </div>

                            <div>
                              <label className="block font-bold text-forest-950 uppercase mb-1">Duration</label>
                              <input
                                type="text"
                                value={editingTreatment.duration}
                                onChange={(e) => setEditingTreatment({ ...editingTreatment, duration: e.target.value })}
                                placeholder="e.g. 45 Minutes"
                                className="w-full px-3 py-2 rounded-xl border border-earth-200 text-xs font-semibold focus:outline-none focus:border-forest-800"
                              />
                            </div>
                          </div>

                          {/* Treatment Image Upload & Preview Section */}
                          <div className="p-3.5 bg-cream-50 rounded-2xl border border-earth-200 space-y-2.5">
                            <div className="flex items-center justify-between">
                              <label className="block font-bold text-forest-950 uppercase text-[10px] tracking-wider">
                                Treatment Image
                              </label>
                              <span className="text-[10px] text-earth-500 font-medium">Max 5 MB (JPG, PNG, WebP)</span>
                            </div>

                            {/* Image Preview & Actions */}
                            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                              <div className="relative w-24 h-18 sm:w-28 sm:h-20 rounded-xl overflow-hidden bg-earth-200 border border-earth-300 shrink-0 shadow-inner flex items-center justify-center">
                                {editingTreatment.image ? (
                                  <img
                                    src={editingTreatment.image}
                                    alt="Preview"
                                    className="w-full h-full object-cover"
                                  />
                                ) : (
                                  <div className="flex flex-col items-center justify-center text-earth-500 gap-1">
                                    <ImageIcon className="w-5 h-5 stroke-1" />
                                    <span className="text-[9px]">No image</span>
                                  </div>
                                )}
                              </div>

                              <div className="flex-1 space-y-1.5 w-full">
                                <div className="flex items-center gap-2 flex-wrap">
                                  <label className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer shadow-soft transition-colors">
                                    <Upload className="w-3.5 h-3.5" />
                                    <span>{isUploadingTreatmentImage ? 'Uploading...' : 'Upload Image'}</span>
                                    <input
                                      type="file"
                                      accept="image/jpeg,image/png,image/webp,image/jpg"
                                      onChange={handleTreatmentImageUpload}
                                      disabled={isUploadingTreatmentImage}
                                      className="hidden"
                                    />
                                  </label>

                                  {editingTreatment.image && (
                                    <button
                                      type="button"
                                      onClick={() => setEditingTreatment(prev => ({ ...prev, image: '' }))}
                                      className="px-2.5 py-1.5 bg-white hover:bg-red-50 text-red-600 border border-earth-200 rounded-xl text-xs font-semibold cursor-pointer transition-colors"
                                    >
                                      Remove
                                    </button>
                                  )}
                                </div>

                                <input
                                  type="text"
                                  value={editingTreatment.image || ''}
                                  onChange={(e) => setEditingTreatment({ ...editingTreatment, image: e.target.value })}
                                  placeholder="Or paste image URL (e.g. /images/...)"
                                  className="w-full px-2.5 py-1.5 rounded-lg border border-earth-200 text-xs font-mono text-earth-800 focus:outline-none focus:border-forest-800 bg-white"
                                />
                              </div>
                            </div>

                            {/* Upload Progress Bar */}
                            {isUploadingTreatmentImage && (
                              <div className="space-y-1 pt-1">
                                <div className="flex justify-between text-[10px] text-forest-900 font-semibold">
                                  <span>Uploading image to server...</span>
                                  <span>{treatmentImageProgress}%</span>
                                </div>
                                <div className="w-full bg-earth-200 h-1.5 rounded-full overflow-hidden">
                                  <div
                                    className="bg-emerald-600 h-full rounded-full transition-all duration-300"
                                    style={{ width: `${treatmentImageProgress}%` }}
                                  />
                                </div>
                              </div>
                            )}

                            {/* Modal Error Notice */}
                            {treatmentModalError && (
                              <p className="text-[11px] text-red-600 font-semibold flex items-center gap-1">
                                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                                <span>{treatmentModalError}</span>
                              </p>
                            )}
                          </div>

                          <div>
                            <label className="block font-bold text-forest-950 uppercase mb-1">Treatment Description *</label>
                            <textarea
                              rows={3}
                              required
                              value={editingTreatment.description}
                              onChange={(e) => setEditingTreatment({ ...editingTreatment, description: e.target.value })}
                              placeholder="Describe the clinical protocol, benefits, and Ayurvedic procedure..."
                              className="w-full p-3 rounded-xl border border-earth-200 text-xs font-light text-earth-900 leading-relaxed focus:outline-none focus:border-forest-800"
                            />
                          </div>
                        </form>

                        {/* Modal Sticky Footer Action Bar */}
                        <div className="px-6 py-3.5 bg-cream-50/90 border-t border-earth-200 flex items-center justify-end gap-3 shrink-0">
                          <button
                            type="button"
                            onClick={() => setIsTreatmentModalOpen(false)}
                            className="px-5 py-2.5 bg-white hover:bg-earth-100 border border-earth-200 text-earth-900 text-xs font-semibold rounded-full cursor-pointer transition-colors"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            form="treatment-modal-form"
                            className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold uppercase rounded-full shadow-soft flex items-center gap-1.5 cursor-pointer transition-colors"
                          >
                            <Save className="w-4 h-4" />
                            <span>Save Treatment</span>
                          </button>
                        </div>
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

                  <div className="p-5 bg-cream-50 rounded-2xl border border-earth-200 space-y-3">
                    <label className="block font-bold text-forest-950 uppercase text-[10px] tracking-wider">Clinic Phone Numbers (3 Lines)</label>
                    <div className="space-y-2">
                      <div>
                        <span className="text-[10px] font-bold text-brass-800 uppercase block mb-0.5">Primary Phone</span>
                        <input
                          type="text"
                          value={settings.phone || ''}
                          onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                          placeholder="+91 88924 09195"
                          className="w-full px-3 py-2 bg-white border border-earth-200 rounded-xl font-bold text-forest-950 text-sm focus:outline-none focus:border-forest-800"
                        />
                      </div>
                      <div>
                        <span className="text-[10px] font-bold text-forest-800 uppercase block mb-0.5">Alternate Phone 1</span>
                        <input
                          type="text"
                          value={settings.altPhone || ''}
                          onChange={(e) => setSettings({ ...settings, altPhone: e.target.value })}
                          placeholder="+91 74062 90626"
                          className="w-full px-3 py-1.5 bg-white border border-earth-200 rounded-lg text-xs text-forest-900 font-semibold focus:outline-none focus:border-forest-800"
                        />
                      </div>
                      <div>
                        <span className="text-[10px] font-bold text-forest-800 uppercase block mb-0.5">Alternate Phone 2</span>
                        <input
                          type="text"
                          value={settings.secondaryPhone || ''}
                          onChange={(e) => setSettings({ ...settings, secondaryPhone: e.target.value })}
                          placeholder="+91 98440 90626"
                          className="w-full px-3 py-1.5 bg-white border border-earth-200 rounded-lg text-xs text-forest-900 font-semibold focus:outline-none focus:border-forest-800"
                        />
                      </div>
                    </div>
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

                {/* ═══════════════════════════════════════════════════════════════════════ */}
                {/* SECTION 4: RUNNING BAR SETTINGS (HOMEPAGE ANNOUNCEMENT TICKER)         */}
                {/* ═══════════════════════════════════════════════════════════════════════ */}
                <div id="running-bar-settings" className="p-6 sm:p-8 bg-cream-50/70 rounded-3xl border border-earth-200 space-y-6">
                  
                  {/* Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-earth-200 pb-5">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-full bg-forest-900 text-brass-400 text-[10px] font-bold uppercase tracking-widest">
                          HOMEPAGE TICKER CONTROL
                        </span>
                        <span className="text-xs text-earth-700 font-medium">• Live Sync with PostgreSQL</span>
                      </div>
                      <h4 className="font-serif text-xl sm:text-2xl text-forest-950 font-bold flex items-center gap-2">
                        <Sliders className="w-5 h-5 text-brass-600" />
                        <span>Running Bar Settings</span>
                      </h4>
                      <p className="text-xs text-earth-700 leading-relaxed max-w-2xl">
                        Customize the running announcement bar under the navigation header. Manage messages, timings, specialized care announcements, speed, icons, and separators with live preview.
                      </p>
                    </div>

                    <div className="flex items-center gap-2.5 shrink-0">
                      <button
                        type="button"
                        onClick={handleOpenAddMessage}
                        className="px-4 py-2 bg-forest-900 hover:bg-forest-800 text-cream-50 text-xs font-bold uppercase tracking-wider rounded-full flex items-center gap-1.5 transition-all shadow-sm cursor-pointer"
                      >
                        <Plus className="w-4 h-4 text-brass-400" />
                        <span>Add Message</span>
                      </button>

                      <button
                        type="button"
                        onClick={handleUpdateRunningBar}
                        disabled={isSavingRunningBar}
                        className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white text-xs font-bold uppercase tracking-wider rounded-full flex items-center gap-1.5 transition-all shadow-soft cursor-pointer"
                      >
                        {isSavingRunningBar ? (
                          <RefreshCw className="w-4 h-4 animate-spin" />
                        ) : (
                          <Save className="w-4 h-4" />
                        )}
                        <span>{isSavingRunningBar ? 'Updating...' : 'Update Running Bar'}</span>
                      </button>
                    </div>
                  </div>

                  {/* Feedback Alerts */}
                  {runningBarNotice && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-3.5 bg-emerald-100 border border-emerald-300 text-emerald-900 rounded-xl text-xs font-semibold flex items-center gap-2"
                    >
                      <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{runningBarNotice}</span>
                    </motion.div>
                  )}

                  {runningBarError && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-3.5 bg-red-100 border border-red-300 text-red-900 rounded-xl text-xs font-semibold flex items-center gap-2"
                    >
                      <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                      <span>{runningBarError}</span>
                    </motion.div>
                  )}

                  {/* 1. LIVE PREVIEW */}
                  <div className="bg-white p-5 rounded-2xl border border-earth-200 shadow-sm space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Eye className="w-4 h-4 text-forest-800" />
                        <span className="text-xs font-bold text-forest-950 uppercase tracking-wider">
                          Live Interactive Preview (Before Saving)
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-[10px] font-mono font-bold uppercase">
                        <span className={`px-2.5 py-0.5 rounded-full ${runningBar?.isPaused ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'}`}>
                          {runningBar?.isPaused ? '⏸ Paused' : '▶ Running'}
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full bg-cream-100 text-earth-800 border border-earth-200">
                          Speed: {runningBar?.speed || 'normal'}
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full bg-cream-100 text-earth-800 border border-earth-200">
                          Separator: "{runningBar?.separator || '✦'}"
                        </span>
                      </div>
                    </div>

                    <div className="rounded-xl overflow-hidden border border-brass-500/30 shadow-inner">
                      <BelowNavbarAnimation previewData={runningBar} />
                    </div>
                  </div>

                  {/* 2. CONTROLS: Speed, Pause/Resume, Separator */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    
                    {/* Scrolling Speed */}
                    <div className="p-4 bg-white rounded-2xl border border-earth-200 space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="block text-[11px] font-bold text-forest-950 uppercase tracking-wider">
                          Scrolling Speed
                        </label>
                        <span className="text-[10px] text-earth-600 font-mono">
                          {runningBar?.speed === 'slow' ? '65s cycle' : runningBar?.speed === 'fast' ? '25s cycle' : '45s cycle'}
                        </span>
                      </div>
                      <div className="grid grid-cols-3 gap-2 pt-1">
                        {['slow', 'normal', 'fast'].map((spd) => (
                          <button
                            key={spd}
                            type="button"
                            onClick={() => setRunningBar(prev => ({ ...prev, speed: spd }))}
                            className={`py-2 px-3 text-xs font-bold uppercase tracking-wider rounded-xl border transition-all cursor-pointer text-center ${
                              runningBar?.speed === spd
                                ? 'bg-forest-900 text-brass-400 border-forest-900 shadow-xs'
                                : 'bg-cream-50 text-earth-800 border-earth-200 hover:bg-cream-100'
                            }`}
                          >
                            {spd}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Pause / Resume Running Bar */}
                    <div className="p-4 bg-white rounded-2xl border border-earth-200 space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="block text-[11px] font-bold text-forest-950 uppercase tracking-wider">
                          Ticker Status
                        </label>
                        <span className={`text-[10px] font-bold uppercase ${runningBar?.isPaused ? 'text-amber-600' : 'text-emerald-600'}`}>
                          {runningBar?.isPaused ? 'Currently Paused' : 'Actively Moving'}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setRunningBar(prev => ({ ...prev, isPaused: !prev.isPaused }))}
                        className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 border transition-all cursor-pointer ${
                          runningBar?.isPaused
                            ? 'bg-amber-500 hover:bg-amber-400 text-forest-950 border-amber-600 shadow-xs'
                            : 'bg-cream-100 hover:bg-cream-200 text-forest-950 border-earth-200'
                        }`}
                      >
                        {runningBar?.isPaused ? (
                          <>
                            <Play className="w-4 h-4 fill-current" />
                            <span>Resume Scrolling</span>
                          </>
                        ) : (
                          <>
                            <Pause className="w-4 h-4 fill-current" />
                            <span>Pause Scrolling</span>
                          </>
                        )}
                      </button>
                    </div>

                    {/* Separator Symbol */}
                    <div className="p-4 bg-white rounded-2xl border border-earth-200 space-y-2">
                      <label className="block text-[11px] font-bold text-forest-950 uppercase tracking-wider">
                        Separator Symbol
                      </label>
                      <div className="flex items-center gap-2">
                        {['✦', '•', '★', '◆', '|'].map((sym) => (
                          <button
                            key={sym}
                            type="button"
                            onClick={() => setRunningBar(prev => ({ ...prev, separator: sym }))}
                            className={`w-8 h-8 rounded-lg text-sm font-bold flex items-center justify-center border transition-all cursor-pointer ${
                              runningBar?.separator === sym
                                ? 'bg-brass-500 text-forest-950 border-brass-600 shadow-xs'
                                : 'bg-cream-50 text-earth-800 border-earth-200 hover:bg-cream-100'
                            }`}
                          >
                            {sym}
                          </button>
                        ))}
                        <input
                          type="text"
                          maxLength={3}
                          value={runningBar?.separator || ''}
                          onChange={(e) => setRunningBar(prev => ({ ...prev, separator: e.target.value }))}
                          placeholder="Custom"
                          className="w-16 px-2 py-1.5 bg-cream-50 border border-earth-200 rounded-lg text-center text-xs font-mono font-bold focus:outline-none focus:border-forest-800"
                        />
                      </div>
                    </div>

                  </div>

                  {/* 3. MESSAGES LIST */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h5 className="font-serif text-base text-forest-950 font-bold flex items-center gap-2">
                        <span>Messages & Locations ({runningBar?.items?.length || 0})</span>
                      </h5>
                      <span className="text-xs text-earth-600">
                        Use Move Up / Down to reorder items. Drag & drop or toggle active status.
                      </span>
                    </div>

                    <div className="space-y-2.5">
                      {(runningBar?.items || []).map((item, idx) => (
                        <div
                          key={item.id || idx}
                          className={`p-3.5 sm:p-4 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                            item.enabled !== false
                              ? 'bg-white border-earth-200 shadow-xs'
                              : 'bg-cream-100/50 border-earth-200/60 opacity-60'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            {/* Order Controls */}
                            <div className="flex items-center gap-1 shrink-0">
                              <span className="w-6 text-center text-xs font-mono font-bold text-earth-500">
                                #{idx + 1}
                              </span>
                              <div className="flex flex-col gap-0.5">
                                <button
                                  type="button"
                                  disabled={idx === 0}
                                  onClick={() => handleMoveMessage(idx, 'up')}
                                  title="Move Up"
                                  className="p-1 rounded hover:bg-cream-100 disabled:opacity-20 text-forest-950 cursor-pointer disabled:cursor-not-allowed"
                                >
                                  <ArrowUp className="w-3 h-3" />
                                </button>
                                <button
                                  type="button"
                                  disabled={idx === (runningBar.items.length - 1)}
                                  onClick={() => handleMoveMessage(idx, 'down')}
                                  title="Move Down"
                                  className="p-1 rounded hover:bg-cream-100 disabled:opacity-20 text-forest-950 cursor-pointer disabled:cursor-not-allowed"
                                >
                                  <ArrowDown className="w-3 h-3" />
                                </button>
                              </div>
                            </div>

                            {/* Type & Icon Badges */}
                            <div className="flex items-center gap-2 shrink-0">
                              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                item.type === 'timing'
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : item.type === 'badge'
                                  ? 'bg-brass-100 text-brass-900'
                                  : 'bg-blue-100 text-blue-800'
                              }`}>
                                {item.type || 'announcement'}
                              </span>

                              <div className="w-7 h-7 rounded-lg bg-forest-900 text-brass-400 flex items-center justify-center shrink-0">
                                {renderRunningBarIcon(item.icon, "w-3.5 h-3.5 text-brass-400")}
                              </div>
                            </div>

                            {/* Message Content */}
                            <div className="space-y-0.5 min-w-0">
                              <div className="flex items-center gap-1.5 flex-wrap">
                                {item.label && (
                                  <span className="font-bold text-xs uppercase text-forest-950">
                                    {item.label}
                                  </span>
                                )}
                                <span className="text-xs text-earth-800 font-medium truncate">
                                  {item.text}
                                </span>
                              </div>
                              <span className="text-[10px] text-earth-500 block">
                                Icon: {item.icon || 'None'} • Status: {item.enabled !== false ? 'Active (Shown)' : 'Hidden'}
                              </span>
                            </div>
                          </div>

                          {/* Item Actions */}
                          <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                            {/* Enable/Disable Toggle */}
                            <button
                              type="button"
                              onClick={() => handleToggleMessageStatus(item.id)}
                              className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                                item.enabled !== false
                                  ? 'bg-emerald-600 text-white hover:bg-emerald-500'
                                  : 'bg-earth-200 text-earth-700 hover:bg-earth-300'
                              }`}
                            >
                              {item.enabled !== false ? 'Enabled' : 'Disabled'}
                            </button>

                            {/* Edit Button */}
                            <button
                              type="button"
                              onClick={() => handleOpenEditMessage(item)}
                              className="p-1.5 rounded-lg bg-cream-100 hover:bg-earth-200 text-forest-950 transition-colors cursor-pointer"
                              title="Edit Message"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>

                            {/* Delete Button */}
                            <button
                              type="button"
                              onClick={() => handleDeleteMessage(item.id, item.text || item.label)}
                              className="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 transition-colors cursor-pointer"
                              title="Delete Message"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Update Button */}
                  <div className="pt-4 border-t border-earth-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <p className="text-xs text-earth-600">
                      Changes made here will instantly update the ticker across the live public website upon clicking below.
                    </p>

                    <button
                      type="button"
                      onClick={handleUpdateRunningBar}
                      disabled={isSavingRunningBar}
                      className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-bold text-xs uppercase tracking-wider rounded-full shadow-soft flex items-center justify-center gap-2 transition-all cursor-pointer"
                    >
                      {isSavingRunningBar ? (
                        <RefreshCw className="w-4 h-4 animate-spin" />
                      ) : (
                        <Save className="w-4 h-4" />
                      )}
                      <span>{isSavingRunningBar ? 'Saving to Database...' : 'Update Running Bar'}</span>
                    </button>
                  </div>

                </div>

                {/* ───────────────────────────────────────────────────────────── */}
                {/* SECTION 5: HERO SLIDER SETTINGS (HOMEPAGE HERO SLIDER)        */}
                {/* ───────────────────────────────────────────────────────────── */}
                <div className="bg-white p-6 sm:p-8 rounded-3xl border border-earth-200 shadow-soft space-y-6">
                  
                  {/* Section Title & Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-earth-200">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-forest-100 flex items-center justify-center text-forest-900 shrink-0">
                        <ImageIcon className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h2 className="font-serif text-xl sm:text-2xl text-forest-950 font-light">
                            Hero Slider Settings
                          </h2>
                          <span className="px-2.5 py-0.5 rounded-full bg-forest-100 text-forest-900 text-[10px] font-bold uppercase tracking-wider">
                            Homepage
                          </span>
                        </div>
                        <p className="text-xs text-earth-700 font-light">
                          Manage images, titles, subtitles, badges, and captions shown in the homepage Hero Slider.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold px-3 py-1.5 bg-cream-100 text-forest-950 rounded-full border border-earth-200">
                        {heroSlider?.slides?.length || 0} Slides ({heroSlider?.slides?.filter(s => s.enabled !== false).length || 0} Active)
                      </span>
                    </div>
                  </div>

                  {/* Feedback Banners */}
                  {heroSliderNotice && (
                    <motion.div
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-2xl text-xs font-semibold flex items-center gap-2"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{heroSliderNotice}</span>
                    </motion.div>
                  )}

                  {heroSliderError && (
                    <motion.div
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 bg-red-50 border border-red-200 text-red-900 rounded-2xl text-xs font-semibold flex items-center gap-2"
                    >
                      <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                      <span>{heroSliderError}</span>
                    </motion.div>
                  )}

                  {/* Image Requirements & Guidelines Card */}
                  <div className="p-4 sm:p-5 bg-cream-50/90 rounded-2xl border border-brass-200/60 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5 text-xs font-bold uppercase text-forest-900 tracking-wider">
                        <Info className="w-4 h-4 text-brass-600 shrink-0" />
                        <span>Recommended Image Sizes & Formats</span>
                      </div>
                      <p className="text-xs text-earth-700 leading-relaxed">
                        • <strong>Desktop View:</strong> 1600 × 1200 px (4:3) or 1920 × 1080 px (16:9)<br className="hidden sm:inline" />
                        • <strong>Mobile View (Optional):</strong> 1080 × 1350 px (4:5) or 1080 × 1920 px (9:16)<br className="hidden sm:inline" />
                        • <strong>Accepted Formats:</strong> JPG, JPEG, PNG, WebP • <strong>Max Size:</strong> 5 MB per image<br />
                        • Automatic responsive cropping (<code>object-fit: cover</code>) ensures images remain crisp without stretching.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={handleOpenAddSlide}
                      className="px-5 py-2.5 bg-forest-900 hover:bg-forest-800 text-cream-50 font-bold text-xs uppercase tracking-wider rounded-full shadow-soft flex items-center justify-center gap-1.5 shrink-0 cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Upload & Add Slide</span>
                    </button>
                  </div>

                  {/* Interactive Live Preview */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold uppercase tracking-widest text-forest-950">
                          Interactive Live Preview
                        </span>
                        <span className="px-2 py-0.5 rounded-md bg-brass-100 text-brass-900 text-[10px] font-bold">
                          Real-time Preview
                        </span>
                      </div>
                      <span className="text-[11px] text-earth-600 hidden sm:inline">
                        Preview matches the public homepage card design & crossfade animation
                      </span>
                    </div>

                    <div className="p-6 bg-cream-100/50 rounded-3xl border border-earth-200 flex flex-col items-center justify-center">
                      <HomeImageSlider previewData={heroSlider} />
                    </div>
                  </div>

                  {/* Slider Playback & Speed Controls */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
                    {/* Auto-Slide Pause/Resume */}
                    <div className="p-4 rounded-2xl bg-cream-50 border border-earth-200 flex items-center justify-between">
                      <div>
                        <span className="block text-xs font-bold text-forest-950 uppercase">Slider Playback</span>
                        <span className="text-[11px] text-earth-700 font-light">
                          {heroSlider.isPaused ? 'Animation Paused' : 'Auto-advancing slides'}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setHeroSlider(prev => ({ ...prev, isPaused: !prev.isPaused }))}
                        className={`px-3.5 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                          heroSlider.isPaused
                            ? 'bg-amber-100 text-amber-900 border border-amber-300 hover:bg-amber-200'
                            : 'bg-emerald-100 text-emerald-900 border border-emerald-300 hover:bg-emerald-200'
                        }`}
                      >
                        {heroSlider.isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
                        <span>{heroSlider.isPaused ? 'Resume' : 'Pause'}</span>
                      </button>
                    </div>

                    {/* Auto-slide Duration */}
                    <div className="p-4 rounded-2xl bg-cream-50 border border-earth-200 flex items-center justify-between">
                      <div>
                        <span className="block text-xs font-bold text-forest-950 uppercase">Slide Duration</span>
                        <span className="text-[11px] text-earth-700 font-light">Time per slide transition</span>
                      </div>
                      <select
                        value={heroSlider.autoSlideDuration || 5000}
                        onChange={(e) => setHeroSlider(prev => ({ ...prev, autoSlideDuration: Number(e.target.value) }))}
                        className="px-3 py-1.5 bg-white border border-earth-200 rounded-xl text-xs font-bold text-forest-950 focus:outline-none focus:border-forest-800"
                      >
                        <option value={3000}>Fast (3 seconds)</option>
                        <option value={5000}>Normal (5 seconds)</option>
                        <option value={7000}>Relaxed (7 seconds)</option>
                        <option value={10000}>Slow (10 seconds)</option>
                      </select>
                    </div>

                    {/* Slide Count Summary */}
                    <div className="p-4 rounded-2xl bg-cream-50 border border-earth-200 flex items-center justify-between sm:col-span-2 lg:col-span-1">
                      <div>
                        <span className="block text-xs font-bold text-forest-950 uppercase">Active Slides</span>
                        <span className="text-[11px] text-earth-700 font-light">
                          {heroSlider.slides?.filter(s => s.enabled !== false).length || 0} of {heroSlider.slides?.length || 0} enabled
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={handleOpenAddSlide}
                        className="px-3.5 py-1.5 bg-forest-900 hover:bg-forest-800 text-cream-50 text-xs font-semibold rounded-full flex items-center gap-1 cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add Slide</span>
                      </button>
                    </div>
                  </div>

                  {/* Configured Slides List */}
                  <div className="space-y-3 pt-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-widest text-forest-950">
                        Slide Order & Images (Drag or use ↑ ↓ buttons to reorder)
                      </span>
                      <span className="text-[11px] text-earth-600">
                        ⭐ Click star to set as First Slide
                      </span>
                    </div>

                    <div className="space-y-3">
                      {heroSlider.slides?.map((slide, idx) => (
                        <div
                          key={slide.id || idx}
                          draggable
                          onDragStart={() => setDraggedSlideIdx(idx)}
                          onDragOver={(e) => e.preventDefault()}
                          onDrop={() => handleDragDropSlide(idx)}
                          className={`p-4 rounded-2xl border transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4 cursor-move ${
                            slide.enabled === false
                              ? 'bg-earth-100/60 border-earth-300 opacity-60'
                              : idx === 0
                              ? 'bg-amber-50/40 border-amber-300/80 shadow-xs'
                              : 'bg-cream-50/70 border-earth-200 hover:bg-cream-100/80'
                          }`}
                        >
                          {/* Left: Drag Handle, Number, Thumbnail, Text info */}
                          <div className="flex items-center gap-3.5 min-w-0 flex-1">
                            <div className="p-1 text-earth-400 hover:text-forest-900 cursor-grab active:cursor-grabbing">
                              <GripVertical className="w-5 h-5" />
                            </div>

                            {/* Order index badge */}
                            <span className="w-7 h-7 rounded-xl bg-forest-900 text-cream-50 font-mono text-xs font-bold flex items-center justify-center shrink-0">
                              {idx + 1}
                            </span>

                            {/* Thumbnail Preview */}
                            <div className="w-20 h-14 sm:w-24 sm:h-16 rounded-xl overflow-hidden bg-forest-950 border border-earth-200 shrink-0 relative group">
                              <img
                                src={slide.image}
                                alt={slide.altText || slide.title}
                                className="w-full h-full object-cover object-center"
                              />
                              {slide.mobileImage && (
                                <span className="absolute bottom-1 right-1 px-1 py-0.5 rounded bg-forest-950/80 text-[8px] font-bold text-brass-400">
                                  +Mob
                                </span>
                              )}
                            </div>

                            {/* Slide Text Metadata */}
                            <div className="space-y-1 min-w-0">
                              <div className="flex items-center gap-2 flex-wrap">
                                {idx === 0 && (
                                  <span className="px-2 py-0.5 rounded-full bg-amber-500 text-forest-950 text-[10px] font-bold flex items-center gap-1 shadow-xs">
                                    <Star className="w-3 h-3 fill-forest-950" />
                                    First Slide
                                  </span>
                                )}
                                {slide.badge && (
                                  <span className="px-2 py-0.5 rounded-full bg-forest-950 text-brass-400 text-[10px] font-bold">
                                    {slide.badge}
                                  </span>
                                )}
                                <h4 className="font-serif font-bold text-sm text-forest-950 truncate">
                                  {slide.title}
                                </h4>
                              </div>

                              <p className="text-xs text-earth-700 truncate">
                                {slide.subtitle || slide.caption}
                              </p>

                              <p className="text-[10px] text-earth-500">
                                Alt Text: {slide.altText || 'Not specified'} • Status: {slide.enabled !== false ? 'Active' : 'Disabled'}
                              </p>
                            </div>
                          </div>

                          {/* Right: Actions */}
                          <div className="flex items-center gap-2 shrink-0 self-end md:self-center flex-wrap">
                            {/* Set As First Slide */}
                            {idx !== 0 && (
                              <button
                                type="button"
                                onClick={() => handleSetFirstSlide(idx)}
                                className="px-3 py-1.5 rounded-full bg-amber-100 hover:bg-amber-200 text-amber-900 text-xs font-bold flex items-center gap-1 transition-all cursor-pointer"
                                title="Make this slide appear first"
                              >
                                <Star className="w-3.5 h-3.5" />
                                <span className="hidden sm:inline">Set First</span>
                              </button>
                            )}

                            {/* Move Up / Down */}
                            <button
                              type="button"
                              onClick={() => handleMoveSlide(idx, 'up')}
                              disabled={idx === 0}
                              className="p-2 rounded-lg bg-cream-100 hover:bg-earth-200 disabled:opacity-30 text-forest-900 transition-colors cursor-pointer"
                              title="Move Up"
                            >
                              <ArrowUp className="w-4 h-4" />
                            </button>

                            <button
                              type="button"
                              onClick={() => handleMoveSlide(idx, 'down')}
                              disabled={idx === (heroSlider.slides?.length || 0) - 1}
                              className="p-2 rounded-lg bg-cream-100 hover:bg-earth-200 disabled:opacity-30 text-forest-900 transition-colors cursor-pointer"
                              title="Move Down"
                            >
                              <ArrowDown className="w-4 h-4" />
                            </button>

                            {/* Enable/Disable Toggle */}
                            <button
                              type="button"
                              onClick={() => handleToggleSlideStatus(slide.id)}
                              className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                                slide.enabled !== false
                                  ? 'bg-emerald-600 text-white hover:bg-emerald-500'
                                  : 'bg-earth-200 text-earth-700 hover:bg-earth-300'
                              }`}
                            >
                              {slide.enabled !== false ? 'Active' : 'Disabled'}
                            </button>

                            {/* Edit Button */}
                            <button
                              type="button"
                              onClick={() => handleOpenEditSlide(slide)}
                              className="p-2 rounded-lg bg-cream-100 hover:bg-earth-200 text-forest-950 transition-colors cursor-pointer"
                              title="Edit Slide & Images"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>

                            {/* Delete Button */}
                            <button
                              type="button"
                              onClick={() => setDeletingSlideId(slide.id)}
                              className="p-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 transition-colors cursor-pointer"
                              title="Delete Slide"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Update Button */}
                  <div className="pt-4 border-t border-earth-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <p className="text-xs text-earth-600">
                      Changes made here will instantly update the hero slider across the live public website upon clicking below.
                    </p>

                    <button
                      type="button"
                      onClick={handleUpdateHeroSlider}
                      disabled={isSavingHeroSlider}
                      className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-bold text-xs uppercase tracking-wider rounded-full shadow-soft flex items-center justify-center gap-2 transition-all cursor-pointer"
                    >
                      {isSavingHeroSlider ? (
                        <RefreshCw className="w-4 h-4 animate-spin" />
                      ) : (
                        <Save className="w-4 h-4" />
                      )}
                      <span>{isSavingHeroSlider ? 'Saving to Database...' : 'Update Hero Slider'}</span>
                    </button>
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

            {/* ADD / EDIT RUNNING BAR MESSAGE MODAL */}
            <AnimatePresence>
              {isMessageModalOpen && editingMessage && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-forest-950/70 backdrop-blur-xs"
                >
                  <motion.div
                    initial={{ scale: 0.95, y: 15 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.95, y: 15 }}
                    className="bg-white rounded-3xl border border-earth-200 shadow-elevated w-full max-w-lg overflow-hidden flex flex-col"
                  >
                    <div className="p-6 bg-forest-950 text-cream-50 flex items-center justify-between border-b border-forest-900">
                      <div className="space-y-0.5">
                        <span className="text-[10px] font-bold text-brass-400 uppercase tracking-widest">
                          RUNNING BAR EDITOR
                        </span>
                        <h3 className="font-serif text-xl font-light">
                          {editingMessage.id ? 'Edit Ticker Message' : 'Add New Ticker Message'}
                        </h3>
                      </div>
                      <button
                        type="button"
                        onClick={() => setIsMessageModalOpen(false)}
                        className="p-1.5 rounded-full hover:bg-forest-900 text-cream-200 cursor-pointer"
                      >
                        <XCircle className="w-5 h-5" />
                      </button>
                    </div>

                    <form onSubmit={handleSaveMessageModal} className="p-6 space-y-4 text-xs">
                      {messageModalError && (
                        <div className="p-3 bg-red-100 text-red-900 rounded-xl border border-red-200 text-xs font-semibold">
                          {messageModalError}
                        </div>
                      )}

                      {/* Message Type */}
                      <div>
                        <label className="block font-bold text-forest-950 uppercase text-[10px] mb-1">
                          Message Type
                        </label>
                        <select
                          value={editingMessage.type}
                          onChange={(e) => setEditingMessage({ ...editingMessage, type: e.target.value })}
                          className="w-full px-3 py-2.5 bg-cream-50 border border-earth-200 rounded-xl font-semibold text-forest-950 focus:outline-none focus:border-forest-800"
                        >
                          <option value="timing">Clinic Timing & Location (e.g. ANANDAPURA: 6:30 PM to 9:30 PM)</option>
                          <option value="announcement">Announcement / Care Highlight</option>
                          <option value="badge">Badge Pill (e.g. CLINIC TIMINGS)</option>
                          <option value="custom">Custom Text</option>
                        </select>
                      </div>

                      {/* Label (e.g. ANANDAPURA:) */}
                      <div>
                        <label className="block font-bold text-forest-950 uppercase text-[10px] mb-1">
                          Label / Location Prefix (Optional)
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. ANANDAPURA: or KRISHNARAJAPURAM:"
                          value={editingMessage.label || ''}
                          onChange={(e) => setEditingMessage({ ...editingMessage, label: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-white border border-earth-200 rounded-xl font-semibold text-forest-950 focus:outline-none focus:border-forest-800"
                        />
                      </div>

                      {/* Main Text */}
                      <div>
                        <label className="block font-bold text-forest-950 uppercase text-[10px] mb-1">
                          Message Text / Timings <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. 6:30 PM to 9:30 PM or We provide Ayurvedic care for all types of cancer"
                          value={editingMessage.text || ''}
                          onChange={(e) => setEditingMessage({ ...editingMessage, text: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-white border border-earth-200 rounded-xl font-medium text-forest-950 focus:outline-none focus:border-forest-800"
                        />
                      </div>

                      {/* Icon Selector */}
                      <div>
                        <label className="block font-bold text-forest-950 uppercase text-[10px] mb-2">
                          Icon
                        </label>
                        <div className="grid grid-cols-5 gap-2">
                          {[
                            { name: 'Clock', label: 'Clock' },
                            { name: 'MapPin', label: 'MapPin' },
                            { name: 'Sparkles', label: 'Sparkles' },
                            { name: 'Phone', label: 'Phone' },
                            { name: 'Award', label: 'Award' },
                            { name: 'Heart', label: 'Heart' },
                            { name: 'Star', label: 'Star' },
                            { name: 'Calendar', label: 'Calendar' },
                            { name: 'Info', label: 'Info' },
                            { name: 'None', label: 'None' }
                          ].map((ic) => (
                            <button
                              key={ic.name}
                              type="button"
                              onClick={() => setEditingMessage({ ...editingMessage, icon: ic.name })}
                              className={`p-2 rounded-xl border flex flex-col items-center gap-1 transition-all cursor-pointer ${
                                editingMessage.icon === ic.name
                                  ? 'bg-forest-900 text-brass-400 border-forest-900 shadow-xs'
                                  : 'bg-cream-50 text-earth-800 border-earth-200 hover:bg-cream-100'
                              }`}
                            >
                              <div className="w-4 h-4 flex items-center justify-center">
                                {renderRunningBarIcon(ic.name, "w-4 h-4")}
                              </div>
                              <span className="text-[9px] font-bold">{ic.label}</span>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Enabled Status */}
                      <div className="pt-2 flex items-center justify-between border-t border-earth-100">
                        <span className="text-xs font-semibold text-forest-950">Enable on Website</span>
                        <label className="inline-flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={editingMessage.enabled !== false}
                            onChange={(e) => setEditingMessage({ ...editingMessage, enabled: e.target.checked })}
                            className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500"
                          />
                          <span className="text-xs text-earth-800">
                            {editingMessage.enabled !== false ? 'Active' : 'Disabled'}
                          </span>
                        </label>
                      </div>

                      {/* Action Buttons */}
                      <div className="pt-4 border-t border-earth-200 flex items-center justify-end gap-3">
                        <button
                          type="button"
                          onClick={() => setIsMessageModalOpen(false)}
                          className="px-5 py-2.5 bg-cream-100 hover:bg-earth-200 text-earth-900 text-xs font-semibold rounded-full cursor-pointer"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold uppercase rounded-full shadow-soft flex items-center gap-1.5 cursor-pointer"
                        >
                          <Save className="w-4 h-4" />
                          <span>Save Message</span>
                        </button>
                      </div>
                    </form>
                  </motion.div>
                </motion.div>
              )}

              {/* ADD / EDIT HERO SLIDE MODAL */}
              {isSlideModalOpen && editingSlide && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-forest-950/75 backdrop-blur-xs overflow-y-auto"
                >
                  <motion.div
                    initial={{ scale: 0.95, y: 15 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.95, y: 15 }}
                    className="bg-white rounded-3xl border border-earth-200 shadow-elevated w-full max-w-2xl overflow-hidden flex flex-col my-8 max-h-[90vh]"
                  >
                    {/* Modal Header */}
                    <div className="p-6 bg-forest-950 text-cream-50 flex items-center justify-between border-b border-forest-900 shrink-0">
                      <div className="space-y-0.5">
                        <span className="text-[10px] font-bold text-brass-400 uppercase tracking-widest">
                          HERO SLIDER EDITOR
                        </span>
                        <h3 className="font-serif text-xl font-light">
                          {editingSlide.id ? 'Edit Hero Slide' : 'Add New Hero Slide'}
                        </h3>
                      </div>
                      <button
                        type="button"
                        onClick={() => setIsSlideModalOpen(false)}
                        className="p-1.5 rounded-full hover:bg-forest-900 text-cream-200 cursor-pointer"
                      >
                        <XCircle className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Modal Body / Form */}
                    <form onSubmit={handleSaveSlideModal} className="p-6 space-y-5 overflow-y-auto text-xs">
                      {slideModalError && (
                        <div className="p-3 bg-red-100 text-red-900 rounded-xl border border-red-200 text-xs font-semibold flex items-center gap-2">
                          <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                          <span>{slideModalError}</span>
                        </div>
                      )}

                      {/* 1. Desktop Image Upload & Preview */}
                      <div className="p-4 bg-cream-50/80 rounded-2xl border border-earth-200 space-y-3">
                        <div className="flex items-center justify-between">
                          <label className="block font-bold text-forest-950 uppercase text-[11px]">
                            Desktop Image <span className="text-red-500">*</span>
                          </label>
                          <span className="text-[10px] text-earth-600">
                            Recommended: 1600 × 1200 px (4:3) or 1920 × 1080 px (16:9) • Max 5 MB
                          </span>
                        </div>

                        {editingSlide.image ? (
                          <div className="relative rounded-2xl overflow-hidden border border-earth-200 aspect-[16/9] bg-forest-950 max-h-48 group">
                            <img
                              src={editingSlide.image}
                              alt="Desktop Preview"
                              className="w-full h-full object-cover object-center"
                            />
                            <div className="absolute inset-0 bg-forest-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                              <label className="px-4 py-2 bg-white/95 hover:bg-white text-forest-950 rounded-full font-bold text-xs uppercase tracking-wider shadow-md cursor-pointer flex items-center gap-1.5">
                                <Upload className="w-3.5 h-3.5" />
                                <span>Replace Desktop Image</span>
                                <input
                                  type="file"
                                  accept="image/jpeg,image/png,image/webp,image/jpg"
                                  onChange={handleDesktopFileSelect}
                                  className="hidden"
                                />
                              </label>
                            </div>
                          </div>
                        ) : (
                          <label className="border-2 border-dashed border-earth-300 hover:border-forest-800 rounded-2xl p-6 flex flex-col items-center justify-center gap-2 bg-white transition-colors cursor-pointer text-center">
                            <div className="w-10 h-10 rounded-full bg-forest-100 text-forest-900 flex items-center justify-center">
                              <Upload className="w-5 h-5" />
                            </div>
                            <div>
                              <span className="text-xs font-bold text-forest-950 block">Click to Upload Desktop Image</span>
                              <span className="text-[10px] text-earth-600">JPG, JPEG, PNG, or WebP up to 5 MB</span>
                            </div>
                            <input
                              type="file"
                              accept="image/jpeg,image/png,image/webp,image/jpg"
                              onChange={handleDesktopFileSelect}
                              className="hidden"
                            />
                          </label>
                        )}

                        {isUploadingDesktop && (
                          <div className="space-y-1 pt-1">
                            <div className="flex items-center justify-between text-[10px] font-semibold text-forest-900">
                              <span>Uploading & optimizing desktop image...</span>
                              <span>{desktopUploadProgress}%</span>
                            </div>
                            <div className="w-full h-2 bg-earth-200 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-forest-900 transition-all duration-300"
                                style={{ width: `${desktopUploadProgress}%` }}
                              />
                            </div>
                          </div>
                        )}
                      </div>

                      {/* 2. Mobile Image Upload & Preview (Optional) */}
                      <div className="p-4 bg-cream-50/80 rounded-2xl border border-earth-200 space-y-3">
                        <div className="flex items-center justify-between">
                          <label className="block font-bold text-forest-950 uppercase text-[11px]">
                            Mobile Image (Optional)
                          </label>
                          <span className="text-[10px] text-earth-600">
                            Recommended: 1080 × 1350 px (4:5) • Max 5 MB
                          </span>
                        </div>

                        {editingSlide.mobileImage ? (
                          <div className="relative rounded-2xl overflow-hidden border border-earth-200 aspect-[4/3] bg-forest-950 max-h-40 group flex items-center justify-center">
                            <img
                              src={editingSlide.mobileImage}
                              alt="Mobile Preview"
                              className="w-full h-full object-cover object-center"
                            />
                            <div className="absolute inset-0 bg-forest-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                              <label className="px-3 py-1.5 bg-white/95 hover:bg-white text-forest-950 rounded-full font-bold text-xs uppercase tracking-wider shadow-md cursor-pointer flex items-center gap-1.5">
                                <Upload className="w-3.5 h-3.5" />
                                <span>Replace Mobile</span>
                                <input
                                  type="file"
                                  accept="image/jpeg,image/png,image/webp,image/jpg"
                                  onChange={handleMobileFileSelect}
                                  className="hidden"
                                />
                              </label>
                              <button
                                type="button"
                                onClick={() => setEditingSlide(prev => ({ ...prev, mobileImage: '' }))}
                                className="px-3 py-1.5 bg-red-600 hover:bg-red-500 text-white rounded-full font-bold text-xs uppercase tracking-wider shadow-md cursor-pointer"
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        ) : (
                          <label className="border-2 border-dashed border-earth-300 hover:border-forest-800 rounded-2xl p-4 flex flex-col items-center justify-center gap-1 bg-white transition-colors cursor-pointer text-center">
                            <div className="w-8 h-8 rounded-full bg-cream-100 text-forest-900 flex items-center justify-center">
                              <Upload className="w-4 h-4" />
                            </div>
                            <span className="text-xs font-semibold text-forest-950">Upload Specific Mobile Image (Optional)</span>
                            <span className="text-[10px] text-earth-500">If omitted, desktop image will be responsively displayed</span>
                            <input
                              type="file"
                              accept="image/jpeg,image/png,image/webp,image/jpg"
                              onChange={handleMobileFileSelect}
                              className="hidden"
                            />
                          </label>
                        )}

                        {isUploadingMobile && (
                          <div className="space-y-1 pt-1">
                            <div className="flex items-center justify-between text-[10px] font-semibold text-forest-900">
                              <span>Uploading & optimizing mobile image...</span>
                              <span>{mobileUploadProgress}%</span>
                            </div>
                            <div className="w-full h-2 bg-earth-200 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-forest-900 transition-all duration-300"
                                style={{ width: `${mobileUploadProgress}%` }}
                              />
                            </div>
                          </div>
                        )}
                      </div>

                      {/* 3. Typography Fields */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block font-bold text-forest-950 uppercase text-[10px] mb-1">
                            Badge Text (Pill on Top-Left)
                          </label>
                          <input
                            type="text"
                            placeholder="e.g. Vedic Heritage"
                            value={editingSlide.badge || ''}
                            onChange={(e) => setEditingSlide({ ...editingSlide, badge: e.target.value })}
                            className="w-full px-3.5 py-2.5 bg-white border border-earth-200 rounded-xl font-medium text-forest-950 focus:outline-none focus:border-forest-800"
                          />
                        </div>

                        <div>
                          <label className="block font-bold text-forest-950 uppercase text-[10px] mb-1">
                            Slide Title <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Classical Samhitas"
                            value={editingSlide.title || ''}
                            onChange={(e) => setEditingSlide({ ...editingSlide, title: e.target.value })}
                            className="w-full px-3.5 py-2.5 bg-white border border-earth-200 rounded-xl font-bold text-forest-950 focus:outline-none focus:border-forest-800"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block font-bold text-forest-950 uppercase text-[10px] mb-1">
                          Slide Subtitle
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Vedic Healing Heritage & Sacred Samhitas"
                          value={editingSlide.subtitle || ''}
                          onChange={(e) => setEditingSlide({ ...editingSlide, subtitle: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-white border border-earth-200 rounded-xl font-medium text-forest-950 focus:outline-none focus:border-forest-800"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block font-bold text-forest-950 uppercase text-[10px] mb-1">
                            Image Caption (Bottom Pill)
                          </label>
                          <input
                            type="text"
                            placeholder="e.g. Vedic Healing Heritage • Sri Krishna Ayurvedic Clinic"
                            value={editingSlide.caption || ''}
                            onChange={(e) => setEditingSlide({ ...editingSlide, caption: e.target.value })}
                            className="w-full px-3.5 py-2.5 bg-white border border-earth-200 rounded-xl font-medium text-forest-950 focus:outline-none focus:border-forest-800"
                          />
                        </div>

                        <div>
                          <label className="block font-bold text-forest-950 uppercase text-[10px] mb-1">
                            Image Alt Text (SEO & Accessibility)
                          </label>
                          <input
                            type="text"
                            placeholder="e.g. Ancient Ayurvedic scriptures and herbs"
                            value={editingSlide.altText || ''}
                            onChange={(e) => setEditingSlide({ ...editingSlide, altText: e.target.value })}
                            className="w-full px-3.5 py-2.5 bg-white border border-earth-200 rounded-xl font-medium text-forest-950 focus:outline-none focus:border-forest-800"
                          />
                        </div>
                      </div>

                      {/* 4. Floating Badges / Cards */}
                      <div className="p-4 bg-cream-50/60 rounded-2xl border border-earth-200 space-y-4">
                        <span className="block font-bold text-forest-950 uppercase text-[10px]">
                          Floating Highlights (Attached Badges)
                        </span>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {/* Card 1 */}
                          <div className="p-3 bg-white rounded-xl border border-earth-200 space-y-2">
                            <span className="font-bold text-[10px] text-forest-900 block">Top-Left Floating Card</span>
                            <input
                              type="text"
                              placeholder="Title (e.g. Ancient Wisdom)"
                              value={editingSlide.card1?.title || ''}
                              onChange={(e) => setEditingSlide({
                                ...editingSlide,
                                card1: { ...(editingSlide.card1 || {}), title: e.target.value }
                              })}
                              className="w-full px-2.5 py-1.5 bg-cream-50/50 border border-earth-200 rounded-lg text-xs"
                            />
                            <input
                              type="text"
                              placeholder="Subtitle (e.g. Charaka Samhita)"
                              value={editingSlide.card1?.subtitle || ''}
                              onChange={(e) => setEditingSlide({
                                ...editingSlide,
                                card1: { ...(editingSlide.card1 || {}), subtitle: e.target.value }
                              })}
                              className="w-full px-2.5 py-1.5 bg-cream-50/50 border border-earth-200 rounded-lg text-[11px]"
                            />
                            <select
                              value={editingSlide.card1?.icon || 'Sparkles'}
                              onChange={(e) => setEditingSlide({
                                ...editingSlide,
                                card1: { ...(editingSlide.card1 || {}), icon: e.target.value }
                              })}
                              className="w-full px-2.5 py-1.5 bg-white border border-earth-200 rounded-lg text-[11px]"
                            >
                              <option value="Sparkles">Sparkles Icon</option>
                              <option value="Leaf">Leaf Icon</option>
                              <option value="Award">Award Icon</option>
                              <option value="ShieldCheck">ShieldCheck Icon</option>
                              <option value="HeartHandshake">HeartHandshake Icon</option>
                              <option value="Star">Star Icon</option>
                            </select>
                          </div>

                          {/* Card 2 */}
                          <div className="p-3 bg-white rounded-xl border border-earth-200 space-y-2">
                            <span className="font-bold text-[10px] text-forest-900 block">Bottom-Right Floating Card</span>
                            <input
                              type="text"
                              placeholder="Title (e.g. Divine Healing)"
                              value={editingSlide.card2?.title || ''}
                              onChange={(e) => setEditingSlide({
                                ...editingSlide,
                                card2: { ...(editingSlide.card2 || {}), title: e.target.value }
                              })}
                              className="w-full px-2.5 py-1.5 bg-cream-50/50 border border-earth-200 rounded-lg text-xs"
                            />
                            <input
                              type="text"
                              placeholder="Subtitle (e.g. Classical Formulations)"
                              value={editingSlide.card2?.subtitle || ''}
                              onChange={(e) => setEditingSlide({
                                ...editingSlide,
                                card2: { ...(editingSlide.card2 || {}), subtitle: e.target.value }
                              })}
                              className="w-full px-2.5 py-1.5 bg-cream-50/50 border border-earth-200 rounded-lg text-[11px]"
                            />
                            <select
                              value={editingSlide.card2?.icon || 'Award'}
                              onChange={(e) => setEditingSlide({
                                ...editingSlide,
                                card2: { ...(editingSlide.card2 || {}), icon: e.target.value }
                              })}
                              className="w-full px-2.5 py-1.5 bg-white border border-earth-200 rounded-lg text-[11px]"
                            >
                              <option value="Award">Award Icon</option>
                              <option value="Leaf">Leaf Icon</option>
                              <option value="Sparkles">Sparkles Icon</option>
                              <option value="ShieldCheck">ShieldCheck Icon</option>
                              <option value="HeartHandshake">HeartHandshake Icon</option>
                              <option value="Star">Star Icon</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      {/* 5. Enable on Website Toggle */}
                      <div className="pt-2 flex items-center justify-between border-t border-earth-100">
                        <span className="text-xs font-semibold text-forest-950">Active on Live Homepage</span>
                        <label className="inline-flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={editingSlide.enabled !== false}
                            onChange={(e) => setEditingSlide({ ...editingSlide, enabled: e.target.checked })}
                            className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500"
                          />
                          <span className="text-xs text-earth-800 font-medium">
                            {editingSlide.enabled !== false ? 'Active (Shown in Slider)' : 'Disabled (Hidden from Slider)'}
                          </span>
                        </label>
                      </div>

                      {/* Modal Action Buttons */}
                      <div className="pt-4 border-t border-earth-200 flex items-center justify-end gap-3">
                        <button
                          type="button"
                          onClick={() => setIsSlideModalOpen(false)}
                          className="px-5 py-2.5 bg-cream-100 hover:bg-earth-200 text-earth-900 text-xs font-semibold rounded-full cursor-pointer"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold uppercase rounded-full shadow-soft flex items-center gap-1.5 cursor-pointer"
                        >
                          <Save className="w-4 h-4" />
                          <span>{editingSlide.id ? 'Save Changes to Draft' : 'Add Slide to Draft'}</span>
                        </button>
                      </div>
                    </form>
                  </motion.div>
                </motion.div>
              )}

              {/* DELETE SLIDE CONFIRMATION MODAL */}
              {deletingSlideId && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-forest-950/70 backdrop-blur-xs"
                >
                  <motion.div
                    initial={{ scale: 0.95, y: 15 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.95, y: 15 }}
                    className="bg-white rounded-3xl border border-earth-200 shadow-elevated w-full max-w-md p-6 space-y-4"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-red-100 text-red-600 flex items-center justify-center shrink-0">
                        <Trash2 className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-serif text-lg font-bold text-forest-950">Delete Hero Slide</h3>
                        <p className="text-xs text-earth-600">Are you sure you want to delete this hero slide?</p>
                      </div>
                    </div>

                    <p className="text-xs text-earth-700 leading-relaxed bg-cream-50 p-3 rounded-xl border border-earth-200">
                      This slide will be removed from your slider draft. To apply changes to the live website, make sure to click <strong>"Update Hero Slider"</strong> afterward.
                    </p>

                    <div className="flex items-center justify-end gap-3 pt-2">
                      <button
                        type="button"
                        onClick={() => setDeletingSlideId(null)}
                        className="px-5 py-2.5 bg-cream-100 hover:bg-earth-200 text-earth-900 text-xs font-semibold rounded-full cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteSlide(deletingSlideId)}
                        className="px-5 py-2.5 bg-red-600 hover:bg-red-500 text-white text-xs font-bold uppercase rounded-full shadow-soft flex items-center gap-1.5 cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                        <span>Confirm Delete</span>
                      </button>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>

      </div>
    </motion.div>
  );
}
