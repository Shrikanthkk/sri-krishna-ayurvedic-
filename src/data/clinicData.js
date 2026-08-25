export const clinicData = {
  clinicName: "Sri Krishna Ayurvedic Clinic",
  tagline: "Traditional Ayurveda. Thoughtful Care. A Healthier You.",
  subtitle: "Authentic Ayurvedic healing and personalized pulse diagnosis by senior practitioners in KR Puram.",
  
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
    googleReviewsUrl: "https://www.google.com/search?q=sri+krishna+ayurvedic+clinic+kr+puram&oq=sri+kris&gs_lcrp=EgZjaHJvbWUqCAgBEEUYJxg7MgYIABBFGDkyCAgBEEUYJxg7MggIAhBFGCcYOzIKCAMQABixAxiABDIHCAQQLhiABDIHCAUQLhiABDIHCAYQABiABDIQCAcQLhivARjHARiABBiOBTIKCAgQABixAxiABDIKCAkQABixAxiABNIBCTY1NTFqMGoxNagCCLACAfEFNXVs2nIee_w&sourceid=chrome&source=chrome.rb&ie=UTF-8#sv=CAESzAEKuAEStQEKd0FKaVQ0dEx4Q3VkT3J1Tl81dzQ2dW9uVXRDMzN6WENzTDBqeVdLMGlncmFndVcwUDdQTHdLRFRuem9zemdySnM4RnNEQkRuQWhyeTVWWmtZTThXRmI0RHQ2LWhjM2tndEhNUXYyb05UeDRKR2k0X1Y0eU1GeERnEhYtQS1NYXBVRnlwT3g0d19Fa3J5NUF3GiJBRHNyOWZTZGRNbS13UlYxZ2RadTZUYzRkYnZrYUJPZkpREgQ4MDUxGgEzKgAwADgBQAAYACDEsbH2DkoCEAI",
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
    treatmentRoom: "/images/hero_adobe_5.jpg",
    consultationCorner: "/images/doctor_consultation_corner.jpg",
    swarnaprashana1: "/images/swarnaprashana_1.png",
    swarnaprashana2: "/images/swarnaprashana_2.png",
    swarnaprashana3: "/images/swarnaprashana_3.png"
  },

  // Centrally configurable 3-Slide Hero (Focused, concise & impactful)
  heroSlides: [
    {
      id: 1,
      image: "/images/consultation.png",
      tagline: "TRADITIONAL AYURVEDA • MODERN CARE",
      title: "Natural Healing. Personalized Care.",
      description: "Root-cause healing tailored to your Prakriti by Dr. Anand Krishna (26+ yrs exp in KR Puram).",
      badge: "Personalized Care",
      highlight: "Pulse Evaluation"
    },
    {
      id: 2,
      image: "/images/shirodhara.jpg",
      tagline: "HOLISTIC BALANCE & WELLNESS",
      title: "Restore Balance. Renew Your Wellbeing.",
      description: "Harmonize Vata, Pitta, and Kapha through Panchakarma detox and soothing Shirodhara.",
      badge: "Holistic Wellness",
      highlight: "Cellular Detox"
    },
    {
      id: 3,
      image: "/images/nadi_pariksha.png",
      tagline: "ANCIENT WISDOM • THOUGHTFUL CARE",
      title: "Ancient Wisdom. Thoughtful Care.",
      description: "Classical Nadi Pariksha pulse diagnosis paired with pure botanical formulations.",
      badge: "Nadi Pariksha",
      highlight: "Root-Cause Care"
    }
  ],

  doctor: {
    name: "Dr. Anand Krishna",
    title: "Senior Ayurvedic Physician",
    qualifications: "BAMS (Bachelor of Ayurvedic Medicine & Surgery)",
    experienceYears: "26+ Years of Clinical Practice",
    bio: "With 26+ years of Ayurvedic practice, Dr. Anand Krishna specializes in Nadi Pariksha, classical Panchakarma detox, and personalized herbal regimens.",
    specialties: [
      "Nadi Pariksha (Pulse Diagnosis)",
      "Panchakarma & Detox Therapy",
      "Chronic Joint & Spine Pain Care",
      "Digestive & Metabolic Health",
      "Stress & Lifestyle Wellness"
    ],
    quote: "True healing restores the natural equilibrium between Vata, Pitta, and Kapha."
  },

  pillars: [
    {
      number: "01",
      title: "Balance",
      short: "Restoring equilibrium among the three Doshas for lasting vitality.",
      description: "Harmonizing Vata, Pitta, and Kapha for innate healing."
    },
    {
      number: "02",
      title: "Personalised Care",
      short: "Therapies tailored to your individual Prakriti constitution.",
      description: "Evaluation of your unique constitution and daily routine."
    },
    {
      number: "03",
      title: "Natural Wellness",
      short: "Rooted in authentic herbal formulations and classical texts.",
      description: "Pure botanicals for internal purification and sustained vitality."
    },
    {
      number: "04",
      title: "Holistic Living",
      short: "Integrating nutrition (Ahara) and lifestyle (Vihara) habits.",
      description: "Mindful dietary and daily routines for long-term health."
    }
  ],

  treatments: [
    {
      id: "joint-pain-arthritis",
      number: "01",
      title: "Chronic Diseases – Joint Pains (Arthritis)",
      shortTitle: "Joint Pain & Arthritis",
      subtitle: "Supportive Musculoskeletal Care",
      image: "/images/joint_pain_arthritis.png",
      description: "Ayurvedic therapy and herbal poultices for joint stiffness, mobility, and arthritis relief.",
      link: "/treatments/joint-pain-arthritis",
      buttonText: "Explore Joint & Arthritis Care",
      benefits: ["Relieves joint stiffness & discomfort", "Supports mobility & flexibility", "Classical botanical applications"],
      duration: "45 - 60 Min Sessions"
    },
    {
      id: "skin-problems",
      number: "02",
      title: "Skin Problems",
      shortTitle: "Skin Problems",
      subtitle: "Ayurvedic Skin Wellness",
      image: "/images/skin_problems.png",
      description: "Personalized herbal Lepas and blood purification for healthy, glowing skin.",
      link: "/treatments/skin-problems",
      buttonText: "Explore Skin Care",
      benefits: ["Balances Pitta & Rakta Dhatu", "Herbal Lepas & botanicals", "Dietary harmonization"],
      duration: "Personalized Care"
    },
    {
      id: "hair-fall",
      number: "03",
      title: "Hair Fall Treatment",
      shortTitle: "Hair Fall Treatment",
      subtitle: "Ayurvedic Hair & Scalp Care",
      image: "/images/hair_fall.jpg",
      description: "Ayurvedic scalp oil therapies (Shiro Abhyanga) for hair fall and deep nourishment.",
      link: "/treatments/hair-fall",
      buttonText: "Explore Hair Fall Treatment",
      benefits: ["Addresses Khalitya & Palitya", "Shiro Abhyanga & botanical oils", "Deep scalp nourishment"],
      duration: "Therapeutic Regimen"
    },
    {
      id: "sexual-disorders",
      number: "04",
      title: "Sexual Disorders",
      shortTitle: "Sexual Disorders",
      subtitle: "Ayurvedic Wellness Support",
      image: "/images/consultation.png",
      description: "Personalized Ayurvedic wellness for vitality, reproductive balance, and stress relief.",
      link: "/treatments/sexual-disorders",
      buttonText: "Explore Sexual Wellness",
      benefits: ["Vajikarana & Shukra balance", "Vitality & stress management", "Confidential consultation"],
      duration: "Private Consultation"
    },
    {
      id: "de-addiction",
      number: "05",
      title: "De-addiction",
      shortTitle: "De-addiction",
      subtitle: "Recovery & Wellness Support",
      image: "/images/de_addiction.png",
      description: "Holistic lifestyle, detoxification, and mind-calming Ayurvedic recovery support.",
      link: "/treatments/de-addiction",
      buttonText: "Explore De-addiction Care",
      benefits: ["Dinacharya routine building", "Calming yoga & Pranayama", "Metabolic restoration"],
      duration: "Supportive Program"
    },
    {
      id: "diabetes",
      number: "06",
      title: "Diabetes",
      shortTitle: "Diabetes",
      subtitle: "Metabolic Wellness Support",
      image: "/images/diabetes.jpg",
      description: "Metabolic and lifestyle support for healthy glycemic balance and digestive Agni.",
      link: "/treatments/diabetes",
      buttonText: "Explore Diabetes Care",
      benefits: ["Madhumeha & Prameha care", "Optimizes Agni & metabolism", "Glycemic lifestyle support"],
      duration: "Long-term Wellness"
    },
    {
      id: "cancer-treatment",
      number: "07",
      title: "Cancer Treatment – All Types of Cancers",
      shortTitle: "Cancer Treatment",
      subtitle: "Supportive & Adjunct Care",
      image: "/images/cancer_treatment.jpg",
      description: "Supportive Ayurvedic wellness to enhance vitality, comfort, and quality of life.",
      link: "/treatments/cancer-treatment",
      buttonText: "Explore Cancer Support",
      benefits: ["Vitality & comfort support", "Digestive ease & nutrition", "Integrative coordination"],
      duration: "Supportive Consultation"
    },
    {
      id: "swarnaprashana",
      number: "08",
      title: "Swarnaprashana",
      shortTitle: "Swarnaprashana",
      subtitle: "Traditional Ayurvedic Child Wellness",
      image: "/images/swarnaprashana_child.png",
      ageBadge: "Children 0–16 Years",
      description: "Traditional child immunity drops administered on Pushya Nakshatra under Ayurvedic guidance.",
      link: "/treatments/swarnaprashana",
      buttonText: "Explore Swarnaprashana",
      benefits: ["For children (0–16 Years)", "Given on Pushya Nakshatra", "Nurtures immunity & intellect"],
      duration: "Periodic Administration"
    },
    {
      id: "reduce-obesity",
      number: "09",
      title: "Reduce Obesity (Sthoulya & Weight Management)",
      shortTitle: "Reduce Obesity",
      subtitle: "Metabolic Fat Loss & Medoroga Care",
      image: "/images/reduce_obesity.jpg",
      description: "Ayurvedic weight management with Udwarthanam herbal powder therapies and metabolic detox.",
      link: "/treatments/reduce-obesity",
      buttonText: "Explore Obesity Reduction",
      benefits: ["Udwarthanam herbal scraping", "Visceral metabolic detox", "Revitalizes fat metabolism"],
      duration: "Personalized Program"
    },
    {
      id: "vitiligo",
      number: "10",
      title: "Vitiligo & White Patches (Shvitra Care)",
      shortTitle: "Vitiligo (White Patches)",
      subtitle: "Shvitra & Leucoderma • Skin Repigmentation",
      image: "/images/vitiligo_treatment.jpg",
      description: "Classical Shvitra care with Bakuchi herbal lepams and natural skin re-pigmentation support.",
      link: "/treatments/vitiligo",
      buttonText: "Explore Vitiligo Treatment",
      benefits: ["Bakuchi & Manjistha herbs", "Blood purification detox", "Stimulates natural pigment"],
      duration: "Personalized Protocol"
    },
    {
      id: "physiotherapy",
      number: "11",
      title: "Physiotherapy & Musculoskeletal Rehabilitation",
      shortTitle: "Physiotherapy",
      subtitle: "Spine, Joint & Neurological Recovery",
      image: "/images/physiotherapy_rehab.jpg",
      description: "Integrated musculoskeletal rehabilitation, spine mobilization, and specialized Basti therapies.",
      link: "/treatments/physiotherapy",
      buttonText: "Explore Physiotherapy",
      benefits: ["Spine decompression & mobility", "Kati Basti & Janu Basti", "Post-stroke & nerve recovery"],
      duration: "Therapeutic Sessions"
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
      treatment: "Digestive Care",
      googleUrl: "https://www.google.com/maps/search/?api=1&query=Sri+Krishna+Ayurvedic+Clinic+KR+Puram+Bangalore"
    },
    {
      id: 2,
      quote: "A compassionate doctor who explains root causes clearly. The Panchakarma treatment plan was exceptionally effective for my chronic knee stiffness.",
      author: "Sunitha N.",
      locality: "T.C. Palya Main Road",
      treatment: "Joint Care",
      googleUrl: "https://www.google.com/maps/search/?api=1&query=Sri+Krishna+Ayurvedic+Clinic+KR+Puram+Bangalore"
    },
    {
      id: 3,
      quote: "Authentic Ayurvedic consultation with genuine care. Nominal fee and very effective traditional treatments. Highly recommended clinic in KR Puram.",
      author: "Praveen V.",
      locality: "Ramamurthy Nagar",
      treatment: "General Consultation",
      googleUrl: "https://www.google.com/maps/search/?api=1&query=Sri+Krishna+Ayurvedic+Clinic+KR+Puram+Bangalore"
    },
    {
      id: 4,
      quote: "We are incredibly pleased with the physiotherapy treatment provided by Dr. Sunithi. They treated both my wife and my daughter-in-law with the utmost professionalism and skill. What truly sets them apart is their bedside manner; they are kind, patient and make the recovery process so much easier. It is rare to find a physician who balances technical expertise with such a warm and welcoming personality. They truly care about their patients' well-being and are dedicated to seeing them recover. Highly recommended to anyone looking for effective and compassionate care.",
      author: "Vijay Kumar",
      locality: "Google Review • Verified Patient",
      treatment: "Physiotherapy & Rehab",
      googleUrl: "https://www.google.com/maps/contrib/101339651009401881583/reviews?hl=en-IN"
    },
    {
      id: 5,
      quote: "I am so thankful to Dr. Ananda Krishna sir for his effective treatment. 8 years ago I had severe allergy with lot of pain, after taking medicine for 2 months got complete relief. Now recently visited for lower abdominal pain and allergy, feeling much better.",
      author: "Amaravathi",
      locality: "Google Review • Verified Patient",
      treatment: "Allergy & Abdominal Care",
      googleUrl: "https://www.google.com/maps/contrib/106055851467615165338/reviews?hl=en-IN"
    },
    {
      id: 6,
      quote: "Dr. Anand is a great doctor. My grandfather was suffering from pain due to blockages in nerve, he was under medication for pain for the past 30+ years with no relief. But now after taking acupuncture therapies from Dr. Anand, he's feeling much better and has stopped taking the medicine since then. Nerve blockages seem to be reduced. Thanks Dr. Anand for treating him.",
      author: "Nisba N.",
      locality: "Google Review • Verified Patient",
      treatment: "Acupuncture & Nerve Care",
      googleUrl: "https://www.google.com/maps/contrib/103480488284638752719/reviews?hl=en-IN"
    },
    {
      id: 7,
      quote: "Dr. Anand sir is a go-to person for all ailments. Highly knowledgeable and service-oriented doctor. During COVID time he saved my father from his illness, his medicine helped him recover from illness and steroids. Today I got treated for my back and neck pain, the pain improved within a single sitting. Thanks to him.",
      author: "Vijay Babu",
      locality: "Google Review • Verified Patient",
      treatment: "Spine & Pain Relief",
      googleUrl: "https://www.google.com/maps/contrib/111746533441995792487/reviews?hl=en-IN"
    },
    {
      id: 8,
      quote: "We recently visited Sri Krishna Ayurvedic Clinic, my wife had severe back pain and was unable to walk, sit, or do anything. Dr. Anand Krishna sir treated her and within no time she was able to walk, with 50% pain reduced in just a few minutes. Later treatment went on for one month and now she is perfectly alright. I highly recommend this clinic to everyone.",
      author: "Vishwanath Bhat",
      locality: "Google Review • Verified Patient",
      treatment: "Severe Back Pain & Rehab",
      googleUrl: "https://www.google.com/maps/contrib/111024851553861046804/reviews?hl=en-IN"
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
