import React, { useState } from 'react';
import { 
  PhoneForwarded, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  PlusCircle, 
  Truck, 
  MapPin, 
  ShieldAlert, 
  ArrowRight,
  Filter,
  UserCheck
} from 'lucide-react';
import { REFERRAL_STAGES, INITIAL_REFERRALS } from '../data/mockData';

export default function ReferralBridge() {
  const [referrals, setReferrals] = useState(INITIAL_REFERRALS);
  const [filterUrgency, setFilterUrgency] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);

  // New referral form state
  const [newPatient, setNewPatient] = useState({
    patientName: '',
    age: '',
    gender: 'Male',
    healthId: 'CP-MH-' + Math.floor(100000 + Math.random() * 900000),
    fromFacility: 'CarePlus PHC Valley',
    toFacility: 'CarePlus Apex District Hospital',
    specialtyRequired: 'Cardiology (Interventional)',
    urgency: 'Emergency',
    clinicalNotes: '',
    transportVehicle: 'Ambulance 108 Dedicated Unit'
  });

  const handleAdvanceStage = (referralId) => {
    setReferrals(prev => prev.map(r => {
      if (r.id === referralId && r.stage < 7) {
        return {
          ...r,
          stage: r.stage + 1,
          timeElapsed: 'Updated just now'
        };
      }
      return r;
    }));
  };

  const handleCreateReferral = (e) => {
    e.preventDefault();
    if (!newPatient.patientName || !newPatient.clinicalNotes) return;

    const newRef = {
      id: 'REF-' + Math.floor(8850 + Math.random() * 1000),
      ...newPatient,
      age: parseInt(newPatient.age) || 45,
      stage: 1, // Initiated
      vitals: { bp: '130/84 mmHg', hr: '88 bpm', spo2: '98%', temp: '98.6 F' },
      timeElapsed: 'Just now',
      slaMinutesRemaining: newPatient.urgency === 'Emergency' ? 30 : 90
    };

    setReferrals([newRef, ...referrals]);
    setShowCreateModal(false);
    setNewPatient({
      patientName: '',
      age: '',
      gender: 'Male',
      healthId: 'CP-MH-' + Math.floor(100000 + Math.random() * 900000),
      fromFacility: 'CarePlus PHC Valley',
      toFacility: 'CarePlus Apex District Hospital',
      specialtyRequired: 'Cardiology (Interventional)',
      urgency: 'Emergency',
      clinicalNotes: '',
      transportVehicle: 'Ambulance 108 Dedicated Unit'
    });
  };

  const filtered = filterUrgency === 'all' 
    ? referrals 
    : referrals.filter(r => r.urgency.toLowerCase() === filterUrgency.toLowerCase());

  return (
    <div className="space-y-6">
      
      {/* Title & Controls Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h2 className="text-xl font-bold text-slate-900 font-heading flex items-center">
            <PhoneForwarded className="w-5 h-5 mr-2 text-rose-600" />
            CarePlus 7-Stage Inter-Facility Referral Bridge (Referral Setu)
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Standardized end-to-end patient transfer protocol with real-time transit telemetry, clinical SLA monitoring, and receiving facility bed reservations.
          </p>
        </div>

        <div className="flex items-center space-x-3 w-full sm:w-auto">
          {/* Filter */}
          <div className="flex items-center space-x-1.5 bg-white border border-slate-300 rounded-lg px-2.5 py-1.5">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={filterUrgency}
              onChange={(e) => setFilterUrgency(e.target.value)}
              className="text-xs font-medium text-slate-700 bg-transparent focus:outline-none"
            >
              <option value="all">All Urgencies</option>
              <option value="emergency">Emergency (Red)</option>
              <option value="urgent">Urgent (Yellow)</option>
              <option value="routine">Routine (Green)</option>
            </select>
          </div>

          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center px-3.5 py-2 text-xs font-semibold rounded-lg text-white bg-rose-600 hover:bg-rose-700 shadow-sm transition whitespace-nowrap"
          >
            <PlusCircle className="w-4 h-4 mr-1.5" />
            Initiate Clinical Transfer
          </button>
        </div>
      </div>

      {/* Referral Stage Explanation Pipeline Pill Strip */}
      <div className="bg-slate-900 text-white p-3.5 rounded-lg shadow-sm overflow-x-auto">
        <div className="flex items-center justify-between min-w-[700px] text-xs">
          {REFERRAL_STAGES.map((s, idx) => (
            <div key={s.id} className="flex items-center space-x-2">
              <span className="w-5 h-5 rounded-full bg-slate-800 text-sky-400 border border-sky-500/40 flex items-center justify-center font-bold text-[10px]">
                {s.id}
              </span>
              <span className="font-semibold text-slate-200">{s.name}</span>
              {idx < REFERRAL_STAGES.length - 1 && (
                <ArrowRight className="w-3 h-3 text-slate-600 ml-2" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Referrals Cards List */}
      <div className="space-y-4">
        {filtered.map((ref) => {
          const currentStageObj = REFERRAL_STAGES.find(s => s.id === ref.stage);
          const isEmergency = ref.urgency === 'Emergency';
          const isUrgent = ref.urgency === 'Urgent';

          return (
            <div 
              key={ref.id}
              className={`clinic-card p-5 border-l-4 ${
                isEmergency 
                  ? 'border-l-rose-600 bg-gradient-to-r from-rose-50/20 to-white' 
                  : isUrgent 
                  ? 'border-l-amber-500' 
                  : 'border-l-emerald-600'
              }`}
            >
              {/* Header Info */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
                <div className="flex items-center space-x-3">
                  <span className="font-mono text-xs font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                    {ref.id}
                  </span>
                  <h3 className="text-base font-bold text-slate-900">
                    {ref.patientName}
                  </h3>
                  <span className="text-xs text-slate-500 font-medium">
                    ({ref.gender}, {ref.age} yrs) &bull; Health ID: {ref.healthId}
                  </span>
                </div>

                <div className="flex items-center space-x-2">
                  <span className={`clinic-badge ${
                    isEmergency 
                      ? 'bg-rose-100 text-rose-800 border border-rose-300' 
                      : isUrgent 
                      ? 'bg-amber-100 text-amber-800 border border-amber-300' 
                      : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                  }`}>
                    {ref.urgency} Urgency
                  </span>

                  <span className="text-xs font-mono text-slate-600 bg-slate-100 px-2 py-0.5 rounded flex items-center">
                    <Clock className="w-3 h-3 mr-1 text-slate-400" />
                    SLA: {ref.slaMinutesRemaining}m remaining
                  </span>
                </div>
              </div>

              {/* Transit & Routing Details */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 py-3 text-xs">
                <div className="bg-slate-50 p-2.5 rounded border border-slate-200">
                  <span className="block text-[11px] text-slate-500 font-medium">Transfer Corridor</span>
                  <div className="mt-1 font-semibold text-slate-800 flex items-center">
                    <span className="text-slate-600">{ref.fromFacility}</span>
                    <ArrowRight className="w-3 h-3 mx-1.5 text-brand-600 flex-shrink-0" />
                    <span className="text-brand-900 font-bold">{ref.toFacility}</span>
                  </div>
                </div>

                <div className="bg-slate-50 p-2.5 rounded border border-slate-200">
                  <span className="block text-[11px] text-slate-500 font-medium">Specialty Required</span>
                  <p className="mt-1 font-bold text-slate-900">{ref.specialtyRequired}</p>
                  <p className="text-[11px] text-slate-500">Transport: {ref.transportVehicle}</p>
                </div>

                <div className="bg-slate-50 p-2.5 rounded border border-slate-200">
                  <span className="block text-[11px] text-slate-500 font-medium">Baseline Vitals</span>
                  <div className="mt-1 flex flex-wrap gap-2 font-mono text-[11px]">
                    <span className="bg-white px-1.5 py-0.5 rounded border border-slate-200">BP: {ref.vitals.bp}</span>
                    <span className="bg-white px-1.5 py-0.5 rounded border border-slate-200">HR: {ref.vitals.hr}</span>
                    <span className="bg-white px-1.5 py-0.5 rounded border border-slate-200">SpO2: {ref.vitals.spo2}</span>
                  </div>
                </div>
              </div>

              {/* Clinical Notes */}
              <div className="text-xs bg-sky-50/50 p-2.5 rounded border border-sky-100 text-slate-700">
                <strong className="text-slate-900 font-semibold">Triage Clinical Handover:</strong> {ref.clinicalNotes}
              </div>

              {/* 7-Stage Visual Interactive Progress Bar */}
              <div className="mt-4 pt-3 border-t border-slate-100">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-slate-700 flex items-center">
                    Current Stage: <span className="ml-1.5 text-brand-700 font-bold">Stage {ref.stage} of 7: {currentStageObj?.name}</span>
                  </span>
                  
                  {ref.stage < 7 ? (
                    <button
                      onClick={() => handleAdvanceStage(ref.id)}
                      className="px-3 py-1 bg-brand-700 hover:bg-brand-800 text-white rounded text-xs font-semibold transition flex items-center shadow-sm"
                    >
                      Advance to Next Stage <ArrowRight className="w-3 h-3 ml-1" />
                    </button>
                  ) : (
                    <span className="flex items-center text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded">
                      <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Handover Complete & Admitted
                    </span>
                  )}
                </div>

                {/* Step Indicators */}
                <div className="grid grid-cols-7 gap-1.5">
                  {REFERRAL_STAGES.map((stg) => {
                    const isDone = stg.id < ref.stage;
                    const isCurrent = stg.id === ref.stage;
                    return (
                      <div key={stg.id} className="text-center">
                        <div 
                          className={`h-2 rounded-full transition-all ${
                            isDone 
                              ? 'bg-emerald-600' 
                              : isCurrent 
                              ? 'bg-brand-600 ring-2 ring-brand-300' 
                              : 'bg-slate-200'
                          }`}
                        />
                        <span className={`block text-[10px] mt-1 truncate ${
                          isCurrent ? 'font-bold text-brand-900' : 'text-slate-400'
                        }`}>
                          {stg.id}. {stg.name}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          );
        })}
      </div>

      {/* Create Referral Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-xl w-full p-6 border border-slate-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <h3 className="text-base font-bold text-slate-900 font-heading flex items-center">
                <PlusCircle className="w-5 h-5 mr-2 text-rose-600" />
                Initiate New Inter-Facility Referral
              </h3>
              <button 
                onClick={() => setShowCreateModal(false)}
                className="text-slate-400 hover:text-slate-600 font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateReferral} className="mt-4 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Patient Name *</label>
                  <input 
                    type="text" 
                    required
                    value={newPatient.patientName}
                    onChange={(e) => setNewPatient({ ...newPatient, patientName: e.target.value })}
                    placeholder="e.g. Meenakshi Joshi"
                    className="w-full border border-slate-300 rounded px-2.5 py-1.5 focus:ring-2 focus:ring-brand-500"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Age & Gender</label>
                  <div className="flex space-x-2">
                    <input 
                      type="number" 
                      placeholder="Age"
                      value={newPatient.age}
                      onChange={(e) => setNewPatient({ ...newPatient, age: e.target.value })}
                      className="w-1/2 border border-slate-300 rounded px-2.5 py-1.5"
                    />
                    <select
                      value={newPatient.gender}
                      onChange={(e) => setNewPatient({ ...newPatient, gender: e.target.value })}
                      className="w-1/2 border border-slate-300 rounded px-2 py-1.5"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">From Facility (Origin)</label>
                  <select 
                    value={newPatient.fromFacility}
                    onChange={(e) => setNewPatient({ ...newPatient, fromFacility: e.target.value })}
                    className="w-full border border-slate-300 rounded px-2.5 py-1.5"
                  >
                    <option value="CarePlus PHC Valley">CarePlus PHC Valley</option>
                    <option value="CarePlus CHC East">CarePlus CHC East</option>
                    <option value="CarePlus Sub-District Center North">CarePlus Sub-District Center North</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">To Facility (Destination)</label>
                  <select 
                    value={newPatient.toFacility}
                    onChange={(e) => setNewPatient({ ...newPatient, toFacility: e.target.value })}
                    className="w-full border border-slate-300 rounded px-2.5 py-1.5"
                  >
                    <option value="CarePlus Apex District Hospital">CarePlus Apex District Hospital (Tertiary)</option>
                    <option value="CarePlus Sub-District Center North">CarePlus Sub-District Center North</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Clinical Specialty</label>
                  <select 
                    value={newPatient.specialtyRequired}
                    onChange={(e) => setNewPatient({ ...newPatient, specialtyRequired: e.target.value })}
                    className="w-full border border-slate-300 rounded px-2.5 py-1.5"
                  >
                    <option value="Cardiology (Interventional)">Cardiology (Interventional)</option>
                    <option value="High-Risk Obstetrics">High-Risk Obstetrics</option>
                    <option value="Orthopedic Trauma">Orthopedic Trauma</option>
                    <option value="Pediatric Pulmonology">Pediatric Pulmonology</option>
                    <option value="Neurology / Stroke">Neurology / Stroke</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Urgency Level</label>
                  <select 
                    value={newPatient.urgency}
                    onChange={(e) => setNewPatient({ ...newPatient, urgency: e.target.value })}
                    className="w-full border border-slate-300 rounded px-2.5 py-1.5 font-bold"
                  >
                    <option value="Emergency">Emergency (Immediate / Red)</option>
                    <option value="Urgent">Urgent (Within 2 Hours / Yellow)</option>
                    <option value="Routine">Routine (Within 24 Hours / Green)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Clinical Triage & Handover Notes *</label>
                <textarea 
                  rows="3"
                  required
                  value={newPatient.clinicalNotes}
                  onChange={(e) => setNewPatient({ ...newPatient, clinicalNotes: e.target.value })}
                  placeholder="Describe chief complaint, vitals at departure, interventions given, reason for transfer..."
                  className="w-full border border-slate-300 rounded px-2.5 py-1.5 focus:ring-2 focus:ring-brand-500"
                ></textarea>
              </div>

              <div className="flex items-center justify-end space-x-3 pt-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 border border-slate-300 rounded text-slate-700 hover:bg-slate-50 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded font-bold transition shadow-sm"
                >
                  Confirm & Broadcast Transfer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
