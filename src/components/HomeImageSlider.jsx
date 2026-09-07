import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  Leaf,
  Sparkles,
  HeartHandshake,
  ShieldCheck,
  Award,
  Calendar,
  Clock,
  MapPin,
  Heart,
  Star,
  Info
} from 'lucide-react';
import { getHeroSliderSettings, defaultHeroSlider } from '../utils/adminStorage';

const ICON_MAP = {
  Sparkles,
  Award,
  ShieldCheck,
  Leaf,
  HeartHandshake,
  Calendar,
  Clock,
  MapPin,
  Heart,
  Star,
  Info
};

function resolveIcon(iconName, defaultIcon = Sparkles) {
  if (!iconName) return defaultIcon;
  if (typeof iconName === 'function' || typeof iconName === 'object') return iconName;
  return ICON_MAP[iconName] || defaultIcon;
}

export default function HomeImageSlider({ previewData = null }) {
  const [sliderConfig, setSliderConfig] = useState(() => {
    if (previewData) return previewData;
    return getHeroSliderSettings() || defaultHeroSlider;
  });

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHoverPaused, setIsHoverPaused] = useState(false);
  const [touchStartX, setTouchStartX] = useState(null);
  const timerRef = useRef(null);

  // Sync with previewData prop
  useEffect(() => {
    if (previewData) {
      setSliderConfig(previewData);
      setCurrentSlide(0);
    }
  }, [previewData]);

  // Listen to live update event on public pages
  useEffect(() => {
    if (previewData) return;

    const handleUpdate = (e) => {
      if (e.detail) {
        setSliderConfig(e.detail);
        setCurrentSlide(0);
      }
    };

    window.addEventListener('sk_hero_slider_updated', handleUpdate);
    return () => window.removeEventListener('sk_hero_slider_updated', handleUpdate);
  }, [previewData]);

  // Extract enabled slides (in preview mode, show all or enabled)
  const rawSlides = Array.isArray(sliderConfig?.slides) ? sliderConfig.slides : defaultHeroSlider.slides;
  const slides = previewData
    ? rawSlides
    : rawSlides.filter(s => s.enabled !== false);

  const totalSlides = slides.length > 0 ? slides.length : 1;
  const safeCurrentSlide = currentSlide < totalSlides ? currentSlide : 0;
  const activeSlide = slides[safeCurrentSlide] || defaultHeroSlider.slides[0];

  const slideDuration = sliderConfig?.autoSlideDuration || 5000;
  const isGlobalPaused = sliderConfig?.isPaused || false;

  const nextSlide = useCallback(() => {
    if (slides.length <= 1) return;
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    if (slides.length <= 1) return;
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  useEffect(() => {
    if (isGlobalPaused || isHoverPaused || slides.length <= 1) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      nextSlide();
    }, slideDuration);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [safeCurrentSlide, isGlobalPaused, isHoverPaused, nextSlide, slideDuration, slides.length]);

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

  const Card1Icon = resolveIcon(activeSlide.card1?.icon, Sparkles);
  const Card2Icon = resolveIcon(activeSlide.card2?.icon, Award);

  return (
    <div 
      className="relative w-full max-w-[500px] mx-auto"
      onMouseEnter={() => setIsHoverPaused(true)}
      onMouseLeave={() => setIsHoverPaused(false)}
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
            key={activeSlide.id || safeCurrentSlide}
            initial={{ opacity: 0, scale: 1.04, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.98, x: -20 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="absolute inset-0 w-full h-full"
          >
            <picture className="w-full h-full">
              {activeSlide.mobileImage && (
                <source media="(max-width: 640px)" srcSet={activeSlide.mobileImage} />
              )}
              <img
                src={activeSlide.image || '/images/home_slider/ayurveda_heritage_dhanvantari.png'}
                alt={activeSlide.altText || activeSlide.title || 'Hero Slider'}
                className="w-full h-full object-cover object-center"
              />
            </picture>
          </motion.div>
        </AnimatePresence>

        {/* Subtle Editorial Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-forest-950/85 via-forest-950/25 to-forest-950/10 flex flex-col justify-between p-5 sm:p-7 text-cream-50 pointer-events-none">
          
          {/* Top Slide Header inside Card */}
          <div className="flex items-center justify-between z-10">
            {activeSlide.badge ? (
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-forest-950/85 backdrop-blur-md border border-brass-400/35 text-brass-400 text-xs font-semibold tracking-wider shadow-sm">
                <Leaf className="w-3.5 h-3.5 text-brass-400" />
                <span>{activeSlide.badge}</span>
              </div>
            ) : <div />}

            <div className="px-3 py-1 rounded-full bg-forest-950/85 backdrop-blur-md border border-white/20 text-cream-50 text-[11px] font-mono tracking-wider">
              {safeCurrentSlide + 1 < 10 ? `0${safeCurrentSlide + 1}` : safeCurrentSlide + 1} / {totalSlides < 10 ? `0${totalSlides}` : totalSlides}
            </div>
          </div>

          {/* Bottom Caption Pill */}
          <div className="z-10">
            <p className="text-xs text-cream-200/90 font-light drop-shadow">
              {activeSlide.caption || activeSlide.subtitle || activeSlide.title}
            </p>
          </div>
        </div>

        {/* Minimal Arrow Controls Inside Card */}
        {slides.length > 1 && (
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
        )}

      </div>

      {/* FLOATING CARD 1: (Top-Left attached to card) */}
      {activeSlide.card1?.title && (
        <AnimatePresence mode="wait">
          <motion.div
            key={`card1-${activeSlide.id || safeCurrentSlide}`}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.4 }}
            className="absolute -top-5 -left-3 sm:-left-6 bg-white/95 backdrop-blur-md p-3 sm:p-3.5 rounded-2xl border border-earth-200 shadow-elevated z-30 flex items-center gap-2.5 max-w-[205px] pointer-events-none hidden sm:flex"
          >
            <div className={`w-8 h-8 rounded-full ${activeSlide.card1.color === 'brass' ? 'bg-brass-100 text-brass-900' : 'bg-forest-100 text-forest-900'} flex items-center justify-center shrink-0`}>
              <Card1Icon className={`w-4 h-4 ${activeSlide.card1.color === 'brass' ? 'text-brass-700' : 'text-forest-800'}`} />
            </div>
            <div>
              <p className="text-xs font-serif font-bold text-forest-950 leading-tight">
                {activeSlide.card1.title}
              </p>
              {activeSlide.card1.subtitle && (
                <p className="text-[10px] text-earth-700 leading-tight font-light">
                  {activeSlide.card1.subtitle}
                </p>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      )}

      {/* FLOATING CARD 2: (Bottom-Right attached to card) */}
      {activeSlide.card2?.title && (
        <AnimatePresence mode="wait">
          <motion.div
            key={`card2-${activeSlide.id || safeCurrentSlide}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className="absolute -bottom-5 -right-3 sm:-right-6 bg-white/95 backdrop-blur-md p-3 sm:p-3.5 rounded-2xl border border-earth-200 shadow-elevated z-30 flex items-center gap-2.5 max-w-[210px] pointer-events-none hidden sm:flex"
          >
            <div className={`w-8 h-8 rounded-full ${activeSlide.card2.color === 'forest' ? 'bg-forest-100 text-forest-900' : 'bg-brass-100 text-brass-900'} flex items-center justify-center shrink-0`}>
              <Card2Icon className={`w-4 h-4 ${activeSlide.card2.color === 'forest' ? 'text-forest-800' : 'text-brass-700'}`} />
            </div>
            <div>
              <p className="text-xs font-serif font-bold text-forest-950 leading-tight">
                {activeSlide.card2.title}
              </p>
              {activeSlide.card2.subtitle && (
                <p className="text-[10px] text-earth-700 leading-tight font-light">
                  {activeSlide.card2.subtitle}
                </p>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      )}

      {/* Progress Dots Indicator */}
      {slides.length > 1 && (
        <div className="flex items-center justify-center gap-2 pt-6">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                safeCurrentSlide === idx 
                  ? 'w-8 bg-forest-900' 
                  : 'w-2 bg-earth-300 hover:bg-earth-400'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
