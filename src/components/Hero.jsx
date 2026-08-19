import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, ArrowRight, Sparkles, ShieldCheck, Award, HeartHandshake } from 'lucide-react';
import { clinicData } from '../data/clinicData';

export default function Hero({ onOpenBooking }) {
  return (
    <section 
      id="hero" 
      className="relative min-h-[calc(100vh-4rem)] flex flex-col justify-center py-12 lg:py-16 overflow-hidden bg-gradient-to-b from-cream-50 via-cream-100/40 to-cream-50"
    >
      {/* Subtle Ambient Organic Glows */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-forest-100/40 rounded-full filter blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-10 right-0 w-1/3 h-full bg-cream-100/70 rounded-l-[120px] pointer-events-none -z-10 hidden lg:block" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-brass-100/30 rounded-full filter blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-12 items-center">
          
          {/* LEFT SIDE: Editorial Authority & Clear Call to Action */}
          <div className="lg:col-span-6 space-y-6 sm:space-y-7 text-left z-10">
            
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

            {/* Main Headline & Supporting Paragraph */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-3"
            >
              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-serif font-light text-forest-950 leading-[1.12] tracking-tight">
                Natural Healing. <br className="hidden sm:inline" />
                <span className="text-forest-900 font-normal">Personalized Care.</span>
              </h1>
              
              <p className="text-earth-800 text-sm sm:text-base font-light leading-relaxed max-w-xl">
                Experience authentic Ayurvedic healing guided by Dr. Anand Krishna (BAMS, 26+ yrs exp) in KR Puram. Classical Nadi Pariksha, Panchakarma detox, and tailored botanical regimens.
              </p>
            </motion.div>

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

            {/* Diagnostic & Feature Highlights Row */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1"
            >
              <div className="bg-white/95 backdrop-blur-md p-3.5 rounded-2xl border border-earth-200 shadow-sm flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-forest-100 text-forest-900 flex items-center justify-center shrink-0">
                  <Sparkles className="w-4 h-4 text-forest-800" />
                </div>
                <div>
                  <p className="text-xs font-serif font-bold text-forest-950 leading-tight">
                    Ancient Diagnostic Art
                  </p>
                  <p className="text-[10px] text-earth-700 leading-tight font-light">
                    Nadi Pariksha Pulse Reading
                  </p>
                </div>
              </div>

              <div className="bg-white/95 backdrop-blur-md p-3.5 rounded-2xl border border-earth-200 shadow-sm flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-brass-100 text-brass-900 flex items-center justify-center shrink-0">
                  <Award className="w-4 h-4 text-brass-700" />
                </div>
                <div>
                  <p className="text-xs font-serif font-bold text-forest-950 leading-tight">
                    Classical Remedies
                  </p>
                  <p className="text-[10px] text-earth-700 leading-tight font-light">
                    Handcrafted Botanicals
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Trust Indicator Footnote */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
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

          {/* RIGHT SIDE: High-Definition Video Visual Container */}
          <div className="lg:col-span-6 relative flex flex-col items-center">
            <div className="relative w-full max-w-[480px] lg:max-w-[500px]">
              
              {/* Soft Organic Backing Frame & Glow */}
              <div className="absolute -inset-3 sm:-inset-4 bg-gradient-to-tr from-brass-400/20 via-forest-800/10 to-transparent rounded-[2.5rem] transform rotate-1 pointer-events-none -z-10" />

              {/* Main Video Container */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-earth-200/90 aspect-[4/3] sm:aspect-[16/11] lg:aspect-[4/3] bg-forest-950 group">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700"
                  poster="/images/hero_adobe_3.jpg"
                >
                  <source src="/videos/Meditating_figure_chakras_glowing_202608181320.mp4" type="video/mp4" />
                  <source src="/Meditating_figure_chakras_glowing_202608181320.mp4" type="video/mp4" />
                  <source src="/videos/meditation_chakras.mp4" type="video/mp4" />
                  <source src="/meditation_chakras.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>

                {/* Subtle Editorial Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-forest-950/85 via-forest-950/20 to-transparent flex items-end p-6 pointer-events-none">
                  <div className="text-cream-50">
                    <p className="font-serif text-lg font-medium text-cream-50 drop-shadow">Sri Krishna Ayurvedic Clinic</p>
                    <p className="text-xs text-brass-400 font-medium">Vedic Healing & Vitality • KR Puram, Bangalore</p>
                  </div>
                </div>
              </div>

              {/* FLOATING BADGE 1 (Top-Left) */}
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
                className="absolute -top-5 -left-3 sm:-left-6 bg-white/95 backdrop-blur-md p-3 sm:p-3.5 rounded-2xl border border-earth-200 shadow-elevated z-30 flex items-center gap-2.5 max-w-[205px] pointer-events-none hidden sm:flex"
              >
                <div className="w-8 h-8 rounded-full bg-forest-100 text-forest-900 flex items-center justify-center shrink-0">
                  <HeartHandshake className="w-4 h-4 text-forest-800" />
                </div>
                <div>
                  <p className="text-xs font-serif font-bold text-forest-950 leading-tight">
                    Personalized Care
                  </p>
                  <p className="text-[10px] text-earth-700 leading-tight font-light">
                    Tailored to your needs
                  </p>
                </div>
              </motion.div>

              {/* FLOATING BADGE 2 (Bottom-Right) */}
              <motion.div
                animate={{ y: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 4.5, ease: 'easeInOut', delay: 0.5 }}
                className="absolute -bottom-5 -right-3 sm:-right-6 bg-white/95 backdrop-blur-md p-3 sm:p-3.5 rounded-2xl border border-earth-200 shadow-elevated z-30 flex items-center gap-2.5 max-w-[210px] pointer-events-none hidden sm:flex"
              >
                <div className="w-8 h-8 rounded-full bg-brass-100 text-brass-900 flex items-center justify-center shrink-0">
                  <Award className="w-4 h-4 text-brass-700" />
                </div>
                <div>
                  <p className="text-xs font-serif font-bold text-forest-950 leading-tight">
                    26+ Years Trust
                  </p>
                  <p className="text-[10px] text-earth-700 leading-tight font-light">
                    Dr. Anand Krishna (BAMS)
                  </p>
                </div>
              </motion.div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
