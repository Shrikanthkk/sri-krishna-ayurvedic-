import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, PhoneCall, CheckCircle2, Sparkles, ShieldCheck, HeartPulse, Droplets, SunMedium } from 'lucide-react';
import PageHero from '../../components/PageHero';
import Breadcrumb from '../../components/Breadcrumb';
import RelatedTreatments from '../../components/RelatedTreatments';
import { clinicData } from '../../data/clinicData';

export default function SkinProblems({ onOpenBooking }) {
  const telUri = `tel:${clinicData.contact.phone.replace(/\s+/g, '')}`;

  const concerns = [
    "Acne, pimples & chronic breakouts",
    "Dry skin, flaking & rough textures",
    "Itching (Kandu) & chronic pruritus",
    "Skin irritation, redness & burning sensations",
    "Rashes, allergic flares & dermatitis",
    "Excess oiliness & clogged skin pores",
    "Uneven skin appearance & hyperpigmentation",
    "Other common concerns (Eczema, Psoriasis, Urticaria)"
  ];

  const approaches = [
    {
      name: "Personalized Ayurvedic Consultation",
      desc: "In-depth pulse evaluation (Nadi Pariksha) to identify the specific Dosha imbalance, toxic load (Ama), and individual skin Prakriti."
    },
    {
      name: "Herbal External Applications (Lepa)",
      desc: "Freshly prepared topical pastes blending classical botanicals like Neem, Manjistha, Turmeric, Chandana, and Lodhra to cool inflammation and soothe blemishes."
    },
    {
      name: "Ayurvedic Skin-Care Preparations",
      desc: "Classical internal blood-purifying Kashayams (decoctions) and external medicated oils (Nalpamaradi, Kumkumadi, Eladi) that nurture cellular regeneration."
    },
    {
      name: "Diet Guidance (Ahara)",
      desc: "Pitta-pacifying and blood-cleansing dietary guidelines avoiding incompatible foods (Viruddha Ahara), excessive chilies, sour fermented foods, and refined sugars."
    },
    {
      name: "Lifestyle Guidance (Vihara)",
      desc: "Daily natural skincare routines, sun protection guidelines, sleep synchronization, and stress management to prevent stress-triggered inflammatory flare-ups."
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
        badge="DERMATOLOGICAL AYURVEDA"
        title="Skin Problems – Ayurvedic Skin Care"
        subtitle="Personalized Ayurvedic skin care addressing the root causes of skin concerns through blood purification, Dosha balance, and herbal therapy."
        bgImage="/images/hero_stock_4.jpg"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Navigation & Breadcrumbs */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <Breadcrumb
            items={[
              { label: 'All Treatments', link: '/treatments' },
              { label: 'Skin Problems' }
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
            <Sparkles className="w-4 h-4 text-brass-500" />
            <span>Pure Internal Radiance & Cellular Healing</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif text-forest-950 font-light">
            Ayurvedic Care for Skin Problems
          </h1>
          <p className="text-earth-800 text-sm sm:text-base font-light leading-relaxed">
            In Ayurvedic medicine, the skin (<em>Twak</em>) is a direct mirror of your internal physiology, particularly blood purity (<em>Rakta Dhatu</em>) and digestive equilibrium. Rather than suppressing cutaneous symptoms with temporary topical creams, our senior physician Dr. Anand Krishna (BAMS) formulates an individualized treatment program to cleanse underlying impurities and restore natural skin resilience.
          </p>
        </div>

        {/* 2-Column: Common Concerns & Ayurvedic Perspective */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10 items-stretch">
          
          {/* Left: Common Concerns */}
          <div className="lg:col-span-5 bg-cream-100/70 p-6 sm:p-8 rounded-3xl border border-earth-200 shadow-sm flex flex-col justify-between space-y-5">
            <div className="space-y-4">
              <span className="text-xs uppercase tracking-ultra font-semibold text-brass-600 block">
                01 • COMMON SKIN CONCERNS
              </span>
              <h2 className="text-2xl font-serif text-forest-950 font-light">
                Common Concerns Addressed
              </h2>
              <p className="text-xs text-earth-800 font-light leading-relaxed">
                We provide tailored Ayurvedic care for diverse acute and chronic dermatological challenges:
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
                02 • CLASSICAL UNDERSTANDING
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif text-forest-950 font-light">
                Ayurvedic Perspective (Pitta, Rakta Dhatu & Digestion)
              </h2>
              
              <div className="text-xs sm:text-sm text-earth-800 font-light leading-relaxed space-y-3">
                <p>
                  According to classical Ayurveda, healthy skin depends on the harmonious interaction of <strong>Bhrajaka Pitta</strong> (the sub-dosha governing skin complexion, temperature, and glow) and <strong>Rakta Dhatu</strong> (the blood tissue).
                </p>
                <p>
                  When digestion (*Jatharagni*) is impaired, improperly digested food produces metabolic endotoxins (*Ama*). When Ama combines with aggravated Pitta and enters the bloodstream, it heats and vitiates the Rakta Dhatu, resulting in inflammation, redness, acne, and itchy dermatological flare-ups.
                </p>
                <p>
                  Unwholesome food combinations (*Viruddha Ahara* like milk with sour fruits or fish), excessive spicy/fried food, stress, and irregular sleep further aggravate these doshas. Hence, true Ayurvedic dermatological care focuses on detoxifying the liver and blood while restoring gut flora.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-3.5 bg-cream-50 rounded-2xl border border-earth-200">
                  <strong className="text-forest-950 text-xs font-serif block">Pitta & Rakta Shodhana</strong>
                  <p className="text-[11px] text-earth-700 font-light mt-1">Cooling internal heat and detoxifying circulating blood toxins.</p>
                </div>
                <div className="p-3.5 bg-cream-50 rounded-2xl border border-earth-200">
                  <strong className="text-forest-950 text-xs font-serif block">Agni & Ama Elimination</strong>
                  <p className="text-[11px] text-earth-700 font-light mt-1">Strengthening gut assimilation to prevent systemic metabolic toxicity.</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Section: Ayurvedic Care & Approaches */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-earth-200 shadow-elevated mb-10 space-y-6">
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-ultra font-semibold text-brass-600 block">
              03 • HOLISTIC CARE MODALITIES
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif text-forest-950 font-light">
              Ayurvedic Skin Care Approaches
            </h2>
            <p className="text-earth-800 text-xs sm:text-sm font-light leading-relaxed">
              Our clinic combines classical internal herbal therapies with rejuvenating external applications:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {approaches.map((app, i) => (
              <div key={i} className="p-5 bg-cream-50 rounded-2xl border border-earth-200 space-y-2 hover:-translate-y-1 transition-transform">
                <h3 className="font-serif text-base font-medium text-forest-950 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-forest-900 text-brass-400 text-xs flex items-center justify-center font-mono font-bold">
                    0{i + 1}
                  </span>
                  <span>{app.name}</span>
                </h3>
                <p className="text-xs text-earth-800 leading-relaxed font-light">
                  {app.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Consultation Banner */}
        <div className="p-6 sm:p-8 bg-forest-950 text-cream-50 rounded-3xl flex flex-col lg:flex-row lg:items-center justify-between gap-6 shadow-2xl mb-10">
          <div className="space-y-2 max-w-2xl">
            <span className="text-xs uppercase tracking-ultra font-semibold text-brass-400 block">
              PERSONALIZED SKIN ASSESSMENT
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-light text-cream-50 leading-tight">
              Ready for Natural, Radiant Skin Health?
            </h2>
            <p className="text-xs sm:text-sm text-cream-200/80 font-light leading-relaxed">
              Consult with Dr. Anand Krishna (BAMS) in KR Puram to identify the root cause of your skin concerns and begin a tailored Ayurvedic care plan.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3.5 shrink-0">
            <button
              onClick={() => onOpenBooking ? onOpenBooking('Skin Problems Consultation') : null}
              className="px-7 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-forest-950 font-bold text-xs uppercase tracking-wider rounded-full shadow-soft transition-all text-center flex items-center justify-center gap-2 cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Skin Care Consultation</span>
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
        <RelatedTreatments currentTreatmentId="skin-problems" />

      </div>
    </motion.div>
  );
}
