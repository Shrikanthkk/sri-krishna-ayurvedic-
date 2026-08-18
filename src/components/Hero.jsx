import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, ArrowRight, Sparkles, ChevronLeft, ChevronRight, Leaf, HeartHandshake, ShieldCheck, Award } from 'lucide-react';

const SLIDE_DURATION = 5000; // 5 seconds per slide

const slidesData = [
  {
    id: 1,
    badge: 'Personalized Care',
    eyebrow: 'TRADITIONAL AYURVEDA • MODERN CARE',
    title: 'Natural Healing. Personalized Care.',
    subtitle: 'Root-Cause Healing Tailored to Your Prakriti',
    description: 'Experience authentic Ayurvedic healing guided by Dr. Anand Krishna (BAMS, 26+ yrs exp) in KR Puram. Classical Nadi Pariksha, Panchakarma detox, and tailored botanical regimens.',
    image: '/images/consultation.png',
    card1: {
      title: 'Personalized Care',
      subtitle: 'Tailored to your needs',
      icon: HeartHandshake,
      color: 'forest'
    },
    card2: {
      title: '26+ Years Trust',
      subtitle: 'Dr. Anand Krishna (BAMS)',
      icon: Award,
      color: 'brass'
    }
  },
  {
    id: 2,
    badge: 'Holistic Wellness',
    eyebrow: 'HOLISTIC BALANCE & WELLNESS',
    title: 'Restore Balance. Renew Your Wellbeing.',
    subtitle: 'Cellular Detoxification & Mind Relaxation',
    description: 'Harmonize Vata, Pitta, and Kapha through classical Panchakarma detoxification, soothing Shirodhara, and restorative lifestyle guidance in Bangalore.',
    image: '/images/shirodhara.jpg',
    card1: {
      title: 'Holistic Wellness',
      subtitle: 'Mind • Body • Balance',
      icon: Leaf,
      color: 'forest'
    },
    card2: {
      title: 'Cellular Detox',
      subtitle: 'Authentic Panchakarma',
      icon: ShieldCheck,
      color: 'brass'
    }
  },
  {
    id: 3,
    badge: 'Traditional Ayurveda',
    eyebrow: 'ANCIENT WISDOM • THOUGHTFUL CARE',
    title: 'Ancient Wisdom. Thoughtful Care.',
    subtitle: 'Vedic Pulse Reading & Apothecary Remedies',
    description: 'Classical Nadi Pariksha pulse diagnosis paired with pure botanical formulations crafted to traditional standards for sustained vitality and immunity.',
    image: '/images/nadi_pariksha.png',
    card1: {
      title: 'Ancient Diagnostic Art',
      subtitle: 'Nadi Pariksha Pulse Reading',
      icon: Sparkles,
      color: 'forest'
    },
    card2: {
      title: 'Classical Remedies',
      subtitle: 'Handcrafted Botanicals',
      icon: Award,
      color: 'brass'
    }
  }
];

export default function Hero({ onOpenBooking }) {
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

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  // Automatic 5-second slide cycle with clean interval management & pause on hover
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

  // Keyboard accessibility
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'ArrowRight') nextSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [prevSlide, nextSlide]);

  // Mobile Touch Swipe Handling
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
    <section 
      id="hero" 
      className="relative min-h-[calc(100vh-4rem)] flex flex-col justify-center py-12 lg:py-16 overflow-hidden bg-gradient-to-b from-cream-50 via-cream-100/40 to-cream-50"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Subtle Ambient Organic Glows */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-forest-100/40 rounded-full filter blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-10 right-0 w-1/3 h-full bg-cream-100/70 rounded-l-[120px] pointer-events-none -z-10 hidden lg:block" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-brass-100/30 rounded-full filter blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-12 items-center">
          
          {/* LEFT SIDE: Editorial Headline, Supporting Copy & Clear CTAs */}
          <div className="lg:col-span-6 space-y-6 sm:space-y-7 text-left">
            
            {/* Eyebrow Badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-forest-900/90 text-brass-400 border border-forest-800/80 text-xs font-semibold uppercase tracking-wider shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5 text-brass-400" />
              <span>{activeSlide.eyebrow}</span>
            </motion.div>

            {/* Main Headline & Supporting Paragraph with Smooth Fade + Subtle Horizontal Motion */}
            <div className="min-h-[160px] sm:min-h-[170px] flex flex-col justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 16 }}
                  transition={{ duration: 0.45, ease: 'easeOut' }}
                  className="space-y-3"
                >
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-serif font-light text-forest-950 leading-[1.12] tracking-tight">
                    {activeSlide.title}
                  </h1>
                  
                  <p className="text-earth-800 text-sm sm:text-base font-light leading-relaxed max-w-xl">
                    {activeSlide.description}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Primary & Secondary Action CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-1"
            >
              <button
                onClick={() => onOpenBooking('General Ayurvedic Consultation')}
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-forest-900 hover:bg-forest-800 text-cream-50 font-semibold text-xs uppercase tracking-wider rounded-full shadow-elevated transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer group"
              >
                <Calendar className="w-4 h-4 text-brass-400 group-hover:scale-110 transition-transform" />
                <span>Book an Appointment</span>
              </button>

              <Link
                to="/treatments"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 bg-white hover:bg-cream-100 text-forest-950 font-semibold text-xs uppercase tracking-wider rounded-full border border-earth-200 shadow-sm transition-all duration-300 transform hover:-translate-y-0.5"
              >
                <span>Explore Treatments</span>
                <ArrowRight className="w-4 h-4 text-brass-600 transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>

            {/* Trust Indicator Footnote */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="pt-4 border-t border-earth-200/80 space-y-2"
            >
              <p className="text-xs font-medium text-brass-800 tracking-wide flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-forest-700 shrink-0" />
                <span>Trusted Ayurvedic Care • Personalized Treatment • Holistic Wellness</span>
              </p>

              <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-xs text-earth-700 font-light">
                <span>👨‍⚕️ <strong>Dr. Anand Krishna</strong> (BAMS, 26+ Yrs Exp.)</span>
                <span>📍 KR Puram, Bangalore</span>
              </div>
            </motion.div>

          </div>

          {/* RIGHT SIDE: Auto-Sliding Visual with Smooth Crossfade & Floating Cards */}
          <div className="lg:col-span-6 relative flex flex-col items-center">
            
            <div className="relative w-full max-w-[480px] lg:max-w-[500px]">
              
              {/* Soft Organic Backing Frame */}
              <div className="absolute -inset-3 sm:-inset-4 bg-gradient-to-tr from-brass-400/20 via-forest-800/10 to-transparent rounded-[2.5rem] transform rotate-1 pointer-events-none -z-10" />

              {/* Main Image Container */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-earth-200/90 aspect-[4/3] sm:aspect-[16/11] lg:aspect-[4/3] bg-forest-950 group">
                
                {/* Crossfade Image Transition with Subtle Scale and Horizontal Motion */}
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

              {/* FLOATING CARD 1: (Top-Left attached to hero card) */}
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
                    <p className="text-xs font-serif font-bold text-forest-950 leading-tight">
                      {activeSlide.card1.title}
                    </p>
                    <p className="text-[10px] text-earth-700 leading-tight font-light">
                      {activeSlide.card1.subtitle}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* FLOATING CARD 2: (Bottom-Right attached to hero card) */}
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
                    <p className="text-xs font-serif font-bold text-forest-950 leading-tight">
                      {activeSlide.card2.title}
                    </p>
                    <p className="text-[10px] text-earth-700 leading-tight font-light">
                      {activeSlide.card2.subtitle}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>

            </div>

            {/* SLIDE PROGRESS CONTROLS & 5-SECOND PROGRESS INDICATOR */}
            <div className="flex items-center justify-between w-full max-w-[480px] lg:max-w-[500px] pt-8 px-2">
              
              {/* Minimal Counter + 5-Second Animated Progress Bar */}
              <div className="flex items-center gap-4">
                <span className="font-mono text-xs font-bold text-forest-950">
                  0{currentSlide + 1} <span className="text-earth-400 font-normal">/ 0{slidesData.length}</span>
                </span>

                {/* 3 Progress Indicators with Smooth 5s Fill Animation on Active Slide */}
                <div className="flex items-center gap-2">
                  {slidesData.map((_, idx) => {
                    const isActive = currentSlide === idx;
                    return (
                      <button
                        key={idx}
                        onClick={() => goToSlide(idx)}
                        className={`h-2 rounded-full overflow-hidden transition-all duration-300 cursor-pointer relative ${
                          isActive ? 'w-10 bg-earth-200' : 'w-2.5 bg-earth-300 hover:bg-earth-400'
                        }`}
                        aria-label={`Go to slide ${idx + 1}`}
                      >
                        {isActive && (
                          <motion.div
                            key={`progress-${currentSlide}-${isPaused}`}
                            initial={{ width: '0%' }}
                            animate={{ width: isPaused ? '0%' : '100%' }}
                            transition={{
                              duration: isPaused ? 0 : SLIDE_DURATION / 1000,
                              ease: 'linear'
                            }}
                            className="h-full bg-forest-900 rounded-full"
                          />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Manual Arrow Navigation Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={prevSlide}
                  className="p-2.5 rounded-full bg-white hover:bg-forest-900 hover:text-cream-50 text-forest-950 border border-earth-200 shadow-sm transition-all duration-200 transform hover:scale-105 active:scale-95 cursor-pointer"
                  aria-label="Previous Slide"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                
                <button
                  onClick={nextSlide}
                  className="p-2.5 rounded-full bg-white hover:bg-forest-900 hover:text-cream-50 text-forest-950 border border-earth-200 shadow-sm transition-all duration-200 transform hover:scale-105 active:scale-95 cursor-pointer"
                  aria-label="Next Slide"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
