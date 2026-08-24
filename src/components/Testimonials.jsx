import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, ChevronLeft, ChevronRight, Star, ShieldCheck, Pause, Play } from 'lucide-react';
import { clinicData } from '../data/clinicData';

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const total = clinicData.testimonials.length;

  // Auto slide every 4.5 seconds
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % total);
    }, 4500);
    return () => clearInterval(interval);
  }, [isPaused, total]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % total);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  };

  // Get 3 visible items for desktop sliding window
  const getVisibleTestimonials = () => {
    const items = [];
    for (let i = 0; i < 3; i++) {
      const idx = (currentIndex + i) % total;
      items.push({ ...clinicData.testimonials[idx], displayKey: `${clinicData.testimonials[idx].id}-${currentIndex}-${i}` });
    }
    return items;
  };

  const visibleItems = getVisibleTestimonials();

  return (
    <section 
      id="reviews" 
      className="py-24 bg-cream-100/70 relative overflow-hidden border-t border-earth-200"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <span className="text-xs uppercase tracking-ultra font-semibold text-brass-600 block">
            07 • Verified Patient Experiences
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-light text-forest-950 leading-tight">
            Healing Stories & Patient Reviews
          </h2>
          <p className="text-earth-800 text-sm sm:text-base font-light leading-relaxed">
            Real feedback from patients treated by Senior Physician Dr. Anand Krishna & team in KR Puram, Bangalore.
          </p>
        </div>

        {/* Auto-Sliding Multi-Card Carousel Window */}
        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
            <AnimatePresence mode="popLayout">
              {visibleItems.map((item, index) => (
                <motion.div
                  key={item.displayKey}
                  initial={{ opacity: 0, x: 50, scale: 0.95 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -50, scale: 0.95 }}
                  transition={{ duration: 0.45, ease: "easeOut", delay: index * 0.08 }}
                  className={`bg-white rounded-3xl p-7 sm:p-8 border border-earth-200 shadow-elevated flex flex-col justify-between relative group hover:border-brass-400 hover:shadow-[0_20px_45px_rgba(28,59,44,0.12)] transition-all duration-300 ${
                    index === 1 ? 'md:flex border-brass-400/40 ring-1 ring-brass-400/20' : index === 2 ? 'hidden lg:flex' : 'flex'
                  }`}
                >
                  {/* Decorative Quote Watermark */}
                  <Quote className="w-12 h-12 text-brass-500/10 absolute top-6 right-6 pointer-events-none group-hover:text-brass-500/20 transition-colors" />

                  <div className="space-y-4 relative z-10">
                    {/* Header: 5 Stars + Verified Badge */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-brass-500">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-brass-500 text-brass-500" />
                        ))}
                      </div>
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/60">
                        <ShieldCheck className="w-3 h-3 text-emerald-600" />
                        <span>Google Review</span>
                      </span>
                    </div>

                    {/* Review Quote Text */}
                    <p className="text-xs sm:text-[13px] text-earth-900 leading-relaxed font-light italic line-clamp-6">
                      "{item.quote}"
                    </p>
                  </div>

                  {/* Footer: Author & Therapy Category */}
                  <div className="pt-5 mt-6 border-t border-earth-100 flex items-center justify-between gap-2">
                    <div className="truncate">
                      <h4 className="font-serif text-sm font-semibold text-forest-950 truncate">
                        {item.author}
                      </h4>
                      <p className="text-[10.5px] text-earth-600 truncate">
                        {item.locality}
                      </p>
                    </div>
                    <span className="shrink-0 px-2.5 py-1 rounded-full bg-cream-100 text-forest-900 text-[9.5px] font-bold tracking-wider uppercase border border-earth-200/70">
                      {item.treatment}
                    </span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Carousel Controls & Pagination Dots */}
        <div className="flex items-center justify-between flex-wrap gap-4 pt-10 mt-6 border-t border-earth-200/80">
          
          {/* Status Indicator & Live Auto-slide Badge */}
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-2.5 w-2.5">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isPaused ? 'bg-earth-400' : 'bg-emerald-400'}`}></span>
              <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${isPaused ? 'bg-earth-500' : 'bg-emerald-500'}`}></span>
            </span>
            <span className="text-xs text-earth-700 font-medium tracking-wide flex items-center gap-1.5">
              <span>{isPaused ? 'Paused (Hovered)' : 'Auto-sliding'}</span>
              <span className="text-earth-400">•</span>
              <span className="text-forest-950 font-semibold">{currentIndex + 1} of {total} reviews</span>
            </span>
          </div>

          {/* Dots Indicator */}
          <div className="flex items-center gap-1.5 overflow-x-auto py-1">
            {clinicData.testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer border-0 ${
                  currentIndex === idx
                    ? 'bg-forest-900 w-7'
                    : 'bg-earth-300 hover:bg-earth-500 w-2'
                }`}
                aria-label={`Go to testimonial ${idx + 1}`}
              />
            ))}
          </div>

          {/* Navigation Arrows */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsPaused(!isPaused)}
              className="p-2.5 rounded-full border border-earth-200 hover:bg-forest-900 hover:text-cream-50 text-forest-900 bg-white shadow-xs transition-colors cursor-pointer"
              aria-label={isPaused ? "Play auto slide" : "Pause auto slide"}
              title={isPaused ? "Play" : "Pause"}
            >
              {isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
            </button>
            <button
              onClick={handlePrev}
              className="p-2.5 rounded-full border border-earth-200 hover:bg-forest-900 hover:text-cream-50 text-forest-900 bg-white shadow-xs transition-colors cursor-pointer"
              aria-label="Previous testimonials"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              className="p-2.5 rounded-full border border-earth-200 hover:bg-forest-900 hover:text-cream-50 text-forest-900 bg-white shadow-xs transition-colors cursor-pointer"
              aria-label="Next testimonials"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
