import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, X, Filter, Sparkles, Calendar, CheckCircle2, ChevronRight, ChevronLeft, Maximize2 } from 'lucide-react';
import PageHero from '../components/PageHero';
import Breadcrumb from '../components/Breadcrumb';
import { Link } from 'react-router-dom';

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedImage, setSelectedImage] = useState(null);

  const categories = [
    { id: 'all', label: 'ALL THERAPIES' },
    { id: 'panchakarma', label: 'PANCHAKARMA & SHIRODHARA' },
    { id: 'consultation', label: 'NADI PARIKSHA & CONSULTATION' },
    { id: 'herbal', label: 'HERBAL APOTHECARY' },
    { id: 'ambiance', label: 'CLINIC SANCTUARY' }
  ];

  const galleryItems = [
    {
      id: 1,
      title: "Integrative Ayurvedic Clinical Care & Therapies",
      category: "consultation",
      tag: "Comprehensive Clinical Healing",
      src: "/images/ayurvedic_integrative_therapy.jpg",
      description: "Combining classical pulse diagnosis (Nadi Pariksha) and personalized botanical formulations with authentic Panchakarma body therapies."
    },
    {
      id: 2,
      title: "Panchakarma Detox & Shirodhara Stream",
      category: "panchakarma",
      tag: "Cellular Bio-Purification",
      src: "/images/shirodhara.jpg",
      description: "Soothing continuous stream of medicated herbal oils over forehead marma points to relieve chronic stress, insomnia, and nervous system fatigue."
    },
    {
      id: 3,
      title: "Traditional Navarakizhi & Herbal Potali Massage",
      category: "panchakarma",
      tag: "Cellular Bio-Purification",
      src: "/images/ayurvedic_potli_herbs.jpg",
      description: "Steam-heated herbal boluses (Kizhi) and warm medicated oils applied across joints and muscles for deep tissue rejuvenation and arthritis relief."
    },
    {
      id: 4,
      title: "Vedic Heritage & Ancient Ayurvedic Acharya Lineage",
      category: "herbal",
      tag: "Classical Sanskrit Lineage",
      src: "/images/ancient_ayurveda_sage.jpg",
      description: "Time-tested principles preserved from Charaka Samhita and Sushruta Samhita, guiding root-cause formulation and constitutional healing."
    },
    {
      id: 5,
      title: "Stone Mortar Herb Grinding & Classical Formulations",
      category: "herbal",
      tag: "Classical Apothecary",
      src: "/images/ayurvedic_potli_herbs.jpg",
      description: "Pure botanical roots, therapeutic herbs, and medicinal oils prepared strictly adhering to classical Ayurvedic pharmacopoeia."
    },
    {
      id: 6,
      title: "Pure Medicated Oils, Kizhi Pouches & Kashayams",
      category: "herbal",
      tag: "Herbal Remedies",
      src: "/images/ayurvedic_potli_herbs.jpg",
      description: "Slow-brewed botanical decoctions and medicated herbal oils crafted for chronic pain, metabolic disorders, and digestive wellness."
    },
    {
      id: 7,
      title: "Swarnaprashana Ayurvedic Pediatric Care",
      category: "consultation",
      tag: "Child Wellness & Vitality",
      src: "/images/swarnaprashana_1.png",
      description: "Classical Kashyapa Samhita gold-based pediatric drops administered on Pushya Nakshatra days for cognitive and immunity support."
    },
    {
      id: 8,
      title: "Ancient Manuscript Wisdom & Herbal Science",
      category: "ambiance",
      tag: "Traditional Wisdom",
      src: "/images/ancient_ayurveda_sage.jpg",
      description: "Honoring the ancient sage tradition of herbal formulation, clinical diagnostics, and natural healing methods."
    },
    {
      id: 9,
      title: "Holistic Physician Care & Consultation Sanctuary",
      category: "ambiance",
      tag: "Clinical Excellence",
      src: "/images/ayurvedic_integrative_therapy.jpg",
      description: "A serene clinical atmosphere bridging traditional Ayurvedic treatments with thorough medical consultation."
    },
    {
      id: 10,
      title: "Traditional Kizhi Potli & Medicated Therapy Herbs",
      category: "panchakarma",
      tag: "Deep Rejuvenation",
      src: "/images/ayurvedic_potli_herbs.jpg",
      description: "Handcrafted cotton boluses packed with restorative herbs for soothing inflammation and boosting lymphatic circulation."
    },
    {
      id: 11,
      title: "Dr. Anand Krishna - Senior Physician Consultation Corner",
      category: "consultation",
      tag: "Dr. Anand Krishna (BAMS)",
      src: "/images/doctor_consultation_corner.jpg",
      description: "Senior Physician Dr. Anand Krishna (BAMS) conducting classical pulse diagnosis (Nadi Pariksha) and personalized Ayurvedic consultations in his clinic chamber."
    },
    {
      id: 12,
      title: "Sri Krishna Ayurvedic Clinic Exterior Entrance",
      category: "ambiance",
      tag: "KR Puram Center",
      src: "/images/clinic_front.jpg",
      description: "Illuminated exterior entrance and clinic signboard at Dhanvantari Road, KR Puram, Bangalore."
    }
  ];

  const filteredItems = selectedCategory === 'all'
    ? galleryItems
    : galleryItems.filter(item => item.category === selectedCategory);

  const currentIndex = selectedImage
    ? filteredItems.findIndex(item => item.id === selectedImage.id)
    : -1;

  const handleNext = (e) => {
    e?.stopPropagation();
    if (currentIndex === -1 || filteredItems.length === 0) return;
    const nextIdx = (currentIndex + 1) % filteredItems.length;
    setSelectedImage(filteredItems[nextIdx]);
  };

  const handlePrevious = (e) => {
    e?.stopPropagation();
    if (currentIndex === -1 || filteredItems.length === 0) return;
    const prevIdx = (currentIndex - 1 + filteredItems.length) % filteredItems.length;
    setSelectedImage(filteredItems[prevIdx]);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!selectedImage) return;
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrevious();
      if (e.key === 'Escape') setSelectedImage(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage, currentIndex, filteredItems]);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.06
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 16, scale: 0.96 },
    show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.35, ease: 'easeOut' } }
  };

  return (
    <div className="w-full">
      <PageHero
        badge="CLINICAL AMBIANCE & THERAPIES"
        title="Ayurvedic Treatment Gallery"
        subtitle="Explore our authentic Panchakarma therapies, Nadi Pariksha pulse consultations, herbal apothecary, and calm clinic sanctuary in KR Puram."
        bgImage="/images/hero_stock_4.jpg"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb items={[{ label: 'Gallery' }]} />

        {/* Category Filter Tabs */}
        <div className="flex items-center justify-center gap-2 sm:gap-2.5 flex-wrap mb-8">
          {categories.map((cat) => {
            const active = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.id);
                  setSelectedImage(null);
                }}
                className={`relative px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all duration-300 -skew-x-12 cursor-pointer border-0 ${
                  active
                    ? 'bg-forest-900 text-cream-50 shadow-elevated scale-[1.02]'
                    : 'bg-white text-earth-800 hover:bg-cream-100 hover:text-forest-950 border border-earth-200 shadow-sm'
                }`}
                style={{ borderRadius: '2px 6px 2px 6px' }}
              >
                <span className="skew-x-12 flex items-center gap-1.5 whitespace-nowrap">
                  {cat.id === 'all' && <Filter className="w-3.5 h-3.5 text-brass-400" />}
                  <span>{cat.label}</span>
                </span>
              </button>
            );
          })}
        </div>

        {/* MASONRY GRID */}
        <div className="p-4 sm:p-5 rounded-3xl bg-cream-100/60 border border-earth-200/80 shadow-inner mb-10">
          <motion.div
            layout
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredItems.map((img) => (
                <motion.div
                  layout
                  key={img.id}
                  variants={itemVariants}
                  initial="hidden"
                  animate="show"
                  exit={{ opacity: 0, scale: 0.9 }}
                  whileHover={{
                    scale: 1.08,
                    y: -6,
                    zIndex: 40,
                    transition: { type: "spring", stiffness: 350, damping: 22 }
                  }}
                  onClick={() => setSelectedImage(img)}
                  className="rounded-2xl overflow-hidden shadow-elevated bg-white border-2 border-earth-200 hover:border-brass-500 transition-all duration-300 flex flex-col cursor-pointer group relative hover:shadow-[0_20px_50px_rgba(15,35,25,0.35)]"
                >
                  {/* Image Container with Glassmorphic Overlays */}
                  <div className="relative aspect-[4/3] bg-forest-950 overflow-hidden">
                    <img
                      src={img.src}
                      alt={img.title}
                      className="w-full h-full object-cover transform group-hover:scale-115 transition-transform duration-500 ease-out opacity-90 group-hover:opacity-100"
                      loading="lazy"
                    />
                    
                    {/* Glassmorphic Category Tag Badge */}
                    <div className="absolute top-2.5 left-2.5 z-10 max-w-[75%]">
                      <span className="px-2.5 py-1 bg-forest-950/60 backdrop-blur-xl border border-white/25 text-cream-100 text-[10px] font-bold uppercase tracking-widest rounded-full shadow-soft flex items-center gap-1.5 truncate">
                        <span className="w-1.5 h-1.5 rounded-full bg-brass-400 shrink-0" />
                        <span className="truncate">{img.tag}</span>
                      </span>
                    </div>

                    {/* Glassmorphic Expand Action Badge */}
                    <div className="absolute top-2.5 right-2.5 z-10 opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <div className="px-2.5 py-1 bg-brass-500/40 backdrop-blur-xl border border-brass-400/50 text-brass-200 text-[10px] font-bold uppercase tracking-wider rounded-full shadow-soft flex items-center gap-1">
                        <Maximize2 className="w-3 h-3 text-brass-300 shrink-0" />
                        <span>Expand</span>
                      </div>
                    </div>
                  </div>

                  {/* Card Bottom Panel */}
                  <div className="p-3.5 flex-1 flex flex-col justify-between space-y-1.5 bg-white border-t border-earth-100">
                    <h3 className="font-serif text-sm sm:text-base text-forest-950 font-medium leading-snug group-hover:text-brass-700 transition-colors">
                      {img.title}
                    </h3>

                    <div className="pt-1.5 border-t border-earth-100/80 flex items-center justify-between text-[10px] sm:text-[11px] text-brass-700 font-semibold uppercase tracking-wider">
                      <span>Click for Full View</span>
                      <ChevronRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform text-brass-600" />
                    </div>
                  </div>

                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Consultation CTA Banner */}
        <div className="p-6 sm:p-8 bg-forest-950 text-cream-50 rounded-3xl flex flex-col sm:flex-row sm:items-center justify-between gap-5 shadow-elevated">
          <div className="space-y-1.5">
            <span className="text-xs text-brass-400 uppercase tracking-widest font-semibold block">Experience Authentic Ayurvedic Healing</span>
            <h3 className="font-serif text-2xl sm:text-3xl font-light">Book Your Consultation with Dr. Anand Krishna</h3>
            <p className="text-xs text-cream-200/80">Mon - Sat 10:00 AM - 7:00 PM</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3.5 shrink-0">
            <Link
              to="/book-appointment"
              className="px-6 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-forest-950 font-bold text-xs uppercase tracking-wider rounded-full shadow-soft transition-all text-center flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Appointment</span>
            </Link>
          </div>
        </div>

      </div>

      {/* Fullscreen Lightbox Modal with Side Arrow Navigation */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-50 bg-forest-950/95 backdrop-blur-xl flex items-center justify-center p-3 sm:p-6 overflow-hidden"
          >
            {/* FLOATING SIDE PREVIOUS BUTTON */}
            <button
              onClick={handlePrevious}
              className="fixed left-2 sm:left-6 top-1/2 -translate-y-1/2 z-50 w-10 h-10 sm:w-13 sm:h-13 rounded-full bg-forest-900/85 hover:bg-brass-500 text-cream-50 hover:text-forest-950 backdrop-blur-xl border border-white/20 hover:border-brass-400 flex items-center justify-center shadow-elevated transition-all duration-300 cursor-pointer group"
              aria-label="Previous Image"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 transform group-hover:-translate-x-0.5 transition-transform" />
            </button>

            {/* FLOATING SIDE NEXT BUTTON */}
            <button
              onClick={handleNext}
              className="fixed right-2 sm:right-6 top-1/2 -translate-y-1/2 z-50 w-10 h-10 sm:w-13 sm:h-13 rounded-full bg-forest-900/85 hover:bg-brass-500 text-cream-50 hover:text-forest-950 backdrop-blur-xl border border-white/20 hover:border-brass-400 flex items-center justify-center shadow-elevated transition-all duration-300 cursor-pointer group"
              aria-label="Next Image"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 transform group-hover:translate-x-0.5 transition-transform" />
            </button>

            {/* Modal Card Container */}
            <motion.div
              key={selectedImage.id}
              initial={{ scale: 0.92, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 15 }}
              transition={{ type: 'spring', stiffness: 320, damping: 26 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full max-h-[92vh] bg-white rounded-3xl overflow-hidden shadow-[0_30px_90px_rgba(0,0,0,0.6)] border border-earth-200 flex flex-col lg:grid lg:grid-cols-12"
            >
              {/* Close Button */}
              <div className="absolute top-3 right-3 z-30">
                <button
                  onClick={() => setSelectedImage(null)}
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-forest-950/80 hover:bg-forest-900 text-cream-50 flex items-center justify-center transition-colors cursor-pointer border-0 shadow-soft"
                  aria-label="Close image modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Image Column */}
              <div className="lg:col-span-7 bg-forest-950 relative flex items-center justify-center overflow-hidden h-[240px] sm:h-[320px] lg:h-[480px]">
                <img
                  src={selectedImage.src}
                  alt={selectedImage.title}
                  className="w-full h-full object-contain sm:object-cover"
                />
              </div>

              {/* Modal Info Column */}
              <div className="lg:col-span-5 p-5 sm:p-7 flex flex-col justify-between space-y-4 overflow-y-auto max-h-[300px] lg:max-h-[480px] bg-white">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 bg-forest-100 text-forest-900 text-[10px] font-bold uppercase tracking-widest rounded-full inline-block">
                      {selectedImage.tag}
                    </span>
                    <span className="text-[11px] text-earth-500 font-medium">
                      {currentIndex + 1} / {filteredItems.length}
                    </span>
                  </div>

                  <h3 className="font-serif text-xl sm:text-2xl font-medium text-forest-950 leading-tight">
                    {selectedImage.title}
                  </h3>

                  {selectedImage.description && (
                    <p className="text-xs sm:text-sm text-earth-800 font-light leading-relaxed">
                      {selectedImage.description}
                    </p>
                  )}
                </div>

                <div className="pt-4 border-t border-earth-200 space-y-2">
                  <div className="flex items-center gap-2 sm:hidden pb-2">
                    <button
                      onClick={handlePrevious}
                      className="flex-1 py-2 bg-cream-100 hover:bg-cream-200 text-forest-950 font-semibold text-xs rounded-lg flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span>Prev</span>
                    </button>
                    <button
                      onClick={handleNext}
                      className="flex-1 py-2 bg-cream-100 hover:bg-cream-200 text-forest-950 font-semibold text-xs rounded-lg flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <span>Next</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>

                  <Link
                    to="/book-appointment"
                    onClick={() => setSelectedImage(null)}
                    className="w-full py-3 bg-forest-900 hover:bg-forest-800 text-cream-50 font-bold text-xs uppercase tracking-wider rounded-xl shadow-soft flex items-center justify-center gap-2 transition-all text-center"
                  >
                    <Calendar className="w-4 h-4 text-brass-400" />
                    <span>Book Consultation for Therapy</span>
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
