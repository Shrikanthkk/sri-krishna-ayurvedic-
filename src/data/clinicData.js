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
    nadiPariksha: "/images/nadi_pariksha.png",
    herbs: "/images/hero_adobe_1.jpg",
    clinic: "/images/hero_adobe_4.jpg",
    shirodhara: "/images/shirodhara.jpg",
    herbalPrep: "/images/hero_adobe_2.jpg",
    treatmentRoom: "/images/hero_adobe_5.jpg"
  },

  // Centrally configurable 3-Slide Hero (Focused, concise & impactful)
  heroSlides: [
    {
      id: 1,
      image: "/images/consultation.png",
      tagline: "TRADITIONAL AYURVEDA • MODERN CARE",
      title: "Natural Healing. Personalized Care.",
      description: "Root-cause healing tailored to your Prakriti, guided by Dr. Anand Krishna with 26+ years of clinical experience in KR Puram.",
      badge: "Personalized Care",
      highlight: "Pulse Evaluation"
    },
    {
      id: 2,
      image: "/images/shirodhara.jpg",
      tagline: "HOLISTIC BALANCE & WELLNESS",
      title: "Restore Balance. Renew Your Wellbeing.",
      description: "Harmonize Vata, Pitta, and Kapha through classical Panchakarma detoxification, soothing Shirodhara, and lifestyle guidance.",
      badge: "Holistic Wellness",
      highlight: "Cellular Detox"
    },
    {
      id: 3,
      image: "/images/nadi_pariksha.png",
      tagline: "ANCIENT WISDOM • THOUGHTFUL CARE",
      title: "Ancient Wisdom. Thoughtful Care.",
      description: "Classical Nadi Pariksha pulse diagnosis paired with pure botanical formulations crafted for lasting health and vitality.",
      badge: "Nadi Pariksha",
      highlight: "Root-Cause Care"
    }
  ],

  doctor: {
    name: "Dr. Anand Krishna",
    title: "Senior Ayurvedic Physician",
    qualifications: "BAMS (Bachelor of Ayurvedic Medicine & Surgery)",
    experienceYears: "26+ Years of Clinical Practice",
    bio: "With over 26 years of dedicated Ayurvedic practice, Dr. Anand Krishna specializes in classical Nadi Pariksha (Pulse Diagnosis), holistic Panchakarma therapies, and sustainable lifestyle restoration. His approach combines authentic classical formulations with compassionate, personalized patient care.",
    specialties: [
      "Nadi Pariksha (Pulse Diagnosis)",
      "Panchakarma & Detox Therapy",
      "Chronic Joint & Spine Pain Care",
      "Digestive & Metabolic Health",
      "Stress & Lifestyle Wellness"
    ],
    quote: "True healing restores the natural equilibrium between Vata, Pitta, and Kapha within the individual."
  },

  pillars: [
    {
      number: "01",
      title: "Balance",
      short: "Restoring equilibrium among the three Doshas (Vata, Pitta, Kapha) for lasting vitality.",
      description: "Restoring harmony among Vata, Pitta, and Kapha to support your body's innate healing ability."
    },
    {
      number: "02",
      title: "Personalised Care",
      short: "Therapeutic plans tailored specifically to your individual Prakriti (constitution).",
      description: "Every consultation begins with an evaluation of your unique constitution and daily routine."
    },
    {
      number: "03",
      title: "Natural Wellness",
      short: "Rooted in authentic herbal formulations and classical Ayurvedic texts.",
      description: "Using nature's apothecary to promote gentle internal purification and sustained vitality."
    },
    {
      number: "04",
      title: "Holistic Living",
      short: "Integrating nutrition (Ahara) and lifestyle (Vihara) for long-term health.",
      description: "Practical dietary and lifestyle practices tailored to support sustained daily wellbeing."
    }
  ],

  treatments: [
    {
      id: "nadi-pariksha",
      number: "01",
      title: "Nadi Pariksha (Pulse Diagnosis)",
      subtitle: "Ancient Diagnostic Art",
      image: "/images/nadi_pariksha.png",
      description: "Traditional pulse evaluation assessing Vata, Pitta, and Kapha to detect root causes of imbalance.",
      benefits: ["Accurate Dosha assessment", "Early imbalance detection", "Personalized health roadmap"],
      duration: "30 - 45 Minutes"
    },
    {
      id: "panchakarma",
      number: "02",
      title: "Panchakarma Detox Therapies",
      subtitle: "Cellular Rejuvenation",
      image: "/images/shirodhara.jpg",
      description: "Five classical bio-purification procedures to eliminate accumulated toxins and restore vital Agni.",
      benefits: ["Deep tissue detoxification", "Boosted metabolic Agni", "Restored digestive strength"],
      duration: "7 to 21 Days Program"
    },
    {
      id: "pain-management",
      number: "03",
      title: "Joint & Spine Pain Care",
      subtitle: "Targeted Rheumatic Relief",
      image: "/images/hero_adobe_5.jpg",
      description: "Specialized herbal bastis, Kati Vasti, and botanical regimens for lumbar spondylosis, arthritis, and stiffness.",
      benefits: ["Relieves joint inflammation", "Enhances spinal flexibility", "Natural cartilage support"],
      duration: "45 - 60 Minutes per Session"
    },
    {
      id: "digestive-wellness",
      number: "04",
      title: "Digestive & Metabolic Wellness",
      subtitle: "Restoring Agni",
      image: "/images/hero_adobe_2.jpg",
      description: "Natural protocols for acidity, IBS, gastritis, and metabolic sluggishness using classical herbal blends.",
      benefits: ["Normalizes bowel function", "Eliminates bloating & reflux", "Improves nutrient absorption"],
      duration: "Customized Regimen"
    },
    {
      id: "stress-shirodhara",
      number: "05",
      title: "Shirodhara & Mind Relaxation",
      subtitle: "Nervous System Calm",
      image: "/images/hero_adobe_4.jpg",
      description: "Gentle warm herbal oil stream over forehead marma points to relieve anxiety, insomnia, and mental fatigue.",
      benefits: ["Deep mental relaxation", "Sound sleep quality", "Calms nervous system"],
      duration: "45 Minutes per Session"
    },
    {
      id: "skin-hair-care",
      number: "06",
      title: "Skin & Hair Therapy",
      subtitle: "Internal Pure Radiance",
      image: "/images/hero_adobe_1.jpg",
      description: "Blood-purifying botanical preparations targeting eczema, psoriasis, acne, and hair thinning.",
      benefits: ["Purifies Rakta (blood)", "Soothes skin irritation", "Promotes healthy hair growth"],
      duration: "Custom Consultation"
    }
  ],

  whyChooseUs: [
    {
      number: "01",
      title: "Authentic Ayurvedic Approach",
      description: "Strict adherence to classical texts, pulse diagnostic techniques, and herbal standards."
    },
    {
      number: "02",
      title: "26+ Years Experienced Doctor",
      description: "Direct consultation with Dr. Anand Krishna (BAMS), senior physician in KR Puram."
    },
    {
      number: "03",
      title: "Root-Cause Focused Healing",
      description: "Correcting underlying metabolic and Dosha imbalances rather than masking symptoms."
    },
    {
      number: "04",
      title: "Personalised Patient Care",
      description: "Customized treatment plans, herbal preparations, and diet charts for your body type."
    },
    {
      number: "05",
      title: "Transparent & Accessible Care",
      description: "Affordable consultations (₹50) ensuring quality holistic healthcare for every family."
    },
    {
      number: "06",
      title: "Convenient KR Puram Locations",
      description: "Main clinic at 3rd Main (Near Lakshmi Hospital) & branch at T.C. Palya Main Road."
    }
  ],

  testimonials: [
    {
      id: 1,
      quote: "Dr. Anand Krishna's Nadi Pariksha diagnosis was remarkably accurate. Within three weeks of following his herbal regimen and diet advice, my chronic digestive issues resolved completely.",
      author: "Ramesh K.",
      locality: "KR Puram, Bangalore",
      treatment: "Digestive Care"
    },
    {
      id: 2,
      quote: "A compassionate doctor who explains root causes clearly. The Panchakarma treatment plan was exceptionally effective for my chronic knee stiffness.",
      author: "Sunitha N.",
      locality: "T.C. Palya Main Road",
      treatment: "Joint Care"
    },
    {
      id: 3,
      quote: "Authentic Ayurvedic consultation with genuine care. Nominal fee and very effective traditional treatments. Highly recommended clinic in KR Puram.",
      author: "Praveen V.",
      locality: "Ramamurthy Nagar",
      treatment: "General Consultation"
    }
  ],

  faqs: [
    {
      question: "What should I expect during my first Nadi Pariksha consultation?",
      answer: "Dr. Anand Krishna evaluates your pulse (Nadi), health history, and daily routine to determine your Dosha constitution and identify underlying imbalances."
    },
    {
      question: "What are the clinic consultation hours?",
      answer: "Monday through Saturday from 10:00 AM to 7:00 PM. Sunday consultations are available by prior appointment."
    },
    {
      question: "What is the consultation fee?",
      answer: "The consultation fee is ₹50 for general Ayurvedic assessment and guidance."
    },
    {
      question: "Where are the clinic locations in KR Puram?",
      answer: "Main Clinic: No 426, Near Lakshmi Super Speciality Hospital, 3rd Main, KR Puram, Bangalore 560036. Branch: No. 98, Opp Kanti Sweets, T.C. Palya Main Road, Anandapura, KR Puram, Bangalore 560036."
    }
  ]
};
