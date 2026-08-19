import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, PhoneCall, CheckCircle2, Sparkles, ShieldCheck, HeartPulse, Feather, Wind } from 'lucide-react';
import PageHero from '../../components/PageHero';
import Breadcrumb from '../../components/Breadcrumb';
import RelatedTreatments from '../../components/RelatedTreatments';
import { clinicData } from '../../data/clinicData';

export default function HairFall({ onOpenBooking }) {
  const telUri = `tel:${clinicData.contact.phone.replace(/\s+/g, '')}`;

  const concerns = [
    "Excessive hair fall & daily shedding",
    "Hair thinning & progressive loss of density",
    "Weak, brittle hair strands & breakage",
    "Dry scalp & poor follicle nourishment",
    "Scalp irritation, redness & itching",
    "Dandruff-related concerns & flaky scalp (Darunaka)",
    "Premature greying (Palitya)"
  ];

  const therapies = [
    {
      name: "Shiro Abhyanga",
      desc: "Traditional therapeutic head massage with warm herbal oils to stimulate scalp micro-circulation, relax the nervous system, and strengthen hair roots (Kesha Moola)."
    },
    {
      name: "Classical Ayurvedic Hair Oils",
      desc: "Medicated herbal tailams formulated with Bhringraj (King of Hair), Neelibringadi, Amalaki, Brahmi, and Yashtimadhu that deliver deep nourishment to follicles."
    },
    {
      name: "Herbal Scalp Applications (Shirolepa)",
      desc: "Herbal hair masks prepared with cooling herbs like Triphala, Hibiscus, Fenugreek, and Henna to soothe scalp inflammation, remove dandruff, and condition hair."
    },
    {
      name: "Marma Point Head Therapy",
      desc: "Gentle stimulation of vital cranial marma points (Adhipati, Simanta) to release chronic mental tension, reduce stress hormones, and encourage healthy hair cycles."
    },
    {
      name: "Nutrition Guidance for Hair Vitality",
      desc: "Dietary protocols rich in iron, zinc, essential fatty acids, and calcium to nourish Asthi Dhatu (bone tissue), of which hair is a biological sub-tissue (Upadhatu)."
    },
    {
      name: "Lifestyle & Stress Modulation",
      desc: "Stress reduction techniques, Pranayama, sleep optimization, and advice on natural non-chemical hair washing practices."
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full"
    >
      <PageHero
        badge="TRICHOLOGICAL AYURVEDA"
        title="Hair Fall Treatment – Ayurvedic Hair Care"
        subtitle="Holistic Ayurvedic hair and scalp care focused on arresting hair fall, nourishing follicles, and fostering resilient, healthy hair growth."
        bgImage="/images/hero_adobe_1.jpg"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Navigation & Breadcrumbs */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <Breadcrumb
            items={[
              { label: 'All Treatments', link: '/treatments' },
              { label: 'Hair Fall Treatment' }
            ]}
          />

          <Link
            to="/treatments"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-forest-900 hover:text-brass-700 transition-colors w-fit"
          >
            <ArrowLeft className="w-4 h-4 text-brass-600" />
            <span>Back to All Treatments</span>
          </Link>
        </div>

        {/* Hero Section Introduction */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-earth-200 shadow-elevated mb-10 space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold text-brass-600 uppercase tracking-widest">
            <Feather className="w-4 h-4 text-brass-500" />
            <span>Holistic Scalp & Follicle Rejuvenation</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif text-forest-950 font-light">
            Ayurvedic Hair Fall Treatment
          </h1>
          <p className="text-earth-800 text-sm sm:text-base font-light leading-relaxed">
            In Ayurvedic medicine, hair (<em>Kesha</em>) is considered a metabolic byproduct (<em>Upadhatu</em>) of <strong>Asthi Dhatu</strong> (bone tissue). Hair fall and thinning are not merely cosmetic problems; they reflect deeper nutritional deficiencies, chronic stress, or internal Dosha vitiation. At Sri Krishna Ayurvedic Clinic, Dr. Anand Krishna (BAMS) provides comprehensive hair care addressing both internal metabolic vitality and topical follicle strength.
          </p>
        </div>

        {/* 2-Column: Common Concerns & Ayurvedic Perspective */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10 items-stretch">
          
          {/* Left: Common Concerns */}
          <div className="lg:col-span-5 bg-cream-100/70 p-6 sm:p-8 rounded-3xl border border-earth-200 shadow-sm flex flex-col justify-between space-y-5">
            <div className="space-y-4">
              <span className="text-xs uppercase tracking-ultra font-semibold text-brass-600 block">
                01 • HAIR & SCALP CONCERNS
              </span>
              <h2 className="text-2xl font-serif text-forest-950 font-light">
                Common Concerns Addressed
              </h2>
              <p className="text-xs text-earth-800 font-light leading-relaxed">
                We design tailored Ayurvedic treatment regimens for a variety of hair and scalp issues:
              </p>

              <ul className="space-y-2.5 text-xs text-forest-950 font-medium">
                {concerns.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 p-2.5 bg-white rounded-xl border border-earth-200/80 shadow-xs">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right: Ayurvedic Perspective */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-earth-200 shadow-elevated space-y-4 flex flex-col justify-between">
            <div className="space-y-4">
              <span className="text-xs uppercase tracking-ultra font-semibold text-brass-600 block">
                02 • CLASSICAL PATHOLOGY
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif text-forest-950 font-light">
                Ayurvedic Perspective (Khalitya, Palitya & Indralupta)
              </h2>
              
              <div className="text-xs sm:text-sm text-earth-800 font-light leading-relaxed space-y-3">
                <p>
                  Classical Ayurvedic texts categorize hair disorders into distinct physiological conditions:
                </p>
                <ul className="space-y-2 pl-2">
                  <li>
                    <strong>Khalitya (Hair Fall):</strong> Aggravated <em>Bhrajaka Pitta</em> combines with <em>Vata</em> at the root of the hair (Romakoopa), causing hair to loosen and shed prematurely.
                  </li>
                  <li>
                    <strong>Palitya (Premature Greying):</strong> Excessive bodily heat and Pitta vitiation burns the natural pigmentation of the hair strands, causing premature grey hair.
                  </li>
                  <li>
                    <strong>Indralupta (Patchy Hair Loss):</strong> Vata and Pitta dislodge hair follicles, after which Kapha and Rakta block the pores, preventing new hair emergence.
                  </li>
                </ul>
                <p>
                  Factors such as chronic mental stress, late-night waking (*Ratri Jagarana*), poor protein/mineral absorption, and chemical-laden hair products exacerbate these imbalances. Healing requires cooling excess Pitta, balancing Vata, and nourishing the Asthi Dhatu.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-3.5 bg-cream-50 rounded-2xl border border-earth-200">
                  <strong className="text-forest-950 text-xs font-serif block">Kesha Moola Poshanam</strong>
                  <p className="text-[11px] text-earth-700 font-light mt-1">Deep follicle nourishment to anchor hair roots and prolong the growth phase.</p>
                </div>
                <div className="p-3.5 bg-cream-50 rounded-2xl border border-earth-200">
                  <strong className="text-forest-950 text-xs font-serif block">Pitta Shamana Care</strong>
                  <p className="text-[11px] text-earth-700 font-light mt-1">Cooling the scalp environment to prevent premature follicle burnout and greying.</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Section: Ayurvedic Care & Therapies */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-earth-200 shadow-elevated mb-10 space-y-6">
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-ultra font-semibold text-brass-600 block">
              03 • THERAPEUTIC REGIMENS
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif text-forest-950 font-light">
              Ayurvedic Hair & Scalp Therapies
            </h2>
            <p className="text-earth-800 text-xs sm:text-sm font-light leading-relaxed">
              Our clinical hair care treatments incorporate time-tested classical therapies:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {therapies.map((th, i) => (
              <div key={i} className="p-5 bg-cream-50 rounded-2xl border border-earth-200 space-y-2 hover:-translate-y-1 transition-transform">
                <h3 className="font-serif text-base font-medium text-forest-950 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-forest-900 text-brass-400 text-xs flex items-center justify-center font-mono font-bold">
                    0{i + 1}
                  </span>
                  <span>{th.name}</span>
                </h3>
                <p className="text-xs text-earth-800 leading-relaxed font-light">
                  {th.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Consultation Banner */}
        <div className="p-6 sm:p-8 bg-forest-950 text-cream-50 rounded-3xl flex flex-col lg:flex-row lg:items-center justify-between gap-6 shadow-2xl mb-10">
          <div className="space-y-2 max-w-2xl">
            <span className="text-xs uppercase tracking-ultra font-semibold text-brass-400 block">
              SPECIALIZED HAIR CONSULTATION
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-light text-cream-50 leading-tight">
              Revitalize Your Hair Health Naturally
            </h2>
            <p className="text-xs sm:text-sm text-cream-200/80 font-light leading-relaxed">
              Consult with Dr. Anand Krishna (BAMS) in KR Puram to identify your underlying hair fall causes and receive an authentic Ayurvedic treatment plan.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3.5 shrink-0">
            <button
              onClick={() => onOpenBooking ? onOpenBooking('Hair Fall Treatment Consultation') : null}
              className="px-7 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-forest-950 font-bold text-xs uppercase tracking-wider rounded-full shadow-soft transition-all text-center flex items-center justify-center gap-2 cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Hair Care Consultation</span>
            </button>
            <a
              href={telUri}
              className="px-7 py-3.5 bg-brass-500 hover:bg-brass-400 text-forest-950 font-bold text-xs uppercase tracking-wider rounded-full transition-all text-center flex items-center justify-center gap-2"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Call Clinic</span>
            </a>
          </div>
        </div>

        {/* Explore Other Treatments */}
        <RelatedTreatments currentTreatmentId="hair-fall" />

      </div>
    </motion.div>
  );
}
