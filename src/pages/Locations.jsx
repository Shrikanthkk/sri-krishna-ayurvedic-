import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, Phone, Mail, Navigation, ExternalLink, Building2, Camera } from 'lucide-react';
import PageHero from '../components/PageHero';
import Breadcrumb from '../components/Breadcrumb';
import { clinicData } from '../data/clinicData';

export default function Locations() {
  const telUri = `tel:${clinicData.contact.phone.replace(/\s+/g, '')}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <PageHero
        badge="CLINIC LOCATIONS"
        title="Our Clinic Addresses & Directions"
        subtitle="Sri Krishna Ayurvedic Clinic welcomes patients at two accessible locations in Krishnarajapuram (KR Puram), Bangalore."
        bgImage="/images/hero_stock_3.jpg"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Breadcrumb items={[{ label: 'Locations' }]} />

        {/* 2 Main Location Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          
          {/* MAIN CLINIC */}
          <div className="bg-white p-8 rounded-3xl border border-earth-200 shadow-elevated space-y-6 relative overflow-hidden flex flex-col justify-between">
            <div className="space-y-4">
              <span className="px-3.5 py-1.5 bg-forest-900 text-brass-400 text-[10px] font-bold uppercase tracking-widest rounded-full inline-block">
                MAIN CLINIC ADDRESS
              </span>

              <div className="flex items-center gap-3 text-forest-950 font-serif text-2xl">
                <Building2 className="w-6 h-6 text-brass-600 shrink-0" />
                <h3>Sri Krishna Ayurvedic Clinic</h3>
              </div>

              <p className="text-sm text-earth-800 leading-relaxed font-light pl-3 border-l-2 border-brass-500">
                {clinicData.contact.mainAddress.fullText}
              </p>

              <div className="space-y-2 text-xs text-forest-900 font-medium">
                <p className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-brass-600 shrink-0" />
                  <a href={`mailto:${clinicData.contact.email}`} className="hover:underline">
                    {clinicData.contact.email}
                  </a>
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-brass-600 shrink-0" />
                  <a href={telUri} className="hover:underline">
                    {clinicData.contact.phone}
                  </a>
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-earth-200 flex flex-wrap gap-3">
              <a
                href={clinicData.contact.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 bg-forest-900 hover:bg-forest-800 text-cream-50 font-semibold text-xs uppercase tracking-wider rounded-full flex items-center gap-2"
              >
                <Navigation className="w-3.5 h-3.5 text-brass-400" />
                <span>Get Directions</span>
              </a>
              <a
                href={telUri}
                className="px-5 py-2.5 bg-brass-500 hover:bg-brass-400 text-forest-950 font-semibold text-xs uppercase tracking-wider rounded-full flex items-center gap-2"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call Clinic</span>
              </a>
            </div>
          </div>

          {/* BRANCH CLINIC */}
          <div className="bg-white p-8 rounded-3xl border border-earth-200 shadow-elevated space-y-6 relative overflow-hidden flex flex-col justify-between">
            <div className="space-y-4">
              <span className="px-3.5 py-1.5 bg-emerald-700 text-white text-[10px] font-bold uppercase tracking-widest rounded-full inline-block">
                BRANCH CLINIC ADDRESS
              </span>

              <div className="flex items-center gap-3 text-forest-950 font-serif text-2xl">
                <MapPin className="w-6 h-6 text-emerald-600 shrink-0" />
                <h3>Sri Krishna Ayurvedic Clinic</h3>
              </div>

              <p className="text-sm text-earth-800 leading-relaxed font-light pl-3 border-l-2 border-emerald-500">
                {clinicData.contact.branchAddress.fullText}
              </p>

              <div className="space-y-2 text-xs text-forest-900 font-medium">
                <p className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-emerald-600 shrink-0" />
                  <a href={telUri} className="hover:underline">
                    {clinicData.contact.phone}
                  </a>
                </p>
                <p className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Mon - Sat: 10:00 AM - 7:00 PM</span>
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-earth-200 flex flex-wrap gap-3">
              <a
                href={clinicData.contact.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 bg-forest-900 hover:bg-forest-800 text-cream-50 font-semibold text-xs uppercase tracking-wider rounded-full flex items-center gap-2"
              >
                <Navigation className="w-3.5 h-3.5 text-brass-400" />
                <span>Get Directions</span>
              </a>
              <a
                href={telUri}
                className="px-5 py-2.5 bg-brass-500 hover:bg-brass-400 text-forest-950 font-semibold text-xs uppercase tracking-wider rounded-full flex items-center gap-2"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call Clinic</span>
              </a>
            </div>
          </div>

        </div>

        {/* Side-by-Side Google Maps & Real Signboard Photo */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-16">
          
          <div className="lg:col-span-7 rounded-3xl overflow-hidden shadow-elevated border border-earth-200 bg-white min-h-[420px] flex flex-col">
            <div className="p-4 bg-forest-900 text-cream-50 flex items-center justify-between">
              <span className="text-xs font-semibold tracking-wider uppercase flex items-center gap-2">
                <Navigation className="w-4 h-4 text-brass-400" />
                <span>Google Map Embed — KR Puram</span>
              </span>
              <a
                href={clinicData.contact.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] text-brass-400 hover:text-white flex items-center gap-1 uppercase tracking-wider font-semibold"
              >
                <span>Full Map</span>
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
          </div>

          <div className="lg:col-span-5 rounded-3xl overflow-hidden shadow-elevated border border-earth-200 bg-white relative flex flex-col group min-h-[420px]">
            <div className="p-4 bg-forest-950 text-cream-50 flex items-center justify-between">
              <span className="text-xs font-semibold tracking-wider uppercase flex items-center gap-2">
                <Camera className="w-4 h-4 text-brass-400" />
                <span>Clinic Exterior & Signboard</span>
              </span>
              <span className="text-[10px] text-brass-400 font-bold uppercase">Reg No: 13199</span>
            </div>

            <div className="relative grow overflow-hidden bg-forest-950">
              <img
                src="/images/clinic_front.jpg"
                alt="Sri Krishna Ayurvedic Clinic Signboard"
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 editorial-overlay flex flex-col justify-end p-6 text-cream-50">
                <p className="font-serif text-xl font-medium">Sri Krishna Ayurvedic Clinic</p>
                <p className="text-xs text-cream-200/80">Dr. Anand Krishna (BAMS) • Dhanvantari Road, KR Puram</p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </motion.div>
  );
}
