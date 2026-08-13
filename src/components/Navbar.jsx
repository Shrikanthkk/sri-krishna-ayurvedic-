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
    { name: 'TREATMENTS', path: '/treatments', hasDropdown: true },
    { name: 'GALLERY', path: '/gallery' },
    { name: 'TESTIMONIALS', path: '/testimonials' },
    { name: 'CONTACT US', path: '/contact' }
  ];

  const subLinks = [
    { name: 'ALL TREATMENTS', path: '/treatments' },
    { name: 'CANCER CARE', path: '/treatments/cancer-care' },
    { name: 'SWARNAMRUTHA', path: '/treatments/swarnamrutha' }
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
        className={`fixed top-0 left-0 right-0 z-40 h-16 flex items-center transition-all duration-300 ${
          scrolled ? 'glass-nav-scrolled shadow-elevated' : 'glass-nav'
        }`}
      >
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Clinic Brand */}
          <Link
            to="/"
            className="group flex items-center gap-2.5 focus:outline-none shrink-0 cursor-pointer"
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center border transition-colors ${
              scrolled ? 'border-emerald-400/40 bg-forest-800' : 'border-forest-900/20 bg-forest-900 text-cream-50'
            }`}>
              <span className="font-serif text-sm font-bold tracking-wider text-brass-400">SK</span>
            </div>
            <div className="flex flex-col">
              <span className={`font-serif text-base font-medium tracking-tight leading-tight transition-colors ${
                scrolled ? 'text-cream-50' : 'text-forest-950'
              }`}>
                {clinicData.clinicName}
              </span>
              <span className={`text-[9px] tracking-widest uppercase font-semibold transition-colors ${
                scrolled ? 'text-emerald-300/80' : 'text-forest-700'
              }`}>
                KR Puram, Bangalore
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links (with 32px / lg:ml-8 gap separating Brand Logo from HOME button) */}
          <nav className="hidden lg:flex items-center gap-1.5 xl:gap-2.5 lg:ml-8 xl:ml-10">
            {navLinks.map((link) => {
              const active = isPathActive(link);

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
                      className={`group relative inline-flex items-center justify-center h-[42px] px-3.5 transition-all duration-300 ease-out border-0 outline-none select-none -skew-x-12 cursor-pointer ${
                        active || hoveringTreatments
                          ? scrolled
                            ? 'bg-[rgba(16,185,129,0.25)] text-cream-100 font-semibold backdrop-blur-md shadow-[0_4px_15px_rgba(16,185,129,0.25)] scale-[1.01]'
                            : 'bg-[rgba(16,185,129,0.18)] text-forest-950 font-semibold backdrop-blur-md scale-[1.01]'
                          : scrolled
                          ? 'bg-transparent text-cream-100 hover:bg-[rgba(16,185,129,0.26)] hover:backdrop-blur-md hover:shadow-[0_4px_18px_rgba(16,185,129,0.3)] hover:-translate-y-[1px] hover:scale-[1.01]'
                          : 'bg-transparent text-forest-950 hover:bg-[rgba(16,185,129,0.24)] hover:backdrop-blur-md hover:shadow-[0_4px_18px_rgba(16,185,129,0.28)] hover:-translate-y-[1px] hover:scale-[1.01]'
                      }`}
                      style={{ borderRadius: '2px 6px 2px 6px' }}
                    >
                      <span className="skew-x-12 text-[12px] xl:text-[13px] font-medium tracking-[0.05em] uppercase whitespace-nowrap flex items-center gap-1">
                        <span>{link.name}</span>
                        <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${hoveringTreatments ? 'rotate-180' : ''}`} />
                      </span>
                    </Link>

                    {/* Submenu Dropdown Container */}
                    <AnimatePresence>
                      {hoveringTreatments && (
                        <motion.div
                          initial={{ opacity: 0, y: 6, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 6, scale: 0.98 }}
                          transition={{ duration: 0.22, ease: 'easeOut' }}
                          className="absolute top-full left-1/2 -translate-x-1/2 pt-2.5 z-50 pointer-events-auto"
                        >
                          <div
                            className={`flex flex-col gap-2 p-2.5 rounded-2xl shadow-elevated border backdrop-blur-xl ${
                              scrolled
                                ? 'bg-forest-950/95 border-forest-800/80'
                                : 'bg-cream-50/95 border-earth-200'
                            }`}
                          >
                            {subLinks.map((sub) => (
                              <Link
                                key={sub.name}
                                to={sub.path}
                                onClick={() => setHoveringTreatments(false)}
                                className={`inline-flex items-center justify-center h-[42px] px-6 text-[12px] font-medium tracking-[0.05em] uppercase whitespace-nowrap transition-all duration-300 -skew-x-12 border-0 cursor-pointer ${
                                  location.pathname === sub.path
                                    ? 'bg-[rgba(16,185,129,0.35)] text-emerald-300 font-semibold'
                                    : scrolled
                                    ? 'text-cream-100 hover:bg-[rgba(16,185,129,0.26)]'
                                    : 'text-forest-950 hover:bg-[rgba(16,185,129,0.24)]'
                                }`}
                                style={{ borderRadius: '2px 6px 2px 6px' }}
                              >
                                <span className="skew-x-12 font-medium">{sub.name}</span>
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
                  className={`group relative inline-flex items-center justify-center h-[42px] px-3.5 xl:px-4 transition-all duration-300 ease-out border-0 outline-none select-none -skew-x-12 shrink-0 cursor-pointer ${
                    active
                      ? scrolled
                        ? 'bg-[rgba(16,185,129,0.25)] text-cream-100 font-semibold backdrop-blur-md shadow-[0_4px_15px_rgba(16,185,129,0.25)] scale-[1.01]'
                        : 'bg-[rgba(16,185,129,0.18)] text-forest-950 font-semibold backdrop-blur-md scale-[1.01]'
                      : scrolled
                      ? 'bg-transparent text-cream-100 hover:bg-[rgba(16,185,129,0.26)] hover:backdrop-blur-md hover:shadow-[0_4px_18px_rgba(16,185,129,0.3)] hover:-translate-y-[1px] hover:scale-[1.01]'
                      : 'bg-transparent text-forest-950 hover:bg-[rgba(16,185,129,0.24)] hover:backdrop-blur-md hover:shadow-[0_4px_18px_rgba(16,185,129,0.28)] hover:-translate-y-[1px] hover:scale-[1.01]'
                  }`}
                  style={{
                    borderRadius: '2px 6px 2px 6px',
                  }}
                >
                  <span className="skew-x-12 text-[12px] xl:text-[13px] font-medium tracking-[0.05em] uppercase whitespace-nowrap">
                    {link.name}
                  </span>
                </Link>
              );
            })}
          </nav>

          {/* Desktop Right CTA */}
          <div className="hidden lg:flex items-center shrink-0">
            <Link
              to="/book-appointment"
              className={`h-[42px] px-5 text-xs font-semibold tracking-widest uppercase transition-all duration-300 border-0 flex items-center justify-center -skew-x-12 shadow-soft ${
                scrolled
                  ? 'bg-emerald-500 text-forest-950 hover:bg-emerald-400 hover:shadow-[0_6px_20px_rgba(16,185,129,0.4)]'
                  : 'bg-forest-900 text-cream-50 hover:bg-forest-800 hover:shadow-elevated'
              } hover:-translate-y-[1px]`}
              style={{ borderRadius: '2px 6px 2px 6px' }}
            >
              <span className="skew-x-12 flex items-center gap-1.5 whitespace-nowrap">
                <Calendar className="w-3.5 h-3.5 text-brass-400" />
                <span>Book Consultation</span>
              </span>
            </Link>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`lg:hidden h-[38px] px-3 -skew-x-12 backdrop-blur-md transition-colors flex items-center justify-center ${
              scrolled
                ? 'text-cream-100 hover:text-white bg-white/10'
                : 'text-forest-900 hover:text-forest-700 bg-forest-900/5'
            }`}
            style={{ borderRadius: '2px 6px 2px 6px' }}
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
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-forest-800 border border-brass-400/40 flex items-center justify-center text-brass-400 font-serif font-bold text-sm">
                  SK
                </div>
                <span className="font-serif text-lg text-cream-50">{clinicData.clinicName}</span>
              </div>
              <button
                onClick={() => setMobileOpen(false)}
                className="p-2 text-cream-200 hover:text-white rounded-full bg-forest-900"
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
                          className={`grow h-[48px] px-5 -skew-x-12 text-base font-medium tracking-wider uppercase backdrop-blur-md transition-all flex items-center justify-between ${
                            active
                              ? 'bg-[rgba(16,185,129,0.3)] text-cream-100 shadow-[0_4px_18px_rgba(16,185,129,0.3)]'
                              : 'bg-[rgba(16,185,129,0.14)] text-cream-100'
                          }`}
                          style={{ borderRadius: '2px 6px 2px 6px' }}
                        >
                          <span className="skew-x-12">{link.name}</span>
                        </Link>
                        <button
                          onClick={() => setMobileTreatmentsOpen(!mobileTreatmentsOpen)}
                          className="h-[48px] px-4 bg-[rgba(16,185,129,0.14)] text-cream-100 -skew-x-12 flex items-center justify-center"
                          style={{ borderRadius: '2px 6px 2px 6px' }}
                        >
                          <ChevronDown className={`skew-x-12 w-4 h-4 text-emerald-300 transition-transform ${mobileTreatmentsOpen ? 'rotate-180' : ''}`} />
                        </button>
                      </div>

                      <AnimatePresence>
                        {mobileTreatmentsOpen && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="pl-4 space-y-2 overflow-hidden"
                          >
                            {subLinks.map((sub) => (
                              <Link
                                key={sub.name}
                                to={sub.path}
                                onClick={() => setMobileOpen(false)}
                                className="w-full h-[44px] px-4 -skew-x-12 text-sm font-medium tracking-wider uppercase bg-[rgba(16,185,129,0.22)] text-cream-100 flex items-center justify-between"
                                style={{ borderRadius: '2px 6px 2px 6px' }}
                              >
                                <span className="skew-x-12">{sub.name}</span>
                                <span className="skew-x-12 text-xs text-emerald-300">→</span>
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
                      className={`h-[48px] px-5 -skew-x-12 text-base font-medium tracking-wider uppercase backdrop-blur-md transition-all flex items-center justify-between cursor-pointer ${
                        active
                          ? 'bg-[rgba(16,185,129,0.3)] text-cream-100 shadow-[0_4px_18px_rgba(16,185,129,0.3)]'
                          : 'bg-[rgba(16,185,129,0.14)] text-cream-100 hover:bg-[rgba(16,185,129,0.28)]'
                      }`}
                      style={{ borderRadius: '2px 6px 2px 6px' }}
                    >
                      <span className="skew-x-12">{link.name}</span>
                      <span className="skew-x-12 text-sm text-emerald-300">→</span>
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
