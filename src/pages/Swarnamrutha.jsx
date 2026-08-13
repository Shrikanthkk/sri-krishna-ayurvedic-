import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, CheckCircle2, Calendar, PhoneCall, Baby, ShieldCheck } from 'lucide-react';
import PageHero from '../components/PageHero';
import Breadcrumb from '../components/Breadcrumb';
import { clinicData } from '../data/clinicData';

export default function Swarnamrutha() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <PageHero
        badge="PEDIATRIC IMMUNITY"
        title="Swarnamrutha Prashana"
        subtitle="Classical Ayurvedic Gold Drops for Child Immunity & Cognitive Growth (Ages 0 to 16 Years)."
        bgImage="/images/hero_stock_4.jpg"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Breadcrumb
          items={[
            { label: 'Treatments', link: '/treatments' },
            { label: 'Swarnamrutha Prashana' }
          ]}
        />

        {/* Section 1: Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs uppercase tracking-ultra font-semibold text-brass-600 block">
              Ancient Pediatric Care
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-light text-forest-950 leading-tight">
              What is Swarnamrutha Prashana?
            </h2>
            <p className="text-earth-800 text-base font-light leading-relaxed">
              Swarnamrutha Prashana (also known as Swarna Bindu Prashana) is an ancient pediatric regimen described in classical Ayurvedic texts such as the *Kashyapa Samhita*.
            </p>
            <p className="text-earth-800 text-base font-light leading-relaxed">
              Administered to children from birth up to 16 years of age, it involves giving micro-doses of purified gold ash (*Swarna Bhasma*) combined with medicated ghee and processed honey. It is traditionally offered to support natural physical resistance, digestive health, and cognitive memory (*Medha*).
            </p>

            <div className="p-4 bg-cream-100 rounded-2xl border border-earth-200 flex items-center gap-4 text-xs text-forest-950">
              <Baby className="w-6 h-6 text-brass-600 shrink-0" />
              <div>
                <strong className="block text-sm font-serif">Suitable Age Group:</strong>
                <span>Infants and children from 0 months up to 16 years of age.</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-2xl overflow-hidden shadow-elevated border border-earth-200 aspect-[4/3] relative group">
              <img
                src={clinicData.images.herbs}
                alt="Swarnamrutha Herbs & Formulations"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Key Benefits */}
        <div className="p-8 sm:p-12 bg-white rounded-3xl border border-earth-200 shadow-elevated mb-20 space-y-6">
          <div className="max-w-3xl space-y-2">
            <span className="text-xs uppercase tracking-ultra font-semibold text-brass-600 block">
              Pediatric Wellness
            </span>
            <h2 className="text-3xl font-serif font-light text-forest-950">
              Traditional Benefits of Swarnamrutha Prashana
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-earth-800 font-light">
            <div className="p-5 bg-cream-50 rounded-2xl border border-earth-200 space-y-2">
              <div className="flex items-center gap-2 text-forest-950 font-serif text-base font-semibold">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                <span>Immune Resistance</span>
              </div>
              <p>Supports natural resistance against seasonal coughs, colds, and recurrent throat infections.</p>
            </div>

            <div className="p-5 bg-cream-50 rounded-2xl border border-earth-200 space-y-2">
              <div className="flex items-center gap-2 text-forest-950 font-serif text-base font-semibold">
                <Sparkles className="w-5 h-5 text-brass-500" />
                <span>Cognitive Growth</span>
              </div>
              <p>Promotes memory retention, sharpness of intellect (*Medha*), and mental alertness in growing children.</p>
            </div>

            <div className="p-5 bg-cream-50 rounded-2xl border border-earth-200 space-y-2">
              <div className="flex items-center gap-2 text-forest-950 font-serif text-base font-semibold">
                <Baby className="w-5 h-5 text-forest-800" />
                <span>Physical Vitality</span>
              </div>
              <p>Enhances digestive strength (*Agni*), appetite, and healthy physical weight progression.</p>
            </div>
          </div>
        </div>

        {/* Action CTA */}
        <div className="p-8 sm:p-12 bg-forest-950 text-cream-50 rounded-3xl flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-2">
            <h3 className="font-serif text-2xl font-light">Enquire About Swarnamrutha Administration</h3>
            <p className="text-xs text-cream-200/80">Sri Krishna Ayurvedic Clinic, KR Puram</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 shrink-0">
            <Link
              to="/book-appointment"
              className="px-7 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-forest-950 font-bold text-xs uppercase tracking-wider rounded-full shadow-soft transition-all text-center flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Appointment</span>
            </Link>
            <a
              href={`tel:${clinicData.contact.phone.replace(/\s+/g, '')}`}
              className="px-7 py-3.5 bg-brass-500 hover:bg-brass-400 text-forest-950 font-bold text-xs uppercase tracking-wider rounded-full transition-all text-center flex items-center justify-center gap-2"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Call Doctor</span>
            </a>
          </div>
        </div>

      </div>
    </motion.div>
  );
}
