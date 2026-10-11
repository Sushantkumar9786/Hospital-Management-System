import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  Stethoscope, 
  User, 
  CheckCircle2, 
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { DOCTORS } from '../data/mockData';

export default function BookAppointmentModal({ isOpen, onClose, onBookSuccess }) {
  const [selectedDoctorId, setSelectedDoctorId] = useState(DOCTORS[0].id);
  const [selectedDate, setSelectedDate] = useState('2026-10-15');
  const [selectedSlot, setSelectedSlot] = useState(DOCTORS[0].availableSlots[0]);
  const [reason, setReason] = useState('Routine checkup & cardiovascular assessment');
  const [patientName, setPatientName] = useState('Rahul Narayan Patil');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  if (!isOpen) return null;

  const activeDoc = DOCTORS.find(d => d.id === selectedDoctorId) || DOCTORS[0];

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate Concurrency-safe backend call
    setTimeout(() => {
      const newApt = {
        id: 'APT-' + Math.floor(7000 + Math.random() * 1000),
        doctorName: activeDoc.name,
        department: activeDoc.specialty,
        date: selectedDate,
        slotTime: selectedSlot,
        reason: reason,
        status: 'CONFIRMED'
      };

      setIsSubmitting(false);
      setBookingSuccess(true);

      setTimeout(() => {
        onBookSuccess(newApt);
        setBookingSuccess(false);
        onClose();
      }, 1000);
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full p-6 border border-slate-200">
        
        <div className="flex items-center justify-between pb-3 border-b border-slate-200">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-brand-100 flex items-center justify-center text-brand-700">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 font-heading">
                Book Outpatient (OPD) Consultation
              </h3>
              <p className="text-[11px] text-slate-500">
                Pessimistic concurrency protected doctor reservation
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 font-bold"
          >
            ✕
          </button>
        </div>

        {bookingSuccess ? (
          <div className="py-8 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h4 className="text-base font-bold text-slate-900">
              Appointment Confirmed!
            </h4>
            <p className="text-xs text-slate-600">
              Row lock successfully committed. Your token has been generated.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-4 space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Select Consulting Specialist</label>
              <select
                value={selectedDoctorId}
                onChange={(e) => {
                  setSelectedDoctorId(e.target.value);
                  const doc = DOCTORS.find(d => d.id === e.target.value);
                  if (doc && doc.availableSlots.length > 0) {
                    setSelectedSlot(doc.availableSlots[0]);
                  }
                }}
                className="w-full border border-slate-300 rounded-lg p-2 focus:ring-2 focus:ring-brand-500 font-medium"
              >
                {DOCTORS.map(d => (
                  <option key={d.id} value={d.id}>
                    {d.name} — {d.specialty} ({d.experience} exp)
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Appointment Date</label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full border border-slate-300 rounded-lg p-2 focus:ring-2 focus:ring-brand-500 font-medium"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Select Time Slot</label>
                <select
                  value={selectedSlot}
                  onChange={(e) => setSelectedSlot(e.target.value)}
                  className="w-full border border-slate-300 rounded-lg p-2 focus:ring-2 focus:ring-brand-500 font-medium"
                >
                  {activeDoc.availableSlots.map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Patient Name</label>
              <input
                type="text"
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                className="w-full border border-slate-300 rounded-lg p-2 focus:ring-2 focus:ring-brand-500 font-medium"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Reason for Visit / Primary Symptoms</label>
              <textarea
                rows="2"
                required
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="e.g. Follow-up consultation, joint pain, chest tightness..."
                className="w-full border border-slate-300 rounded-lg p-2 focus:ring-2 focus:ring-brand-500"
              />
            </div>

            <div className="p-3 bg-sky-50 rounded-lg border border-sky-200 flex items-start space-x-2">
              <ShieldCheck className="w-4 h-4 text-sky-700 flex-shrink-0 mt-0.5" />
              <p className="text-[11px] text-sky-800">
                <strong>High Concurrency Protection:</strong> CarePlus backend uses Spring Data JPA pessimistic row write locks to prevent slot double-booking across simultaneous users.
              </p>
            </div>

            <div className="flex items-center justify-end space-x-3 pt-3 border-t border-slate-200">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-5 py-2 bg-brand-700 hover:bg-brand-800 text-white rounded-lg font-bold shadow-sm transition disabled:opacity-50"
              >
                {isSubmitting ? 'Reserving Slot...' : 'Confirm Appointment'}
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
}
