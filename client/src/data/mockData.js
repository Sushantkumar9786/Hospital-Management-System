// Comprehensive Clinical Mock Data for CarePlus CMS & EMR

export const FACILITIES = [
  {
    id: 'fac-01',
    name: 'CarePlus Apex District Hospital',
    type: 'District Hospital (Tertiary)',
    location: 'Metropolitan Central, Zone 1',
    totalBeds: 450,
    occupiedBeds: 382,
    icuBeds: 45,
    occupiedIcu: 39,
    doctorsOnDuty: 38,
    activeOpdQueue: 142,
    teleConsultActive: 8,
    emergencyStatus: 'Normal (Level 1)'
  },
  {
    id: 'fac-02',
    name: 'CarePlus Sub-District Center North',
    type: 'Sub-District Hospital (Secondary)',
    location: 'North Sector, Zone 2',
    totalBeds: 180,
    occupiedBeds: 144,
    icuBeds: 16,
    occupiedIcu: 12,
    doctorsOnDuty: 16,
    activeOpdQueue: 86,
    teleConsultActive: 4,
    emergencyStatus: 'Normal (Level 1)'
  },
  {
    id: 'fac-03',
    name: 'CarePlus Community Health Center (CHC East)',
    type: 'Community Health Center',
    location: 'East Corridor, Rural Ring',
    totalBeds: 60,
    occupiedBeds: 46,
    icuBeds: 4,
    occupiedIcu: 3,
    doctorsOnDuty: 7,
    activeOpdQueue: 48,
    teleConsultActive: 3,
    emergencyStatus: 'Elevated (Level 2)'
  },
  {
    id: 'fac-04',
    name: 'CarePlus Primary Health Center (PHC Valley)',
    type: 'Primary Health Center (PHC)',
    location: 'Valley Foothills, Sector 7',
    totalBeds: 20,
    occupiedBeds: 14,
    icuBeds: 0,
    occupiedIcu: 0,
    doctorsOnDuty: 3,
    activeOpdQueue: 29,
    teleConsultActive: 2,
    emergencyStatus: 'Normal (Level 1)'
  }
];

export const REFERRAL_STAGES = [
  { id: 1, name: 'Initiated', desc: 'Case flagged & triage created' },
  { id: 2, name: 'Triaged', desc: 'Clinical review & urgency scored' },
  { id: 3, name: 'Transport Booked', desc: 'Ambulance / 108 dispatch scheduled' },
  { id: 4, name: 'Dispatched', desc: 'En route with live telemetry' },
  { id: 5, name: 'Arrived at Facility', desc: 'Checked in at triage reception' },
  { id: 6, name: 'Specialist Consult', desc: 'Under active doctor evaluation' },
  { id: 7, name: 'Completed / Admitted', desc: 'Case resolved or admitted to ICU/Ward' }
];

export const INITIAL_REFERRALS = [
  {
    id: 'REF-8842',
    patientName: 'Rameshwar Patil',
    age: 54,
    gender: 'Male',
    healthId: 'CP-MH-902144',
    fromFacility: 'CarePlus PHC Valley',
    toFacility: 'CarePlus Apex District Hospital',
    specialtyRequired: 'Cardiology (Interventional)',
    urgency: 'Emergency', // Emergency (Red), Urgent (Yellow), Routine (Green)
    stage: 4, // Dispatched
    vitals: { bp: '168/104 mmHg', hr: '112 bpm', spo2: '91%', temp: '98.8 F' },
    clinicalNotes: 'Suspected acute inferior wall STEMI. Sublingual nitrates administered. Emergency catheterization requested on arrival.',
    timeElapsed: '28 mins',
    slaMinutesRemaining: 17,
    transportVehicle: 'Ambulance MH-34-AZ-9901'
  },
  {
    id: 'REF-8843',
    patientName: 'Sunita Deshmukh',
    age: 29,
    gender: 'Female',
    healthId: 'CP-MH-841029',
    fromFacility: 'CarePlus CHC East',
    toFacility: 'CarePlus Sub-District Center North',
    specialtyRequired: 'High-Risk Obstetrics',
    urgency: 'Urgent',
    stage: 2, // Triaged
    vitals: { bp: '142/92 mmHg', hr: '88 bpm', spo2: '97%', temp: '98.4 F' },
    clinicalNotes: '34-week gestation, persistent pre-eclampsia with severe headache and elevated proteinuria. Fetal heart rate monitored stable.',
    timeElapsed: '45 mins',
    slaMinutesRemaining: 45,
    transportVehicle: 'Scheduled Transit 108-B'
  },
  {
    id: 'REF-8844',
    patientName: 'Anil Shinde',
    age: 42,
    gender: 'Male',
    healthId: 'CP-MH-339102',
    fromFacility: 'CarePlus Sub-District Center North',
    toFacility: 'CarePlus Apex District Hospital',
    specialtyRequired: 'Orthopedic Trauma',
    urgency: 'Urgent',
    stage: 5, // Arrived at Facility
    vitals: { bp: '128/82 mmHg', hr: '76 bpm', spo2: '99%', temp: '98.6 F' },
    clinicalNotes: 'Compound fracture right distal tibia post-road traffic injury. Temporary splint applied, tetanus booster given.',
    timeElapsed: '72 mins',
    slaMinutesRemaining: 18,
    transportVehicle: 'Arrived MH-34-T-1144'
  },
  {
    id: 'REF-8845',
    patientName: 'Kavita Jadhav',
    age: 8,
    gender: 'Female',
    healthId: 'CP-MH-552091',
    fromFacility: 'CarePlus PHC Valley',
    toFacility: 'CarePlus Sub-District Center North',
    specialtyRequired: 'Pediatric Pulmonology',
    urgency: 'Routine',
    stage: 6, // Specialist Consult
    vitals: { bp: '100/68 mmHg', hr: '94 bpm', spo2: '96%', temp: '100.2 F' },
    clinicalNotes: 'Recurrent wheezing unresponsive to oral bronchodilator. Evaluation for pediatric asthma & allergic bronchopneumopathy.',
    timeElapsed: '110 mins',
    slaMinutesRemaining: 60,
    transportVehicle: 'Private Transit'
  }
];

export const QUEUE_ROOMS = [
  {
    roomNumber: 'OPD-101',
    department: 'General Internal Medicine',
    doctorName: 'Dr. Vivek Kulkarni, MD',
    currentToken: 'T-042',
    currentPatient: 'Ganesh Shirole',
    status: 'In Consultation',
    waitingCount: 6
  },
  {
    roomNumber: 'OPD-102',
    department: 'Cardiology & Vascular',
    doctorName: 'Dr. Ananya Iyer, DM',
    currentToken: 'C-018',
    currentPatient: 'Pooja Kulkarni',
    status: 'In Consultation',
    waitingCount: 4
  },
  {
    roomNumber: 'OPD-103',
    department: 'Pediatrics & Neonatal',
    doctorName: 'Dr. Rajesh Sharma, MD',
    currentToken: 'P-027',
    currentPatient: 'Master Aarav More',
    status: 'Calling Next',
    waitingCount: 8
  },
  {
    roomNumber: 'OPD-104',
    department: 'Orthopedics & Joint Care',
    doctorName: 'Dr. Sanjay Thorat, MS',
    currentToken: 'O-015',
    currentPatient: 'Bhagwan Ghodke',
    status: 'In Consultation',
    waitingCount: 5
  }
];

export const UPCOMING_TOKENS = [
  { token: 'T-043', patient: 'Meena Salunkhe', department: 'General Medicine', estWait: '8 mins', room: 'OPD-101' },
  { token: 'C-019', patient: 'Dattatray Wagh', department: 'Cardiology', estWait: '12 mins', room: 'OPD-102' },
  { token: 'P-028', patient: 'Baby Anvi Gaikwad', department: 'Pediatrics', estWait: '14 mins', room: 'OPD-103' },
  { token: 'T-044', patient: 'Santosh Sawant', department: 'General Medicine', estWait: '18 mins', room: 'OPD-101' },
  { token: 'O-016', patient: 'Parvati Kamble', department: 'Orthopedics', estWait: '22 mins', room: 'OPD-104' },
  { token: 'C-020', patient: 'Jayashree Joshi', department: 'Cardiology', estWait: '25 mins', room: 'OPD-102' }
];

export const DIAGNOSTIC_TESTS = [
  {
    id: 'LAB-9041',
    orderDate: '2026-10-12 09:15',
    patientName: 'Rameshwar Patil',
    healthId: 'CP-MH-902144',
    testName: 'Cardiac Biomarker Panel (Troponin-I, CK-MB)',
    department: 'Pathology & Biochemistry',
    sampleType: 'Venous Blood (Serum)',
    status: 'Completed', // Pending, In Analysis, Completed
    resultSummary: 'Troponin-I: 2.84 ng/mL (High Alert > 0.04). CK-MB: 48 U/L.',
    criticalAlert: true,
    reportedBy: 'Dr. Shalini Sen, MD Path'
  },
  {
    id: 'LAB-9042',
    orderDate: '2026-10-12 10:30',
    patientName: 'Sunita Deshmukh',
    healthId: 'CP-MH-841029',
    testName: 'Comprehensive Metabolic Panel & Urine Protein',
    department: 'Clinical Biochemistry',
    sampleType: 'Serum + Spot Urine',
    status: 'In Analysis',
    resultSummary: 'Sample in automated centrifuge. ETA 20 mins.',
    criticalAlert: false,
    reportedBy: 'Lab Tech S. Munde'
  },
  {
    id: 'LAB-9043',
    orderDate: '2026-10-12 11:00',
    patientName: 'Anil Shinde',
    healthId: 'CP-MH-339102',
    testName: 'Digital X-Ray Right Leg (AP & Lateral Views)',
    department: 'Radiology & Imaging',
    sampleType: 'Radiological Scan',
    status: 'Completed',
    resultSummary: 'Complete transverse fracture distal third tibia with moderate displacement.',
    criticalAlert: false,
    reportedBy: 'Dr. H. Mehta, DMRD'
  },
  {
    id: 'LAB-9044',
    orderDate: '2026-10-12 11:45',
    patientName: 'Priya Verma',
    healthId: 'CP-MH-102948',
    testName: 'Complete Blood Count (CBC) with ESR & Platelets',
    department: 'Hematology',
    sampleType: 'EDTA Whole Blood',
    status: 'Pending Collection',
    resultSummary: 'Phlebotomy barcode issued: BC-8829104.',
    criticalAlert: false,
    reportedBy: 'Pending Phlebotomist'
  }
];

export const DOCTORS = [
  {
    id: 'DOC-101',
    name: 'Dr. Vivek Kulkarni',
    degree: 'MBBS, MD (Internal Medicine)',
    specialty: 'General Medicine',
    experience: '14 Years',
    availableSlots: ['09:30 AM', '10:00 AM', '11:15 AM', '02:00 PM', '03:30 PM'],
    room: 'OPD-101'
  },
  {
    id: 'DOC-102',
    name: 'Dr. Ananya Iyer',
    degree: 'MBBS, MD, DM (Cardiology)',
    specialty: 'Cardiology',
    experience: '11 Years',
    availableSlots: ['10:30 AM', '11:00 AM', '01:30 PM', '04:00 PM'],
    room: 'OPD-102'
  },
  {
    id: 'DOC-103',
    name: 'Dr. Rajesh Sharma',
    degree: 'MBBS, MD (Pediatrics)',
    specialty: 'Pediatrics',
    experience: '9 Years',
    availableSlots: ['09:00 AM', '10:15 AM', '11:45 AM', '03:00 PM'],
    room: 'OPD-103'
  },
  {
    id: 'DOC-104',
    name: 'Dr. Sanjay Thorat',
    degree: 'MBBS, MS (Orthopedics)',
    specialty: 'Orthopedics',
    experience: '16 Years',
    availableSlots: ['10:00 AM', '11:30 AM', '02:30 PM', '04:30 PM'],
    room: 'OPD-104'
  }
];

export const PATIENT_RECORD_DEMO = {
  healthId: 'CP-MH-772910',
  name: 'Rahul Narayan Patil',
  age: 38,
  gender: 'Male',
  bloodGroup: 'B Positive',
  phone: '+91 98230 44521',
  email: 'rahul.patil@careplus.health',
  address: 'Flat 402, Green Avenue, Central Ward, Maharashtra',
  emergencyContact: 'Sneha Patil (Spouse) - +91 98230 44522',
  allergies: ['Penicillin', 'Sulfa Drugs'],
  chronicConditions: ['Mild Essential Hypertension'],
  vitalsHistory: [
    { date: '12 Oct 2026', bp: '124/82', hr: 74, spo2: 99, weight: '72 kg' },
    { date: '15 Aug 2026', bp: '132/86', hr: 78, spo2: 98, weight: '73 kg' },
    { date: '10 May 2026', bp: '138/88', hr: 82, spo2: 98, weight: '74 kg' }
  ],
  pastPrescriptions: [
    {
      id: 'RX-991',
      date: '15 Aug 2026',
      doctor: 'Dr. Vivek Kulkarni',
      specialty: 'General Medicine',
      diagnosis: 'Essential Hypertension Grade 1 & Acute Rhinitis',
      medicines: [
        { name: 'Telmisartan 40mg', dosage: '1 tablet daily (Morning)', duration: '90 days' },
        { name: 'Cetirizine 10mg', dosage: '1 tablet at bedtime', duration: '5 days' }
      ]
    },
    {
      id: 'RX-814',
      date: '10 May 2026',
      doctor: 'Dr. Rajesh Sharma',
      specialty: 'General Medicine',
      diagnosis: 'Upper Respiratory Viral Illness',
      medicines: [
        { name: 'Paracetamol 650mg', dosage: 'SOS up to 3 times/day', duration: '3 days' },
        { name: 'Vitamin C 500mg', dosage: '1 chewable tablet daily', duration: '15 days' }
      ]
    }
  ]
};

export const HIPAA_AUDIT_LOGS = [
  {
    id: 'AUD-55210',
    timestamp: '2026-10-12 11:58:14 UTC',
    userId: 'DOC-102 (Dr. Ananya Iyer)',
    role: 'ROLE_DOCTOR',
    action: 'EMR_ACCESS_READ',
    patientHealthId: 'CP-MH-902144',
    ipAddress: '10.24.110.42',
    status: 'AUTHORIZED',
    notes: 'Viewed ECG & Troponin cardiac lab profile prior to catheterization'
  },
  {
    id: 'AUD-55209',
    timestamp: '2026-10-12 11:54:02 UTC',
    userId: 'NUR-404 (Sister Leela K)',
    role: 'ROLE_NURSE',
    action: 'TRIAGE_VITALS_RECORDED',
    patientHealthId: 'CP-MH-841029',
    ipAddress: '10.24.110.19',
    status: 'AUTHORIZED',
    notes: 'Updated pre-eclampsia blood pressure 142/92 mmHg'
  },
  {
    id: 'AUD-55208',
    timestamp: '2026-10-12 11:49:33 UTC',
    userId: 'ADM-001 (Chief Health Officer)',
    role: 'ROLE_ADMIN',
    action: 'SECURITY_ROLE_AUDIT',
    patientHealthId: 'N/A (System Audit)',
    ipAddress: '192.168.1.100',
    status: 'AUTHORIZED',
    notes: 'Generated monthly HIPAA access compliance compliance report'
  },
  {
    id: 'AUD-55207',
    timestamp: '2026-10-12 11:42:10 UTC',
    userId: 'EXT-UNKNOWN',
    role: 'ANONYMOUS',
    action: 'UNAUTHORIZED_RECORD_ACCESS_ATTEMPT',
    patientHealthId: 'CP-MH-339102',
    ipAddress: '185.220.101.5',
    status: 'BLOCKED_BY_GATEWAY',
    notes: 'Spring Security 6 blocked unauthenticated JWT token'
  }
];
