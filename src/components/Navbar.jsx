import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Calendar, MapPin, ChevronDown } from 'lucide-react';
import { clinicData } from '../data/clinicData';

export default function Navbar({ onOpenBooking }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hoveringTreatments, setHoveringTreatments] = useState(false);
  const [mobileTreatmentsOpen, setMobileTreatmentsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'HOME', path: '/' },
    { name: 'ABOUT US', path: '/about' },
    { name: 'ALL TREATMENTS', path: '/treatments', hasDropdown: true },
    { name: 'GALLERY', path: '/gallery' },
    { name: 'TESTIMONIALS', path: '/testimonials' },
    { name: 'CONTACT US', path: '/contact' }
  ];

  const subLinks = [
    { name: 'Cancer Treatment', path: '/treatments/cancer-treatment' },
    { name: 'Swarnaprashana', path: '/treatments/swarnaprashana' },
    { name: 'Vitiligo (White Patches)', path: '/treatments/vitiligo' },
    { name: 'Physiotherapy & Rehab', path: '/treatments/physiotherapy' },
    { name: 'Reduce Obesity (Weight Loss)', path: '/treatments/reduce-obesity' },
    { name: 'Joint Pain & Arthritis', path: '/treatments/joint-pain-arthritis' },
    { name: 'Skin Problems', path: '/treatments/skin-problems' },
    { name: 'Alopecia (Hair Fall)', path: '/treatments/hair-fall' },
    { name: 'Sexual Disorders', path: '/treatments/sexual-disorders' },
    { name: 'De-addiction', path: '/treatments/de-addiction' },
    { name: 'Diabetes', path: '/treatments/diabetes' }
  ];

  const isPathActive = (link) => {
    if (link.path === '/') {
      return location.pathname === '/';
    }
    if (link.hasDropdown) {
      return location.pathname.startsWith('/treatments');
    }
    return location.pathname === link.path;
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 h-[70px] sm:h-[76px] flex items-center transition-all duration-300 overflow-visible ${
          scrolled ? 'glass-nav-scrolled shadow-elevated' : 'glass-nav bg-white/95 backdrop-blur-md'
        }`}
      >
        <div className="w-full pl-0 sm:pl-1 pr-2 sm:pr-4 md:pr-6 flex items-center justify-between gap-1.5 sm:gap-2.5 xl:gap-4 overflow-visible relative">
          
          {/* 1. Left: Clinic Brand (Logo Flush Left + 10% Reduced Font Size) */}
          <Link
            to="/"
            className="group flex items-center gap-1.5 sm:gap-2 focus:outline-none shrink-0 cursor-pointer overflow-visible relative z-50 -ml-0.5 sm:ml-0"
          >
            {/* Circular Logo Badge */}
            <div className="relative w-[52px] h-[52px] sm:w-[60px] sm:h-[60px] xl:w-[64px] xl:h-[64px] rounded-full p-1 bg-white border border-brass-400/80 shadow-sm shrink-0 flex items-center justify-center transition-all duration-300 group-hover:scale-105">
              <div className="w-full h-full rounded-full overflow-hidden flex items-center justify-center bg-white">
                <img
                  src="/images/logo.png"
                  alt="Sri Krishna Ayurvedic Logo"
                  className="w-full h-full object-cover object-center"
                />
              </div>
            </div>

            <div className="flex flex-col justify-center pl-0.5 sm:pl-1">
              <span className={`font-serif text-[11px] sm:text-[13px] md:text-[14px] xl:text-[16px] font-semibold tracking-tight leading-tight whitespace-nowrap transition-colors ${
                scrolled ? 'text-cream-50' : 'text-forest-950'
              }`}>
                {clinicData.clinicName}
              </span>
              <span className={`text-[7px] sm:text-[8px] xl:text-[9px] tracking-[0.12em] uppercase font-medium whitespace-nowrap transition-colors ${
                scrolled ? 'text-emerald-300' : 'text-forest-800'
              }`}>
                KR PURAM, BANGALORE
              </span>
            </div>
          </Link>

          {/* 2. Middle: Desktop Navigation Links (Sleek Typography: 5% Reduced Size & Thickness) */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2.5 2xl:gap-4 shrink-0">
            {navLinks.map((link) => {
              const active = isPathActive(link);
              const linkTextColor = active
                ? 'text-forest-950'
                : scrolled
                ? 'text-white'
                : 'text-[#111111]';

              if (link.hasDropdown) {
                return (
                  <div
                    key={link.name}
                    className="relative shrink-0 py-1"
                    onMouseEnter={() => setHoveringTreatments(true)}
                    onMouseLeave={() => setHoveringTreatments(false)}
                  >
                    <Link
                      to={link.path}
                      className={`group relative inline-flex items-center justify-center h-[34px] xl:h-[38px] px-2 xl:px-3 transition-colors duration-200 border-0 outline-none select-none -skew-x-12 cursor-pointer ${
                        active
                          ? 'bg-[#d2f4e3] text-forest-950 font-semibold shadow-xs'
                          : 'bg-transparent font-semibold hover:bg-transparent'
                      }`}
                      style={{ borderRadius: '4px' }}
                    >
                      <span className="skew-x-12 text-[9.5px] xl:text-[11px] 2xl:text-[12px] font-semibold tracking-wide uppercase whitespace-nowrap flex items-center gap-1">
                        <span className={linkTextColor}>{link.name}</span>
                        <ChevronDown className={`w-3 h-3 xl:w-3.5 xl:h-3.5 transition-transform duration-200 ${linkTextColor} ${hoveringTreatments ? 'rotate-180' : ''}`} />
                      </span>
                    </Link>

                    {/* Submenu Dropdown Container with Frosted Blurred White Background */}
                    <AnimatePresence>
                      {hoveringTreatments && (
                        <motion.div
                          initial={{ opacity: 0, y: 6, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 6, scale: 0.98 }}
                          transition={{ duration: 0.2, ease: 'easeOut' }}
                          className="absolute top-full left-1/2 -translate-x-1/2 pt-2.5 z-50 pointer-events-auto min-w-[270px]"
                        >
                          <div className="flex flex-col gap-1 p-3 rounded-2xl shadow-2xl border border-earth-200/90 bg-white/98 backdrop-blur-2xl">
                            <Link
                              to="/treatments"
                              onClick={() => setHoveringTreatments(false)}
                              className="px-3.5 py-2 text-[11.5px] font-bold tracking-wider uppercase rounded-xl transition-all border-b border-earth-200/80 mb-1 text-emerald-800 hover:text-emerald-950 hover:bg-emerald-50/80 flex items-center justify-between"
                            >
                              <span>View All Treatments</span>
                              <span>→</span>
                            </Link>

                            {subLinks.map((sub) => (
                              <Link
                                key={sub.name}
                                to={sub.path}
                                onClick={() => setHoveringTreatments(false)}
                                className={`px-3.5 py-2 text-[12px] font-medium tracking-[0.02em] rounded-xl transition-all ${
                                  location.pathname === sub.path
                                    ? 'bg-emerald-100/90 text-forest-950 font-semibold'
                                    : 'text-forest-950 hover:bg-emerald-50/70 hover:text-forest-900'
                                }`}
                              >
                                <span>{sub.name}</span>
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`group relative inline-flex items-center justify-center h-[34px] xl:h-[38px] px-2 xl:px-3 transition-colors duration-200 border-0 outline-none select-none -skew-x-12 shrink-0 cursor-pointer ${
                    active
                      ? 'bg-[#d2f4e3] text-forest-950 font-semibold shadow-xs'
                      : 'bg-transparent font-semibold hover:bg-transparent'
                  }`}
                  style={{
                    borderRadius: '4px',
                  }}
                >
                  <span className={`skew-x-12 text-[9.5px] xl:text-[11px] 2xl:text-[12px] font-semibold tracking-wide uppercase whitespace-nowrap ${linkTextColor}`}>
                    {link.name}
                  </span>
                </Link>
              );
            })}
          </nav>

          {/* 3. Right: Book Consultation Button (Guaranteed Visible on All Screens) */}
          <div className="hidden lg:flex items-center shrink-0">
            <Link
              to="/book-appointment"
              className="h-[36px] xl:h-[40px] px-3 sm:px-3.5 xl:px-4 bg-[#12281e] text-white hover:bg-[#1a382a] text-[9.5px] sm:text-[10.5px] xl:text-[11.5px] font-semibold tracking-wider uppercase transition-all duration-300 border-0 flex items-center justify-center -skew-x-12 shrink-0 shadow-md hover:-translate-y-[1px]"
              style={{ borderRadius: '4px' }}
            >
              <span className="skew-x-12 flex items-center gap-1.5 whitespace-nowrap">
                <Calendar className="w-3.5 h-3.5 text-brass-400 shrink-0" />
                <span>BOOK APPOINTMENT</span>
              </span>
            </Link>
          </div>

          {/* 4. Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`lg:hidden h-[36px] px-2.5 -skew-x-12 backdrop-blur-md transition-colors flex items-center justify-center shrink-0 rounded-md mr-1 ${
              scrolled ? 'text-white bg-white/10' : 'text-[#111111] bg-black/5'
            }`}
            aria-label="Toggle navigation menu"
          >
            <span className="skew-x-12 block">
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </span>
          </button>
        </div>
      </header>

      {/* Mobile Off-Canvas Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 lg:hidden bg-forest-950/95 backdrop-blur-2xl flex flex-col justify-between p-6 overflow-y-auto"
          >
            {/* Header in Drawer */}
            <div className="flex items-center justify-between border-b border-forest-800 pb-4">
              <Link
                to="/"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3"
              >
                <div className="w-11 h-11 rounded-full p-0.5 bg-white border border-brass-400/60 shadow-md shrink-0 flex items-center justify-center">
                  <div className="w-full h-full rounded-full overflow-hidden">
                    <img
                      src="/images/logo.png"
                      alt="Sri Krishna Ayurvedic Logo"
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                </div>
                <span className="font-serif text-lg text-cream-50">{clinicData.clinicName}</span>
              </Link>
              <button
                onClick={() => setMobileOpen(false)}
                className="p-2 text-cream-200 hover:text-white rounded-full bg-forest-900 cursor-pointer"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Links List */}
            <div className="py-6 flex flex-col space-y-3">
              {navLinks.map((link, idx) => {
                const active = isPathActive(link);

                if (link.hasDropdown) {
                  return (
                    <div key={link.name} className="space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <Link
                          to={link.path}
                          onClick={() => setMobileOpen(false)}
                          className={`grow h-[48px] px-5 -skew-x-12 text-base font-medium tracking-wider uppercase backdrop-blur-md transition-colors flex items-center justify-between ${
                            active
                              ? 'bg-[rgba(16,185,129,0.3)] text-white shadow-[0_4px_18px_rgba(16,185,129,0.3)]'
                              : 'bg-[rgba(16,185,129,0.14)] text-white'
                          }`}
                          style={{ borderRadius: '2px 6px 2px 6px' }}
                        >
                          <span className="skew-x-12 text-white">{link.name}</span>
                        </Link>
                        <button
                          onClick={() => setMobileTreatmentsOpen(!mobileTreatmentsOpen)}
                          className="h-[48px] px-4 bg-[rgba(16,185,129,0.14)] text-white -skew-x-12 flex items-center justify-center cursor-pointer"
                          style={{ borderRadius: '2px 6px 2px 6px' }}
                        >
                          <ChevronDown className={`skew-x-12 w-4 h-4 text-white transition-transform ${mobileTreatmentsOpen ? 'rotate-180' : ''}`} />
                        </button>
                      </div>

                      <AnimatePresence>
                        {mobileTreatmentsOpen && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="pl-3 space-y-1.5 overflow-hidden"
                          >
                            <Link
                              to="/treatments"
                              onClick={() => setMobileOpen(false)}
                              className="w-full h-[40px] px-4 -skew-x-12 text-xs font-bold tracking-wider uppercase bg-[rgba(16,185,129,0.3)] text-white flex items-center justify-between"
                              style={{ borderRadius: '2px 6px 2px 6px' }}
                            >
                              <span className="skew-x-12 text-white">All Treatments Directory</span>
                              <span className="skew-x-12 text-white">→</span>
                            </Link>

                            {subLinks.map((sub) => (
                              <Link
                                key={sub.name}
                                to={sub.path}
                                onClick={() => setMobileOpen(false)}
                                className="w-full h-[40px] px-4 -skew-x-12 text-xs font-medium tracking-wider uppercase bg-[rgba(16,185,129,0.18)] text-white flex items-center justify-between"
                                style={{ borderRadius: '2px 6px 2px 6px' }}
                              >
                                <span className="skew-x-12 text-white">{sub.name}</span>
                                <span className="skew-x-12 text-xs text-white">→</span>
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }

                return (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    key={link.name}
                  >
                    <Link
                      to={link.path}
                      onClick={() => setMobileOpen(false)}
                      className={`h-[48px] px-5 -skew-x-12 text-base font-medium tracking-wider uppercase backdrop-blur-md transition-colors flex items-center justify-between cursor-pointer ${
                        active
                          ? 'bg-[rgba(16,185,129,0.3)] text-white shadow-[0_4px_18px_rgba(16,185,129,0.3)]'
                          : 'bg-[rgba(16,185,129,0.14)] text-white'
                      }`}
                      style={{ borderRadius: '2px 6px 2px 6px' }}
                    >
                      <span className="skew-x-12 text-white">{link.name}</span>
                      <span className="skew-x-12 text-sm text-white">→</span>
                    </Link>
                  </motion.div>
                );
              })}
            </div>

            {/* Mobile Bottom Info & Action */}
            <div className="pt-4 border-t border-forest-800 space-y-3">
              <Link
                to="/book-appointment"
                onClick={() => setMobileOpen(false)}
                className="w-full h-[48px] -skew-x-12 bg-emerald-500 text-forest-950 font-semibold text-xs tracking-widest uppercase shadow-soft flex items-center justify-center gap-2"
                style={{ borderRadius: '2px 6px 2px 6px' }}
              >
                <span className="skew-x-12 flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>Book Consultation (₹50)</span>
                </span>
              </Link>

              <div className="text-xs text-cream-200/70 space-y-1 text-center">
                <p className="flex items-center justify-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>T.C. Palya Main Road, KR Puram, Bangalore</span>
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
