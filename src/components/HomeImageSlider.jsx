import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Leaf, Sparkles, HeartHandshake, ShieldCheck, Award } from 'lucide-react';

const SLIDE_DURATION = 5000; // 5 seconds per slide

const slidesData = [
  {
    id: 1,
    badge: 'Vedic Heritage',
    title: 'Classical Samhitas',
    subtitle: 'Vedic Healing Heritage & Sacred Samhitas',
    image: '/images/home_slider/ayurveda_heritage_dhanvantari.png',
    card1: {
      title: 'Ancient Wisdom',
      subtitle: 'Charaka & Sushruta Samhita',
      icon: Sparkles,
      color: 'forest'
    },
    card2: {
      title: 'Divine Healing',
      subtitle: 'Classical Formulations',
      icon: Award,
      color: 'brass'
    }
  },
  {
    id: 2,
    badge: 'Tri-Dosha Balance',
    title: 'Mind-Body Harmony',
    subtitle: 'Harmonizing Vata, Pitta & Kapha with Pure Herbs',
    image: '/images/home_slider/herbal_preparation_tridosha.png',
    card1: {
      title: 'Tri-Dosha Harmony',
      subtitle: 'Vata • Pitta • Kapha',
      icon: ShieldCheck,
      color: 'brass'
    },
    card2: {
      title: 'Pure Botanicals',
      subtitle: 'Handcrafted Formulations',
      icon: Leaf,
      color: 'forest'
    }
  },
  {
    id: 3,
    badge: 'Doctor Consultation',
    title: 'Personalized Clinical Care',
    subtitle: '26+ Years Clinical Excellence • Dr. Anand Krishna (BAMS)',
    image: '/images/home_slider/doctor_patient_consultation.jpg',
    card1: {
      title: 'Personalized Care',
      subtitle: 'Comprehensive Nadi Evaluation',
      icon: HeartHandshake,
      color: 'forest'
    },
    card2: {
      title: '26+ Years Trust',
      subtitle: 'Dr. Anand Krishna (BAMS)',
      icon: Award,
      color: 'brass'
    }
  }
];

export default function HomeImageSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStartX, setTouchStartX] = useState(null);
  const timerRef = useRef(null);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slidesData.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slidesData.length) % slidesData.length);
  }, []);

  useEffect(() => {
    if (isPaused) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      nextSlide();
    }, SLIDE_DURATION);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [currentSlide, isPaused, nextSlide]);

  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;
    if (diff > 50) {
      nextSlide();
    } else if (diff < -50) {
      prevSlide();
    }
    setTouchStartX(null);
  };

  const activeSlide = slidesData[currentSlide];
  const Card1Icon = activeSlide.card1.icon;
  const Card2Icon = activeSlide.card2.icon;

  return (
    <div 
      className="relative w-full max-w-[500px] mx-auto"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Soft Organic Backing Frame */}
      <div className="absolute -inset-3 sm:-inset-4 bg-gradient-to-tr from-brass-400/20 via-forest-800/10 to-transparent rounded-[2.5rem] transform rotate-1 pointer-events-none -z-10" />

      {/* Main Image Container */}
      <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-earth-200/90 aspect-[4/3] sm:aspect-[16/11] lg:aspect-[4/3] bg-forest-950 group">
        
        {/* Crossfade Image Transition */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.04, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.98, x: -20 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="absolute inset-0 w-full h-full"
          >
            <img
              src={activeSlide.image}
              alt={activeSlide.title}
              className="w-full h-full object-cover object-center"
            />
          </motion.div>
        </AnimatePresence>

        {/* Subtle Editorial Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-forest-950/85 via-forest-950/25 to-forest-950/10 flex flex-col justify-between p-5 sm:p-7 text-cream-50 pointer-events-none">
          
          {/* Top Slide Header inside Card */}
          <div className="flex items-center justify-between z-10">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-forest-950/85 backdrop-blur-md border border-brass-400/35 text-brass-400 text-xs font-semibold tracking-wider shadow-sm">
              <Leaf className="w-3.5 h-3.5 text-brass-400" />
              <span>{activeSlide.badge}</span>
            </div>

            <div className="px-3 py-1 rounded-full bg-forest-950/85 backdrop-blur-md border border-white/20 text-cream-50 text-[11px] font-mono tracking-wider">
              0{currentSlide + 1} / 0{slidesData.length}
            </div>
          </div>

          {/* Bottom Caption Pill */}
          <div className="z-10">
            <p className="text-xs text-cream-200/90 font-light drop-shadow">
              {activeSlide.subtitle} • Sri Krishna Ayurvedic Clinic
            </p>
          </div>
        </div>

        {/* Minimal Arrow Controls Inside Card */}
        <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-3 z-20 pointer-events-none">
          <button
            onClick={prevSlide}
            className="p-2.5 rounded-full bg-forest-950/75 hover:bg-forest-900 text-cream-50 backdrop-blur-md border border-white/20 transition-all transform hover:scale-105 active:scale-95 pointer-events-auto shadow-md cursor-pointer"
            aria-label="Previous Slide"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={nextSlide}
            className="p-2.5 rounded-full bg-forest-950/75 hover:bg-forest-900 text-cream-50 backdrop-blur-md border border-white/20 transition-all transform hover:scale-105 active:scale-95 pointer-events-auto shadow-md cursor-pointer"
            aria-label="Next Slide"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* FLOATING CARD 1: (Top-Left attached to card) */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`card1-${currentSlide}`}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.4 }}
          className="absolute -top-5 -left-3 sm:-left-6 bg-white/95 backdrop-blur-md p-3 sm:p-3.5 rounded-2xl border border-earth-200 shadow-elevated z-30 flex items-center gap-2.5 max-w-[205px] pointer-events-none hidden sm:flex"
        >
          <div className="w-8 h-8 rounded-full bg-forest-100 text-forest-900 flex items-center justify-center shrink-0">
            <Card1Icon className="w-4 h-4 text-forest-800" />
          </div>
          <div>
            <p className="text-sm font-serif font-bold text-forest-950 leading-tight">
              {activeSlide.card1.title}
            </p>
            <p className="text-[11.5px] text-earth-800 leading-tight font-medium">
              {activeSlide.card1.subtitle}
            </p>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* FLOATING CARD 2: (Bottom-Right attached to card) */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`card2-${currentSlide}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.4 }}
          className="absolute -bottom-5 -right-3 sm:-right-6 bg-white/95 backdrop-blur-md p-3 sm:p-3.5 rounded-2xl border border-earth-200 shadow-elevated z-30 flex items-center gap-2.5 max-w-[210px] pointer-events-none hidden sm:flex"
        >
          <div className="w-8 h-8 rounded-full bg-brass-100 text-brass-900 flex items-center justify-center shrink-0">
            <Card2Icon className="w-4 h-4 text-brass-700" />
          </div>
          <div>
            <p className="text-sm font-serif font-bold text-forest-950 leading-tight">
              {activeSlide.card2.title}
            </p>
            <p className="text-[11.5px] text-earth-800 leading-tight font-medium">
              {activeSlide.card2.subtitle}
            </p>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Progress Dots Indicator */}
      <div className="flex items-center justify-center gap-2 pt-6">
        {slidesData.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
              currentSlide === idx 
                ? 'w-8 bg-forest-900' 
                : 'w-2 bg-earth-300 hover:bg-earth-400'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
