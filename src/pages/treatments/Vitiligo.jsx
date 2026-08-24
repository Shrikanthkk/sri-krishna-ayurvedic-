import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, PhoneCall, CheckCircle2, Sparkles, ShieldAlert, Sun, Droplets, HeartPulse, ShieldCheck, Award, Layers } from 'lucide-react';
import PageHero from '../../components/PageHero';
import Breadcrumb from '../../components/Breadcrumb';
import RelatedTreatments from '../../components/RelatedTreatments';
import { clinicData } from '../../data/clinicData';

export default function Vitiligo({ onOpenBooking }) {
  const telUri = `tel:${clinicData.contact.phone.replace(/\s+/g, '')}`;

  const clinicalObjectives = [
    "Stimulating inactive melanocytes to restore natural skin pigmentation",
    "Balancing vitiated Bhrajaka Pitta responsible for skin complexion & luster",
    "Purifying congested blood (Rakta Dhatu) and detoxifying liver channels",
    "Eliminating deep cellular endotoxins (Ama) that trigger autoimmune melanocyte loss",
    "Topical application of classical Bakuchi (Psoralea corylifolia) and herbal lepas",
    "Controlled natural morning sunlight therapy (Phototherapy / Suryanamaskar)",
    "Strict avoidance of incompatible food combinations (Viruddha Ahara)",
    "Immune modulation (Rasayana therapy) to prevent patch spreading"
  ];

  const therapies = [
    {
      name: "Bakuchi (Psoralea Corylifolia) & Herbal Lepa",
      tag: "Pigment Stimulation",
      icon: Sparkles,
      desc: "Topical application of classical Bakuchi Churna and Bakuchi Taila enriched with Manjistha and Khadira. Bakuchi contains natural psoralens that activate dormant melanocyte cells, stimulating melanin production when exposed to controlled morning sunlight."
    },
    {
      name: "Virechana (Therapeutic Liver & Blood Cleansing)",
      tag: "Panchakarma Shodhana",
      icon: Droplets,
      desc: "A primary classical purification therapy for chronic skin conditions. Virechana eliminates deep-seated toxins (Ama) from the liver, gall bladder, and gastrointestinal tract, clearing the micro-channels (Srotas) of the blood and skin."
    },
    {
      name: "Bhrajaka Pitta Activation & Sunlight Regimen",
      tag: "Natural Phototherapy",
      icon: Sun,
      desc: "Bhrajaka Pitta resides in the skin and governs pigmentation. Following gentle application of herbal formulations, patients undergo controlled early morning sunlight exposure (5-10 minutes) to naturally awaken skin melanin synthesis without sunburn."
    },
    {
      name: "Rakta Prasadana Classical Phytotherapy",
      tag: "Internal Blood Purification",
      icon: HeartPulse,
      desc: "Physician-guided administration of authentic formulations like Mahamanjisthadi Kwatha, Khadirarishta, Arogyavardhini Vati, Neem extracts, and Gandhaka Rasayana to cool the blood, reduce inflammation, and enhance skin immunity."
    },
    {
      name: "Viruddha Ahara Elimination (Dietary Guidance)",
      tag: "Root-Cause Prevention",
      icon: Layers,
      desc: "Classical Ayurveda identifies incompatible dietary combinations (e.g. fish with milk, sour fruits with dairy, excess fermented foods) as a key trigger for skin disorders. We provide a customized, non-inflammatory diet plan."
    },
    {
      name: "Rasayana & Autoimmune Stabilization",
      tag: "Immuno-Modulation",
      icon: ShieldCheck,
      desc: "Long-term restorative herbal therapies (Guduchi, Amalaki, Ashwagandha) to calm auto-reactive immune responses, reduce oxidative stress, and support stable, long-lasting skin health."
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
        badge="CLASSICAL AYURVEDIC DERMATOLOGY"
        title="Vitiligo & White Patches Treatment (Shvitra Care)"
        subtitle="Holistic, root-cause Ayurvedic treatment for Vitiligo (Leucoderma / Shvitra) combining blood purification (Virechana), Bakuchi pigment stimulation, and individualized nutritional care."
        bgImage="/images/vitiligo_treatment.jpg"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Navigation & Breadcrumbs */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <Breadcrumb
            items={[
              { label: 'All Treatments', link: '/treatments' },
              { label: 'Vitiligo (Shvitra Care)' }
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

        {/* Responsible Medical Safety Notice */}
        <div className="p-4 sm:p-5 bg-amber-500/10 border-l-4 border-amber-600 rounded-r-2xl mb-8 flex items-start gap-3.5 text-xs text-earth-900 shadow-sm">
          <ShieldAlert className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <strong className="text-forest-950 font-bold uppercase tracking-wider block">Clinical Safety & Consultation Guidance</strong>
            <p className="leading-relaxed">
              Vitiligo (Shvitra) is a chronic skin condition involving loss of pigment. Ayurvedic therapies, especially potent herbs like Bakuchi (<em>Psoralea corylifolia</em>), must strictly be administered under the personalized guidance and supervision of a registered Ayurvedic physician (BAMS). Do not self-administer concentrated herbal extracts or excessive sun exposure without medical evaluation.
            </p>
          </div>
        </div>

        {/* 1. Deep Clinical Overview Section */}
        <section className="bg-white p-6 sm:p-8 lg:p-10 rounded-3xl border border-earth-200 shadow-elevated mb-12 space-y-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-brass-600 uppercase tracking-widest">
              <Sparkles className="w-4 h-4 text-brass-500" />
              <span>AYURVEDIC DERMATOLOGICAL SCIENCE</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-forest-950 font-light">
              Understanding Vitiligo (Shvitra / Kilasa) in Ayurveda
            </h2>
            <p className="text-earth-800 text-sm sm:text-base font-light leading-relaxed">
              In classical Ayurvedic treatises (<em>Charaka Samhita</em> and <em>Sushruta Samhita</em>), white hypopigmentation patches are classified as <strong>Shvitra</strong> (also known as <em>Kilasa</em> or <em>Shveta Kushta</em>). Unlike superficial skin dryness, Shvitra involves an imbalance of all three Doshas (Vata, Pitta, Kapha) with a predominant vitiation of <strong>Bhrajaka Pitta</strong> (the bio-force responsible for skin pigmentation and radiance) affecting the deeper bodily tissues: <strong>Rasa</strong> (plasma), <strong>Rakta</strong> (blood), <strong>Mamsa</strong> (muscle tissue), and <strong>Medas</strong> (fat).
            </p>
          </div>

          {/* Two-Column Feature: Image + Core Objectives */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-2">
            <div className="lg:col-span-6 space-y-4">
              <h3 className="font-serif text-xl sm:text-2xl text-forest-950 font-medium">
                Clinical Objectives of Shvitra Chikitsa
              </h3>
              <p className="text-xs sm:text-sm text-earth-800 font-light leading-relaxed">
                Rather than merely masking white patches, our clinical protocol targets the internal root causes—purifying the blood tissue, correcting faulty digestion (Agni), clearing micro-channel blockages, and naturally stimulating dormant melanocytes for progressive re-pigmentation.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                {clinicalObjectives.map((point, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-earth-900 bg-cream-50 p-2.5 rounded-xl border border-earth-200/80">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative rounded-3xl overflow-hidden shadow-elevated border border-earth-200 group">
                <img 
                  src="/images/vitiligo_treatment.jpg" 
                  alt="Ayurvedic Vitiligo and White Patches Treatment" 
                  className="w-full h-80 sm:h-96 object-cover object-center group-hover:scale-102 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-950/85 via-forest-950/20 to-transparent flex flex-col justify-end p-6 text-cream-50">
                  <span className="text-[10px] font-bold text-brass-400 uppercase tracking-widest">Targeted Skin Chikitsa</span>
                  <h4 className="font-serif text-lg font-medium text-cream-50">Bakuchi Herbal Lepa & Blood Cleansing</h4>
                  <p className="text-xs text-cream-200/80 font-light mt-1">Stimulating natural melanin synthesis and cellular rejuvenation.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Comprehensive Treatment Protocols */}
        <section className="space-y-6 mb-12">
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <span className="text-xs font-bold text-brass-600 uppercase tracking-widest block">
              SYSTEMIC PURIFICATION & TOPICAL CARE
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-forest-950 font-light">
              Core Ayurvedic Therapies for Vitiligo
            </h2>
            <p className="text-earth-800 text-xs sm:text-sm font-light leading-relaxed">
              Every patient undergoes an in-depth Nadi Pareeksha (pulse diagnosis) and Prakriti evaluation before receiving a customized combination of the following therapeutic modalities:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {therapies.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div 
                  key={idx} 
                  className="bg-white p-6 rounded-3xl border border-earth-200 shadow-sm hover:shadow-elevated transition-all flex flex-col justify-between space-y-4 hover:-translate-y-1 duration-300"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-2xl bg-forest-900 text-brass-400 flex items-center justify-center shadow-soft">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-cream-100 text-forest-950 border border-earth-200">
                        {item.tag}
                      </span>
                    </div>

                    <h3 className="font-serif text-lg text-forest-950 font-medium leading-snug">
                      {item.name}
                    </h3>

                    <p className="text-xs text-earth-800 font-light leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 3. Herbal Spotlight & Dietary Rules */}
        <section className="bg-cream-100/70 p-6 sm:p-8 lg:p-10 rounded-3xl border border-earth-200 shadow-sm mb-12 space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-6 space-y-4">
              <span className="text-xs font-bold text-brass-600 uppercase tracking-widest block">
                CLASSICAL HERBAL PHARMACOLOGY
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-forest-950 font-light">
                Key Botanicals in Shvitra Management
              </h3>
              <p className="text-xs sm:text-sm text-earth-800 font-light leading-relaxed">
                Ayurvedic classical texts formulate synergistic botanical compounds designed to detoxify blood, balance Pitta, and revive melanin production:
              </p>

              <div className="space-y-3 pt-1 text-xs">
                <div className="p-3 bg-white rounded-2xl border border-earth-200 shadow-2xs">
                  <strong className="text-forest-950 font-serif text-sm block">Bakuchi (Psoralea corylifolia)</strong>
                  <p className="text-earth-700 font-light mt-0.5">The foremost classical herb for skin pigmentation. Rich in psoralen compounds that stimulate melanocyte activation upon natural sunlight exposure.</p>
                </div>

                <div className="p-3 bg-white rounded-2xl border border-earth-200 shadow-2xs">
                  <strong className="text-forest-950 font-serif text-sm block">Manjistha (Rubia cordifolia) & Khadira (Acacia catechu)</strong>
                  <p className="text-earth-700 font-light mt-0.5">Potent Rakta Prasadana (blood-cooling & purifying) botanicals that clear inflammatory toxins from the micro-circulatory channels.</p>
                </div>

                <div className="p-3 bg-white rounded-2xl border border-earth-200 shadow-2xs">
                  <strong className="text-forest-950 font-serif text-sm block">Arogyavardhini Vati & Gandhaka Rasayana</strong>
                  <p className="text-earth-700 font-light mt-0.5">Classical mineralo-herbal formulations promoting healthy liver function, fat breakdown, and skin cellular regeneration.</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative rounded-3xl overflow-hidden shadow-elevated border border-earth-200">
                <img 
                  src="/images/vitiligo_herbal_care.jpg" 
                  alt="Bakuchi and Manjistha Ayurvedic Herbs for Vitiligo" 
                  className="w-full h-80 sm:h-96 object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-950/80 via-transparent to-transparent flex flex-col justify-end p-6 text-cream-50">
                  <span className="text-[10px] font-bold text-brass-400 uppercase tracking-widest">Botanical Science</span>
                  <h4 className="font-serif text-base font-medium text-cream-50">Fresh Bakuchi & Manjistha Preparations</h4>
                  <p className="text-xs text-cream-200/80 font-light mt-0.5">Pure, unadulterated classical herbal oils and decoctions.</p>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* 4. Consultation & Appointment CTA */}
        <div className="bg-forest-950 text-cream-50 p-8 sm:p-10 rounded-3xl shadow-elevated text-center space-y-5 border border-brass-500/20 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brass-500/20 text-brass-400 text-xs font-mono font-bold uppercase tracking-wider border border-brass-400/30">
            <Award className="w-3.5 h-3.5" />
            <span>EXPERT DERMATOLOGY CONSULTATION</span>
          </div>
          
          <h3 className="font-serif text-2xl sm:text-3xl text-cream-50 font-light max-w-2xl mx-auto">
            Begin Your Personalized Vitiligo & Skin Healing Journey
          </h3>
          
          <p className="text-xs sm:text-sm text-cream-200/80 font-light max-w-xl mx-auto leading-relaxed">
            Consult Senior Physician Dr. Anand Krishna (BAMS, 26+ years clinical experience) at Sri Krishna Ayurvedic Clinic for an in-depth constitution evaluation and custom treatment plan.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={() => onOpenBooking && onOpenBooking('Vitiligo (White Patches)')}
              className="px-6 py-3 bg-brass-500 hover:bg-brass-400 text-forest-950 text-xs font-bold uppercase tracking-wider rounded-full shadow-soft transition-colors flex items-center gap-2 cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Doctor Consultation</span>
            </button>

            <a
              href={telUri}
              className="px-6 py-3 bg-forest-900 hover:bg-forest-800 text-cream-50 text-xs font-semibold uppercase tracking-wider rounded-full border border-forest-700 transition-colors flex items-center gap-2"
            >
              <PhoneCall className="w-4 h-4 text-brass-400" />
              <span>Call Clinic: {clinicData.contact.phone}</span>
            </a>
          </div>
        </div>

        {/* Related Treatments Module */}
        <RelatedTreatments currentTreatmentId="vitiligo" />

      </div>
    </motion.div>
  );
}
