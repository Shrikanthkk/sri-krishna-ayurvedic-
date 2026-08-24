/*
 * ─────────────────────────────────────────────────────────────
 *  Cancer Care Reference Data
 *
 *  Summarized accurately from reliable medical sources
 *  (WHO, National Cancer Institute / NCI, American Cancer Society / ACS).
 *  Strictly distinguishes evidence-based oncology from Ayurvedic supportive care.
 * ─────────────────────────────────────────────────────────────
 */

export const majorCancerTypes = [
  {
    id: "blood-cancer",
    title: "Blood Cancer",
    subtitle: "Leukemia, Lymphoma & Multiple Myeloma",
    category: "Hematologic Malignancy",
    badgeColor: "bg-red-900/10 text-red-800 border-red-200",
    iconName: "Activity",
    image: "/images/ayurvedic_cancer_treatment.png",
    shortSummary: "Malignancies of blood-forming tissues and the lymphatic system affecting normal cellular immunity and blood production.",
    points: {
      whatItIs: "Cancers that originate in bone marrow blood-forming tissues (Leukemia), the lymphatic system (Lymphoma), or plasma cells (Multiple Myeloma), leading to abnormal white blood cell proliferation and impaired normal blood function.",
      riskFactors: "Genetic predispositions, past high-dose radiation exposure, chemical hazards (such as benzene), prior chemotherapy treatments, and chronic immune deficiencies.",
      symptoms: "Persistent chronic fatigue, recurrent or frequent infections, unexplained low-grade fevers, easy bruising or bleeding, night sweats, bone pain, and painless swollen lymph nodes.",
      diagnosis: "Complete blood count (CBC) with peripheral smear, bone marrow aspiration and biopsy, flow cytometry, cytogenetic testing, and specialized imaging (PET/CT scans).",
      standardTreatment: "Evidence-based conventional protocols including systemic chemotherapy, targeted oral therapy drugs, immunotherapy, radiation therapy, and autologous or allogeneic stem cell transplantation.",
      ayurvedicSupport: "Gentle Rasayana botanicals to support tissue vitality, soothing easily digestible nutrition to alleviate treatment-related weakness, and mindful stress-relief practices to preserve quality of life."
    }
  },
  {
    id: "breast-cancer",
    title: "Breast Cancer",
    subtitle: "Ductal & Lobular Carcinomas",
    category: "Glandular Malignancy",
    badgeColor: "bg-pink-900/10 text-pink-800 border-pink-200",
    iconName: "HeartPulse",
    image: "/images/breast_cancer.png",
    shortSummary: "Malignant cellular growth originating in breast ductal or lobular epithelium with hormone receptor variations.",
    points: {
      whatItIs: "Uncontrolled growth of abnormal epithelial cells initiating in the milk ducts (ductal carcinoma) or lobules (lobular carcinoma) of the breast, with potential for localized extension and metastasis.",
      riskFactors: "Advancing age, inherited genetic mutations (notably BRCA1 and BRCA2), positive family history, dense breast tissue composition, hormonal factors, and lifestyle factors.",
      symptoms: "A painless, firm lump or thickening in the breast or underarm, alterations in breast contour or size, skin dimpling or puckering, and unusual nipple discharge or retraction.",
      diagnosis: "Clinical breast examination, diagnostic digital mammography, high-resolution ultrasound, breast MRI, and core needle biopsy with receptor biomarker profiling (ER, PR, HER2).",
      standardTreatment: "Standard oncological care including breast-conserving surgery (lumpectomy) or mastectomy, external radiation therapy, adjuvant chemotherapy, targeted monoclonal antibodies, and hormone therapy.",
      ayurvedicSupport: "Nourishing, non-conflicting dietary regimens, soothing topical botanical support for skin comfort post-radiation, and guided meditation to reduce treatment-related anxiety."
    }
  },
  {
    id: "liver-cancer",
    title: "Liver Cancer",
    subtitle: "Hepatocellular Carcinoma (HCC)",
    category: "Hepatic Malignancy",
    badgeColor: "bg-amber-900/10 text-amber-800 border-amber-200",
    iconName: "ShieldAlert",
    image: "/images/liver_cancer.png",
    shortSummary: "Primary liver malignancy commonly associated with chronic hepatic inflammation, viral hepatitis, or cirrhosis.",
    points: {
      whatItIs: "Primary malignant tumor originating in the main functional liver cells (hepatocytes), frequently developing secondary to persistent liver inflammation or chronic parenchymal scarring.",
      riskFactors: "Chronic viral Hepatitis B or C infection, liver cirrhosis, chronic heavy alcohol intake, non-alcoholic fatty liver disease (NAFLD/NASH), type 2 diabetes, and exposure to aflatoxins.",
      symptoms: "Unexplained weight loss and loss of appetite, upper right abdominal pain or fullness, nausea and vomiting, yellowing of skin and eyes (jaundice), and abdominal swelling (ascites).",
      diagnosis: "Serum biomarker testing (Alpha-fetoprotein / AFP), liver function panels, multiphase contrast-enhanced CT or MRI, and ultrasound-guided needle biopsy when clinically required.",
      standardTreatment: "Evidence-based modalities including surgical partial hepatectomy, liver transplantation, localized thermal ablation (RFA), transarterial chemoembolization (TACE), and targeted systemic immunotherapy.",
      ayurvedicSupport: "Carefully monitored Pitta-pacifying nutrition, digestive Agni balance with mild, easily metabolizable foods, and supportive lifestyle measures to maintain metabolic strength."
    }
  },
  {
    id: "lung-cancer",
    title: "Lung Cancer",
    subtitle: "Non-Small Cell (NSCLC) & Small Cell (SCLC)",
    category: "Pulmonary Malignancy",
    badgeColor: "bg-cyan-900/10 text-cyan-800 border-cyan-200",
    iconName: "Wind",
    image: "/images/lung_cancer.png",
    shortSummary: "Malignant growth originating in respiratory bronchial or alveolar tissues, categorized into NSCLC and SCLC.",
    points: {
      whatItIs: "Malignant cellular transformation beginning in the respiratory passages, bronchi, or alveoli of the lungs, primarily divided into Non-Small Cell Lung Cancer (85%) and Small Cell Lung Cancer (15%).",
      riskFactors: "Tobacco smoking (the predominant risk factor), passive secondhand smoke exposure, inhalation of environmental radon gas, occupational asbestos and industrial pollutants, and genetic susceptibility.",
      symptoms: "Persistent or progressive chronic cough, coughing up blood (hemoptysis), chest discomfort exacerbated by deep breathing, shortness of breath, hoarseness, and unexplained fatigue.",
      diagnosis: "Low-Dose Computed Tomography (LDCT) screening, chest X-ray, bronchoscopy, sputum cytology, and tissue biopsy with comprehensive genomic biomarker profiling (EGFR, ALK, PD-L1).",
      standardTreatment: "Conventional oncological interventions including surgical resection (lobectomy), stereotactic body radiation therapy (SBRT), combination chemotherapy, and targeted kinase inhibitors.",
      ayurvedicSupport: "Gentle restorative breathwork (Pranayama) to support comfortable breathing, soothing warm herbal broths to ease dry throat mucosal irritation, and holistic stress reduction."
    }
  },
  {
    id: "prostate-cancer",
    title: "Prostate Cancer",
    subtitle: "Adenocarcinoma of the Prostate",
    category: "Urologic Malignancy",
    badgeColor: "bg-emerald-900/10 text-emerald-800 border-emerald-200",
    iconName: "Shield",
    image: "/images/prostate_cancer.png",
    shortSummary: "Glandular malignancy of the male reproductive prostate gland, varying from indolent to aggressive forms.",
    points: {
      whatItIs: "Malignancy arising from the glandular epithelial cells of the prostate gland in men, ranging from very slow-growing indolent forms to faster-progressing metastatic tumors.",
      riskFactors: "Advancing age (most common after age 50), African ancestry, positive family history of prostate or breast cancer, inherited gene mutations (BRCA2, Lynch syndrome), and high-fat dietary patterns.",
      symptoms: "Difficulty initiating or stopping urination, weakened or interrupted urinary stream, increased nighttime urination frequency (nocturia), blood in urine or semen, and pelvic or lower back ache.",
      diagnosis: "Serum Prostate-Specific Antigen (PSA) screening, Digital Rectal Examination (DRE), multiparametric MRI (mpMRI), and transrectal or transperineal ultrasound-guided core biopsy.",
      standardTreatment: "Evidence-based management ranging from Active Surveillance for low-risk disease to Radical Prostatectomy, External Beam Radiotherapy, Brachytherapy, Androgen Deprivation Therapy (ADT), and chemotherapy.",
      ayurvedicSupport: "Vata-balancing dietary protocols for urinary comfort, adaptogenic tonics to help manage fatigue related to androgen suppression therapy, and revitalizing lifestyle guidance."
    }
  },
  {
    id: "cervical-cancer",
    title: "Cervical Cancer",
    subtitle: "Squamous Cell & Adenocarcinoma",
    category: "Gynecologic Malignancy",
    badgeColor: "bg-purple-900/10 text-purple-800 border-purple-200",
    iconName: "Sparkles",
    image: "/images/cervical_cancer.png",
    shortSummary: "Malignancy of the uterine cervix strongly associated with persistent high-risk Human Papillomavirus (HPV) infection.",
    points: {
      whatItIs: "Malignant growth originating in the cells lining the cervix (the lower part of the uterus connecting to the vagina), predominantly triggered by persistent high-risk Human Papillomavirus (HPV) infection.",
      riskFactors: "Persistent infection with high-risk oncogenic HPV types (16 & 18), lack of routine cervical screening, cigarette smoking, compromised immune system, and early sexual debut.",
      symptoms: "Abnormal vaginal bleeding between periods or post-intercourse, unusual watery or foul-smelling vaginal discharge, and persistent pelvic or lower back pain in advanced stages.",
      diagnosis: "Routine Pap smear screening, high-risk HPV DNA co-testing, colposcopic examination with acetic acid application, and cervical punch or loop electrosurgical excision (LEEP) biopsy.",
      standardTreatment: "Primary prevention through HPV vaccination; medical treatments include Loop Excision / Cone Biopsy for early lesions, Radical Hysterectomy, concurrent Chemoradiation, and Immunotherapy.",
      ayurvedicSupport: "Supportive tissue-nourishing foods during radiation, classical Ojas-enhancing nutrition, and compassionate counseling to support mental calm and digestive resilience."
    }
  },
  {
    id: "colon-cancer",
    title: "Colon & Colorectal Cancer",
    subtitle: "Adenocarcinoma of the Large Intestine",
    category: "Gastrointestinal Malignancy",
    badgeColor: "bg-teal-900/10 text-teal-800 border-teal-200",
    iconName: "HeartPulse",
    shortSummary: "Malignancy originating in the large intestine mucosa, typically developing from pre-cancerous adenomatous polyps.",
    points: {
      whatItIs: "Cancer originating in the epithelial lining of the large intestine (colon or rectum), typically developing gradually over several years from pre-cancerous adenomatous polyps.",
      riskFactors: "Age over 45, high consumption of red and processed meats, low-fiber dietary habits, inflammatory bowel diseases (Ulcerative Colitis or Crohn's), obesity, smoking, and hereditary syndromes (FAP, Lynch).",
      symptoms: "Persistent change in bowel habits (diarrhea, constipation, or narrowing of stool), rectal bleeding or dark blood in stool, persistent abdominal cramps or bloating, and unexplained iron-deficiency anemia.",
      diagnosis: "Diagnostic and screening Colonoscopy with polyp removal/biopsy, Fecal Immunochemical Test (FIT), stool DNA testing, and contrast-enhanced CT scans of the abdomen and pelvis.",
      standardTreatment: "Standard oncology care including Endoscopic mucosal resection, Surgical colectomy or proctectomy, adjuvant systemic chemotherapy, targeted monoclonal antibodies, and pelvic radiotherapy.",
      ayurvedicSupport: "Easily digestible soothing gruels (*Peya* and *Yusha*), gut flora-friendly wholesome nutrition, non-irritating herbs for natural digestive ease, and post-surgical convalescence care."
    }
  },
  {
    id: "skin-cancer",
    title: "Skin Cancer",
    subtitle: "Melanoma, Basal Cell & Squamous Cell Carcinomas",
    category: "Dermatologic Malignancy",
    badgeColor: "bg-orange-900/10 text-orange-800 border-orange-200",
    iconName: "Sun",
    shortSummary: "Uncontrolled growth of abnormal cutaneous skin cells triggered primarily by ultraviolet (UV) radiation DNA damage.",
    points: {
      whatItIs: "Uncontrolled proliferation of abnormal cells in the epidermis, broadly classified into Non-Melanoma Skin Cancers (Basal Cell Carcinoma and Squamous Cell Carcinoma) and Melanoma (the most aggressive form originating in melanocytes).",
      riskFactors: "Excessive exposure to ultraviolet (UV) radiation from sunlight or tanning beds, fair complexion, history of severe childhood sunburns, presence of numerous or atypical moles, and immune suppression.",
      symptoms: "A new, changing, or irregular skin growth, pearly or waxy bump, non-healing sore that bleeds, or a mole exhibiting the ABCDE criteria (Asymmetry, Border irregularity, Color variation, Diameter >6mm, Evolving).",
      diagnosis: "Clinical dermatoscopy examination, total-body skin mapping, and definitive surgical punch, shave, or excisional biopsy with microscopic margin evaluation.",
      standardTreatment: "Standard oncology procedures including wide surgical local excision, Mohs micrographic surgery, cryotherapy, radiation therapy, and advanced immunotherapy (checkpoint inhibitors) or targeted therapy for BRAF mutations.",
      ayurvedicSupport: "Natural botanical skin cooling and soothing regimens, antioxidant-rich wholesome dietary recommendations, lifestyle sun-protection guidance, and restorative convalescence."
    }
  }
];
