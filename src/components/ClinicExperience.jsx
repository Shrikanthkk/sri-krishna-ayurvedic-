import React from 'react';
import { motion } from 'framer-motion';
import { clinicData } from '../data/clinicData';

export default function ClinicExperience() {
  return (
    <section id="gallery" className="py-24 bg-forest-950 text-cream-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-xs uppercase tracking-ultra font-semibold text-brass-400 block">
            06 • Clinical Ambiance & Storytelling
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-light text-cream-50 leading-tight">
            A Calm Sanctuary for Healing
          </h2>
          <p className="text-cream-200/80 text-base sm:text-lg font-light leading-relaxed">
            Step into an atmosphere created to calm the senses and prepare your mind and body for authentic restoration.
          </p>
        </div>

        {/* Gallery Storytelling Grid displaying the 3 uploaded images */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
          
          {/* Panel 1: Shirodhara Therapy */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="md:col-span-5 rounded-2xl overflow-hidden shadow-elevated border border-forest-800 aspect-[4/5] relative group"
          >
            <img
              src={clinicData.images.shirodhara}
              alt="Authentic Shirodhara oil flow therapy"
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000"
            />
            <div className="absolute inset-0 editorial-overlay flex flex-col justify-end p-6 sm:p-8">
              <span className="text-xs uppercase tracking-widest text-brass-400 font-semibold mb-1">
                Classical Therapy
              </span>
              <h3 className="font-serif text-2xl text-cream-50 font-light">
                Shirodhara & Abhyanga Relaxation
              </h3>
              <p className="text-xs text-cream-200/70 mt-1">
                Continuous medicated oil flow over forehead marma points for nervous system calm.
              </p>
            </div>
          </motion.div>

          {/* Panel 2 & Panel 3 Right Column */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="md:col-span-7 flex flex-col justify-between space-y-8"
          >
            {/* Panel 2: Herbal Preparation */}
            <div className="rounded-2xl overflow-hidden shadow-elevated border border-forest-800 aspect-[16/9] relative group">
              <img
                src={clinicData.images.herbalPrep}
                alt="Ayurvedic herbs and stone mortar preparation"
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000"
              />
              <div className="absolute inset-0 editorial-overlay flex flex-col justify-end p-6 sm:p-8">
                <span className="text-xs font-semibold text-brass-400 uppercase tracking-widest block mb-1">
                  Classical Apothecary
                </span>
                <h4 className="font-serif text-2xl text-cream-50 font-light">
                  Handcrafted Herbal Remedies & Decoctions
                </h4>
                <p className="text-xs text-cream-200/70 mt-1">
                  100% natural botanical herbs, amla fruits, and traditional oil extractions.
                </p>
              </div>
            </div>

            {/* Panel 3: Treatment Room */}
            <div className="rounded-2xl overflow-hidden shadow-elevated border border-forest-800 aspect-[16/9] relative group">
              <img
                src={clinicData.images.treatmentRoom}
                alt="Traditional Ayurvedic wooden massage table and serene treatment room"
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000"
              />
              <div className="absolute inset-0 editorial-overlay flex flex-col justify-end p-6 sm:p-8">
                <span className="text-xs font-semibold text-brass-400 uppercase tracking-widest block mb-1">
                  Peaceful Sanctuary
                </span>
                <h4 className="font-serif text-2xl text-cream-50 font-light">
                  Traditional Droni Wooden Therapy Room
                </h4>
                <p className="text-xs text-cream-200/70 mt-1">
                  Tranquil clinical environment with natural sunlight and soothing indoor greenery.
                </p>
              </div>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
