import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, PhoneCall, CheckCircle2, Sparkles, ShieldAlert, HeartPulse, HeartHandshake, Shield, HelpCircle, Activity } from 'lucide-react';
import PageHero from '../../components/PageHero';
import Breadcrumb from '../../components/Breadcrumb';
import RelatedTreatments from '../../components/RelatedTreatments';
import { clinicData } from '../../data/clinicData';

export default function CancerTreatment({ onOpenBooking }) {
  const telUri = `tel:${clinicData.contact.phone.replace(/\s+/g, '')}`;

  const supportAreas = [
    "Digestive & nutritional support during chemotherapy/radiation",
    "General vitality & Ojas enhancement to combat systemic fatigue",
    "Stress management, emotional grounding & anxiety relief",
    "Nervous system relaxation & restful sleep support",
    "Gentle restorative yoga & mindful breathing (Pranayama)",
    "Quality-of-life optimization & appetite improvement",
    "Lifestyle & post-treatment recovery guidance"
  ];

  const modalities = [
    {
      name: "Nutritional Guidance (Ahara Support)",
      desc: "Tailoring easily assimilable, soothing, nutrient-dense soups, gruels, and herbal teas to soothe mucosal irritation, combat nausea, and nourish depleted tissues."
    },
    {
      name: "Gentle Rasayana Vitality Care",
      desc: "Supervised use of mild, non-conflicting classical restorative botanicals (like Amalaki, Guduchi, Ashwagandha, and Shatavari) to support innate vitality and immune equilibrium."
    },
    {
      name: "Digestive Agni & Gut Comfort",
      desc: "Restoring digestive appetite (*Dipana*) and easing bloating or taste alterations resulting from intensive conventional cancer medications."
    },
    {
      name: "Mind-Body Relaxation & Meditation",
      desc: "Gentle meditation, guided visualizations, and restorative breathwork that down-regulate sympathetic stress hormones and instill deep inner peace."
    },
    {
      name: "Restorative Sleep & Fatigue Care",
      desc: "Therapeutic regimens aimed at easing treatment-induced insomnia, physical exhaustion, and restlessness to optimize nighttime cellular repair."
    },
    {
      name: "Integrative Oncology Coordination",
      desc: "Open communication encouraging patients to keep their primary oncologists informed of all complementary Ayurvedic lifestyle and wellness measures."
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
        badge="INTEGRATIVE ONCOLOGY SUPPORT"
        title="Cancer Treatment – Ayurvedic Supportive Care"
        subtitle="Compassionate, complementary Ayurvedic supportive care focused on enhancing wellbeing, vitality, and quality of life alongside oncology treatment."
        bgImage="/images/hero_stock_2.jpg"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Navigation & Breadcrumbs */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <Breadcrumb
            items={[
              { label: 'All Treatments', link: '/treatments' },
              { label: 'Cancer Treatment' }
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

        {/* PROMINENT MANDATORY MEDICAL DISCLAIMER BANNER */}
        <div className="p-5 sm:p-6 bg-amber-500/15 border-2 border-amber-600 rounded-3xl mb-8 flex items-start gap-4 text-xs sm:text-sm text-earth-950 shadow-md">
          <ShieldAlert className="w-6 h-6 text-amber-800 shrink-0 mt-0.5" />
          <div className="space-y-1.5">
            <strong className="text-forest-950 font-bold uppercase tracking-wider text-sm block">
              IMPORTANT MEDICAL DISCLAIMER
            </strong>
            <p className="leading-relaxed font-medium">
              Ayurvedic supportive care should not replace evidence-based cancer treatment such as surgery, chemotherapy, radiation therapy, immunotherapy or targeted therapy. Patients should consult their oncologist before using Ayurvedic medicines, herbs or supplements because some products may interact with cancer treatments.
            </p>
            <p className="text-xs text-earth-800 font-light leading-relaxed pt-1 border-t border-amber-500/30">
              Sri Krishna Ayurvedic Clinic does not claim to cure cancer, eliminate tumors, or replace oncological therapies. All consultations are strictly dedicated to supportive quality-of-life care, digestive comfort, and emotional resilience.
            </p>
          </div>
        </div>

        {/* Hero Section Introduction */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-earth-200 shadow-elevated mb-10 space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold text-brass-600 uppercase tracking-widest">
            <HeartHandshake className="w-4 h-4 text-brass-500" />
            <span>Compassionate Supportive Care</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif text-forest-950 font-light">
            Ayurvedic Supportive Care for Cancer Patients
          </h1>
          <p className="text-earth-800 text-sm sm:text-base font-light leading-relaxed">
            Cancer treatment journeys place immense physical, metabolic, and emotional strain on the human body. At Sri Krishna Ayurvedic Clinic, senior physician Dr. Anand Krishna (BAMS) provides empathetic, evidence-respecting Ayurvedic supportive care. Our focus is centered entirely on alleviating treatment side-effects, supporting digestive assimilation (*Agni*), preserving core vitality (*Ojas*), and enhancing overall daily quality of life during and after conventional oncology therapies.
          </p>
        </div>

        {/* 2-Column: Support Areas & Classical Ayurvedic Perspective */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10 items-stretch">
          
          {/* Left: Support Areas */}
          <div className="lg:col-span-5 bg-cream-100/70 p-6 sm:p-8 rounded-3xl border border-earth-200 shadow-sm flex flex-col justify-between space-y-5">
            <div className="space-y-4">
              <span className="text-xs uppercase tracking-ultra font-semibold text-brass-600 block">
                01 • SUPPORT AREAS
              </span>
              <h2 className="text-2xl font-serif text-forest-950 font-light">
                Supportive Care Domains
              </h2>
              <p className="text-xs text-earth-800 font-light leading-relaxed">
                We assist patients and families across essential daily wellbeing dimensions:
              </p>

              <ul className="space-y-2.5 text-xs text-forest-950 font-medium">
                {supportAreas.map((item, idx) => (
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
                02 • CLASSICAL UNDERSTANDING & NON-EQUIVALENCE
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif text-forest-950 font-light">
                Ayurvedic Perspective on Arbuda & Granthi
              </h2>
              
              <div className="text-xs sm:text-sm text-earth-800 font-light leading-relaxed space-y-3">
                <p>
                  Classical Ayurvedic literature mentions structural tissue growths under terms like <strong>Arbuda</strong> (deep-rooted, broad swelling involving multiple doshas and tissues) and <strong>Granthi</strong> (nodular or glandular swellings).
                </p>
                <p className="p-3.5 bg-cream-50 rounded-xl border border-earth-200 text-xs italic text-forest-950">
                  <strong>Important Scientific Clarification:</strong> Classical Ayurvedic concepts of <em>Arbuda</em> and <em>Granthi</em> were conceptualized historically and are not necessarily direct equivalents of modern medical cancer diagnoses (which involve specific cellular mutations, genetics, metastases, and histopathological classifications).
                </p>
                <p>
                  In the context of supportive oncology care, Ayurveda focuses on the host rather than the tumor. By nurturing <strong>Dhatu Sarata</strong> (tissue integrity), protecting <strong>Agni</strong> (digestive capability), and rejuvenating <strong>Ojas</strong> (immunity and stamina), complementary Ayurvedic methods seek to enhance patient resilience throughout the healing continuum.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-3.5 bg-cream-50 rounded-2xl border border-earth-200">
                  <strong className="text-forest-950 text-xs font-serif block">Host Vitality & Ojas</strong>
                  <p className="text-[11px] text-earth-700 font-light mt-1">Sustaining physiological strength and reducing treatment-related exhaustion.</p>
                </div>
                <div className="p-3.5 bg-cream-50 rounded-2xl border border-earth-200">
                  <strong className="text-forest-950 text-xs font-serif block">Agni & Digestive Comfort</strong>
                  <p className="text-[11px] text-earth-700 font-light mt-1">Ensuring that food is comfortably digested and metabolized into healing energy.</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Section: Supportive Modalities */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-earth-200 shadow-elevated mb-10 space-y-6">
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-ultra font-semibold text-brass-600 block">
              03 • COMPLEMENTARY MODALITIES
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif text-forest-950 font-light">
              Supportive Care Modalities
            </h2>
            <p className="text-earth-800 text-xs sm:text-sm font-light leading-relaxed">
              Every regimen is designed to be gentle, supportive, and harmoniously aligned with ongoing medical protocols:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {modalities.map((mod, i) => (
              <div key={i} className="p-5 bg-cream-50 rounded-2xl border border-earth-200 space-y-2 hover:-translate-y-1 transition-transform">
                <h3 className="font-serif text-base font-medium text-forest-950 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-forest-900 text-brass-400 text-xs flex items-center justify-center font-mono font-bold">
                    0{i + 1}
                  </span>
                  <span>{mod.name}</span>
                </h3>
                <p className="text-xs text-earth-800 leading-relaxed font-light">
                  {mod.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-earth-200 shadow-elevated mb-10 space-y-4">
          <h2 className="text-2xl font-serif text-forest-950 font-light flex items-center gap-2.5">
            <HelpCircle className="w-5 h-5 text-brass-600" />
            <span>Frequently Asked Questions</span>
          </h2>

          <div className="space-y-3 text-xs text-earth-800">
            <div className="p-4 bg-cream-50 rounded-2xl border border-earth-200 space-y-1">
              <strong className="font-semibold text-sm text-forest-950 block">Does Ayurveda claim to cure cancer?</strong>
              <p className="leading-relaxed font-light">No. We strictly do not claim that Ayurveda cures cancer or replaces standard oncology treatments. Our consultations provide complementary supportive care focusing on nutrition, digestive ease, stress relief, and overall quality of life.</p>
            </div>

            <div className="p-4 bg-cream-50 rounded-2xl border border-earth-200 space-y-1">
              <strong className="font-semibold text-sm text-forest-950 block">Should I inform my oncologist before taking Ayurvedic preparations?</strong>
              <p className="leading-relaxed font-light">Yes, absolutely. We encourage full transparency with your primary oncology team to ensure all complementary dietary measures and herbs are safely coordinated without therapeutic interactions.</p>
            </div>
          </div>
        </div>

        {/* CTA Consultation Banner */}
        <div className="p-6 sm:p-8 bg-forest-950 text-cream-50 rounded-3xl flex flex-col lg:flex-row lg:items-center justify-between gap-6 shadow-2xl mb-10">
          <div className="space-y-2 max-w-2xl">
            <span className="text-xs uppercase tracking-ultra font-semibold text-brass-400 block">
              SUPPORTIVE CONSULTATION IN KR PURAM
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-light text-cream-50 leading-tight">
              Enquire About a Supportive Care Consultation
            </h2>
            <p className="text-xs sm:text-sm text-cream-200/80 font-light leading-relaxed">
              Speak with senior physician Dr. Anand Krishna (BAMS) to discuss personalized complementary diet, digestive support, and stress management for your treatment journey.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3.5 shrink-0">
            <button
              onClick={() => onOpenBooking ? onOpenBooking('Cancer Supportive Care Consultation') : null}
              className="px-7 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-forest-950 font-bold text-xs uppercase tracking-wider rounded-full shadow-soft transition-all text-center flex items-center justify-center gap-2 cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Supportive Care Consultation</span>
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
        <RelatedTreatments currentTreatmentId="cancer-treatment" />

      </div>
    </motion.div>
  );
}
