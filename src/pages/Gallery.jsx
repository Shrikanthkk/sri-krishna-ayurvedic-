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
    { id: 'doctor', label: 'DOCTOR & CONSULTATION' },
    { id: 'clinic', label: 'CLINIC INFRASTRUCTURE' },
    { id: 'pharmacy', label: 'HERBAL DISPENSARY' },
    { id: 'events', label: 'EVENTS, BLESSINGS & AWARDS' }
  ];

  const galleryItems = [
    {
      id: 1,
      title: "Sri Krishna Ayurvedic Clinic – Exterior & Illuminated Signboard",
      category: "clinic",
      tag: "Main Entrance",
      src: "/images/gallery/clinic_exterior_facade.png",
      objectPosition: "center 40%",
      description: "Illuminated exterior facade and clinic signboard at No 426/1, Dhanvantari Road, KR Puram, Bangalore."
    },
    {
      id: 2,
      title: "Senior Physician Dr. Anand Krishna (BAMS)",
      category: "doctor",
      tag: "26+ Years Clinical Practice",
      src: "/images/gallery/dr_anand_krishna.png",
      objectPosition: "center 12%",
      description: "Senior Ayurvedic Physician and Medical Director leading classical Nadi Pariksha and personalized herbal care."
    },
    {
      id: 3,
      title: "Dr. Anand Krishna – Pediatric Pulse Diagnosis (Nadi Pariksha)",
      category: "doctor",
      tag: "Pulse Diagnosis & Care",
      src: "/images/gallery/dr_anand_krishna_pediatric_nadi_pariksha.png",
      objectPosition: "center 22%",
      description: "Dr. Anand Krishna conducting personalized pediatric pulse diagnosis (Nadi Pariksha) and wellness examination."
    },
    {
      id: 4,
      title: "Telugu Tejam Foundation – Best Service Award & Vaidya Ratna Honor",
      category: "events",
      tag: "Prestigious Medical Award",
      src: "/images/gallery/dr_anand_krishna_telugu_tejam_award.png",
      objectPosition: "center 15%",
      description: "Dr. Anand Krishna receiving the Telugu Tejam Foundation 'Best Service Award' for distinguished Ayurvedic healthcare."
    },
    {
      id: 5,
      title: "State Felicitation & Ayurvedic Excellence Award",
      category: "events",
      tag: "Medical Honors",
      src: "/images/gallery/dr_anand_krishna_award_felicitation.png",
      objectPosition: "center 12%",
      description: "Dr. Anand Krishna felicitated on stage with ceremonial shawls and Ayurvedic excellence awards."
    },
    {
      id: 6,
      title: "Revered Swamiji Holy Blessings at Clinic Inauguration",
      category: "events",
      tag: "Sacred Blessings",
      src: "/images/gallery/swamiji_blessings_ceremony.png",
      objectPosition: "center 18%",
      description: "Revered Spiritual Guru / Swamiji bestowing holy blessings on Dr. Anand Krishna at clinic inauguration."
    },
    {
      id: 7,
      title: "Sri Krishna Ayurvedic Clinic Inauguration Ceremony",
      category: "events",
      tag: "Grand Opening",
      src: "/images/gallery/clinic_inauguration_ceremony.png",
      objectPosition: "center 24%",
      description: "Ribbon-cutting opening ceremony of Sri Krishna Ayurvedic Clinic with esteemed community elders."
    },
    {
      id: 8,
      title: "Floral Felicitation & Welcoming at Reception Shrine",
      category: "events",
      tag: "Celebration & Welcoming",
      src: "/images/gallery/clinic_opening_bouquet_greeting.png",
      objectPosition: "center 22%",
      description: "Dr. Anand Krishna and family greeted with floral bouquets at the illuminated reception shrine."
    },
    {
      id: 9,
      title: "Media Press Interview & Clinic Launch Coverage",
      category: "events",
      tag: "Press & Media Coverage",
      src: "/images/gallery/clinic_opening_media_coverage.png",
      objectPosition: "center 22%",
      description: "Press and television media capturing the grand launch of Sri Krishna Ayurvedic Clinic in KR Puram."
    },
    {
      id: 10,
      title: "Dr. Anand Krishna Preparing Classical Herbal Formulations",
      category: "pharmacy",
      tag: "Custom Formulations",
      src: "/images/gallery/dr_anand_krishna_preparing_medicine.png",
      objectPosition: "center 18%",
      description: "Dr. Anand Krishna hand-crafting individualized botanical churnams and classical medicines in the dispensary."
    },
    {
      id: 11,
      title: "Swarnaprashana & Physiotherapy Clinical Department",
      category: "clinic",
      tag: "Specialty Departments",
      src: "/images/gallery/swarnaprashana_physiotherapy_cabin.png",
      objectPosition: "center 30%",
      description: "Clinical department for Pushya Nakshatra Swarnaprashana child immunity drops and physiotherapy."
    },
    {
      id: 12,
      title: "Clinic Reception & Patient Waiting Lounge",
      category: "clinic",
      tag: "Welcoming Ambiance",
      src: "/images/gallery/clinic_reception_lounge.png",
      objectPosition: "center 35%",
      description: "Serene patient reception lounge featuring vertical botanical wall, shrine, and consultation desk."
    },
    {
      id: 13,
      title: "Doctor Consultation Chamber & Sacred Healing Space",
      category: "clinic",
      tag: "Consultation Sanctuary",
      src: "/images/gallery/doctor_consultation_chamber.png",
      objectPosition: "center 35%",
      description: "Private consultation chamber for pulse diagnosis (Nadi Pariksha) with illuminated Om mandala."
    },
    {
      id: 14,
      title: "Ayurvedic Dispensary & Comprehensive Medicine Storage",
      category: "pharmacy",
      tag: "Classical Apothecary",
      src: "/images/gallery/ayurvedic_dispensary_cabinets.png",
      objectPosition: "center center",
      description: "In-clinic Ayurvedic dispensary holding classical botanical churnams, tablets, and medicated oils."
    },
    {
      id: 15,
      title: "Herbal Pharmacy & In-Clinic Treatment Facility",
      category: "pharmacy",
      tag: "Apothecary & Therapy Room",
      src: "/images/gallery/herbal_pharmacy_treatment_room.png",
      objectPosition: "center center",
      description: "Equipped in-clinic treatment station and classical herbal medicine dispensing facility."
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
    hidden: { opacity: 0, y: 24, scale: 0.95 },
    show: { 
      opacity: 1, 
      y: 0, 
      scale: 1, 
      transition: { 
        duration: 0.45, 
        ease: [0.22, 1, 0.36, 1] 
      } 
    }
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
              <motion.button
                key={cat.id}
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => {
                  setSelectedCategory(cat.id);
                  setSelectedImage(null);
                }}
                className={`relative px-4 py-2.5 text-xs font-semibold uppercase tracking-wider transition-all duration-300 -skew-x-12 cursor-pointer border-0 ${
                  active
                    ? 'bg-forest-900 text-cream-50 shadow-elevated'
                    : 'bg-white text-earth-800 hover:bg-cream-100 hover:text-forest-950 border border-earth-200 shadow-sm'
                }`}
                style={{ borderRadius: '2px 6px 2px 6px' }}
              >
                <span className="skew-x-12 flex items-center gap-1.5 whitespace-nowrap">
                  {cat.id === 'all' && <Filter className="w-3.5 h-3.5 text-brass-400" />}
                  <span>{cat.label}</span>
                </span>
              </motion.button>
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
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
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
                    y: -8,
                    transition: { type: "spring", stiffness: 300, damping: 20 }
                  }}
                  onClick={() => setSelectedImage(img)}
                  className="rounded-2xl overflow-hidden bg-white border-2 border-earth-200 hover:border-brass-500 transition-all duration-300 flex flex-col cursor-pointer group relative shadow-md hover:shadow-[0_20px_45px_rgba(15,35,25,0.22)]"
                >
                  {/* Image Container with Face-Aligned Object Position & Zoom Animation */}
                  <div className="relative aspect-[4/3] bg-forest-950 overflow-hidden">
                    <img
                      src={img.src}
                      alt={img.title}
                      style={{ objectPosition: img.objectPosition || 'center top' }}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
                      loading="lazy"
                    />
                    
                    {/* Glassmorphic Category Tag Badge */}
                    <div className="absolute top-3 left-3 z-10 max-w-[80%]">
                      <span className="px-3 py-1 bg-forest-950/75 backdrop-blur-md border border-white/20 text-cream-100 text-[10px] font-bold uppercase tracking-widest rounded-full shadow-md flex items-center gap-1.5 truncate">
                        <span className="w-1.5 h-1.5 rounded-full bg-brass-400 shrink-0 animate-pulse" />
                        <span className="truncate">{img.tag}</span>
                      </span>
                    </div>

                    {/* Glassmorphic Expand Action Badge */}
                    <div className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-105">
                      <div className="px-3 py-1 bg-brass-500/80 backdrop-blur-md border border-brass-300/60 text-forest-950 text-[10px] font-bold uppercase tracking-wider rounded-full shadow-md flex items-center gap-1">
                        <Maximize2 className="w-3 h-3 text-forest-950 shrink-0" />
                        <span>View</span>
                      </div>
                    </div>
                  </div>

                  {/* Card Bottom Panel with Uniform Height & Clean Typography */}
                  <div className="p-4 flex-1 flex flex-col justify-between space-y-2 bg-white border-t border-earth-100">
                    <h3 className="font-serif text-base sm:text-lg text-forest-950 font-medium leading-snug group-hover:text-brass-700 transition-colors line-clamp-2">
                      {img.title}
                    </h3>

                    <div className="pt-2 border-t border-earth-100 flex items-center justify-between text-[11px] text-brass-700 font-semibold uppercase tracking-wider">
                      <span className="flex items-center gap-1 text-forest-800 font-medium text-xs">
                        <Eye className="w-3.5 h-3.5 text-brass-600" />
                        <span>Click for Full View</span>
                      </span>
                      <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform text-brass-600" />
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

              {/* Modal Image Column - Fully Displayed Without Cropping */}
              <div className="lg:col-span-7 bg-forest-950 relative flex items-center justify-center overflow-hidden h-[260px] sm:h-[360px] lg:h-[480px]">
                <img
                  src={selectedImage.src}
                  alt={selectedImage.title}
                  className="w-full h-full object-contain p-2 sm:p-4"
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
