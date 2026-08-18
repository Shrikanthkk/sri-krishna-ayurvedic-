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
      title: "Classical Nadi Pariksha & Pulse Diagnosis",
      category: "consultation",
      tag: "Ancient Diagnostic Art",
      src: "/images/hero_stock_1.jpg",
      description: "Senior physician evaluating radial pulse to diagnose Dosha imbalance, organ health, and unique Prakriti constitution."
    },
    {
      id: 2,
      title: "Continuous Shirodhara Medicated Oil Stream",
      category: "panchakarma",
      tag: "Mind & Nervous System Calm",
      src: "/images/shirodhara.jpg",
      description: "Soothing flow of warm herbal oil over forehead marma points to alleviate stress, anxiety, migraines, and insomnia."
    },
    {
      id: 3,
      title: "Traditional Navarakizhi & Potali Massage",
      category: "panchakarma",
      tag: "Cellular Bio-Purification",
      src: "/images/hero_adobe_5.jpg",
      description: "Steam-heated medicinal herb compresses applied across joints and muscles for deep tissue detoxification and pain relief."
    },
    {
      id: 4,
      title: "Targeted Joint & Spine Kati Vasti Care",
      category: "panchakarma",
      tag: "Rheumatic & Lumbar Relief",
      src: "/images/hero_stock_3.jpg",
      description: "Specialized warm herbal oil pool retained over the lumbar region for spondylosis, sciatica, and chronic joint stiffness."
    },
    {
      id: 5,
      title: "Stone Mortar Herb Grinding & Extraction",
      category: "herbal",
      tag: "Classical Apothecary",
      src: "/images/hero_adobe_1.jpg",
      description: "Authentic hand-crushed medicinal herbs, roots, and botanical leaves prepared for custom classical formulations."
    },
    {
      id: 6,
      title: "Pure Medicated Oils & Botanical Kashayams",
      category: "herbal",
      tag: "Herbal Remedies",
      src: "/images/hero_adobe_2.jpg",
      description: "Slow-brewed medicinal decoctions and infused plant oils prepared strictly according to ancient Ayurvedic texts."
    },
    {
      id: 7,
      title: "Swarnaprashana Ayurvedic Pediatric Care",
      category: "consultation",
      tag: "Child Wellness & Vitality",
      src: "/images/hero_stock_2.jpg",
      description: "Classical Kashyapa Samhita gold-based pediatric formulation administered under physician guidance for cognitive and vitality support."
    },
    {
      id: 8,
      title: "Handcrafted Apothecary & Storage Sanctuary",
      category: "ambiance",
      tag: "Traditional Atmosphere",
      src: "/images/hero_adobe_3.jpg",
      description: "A warm, natural wooden sanctuary holding classical Ayurvedic churnams, tailams, and organic medicinal herbs."
    },
    {
      id: 9,
      title: "Traditional Teakwood Droni Therapy Room",
      category: "ambiance",
      tag: "Sanctuary Environment",
      src: "/images/hero_adobe_4.jpg",
      description: "Polished wooden treatment couch designed for classical Abhyanga massage and Panchakarma bio-purification therapies."
    },
    {
      id: 10,
      title: "Botanical Skin Radiance & Hair Rejuvenation",
      category: "herbal",
      tag: "Rakta Shodhana Care",
      src: "/images/hero_stock_4.jpg",
      description: "Purifying herbal oils and organic botanical poultices targeting Eczema, Psoriasis, and natural hair density."
    },
    {
      id: 11,
      title: "Senior Physician Consultation Corner",
      category: "consultation",
      tag: "Dr. Anand Krishna BAMS",
      src: "/images/doctor.jpg",
      description: "Personalized 1-on-1 consultation with senior physician Dr. Anand Krishna (26+ years clinical experience)."
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
        staggerChildren: 0.08
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.96 },
    show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: 'easeOut' } }
  };

  return (
    <div className="w-full">
      <PageHero
        badge="CLINICAL AMBIANCE & THERAPIES"
        title="Ayurvedic Treatment Gallery"
        subtitle="Explore our authentic Panchakarma therapies, Nadi Pariksha pulse consultations, herbal apothecary, and calm clinic sanctuary in KR Puram."
        bgImage="/images/hero_stock_4.jpg"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Breadcrumb items={[{ label: 'Gallery' }]} />

        {/* Category Filter Tabs */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap mb-12">
          {categories.map((cat) => {
            const active = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.id);
                  setSelectedImage(null);
                }}
                className={`relative px-5 py-2.5 text-xs font-semibold uppercase tracking-wider transition-all duration-300 -skew-x-12 cursor-pointer border-0 ${
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

        {/* PROPER BALANCED MASONRY GRID FRAME WITH GLASSMORPHIC BADGES */}
        <div className="p-4 sm:p-6 rounded-3xl bg-cream-100/60 border border-earth-200/80 shadow-inner mb-20">
          <motion.div
            layout
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8"
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
                    scale: 1.12,
                    y: -10,
                    zIndex: 40,
                    transition: { type: "spring", stiffness: 350, damping: 22 }
                  }}
                  onClick={() => setSelectedImage(img)}
                  className="rounded-2xl overflow-hidden shadow-elevated bg-white border-2 border-earth-200 hover:border-brass-500 transition-all duration-300 flex flex-col cursor-pointer group relative hover:shadow-[0_25px_60px_rgba(15,35,25,0.4)]"
                >
                  {/* Image Container with Glassmorphic Overlays */}
                  <div className="relative aspect-[4/3] bg-forest-950 overflow-hidden">
                    <img
                      src={img.src}
                      alt={img.title}
                      className="w-full h-full object-cover transform group-hover:scale-125 transition-transform duration-500 ease-out opacity-90 group-hover:opacity-100"
                      loading="lazy"
                    />
                    
                    {/* Glassmorphic Category Tag Badge */}
                    <div className="absolute top-3 left-3 z-10 max-w-[70%]">
                      <span className="px-3 py-1.5 bg-forest-950/40 backdrop-blur-xl border border-white/25 text-cream-100 text-[10px] font-bold uppercase tracking-widest rounded-full shadow-soft flex items-center gap-1.5 truncate">
                        <span className="w-1.5 h-1.5 rounded-full bg-brass-400 shrink-0" />
                        <span className="truncate">{img.tag}</span>
                      </span>
                    </div>

                    {/* Glassmorphic Expand Action Badge */}
                    <div className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <div className="px-3 py-1.5 bg-brass-500/30 backdrop-blur-xl border border-brass-400/50 text-brass-300 text-[10px] font-bold uppercase tracking-wider rounded-full shadow-soft flex items-center gap-1">
                        <Maximize2 className="w-3 h-3 text-brass-300 shrink-0" />
                        <span>Expand</span>
                      </div>
                    </div>
                  </div>

                  {/* Card Bottom Panel */}
                  <div className="p-4 flex-1 flex flex-col justify-between space-y-2 bg-white border-t border-earth-100">
                    <h3 className="font-serif text-base text-forest-950 font-medium leading-snug group-hover:text-brass-700 transition-colors">
                      {img.title}
                    </h3>

                    <div className="pt-2 border-t border-earth-100/80 flex items-center justify-between text-[11px] text-brass-700 font-semibold uppercase tracking-wider">
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
        <div className="p-8 sm:p-12 bg-forest-950 text-cream-50 rounded-3xl flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-elevated">
          <div className="space-y-2">
            <span className="text-xs text-brass-400 uppercase tracking-widest font-semibold block">Experience Authentic Ayurvedic Healing</span>
            <h3 className="font-serif text-3xl font-light">Book Your Consultation with Dr. Anand Krishna</h3>
            <p className="text-xs text-cream-200/80">Mon - Sat 10:00 AM - 7:00 PM</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 shrink-0">
            <Link
              to="/book-appointment"
              className="px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-forest-950 font-bold text-xs uppercase tracking-wider rounded-full shadow-soft transition-all text-center flex items-center justify-center gap-2"
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
            className="fixed inset-0 z-50 bg-forest-950/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6"
          >
            {/* FLOATING SIDE PREVIOUS BUTTON */}
            <button
              onClick={handlePrevious}
              className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-50 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-forest-900/80 hover:bg-brass-500 text-cream-50 hover:text-forest-950 backdrop-blur-xl border border-white/20 hover:border-brass-400 flex items-center justify-center shadow-elevated transition-all duration-300 cursor-pointer group"
              aria-label="Previous Image"
            >
              <ChevronLeft className="w-6 h-6 transform group-hover:-translate-x-0.5 transition-transform" />
            </button>

            {/* FLOATING SIDE NEXT BUTTON */}
            <button
              onClick={handleNext}
              className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-50 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-forest-900/80 hover:bg-brass-500 text-cream-50 hover:text-forest-950 backdrop-blur-xl border border-white/20 hover:border-brass-400 flex items-center justify-center shadow-elevated transition-all duration-300 cursor-pointer group"
              aria-label="Next Image"
            >
              <ChevronRight className="w-6 h-6 transform group-hover:translate-x-0.5 transition-transform" />
            </button>

            {/* Modal Card Container */}
            <motion.div
              key={selectedImage.id}
              initial={{ scale: 0.88, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.88, opacity: 0, y: 15 }}
              transition={{ type: 'spring', stiffness: 320, damping: 26 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full bg-white rounded-3xl overflow-hidden shadow-[0_30px_90px_rgba(0,0,0,0.6)] border border-earth-200"
            >
              {/* Top Bar with Close Button Only */}
              <div className="absolute top-4 right-4 z-20">
                <button
                  onClick={() => setSelectedImage(null)}
                  className="w-10 h-10 rounded-full bg-forest-950/80 text-cream-50 flex items-center justify-center hover:bg-forest-900 transition-colors cursor-pointer border-0 shadow-soft"
                  aria-label="Close image modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12">
                {/* Modal Image */}
                <div className="lg:col-span-7 bg-forest-950 aspect-[4/3] lg:aspect-auto relative min-h-[340px]">
                  <img
                    src={selectedImage.src}
                    alt={selectedImage.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Modal Info Column */}
                <div className="lg:col-span-5 p-8 flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    <span className="px-3.5 py-1.5 bg-forest-100 text-forest-900 text-[10px] font-bold uppercase tracking-widest rounded-full inline-block">
                      {selectedImage.tag}
                    </span>

                    <h3 className="font-serif text-3xl font-medium text-forest-950 leading-tight">
                      {selectedImage.title}
                    </h3>
                  </div>

                  <div className="pt-4 border-t border-earth-200 space-y-3">
                    <Link
                      to="/book-appointment"
                      onClick={() => setSelectedImage(null)}
                      className="w-full py-3.5 bg-forest-900 hover:bg-forest-800 text-cream-50 font-bold text-xs uppercase tracking-wider rounded-xl shadow-soft flex items-center justify-center gap-2 transition-all"
                    >
                      <Calendar className="w-4 h-4 text-brass-400" />
                      <span>Book Consultation for Therapy</span>
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
