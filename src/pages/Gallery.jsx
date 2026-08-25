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
    { id: 'all', label: 'ALL CLINIC PHOTOS' },
    { id: 'doctor', label: 'SENIOR PHYSICIAN & HONORS' },
    { id: 'clinic', label: 'CLINIC INFRASTRUCTURE' },
    { id: 'pharmacy', label: 'HERBAL DISPENSARY' },
    { id: 'events', label: 'EVENTS & INAUGURATION' }
  ];

  const galleryItems = [
    {
      id: 1,
      title: "Sri Krishna Ayurvedic Clinic – Exterior & Illuminated Signboard",
      category: "clinic",
      tag: "Main Entrance",
      src: "/images/gallery/clinic_exterior_facade.png",
      description: "Illuminated exterior facade and clinic signboard located at No 426/1, Dhanvantari Road, Krishnarajapuram (KR Puram), Bangalore 560036."
    },
    {
      id: 2,
      title: "Senior Physician Dr. Anand Krishna (BAMS)",
      category: "doctor",
      tag: "26+ Years Clinical Practice",
      src: "/images/gallery/dr_anand_krishna.png",
      description: "Senior Ayurvedic Physician and Medical Director leading holistic healing, classical pulse diagnosis (Nadi Pariksha), and personalized herbal healthcare."
    },
    {
      id: 3,
      title: "Dr. Anand Krishna – State Felicitation & Excellence Award",
      category: "doctor",
      tag: "Medical Honors & Awards",
      src: "/images/gallery/dr_anand_krishna_award_felicitation.png",
      description: "Dr. Anand Krishna being felicitated on stage with prestigious Ayurvedic excellence honors and ceremonial awards for distinguished service in holistic community health."
    },
    {
      id: 4,
      title: "Dr. Anand Krishna Preparing Classical Herbal Formulations",
      category: "pharmacy",
      tag: "Custom Formulations",
      src: "/images/gallery/dr_anand_krishna_preparing_medicine.png",
      description: "Dr. Anand Krishna hand-crafting individualized Ayurvedic botanical medicines, churnams, and therapeutic mixtures in the clinic dispensary."
    },
    {
      id: 5,
      title: "Swarnaprashana & Physiotherapy Clinical Department",
      category: "clinic",
      tag: "Specialty Departments",
      src: "/images/gallery/swarnaprashana_physiotherapy_cabin.png",
      description: "Dedicated clinical wing for Pushya Nakshatra Swarnaprashana child immunity drops and integrative Ayurvedic physiotherapy care."
    },
    {
      id: 6,
      title: "Clinic Reception & Patient Waiting Lounge",
      category: "clinic",
      tag: "Welcoming Ambiance",
      src: "/images/gallery/clinic_reception_lounge.png",
      description: "Serene patient reception lounge featuring lush green vertical botanical wall, traditional altar shrine, comfortable waiting seating, and consultation check-in desk."
    },
    {
      id: 7,
      title: "Doctor Consultation Chamber & Sacred Healing Space",
      category: "clinic",
      tag: "Consultation Sanctuary",
      src: "/images/gallery/doctor_consultation_chamber.png",
      description: "Peaceful private consultation chamber designed for confidential pulse diagnosis (Nadi Pariksha), featuring an illuminated sacred Om mandala and spiritual healing decor."
    },
    {
      id: 8,
      title: "Ayurvedic Dispensary & Comprehensive Medicine Storage",
      category: "pharmacy",
      tag: "Classical Apothecary",
      src: "/images/gallery/ayurvedic_dispensary_cabinets.png",
      description: "Extensive in-clinic Ayurvedic dispensary holding hundreds of classical herbal powders, decoctions, tablets, and medicated oils."
    },
    {
      id: 9,
      title: "Herbal Pharmacy & In-Clinic Treatment Facility",
      category: "pharmacy",
      tag: "Apothecary & Therapy Room",
      src: "/images/gallery/herbal_pharmacy_treatment_room.png",
      description: "Comprehensive in-clinic Ayurvedic dispensary stocked with classical botanical churnams, medicated oils, herbal formulations, and therapeutic clinical care station."
    },
    {
      id: 10,
      title: "Sri Krishna Ayurvedic Clinic Inauguration Ceremony",
      category: "events",
      tag: "Grand Opening",
      src: "/images/gallery/clinic_inauguration_ceremony.png",
      description: "Grand ribbon-cutting and opening ceremony of Sri Krishna Ayurvedic Clinic in the presence of esteemed community elders, patrons, and well-wishers."
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
        badge="CLINICAL AMBIANCE & FACILITIES"
        title="Sri Krishna Ayurvedic Clinic Gallery"
        subtitle="Explore our authentic clinic facilities, senior physician consultation chamber, welcoming patient reception, and in-clinic herbal dispensary in KR Puram, Bangalore."
        bgImage="/images/gallery/clinic_exterior_facade.png"
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
        <div className="p-4 sm:p-6 rounded-3xl bg-cream-100/60 border border-earth-200/80 shadow-inner mb-10">
          <motion.div
            layout
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
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
