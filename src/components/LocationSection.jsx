import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, Phone, Mail, Navigation, ExternalLink, Building2, Camera, ShieldCheck } from 'lucide-react';
import { clinicData } from '../data/clinicData';

export default function LocationSection() {
  return (
    <section id="location" className="py-24 bg-cream-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-xs uppercase tracking-ultra font-semibold text-brass-600 block">
            08 • Visit Our Clinic
          </span>
          <h2 className="text-4xl sm:text-5xl font-serif font-light text-forest-950 leading-tight">
            Clinic Locations & Operating Hours
          </h2>
          <p className="text-earth-800 text-base sm:text-lg font-light leading-relaxed">
            Sri Krishna Ayurvedic Clinic welcomes patients at two accessible locations in Krishnarajapuram (KR Puram), Bangalore.
          </p>
        </div>

        {/* Address Cards & Hours Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-12">
          
          {/* Main Address Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-4 bg-white p-6 sm:p-8 rounded-2xl border border-earth-200 shadow-elevated space-y-4 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 px-4 py-1.5 bg-forest-900 text-brass-400 text-[10px] uppercase font-bold tracking-widest rounded-bl-xl">
              MAIN ADDRESS
            </div>

            <div className="flex items-center gap-3 text-forest-950 font-serif text-xl font-medium pt-1">
              <div className="w-10 h-10 rounded-full bg-forest-100 text-forest-800 flex items-center justify-center shrink-0">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <h3>Sri Krishna Ayurvedic Clinic</h3>
                <span className="text-xs text-brass-600 font-sans uppercase tracking-wider block font-semibold">
                  Main Center • KR Puram
                </span>
              </div>
            </div>

            <p className="text-sm text-earth-800 leading-relaxed font-light pl-2 border-l-2 border-brass-500">
              {clinicData.contact.mainAddress.fullText}
            </p>

            <div className="pt-2 flex items-center gap-3 text-xs text-forest-900 font-medium">
              <Mail className="w-4 h-4 text-brass-600 shrink-0" />
              <a href={`mailto:${clinicData.contact.email}`} className="hover:underline text-forest-900">
                {clinicData.contact.email}
              </a>
            </div>
          </motion.div>

          {/* Branch Address Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-4 bg-white p-6 sm:p-8 rounded-2xl border border-earth-200 shadow-elevated space-y-4 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 px-4 py-1.5 bg-emerald-700 text-white text-[10px] uppercase font-bold tracking-widest rounded-bl-xl">
              BRANCH ADDRESS
            </div>

            <div className="flex items-center gap-3 text-forest-950 font-serif text-xl font-medium pt-1">
              <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-800 flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h3>Sri Krishna Ayurvedic Clinic</h3>
                <span className="text-xs text-emerald-700 font-sans uppercase tracking-wider block font-semibold">
                  Branch Center • T.C. Palya Main Rd
                </span>
              </div>
            </div>

            <p className="text-sm text-earth-800 leading-relaxed font-light pl-2 border-l-2 border-emerald-500">
              {clinicData.contact.branchAddress.fullText}
            </p>

            <div className="pt-2 flex items-center gap-3 text-xs text-forest-900 font-medium">
              <Phone className="w-4 h-4 text-emerald-600 shrink-0" />
              <a href={`tel:${clinicData.contact.phone.replace(/\s+/g, '')}`} className="hover:underline">
                {clinicData.contact.phone}
              </a>
            </div>
          </motion.div>

          {/* Consultation Hours & Fee Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-4 bg-forest-950 text-cream-50 p-6 sm:p-8 rounded-2xl flex flex-col justify-between space-y-3"
          >
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-brass-400 text-xs font-semibold uppercase tracking-wider">
                <Clock className="w-4 h-4" />
                <span>Consultation Timings</span>
              </div>
              <div className="space-y-2 text-xs text-cream-200/90 font-light">
                {clinicData.contact.timings.map((t, idx) => (
                  <div key={idx} className="flex items-center justify-between border-b border-forest-800/60 pb-1.5">
                    <span>{t.days}</span>
                    <span className="font-medium text-brass-300">{t.hours}</span>
                  </div>
                ))}
              </div>
            </div>
            

          </motion.div>

        </div>

        {/* Side-by-Side Google Maps & Real Clinic Exterior Image Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Side: Google Maps Embed */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 rounded-3xl overflow-hidden shadow-elevated border border-earth-200 bg-white min-h-[420px] flex flex-col"
          >
            <div className="p-4 bg-forest-900 text-cream-50 flex items-center justify-between">
              <span className="text-xs font-semibold tracking-wider uppercase flex items-center gap-2">
                <Navigation className="w-4 h-4 text-brass-400" />
                <span>Interactive Google Map — KR Puram</span>
              </span>
              <a
                href={clinicData.contact.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] text-brass-400 hover:text-white flex items-center gap-1 uppercase tracking-wider font-semibold"
              >
                <span>Open Map</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            <iframe
              src={clinicData.contact.mapEmbedSrc}
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '380px' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Sri Krishna Ayurvedic Clinic Google Map Location"
              className="w-full grow"
            />
          </motion.div>

          {/* Right Side: Real Clinic Building & Entrance Photo (Directly Next to Google Maps) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 rounded-3xl overflow-hidden shadow-elevated border border-earth-200 bg-white relative flex flex-col group"
          >
            <div className="p-4 bg-forest-950 text-cream-50 flex items-center justify-between">
              <span className="text-xs font-semibold tracking-wider uppercase flex items-center gap-2">
                <Camera className="w-4 h-4 text-brass-400" />
                <span>Clinic Exterior & Signboard</span>
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-brass-500/20 text-brass-300 font-bold uppercase tracking-wider flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-brass-400" />
                <span>Reg No: 13199</span>
              </span>
            </div>

            <div className="relative grow aspect-[4/3] sm:aspect-[16/10] lg:aspect-auto overflow-hidden bg-forest-950">
              <img
                src="/images/clinic_front.jpg"
                alt="Sri Krishna Ayurvedic Clinic Signboard & Exterior Front View"
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
              />
              
              <div className="absolute inset-0 editorial-overlay flex flex-col justify-end p-6 text-cream-50 pointer-events-none">
                <span className="text-[10px] font-bold text-brass-400 uppercase tracking-widest">
                  Authentic Clinic Signboard
                </span>
                <h4 className="font-serif text-xl font-medium text-cream-50 leading-tight">
                  Sri Krishna Ayurvedic Clinic
                </h4>
                <p className="text-xs text-cream-200/80 mt-1">
                  Dr. Anand Krishna (Reg No: 13199) • Dhanvantari Road, KR Puram
                </p>
              </div>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
