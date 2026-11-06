import React, { useState, useEffect, useRef } from 'react';
import { 
  Video, 
  VideoOff, 
  Mic, 
  MicOff, 
  PhoneOff, 
  Activity, 
  ShieldAlert, 
  Heart, 
  Clock, 
  PhoneCall, 
  MessageSquare, 
  Send, 
  AlertTriangle, 
  UserCheck, 
  Stethoscope, 
  Maximize2,
  Minimize2,
  Volume2
} from 'lucide-react';

export default function EmergencyVideoCallModal({ isOpen, onClose, appointment, currentUser, onTriggerAmbulance }) {
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [connectionStatus, setConnectionStatus] = useState('connecting'); // connecting, connected, ended
  const [chatMessages, setChatMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [showChat, setShowChat] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [ambulanceDispatched, setAmbulanceDispatched] = useState(false);

  const localVideoRef = useRef(null);
  const localStreamRef = useRef(null);

  const doctorName = appointment?.doctorName || 'Dr. Vivek Kulkarni, MD';
  const specialty = appointment?.department || 'Emergency General Medicine';
  const patientName = currentUser?.fullName || 'Rahul Narayan Patil';

  // Call timer
  useEffect(() => {
    let timer;
    if (isOpen && connectionStatus === 'connected') {
      timer = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isOpen, connectionStatus]);

  // Handle local camera stream
  useEffect(() => {
    if (!isOpen) return;

    setConnectionStatus('connecting');
    setCallDuration(0);
    setAmbulanceDispatched(false);

    // Initial doctor greeting message
    setChatMessages([
      {
        sender: 'doctor',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        text: `Hello ${patientName}. I received your emergency alert. Please remain calm, I am reviewing your vitals telemetry right now. Describe what you are experiencing.`
      }
    ]);

    // Request camera access or fallback gracefully
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then(stream => {
          localStreamRef.current = stream;
          if (localVideoRef.current) {
            localVideoRef.current.srcObject = stream;
          }
        })
        .catch(err => {
          console.warn('Camera access not available or denied:', err);
        });
    }

    // Connect call after short realistic handshake
    const handshakeTimer = setTimeout(() => {
      setConnectionStatus('connected');
    }, 1800);

    return () => {
      clearTimeout(handshakeTimer);
      if (localStreamRef.current) {
        localStreamRef.current.getTracks().forEach(track => track.stop());
        localStreamRef.current = null;
      }
    };
  }, [isOpen, patientName]);

  // Handle toggles
  const toggleMute = () => {
    if (localStreamRef.current) {
      localStreamRef.current.getAudioTracks().forEach(track => {
        track.enabled = !track.enabled;
      });
    }
    setIsMuted(!isMuted);
  };

  const toggleVideo = () => {
    if (localStreamRef.current) {
      localStreamRef.current.getVideoTracks().forEach(track => {
        track.enabled = !track.enabled;
      });
    }
    setIsVideoOff(!isVideoOff);
  };

  const handleEndCall = () => {
    setConnectionStatus('ended');
    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach(track => track.stop());
      localStreamRef.current = null;
    }
    setTimeout(() => {
      onClose();
    }, 600);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMsg = {
      sender: 'patient',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: inputMessage.trim()
    };
    setChatMessages(prev => [...prev, userMsg]);
    setInputMessage('');

    // Simulated doctor clinical response
    setTimeout(() => {
      setChatMessages(prev => [
        ...prev,
        {
          sender: 'doctor',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          text: 'Understood. Please keep sitting comfortably and do not exert yourself. If your symptoms worsen, I will authorize immediate 108 ALS ambulance dispatch.'
        }
      ]);
    }, 2000);
  };

  const handleDispatchAmbulance = () => {
    setAmbulanceDispatched(true);
    setChatMessages(prev => [
      ...prev,
      {
        sender: 'system',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        text: '🚨 EMERGENCY 108 DISPATCH SIGNAL TRANSMITTED: Advanced Life Support (ALS) Ambulance dispatched with telemetry tracking.'
      }
    ]);
    if (onTriggerAmbulance) {
      onTriggerAmbulance();
    }
  };

  const formatDuration = (secs) => {
    const mins = Math.floor(secs / 60);
    const rem = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${rem.toString().padStart(2, '0')}`;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 animate-in fade-in duration-200">
      <div className={`bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-white w-full transition-all duration-300 ${
        isFullscreen ? 'w-full h-full rounded-none' : 'max-w-4xl max-h-[92vh] h-[680px]'
      }`}>
        
        {/* Header Bar */}
        <div className="bg-slate-950 px-4 py-3 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500"></span>
            </span>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs uppercase tracking-wider font-bold text-rose-400 font-mono">
                  Emergency Tele-Consultation Channel
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] bg-slate-800 text-slate-300 border border-slate-700">
                  AES-256 Encrypted
                </span>
              </div>
              <h3 className="text-sm font-bold text-slate-100 flex items-center mt-0.5">
                <Stethoscope className="w-4 h-4 mr-1.5 text-teal-400" />
                {doctorName} &bull; <span className="text-slate-400 font-normal text-xs ml-1">{specialty}</span>
              </h3>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="bg-slate-800/80 px-3 py-1 rounded-lg text-xs font-mono text-emerald-400 border border-slate-700 flex items-center space-x-1.5">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>{connectionStatus === 'connected' ? formatDuration(callDuration) : 'CONNECTING...'}</span>
            </div>

            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
              title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Main Consultation Room Body */}
        <div className="flex-1 relative flex flex-col md:flex-row overflow-hidden bg-slate-950">
          
          {/* Main Video View (Doctor Video Stream) */}
          <div className="flex-1 relative bg-slate-900 flex items-center justify-center overflow-hidden">
            
            {/* Connecting State */}
            {connectionStatus === 'connecting' && (
              <div className="text-center p-8 space-y-3 z-10">
                <div className="w-16 h-16 rounded-full bg-teal-500/10 border border-teal-500/30 flex items-center justify-center mx-auto text-teal-400 animate-pulse">
                  <Stethoscope className="w-8 h-8" />
                </div>
                <h4 className="text-base font-bold text-slate-200">Connecting to {doctorName}...</h4>
                <p className="text-xs text-slate-400 max-w-sm">
                  Establishing direct clinical WebRTC stream with hospital workstation. Transmitting current triage vitals.
                </p>
                <div className="flex items-center justify-center space-x-1 pt-2">
                  <div className="w-2 h-2 rounded-full bg-teal-400 animate-bounce"></div>
                  <div className="w-2 h-2 rounded-full bg-teal-400 animate-bounce [animation-delay:0.2s]"></div>
                  <div className="w-2 h-2 rounded-full bg-teal-400 animate-bounce [animation-delay:0.4s]"></div>
                </div>
              </div>
            )}

            {/* Connected State: Simulated Doctor Stream */}
            {connectionStatus === 'connected' && (
              <div className="w-full h-full relative flex items-center justify-center bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
                {/* Doctor Avatar / Video Presentation */}
                <div className="relative text-center p-6 space-y-4 max-w-md">
                  <div className="relative mx-auto w-32 h-32 sm:w-40 sm:h-40 rounded-full border-4 border-teal-500/40 shadow-2xl overflow-hidden bg-slate-800 flex items-center justify-center">
                    <div className="w-full h-full bg-gradient-to-tr from-teal-900/60 to-slate-800 flex items-center justify-center text-teal-300">
                      <Stethoscope className="w-20 h-20 text-teal-400/90" />
                    </div>
                    {/* Live indicator dot */}
                    <span className="absolute bottom-2 right-4 w-4 h-4 rounded-full bg-emerald-500 ring-4 ring-slate-900 animate-pulse"></span>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-white tracking-wide font-heading">
                      {doctorName}
                    </h3>
                    <p className="text-xs text-teal-400 font-semibold">{specialty} &bull; On Duty</p>
                    <p className="text-[11px] text-slate-400 mt-1">CarePlus Apex Tertiary Hospital &bull; OPD Station 101</p>
                  </div>

                  {/* Audio Waveform Animation Indicator */}
                  <div className="flex items-center justify-center space-x-1.5 h-6">
                    <span className="w-1 bg-teal-400 rounded-full animate-[pulse_0.8s_ease-in-out_infinite] h-3"></span>
                    <span className="w-1 bg-teal-400 rounded-full animate-[pulse_0.6s_ease-in-out_infinite] h-5"></span>
                    <span className="w-1 bg-teal-400 rounded-full animate-[pulse_1.0s_ease-in-out_infinite] h-2"></span>
                    <span className="w-1 bg-teal-400 rounded-full animate-[pulse_0.7s_ease-in-out_infinite] h-6"></span>
                    <span className="w-1 bg-teal-400 rounded-full animate-[pulse_0.9s_ease-in-out_infinite] h-4"></span>
                  </div>
                </div>

                {/* Patient's Live Camera Feed (Picture-in-Picture) */}
                <div className="absolute top-4 right-4 w-36 h-28 sm:w-48 sm:h-36 bg-slate-950 rounded-xl overflow-hidden border-2 border-slate-700 shadow-2xl z-20">
                  {!isVideoOff ? (
                    <video
                      ref={localVideoRef}
                      autoPlay
                      playsInline
                      muted
                      className="w-full h-full object-cover mirror"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-slate-900 text-slate-500 text-xs">
                      <VideoOff className="w-6 h-6 mb-1" />
                      <span>Camera Off</span>
                    </div>
                  )}
                  <div className="absolute bottom-1 left-2 right-2 flex items-center justify-between text-[10px] bg-slate-900/80 px-1.5 py-0.5 rounded backdrop-blur-sm">
                    <span className="truncate">{patientName} (You)</span>
                    {isMuted && <MicOff className="w-3 h-3 text-rose-400 flex-shrink-0" />}
                  </div>
                </div>

                {/* Patient Live Vitals HUD Telemetry Overlay */}
                <div className="absolute top-4 left-4 z-20 bg-slate-950/85 backdrop-blur-md border border-slate-700/80 rounded-xl p-3 max-w-xs space-y-2 shadow-xl">
                  <div className="flex items-center justify-between pb-1.5 border-b border-slate-800 text-[11px]">
                    <span className="font-bold text-sky-400 flex items-center">
                      <Activity className="w-3.5 h-3.5 mr-1" /> Live Triage Vitals
                    </span>
                    <span className="text-[10px] font-mono text-emerald-400 animate-pulse">● STREAMING</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="bg-slate-900/80 p-1.5 rounded border border-slate-800">
                      <span className="text-[10px] text-slate-400 block">Heart Rate</span>
                      <span className="font-mono font-bold text-rose-400 flex items-center">
                        <Heart className="w-3 h-3 mr-1 animate-ping text-rose-500" />
                        84 bpm
                      </span>
                    </div>
                    <div className="bg-slate-900/80 p-1.5 rounded border border-slate-800">
                      <span className="text-[10px] text-slate-400 block">SpO2 Oxygen</span>
                      <span className="font-mono font-bold text-emerald-400">98%</span>
                    </div>
                    <div className="bg-slate-900/80 p-1.5 rounded border border-slate-800">
                      <span className="text-[10px] text-slate-400 block">Blood Pressure</span>
                      <span className="font-mono font-bold text-amber-400">126/82 mmHg</span>
                    </div>
                    <div className="bg-slate-900/80 p-1.5 rounded border border-slate-800">
                      <span className="text-[10px] text-slate-400 block">Triage Priority</span>
                      <span className="font-mono font-bold text-rose-400">PRIORITY-1</span>
                    </div>
                  </div>
                </div>

                {/* Ambulance Dispatched Banner if triggered */}
                {ambulanceDispatched && (
                  <div className="absolute bottom-20 left-4 right-4 z-20 bg-rose-950/90 border border-rose-600 rounded-xl p-3 text-xs text-rose-200 flex items-center justify-between shadow-2xl animate-bounce">
                    <div className="flex items-center space-x-2">
                      <PhoneCall className="w-4 h-4 text-rose-400 animate-pulse" />
                      <span><strong>108 ALS Ambulance Dispatched:</strong> GPS Tracking Active &bull; ETA 7 mins</span>
                    </div>
                    <span className="font-mono text-[10px] bg-rose-900 px-2 py-0.5 rounded text-white font-bold">
                      ALS-UNIT-108
                    </span>
                  </div>
                )}

              </div>
            )}

          </div>

          {/* Collapsible Chat / Notes Panel */}
          {showChat && (
            <div className="w-full md:w-80 bg-slate-900 border-l border-slate-800 flex flex-col h-64 md:h-auto z-20">
              <div className="p-3 border-b border-slate-800 flex items-center justify-between text-xs font-bold text-slate-200">
                <span className="flex items-center">
                  <MessageSquare className="w-3.5 h-3.5 mr-1.5 text-teal-400" />
                  Clinical Consultation Notes
                </span>
                <button onClick={() => setShowChat(false)} className="text-slate-400 hover:text-white">✕</button>
              </div>

              <div className="flex-1 p-3 overflow-y-auto space-y-2 text-xs">
                {chatMessages.map((msg, i) => (
                  <div key={i} className={`p-2.5 rounded-xl ${
                    msg.sender === 'patient' 
                      ? 'bg-sky-600 text-white ml-4' 
                      : msg.sender === 'system'
                      ? 'bg-rose-950/80 border border-rose-700/80 text-rose-200'
                      : 'bg-slate-800 text-slate-200 mr-4 border border-slate-700'
                  }`}>
                    <div className="flex items-center justify-between text-[10px] opacity-75 mb-1">
                      <span>{msg.sender === 'patient' ? 'You' : msg.sender === 'system' ? 'Hospital System' : doctorName}</span>
                      <span>{msg.time}</span>
                    </div>
                    <div>{msg.text}</div>
                  </div>
                ))}
              </div>

              <form onSubmit={handleSendMessage} className="p-2 border-t border-slate-800 flex items-center space-x-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Type symptoms to doctor..."
                  className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-teal-500"
                />
                <button
                  type="submit"
                  className="p-1.5 rounded-lg bg-teal-600 hover:bg-teal-500 text-white transition"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>
          )}

        </div>

        {/* Footer Call Controls Bar */}
        <div className="bg-slate-950 px-4 py-3 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
          
          <div className="flex items-center space-x-2">
            <button
              onClick={toggleMute}
              className={`p-3 rounded-xl transition ${
                isMuted ? 'bg-rose-600 hover:bg-rose-700 text-white' : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
              }`}
              title={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </button>

            <button
              onClick={toggleVideo}
              className={`p-3 rounded-xl transition ${
                isVideoOff ? 'bg-rose-600 hover:bg-rose-700 text-white' : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
              }`}
              title={isVideoOff ? 'Turn Video On' : 'Turn Video Off'}
            >
              {isVideoOff ? <VideoOff className="w-4 h-4" /> : <Video className="w-4 h-4" />}
            </button>

            <button
              onClick={() => setShowChat(!showChat)}
              className={`p-3 rounded-xl transition ${
                showChat ? 'bg-teal-600 text-white' : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
              }`}
              title="Toggle Consultation Notes & Chat"
            >
              <MessageSquare className="w-4 h-4" />
            </button>
          </div>

          {/* Emergency Ambulance Dispatch Button */}
          <button
            onClick={handleDispatchAmbulance}
            disabled={ambulanceDispatched}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center space-x-2 transition shadow-lg ${
              ambulanceDispatched 
                ? 'bg-rose-950 text-rose-300 border border-rose-700 cursor-not-allowed' 
                : 'bg-rose-600 hover:bg-rose-700 text-white animate-pulse'
            }`}
          >
            <PhoneCall className="w-4 h-4" />
            <span>{ambulanceDispatched ? 'Ambulance En Route' : 'Trigger 108 Emergency Ambulance'}</span>
          </button>

          {/* Red End Call Button */}
          <button
            onClick={handleEndCall}
            className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs flex items-center space-x-2 transition shadow-lg"
          >
            <PhoneOff className="w-4 h-4" />
            <span>End Emergency Call</span>
          </button>

        </div>

      </div>
    </div>
  );
}

