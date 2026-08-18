import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, ArrowRight, Sparkles, ChevronLeft, ChevronRight, Leaf, HeartHandshake, ShieldCheck, Award } from 'lucide-react';
import { clinicData } from '../data/clinicData';

export default function Hero({ onOpenBooking }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStartX, setTouchStartX] = useState(null);
  const slides = clinicData.heroSlides || [];

  const nextSlide = useCallback(() => {
    if (slides.length <= 1) return;
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    if (slides.length <= 1) return;
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  // Auto-advance slides every 5.5s unless hovered
  useEffect(() => {
    if (isPaused || slides.length <= 1) return;
    const interval = setInterval(nextSlide, 5500);
    return () => clearInterval(interval);
  }, [isPaused, nextSlide, slides.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'ArrowRight') nextSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [prevSlide, nextSlide]);

  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;
    if (diff > 50) nextSlide();
    if (diff < -50) prevSlide();
    setTouchStartX(null);
  };

  const activeSlide = slides[currentSlide] || slides[0];

  return (
    <section 
      id="hero" 
      className="relative min-h-[calc(100vh-4rem)] flex flex-col justify-center py-12 lg:py-16 overflow-hidden bg-gradient-to-b from-cream-50 via-cream-100/40 to-cream-50"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Soft Ambient Organic Shapes & Subtle Glow */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-forest-100/40 rounded-full filter blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-10 right-0 w-1/3 h-full bg-cream-100/70 rounded-l-[120px] pointer-events-none -z-10 hidden lg:block" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-brass-100/30 rounded-full filter blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          
          {/* LEFT SIDE: Concise, Authoritative & Inviting Copy */}
          <div className="lg:col-span-6 space-y-6 sm:space-y-7 text-left">
            
            {/* Small Eyebrow Badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-forest-900/90 text-brass-400 border border-forest-800/80 text-xs font-semibold uppercase tracking-wider shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5 text-brass-400" />
              <span>TRADITIONAL AYURVEDA • MODERN CARE</span>
            </motion.div>

            {/* Main Headline & Supporting Text Animated with Crossfade */}
            <div className="min-h-[160px] sm:min-h-[170px] flex flex-col justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -14 }}
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

          {/* RIGHT SIDE: Hero Visual Composition with Floating Information Cards */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              
              {/* Soft Organic Backing Glow & Frame */}
              <div className="absolute -inset-3 sm:-inset-4 bg-gradient-to-tr from-brass-400/20 via-forest-800/10 to-transparent rounded-[2.5rem] transform rotate-1 pointer-events-none" />

              {/* Main Rounded Image Container */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-earth-200/90 aspect-[4/3] sm:aspect-[16/11] lg:aspect-[4/3] bg-forest-950 group">
                
                {/* Crossfade Image Slides */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.65, ease: 'easeOut' }}
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
                <div className="absolute inset-0 bg-gradient-to-t from-forest-950/80 via-forest-950/20 to-transparent flex flex-col justify-between p-5 sm:p-6 text-cream-50 pointer-events-none">
                  
                  {/* Top Slide Badge */}
                  <div className="flex items-center justify-between z-10">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-forest-950/85 backdrop-blur-md border border-brass-400/30 text-brass-400 text-[11px] font-semibold tracking-wider">
                      <Leaf className="w-3 h-3 text-brass-400" />
                      <span>{activeSlide.badge}</span>
                    </div>

                    <div className="px-3 py-1 rounded-full bg-forest-950/85 backdrop-blur-md border border-white/20 text-cream-50 text-[11px] font-mono tracking-wider">
                      0{currentSlide + 1} / 0{slides.length}
                    </div>
                  </div>

                  {/* Bottom Caption Pill */}
                  <div className="z-10">
                    <p className="text-xs text-cream-200/90 font-light drop-shadow">
                      {activeSlide.highlight} • Sri Krishna Ayurvedic Clinic
                    </p>
                  </div>
                </div>

                {/* Minimal Arrow Slider Controls */}
                <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-3 z-20 pointer-events-none">
                  <button
                    onClick={prevSlide}
                    className="p-2.5 rounded-full bg-forest-950/70 hover:bg-forest-900 text-cream-50 backdrop-blur-md border border-white/20 transition-all transform hover:scale-105 pointer-events-auto shadow-md"
                    aria-label="Previous Slide"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={nextSlide}
                    className="p-2.5 rounded-full bg-forest-950/70 hover:bg-forest-900 text-cream-50 backdrop-blur-md border border-white/20 transition-all transform hover:scale-105 pointer-events-auto shadow-md"
                    aria-label="Next Slide"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

              </div>

              {/* FLOATING CARD 1: Personalized Care (Top Right) */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
                className="absolute -top-5 -right-3 sm:-right-6 bg-white/95 backdrop-blur-md p-3.5 sm:p-4 rounded-2xl border border-earth-200 shadow-elevated z-30 flex items-center gap-3 max-w-[210px]"
              >
                <div className="w-9 h-9 rounded-full bg-forest-100 text-forest-900 flex items-center justify-center shrink-0">
                  <HeartHandshake className="w-5 h-5 text-forest-800" />
                </div>
                <div>
                  <p className="text-xs font-serif font-bold text-forest-950 leading-tight">Personalized Care</p>
                  <p className="text-[11px] text-earth-700 leading-tight font-light">Tailored to your needs</p>
                </div>
              </motion.div>

              {/* FLOATING CARD 2: Holistic Wellness (Bottom Left) */}
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ repeat: Infinity, duration: 4.5, ease: 'easeInOut', delay: 0.5 }}
                className="absolute -bottom-5 -left-3 sm:-left-6 bg-white/95 backdrop-blur-md p-3.5 sm:p-4 rounded-2xl border border-earth-200 shadow-elevated z-30 flex items-center gap-3 max-w-[220px]"
              >
                <div className="w-9 h-9 rounded-full bg-brass-100 text-brass-900 flex items-center justify-center shrink-0">
                  <Award className="w-5 h-5 text-brass-700" />
                </div>
                <div>
                  <p className="text-xs font-serif font-bold text-forest-950 leading-tight">Holistic Wellness</p>
                  <p className="text-[11px] text-earth-700 leading-tight font-light">Mind • Body • Balance</p>
                </div>
              </motion.div>

            </div>

            {/* Slider Dots / Progress Navigation */}
            <div className="flex items-center justify-center gap-2 pt-8">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    currentSlide === idx
                      ? 'w-8 bg-forest-900'
                      : 'w-2.5 bg-earth-300 hover:bg-earth-400'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
