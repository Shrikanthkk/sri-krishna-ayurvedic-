import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, Zap, Stethoscope, ChevronDown, X, Sparkles, Navigation, Building2 } from 'lucide-react';
import { clinicData } from '../data/clinicData';

export default function SearchSection({ onOpenBooking }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [locationQuery, setLocationQuery] = useState('Main Clinic (3rd Main, KR Puram)');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [locationDropdownOpen, setLocationDropdownOpen] = useState(false);
  const searchRef = useRef(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setDropdownOpen(false);
        setLocationDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const popularSearches = [
    { title: "Hysterectomy", sectionId: "treatments" },
    { title: "Normal Delivery", sectionId: "treatments" },
    { title: "Nadi Pariksha", sectionId: "treatments" }
  ];

  const commonSpecialities = [
    { title: "Dentist", type: "SPECIALITY", sectionId: "treatments" },
    { title: "Gynecologist/obstetrician", type: "SPECIALITY", sectionId: "treatments" },
    { title: "General Physician", type: "SPECIALITY", sectionId: "doctor" },
    { title: "Dermatologist", type: "SPECIALITY", sectionId: "treatments" },
    { title: "Ear-nose-throat (ent) Specialist", type: "SPECIALITY", sectionId: "treatments" },
    { title: "Homeopath", type: "SPECIALITY", sectionId: "treatments" },
    { title: "Ayurvedic Physician (Dr. Anand Krishna, BAMS)", type: "SPECIALITY", sectionId: "doctor" }
  ];

  // ONLY 2 OFFICIAL CLINIC LOCATIONS AS REQUESTED BY USER
  const officialLocations = [
    {
      id: "main",
      tag: "MAIN ADDRESS",
      name: "Sri Krishna Ayurvedic Clinic (Main Address)",
      address: clinicData.contact.mainAddress.fullText,
      displayShort: "Main Clinic (3rd Main, KR Puram)"
    },
    {
      id: "branch",
      tag: "BRANCH ADDRESS",
      name: "Sri Krishna Ayurvedic Clinic (Branch Address)",
      address: clinicData.contact.branchAddress.fullText,
      displayShort: "Branch Clinic (T.C. Palya Main Rd)"
    }
  ];

  const filteredSpecialities = commonSpecialities.filter(s =>
    s.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectSearch = (item) => {
    setSearchQuery(item.title);
    setDropdownOpen(false);

    if (item.sectionId) {
      const targetEl = document.getElementById(item.sectionId);
      if (targetEl) {
        const offset = 120;
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
    <div className="w-full bg-cream-100/80 border-b border-earth-200 pt-20 pb-3 relative z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={searchRef}>
        
        {/* Full-width Search & Location Container */}
        <div className="relative">
          
          <div className="flex flex-col md:flex-row items-stretch bg-white/95 backdrop-blur-md rounded-2xl md:rounded-full border border-earth-200 shadow-elevated p-2 md:p-1.5 transition-all duration-300 focus-within:border-forest-800 focus-within:ring-2 focus-within:ring-forest-800/10">
            
            {/* Left Location Field (Strictly limited to the 2 official clinic locations) */}
            <div className="relative shrink-0 md:w-80 border-b md:border-b-0 md:border-r border-earth-200/80 pb-2 md:pb-0">
              <button
                onClick={() => setLocationDropdownOpen(!locationDropdownOpen)}
                className="w-full h-full flex items-center justify-between px-4 py-2 text-left cursor-pointer focus:outline-none"
              >
                <div className="flex items-center gap-2 text-forest-950 font-medium text-xs truncate">
                  <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="truncate">{locationQuery}</span>
                </div>
                <ChevronDown className={`w-3.5 h-3.5 text-forest-700 shrink-0 transition-transform ${locationDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Clinic Official Locations Dropdown */}
              <AnimatePresence>
                {locationDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    className="absolute top-full left-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-elevated border border-earth-200 overflow-hidden z-50 text-xs p-2 space-y-2"
                  >
                    <span className="px-3 pt-1 text-[10px] font-semibold uppercase text-brass-600 tracking-widest block">
                      Sri Krishna Ayurvedic Clinic Locations (KR Puram)
                    </span>

                    {officialLocations.map((loc) => (
                      <button
                        key={loc.id}
                        onClick={() => {
                          setLocationQuery(loc.displayShort);
                          setLocationDropdownOpen(false);

                          const targetEl = document.getElementById('location');
                          if (targetEl) {
                            targetEl.scrollIntoView({ behavior: 'smooth' });
                          }
                        }}
                        className={`w-full p-3 rounded-xl hover:bg-cream-100 transition-colors flex items-start gap-3 text-left border ${
                          locationQuery === loc.displayShort
                            ? 'bg-emerald-50/80 border-emerald-300 text-forest-950 font-medium'
                            : 'border-earth-200 text-forest-950'
                        }`}
                      >
                        <div className="w-7 h-7 rounded-full bg-forest-900 text-brass-400 flex items-center justify-center shrink-0 mt-0.5">
                          <Building2 className="w-3.5 h-3.5" />
                        </div>
                        <div className="flex flex-col min-w-0">
                          <span className="text-[10px] font-bold text-brass-600 uppercase tracking-widest">
                            {loc.tag}
                          </span>
                          <span className="font-semibold text-xs text-forest-950 leading-snug">
                            {loc.name}
                          </span>
                          <span className="text-[11px] text-earth-800 leading-normal mt-0.5 font-normal">
                            {loc.address}
                          </span>
                        </div>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Right Main Search Field */}
            <div className="flex items-center gap-3 px-4 py-2 md:py-0 grow relative">
              <Search className="w-4.5 h-4.5 text-forest-700 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onFocus={() => setDropdownOpen(true)}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setDropdownOpen(true);
                }}
                placeholder="Search doctors, clinics, hospitals, etc."
                className="w-full bg-transparent text-xs sm:text-sm text-forest-950 font-medium focus:outline-none placeholder:text-gray-400 py-1"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="p-1 text-gray-400 hover:text-forest-900 rounded-full"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

          </div>

          {/* Large Practo-Inspired Suggestion Dropdown */}
          <AnimatePresence>
            {dropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.99 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.99 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                className="absolute top-full left-0 right-0 mt-2 bg-white/98 backdrop-blur-xl rounded-2xl border border-earth-200 shadow-elevated overflow-hidden z-50 text-left text-xs max-h-[420px] overflow-y-auto"
              >
                {/* Popular Searches Section */}
                <div className="p-4 border-b border-earth-200/80 bg-cream-50/60">
                  <span className="text-[11px] font-semibold text-brass-600 uppercase tracking-widest block mb-3">
                    Popular Searches
                  </span>
                  <div className="flex flex-wrap gap-2.5">
                    {popularSearches.map((item) => (
                      <button
                        key={item.title}
                        onClick={() => handleSelectSearch(item)}
                        className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-white border border-earth-200 hover:bg-forest-900 hover:text-white transition-all text-forest-950 font-medium text-xs shadow-sm hover:scale-[1.02]"
                      >
                        <Zap className="w-3.5 h-3.5 text-emerald-500 fill-emerald-500" />
                        <span>{item.title}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Common Specialities Section */}
                <div className="p-3 space-y-1">
                  <span className="px-3 pt-2 text-[11px] font-semibold text-forest-800 uppercase tracking-widest block">
                    Common Specialities
                  </span>
                  {filteredSpecialities.length > 0 ? (
                    filteredSpecialities.map((item) => (
                      <button
                        key={item.title}
                        onClick={() => handleSelectSearch(item)}
                        className="w-full px-3.5 py-3 rounded-xl hover:bg-cream-100 flex items-center justify-between transition-colors text-left group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-forest-50 border border-forest-100 text-forest-800 flex items-center justify-center group-hover:bg-forest-900 group-hover:text-brass-400 transition-colors shrink-0">
                            <Search className="w-4 h-4" />
                          </div>
                          <span className="font-medium text-forest-950 text-xs sm:text-sm group-hover:text-forest-800">
                            {item.title}
                          </span>
                        </div>
                        <span className="text-[10px] font-semibold uppercase text-gray-400 tracking-wider group-hover:text-emerald-600">
                          {item.type}
                        </span>
                      </button>
                    ))
                  ) : (
                    <div className="p-4 text-center text-gray-500 italic">
                      No matching specialities found for "{searchQuery}"
                    </div>
                  )}
                </div>

                {/* Bottom CTA Bar */}
                <div className="p-3 bg-forest-950 text-cream-50 flex items-center justify-between text-xs">
                  <span className="flex items-center gap-2 text-cream-200">
                    <Sparkles className="w-3.5 h-3.5 text-brass-400" />
                    <span>Sri Krishna Ayurvedic Clinic • KR Puram</span>
                  </span>
                  <button
                    onClick={() => {
                      setDropdownOpen(false);
                      onOpenBooking(searchQuery || 'General Consultation');
                    }}
                    className="px-4 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-forest-950 font-semibold rounded-full uppercase text-[10px] tracking-wider transition-colors"
                  >
                    Book Consultation
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>

      </div>
    </div>
  );
}
