import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShieldAlert, HeartHandshake, CheckCircle2, Calendar, PhoneCall, HelpCircle } from 'lucide-react';
import PageHero from '../components/PageHero';
import Breadcrumb from '../components/Breadcrumb';
import { clinicData } from '../data/clinicData';

export default function CancerCare() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <PageHero
        badge="INTEGRATIVE AYURVEDA"
        title="Cancer Care Through the Wisdom of Ayurveda"
        subtitle="Traditional Ayurvedic Care. Personalised Guidance. Compassionate Supportive Consultation."
        bgImage="/images/hero_stock_2.jpg"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Breadcrumb
          items={[
            { label: 'Treatments', link: '/treatments' },
            { label: 'Integrative Cancer Care' }
          ]}
        />

        {/* Responsible Medical Disclaimer Banner */}
        <div className="p-5 bg-amber-500/10 border-l-4 border-amber-600 rounded-r-2xl mb-12 flex items-start gap-4 text-xs text-earth-900">
          <ShieldAlert className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <strong className="text-forest-950 font-bold uppercase tracking-wider block">Responsible Medical Notice</strong>
            <p className="leading-relaxed">
              Ayurvedic care offered at Sri Krishna Ayurvedic Clinic is strictly complementary and supportive. It is designed to provide lifestyle guidance, digestive support, and tissue vitality during treatment journeys. Ayurvedic care should be discussed with qualified healthcare professionals and should never replace medically recommended cancer diagnosis, surgery, or oncology treatments.
            </p>
          </div>
        </div>

        {/* Section 1: Overview & Philosophy */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs uppercase tracking-ultra font-semibold text-brass-600 block">
              Supportive Consultation Approach
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-light text-forest-950 leading-tight">
              Understanding Our Supportive Ayurvedic Approach
            </h2>
            <p className="text-earth-800 text-base font-light leading-relaxed">
              Dr. Anand Krishna (BAMS) provides personalized Ayurvedic consultations for individuals seeking traditional supportive wellness care alongside primary oncological therapies in KR Puram.
            </p>
            <p className="text-earth-800 text-base font-light leading-relaxed">
              Oncology treatments place substantial physical stress on the body. Our supportive consultations evaluate tissue vitality (*Ojas*) and digestive strength (*Agni*) to support quality of life.
            </p>

            <div className="space-y-3 pt-2">
              <h3 className="font-serif text-lg text-forest-950">Core Goals of Supportive Consultation:</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-earth-800">
                <div className="flex items-center gap-2 p-3 bg-white rounded-xl border border-earth-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Restoring Digestive Appetite (Agni)</span>
                </div>
                <div className="flex items-center gap-2 p-3 bg-white rounded-xl border border-earth-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Sustaining Tissue Vitality (Ojas)</span>
                </div>
                <div className="flex items-center gap-2 p-3 bg-white rounded-xl border border-earth-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Gentle Herbal Rasayana Support</span>
                </div>
                <div className="flex items-center gap-2 p-3 bg-white rounded-xl border border-earth-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Stress Reduction & Sleep Guidance</span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-2xl overflow-hidden shadow-elevated border border-earth-200 aspect-[4/5] relative group">
              <img
                src="/images/treatment_room.jpg"
                alt="Ayurvedic Supportive Care Sanctuary"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 editorial-overlay flex flex-col justify-end p-6 text-cream-50">
                <span className="text-xs text-brass-400 font-semibold uppercase tracking-widest">Compassionate Care</span>
                <p className="font-serif text-lg">Sri Krishna Ayurvedic Clinic</p>
                <p className="text-xs text-cream-200/80">KR Puram, Bangalore</p>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Who May Consider Consultation */}
        <div className="p-8 sm:p-12 bg-white rounded-3xl border border-earth-200 shadow-elevated mb-20 space-y-6">
          <div className="max-w-3xl space-y-2">
            <span className="text-xs uppercase tracking-ultra font-semibold text-brass-600 block">
              Consultation Suitability
            </span>
            <h2 className="text-3xl font-serif font-light text-forest-950">
              Who May Consider an Ayurvedic Supportive Consultation?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-earth-800 font-light">
            <div className="p-5 bg-cream-50 rounded-2xl border border-earth-200 space-y-2">
              <h3 className="font-serif text-base font-semibold text-forest-950">Patients in Treatment</h3>
              <p>Individuals undergoing oncological therapies who wish to discuss complementary dietary and Ayurvedic supportive herbal options.</p>
            </div>
            <div className="p-5 bg-cream-50 rounded-2xl border border-earth-200 space-y-2">
              <h3 className="font-serif text-base font-semibold text-forest-950">Post-Treatment Recovery</h3>
              <p>Patients recovering from treatments seeking traditional Rasayana formulations to rebuild physical strength and vitality.</p>
            </div>
            <div className="p-5 bg-cream-50 rounded-2xl border border-earth-200 space-y-2">
              <h3 className="font-serif text-base font-semibold text-forest-950">Holistic Care Seekers</h3>
              <p>Families seeking a calm, compassionate consultation to understand classical Ayurvedic lifestyle and dietary principles.</p>
            </div>
          </div>
        </div>

        {/* Section 3: Frequently Asked Questions */}
        <div className="space-y-6 mb-20">
          <h2 className="text-3xl font-serif font-light text-forest-950 flex items-center gap-3">
            <HelpCircle className="w-6 h-6 text-brass-600" />
            <span>Frequently Asked Questions</span>
          </h2>

          <div className="space-y-4 text-xs text-earth-800">
            <div className="p-6 bg-white rounded-2xl border border-earth-200 space-y-2">
              <h3 className="font-semibold text-sm text-forest-950">Does Ayurveda cure cancer?</h3>
              <p className="leading-relaxed">No. We do not claim that Ayurveda cures cancer or replaces oncology treatments. Our consultations focus on supportive care, digestive strength, and quality of life.</p>
            </div>

            <div className="p-6 bg-white rounded-2xl border border-earth-200 space-y-2">
              <h3 className="font-semibold text-sm text-forest-950">Should I inform my oncologist before starting Ayurvedic herbs?</h3>
              <p className="leading-relaxed">Yes, absolutely. We encourage open communication with your primary oncology team so all ongoing treatments and herbs are safely coordinated.</p>
            </div>
          </div>
        </div>

        {/* Action CTA */}
        <div className="p-8 sm:p-12 bg-forest-950 text-cream-50 rounded-3xl flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-2">
            <h3 className="font-serif text-2xl font-light">Enquire About a Supportive Consultation</h3>
            <p className="text-xs text-cream-200/80">Sri Krishna Ayurvedic Clinic, KR Puram</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 shrink-0">
            <Link
              to="/book-appointment"
              className="px-7 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-forest-950 font-bold text-xs uppercase tracking-wider rounded-full shadow-soft transition-all text-center flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Consultation</span>
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
