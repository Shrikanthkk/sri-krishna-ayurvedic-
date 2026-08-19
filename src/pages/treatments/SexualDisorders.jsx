import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, PhoneCall, CheckCircle2, Sparkles, ShieldCheck, Lock, HeartPulse, HeartHandshake, Shield } from 'lucide-react';
import PageHero from '../../components/PageHero';
import Breadcrumb from '../../components/Breadcrumb';
import RelatedTreatments from '../../components/RelatedTreatments';
import { clinicData } from '../../data/clinicData';

export default function SexualDisorders({ onOpenBooking }) {
  const telUri = `tel:${clinicData.contact.phone.replace(/\s+/g, '')}`;

  const concerns = [
    "Sexual wellness & overall vitality concerns",
    "Reduced sexual stamina & physical fatigue",
    "Sexual dysfunction (erectile weakness, early discharge, low libido)",
    "Reproductive wellness & sperm/ovum health",
    "Stress-related intimacy challenges & performance anxiety",
    "General metabolic fatigue & diminished Ojas",
    "Age-related hormonal & vitality decline"
  ];

  const approaches = [
    {
      name: "Personalized & Confidential Consultation",
      desc: "One-on-one, completely private clinical assessment evaluating physical constitution, emotional health, relationship stress, and Dosha imbalances with senior physician Dr. Anand Krishna (BAMS)."
    },
    {
      name: "Diet & Nutrition Guidance (Ahara)",
      desc: "Customized nutrition focused on building Ojas (vital essence) with nutrient-dense foods including cow's ghee, soaked almonds, dates, saffron, figs, and milk preparations."
    },
    {
      name: "Lifestyle Modification (Vihara)",
      desc: "Regulating circadian sleep cycles, avoiding excessive digital strain, eliminating smoking/alcohol triggers, and establishing wholesome daily habits."
    },
    {
      name: "Stress & Mind Management (Manasa Chikitsa)",
      desc: "Addressing psychological performance anxiety, emotional overwhelm, and cortisol spikes through guided breathwork (Pranayama) and restorative mindfulness."
    },
    {
      name: "Yoga & Pelvic Floor Toning",
      desc: "Specific yogic postures and mudras (such as Ashwini Mudra, Mula Bandha, Bhujangasana, and Setu Bandhasana) to enhance pelvic blood flow and nerve tone."
    },
    {
      name: "Classical Vajikarana Rasayanas",
      desc: "Physician-supervised administration of authentic, pure classical botanicals (Ashwagandha, Shilajit, Safed Musli, Gokshura, Kaunch Beej) to nourish the Shukra Dhatu."
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
        badge="VAJIKARANA & REPRODUCTIVE WELLNESS"
        title="Sexual Disorders – Ayurvedic Wellness Care"
        subtitle="Personalized, dignified, and confidential Ayurvedic wellness care to restore vitality, stamina, reproductive equilibrium, and inner confidence."
        bgImage="/images/consultation.png"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Navigation & Breadcrumbs */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <Breadcrumb
            items={[
              { label: 'All Treatments', link: '/treatments' },
              { label: 'Sexual Disorders' }
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

        {/* Confidentiality & Dignity Notice */}
        <div className="p-4 sm:p-5 bg-forest-950 text-cream-50 rounded-2xl border border-brass-500/30 mb-8 flex items-start gap-3.5 shadow-elevated">
          <div className="w-9 h-9 rounded-full bg-forest-900 text-brass-400 flex items-center justify-center shrink-0 border border-brass-500/30">
            <Lock className="w-4.5 h-4.5" />
          </div>
          <div className="space-y-0.5 text-xs">
            <strong className="text-brass-300 font-serif text-sm block">100% Confidential & Respectful Care</strong>
            <p className="text-cream-200/90 font-light leading-relaxed">
              We treat all consultations with the highest medical ethics, absolute privacy, and profound professional empathy. Every individual receives dedicated one-on-one attention in a calm, supportive setting.
            </p>
          </div>
        </div>

        {/* Hero Section Introduction */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-earth-200 shadow-elevated mb-10 space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold text-brass-600 uppercase tracking-widest">
            <Sparkles className="w-4 h-4 text-brass-500" />
            <span>Classical Vajikarana Chikitsa</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif text-forest-950 font-light">
            Ayurvedic Support for Sexual Wellness
          </h1>
          <p className="text-earth-800 text-sm sm:text-base font-light leading-relaxed">
            In classical Ayurveda, sexual health and reproductive vigor are regarded as pillars of longevity, strength, and emotional harmony. Rather than offering short-term synthetic stimulants that cause systemic exhaustion, Ayurvedic <strong>Vajikarana Chikitsa</strong> nurtures the underlying tissue vitality (<em>Shukra Dhatu</em>), calms the nervous system, and builds sustainable vigor naturally.
          </p>
        </div>

        {/* 2-Column: Areas of Concern & Classical Ayurvedic Perspective */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10 items-stretch">
          
          {/* Left: Areas of Concern */}
          <div className="lg:col-span-5 bg-cream-100/70 p-6 sm:p-8 rounded-3xl border border-earth-200 shadow-sm flex flex-col justify-between space-y-5">
            <div className="space-y-4">
              <span className="text-xs uppercase tracking-ultra font-semibold text-brass-600 block">
                01 • WELLNESS CONCERNS
              </span>
              <h2 className="text-2xl font-serif text-forest-950 font-light">
                Areas of Concern Addressed
              </h2>
              <p className="text-xs text-earth-800 font-light leading-relaxed">
                We provide discreet, evidence-guided Ayurvedic support for a wide range of intimacy and reproductive concerns:
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
                02 • CLASSICAL PATHOLOGY & PRINCIPLES
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif text-forest-950 font-light">
                Ayurvedic Perspective (Vajikarana & Shukra Dhatu)
              </h2>
              
              <div className="text-xs sm:text-sm text-earth-800 font-light leading-relaxed space-y-3">
                <p>
                  Ayurveda identifies seven sequential biological tissues (<em>Sapta Dhatus</em>), culminating in <strong>Shukra Dhatu</strong> — the most refined essence responsible for reproductive health, immunity, glow, and vital stamina (<em>Ojas</em>).
                </p>
                <p>
                  When digestion (*Agni*) is weak, or when mental stress (<em>Vata</em> and <em>Raja Guna</em>) overexcites the nervous system, tissue nutrition is disrupted before reaching Shukra Dhatu. This leads to <em>Klaibya</em> (functional weakness), premature discharge (*Kshipra Munchana*), or loss of desire (*Alpa Harsha*).
                </p>
                <p>
                  Through classical <strong>Vajikarana</strong> (virility science), we systematically cleanse the reproductive micro-channels (<em>Shukravaha Srotas</em>), balance the neuro-endocrine axis, and restore deep tissue vigor through physician-formulated herbal tonics and mental calm.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-3.5 bg-cream-50 rounded-2xl border border-earth-200">
                  <strong className="text-forest-950 text-xs font-serif block">Shukra Dhatu Poshanam</strong>
                  <p className="text-[11px] text-earth-700 font-light mt-1">Deep biological nourishment of reproductive tissues and hormonal balance.</p>
                </div>
                <div className="p-3.5 bg-cream-50 rounded-2xl border border-earth-200">
                  <strong className="text-forest-950 text-xs font-serif block">Manasa Shanti (Mental Calm)</strong>
                  <p className="text-[11px] text-earth-700 font-light mt-1">Alleviating stress-induced performance anxiety and nervous exhaustion.</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Section: Ayurvedic Care Modalities */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-earth-200 shadow-elevated mb-10 space-y-6">
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-ultra font-semibold text-brass-600 block">
              03 • COMPREHENSIVE CARE
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif text-forest-950 font-light">
              Our Ayurvedic Care Modalities
            </h2>
            <p className="text-earth-800 text-xs sm:text-sm font-light leading-relaxed">
              Every plan is individualized, safe, and medically supervised:
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
              PRIVATE CONSULTATION IN KR PURAM
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-light text-cream-50 leading-tight">
              Begin Your Journey to Restored Vitality & Confidence
            </h2>
            <p className="text-xs sm:text-sm text-cream-200/80 font-light leading-relaxed">
              Book a private, compassionate consultation with Dr. Anand Krishna (BAMS). All inquiries and discussions are kept strictly confidential.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3.5 shrink-0">
            <button
              onClick={() => onOpenBooking ? onOpenBooking('Sexual Wellness Private Consultation') : null}
              className="px-7 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-forest-950 font-bold text-xs uppercase tracking-wider rounded-full shadow-soft transition-all text-center flex items-center justify-center gap-2 cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Private Consultation</span>
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
        <RelatedTreatments currentTreatmentId="sexual-disorders" />

      </div>
    </motion.div>
  );
}
