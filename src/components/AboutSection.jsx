import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Heart, Leaf, Sun } from 'lucide-react';
import { clinicData } from '../data/clinicData';

export default function AboutSection() {
  return (
    <section id="about" className="py-24 bg-cream-100/70 relative overflow-hidden border-t border-earth-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Split: Editorial Headline & Imagery */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 space-y-8"
          >
            <div className="space-y-4">
              <span className="text-xs uppercase tracking-ultra font-semibold text-brass-600 block">
                01 • About The Clinic
              </span>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-light text-forest-950 leading-[1.1]">
                A Timeless Approach to Holistic Wellness
              </h2>
              <div className="w-16 h-[2px] bg-brass-500" />
            </div>

            <p className="text-lg font-serif italic text-forest-800 leading-relaxed">
              "Ayurveda does not merely treat illness; it restores the innate intelligent harmony that exists within every human body."
            </p>

            {/* Overlapping Image Showcase */}
            <div className="relative pt-4">
              <div className="rounded-2xl overflow-hidden shadow-elevated border border-earth-200 aspect-[4/3] group">
                <img
                  src={clinicData.images.herbs}
                  alt="Authentic Ayurvedic medicinal herbs and brass oil vessel"
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
              </div>

              {/* Overlapping Detail Badge */}
              <div className="absolute -bottom-6 -right-6 bg-forest-900 text-cream-50 p-6 rounded-2xl shadow-elevated border border-brass-500/30 max-w-xs hidden sm:block">
                <p className="text-xs uppercase tracking-widest text-brass-400 font-semibold mb-1">Root-Cause Care</p>
                <p className="text-sm font-serif font-light text-cream-100">
                  Individualized formulations and authentic classical therapies for long-term health.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Split: Verified Clinic Information */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-6 space-y-8"
          >
            <div className="prose prose-stone max-w-none text-earth-800 space-y-5 text-base sm:text-lg leading-relaxed">
              <p>
                Located in <strong className="text-forest-950 font-semibold">KR Puram, Bangalore</strong>, <strong className="text-forest-950 font-semibold">{clinicData.clinicName}</strong> serves as a serene sanctuary for authentic Ayurvedic medicine. Under the experienced clinical guidance of <strong className="text-forest-950 font-semibold">Dr. Anand Krishna (BAMS)</strong>, who brings over <strong className="text-forest-950 font-semibold">26 years of dedicated experience</strong>, our practice is rooted in classical diagnostic precision and compassionate healthcare.
              </p>
              <p>
                In an era dominated by rapid symptom suppression, Ayurveda offers a profound, time-tested framework. Through <strong className="text-forest-950 font-semibold">Nadi Pariksha (Pulse Diagnosis)</strong>, we understand your unique physiological constitution (Prakriti) and identify metabolic imbalances before prescribing targeted herbal remedies and lifestyle adjustments.
              </p>
            </div>

            {/* 4 Feature Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
              <div className="p-5 bg-cream-50 rounded-2xl border border-earth-200 space-y-2">
                <div className="w-9 h-9 rounded-xl bg-forest-100 text-forest-800 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h4 className="font-serif text-lg font-medium text-forest-950">26+ Years Mastery</h4>
                <p className="text-xs text-earth-600 leading-normal">
                  Expert guidance by senior physician Dr. Anand Krishna (BAMS).
                </p>
              </div>

              <div className="p-5 bg-cream-50 rounded-2xl border border-earth-200 space-y-2">
                <div className="w-9 h-9 rounded-xl bg-forest-100 text-forest-800 flex items-center justify-center">
                  <Leaf className="w-5 h-5" />
                </div>
                <h4 className="font-serif text-lg font-medium text-forest-950">Classic Formulations</h4>
                <p className="text-xs text-earth-600 leading-normal">
                  100% natural, classical herbal remedies prepared to classical standards.
                </p>
              </div>

              <div className="p-5 bg-cream-50 rounded-2xl border border-earth-200 space-y-2">
                <div className="w-9 h-9 rounded-xl bg-forest-100 text-forest-800 flex items-center justify-center">
                  <Heart className="w-5 h-5" />
                </div>
                <h4 className="font-serif text-lg font-medium text-forest-950">Personalised Attention</h4>
                <p className="text-xs text-earth-600 leading-normal">
                  Every consultation is tailored to your unique Dosha composition.
                </p>
              </div>

              <div className="p-5 bg-cream-50 rounded-2xl border border-earth-200 space-y-2">
                <div className="w-9 h-9 rounded-xl bg-forest-100 text-forest-800 flex items-center justify-center">
                  <Sun className="w-5 h-5" />
                </div>
                <h4 className="font-serif text-lg font-medium text-forest-950">Accessible Care</h4>
                <p className="text-xs text-earth-600 leading-normal">
                  Accessible Ayurvedic care for every patient visiting our KR Puram and T.C. Palya branches.
                </p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
