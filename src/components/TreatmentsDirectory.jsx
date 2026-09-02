import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Stethoscope, Sparkles, Filter, ChevronRight, Award, UserCheck, MessageSquare, Image as ImageIcon, BookOpen } from 'lucide-react';
import { clinicData } from '../data/clinicData';

export default function TreatmentsDirectory({ onOpenBooking }) {
  const [activeTab, setActiveTab] = useState('treatments'); // 'overview' | 'treatments' | 'doctors' | 'stories' | 'photos'
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Complete Catalog of Ayurvedic Treatments & Speciality Procedures (Practo Inspired Directory)
  const directoryItems = [
    { id: 1, name: "Nadi Pariksha (Pulse Diagnosis)", category: "Ayurveda", desc: "Classical 3-finger pulse assessment for body constitution & Dosha imbalance.", popular: true },
    { id: 3, name: "Shirodhara (Nervous Relaxation)", category: "Ayurveda", desc: "Continuous warm herbal oil pour over forehead marma points.", popular: true },
    { id: 4, name: "Kati Vasti (Lumbar & Spine Care)", category: "Pain Care", desc: "Warm herbal oil reservoir treatment for lower back ache & sciatica.", popular: true },
    { id: 5, name: "Janu Vasti (Knee Joint Therapy)", category: "Pain Care", desc: "Localized knee reservoir therapy for osteoarthritis & joint stiffness.", popular: true },
    { id: 6, name: "Abhyanga (Herbal Body Therapy)", category: "Wellness", desc: "Traditional synchronized full-body massage with medicated oils." },
    { id: 7, name: "Griva Vasti (Neck & Cervical Care)", category: "Pain Care", desc: "Targeted therapy for cervical spondylosis & neck strain." },
    { id: 8, name: "Podikizhi (Herbal Poultice Massage)", category: "Pain Care", desc: "Warm herbal powder bolus application for inflammation & swelling." },
    { id: 9, name: "Nasya Karma (Nasal Detox Therapy)", category: "Ayurveda", desc: "Medicated oil drops administration for sinus, migraine & upper respiratory care." },
    { id: 10, name: "Udwarthanam (Herbal Scrub Therapy)", category: "Wellness", desc: "Dry herbal powder body scrub for metabolic stimulation & weight management." },
    { id: 11, name: "Netra Tarpana (Eye Rejuvenation)", category: "Wellness", desc: "Medicated ghee bath for dry eyes, strain & vision clarity." },
    { id: 12, name: "Digestive & IBS Management", category: "Internal Care", desc: "Herbal protocols for chronic acidity, IBS, constipation & sluggish Agni.", popular: true },
    { id: 13, name: "Rheumatoid Arthritis Care", category: "Pain Care", desc: "Natural anti-inflammatory herbs and joint oil bastis for swelling." },
    { id: 14, name: "Skin & Eczema Therapy", category: "Internal Care", desc: "Blood purifying herbal therapies for psoriasis, eczema & allergic dermatitis." },
    { id: 15, name: "Ayurvedic Hair & Scalp Care", category: "Wellness", desc: "Shiroabhyanga and herbal oils for hair fall & scalp nourishment." },
    { id: 16, name: "Stress & Insomnia Protocol", category: "Wellness", desc: "Herbal nervine tonics & Shirodhara for anxiety and deep sleep restoration." },
    { id: 17, name: "Rasayana Rejuvenation Care", category: "Wellness", desc: "Anti-aging cellular nourishment and immune boosting therapies." },
    { id: 18, name: "Metabolic & Diabetes Care", category: "Internal Care", desc: "Herbomineral formulations for sugar management and metabolic strength." },
    { id: 19, name: "Swarnaprashana (Pediatric Gold Drops)", category: "Ayurveda", desc: "Classical Kashyapa Samhita pediatric gold electuary for cognitive and vitality support.", popular: true }
  ];

  const categories = ["All", "Ayurveda", "Pain Care", "Wellness", "Internal Care"];

  const filteredItems = directoryItems.filter((item) => {
    const matchesCategory = categoryFilter === "All" || item.category === categoryFilter;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="directory" className="py-24 bg-cream-50 relative overflow-hidden border-t border-earth-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <span className="text-xs uppercase tracking-ultra font-semibold text-brass-600 block">
            10 • Complete Clinical Directory
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-light text-forest-950 leading-tight">
            Surgeries, Therapies & Directory
          </h2>
          <p className="text-earth-800 text-base sm:text-lg font-light leading-relaxed">
            Browse our comprehensive listing of 134+ classical Ayurvedic procedures, consultations, and specialized care programs available at KR Puram.
          </p>
        </div>

        {/* Practo-Inspired Top Navigation Bar Tabs */}
        <div className="flex items-center justify-center border-b border-earth-200 overflow-x-auto mb-10 pb-px scrollbar-none">
          <div className="flex gap-2 sm:gap-6 min-w-max">
            
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-5 py-3 text-xs sm:text-sm font-medium uppercase tracking-wider transition-all relative ${
                activeTab === 'overview'
                  ? 'text-forest-950 font-semibold'
                  : 'text-earth-600 hover:text-forest-800'
              }`}
            >
              <span>Overview</span>
              {activeTab === 'overview' && (
                <motion.div layoutId="tabLine" className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-brass-500" />
              )}
            </button>

            <button
              onClick={() => setActiveTab('treatments')}
              className={`px-5 py-3 text-xs sm:text-sm font-medium uppercase tracking-wider transition-all relative ${
                activeTab === 'treatments'
                  ? 'text-forest-950 font-semibold'
                  : 'text-earth-600 hover:text-forest-800'
              }`}
            >
              <span>Surgeries & Treatments (134)</span>
              {activeTab === 'treatments' && (
                <motion.div layoutId="tabLine" className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-brass-500" />
              )}
            </button>

            <button
              onClick={() => setActiveTab('doctors')}
              className={`px-5 py-3 text-xs sm:text-sm font-medium uppercase tracking-wider transition-all relative ${
                activeTab === 'doctors'
                  ? 'text-forest-950 font-semibold'
                  : 'text-earth-600 hover:text-forest-800'
              }`}
            >
              <span>Doctors (1)</span>
              {activeTab === 'doctors' && (
                <motion.div layoutId="tabLine" className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-brass-500" />
              )}
            </button>

            <button
              onClick={() => setActiveTab('stories')}
              className={`px-5 py-3 text-xs sm:text-sm font-medium uppercase tracking-wider transition-all relative ${
                activeTab === 'stories'
                  ? 'text-forest-950 font-semibold'
                  : 'text-earth-600 hover:text-forest-800'
              }`}
            >
              <span>Patient Stories (2)</span>
              {activeTab === 'stories' && (
                <motion.div layoutId="tabLine" className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-brass-500" />
              )}
            </button>

            <button
              onClick={() => setActiveTab('photos')}
              className={`px-5 py-3 text-xs sm:text-sm font-medium uppercase tracking-wider transition-all relative ${
                activeTab === 'photos'
                  ? 'text-forest-950 font-semibold'
                  : 'text-earth-600 hover:text-forest-800'
              }`}
            >
              <span>Photos & Videos (3)</span>
              {activeTab === 'photos' && (
                <motion.div layoutId="tabLine" className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-brass-500" />
              )}
            </button>

          </div>
        </div>

        {/* Tab Contents */}
        <AnimatePresence mode="wait">
          
          {/* TAB 1: Treatments (134) */}
          {activeTab === 'treatments' && (
            <motion.div
              key="treatments-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-8"
            >
              {/* Category Filters & Search Input Bar */}
              <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-cream-100/80 p-4 rounded-2xl border border-earth-200">
                {/* Category Pills */}
                <div className="flex items-center gap-2 flex-wrap">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setCategoryFilter(cat)}
                      className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all ${
                        categoryFilter === cat
                          ? 'bg-forest-900 text-cream-50 shadow-soft'
                          : 'bg-white text-forest-900 border border-earth-200 hover:bg-earth-100'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                {/* Search Field */}
                <div className="relative min-w-[260px]">
                  <Search className="absolute left-3.5 top-3 w-4 h-4 text-forest-700/60" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search 134 treatments..."
                    className="w-full pl-10 pr-4 py-2 bg-white border border-earth-200 rounded-full text-xs focus:outline-none focus:border-forest-800 text-forest-950 placeholder:text-gray-400"
                  />
                </div>
              </div>

              {/* Subheading Count */}
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-serif text-forest-950 font-medium">
                  {filteredItems.length} Treatments & Procedures Available
                </h3>
                <span className="text-xs text-brass-600 font-semibold uppercase tracking-wider">
                  Doctor: Dr. Anand Krishna (BAMS)
                </span>
              </div>

              {/* Treatment Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredItems.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white p-6 rounded-2xl border border-earth-200 hover:border-brass-500/50 hover:shadow-elevated transition-all duration-300 flex flex-col justify-between group"
                  >
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-forest-50 text-forest-800 flex items-center justify-center shrink-0 border border-forest-100 group-hover:bg-forest-900 group-hover:text-brass-400 transition-colors">
                          <Stethoscope className="w-5 h-5" />
                        </div>
                        <div>
                          <span className="text-[10px] uppercase font-semibold text-brass-600 tracking-wider">
                            {item.category}
                          </span>
                          <h4 className="font-serif text-lg font-medium text-forest-950 group-hover:text-forest-800 transition-colors">
                            {item.name}
                          </h4>
                        </div>
                      </div>
                      <p className="text-xs text-earth-800 leading-relaxed font-light">
                        {item.desc}
                      </p>
                    </div>

                    <div className="pt-4 mt-4 border-t border-earth-200/60 flex items-center justify-between">
                      <button
                        onClick={() => onOpenBooking(item.name)}
                        className="text-xs font-semibold uppercase tracking-wider text-forest-900 hover:text-brass-600 transition-colors flex items-center gap-1.5"
                      >
                        <span>Inquire Treatment</span>
                        <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </button>
                      {item.popular && (
                        <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-brass-400/20 text-brass-600 font-semibold uppercase tracking-wider">
                          Popular
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* TAB 2: Overview */}
          {activeTab === 'overview' && (
            <motion.div
              key="overview-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="bg-cream-100/60 p-8 rounded-3xl border border-earth-200 space-y-6"
            >
              <div className="max-w-3xl space-y-4">
                <h3 className="text-2xl font-serif font-light text-forest-950">
                  Sri Krishna Ayurvedic Clinic Overview
                </h3>
                <p className="text-sm text-earth-800 leading-relaxed">
                  Sri Krishna Ayurvedic Clinic in KR Puram, Bangalore is a premier traditional healthcare facility offering verified Ayurvedic consultations, pulse diagnoses, and classic Ayurvedic therapies led by Dr. Anand Krishna (BAMS).
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-earth-200 text-xs">
                <div className="p-4 bg-white rounded-2xl border border-earth-200">
                  <p className="text-brass-600 font-semibold uppercase tracking-wider">Primary Doctor</p>
                  <p className="font-serif text-lg font-semibold text-forest-950 mt-1">Dr. Anand Krishna</p>
                  <p className="text-earth-600">BAMS • 26+ Years Exp.</p>
                </div>

                <div className="p-4 bg-white rounded-2xl border border-earth-200">
                  <p className="text-brass-600 font-semibold uppercase tracking-wider">Timings</p>
                  <p className="font-serif text-lg font-semibold text-forest-950 mt-1">10 AM – 7 PM</p>
                  <p className="text-earth-600">Monday to Saturday</p>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 3: Doctors (1) */}
          {activeTab === 'doctors' && (
            <motion.div
              key="doctors-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="bg-white p-8 rounded-3xl border border-earth-200 flex flex-col md:flex-row items-center gap-8 shadow-soft"
            >
              <img
                src={clinicData.images.doctor}
                alt="Dr. Anand Krishna"
                className="w-36 h-44 object-cover rounded-2xl border border-earth-200 shadow-soft"
              />
              <div className="space-y-3 text-left">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-forest-100 text-forest-800 text-xs font-semibold">
                  <UserCheck className="w-3.5 h-3.5" />
                  <span>Primary Physician</span>
                </div>
                <h3 className="text-3xl font-serif text-forest-950 font-light">
                  {clinicData.doctor.name}
                </h3>
                <p className="text-xs text-brass-600 font-semibold uppercase tracking-wider">
                  {clinicData.doctor.qualifications} • {clinicData.doctor.experienceYears}
                </p>
                <p className="text-xs text-earth-800 max-w-xl leading-relaxed">
                  {clinicData.doctor.bio}
                </p>
                <button
                  onClick={() => onOpenBooking()}
                  className="px-6 py-2.5 bg-forest-900 text-cream-50 text-xs font-semibold uppercase tracking-wider rounded-full hover:bg-forest-800 transition-colors"
                >
                  Book Appointment (₹50)
                </button>
              </div>
            </motion.div>
          )}

          {/* TAB 4: Stories (2) */}
          {activeTab === 'stories' && (
            <motion.div
              key="stories-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-6"
            >
              {clinicData.testimonials.slice(0, 2).map((test) => (
                <div key={test.id} className="bg-white p-6 rounded-2xl border border-earth-200 space-y-4">
                  <div className="flex items-center gap-2 text-brass-500">
                    <MessageSquare className="w-5 h-5" />
                    <span className="text-xs font-semibold text-forest-950 uppercase tracking-wider">Patient Story</span>
                  </div>
                  <p className="font-serif italic text-lg text-forest-900 leading-relaxed">
                    "{test.quote}"
                  </p>
                  <div className="pt-2 border-t border-earth-200 text-xs text-earth-600">
                    <strong>{test.author}</strong> • {test.locality} ({test.treatment})
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {/* TAB 5: Photos & Videos (3) */}
          {activeTab === 'photos' && (
            <motion.div
              key="photos-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-6"
            >
              <div className="rounded-2xl overflow-hidden border border-earth-200 shadow-soft aspect-[4/3] group relative">
                <img src={clinicData.images.hero} alt="Clinic Hero" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                <div className="absolute inset-0 bg-forest-950/30 flex items-end p-4 text-cream-50 font-serif text-sm">
                  Clinic Consultation Area
                </div>
              </div>
              <div className="rounded-2xl overflow-hidden border border-earth-200 shadow-soft aspect-[4/3] group relative">
                <img src={clinicData.images.herbs} alt="Ayurvedic Herbs" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                <div className="absolute inset-0 bg-forest-950/30 flex items-end p-4 text-cream-50 font-serif text-sm">
                  Authentic Herbal Apothecary
                </div>
              </div>
              <div className="rounded-2xl overflow-hidden border border-earth-200 shadow-soft aspect-[4/3] group relative">
                <img src={clinicData.images.clinic} alt="Therapy Room" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                <div className="absolute inset-0 bg-forest-950/30 flex items-end p-4 text-cream-50 font-serif text-sm">
                  Serene Therapy Room
                </div>
              </div>
            </motion.div>
          )}

        </AnimatePresence>

      </div>
    </section>
  );
}
