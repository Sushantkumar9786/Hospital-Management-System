import React, { useState } from 'react';
import { 
  Volume2, 
  Tv, 
  Clock, 
  ArrowRight, 
  Users, 
  CheckCircle, 
  Play, 
  Maximize2,
  Minimize2,
  Stethoscope,
  Sparkles
} from 'lucide-react';
import { QUEUE_ROOMS, UPCOMING_TOKENS } from '../data/mockData';

export default function QueueTV() {
  const [rooms, setRooms] = useState(QUEUE_ROOMS);
  const [upcoming, setUpcoming] = useState(UPCOMING_TOKENS);
  const [lastAnnounced, setLastAnnounced] = useState('T-042 (General Medicine - Room OPD-101)');
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Play realistic hospital two-tone chime via Web Audio API
  const playHospitalChime = () => {
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      
      const osc1 = audioCtx.createOscillator();
      const osc2 = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc1.type = 'sine';
      osc2.type = 'sine';

      // Chime Tone 1: 587.33 Hz (D5) -> Chime Tone 2: 880 Hz (A5)
      osc1.frequency.setValueAtTime(587.33, audioCtx.currentTime);
      osc2.frequency.setValueAtTime(880.00, audioCtx.currentTime + 0.3);

      gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.8);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(audioCtx.destination);

      osc1.start(audioCtx.currentTime);
      osc1.stop(audioCtx.currentTime + 0.3);

      osc2.start(audioCtx.currentTime + 0.3);
      osc2.stop(audioCtx.currentTime + 0.8);
    } catch (err) {
      console.log('Audio Context error:', err);
    }
  };

  // Speak announcement using Browser SpeechSynthesis
  const speakAnnouncement = (text) => {
    if ('speechSynthesis' in window && soundEnabled) {
      playHospitalChime();
      setTimeout(() => {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.95;
        utterance.pitch = 1.0;
        window.speechSynthesis.speak(utterance);
      }, 500);
    } else {
      playHospitalChime();
    }
  };

  // Call next patient for room
  const handleCallNext = (roomNumber) => {
    if (upcoming.length === 0) return;

    const nextPatient = upcoming[0];
    const newUpcoming = upcoming.slice(1);

    setRooms(prevRooms => prevRooms.map(rm => {
      if (rm.roomNumber === roomNumber) {
        return {
          ...rm,
          currentToken: nextPatient.token,
          currentPatient: nextPatient.patient,
          status: 'Calling Now...',
          waitingCount: Math.max(0, rm.waitingCount - 1)
        };
      }
      return rm;
    }));

    setUpcoming(newUpcoming);
    const announceMsg = `Token ${nextPatient.token}, ${nextPatient.patient}, please proceed to room ${roomNumber}`;
    setLastAnnounced(`${nextPatient.token} - ${nextPatient.patient} (${roomNumber})`);
    speakAnnouncement(announceMsg);
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner & TV Audio Control */}
      <div className="bg-slate-900 text-white p-5 rounded-xl shadow-lg border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="w-3 h-3 rounded-full bg-rose-500 animate-ping"></span>
            <span className="text-xs uppercase tracking-widest font-mono text-sky-400 font-bold">
              Queue TV &bull; Outpatient Department Live Monitor
            </span>
          </div>
          <h2 className="text-2xl font-bold font-heading mt-1 flex items-center">
            <Tv className="w-6 h-6 mr-2 text-sky-400" />
            CarePlus Waiting Room Broadcast Display
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Real-time acoustic token calling and consultation room allocation
          </p>
        </div>

        <div className="flex items-center space-x-3 w-full md:w-auto">
          {/* Toggle Chime */}
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`px-3 py-2 rounded-lg text-xs font-semibold flex items-center transition ${
              soundEnabled ? 'bg-sky-600 text-white' : 'bg-slate-800 text-slate-400'
            }`}
          >
            <Volume2 className="w-4 h-4 mr-1.5" />
            {soundEnabled ? 'Audio Chime: Enabled' : 'Audio Muted'}
          </button>

          {/* Test Sound */}
          <button
            onClick={() => {
              playHospitalChime();
              speakAnnouncement("CarePlus Outpatient queue system test chime");
            }}
            className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-semibold flex items-center transition border border-slate-700"
          >
            <Play className="w-3.5 h-3.5 mr-1 text-sky-400" />
            Test Hospital Chime
          </button>
        </div>
      </div>

      {/* Live Now Audio Broadcast Bar */}
      <div className="bg-sky-50 border border-sky-200 p-4 rounded-xl flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-full bg-sky-600 text-white flex items-center justify-center font-bold">
            <Volume2 className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-sky-700">
              Active Call Announcement
            </span>
            <p className="text-sm font-bold text-slate-900 mt-0.5">
              {lastAnnounced}
            </p>
          </div>
        </div>
        <span className="hidden sm:inline-block text-xs font-mono bg-sky-100 text-sky-800 px-2.5 py-1 rounded-full font-semibold">
          High-Fidelity Audio Active
        </span>
      </div>

      {/* Main Waiting Room TV Display Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {rooms.map((room) => (
          <div 
            key={room.roomNumber}
            className="clinic-card overflow-hidden border-2 border-slate-200 hover:border-brand-600 transition"
          >
            {/* Room Header */}
            <div className="bg-slate-900 text-white p-3.5 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-mono text-sky-400 uppercase tracking-widest font-bold">
                  {room.roomNumber}
                </span>
                <h4 className="text-sm font-bold text-slate-100">{room.department}</h4>
              </div>
              <span className="px-2 py-0.5 text-[10px] font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded">
                Live
              </span>
            </div>

            {/* Doctor Info */}
            <div className="p-4 bg-slate-50 border-b border-slate-100">
              <p className="text-xs text-slate-500 font-medium">Consulting Physician</p>
              <p className="text-xs font-bold text-slate-800 mt-0.5 flex items-center">
                <Stethoscope className="w-3.5 h-3.5 mr-1 text-teal-600" />
                {room.doctorName}
              </p>
            </div>

            {/* Giant Token Display */}
            <div className="p-6 text-center bg-white">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                Serving Token
              </span>
              <div className="text-5xl font-black font-heading text-brand-900 tracking-tight my-2">
                {room.currentToken}
              </div>
              <p className="text-xs font-semibold text-slate-700 truncate">
                {room.currentPatient}
              </p>
            </div>

            {/* Action Bar */}
            <div className="p-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
              <span className="text-xs text-slate-500">
                Waiting: <strong className="text-slate-800">{room.waitingCount}</strong>
              </span>
              <button
                onClick={() => handleCallNext(room.roomNumber)}
                className="px-3 py-1.5 bg-brand-700 hover:bg-brand-800 text-white text-xs font-bold rounded shadow-sm transition flex items-center"
              >
                <Volume2 className="w-3.5 h-3.5 mr-1" />
                Call Next Token
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Upcoming Queue Table */}
      <div className="clinic-card p-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-200">
          <div>
            <h3 className="text-base font-bold text-slate-900 font-heading flex items-center">
              <Users className="w-5 h-5 mr-2 text-brand-700" />
              Next In Queue (Estimated Waiting Sequence)
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Automated smart scheduling based on triage severity and appointment reservation
            </p>
          </div>
          <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-3 py-1 rounded-full">
            {upcoming.length} Patients in Line
          </span>
        </div>

        <div className="overflow-x-auto mt-4">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50 text-slate-600 uppercase tracking-wider font-semibold border-b border-slate-200">
                <th className="py-2.5 px-4">Token #</th>
                <th className="py-2.5 px-4">Patient Name</th>
                <th className="py-2.5 px-4">Allocated Room</th>
                <th className="py-2.5 px-4">Department</th>
                <th className="py-2.5 px-4">Est. Wait Time</th>
                <th className="py-2.5 px-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {upcoming.map((item, idx) => (
                <tr key={item.token} className="hover:bg-slate-50/70">
                  <td className="py-3 px-4 font-mono font-bold text-brand-800 text-sm">
                    {item.token}
                  </td>
                  <td className="py-3 px-4 font-semibold text-slate-800">
                    {item.patient}
                  </td>
                  <td className="py-3 px-4 font-mono text-slate-600 font-medium">
                    {item.room}
                  </td>
                  <td className="py-3 px-4 text-slate-600">
                    {item.department}
                  </td>
                  <td className="py-3 px-4 text-slate-600 flex items-center">
                    <Clock className="w-3.5 h-3.5 mr-1 text-slate-400" />
                    {item.estWait}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-50 text-amber-800 border border-amber-200">
                      Position #{idx + 1}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
