import React, { useState } from 'react';
import { 
  Stethoscope, 
  User, 
  FileText, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  AlertCircle, 
  PhoneForwarded, 
  Clock,
  Pill,
  Save,
  Send
} from 'lucide-react';
import { QUEUE_ROOMS } from '../data/mockData';

export default function DoctorWorkstation({ onOpenReferral }) {
  const [selectedPatient, setSelectedPatient] = useState({
    name: 'Ganesh Shirole',
    age: 48,
    gender: 'Male',
    healthId: 'CP-MH-620194',
    token: 'T-042',
    chiefComplaint: 'Substernal chest tightness radiating to left shoulder on moderate exertion for 3 days.',
    vitals: { bp: '138/88 mmHg', hr: '82 bpm', spo2: '98%', temp: '98.4 F', weight: '76 kg' },
    allergies: ['Penicillin']
  });

  // SOAP notes state
  const [soapNotes, setSoapNotes] = useState({
    subjective: 'Patient reports progressive exertional angina. Relieved with rest. Denies acute diaphoresis or syncopal episodes.',
    objective: 'S1/S2 heard normally, no gallop or audible murmur. Lungs clear to bilateral auscultation. Resting BP 138/88.',
    assessment: 'Suspected Coronary Artery Disease (CAD) / Stable Angina Pectoris (ICD-10 I20.9). Grade 1 HTN.',
    plan: '1. Order 12-Lead ECG & High-Sensitivity Troponin-I stat.\n2. Initiate low-dose Aspirin, Statin & Nitrate.\n3. Cardiology consult at District Hub if symptoms recur.'
  });

  // E-Prescription state
  const [medicines, setMedicines] = useState([
    { name: 'Ecosprin 75mg', dosage: '1 tablet once daily post lunch', duration: '30 days' },
    { name: 'Atorvastatin 20mg', dosage: '1 tablet at bedtime', duration: '30 days' },
    { name: 'Sorbitrate 5mg (SOS)', dosage: 'Sublingual if chest tightness occurs', duration: 'As needed' }
  ]);

  const [newMed, setNewMed] = useState({ name: '', dosage: '', duration: '' });
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleAddMed = (e) => {
    e.preventDefault();
    if (!newMed.name) return;
    setMedicines([...medicines, newMed]);
    setNewMed({ name: '', dosage: '', duration: '' });
  };

  const handleRemoveMed = (idx) => {
    setMedicines(medicines.filter((_, i) => i !== idx));
  };

  const handleSaveConsultation = () => {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h2 className="text-xl font-bold text-slate-900 font-heading flex items-center">
            <Stethoscope className="w-5 h-5 mr-2 text-indigo-600" />
            Doctor Clinical Workstation & EMR Consultation Room
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Standardized SOAP documentation, E-Prescribing, and instant higher-tier inter-facility referral initiation.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-xs font-semibold text-slate-700 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
            Physician: <strong>Dr. Vivek Kulkarni, MD</strong> (Room OPD-101)
          </span>
        </div>
      </div>

      {savedSuccess && (
        <div className="bg-emerald-50 border border-emerald-300 text-emerald-800 p-3 rounded-lg text-xs font-semibold flex items-center">
          <CheckCircle2 className="w-4 h-4 mr-2 text-emerald-600" />
          Clinical Consultation SOAP Notes and E-Prescription committed to immutable EMR record successfully!
        </div>
      )}

      {/* Main Workspace Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Col: Patient Banner & Vitals */}
        <div className="space-y-4">
          <div className="clinic-card p-5 border-t-4 border-t-brand-700">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="px-2 py-0.5 text-[10px] font-bold bg-brand-50 text-brand-800 rounded">
                Active Consultation
              </span>
              <span className="text-xs font-mono font-bold text-slate-600">
                Token: {selectedPatient.token}
              </span>
            </div>

            <div className="mt-3">
              <h3 className="text-lg font-bold text-slate-900 font-heading">
                {selectedPatient.name}
              </h3>
              <p className="text-xs text-slate-500">
                {selectedPatient.gender}, {selectedPatient.age} Yrs &bull; {selectedPatient.healthId}
              </p>
            </div>

            {/* Drug Allergy Flag */}
            <div className="mt-3 bg-rose-50 border border-rose-200 p-2.5 rounded text-xs text-rose-800 flex items-start space-x-2">
              <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
              <div>
                <strong>Allergy Warning:</strong> {selectedPatient.allergies.join(', ')}
              </div>
            </div>

            {/* Vitals */}
            <div className="mt-4 pt-3 border-t border-slate-100">
              <span className="text-xs font-bold text-slate-600 block mb-2">Triage Vitals Check:</span>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-slate-50 p-2 rounded border border-slate-200">
                  <span className="text-[10px] text-slate-400 block font-medium">BP</span>
                  <strong>{selectedPatient.vitals.bp}</strong>
                </div>
                <div className="bg-slate-50 p-2 rounded border border-slate-200">
                  <span className="text-[10px] text-slate-400 block font-medium">Heart Rate</span>
                  <strong>{selectedPatient.vitals.hr}</strong>
                </div>
                <div className="bg-slate-50 p-2 rounded border border-slate-200">
                  <span className="text-[10px] text-slate-400 block font-medium">SpO2</span>
                  <strong>{selectedPatient.vitals.spo2}</strong>
                </div>
                <div className="bg-slate-50 p-2 rounded border border-slate-200">
                  <span className="text-[10px] text-slate-400 block font-medium">Body Weight</span>
                  <strong>{selectedPatient.vitals.weight}</strong>
                </div>
              </div>
            </div>

            {/* Quick Referral Trigger */}
            <div className="mt-4 pt-3 border-t border-slate-100">
              <button
                onClick={onOpenReferral}
                className="w-full px-3 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-lg shadow-sm transition flex items-center justify-center"
              >
                <PhoneForwarded className="w-3.5 h-3.5 mr-1.5" />
                Refer to Higher Tertiary Facility
              </button>
            </div>
          </div>
        </div>

        {/* Center/Right Col: SOAP Notes & E-Prescription */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* SOAP Clinical Notes Card */}
          <div className="clinic-card p-6">
            <h3 className="text-base font-bold text-slate-900 font-heading pb-3 border-b border-slate-200 flex items-center">
              <FileText className="w-4 h-4 mr-2 text-brand-700" />
              Standardized Clinical SOAP Documentation
            </h3>

            <div className="space-y-4 mt-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  S — Subjective (Patient Chief Complaints, History & Onset)
                </label>
                <textarea
                  rows="2"
                  value={soapNotes.subjective}
                  onChange={(e) => setSoapNotes({ ...soapNotes, subjective: e.target.value })}
                  className="w-full border border-slate-300 rounded p-2.5 focus:ring-2 focus:ring-brand-500 font-sans"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  O — Objective (Physical Examination, Auscultation, Clinical Signs)
                </label>
                <textarea
                  rows="2"
                  value={soapNotes.objective}
                  onChange={(e) => setSoapNotes({ ...soapNotes, objective: e.target.value })}
                  className="w-full border border-slate-300 rounded p-2.5 focus:ring-2 focus:ring-brand-500 font-sans"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  A — Assessment (Provisional / Working Clinical Diagnosis)
                </label>
                <textarea
                  rows="2"
                  value={soapNotes.assessment}
                  onChange={(e) => setSoapNotes({ ...soapNotes, assessment: e.target.value })}
                  className="w-full border border-slate-300 rounded p-2.5 focus:ring-2 focus:ring-brand-500 font-sans font-semibold text-brand-900"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  P — Plan (Investigations, Therapeutic Interventions, Lifestyle)
                </label>
                <textarea
                  rows="3"
                  value={soapNotes.plan}
                  onChange={(e) => setSoapNotes({ ...soapNotes, plan: e.target.value })}
                  className="w-full border border-slate-300 rounded p-2.5 focus:ring-2 focus:ring-brand-500 font-sans"
                />
              </div>
            </div>
          </div>

          {/* E-Prescription Card */}
          <div className="clinic-card p-6">
            <h3 className="text-base font-bold text-slate-900 font-heading pb-3 border-b border-slate-200 flex items-center">
              <Pill className="w-4 h-4 mr-2 text-teal-600" />
              Digital E-Prescription (Rx)
            </h3>

            {/* Prescribed Items Table */}
            <div className="mt-4 space-y-2">
              {medicines.map((m, idx) => (
                <div key={idx} className="p-3 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between text-xs">
                  <div>
                    <strong className="text-slate-900 font-bold block">{m.name}</strong>
                    <span className="text-slate-600">{m.dosage} &bull; Duration: {m.duration}</span>
                  </div>
                  <button
                    onClick={() => handleRemoveMed(idx)}
                    className="text-slate-400 hover:text-rose-600 p-1"
                    title="Remove"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            {/* Add Medicine Mini-Form */}
            <form onSubmit={handleAddMed} className="mt-4 p-3 bg-slate-100 rounded-lg grid grid-cols-1 sm:grid-cols-4 gap-2 text-xs">
              <input 
                type="text" 
                placeholder="Medicine Name & Strength" 
                value={newMed.name}
                onChange={(e) => setNewMed({ ...newMed, name: e.target.value })}
                className="border border-slate-300 rounded p-1.5 sm:col-span-2"
              />
              <input 
                type="text" 
                placeholder="Dosage / Frequency" 
                value={newMed.dosage}
                onChange={(e) => setNewMed({ ...newMed, dosage: e.target.value })}
                className="border border-slate-300 rounded p-1.5"
              />
              <div className="flex space-x-1">
                <input 
                  type="text" 
                  placeholder="Duration" 
                  value={newMed.duration}
                  onChange={(e) => setNewMed({ ...newMed, duration: e.target.value })}
                  className="border border-slate-300 rounded p-1.5 w-full"
                />
                <button
                  type="submit"
                  className="px-3 bg-teal-600 hover:bg-teal-700 text-white rounded font-bold"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </form>

            {/* Action Bar */}
            <div className="mt-6 pt-4 border-t border-slate-200 flex items-center justify-end space-x-3">
              <button
                onClick={handleSaveConsultation}
                className="px-5 py-2.5 bg-brand-700 hover:bg-brand-800 text-white font-bold text-xs rounded-lg shadow-sm transition flex items-center"
              >
                <Save className="w-4 h-4 mr-1.5" />
                Commit SOAP & Finalize Consultation
              </button>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
