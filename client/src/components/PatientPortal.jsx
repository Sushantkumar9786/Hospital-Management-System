import React from 'react';
import { 
  User, 
  Heart, 
  Activity, 
  Calendar, 
  FileText, 
  Pill, 
  AlertCircle, 
  PhoneCall, 
  ShieldCheck, 
  QrCode,
  Download,
  PlusCircle,
  Clock
} from 'lucide-react';
import { PATIENT_RECORD_DEMO } from '../data/mockData';

export default function PatientPortal({ onOpenBooking, onOpenSOS, appointments }) {
  const patient = PATIENT_RECORD_DEMO;

  return (
    <div className="space-y-6">
      
      {/* Top Welcome & Digital Health ID Card */}
      <div className="bg-gradient-to-r from-brand-900 via-brand-800 to-sky-900 text-white rounded-2xl p-6 shadow-xl border border-brand-700">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          
          {/* Patient Details */}
          <div className="flex items-start space-x-4">
            <div className="w-16 h-16 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white text-2xl font-bold font-heading shadow-inner">
              RP
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs uppercase tracking-widest font-mono text-sky-300 font-semibold">
                  CarePlus Universal Patient ID
                </span>
                <span className="px-2 py-0.5 text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 rounded font-semibold">
                  Active & Verified
                </span>
              </div>
              <h2 className="text-2xl font-bold font-heading mt-0.5">
                {patient.name}
              </h2>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-200 mt-1">
                <span><strong>Age/Gender:</strong> {patient.age} Yrs &bull; {patient.gender}</span>
                <span><strong>Blood Group:</strong> {patient.bloodGroup}</span>
                <span><strong>Contact:</strong> {patient.phone}</span>
              </div>
            </div>
          </div>

          {/* Health ID Barcode Badge & Quick Actions */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <div className="bg-white/10 backdrop-blur-md p-3 rounded-xl border border-white/15 text-center">
              <span className="block text-[10px] text-sky-200 uppercase tracking-wider font-semibold">ABHA / CarePlus ID</span>
              <span className="text-sm font-mono font-bold tracking-widest text-white mt-0.5 block">
                {patient.healthId}
              </span>
              <div className="mt-1 h-3 w-32 mx-auto bg-white/20 rounded flex items-center justify-center text-[8px] font-mono">
                |||||| | |||| ||| ||||
              </div>
            </div>

            <div className="flex flex-col space-y-2">
              <button
                onClick={onOpenBooking}
                className="px-4 py-2 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs rounded-lg shadow-md transition flex items-center justify-center whitespace-nowrap"
              >
                <Calendar className="w-3.5 h-3.5 mr-1.5" />
                Book Doctor Slot
              </button>

              <button
                onClick={onOpenSOS}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs rounded-lg shadow-md transition flex items-center justify-center whitespace-nowrap"
              >
                <PhoneCall className="w-3.5 h-3.5 mr-1.5" />
                Emergency 108 SOS
              </button>
            </div>

          </div>

        </div>
      </div>

      {/* Vitals Summary Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        
        <div className="clinic-card p-4">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
            <span>Blood Pressure</span>
            <Activity className="w-4 h-4 text-rose-500" />
          </div>
          <div className="text-xl font-bold text-slate-900 font-heading mt-2">
            124 / 82 <span className="text-xs font-normal text-slate-500">mmHg</span>
          </div>
          <span className="text-[11px] text-emerald-600 font-semibold mt-1 block">Optimal Reading</span>
        </div>

        <div className="clinic-card p-4">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
            <span>Heart Rate</span>
            <Heart className="w-4 h-4 text-rose-600" />
          </div>
          <div className="text-xl font-bold text-slate-900 font-heading mt-2">
            74 <span className="text-xs font-normal text-slate-500">bpm</span>
          </div>
          <span className="text-[11px] text-emerald-600 font-semibold mt-1 block">Normal Sinus Rhythm</span>
        </div>

        <div className="clinic-card p-4">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
            <span>Oxygen Saturation</span>
            <Activity className="w-4 h-4 text-sky-500" />
          </div>
          <div className="text-xl font-bold text-slate-900 font-heading mt-2">
            99% <span className="text-xs font-normal text-slate-500">SpO2</span>
          </div>
          <span className="text-[11px] text-emerald-600 font-semibold mt-1 block">Room Air</span>
        </div>

        <div className="clinic-card p-4">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
            <span>Body Weight</span>
            <User className="w-4 h-4 text-indigo-500" />
          </div>
          <div className="text-xl font-bold text-slate-900 font-heading mt-2">
            72.0 <span className="text-xs font-normal text-slate-500">kg</span>
          </div>
          <span className="text-[11px] text-slate-500 font-semibold mt-1 block">BMI: 23.4 (Normal)</span>
        </div>

      </div>

      {/* Allergies & Clinical Alerts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="clinic-card p-4 border-l-4 border-l-rose-500">
          <div className="flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 text-rose-600" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-rose-900">
              Verified Drug Allergies (EMR Flag)
            </h4>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {patient.allergies.map(alg => (
              <span key={alg} className="px-2.5 py-1 bg-rose-50 text-rose-700 border border-rose-200 rounded-md text-xs font-semibold">
                {alg}
              </span>
            ))}
          </div>
        </div>

        <div className="clinic-card p-4 border-l-4 border-l-amber-500">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-4 h-4 text-amber-600" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900">
              Chronic Care Registry
            </h4>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {patient.chronicConditions.map(cc => (
              <span key={cc} className="px-2.5 py-1 bg-amber-50 text-amber-800 border border-amber-200 rounded-md text-xs font-semibold">
                {cc}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* My Appointments & Consultations */}
      <div className="clinic-card p-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-200">
          <div>
            <h3 className="text-base font-bold text-slate-900 font-heading flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-brand-700" />
              Scheduled Consultations & Booking Records
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Appointments protected by JPA row-level pessimistic write locking
            </p>
          </div>
          
          <button
            onClick={onOpenBooking}
            className="px-3.5 py-1.5 bg-brand-700 hover:bg-brand-800 text-white rounded-lg text-xs font-semibold shadow-sm flex items-center"
          >
            <PlusCircle className="w-3.5 h-3.5 mr-1" /> Book New Slot
          </button>
        </div>

        <div className="mt-4 space-y-3">
          {appointments && appointments.length > 0 ? (
            appointments.map(apt => (
              <div key={apt.id} className="p-4 rounded-lg border border-slate-200 bg-slate-50 flex items-center justify-between">
                <div>
                  <span className="text-xs font-mono font-bold text-brand-800 block">{apt.id}</span>
                  <h4 className="text-sm font-bold text-slate-900">{apt.doctorName}</h4>
                  <p className="text-xs text-slate-500">{apt.department} &bull; Reason: {apt.reason}</p>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-slate-800 block flex items-center justify-end">
                    <Clock className="w-3.5 h-3.5 mr-1 text-slate-400" /> {apt.date} at {apt.slotTime}
                  </span>
                  <span className="inline-block mt-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-100 text-emerald-800">
                    {apt.status}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-6 text-slate-400 text-xs">
              No appointments booked yet. Click "Book Doctor Slot" to reserve an appointment.
            </div>
          )}
        </div>
      </div>

      {/* Prescription & Medical History Timeline */}
      <div className="clinic-card p-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-200">
          <div>
            <h3 className="text-base font-bold text-slate-900 font-heading flex items-center">
              <FileText className="w-5 h-5 mr-2 text-brand-700" />
              Verified Electronic Medical Record (EMR) & Digital Prescriptions
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              FHIR R4 compatible clinical records with digital doctor signatures
            </p>
          </div>
        </div>

        <div className="space-y-4 mt-4">
          {patient.pastPrescriptions.map((rx) => (
            <div key={rx.id} className="border border-slate-200 rounded-lg p-4 bg-white">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div>
                  <span className="text-xs font-mono font-bold text-brand-800">{rx.id}</span>
                  <h4 className="text-sm font-bold text-slate-900 mt-0.5">{rx.diagnosis}</h4>
                  <p className="text-xs text-slate-500">{rx.doctor} &bull; {rx.specialty}</p>
                </div>
                <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-1 rounded">
                  {rx.date}
                </span>
              </div>

              <div className="mt-3">
                <span className="text-xs font-semibold text-slate-600 block mb-2">Prescribed Regimen:</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {rx.medicines.map((med, idx) => (
                    <div key={idx} className="bg-slate-50 p-2.5 rounded border border-slate-200 flex items-start space-x-2">
                      <Pill className="w-4 h-4 text-brand-600 mt-0.5 flex-shrink-0" />
                      <div className="text-xs">
                        <strong className="text-slate-900 block">{med.name}</strong>
                        <span className="text-slate-600">{med.dosage} ({med.duration})</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
