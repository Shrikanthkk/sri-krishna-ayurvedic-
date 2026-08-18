export const clinicData = {
  clinicName: "Sri Krishna Ayurvedic Clinic",
  tagline: "Traditional Ayurveda. Thoughtful Care. A Healthier You.",
  subtitle: "Authentic Ayurvedic healing, personalized pulse diagnosis, and root-cause therapies by senior practitioners in KR Puram, Bangalore.",
  
  contact: {
    phone: "+91 98450 12345",
    whatsapp: "+919845012345",
    email: "dranandkrishna31@gmail.com",
    consultationFee: "₹50",
    
    // Official Clinic Locations (Main & Branch)
    mainAddress: {
      title: "Main Address",
      building: "No 426, Near Lakshmi Super Speciality Hospital",
      street: "3rd Main",
      locality: "Krishnarajapuram (KR Puram)",
      city: "Bangalore",
      pincode: "560036",
      fullText: "No 426, Near Lakshmi Super Speciality Hospital, 3rd Main, Krishnarajapuram, Bangalore 560036"
    },

    branchAddress: {
      title: "Branch Address",
      building: "No. 98, Opp Kanti Sweets",
      street: "T. C. Palya Main Road, Anandapura",
      locality: "Krishnarajapuram (KR Puram)",
      city: "Bangalore",
      pincode: "560036",
      fullText: "No. 98, Opp Kanti Sweets, T. C. Palya Main Road, Anandapura, Krishnarajapuram, Bangalore 560036"
    },

    timings: [
      { days: "Monday – Saturday", hours: "10:00 AM – 07:00 PM" },
      { days: "Sunday", hours: "Prior Appointment Only" }
    ],
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Sri+Krishna+Ayurvedic+Clinic+No+426+Near+Lakshmi+Super+Speciality+Hospital+3rd+Main+Krishnarajapuram+Bangalore+560036",
    mapEmbedSrc: "https://maps.google.com/maps?q=Sri%20Krishna%20Ayurvedic%20Clinic%2C%20No%20426%2C%20Near%20Lakshmi%20Super%20Speciality%20Hospital%2C%203rd%20Main%2C%20Krishnarajapuram%2C%20Bangalore%20560036&t=&z=16&ie=UTF8&iwloc=&output=embed"
  },

  images: {
    hero: "/images/hero_adobe_3.jpg",
    doctor: "/images/doctor.jpg",
    consultation: "/images/consultation.png",
    formulations: "/images/classical_formulations.png",
    trust: "/images/trust_ayurveda.png",
    herbs: "/images/hero_adobe_1.jpg",
    clinic: "/images/hero_adobe_4.jpg",
    shirodhara: "/images/shirodhara.jpg",
    herbalPrep: "/images/hero_adobe_2.jpg",
    treatmentRoom: "/images/hero_adobe_5.jpg"
  },

  // Centrally configurable Hero Slider items (Using user's 5 enhanced Adobe Stock images)
  heroSlides: [
    {
      id: 1,
      image: "/images/hero_adobe_3.jpg",
      tagline: "CLASSICAL APOTHECARY",
      title: "Handcrafted Ayurvedic Herbal Formulations & Consultations",
      badge: "Traditional Care"
    },
    {
      id: 2,
      image: "/images/hero_adobe_4.jpg",
      tagline: "AYURVEDIC SANCTUARY",
      title: "A Golden & Serene Environment for Mind & Body Healing",
      badge: "Wellness Sanctuary"
    },
    {
      id: 3,
      image: "/images/hero_adobe_1.jpg",
      tagline: "BOTANICAL PREPARATION",
      title: "Authentic Herbal Grinding with Traditional Stone Mortar",
      badge: "Herbal Remedies"
    },
    {
      id: 4,
      image: "/images/hero_adobe_2.jpg",
      tagline: "HERBAL OILS & ESSENCES",
      title: "Pure Botanical Decoctions & Medicated Plant Extracts",
      badge: "Medicated Oils"
    },
    {
      id: 5,
      image: "/images/hero_adobe_5.jpg",
      tagline: "PANCHAKARMA COMPRESS",
      title: "Classical Potali Compress & Medicinal Herb Pouches",
      badge: "Panchakarma Care"
    }
  ],

  doctor: {
    name: "Dr. Anand Krishna",
    title: "Senior Ayurvedic Physician",
    qualifications: "BAMS (Bachelor of Ayurvedic Medicine & Surgery)",
    experienceYears: "26+ Years of Clinical Practice",
    bio: "With over two decades of dedicated Ayurvedic clinical experience, Dr. Anand Krishna specializes in classic Nadi Pariksha (Pulse Diagnosis), holistic Panchakarma therapies, and sustainable lifestyle restoration. His approach combines traditional classical formulations with deeply personalized patient care.",
    specialties: [
      "Nadi Pariksha (Pulse Diagnosis)",
      "Panchakarma & Detox Therapy",
      "Chronic Pain & Joint Management",
      "Digestive & Metabolic Disorders",
      "Stress & Lifestyle Wellness"
    ],
    quote: "True healing is not merely the suppression of symptoms, but restoring the subtle balance between Vata, Pitta, and Kapha within the individual."
  },

  pillars: [
    {
      number: "01",
      title: "Balance",
      short: "Promoting harmony between body, mind, and spirit through personalized Ayurvedic regimen.",
      description: "Restoring equilibrium among the three Doshas (Vata, Pitta, Kapha) to establish lasting vitality."
    },
    {
      number: "02",
      title: "Personalised Care",
      short: "An approach tailored specifically to individual Prakriti (body constitution).",
      description: "No two individuals are alike. Every consultation begins with evaluating your unique constitution."
    },
    {
      number: "03",
      title: "Natural Wellness",
      short: "Rooted in authentic herbal formulations and traditional Ayurvedic principles.",
      description: "Harnessing nature's apothecary to promote internal purification and gentle, sustained rejuvenation."
    },
    {
      number: "04",
      title: "Holistic Living",
      short: "Looking beyond symptoms toward long-term lifestyle, diet, and mental wellbeing.",
      description: "Empowering you with daily Ahara (nutrition) and Vihara (lifestyle) practices tailored for your life."
    }
  ],

  treatments: [
    {
      id: "nadi-pariksha",
      number: "01",
      title: "Nadi Pariksha (Pulse Diagnosis)",
      subtitle: "Ancient Diagnostic Art",
      description: "An intricate Ayurvedic pulse evaluation to assess your unique Prakriti, detect hidden imbalances, and identify early root causes of discomfort.",
      benefits: ["Accurate Dosha assessment", "Early imbalance detection", "Personalized health roadmap"],
      duration: "30 - 45 Minutes"
    },
    {
      id: "panchakarma",
      number: "02",
      title: "Panchakarma Detox Therapies",
      subtitle: "Cellular Rejuvenation",
      description: "Five traditional bio-purification procedures designed to flush accumulated Ama (toxins) from cellular tissues and revive bodily channels.",
      benefits: ["Deep tissue detoxification", "Boosted metabolic Agni", "Restored digestive strength"],
      duration: "7 to 21 Days Program"
    },
    {
      id: "pain-management",
      number: "03",
      title: "Joint & Spine Pain Care",
      subtitle: "Targeted Rheumatic Relief",
      description: "Specialized herbal oil bastis, Kati Vasti, and internal Ayurvedic medications for lumbar spondylosis, knee arthritis, and chronic stiffness.",
      benefits: ["Relieves joint inflammation", "Enhances spinal flexibility", "Natural cartilage support"],
      duration: "45 - 60 Minutes per Session"
    },
    {
      id: "digestive-wellness",
      number: "04",
      title: "Digestive & Metabolic Wellness",
      subtitle: "Restoring Agni",
      description: "Natural, non-invasive protocols for Acidity, IBS, Fatty Liver, Gastritis, and sluggish metabolism through herbomineral digestive blends.",
      benefits: ["Normalizes bowel function", "Eliminates bloating & reflux", "Improves nutrient absorption"],
      duration: "Customized Regimen"
    },
    {
      id: "stress-shirodhara",
      number: "05",
      title: "Shirodhara & Mind Relaxation",
      subtitle: "Nervous System Calm",
      description: "Continuous warm herbal oil flow over the forehead marma points to alleviate anxiety, chronic stress, insomnia, and migraines.",
      benefits: ["Deep mental relaxation", "Sound sleep quality", "Calms hyperactive nervous system"],
      duration: "45 Minutes per Session"
    },
    {
      id: "skin-hair-care",
      number: "06",
      title: "Skin & Hair Therapy",
      subtitle: "Internal Pure Radiance",
      description: "Ayurvedic blood purification therapies and botanical oils targeting Eczema, Psoriasis, Acne, premature graying, and hair loss.",
      benefits: ["Purifies Rakta (blood)", "Soothes skin allergies", "Promotes dense hair growth"],
      duration: "Custom Consultation"
    }
  ],

  whyChooseUs: [
    {
      number: "01",
      title: "Authentic Ayurvedic Approach",
      description: "We strictly adhere to classical Ayurvedic texts, diagnostic techniques, and herbal preparation standards."
    },
    {
      number: "02",
      title: "26+ Years Experienced Doctor",
      description: "Consult directly with Dr. Anand Krishna (BAMS), an established physician dedicated to patient-centric healing."
    },
    {
      number: "03",
      title: "Root-Cause Focused Healing",
      description: "Rather than masking superficial symptoms, our therapies aim to correct underlying metabolic and Dosha imbalances."
    },
    {
      number: "04",
      title: "Personalised Patient Care",
      description: "Every treatment plan, herbal formulation, and diet chart is customized to your unique body type."
    },
    {
      number: "05",
      title: "Transparent & Affordable Care",
      description: "Clear consultation processes with nominal fees (₹50) ensuring high-quality holistic healthcare is accessible to all."
    },
    {
      number: "06",
      title: "Convenient KR Puram Locations",
      description: "Easily accessible main clinic at 3rd Main (near Lakshmi Hospital) & branch at T.C. Palya Main Road (Opp Kanti Sweets)."
    }
  ],

  testimonials: [
    {
      id: 1,
      quote: "Dr. Anand Krishna's Nadi Pariksha diagnosis was incredibly insightful. Within three weeks of taking his prescribed herbal medicine and dietary changes, my chronic digestive issues cleared up completely.",
      author: "Ramesh K.",
      locality: "KR Puram, Bangalore",
      treatment: "Digestive Care"
    },
    {
      id: 2,
      quote: "Very patient doctor who takes time to explain the root cause of back pain. The treatment plan recommended was extremely effective for my severe knee stiffness.",
      author: "Sunitha N.",
      locality: "T.C. Palya Main Road",
      treatment: "Joint Care"
    },
    {
      id: 3,
      quote: "Authentic Ayurvedic consultation with genuine care. Nominal fee and very effective traditional treatments. Highly recommended clinic in KR Puram area.",
      author: "Praveen V.",
      locality: "Ramamurthy Nagar",
      treatment: "General Consultation"
    }
  ],

  faqs: [
    {
      question: "What should I expect during my first Nadi Pariksha consultation?",
      answer: "During your initial visit, Dr. Anand Krishna gently evaluates your pulse (Nadi) along with physical signs, lifestyle, and medical history. This helps determine your primary Dosha constitution and any internal blockages."
    },
    {
      question: "What are the clinic consultation hours?",
      answer: "The clinic is open Monday through Saturday from 10:00 AM to 7:00 PM. Sunday consultations are available by prior appointment."
    },
    {
      question: "What is the consultation fee?",
      answer: "The consultation fee is ₹50 for general Ayurvedic assessment and guidance."
    },
    {
      question: "Where are the clinic locations in KR Puram?",
      answer: "Main Address: No 426, Near Lakshmi Super Speciality Hospital, 3rd Main, Krishnarajapuram, Bangalore 560036. Branch Address: No. 98, Opp Kanti Sweets, T.C. Palya Main Road, Anandapura, Krishnarajapuram, Bangalore 560036."
    }
  ]
};
