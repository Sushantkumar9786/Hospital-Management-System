import React, { useState } from 'react';
import { 
  PhoneCall, 
  MapPin, 
  ShieldAlert, 
  AlertTriangle, 
  CheckCircle2, 
  Activity, 
  Truck
} from 'lucide-react';

export default function SOSModal({ isOpen, onClose }) {
  const [emergencyType, setEmergencyType] = useState('Acute Cardiac / Chest Pain');
  const [location, setLocation] = useState('Central Zone, Block 4, Near Sector Market');
  const [vitalsSummary, setVitalsSummary] = useState('Severe shortness of breath, diaphoretic');
  const [dispatchStatus, setDispatchStatus] = useState('ready'); // ready, transmitting, dispatched

  if (!isOpen) return null;

  const handleTriggerDispatch = (e) => {
    e.preventDefault();
    setDispatchStatus('transmitting');

    setTimeout(() => {
      setDispatchStatus('dispatched');
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full p-6 border-2 border-rose-500">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-200">
          <div className="flex items-center space-x-2">
            <div className="w-9 h-9 rounded-lg bg-rose-100 flex items-center justify-center text-rose-700">
              <PhoneCall className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h3 className="text-base font-bold text-rose-950 font-heading">
                Emergency 108 Ambulance Dispatch Gateway
              </h3>
              <p className="text-[11px] text-slate-500">
                Direct integration with State Emergency Response Grid
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

        {dispatchStatus === 'dispatched' ? (
          <div className="py-6 text-center space-y-3">
            <div className="w-14 h-14 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
              <Truck className="w-8 h-8 animate-bounce" />
            </div>
            <h4 className="text-lg font-bold text-rose-900 font-heading">
              Ambulance Dispatched! (Unit 108-MH-42)
            </h4>
            <p className="text-xs text-slate-700 max-w-sm mx-auto">
              Advanced Life Support (ALS) vehicle en route. ETA: <strong>7 Minutes</strong>. Receiving hospital ICU has been placed on trauma standby.
            </p>
            <div className="p-3 bg-slate-100 rounded-lg text-xs font-mono text-slate-700">
              Dispatch Token: <strong>SOS-2026-99214</strong> &bull; GPS Track: 19.9975° N, 73.7898° E
            </div>
            <button
              onClick={onClose}
              className="mt-2 px-6 py-2 bg-slate-800 text-white rounded-lg text-xs font-bold"
            >
              Close Dispatch Window
            </button>
          </div>
        ) : (
          <form onSubmit={handleTriggerDispatch} className="mt-4 space-y-4 text-xs">
            <div className="bg-rose-50 border border-rose-200 p-3 rounded-lg text-rose-800 text-xs flex items-start space-x-2">
              <AlertTriangle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
              <span>
                <strong>Warning:</strong> For immediate, life-threatening clinical emergencies only. Dispatches GPS telematics to nearest ALS ambulance unit.
              </span>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Emergency Category</label>
              <select
                value={emergencyType}
                onChange={(e) => setEmergencyType(e.target.value)}
                className="w-full border border-slate-300 rounded-lg p-2 font-bold text-slate-800"
              >
                <option value="Acute Cardiac / Chest Pain">Acute Cardiac / Chest Pain / STEMI</option>
                <option value="Severe Polytrauma / Road Traffic Injury">Severe Polytrauma / Road Traffic Injury</option>
                <option value="Stroke / Acute Neurological Deficit">Stroke / Acute Neurological Deficit</option>
                <option value="Obstetric Emergency / Active Labor">Obstetric Emergency / High-Risk Labor</option>
                <option value="Acute Respiratory Failure">Acute Respiratory Failure</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Incident Location / Coordinates</label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-slate-400 absolute left-2.5 top-2.5" />
                <input
                  type="text"
                  required
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full border border-slate-300 rounded-lg pl-8 pr-3 py-2 font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Presenting Patient Vitals / Consciousness</label>
              <textarea
                rows="2"
                required
                value={vitalsSummary}
                onChange={(e) => setVitalsSummary(e.target.value)}
                className="w-full border border-slate-300 rounded-lg p-2 font-medium"
              />
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
                disabled={dispatchStatus === 'transmitting'}
                className="px-6 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-lg font-bold shadow-md transition disabled:opacity-50"
              >
                {dispatchStatus === 'transmitting' ? 'Broadcasting 108 Grid...' : 'Broadcast Immediate 108 SOS'}
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
}
