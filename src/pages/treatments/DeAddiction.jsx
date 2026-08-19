import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, PhoneCall, CheckCircle2, Sparkles, ShieldAlert, HeartPulse, HeartHandshake, Sunrise, ShieldCheck } from 'lucide-react';
import PageHero from '../../components/PageHero';
import Breadcrumb from '../../components/Breadcrumb';
import RelatedTreatments from '../../components/RelatedTreatments';
import { clinicData } from '../../data/clinicData';

export default function DeAddiction({ onOpenBooking }) {
  const telUri = `tel:${clinicData.contact.phone.replace(/\s+/g, '')}`;

  const areasOfSupport = [
    "Tobacco & nicotine cessation support",
    "Alcohol recovery & sobriety wellness support",
    "Lifestyle restructuring & wholesome habits",
    "Stress management & nervous system calming",
    "Sleep support & resolving withdrawal-related insomnia",
    "Healthy routine development (Dinacharya)",
    "Nutrition & digestive Agni restoration"
  ];

  const pillars = [
    {
      name: "Dinacharya (Daily Routine Restructuring)",
      desc: "Establishing grounded daily circadian rhythms—waking, bowel clearance, therapeutic bathing, balanced meals, and regular bedtime to anchor neuro-chemical stability."
    },
    {
      name: "Pranayama & Breathwork",
      desc: "Mind-stabilizing breath techniques (Nadi Shodhana, Bhramari, Sheetali) that calm autonomic nervous arousal, curb acute cravings, and ease psychological anxiety."
    },
    {
      name: "Satvavajaya Chikitsa (Mental Fortification)",
      desc: "Classical Ayurvedic psychological support aimed at replacing negative subconscious impulses with positive mental clarity (Sattva Guna) and conscious self-mastery."
    },
    {
      name: "Herbal Nervine & Liver Rasayanas",
      desc: "Physician-guided use of classical botanicals like Brahmi, Shankhpushpi, Jatamansi, Ashwagandha, and Bhumyamalaki to support liver detoxification and neurological regeneration."
    },
    {
      name: "Sattvic Nutrition & Gut Recovery",
      desc: "Fresh, easily digestible, wholesome meals that restore digestive Agni, replenish depleted micronutrients, and repair gastrointestinal mucosa harmed by substance usage."
    },
    {
      name: "Gentle Restorative Yoga & Meditation",
      desc: "Non-strenuous mindful movement and guided meditation to reconnect bodily awareness, foster emotional resilience, and promote sound restorative sleep."
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
        badge="RECOVERY & WELLNESS SUPPORT"
        title="De-addiction – Ayurvedic Support & Wellness"
        subtitle="Holistic Ayurvedic lifestyle and wellness support designed to nourish the nervous system, reduce stress, and sustain long-term sobriety."
        bgImage="/images/hero_adobe_3.jpg"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Navigation & Breadcrumbs */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <Breadcrumb
            items={[
              { label: 'All Treatments', link: '/treatments' },
              { label: 'De-addiction' }
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

        {/* IMPORTANT SAFETY DISCLAIMER BANNER */}
        <div className="p-4 sm:p-5 bg-amber-500/10 border-l-4 border-amber-600 rounded-r-2xl mb-8 flex items-start gap-3.5 text-xs text-earth-900 shadow-sm">
          <ShieldAlert className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <strong className="text-forest-950 font-bold uppercase tracking-wider block">
              Important Medical & Safety Notice
            </strong>
            <p className="leading-relaxed">
              Alcohol and substance withdrawal can cause severe, potentially life-threatening physiological complications (such as delirium tremens, seizures, and cardiovascular instability) that require immediate conventional medical supervision and emergency detoxification. Ayurvedic care at Sri Krishna Ayurvedic Clinic is strictly provided as <strong>supportive wellness care</strong> (lifestyle guidance, stress relief, nutrition, and nervous system nourishment) alongside professionally supervised recovery programs, and is NOT a replacement for emergency medical detox or psychiatric rehabilitation.
            </p>
          </div>
        </div>

        {/* Hero Section Introduction */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-earth-200 shadow-elevated mb-10 space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold text-brass-600 uppercase tracking-widest">
            <Sunrise className="w-4 h-4 text-brass-500" />
            <span>Holistic Recovery & Rejuvenation</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif text-forest-950 font-light">
            Ayurvedic Support for De-addiction & Recovery
          </h1>
          <p className="text-earth-800 text-sm sm:text-base font-light leading-relaxed">
            The path of overcoming substance dependency requires not just physical abstinence, but also deep mental tranquility, nervous system repair, and the cultivation of wholesome daily habits. Under the guidance of Dr. Anand Krishna (BAMS), our supportive Ayurvedic recovery program provides empathetic counseling, classical herbal nervines, and lifestyle restructuring to help individuals build resilient, healthy lives.
          </p>
        </div>

        {/* 2-Column: Areas of Support & Ayurvedic Perspective */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10 items-stretch">
          
          {/* Left: Areas of Support */}
          <div className="lg:col-span-5 bg-cream-100/70 p-6 sm:p-8 rounded-3xl border border-earth-200 shadow-sm flex flex-col justify-between space-y-5">
            <div className="space-y-4">
              <span className="text-xs uppercase tracking-ultra font-semibold text-brass-600 block">
                01 • RECOVERY DOMAINS
              </span>
              <h2 className="text-2xl font-serif text-forest-950 font-light">
                Areas of Supportive Care
              </h2>
              <p className="text-xs text-earth-800 font-light leading-relaxed">
                We assist recovering individuals through structured wellness and rejuvenation therapies:
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
                02 • CLASSICAL RECOVERY WISDOM
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif text-forest-950 font-light">
                Ayurvedic Perspective on Habit & Mind (Satvavajaya & Ojas)
              </h2>
              
              <div className="text-xs sm:text-sm text-earth-800 font-light leading-relaxed space-y-3">
                <p>
                  Ayurveda views chronic substance dependence (<em>Madatyaya</em>) as a condition that depletes <strong>Ojas</strong> (the biological vitality shield) and destabilizes <strong>Prana Vata</strong> and <strong>Sadhaka Pitta</strong> (the neuro-emotional regulators).
                </p>
                <p>
                  When toxins (<em>Ama</em>) cloud the cognitive channels (<em>Manovaha Srotas</em>), mental qualities shift toward agitation (<em>Rajas</em>) and lethargy/depression (<em>Tamas</em>). This creates compulsive cravings and cognitive distress during withdrawal periods.
                </p>
                <p>
                  Through classical <strong>Dinacharya</strong> (daily lifestyle disciplines), <strong>Sattvic Ahara</strong> (clean wholesome nutrition), and <strong>Medhya Rasayanas</strong> (brain-calming herbs), Ayurveda gently rebuilds Ojas, nurtures nervous system resilience, and fosters lasting mental fortitude (<em>Dhairya & Smriti</em>).
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-3.5 bg-cream-50 rounded-2xl border border-earth-200">
                  <strong className="text-forest-950 text-xs font-serif block">Nervine Nourishment</strong>
                  <p className="text-[11px] text-earth-700 font-light mt-1">Calming the nervous system and easing psychological irritability and sleep distress.</p>
                </div>
                <div className="p-3.5 bg-cream-50 rounded-2xl border border-earth-200">
                  <strong className="text-forest-950 text-xs font-serif block">Ojas & Vitality Rebuilding</strong>
                  <p className="text-[11px] text-earth-700 font-light mt-1">Detoxifying cellular metabolic waste and restoring physical strength and stamina.</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Section: Supportive Care Pillars */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-earth-200 shadow-elevated mb-10 space-y-6">
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-ultra font-semibold text-brass-600 block">
              03 • HOLISTIC WELLNESS PILLARS
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif text-forest-950 font-light">
              Supportive Lifestyle & Recovery Approaches
            </h2>
            <p className="text-earth-800 text-xs sm:text-sm font-light leading-relaxed">
              Our clinic emphasizes compassion, structure, and personalized daily care:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {pillars.map((pil, i) => (
              <div key={i} className="p-5 bg-cream-50 rounded-2xl border border-earth-200 space-y-2 hover:-translate-y-1 transition-transform">
                <h3 className="font-serif text-base font-medium text-forest-950 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-forest-900 text-brass-400 text-xs flex items-center justify-center font-mono font-bold">
                    0{i + 1}
                  </span>
                  <span>{pil.name}</span>
                </h3>
                <p className="text-xs text-earth-800 leading-relaxed font-light">
                  {pil.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Consultation Banner */}
        <div className="p-6 sm:p-8 bg-forest-950 text-cream-50 rounded-3xl flex flex-col lg:flex-row lg:items-center justify-between gap-6 shadow-2xl mb-10">
          <div className="space-y-2 max-w-2xl">
            <span className="text-xs uppercase tracking-ultra font-semibold text-brass-400 block">
              COMPASSIONATE GUIDANCE IN KR PURAM
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-light text-cream-50 leading-tight">
              Talk to Our Supportive Wellness Team
            </h2>
            <p className="text-xs sm:text-sm text-cream-200/80 font-light leading-relaxed">
              Reach out to Dr. Anand Krishna (BAMS) for supportive lifestyle guidance, nutritional recovery, and stress reduction tailored to your wellness journey.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3.5 shrink-0">
            <button
              onClick={() => onOpenBooking ? onOpenBooking('De-addiction Supportive Consultation') : null}
              className="px-7 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-forest-950 font-bold text-xs uppercase tracking-wider rounded-full shadow-soft transition-all text-center flex items-center justify-center gap-2 cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>Talk to Our Wellness Team</span>
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
        <RelatedTreatments currentTreatmentId="de-addiction" />

      </div>
    </motion.div>
  );
}
