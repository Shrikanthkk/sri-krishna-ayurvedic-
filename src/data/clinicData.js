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
    googleReviewsUrl: "https://www.google.com/search?q=sri+krishna+ayurvedic+clinic+kr+puram&oq=sri+kris&gs_lcrp=EgZjaHJvbWUqCAgBEEUYJxg7MgYIABBFGDkyCAgBEEUYJxg7MggIAhBFGCcYOzIKCAMQABixAxiABDIHCAQQLhiABDIHCAUQLhiABDIHCAYQABiABDIQCAcQLhivARjHARiABBiOBTIKCAgQABixAxiABDIKCAkQABixAxiABNIBCTY1NTFqMGoxNagCCLACAfEFNXVs2nIee_w&sourceid=chrome&source=chrome.rb&ie=UTF-8#sv=CAESzAEKuAEStQEKd0FKaVQ0dEx4Q3VkT3J1Tl81dzQ2dW9uVXRDMzN6WENzTDBqeVdLMGlncmFndVcwUDdQTHdLRFRuem9zemdySnM4RnNEQkRuQWhyeTVWWmtZTThXRmI0RHQ2LWhjM2tndEhNUXYyb05UeDRKR2k0X1Y0eU1GeERnEhYtQS1NYXBVRnlwT3g0d19Fa3J5NUF3GiJBRHNyOWZTZGRNbS13UlYxZ2RadTZUYzRkYnZrYUJPZkpREgQ4MDUxGgEzKgAwADgBQAAYACDEsbH2DkoCEAI",
    mapEmbedSrc: "https://maps.google.com/maps?q=Sri%20Krishna%20Ayurvedic%20Clinic%2C%20No%20426%2C%20Near%20Lakshmi%20Super%20Speciality%20Hospital%2C%203rd%20Main%2C%20Krishnarajapuram%2C%20Bangalore%20560036&t=&z=16&ie=UTF8&iwloc=&output=embed"
  },

  images: {
    hero: "/images/ayurvedic_integrative_therapy.jpg",
    doctor: "/images/doctor.jpg",
    consultation: "/images/consultation.png",
    formulations: "/images/classical_formulations.png",
    trust: "/images/trust_ayurveda.png",
    nadiPariksha: "/images/nadi_pariksha.png",
    herbs: "/images/ayurvedic_potli_herbs.jpg",
    clinic: "/images/ancient_ayurveda_sage.jpg",
    shirodhara: "/images/shirodhara.jpg",
    herbalPrep: "/images/ayurvedic_potli_herbs.jpg",
    treatmentRoom: "/images/ayurvedic_potli_herbs.jpg",
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
      id: "joint-pain-arthritis",
      number: "01",
      title: "Chronic Diseases – Joint Pains (Arthritis)",
      shortTitle: "Joint Pain & Arthritis",
      subtitle: "Supportive Musculoskeletal Care",
      image: "/images/ayurvedic_potli_herbs.jpg",
      description: "Ayurvedic care and supportive wellness approaches for joint pain, stiffness and arthritis-related concerns.",
      link: "/treatments/joint-pain-arthritis",
      buttonText: "Explore Joint & Arthritis Care",
      benefits: ["Relieves joint stiffness & discomfort", "Supports healthy mobility & flexibility", "Classical botanical applications"],
      duration: "45 - 60 Min Sessions"
    },
    {
      id: "skin-problems",
      number: "02",
      title: "Skin Problems",
      shortTitle: "Skin Problems",
      subtitle: "Ayurvedic Skin Wellness",
      image: "/images/ancient_ayurveda_sage.jpg",
      description: "Personalized Ayurvedic skin care for common skin concerns and overall skin wellness.",
      link: "/treatments/skin-problems",
      buttonText: "Explore Skin Care",
      benefits: ["Balances Pitta & Rakta Dhatu", "Herbal Lepas & botanical preparations", "Dietary & lifestyle harmonization"],
      duration: "Personalized Care"
    },
    {
      id: "hair-fall",
      number: "03",
      title: "Hair Fall Treatment",
      shortTitle: "Hair Fall Treatment",
      subtitle: "Ayurvedic Hair & Scalp Care",
      image: "/images/ayurvedic_potli_herbs.jpg",
      description: "Ayurvedic hair and scalp care focused on hair fall, scalp nourishment and healthy hair maintenance.",
      link: "/treatments/hair-fall",
      buttonText: "Explore Hair Fall Treatment",
      benefits: ["Addresses Khalitya & Palitya concerns", "Shiro Abhyanga & botanical oils", "Deep scalp nourishment"],
      duration: "Therapeutic Regimen"
    },
    {
      id: "sexual-disorders",
      number: "04",
      title: "Sexual Disorders",
      shortTitle: "Sexual Disorders",
      subtitle: "Ayurvedic Wellness Support",
      image: "/images/consultation.png",
      description: "Personalized Ayurvedic wellness support for sexual and reproductive health concerns.",
      link: "/treatments/sexual-disorders",
      buttonText: "Explore Sexual Wellness",
      benefits: ["Vajikarana & Shukra Dhatu balance", "Stress management & vitality support", "Private & respectful consultation"],
      duration: "Private Consultation"
    },
    {
      id: "de-addiction",
      number: "05",
      title: "De-addiction",
      shortTitle: "De-addiction",
      subtitle: "Recovery & Wellness Support",
      image: "/images/ayurvedic_integrative_therapy.jpg",
      description: "Ayurvedic lifestyle and wellness support as part of a professionally supervised recovery program.",
      link: "/treatments/de-addiction",
      buttonText: "Explore De-addiction Care",
      benefits: ["Dinacharya & healthy routine building", "Mind calming yoga & Pranayama", "Nutrition & metabolic restoration"],
      duration: "Supportive Program"
    },
    {
      id: "diabetes",
      number: "06",
      title: "Diabetes",
      shortTitle: "Diabetes",
      subtitle: "Metabolic Wellness Support",
      image: "/images/ayurvedic_potli_herbs.jpg",
      description: "Ayurvedic lifestyle and wellness support for healthy metabolic management alongside appropriate medical care.",
      link: "/treatments/diabetes",
      buttonText: "Explore Diabetes Care",
      benefits: ["Madhumeha & Prameha principles", "Optimizes Agni & Meda Dhatu", "Dietary & glycemic lifestyle support"],
      duration: "Long-term Wellness"
    },
    {
      id: "cancer-treatment",
      number: "07",
      title: "Cancer Treatment – All Types of Cancers",
      shortTitle: "Cancer Treatment",
      subtitle: "Supportive & Adjunct Care",
      image: "/images/ayurvedic_cancer_treatment.png",
      description: "Ayurvedic supportive care focused on wellbeing and quality of life alongside appropriate cancer treatment.",
      link: "/treatments/cancer-treatment",
      buttonText: "Explore Cancer Support",
      benefits: ["Quality of life & vitality support", "Nutrition & digestive comfort", "Integrative oncology coordination"],
      duration: "Supportive Consultation"
    },
    {
      id: "swarnaprashana",
      number: "08",
      title: "Swarnaprashana",
      shortTitle: "Swarnaprashana",
      subtitle: "Traditional Ayurvedic Child Wellness",
      image: "/images/swarnaprashana_1.png",
      ageBadge: "Children 0–16 Years",
      description: "Traditional Ayurvedic wellness practice for children, traditionally associated with Pushya Nakshatra and administered under qualified Ayurvedic guidance.",
      link: "/treatments/swarnaprashana",
      buttonText: "Explore Swarnaprashana",
      benefits: ["For infants & children (0–16 Years)", "Administered on Pushya Nakshatra days", "Nurtures vitality, intellect & wellbeing"],
      duration: "Periodic Administration"
    },
    {
      id: "reduce-obesity",
      number: "09",
      title: "Reduce Obesity (Sthoulya & Weight Management)",
      shortTitle: "Reduce Obesity",
      subtitle: "Metabolic Fat Loss & Medoroga Care",
      image: "/images/ancient_ayurveda_sage.jpg",
      description: "Root-cause Ayurvedic weight management combining Udwarthanam herbal scraping, metabolic detoxification, and customized nutrition to burn stubborn fat naturally.",
      link: "/treatments/reduce-obesity",
      buttonText: "Explore Obesity Reduction",
      benefits: ["Udwarthanam herbal powder scraping", "Lekhana Basti visceral detox", "Revitalizes Agni & fat metabolism"],
      duration: "Personalized Program"
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
