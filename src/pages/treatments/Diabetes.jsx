import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, PhoneCall, CheckCircle2, Sparkles, ShieldAlert, HeartPulse, Flame, Scale, Activity } from 'lucide-react';
import PageHero from '../../components/PageHero';
import Breadcrumb from '../../components/Breadcrumb';
import RelatedTreatments from '../../components/RelatedTreatments';
import { clinicData } from '../../data/clinicData';

export default function Diabetes({ onOpenBooking }) {
  const telUri = `tel:${clinicData.contact.phone.replace(/\s+/g, '')}`;

  const areasOfSupport = [
    "Personalized, low-glycemic dietary planning (Ahara)",
    "Healthy weight management & visceral fat reduction",
    "Tailored daily physical activity & exercise routines (Vyayama)",
    "Lifestyle management (eliminating daytime sleep & sedentary habits)",
    "Stress management & cortisol balance (Pranayama & yoga)",
    "Sleep cycle regulation & circadian optimization",
    "Long-term metabolic wellness & energy restoration"
  ];

  const approaches = [
    {
      name: "Agni & Dhatvagni Optimization",
      desc: "Strengthening deep cellular metabolic fire using pungent and bitter digestive herbs to prevent the accumulation of unprocessed metabolic waste (Ama)."
    },
    {
      name: "Meda Dhatu & Fat Metabolism Regulation",
      desc: "Clearing sluggish lipid tissue channels (Medovaha Srotas) through classical scraping (Lekhana) herbs and active lifestyle recommendations."
    },
    {
      name: "Classical Botanical Support",
      desc: "Physician-guided use of time-tested bitter and astringent botanicals such as Gudmar (Gymnema sylvestre), Vijaysar, Jamun seed, Karela, Methi, and Nisha-Amalaki."
    },
    {
      name: "Glycemic Nutrition & Dietary Discipline",
      desc: "Custom food charts emphasizing fiber-rich grains (barley, millets), bitter vegetables, and legumes while strictly curbing refined flours, sweets, and heavy dairy."
    },
    {
      name: "Daily Physical Movement & Yoga",
      desc: "Specific metabolic asanas (Mandukasana, Ardha Matsyendrasana, Paschimottanasana) and brisk morning walks to enhance cellular insulin sensitivity naturally."
    },
    {
      name: "Stress & Sleep Synchronization",
      desc: "Mindfulness and relaxation techniques to mitigate chronic sympathetic nervous activation and emotional stress that spike blood glucose levels."
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
        badge="METABOLIC AYURVEDA"
        title="Diabetes – Ayurvedic Metabolic Wellness"
        subtitle="Holistic Ayurvedic supportive care focusing on metabolic balance, healthy Agni, dietary discipline, and long-term vitality alongside medical care."
        bgImage="/images/diabetes.jpg"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Navigation & Breadcrumbs */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <Breadcrumb
            items={[
              { label: 'All Treatments', link: '/treatments' },
              { label: 'Diabetes' }
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

        {/* IMPORTANT SAFETY NOTICE BANNER */}
        <div className="p-4 sm:p-5 bg-amber-500/10 border-l-4 border-amber-600 rounded-r-2xl mb-8 flex items-start gap-3.5 text-xs text-earth-900 shadow-sm">
          <ShieldAlert className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <strong className="text-forest-950 font-bold uppercase tracking-wider block">
              Important Safety Notice
            </strong>
            <p className="leading-relaxed">
              Ayurvedic care should not replace prescribed diabetes medicines, insulin, regular blood glucose monitoring, or professional medical supervision. Any changes in conventional medication dosages must strictly be managed under your treating physician/endocrinologist. Our consultations provide complementary metabolic, dietary, and lifestyle support.
            </p>
          </div>
        </div>

        {/* Hero Section Introduction */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-earth-200 shadow-elevated mb-10 space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold text-brass-600 uppercase tracking-widest">
            <Activity className="w-4 h-4 text-brass-500" />
            <span>Metabolic & Glycemic Balance</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif text-forest-950 font-light">
            Ayurvedic Support for Diabetes & Metabolic Wellness
          </h1>
          <p className="text-earth-800 text-sm sm:text-base font-light leading-relaxed">
            Diabetes is a multifaceted metabolic condition requiring sustained lifestyle discipline, nutritional awareness, and digestive equilibrium. At Sri Krishna Ayurvedic Clinic, senior physician Dr. Anand Krishna (BAMS) integrates classical Ayurvedic metabolic principles (<em>Prameha Chikitsa</em>) to help patients improve cellular vitality, reduce metabolic sluggishness, and maintain balanced blood sugar levels naturally alongside conventional medical management.
          </p>
        </div>

        {/* 2-Column: Areas of Support & Ayurvedic Perspective */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10 items-stretch">
          
          {/* Left: Areas of Support */}
          <div className="lg:col-span-5 bg-cream-100/70 p-6 sm:p-8 rounded-3xl border border-earth-200 shadow-sm flex flex-col justify-between space-y-5">
            <div className="space-y-4">
              <span className="text-xs uppercase tracking-ultra font-semibold text-brass-600 block">
                01 • METABOLIC SUPPORT AREAS
              </span>
              <h2 className="text-2xl font-serif text-forest-950 font-light">
                Areas of Supportive Care
              </h2>
              <p className="text-xs text-earth-800 font-light leading-relaxed">
                We provide structured, actionable lifestyle and herbal support:
              </p>

              <ul className="space-y-2.5 text-xs text-forest-950 font-medium">
                {areasOfSupport.map((item, idx) => (
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
                02 • CLASSICAL METABOLIC FRAMEWORK
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif text-forest-950 font-light">
                Ayurvedic Perspective (Prameha & Madhumeha)
              </h2>
              
              <div className="text-xs sm:text-sm text-earth-800 font-light leading-relaxed space-y-3">
                <p>
                  In classical Ayurveda, diabetes-like metabolic disorders are described under the comprehensive framework of <strong>Prameha</strong> (a group of 20 distinct metabolic conditions), of which <strong>Madhumeha</strong> is the prominent chronic subtype characterized by sweet urine and tissue depletion (*Dhatu Kshaya*).
                </p>
                <p className="p-3 bg-cream-50 rounded-xl border border-earth-200 text-xs italic text-forest-950">
                  <strong>Important Classical Clarification:</strong> <em>Madhumeha</em> is a traditional Ayurvedic diagnostic concept described thousands of years ago in texts like Charaka Samhita and Sushruta Samhita. While it shares many clinical presentations with modern diabetes mellitus, it should not automatically be treated as identical to every modern sub-type of diabetes (e.g., autoimmune Type 1, Type 2, or gestational diabetes).
                </p>
                <p>
                  Ayurveda identifies the root cause of Prameha as sluggish digestive fire (<strong>Mandagni</strong>) combined with an overabundance of heavy, sticky Kapha and vitiated fat tissue (<strong>Meda Dhatu</strong>). This blocks cellular channels (<em>Srotas</em>), preventing glucose and nutrients from entering tissues properly.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-3.5 bg-cream-50 rounded-2xl border border-earth-200">
                  <strong className="text-forest-950 text-xs font-serif block">Agni Deepana (Metabolic Spark)</strong>
                  <p className="text-[11px] text-earth-700 font-light mt-1">Kindling digestive and tissue enzymes to burn metabolic waste efficiently.</p>
                </div>
                <div className="p-3.5 bg-cream-50 rounded-2xl border border-earth-200">
                  <strong className="text-forest-950 text-xs font-serif block">Meda Shodhana (Lipid Balance)</strong>
                  <p className="text-[11px] text-earth-700 font-light mt-1">Clearing fatty tissue stagnation and restoring natural cellular receptivity.</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Section: Ayurvedic Approaches */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-earth-200 shadow-elevated mb-10 space-y-6">
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-ultra font-semibold text-brass-600 block">
              03 • INTEGRATIVE WELLNESS MODALITIES
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif text-forest-950 font-light">
              Our Ayurvedic Approach to Metabolic Wellness
            </h2>
            <p className="text-earth-800 text-xs sm:text-sm font-light leading-relaxed">
              Dr. Anand Krishna prescribes personalized protocols tailored to your current glycemic markers:
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
              METABOLIC CONSULTATION IN KR PURAM
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-light text-cream-50 leading-tight">
              Take Charge of Your Metabolic Health Today
            </h2>
            <p className="text-xs sm:text-sm text-cream-200/80 font-light leading-relaxed">
              Book a consultation with Dr. Anand Krishna (BAMS, 26+ years clinical practice) to receive personalized nutrition, lifestyle guidance, and supportive Ayurvedic care.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3.5 shrink-0">
            <button
              onClick={() => onOpenBooking ? onOpenBooking('Diabetes Wellness Consultation') : null}
              className="px-7 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-forest-950 font-bold text-xs uppercase tracking-wider rounded-full shadow-soft transition-all text-center flex items-center justify-center gap-2 cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Diabetes Wellness Consultation</span>
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
        <RelatedTreatments currentTreatmentId="diabetes" />

      </div>
    </motion.div>
  );
}
