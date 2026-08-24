import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, Zap, Stethoscope, ChevronDown, X, Sparkles } from 'lucide-react';
import { clinicData } from '../data/clinicData';

export default function SearchBar({ onOpenBooking }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [locationQuery, setLocationQuery] = useState('KR Puram, Bangalore');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const searchRef = useRef(null);
  const navigate = useNavigate();

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const popularSearches = [
    { title: "Vitiligo & White Patches", path: "/treatments/vitiligo" },
    { title: "Physiotherapy & Rehabilitation", path: "/treatments/physiotherapy" },
    { title: "Reduce Obesity (Weight Loss)", path: "/treatments/reduce-obesity" },
    { title: "Nadi Pariksha", sectionId: "treatments" },
    { title: "Panchakarma Detox", sectionId: "treatments" },
    { title: "Swarnaprashana (Suvarnaprashana)", path: "/treatments/swarnaprashana" },
    { title: "Integrative Cancer Care", path: "/treatments/cancer-care" }
  ];

  const commonSpecialities = [
    { title: "Ayurvedic Physician (Dr. Anand Krishna, BAMS)", type: "SPECIALITY", sectionId: "doctor" },
    { title: "Vitiligo & White Patches Specialist (Shvitra)", type: "SPECIALITY", path: "/treatments/vitiligo" },
    { title: "Bakuchi Herbal Skin Therapy", type: "SPECIALITY", path: "/treatments/vitiligo" },
    { title: "Physiotherapy & Rehabilitation Care (Dr. Sunithi)", type: "SPECIALITY", path: "/treatments/physiotherapy" },
    { title: "Kati Basti & Spinal Decompression", type: "SPECIALITY", path: "/treatments/physiotherapy" },
    { title: "Reduce Obesity & Sthoulya Specialist", type: "SPECIALITY", path: "/treatments/reduce-obesity" },
    { title: "Udwarthanam Weight Loss Massage", type: "SPECIALITY", path: "/treatments/reduce-obesity" },
    { title: "Nadi Pariksha Specialist", type: "SPECIALITY", sectionId: "treatments" },
    { title: "Panchakarma Detox Therapist", type: "SPECIALITY", sectionId: "treatments" },
    { title: "Spine & Joint Care Specialist", type: "SPECIALITY", sectionId: "treatments" },
    { title: "Digestive & IBS Specialist", type: "SPECIALITY", sectionId: "treatments" },
    { title: "Pediatric Swarnaprashana (Suvarnaprashana)", type: "SPECIALITY", path: "/treatments/swarnaprashana" },
    { title: "Swarna Prashana Gold Drops", type: "SPECIALITY", path: "/treatments/swarnaprashana" },
    { title: "Stress & Shirodhara Therapist", type: "SPECIALITY", sectionId: "treatments" }
  ];

  const filteredSpecialities = commonSpecialities.filter(s =>
    s.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectSearch = (item) => {
    setSearchQuery(item.title);
    setDropdownOpen(false);

    if (item.path) {
      navigate(item.path);
      return;
    }

    if (item.sectionId) {
      const targetEl = document.getElementById(item.sectionId);
      if (targetEl) {
        const offset = 85;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = targetEl.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
  };

  return (
    <div className="w-full max-w-xl relative text-left" ref={searchRef}>
      
      {/* Search Input Bar Container */}
      <div className="flex flex-col sm:flex-row items-stretch bg-white/90 backdrop-blur-md rounded-2xl sm:rounded-full border border-earth-200 shadow-elevated p-1.5 transition-all duration-300 focus-within:border-forest-800 focus-within:ring-2 focus-within:ring-forest-800/10">
        
        {/* Left Location Picker */}
        <div className="flex items-center gap-2 px-3.5 py-2 sm:py-0 sm:border-r border-earth-200/80 shrink-0 text-xs font-medium text-forest-950">
          <MapPin className="w-4 h-4 text-brass-600 shrink-0" />
          <input
            type="text"
            value={locationQuery}
            onChange={(e) => setLocationQuery(e.target.value)}
            className="w-36 bg-transparent text-xs text-forest-950 font-medium focus:outline-none placeholder:text-gray-400"
            placeholder="Location..."
          />
        </div>

        {/* Right Search Input */}
        <div className="flex items-center gap-2 px-3.5 py-2 sm:py-0 grow relative">
          <Search className="w-4 h-4 text-forest-700 shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onFocus={() => setDropdownOpen(true)}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setDropdownOpen(true);
            }}
            placeholder="Search doctors, treatments, clinics, specialities..."
            className="w-full bg-transparent text-xs text-forest-950 font-medium focus:outline-none placeholder:text-gray-400 py-1"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="p-1 text-gray-400 hover:text-forest-900 rounded-full"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

      </div>

      {/* Practo-Inspired Rich Dropdown Results */}
      <AnimatePresence>
        {dropdownOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="absolute top-full left-0 right-0 mt-2 bg-white/95 backdrop-blur-xl rounded-2xl border border-earth-200 shadow-elevated overflow-hidden z-50 text-left text-xs max-h-[380px] overflow-y-auto"
          >
            {/* Section 1: Popular Searches */}
            <div className="p-4 border-b border-earth-200/80 bg-cream-50/50">
              <span className="text-[10px] uppercase font-semibold text-brass-600 tracking-widest block mb-2.5">
                Popular Searches
              </span>
              <div className="flex flex-wrap gap-2">
                {popularSearches.map((item) => (
                  <button
                    key={item.title}
                    onClick={() => handleSelectSearch(item)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-earth-200 hover:bg-forest-900 hover:text-white transition-colors text-forest-950 font-medium text-xs shadow-sm"
                  >
                    <Zap className="w-3 h-3 text-brass-500" />
                    <span>{item.title}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Section 2: Common Specialities */}
            <div className="p-2 space-y-1">
              <span className="px-3 pt-2 text-[10px] uppercase font-semibold text-earth-600 tracking-widest block">
                Common Specialities & Doctors
              </span>
              {filteredSpecialities.map((item) => (
                <button
                  key={item.title}
                  onClick={() => handleSelectSearch(item)}
                  className="w-full px-3 py-2.5 rounded-xl hover:bg-cream-100 flex items-center justify-between transition-colors text-left group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-full bg-forest-50 border border-forest-100 text-forest-800 flex items-center justify-center group-hover:bg-forest-900 group-hover:text-brass-400 transition-colors">
                      <Stethoscope className="w-3.5 h-3.5" />
                    </div>
                    <span className="font-medium text-forest-950 text-xs group-hover:text-forest-800">
                      {item.title}
                    </span>
                  </div>
                  <span className="text-[9px] uppercase font-semibold text-brass-600 tracking-wider">
                    {item.type}
                  </span>
                </button>
              ))}
            </div>

            {/* Footer prompt */}
            <div className="p-3 bg-forest-900 text-cream-50 flex items-center justify-between text-[11px]">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-brass-400" />
                <span>Sri Krishna Ayurvedic Clinic • KR Puram</span>
              </span>
              <button
                onClick={() => {
                  setDropdownOpen(false);
                  onOpenBooking(searchQuery || 'General Consultation');
                }}
                className="px-3 py-1 bg-brass-500 hover:bg-brass-400 text-forest-950 font-semibold rounded-full uppercase text-[10px] tracking-wider transition-colors"
              >
                Book Search
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
