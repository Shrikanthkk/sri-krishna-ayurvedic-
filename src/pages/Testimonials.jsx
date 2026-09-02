import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Calendar, MessageSquareQuote, ShieldCheck, ChevronLeft, ChevronRight, Pause, Play, Sparkles, Filter } from 'lucide-react';
import PageHero from '../components/PageHero';
import Breadcrumb from '../components/Breadcrumb';
import { clinicData } from '../data/clinicData';

export default function Testimonials() {
  const [selectedFilter, setSelectedFilter] = useState('ALL');
  const [autoIndex, setAutoIndex] = useState(0);
  const [isAutoPaused, setIsAutoPaused] = useState(false);
  const total = clinicData.testimonials.length;

  // Auto sliding carousel every 4.5 seconds
  useEffect(() => {
    if (isAutoPaused) return;
    const timer = setInterval(() => {
      setAutoIndex((prev) => (prev + 1) % total);
    }, 4500);
    return () => clearInterval(timer);
  }, [isAutoPaused, total]);

  const nextAuto = () => setAutoIndex((prev) => (prev + 1) % total);
  const prevAuto = () => setAutoIndex((prev) => (prev - 1 + total) % total);

  // Auto sliding 3 cards window
  const slidingCards = [
    clinicData.testimonials[autoIndex],
    clinicData.testimonials[(autoIndex + 1) % total],
    clinicData.testimonials[(autoIndex + 2) % total]
  ];

  // Filters
  const filterCategories = [
    { id: 'ALL', label: 'All Reviews' },
    { id: 'Pain', label: 'Spine & Pain Relief' },
    { id: 'Physio', label: 'Physiotherapy' },
    { id: 'Nadi', label: 'Nadi & Digestive' },
    { id: 'Allergy', label: 'Allergy & Wellness' }
  ];

  const filteredList = clinicData.testimonials.filter((item) => {
    if (selectedFilter === 'ALL') return true;
    if (selectedFilter === 'Pain') return item.treatment.includes('Pain') || item.treatment.includes('Joint') || item.treatment.includes('Spine') || item.treatment.includes('Nerve');
    if (selectedFilter === 'Physio') return item.treatment.includes('Physio');
    if (selectedFilter === 'Nadi') return item.treatment.includes('Digestive') || item.treatment.includes('General');
    if (selectedFilter === 'Allergy') return item.treatment.includes('Allergy');
    return true;
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <PageHero
        badge="VERIFIED PATIENT REVIEWS"
        title="Patient Feedback & Healing Stories"
        subtitle="Authentic Google Reviews and heartfelt reviews from patients treated by Senior Physician Dr. Anand Krishna & clinical team in KR Puram."
        bgImage="/images/hero_stock_1.jpg"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Breadcrumb items={[{ label: 'Reviews' }]} />

        {/* 1. AUTO-SLIDING FEATURED CARDS CAROUSEL */}
        <section 
          className="mb-16 bg-gradient-to-b from-cream-50 to-cream-100/60 p-6 sm:p-10 rounded-3xl border border-earth-200 shadow-elevated relative overflow-hidden"
          onMouseEnter={() => setIsAutoPaused(true)}
          onMouseLeave={() => setIsAutoPaused(false)}
        >
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-earth-200">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Sparkles className="w-4 h-4 text-brass-500" />
                <span className="text-[11px] font-bold uppercase tracking-widest text-brass-600">Featured Spotlight Carousel</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl text-forest-950 font-light">
                Auto-Rotating Patient Reviews
              </h3>
            </div>

            {/* Google Reviews Official Button */}
            <div className="flex items-center gap-3">
              <a
                href={clinicData.contact.googleReviewsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white hover:bg-forest-900 text-forest-900 hover:text-cream-50 text-xs font-semibold border border-earth-200 shadow-xs transition-colors group"
              >
                <Star className="w-3.5 h-3.5 fill-brass-500 text-brass-500" />
                <span>Google Reviews (4.9★)</span>
                <span className="text-earth-400 group-hover:text-cream-50">↗</span>
              </a>
            </div>
          </div>

          {/* Carousel with Side Navigation Arrows */}
          <div className="relative group/carousel">
            {/* Floating Left Slide Button */}
            <button
              onClick={prevAuto}
              className="absolute -left-3 sm:-left-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-white border border-earth-200 text-forest-950 shadow-elevated hover:bg-forest-900 hover:text-cream-50 flex items-center justify-center transition-all duration-300 cursor-pointer hover:scale-110 active:scale-95"
              aria-label="Slide to previous reviews"
              title="Previous"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Floating Right Slide Button */}
            <button
              onClick={nextAuto}
              className="absolute -right-3 sm:-right-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-white border border-earth-200 text-forest-950 shadow-elevated hover:bg-forest-900 hover:text-cream-50 flex items-center justify-center transition-all duration-300 cursor-pointer hover:scale-110 active:scale-95"
              aria-label="Slide to next reviews"
              title="Next"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            {/* Sliding Cards Window */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
              <AnimatePresence mode="popLayout">
                {slidingCards.map((item, idx) => (
                  <motion.div
                    key={`${item.id}-${autoIndex}-${idx}`}
                    initial={{ opacity: 0, y: 20, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.96 }}
                    transition={{ duration: 0.45, ease: "easeOut", delay: idx * 0.06 }}
                    className={`bg-white p-7 rounded-2xl border border-earth-200 shadow-soft flex flex-col justify-between relative group hover:border-brass-400 hover:shadow-elevated transition-all duration-300 ${
                      idx === 1 ? 'md:flex' : idx === 2 ? 'hidden lg:flex' : 'flex'
                    }`}
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 text-brass-500">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-brass-500 text-brass-500" />
                          ))}
                        </div>
                        <a
                          href={item.googleUrl || clinicData.contact.googleReviewsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-[9.5px] font-bold text-emerald-700 hover:text-emerald-900 bg-emerald-50 hover:bg-emerald-100 px-2 py-0.5 rounded-full border border-emerald-200 transition-colors"
                          title="Click to view verified review on Google"
                        >
                          <ShieldCheck className="w-3 h-3 text-emerald-600" />
                          <span>Google Review ↗</span>
                        </a>
                      </div>

                      <p className="text-xs sm:text-[13px] text-earth-900 leading-relaxed font-light italic line-clamp-5">
                        "{item.quote}"
                      </p>
                    </div>

                    <div className="pt-4 mt-5 border-t border-earth-100 flex items-center justify-between gap-2">
                      <div className="truncate">
                        <p className="font-semibold text-xs text-forest-950 truncate">{item.author}</p>
                        <a
                          href={item.googleUrl || clinicData.contact.googleReviewsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[10px] text-earth-600 hover:text-forest-900 hover:underline truncate"
                        >
                          {item.locality}
                        </a>
                      </div>
                      <span className="shrink-0 px-2.5 py-0.5 rounded-full bg-cream-100 text-forest-900 text-[9.5px] font-bold uppercase tracking-wider border border-earth-200">
                        {item.treatment}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* Bottom Slider Navigation Controls & Dots */}
          <div className="flex items-center justify-between flex-wrap gap-4 pt-8 mt-6 border-t border-earth-200/80">
            <span className="text-xs text-earth-700 font-medium">
              {isAutoPaused ? 'Paused (Hovered)' : 'Auto-sliding'} • Card {autoIndex + 1} of {total}
            </span>

            {/* Dots */}
            <div className="flex items-center gap-1.5">
              {clinicData.testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setAutoIndex(idx)}
                  className={`h-2 rounded-full transition-all duration-300 border-0 cursor-pointer ${
                    autoIndex === idx ? 'bg-forest-900 w-7' : 'bg-earth-300 hover:bg-earth-500 w-2'
                  }`}
                  aria-label={`Jump to review ${idx + 1}`}
                />
              ))}
            </div>

            {/* Previous / Play / Next Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={prevAuto}
                className="px-3 py-1.5 rounded-full border border-earth-200 hover:bg-forest-900 hover:text-cream-50 text-forest-900 bg-white shadow-xs transition-colors cursor-pointer flex items-center gap-1 text-xs font-semibold"
                aria-label="Previous review"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>Prev</span>
              </button>
              <button
                onClick={() => setIsAutoPaused(!isAutoPaused)}
                className="p-1.5 rounded-full border border-earth-200 hover:bg-forest-900 hover:text-cream-50 text-forest-900 bg-white shadow-xs transition-colors cursor-pointer"
                title={isAutoPaused ? "Play" : "Pause"}
              >
                {isAutoPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
              </button>
              <button
                onClick={nextAuto}
                className="px-3 py-1.5 rounded-full border border-earth-200 hover:bg-forest-900 hover:text-cream-50 text-forest-900 bg-white shadow-xs transition-colors cursor-pointer flex items-center gap-1 text-xs font-semibold"
                aria-label="Next review"
              >
                <span>Next</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </section>

        {/* 2. CATEGORIZED DIRECTORY OF ALL TESTIMONIAL CARDS */}
        <section className="mb-20">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <span className="text-xs uppercase tracking-ultra font-semibold text-brass-600 block mb-1">
                ALL PATIENT REVIEWS
              </span>
              <h3 className="font-serif text-3xl text-forest-950 font-light">
                Explore All Reviews
              </h3>
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-2 flex-wrap">
              {filterCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedFilter(cat.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 border cursor-pointer ${
                    selectedFilter === cat.id
                      ? 'bg-forest-900 text-cream-50 border-forest-900 shadow-sm scale-[1.02]'
                      : 'bg-white text-earth-800 border-earth-200 hover:bg-cream-100'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Testimonials Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredList.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white p-7 sm:p-8 rounded-3xl border border-earth-200 shadow-elevated space-y-5 flex flex-col justify-between hover:border-brass-500 hover:shadow-[0_20px_45px_rgba(28,59,44,0.1)] transition-all duration-300 group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-brass-500">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-brass-500 text-brass-500" />
                      ))}
                    </div>
                    <a
                      href={item.googleUrl || clinicData.contact.googleReviewsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 px-2.5 py-1 rounded-full border border-emerald-200 transition-colors"
                      title="Click to view verified review on Google"
                    >
                      <ShieldCheck className="w-3 h-3 text-emerald-600" />
                      <span>Google Review ↗</span>
                    </a>
                  </div>

                  <p className="text-xs sm:text-[13px] text-earth-900 leading-relaxed font-light italic">
                    "{item.quote}"
                  </p>
                </div>

                <div className="pt-4 border-t border-earth-200 flex items-center justify-between gap-2">
                  <div className="truncate">
                    <p className="font-semibold text-xs text-forest-950 truncate">{item.author}</p>
                    <a
                      href={item.googleUrl || clinicData.contact.googleReviewsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[10.5px] text-earth-600 hover:text-forest-900 hover:underline truncate"
                    >
                      {item.locality}
                    </a>
                  </div>
                  <span className="shrink-0 px-2.5 py-1 rounded-full bg-cream-100 text-brass-700 text-[10px] font-semibold uppercase border border-earth-200/60">
                    {item.treatment}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="p-8 sm:p-12 bg-forest-950 text-cream-50 rounded-3xl text-center space-y-4 shadow-elevated">
          <h3 className="font-serif text-3xl font-light">
            Share Your Experience or Book a Consultation
          </h3>
          <p className="text-xs sm:text-sm text-cream-200/80 max-w-xl mx-auto font-light leading-relaxed">
            Senior Physician Dr. Anand Krishna (BAMS) is available Monday – Saturday in KR Puram for personalized Nadi Pariksha and classical healing.
          </p>
          <div className="pt-2">
            <Link
              to="/book-appointment"
              className="inline-flex items-center gap-2 px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-forest-950 font-bold text-xs uppercase tracking-widest rounded-full shadow-soft transition-all hover:scale-105"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Appointment Now</span>
            </Link>
          </div>
        </div>

      </div>
    </motion.div>
  );
}
