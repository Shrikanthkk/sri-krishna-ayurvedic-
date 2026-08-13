import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, ArrowDownRight, Sparkles, MapPin, Award, ChevronLeft, ChevronRight, Leaf, ShieldAlert, HeartHandshake } from 'lucide-react';
import { clinicData } from '../data/clinicData';

export default function Hero({ onOpenBooking }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const slides = clinicData.heroSlides || [];

  // Auto-advance slide every 4.5 seconds unless hovered
  useEffect(() => {
    if (isPaused || slides.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isPaused, slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const activeSlideData = slides[currentSlide] || slides[0];

  return (
    <section id="hero" className="relative min-h-screen flex flex-col justify-center pt-8 pb-16 overflow-hidden bg-cream-50">
      {/* Decorative Subtle Background Elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-cream-100/60 -z-10 rounded-l-[140px] hidden lg:block" />
      <div className="absolute top-1/4 left-10 w-80 h-80 bg-forest-100/40 rounded-full filter blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          
          {/* Left Editorial Content Focused on Integrative Ayurvedic Cancer Care */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 space-y-7"
          >
            {/* Prominent Small Highlight Label */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-forest-900 text-brass-400 border border-forest-800 text-xs font-semibold uppercase tracking-widest shadow-md">
              <Sparkles className="w-3.5 h-3.5 text-brass-400" />
              <span>AYURVEDIC • KR PURAM</span>
            </div>

            {/* Main Headline & Supporting Headline */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-light text-forest-950 leading-[1.08] tracking-tight">
                Cancer Care Through the Wisdom of Ayurveda
              </h1>
              <p className="text-lg sm:text-xl font-serif italic text-brass-700 font-medium">
                "Traditional Ayurvedic Care. Personalised Guidance. Compassionate Support."
              </p>
            </div>

            {/* Introductory Paragraph */}
            <p className="text-sm sm:text-base text-earth-800 leading-relaxed font-normal">
              At Sri Krishna Ayurvedic Clinic, we provide personalised Ayurvedic consultation and traditional wellness care for individuals seeking an integrated approach to cancer care. Our focus is on understanding each person's needs and providing thoughtful guidance rooted in Ayurvedic principles.
            </p>

            {/* Responsible Medical Disclaimer Banner */}
            <div className="p-3.5 bg-amber-500/10 border-l-4 border-amber-600 rounded-r-xl flex items-start gap-3 text-xs text-earth-900">
              <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <p className="leading-normal font-medium">
                <strong>Medical Notice:</strong> Ayurvedic care should be discussed with qualified healthcare professionals and should not replace medically recommended cancer diagnosis or treatment.
              </p>
            </div>

            {/* Primary & Secondary CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-1">
              <button
                onClick={() => onOpenBooking('Integrative Cancer Care Consultation')}
                className="px-7 py-4 bg-forest-900 hover:bg-forest-800 text-cream-50 font-semibold text-xs tracking-ultra uppercase -skew-x-12 shadow-elevated transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center gap-2 group border-0 cursor-pointer"
                style={{ borderRadius: '2px 6px 2px 6px' }}
              >
                <span className="skew-x-12 flex items-center gap-2 whitespace-nowrap">
                  <Calendar className="w-4 h-4 text-brass-400 group-hover:scale-110 transition-transform" />
                  <span>BOOK A CANCER CONSULTATION →</span>
                </span>
              </button>

              <a
                href="#cancer"
                className="px-7 py-4 bg-cream-100 hover:bg-earth-200 text-forest-900 font-semibold text-xs tracking-ultra uppercase -skew-x-12 border border-earth-200 transition-all duration-300 text-center flex items-center justify-center gap-2 group"
                style={{ borderRadius: '2px 6px 2px 6px' }}
              >
                <span className="skew-x-12 flex items-center gap-2 whitespace-nowrap">
                  <span>LEARN ABOUT OUR APPROACH →</span>
                  <ArrowDownRight className="w-4 h-4 text-forest-700 group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform" />
                </span>
              </a>
            </div>

            {/* Cancer Section Preview Highlight Box */}
            <div className="p-4 bg-white/90 rounded-2xl border border-earth-200 shadow-sm space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-forest-950 uppercase tracking-wider">
                <HeartHandshake className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Exploring an Ayurvedic approach to cancer care?</span>
              </div>
              <p className="text-xs text-earth-800 leading-relaxed">
                Learn about our consultation process, traditional Ayurvedic practices, and the supportive care approach offered at Sri Krishna Ayurvedic Clinic.
              </p>
              <a
                href="#cancer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-900 tracking-wider uppercase pt-1"
              >
                <span>EXPLORE CANCER CARE →</span>
              </a>
            </div>

            {/* Doctor & Clinic Credentials Badges */}
            <div className="pt-4 border-t border-earth-200 grid grid-cols-2 sm:grid-cols-3 gap-6 text-xs text-forest-900">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-forest-100 flex items-center justify-center text-forest-800 shrink-0">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-semibold">26+ Years Exp.</p>
                  <p className="text-[11px] text-earth-600">Dr. Anand Krishna</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-forest-100 flex items-center justify-center text-forest-800 shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-semibold">KR Puram</p>
                  <p className="text-[11px] text-earth-600">Bangalore</p>
                </div>
              </div>


            </div>

          </motion.div>

          {/* Right Interactive Editorial Hero Slider Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 relative"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              
              {/* Asymmetrical Floating Backing Frame */}
              <div className="absolute -inset-4 border border-brass-500/30 rounded-3xl -rotate-2 scale-[0.98] pointer-events-none hidden sm:block" />

              {/* Main Image Slider Card */}
              <div className="relative rounded-2xl overflow-hidden shadow-elevated border border-earth-200 aspect-[4/5] sm:aspect-[16/14] lg:aspect-[4/5] group bg-forest-950">
                
                {/* Crossfade Images */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1.02 }}
                    exit={{ opacity: 0, scale: 1 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className="absolute inset-0 w-full h-full"
                  >
                    <img
                      src={activeSlideData.image}
                      alt={activeSlideData.title}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Editorial Gradient Overlay */}
                <div className="absolute inset-0 editorial-card-gradient flex flex-col justify-between p-6 sm:p-8 text-cream-50 pointer-events-none">
                  
                  {/* Top Bar inside image */}
                  <div className="flex items-center justify-between z-10">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-forest-950/70 backdrop-blur-md border border-brass-500/30 text-brass-400 text-[10px] uppercase font-semibold tracking-widest">
                      <Leaf className="w-3 h-3 text-brass-400" />
                      <span>{activeSlideData.badge}</span>
                    </div>

                    {/* Counter 01 / 03 */}
                    <div className="px-3 py-1 rounded-full bg-forest-950/70 backdrop-blur-md border border-earth-200/20 text-cream-50 text-[11px] font-serif tracking-widest">
                      0{currentSlide + 1} / 0{slides.length}
                    </div>
                  </div>

                  {/* Slide Specific Content Caption */}
                  <div className="space-y-2 z-10 max-w-md">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentSlide}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.4 }}
                        className="space-y-1"
                      >
                        <span className="text-[10px] font-semibold uppercase tracking-ultra text-brass-400 block">
                          {activeSlideData.tagline}
                        </span>
                        <h3 className="font-serif text-xl sm:text-2xl font-light text-cream-50 leading-snug">
                          {activeSlideData.title}
                        </h3>
                      </motion.div>
                    </AnimatePresence>
                  </div>

                </div>

                {/* Left/Right Slider Arrow Controls */}
                <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-20">
                  <button
                    onClick={prevSlide}
                    className="p-3 rounded-full bg-forest-950/80 hover:bg-brass-500 hover:text-forest-950 text-cream-50 backdrop-blur-md border border-brass-500/30 transition-all transform hover:scale-110 pointer-events-auto shadow-elevated"
                    aria-label="Previous slide"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={nextSlide}
                    className="p-3 rounded-full bg-forest-950/80 hover:bg-brass-500 hover:text-forest-950 text-cream-50 backdrop-blur-md border border-brass-500/30 transition-all transform hover:scale-110 pointer-events-auto shadow-elevated"
                    aria-label="Next slide"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>

                {/* Bottom Slide Dots / Progress Indicators */}
                <div className="absolute bottom-4 right-6 flex items-center gap-1.5 z-20">
                  {slides.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentSlide(idx)}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        currentSlide === idx
                          ? 'w-6 bg-brass-400'
                          : 'w-2 bg-cream-100/40 hover:bg-cream-100/70'
                      }`}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>

              </div>

              {/* Floating Highlight Card */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
                className="absolute -bottom-6 -left-6 bg-cream-50/95 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-earth-200 shadow-elevated max-w-[250px] hidden sm:block z-30"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-forest-900 text-brass-400 flex items-center justify-center font-serif text-lg font-bold">
                    ॐ
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-forest-950 uppercase tracking-wider">Integrative Care</p>
                    <p className="text-[11px] text-earth-800">Supportive Wellness Journey</p>
                  </div>
                </div>
              </motion.div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
