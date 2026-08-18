import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, ArrowRight, Sparkles, ChevronLeft, ChevronRight, Leaf, HeartHandshake, ShieldCheck, Award } from 'lucide-react';
import { clinicData } from '../data/clinicData';

// 4 Curated Ayurvedic Theme Cards for the Stack
const heroCards = [
  {
    id: 'card-1',
    badge: 'Personalized Care',
    title: 'Care Designed Around You',
    description: 'Personalized Ayurvedic treatment for your wellbeing.',
    image: '/images/consultation.png',
    eyebrow: 'Root-Cause Healing',
    icon: HeartHandshake
  },
  {
    id: 'card-2',
    badge: 'Holistic Wellness',
    title: 'Restore Balance & Vitality',
    description: 'Classical Panchakarma & rejuvenating Shirodhara.',
    image: '/images/shirodhara.jpg',
    eyebrow: 'Mind • Body • Balance',
    icon: Leaf
  },
  {
    id: 'card-3',
    badge: 'Traditional Ayurveda',
    title: 'Ancient Diagnostic Art',
    description: 'Root-cause Nadi Pariksha pulse reading assessment.',
    image: '/images/nadi_pariksha.png',
    eyebrow: 'Vedic Pulse Evaluation',
    icon: Sparkles
  },
  {
    id: 'card-4',
    badge: 'Natural Healing',
    title: 'Pure Classical Formulations',
    description: 'Handcrafted authentic apothecary herbal remedies.',
    image: '/images/hero_adobe_3.jpg',
    eyebrow: 'Classical Apothecary',
    icon: Award
  }
];

export default function Hero({ onOpenBooking }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const nextCard = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % heroCards.length);
  }, []);

  const prevCard = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + heroCards.length) % heroCards.length);
  }, []);

  // Autoplay every 5.5s (pauses on hover or during drag)
  useEffect(() => {
    if (isPaused || isDragging) return;
    const interval = setInterval(nextCard, 5500);
    return () => clearInterval(interval);
  }, [isPaused, isDragging, nextCard]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') prevCard();
      if (e.key === 'ArrowRight') nextCard();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [prevCard, nextCard]);

  const activeCard = heroCards[activeIndex];

  // Helper to compute stacked visual properties
  const getCardStyle = (index) => {
    const total = heroCards.length;
    const offset = (index - activeIndex + total) % total;

    if (offset === 0) {
      return {
        zIndex: 30,
        scale: 1,
        x: 0,
        y: 0,
        rotate: 0,
        opacity: 1,
        pointerEvents: 'auto',
        cursor: 'grab'
      };
    }
    if (offset === 1) {
      return {
        zIndex: 20,
        scale: 0.93,
        x: 22,
        y: -14,
        rotate: 2.8,
        opacity: 0.88,
        pointerEvents: 'auto',
        cursor: 'pointer'
      };
    }
    if (offset === 2) {
      return {
        zIndex: 10,
        scale: 0.86,
        x: 42,
        y: -26,
        rotate: 5.5,
        opacity: 0.58,
        pointerEvents: 'auto',
        cursor: 'pointer'
      };
    }
    // Background hidden state
    return {
      zIndex: 5,
      scale: 0.8,
      x: 55,
      y: -36,
      rotate: 7.5,
      opacity: 0,
      pointerEvents: 'none',
      cursor: 'default'
    };
  };

  return (
    <section 
      id="hero" 
      className="relative min-h-[calc(100vh-4rem)] flex flex-col justify-center py-12 lg:py-16 overflow-hidden bg-gradient-to-b from-cream-50 via-cream-100/40 to-cream-50"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Soft Ambient Organic Glows */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-forest-100/40 rounded-full filter blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-10 right-0 w-1/3 h-full bg-cream-100/70 rounded-l-[120px] pointer-events-none -z-10 hidden lg:block" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-brass-100/30 rounded-full filter blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-12 items-center">
          
          {/* LEFT SIDE: Editorial Authority & Clear Call to Action */}
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
            <div className="min-h-[155px] sm:min-h-[165px] flex flex-col justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                  className="space-y-3"
                >
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-serif font-light text-forest-950 leading-[1.12] tracking-tight">
                    Natural Healing. Personalized Care.
                  </h1>
                  
                  <p className="text-earth-800 text-sm sm:text-base font-light leading-relaxed max-w-xl">
                    Experience root-cause Ayurvedic healing guided by Dr. Anand Krishna (BAMS, 26+ yrs exp) in KR Puram. Classical Nadi Pariksha, Panchakarma detox, and tailored botanical regimens.
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

          {/* RIGHT SIDE: Interactive 3D Stacked-Card Deck Carousel */}
          <div className="lg:col-span-6 relative flex flex-col items-center">
            
            <div className="relative w-full max-w-[460px] sm:max-w-[480px] lg:max-w-[490px] h-[370px] sm:h-[420px] lg:h-[430px]">
              
              {/* Soft Organic Backing Glow & Frame */}
              <div className="absolute -inset-4 bg-gradient-to-tr from-brass-400/20 via-forest-800/10 to-transparent rounded-[2.5rem] transform rotate-1 pointer-events-none -z-10" />

              {/* CARD STACK CONTAINER */}
              <div className="relative w-full h-full">
                {heroCards.map((card, idx) => {
                  const style = getCardStyle(idx);
                  const isCurrentActive = idx === activeIndex;
                  const CardIcon = card.icon;

                  return (
                    <motion.div
                      key={card.id}
                      initial={false}
                      animate={{
                        scale: style.scale,
                        x: style.x,
                        y: style.y,
                        rotate: style.rotate,
                        opacity: style.opacity,
                        zIndex: style.zIndex
                      }}
                      transition={{
                        type: 'spring',
                        stiffness: 280,
                        damping: 26,
                        mass: 0.9
                      }}
                      drag={isCurrentActive ? 'x' : false}
                      dragConstraints={{ left: 0, right: 0 }}
                      dragElastic={0.65}
                      onDragStart={() => setIsDragging(true)}
                      onDragEnd={(e, { offset, velocity }) => {
                        setIsDragging(false);
                        const swipeThreshold = 50;
                        if (offset.x < -swipeThreshold || velocity.x < -300) {
                          nextCard();
                        } else if (offset.x > swipeThreshold || velocity.x > 300) {
                          prevCard();
                        }
                      }}
                      onClick={() => {
                        if (!isCurrentActive) {
                          setActiveIndex(idx);
                        }
                      }}
                      className="absolute inset-0 rounded-3xl overflow-hidden shadow-2xl border border-earth-200/90 bg-forest-950 select-none transform-gpu origin-bottom-right"
                      style={{
                        cursor: style.cursor,
                        pointerEvents: style.pointerEvents,
                        touchAction: isCurrentActive ? 'none' : 'auto'
                      }}
                      role="button"
                      tabIndex={0}
                      aria-label={`Card: ${card.title}`}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          setActiveIndex(idx);
                        }
                      }}
                    >
                      {/* Image Layer */}
                      <img
                        src={card.image}
                        alt={card.title}
                        className="w-full h-full object-cover object-center pointer-events-none"
                        draggable={false}
                      />

                      {/* Editorial Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-forest-950/95 via-forest-950/35 to-forest-950/15 flex flex-col justify-between p-5 sm:p-7 text-cream-50 pointer-events-none">
                        
                        {/* Top Bar inside Card */}
                        <div className="flex items-center justify-between z-10">
                          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-forest-950/85 backdrop-blur-md border border-brass-400/35 text-brass-400 text-xs font-semibold tracking-wider shadow-sm">
                            <CardIcon className="w-3.5 h-3.5 text-brass-400" />
                            <span>{card.badge}</span>
                          </div>

                          <div className="px-3 py-1 rounded-full bg-forest-950/85 backdrop-blur-md border border-white/20 text-cream-50 text-[11px] font-mono tracking-wider">
                            0{idx + 1} / 0{heroCards.length}
                          </div>
                        </div>

                        {/* Bottom Card Title & Description Caption */}
                        <div className="space-y-1.5 z-10">
                          <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-ultra text-brass-400 block">
                            {card.eyebrow}
                          </span>
                          <h3 className="font-serif text-xl sm:text-2xl font-light text-cream-50 leading-snug">
                            {card.title}
                          </h3>
                          <p className="text-xs text-cream-200/85 font-light leading-relaxed max-w-sm">
                            {card.description}
                          </p>
                        </div>
                      </div>

                      {/* Subtle click-to-bring-forward hint on back cards */}
                      {!isCurrentActive && (
                        <div className="absolute inset-0 bg-forest-950/20 hover:bg-forest-950/10 transition-colors" />
                      )}
                    </motion.div>
                  );
                })}
              </div>

              {/* FLOATING BADGE 1: Personalized Care (Repositioned to top-left of deck) */}
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
                className="absolute -top-6 -left-4 sm:-left-8 bg-white/95 backdrop-blur-md p-3 sm:p-3.5 rounded-2xl border border-earth-200 shadow-elevated z-40 flex items-center gap-2.5 max-w-[195px] pointer-events-none hidden sm:flex"
              >
                <div className="w-8 h-8 rounded-full bg-forest-100 text-forest-900 flex items-center justify-center shrink-0">
                  <HeartHandshake className="w-4 h-4 text-forest-800" />
                </div>
                <div>
                  <p className="text-xs font-serif font-bold text-forest-950 leading-tight">Personalized Care</p>
                  <p className="text-[10px] text-earth-700 leading-tight font-light">Tailored to your needs</p>
                </div>
              </motion.div>

              {/* FLOATING BADGE 2: Holistic Wellness (Repositioned to bottom-left of deck) */}
              <motion.div
                animate={{ y: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 4.5, ease: 'easeInOut', delay: 0.5 }}
                className="absolute -bottom-6 -left-4 sm:-left-8 bg-white/95 backdrop-blur-md p-3 sm:p-3.5 rounded-2xl border border-earth-200 shadow-elevated z-40 flex items-center gap-2.5 max-w-[200px] pointer-events-none hidden sm:flex"
              >
                <div className="w-8 h-8 rounded-full bg-brass-100 text-brass-900 flex items-center justify-center shrink-0">
                  <Award className="w-4 h-4 text-brass-700" />
                </div>
                <div>
                  <p className="text-xs font-serif font-bold text-forest-950 leading-tight">Holistic Wellness</p>
                  <p className="text-[10px] text-earth-700 leading-tight font-light">Mind • Body • Balance</p>
                </div>
              </motion.div>

            </div>

            {/* CONTROLS & PROGRESS INDICATOR BAR */}
            <div className="flex items-center justify-between w-full max-w-[460px] sm:max-w-[480px] lg:max-w-[490px] pt-8 px-2">
              
              {/* Minimalist Progress Indicator: 01 / 04 */}
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs font-bold text-forest-950">
                  0{activeIndex + 1} <span className="text-earth-400 font-normal">/ 0{heroCards.length}</span>
                </span>

                <div className="flex items-center gap-1.5">
                  {heroCards.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveIndex(idx)}
                      className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                        activeIndex === idx
                          ? 'w-6 bg-forest-900'
                          : 'w-2 bg-earth-300 hover:bg-earth-400'
                      }`}
                      aria-label={`Go to card ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>

              {/* Circular Arrow Navigation Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={prevCard}
                  className="p-2.5 rounded-full bg-white hover:bg-forest-900 hover:text-cream-50 text-forest-950 border border-earth-200 shadow-sm transition-all duration-200 transform hover:scale-105 active:scale-95 cursor-pointer"
                  aria-label="Previous Card"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                
                <button
                  onClick={nextCard}
                  className="p-2.5 rounded-full bg-white hover:bg-forest-900 hover:text-cream-50 text-forest-950 border border-earth-200 shadow-sm transition-all duration-200 transform hover:scale-105 active:scale-95 cursor-pointer"
                  aria-label="Next Card"
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
