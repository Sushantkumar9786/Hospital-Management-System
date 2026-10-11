import React from 'react';
import { 
  Building2, 
  ShieldCheck, 
  PhoneCall, 
  Clock, 
  Bell, 
  UserCheck, 
  Stethoscope, 
  User, 
  ShieldAlert,
  ChevronDown
} from 'lucide-react';

export default function Header({ 
  currentRole, 
  setCurrentRole, 
  activeTab, 
  setActiveTab,
  onOpenSOS,
  onOpenBooking
}) {
  const [now, setNow] = React.useState(new Date());

  React.useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-sm">
      {/* Top Clinical Utility Strip */}
      <div className="bg-slate-900 text-slate-300 text-xs px-4 py-1.5 flex flex-wrap items-center justify-between border-b border-slate-800">
        <div className="flex items-center space-x-4">
          <span className="flex items-center text-emerald-400 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse mr-1.5"></span>
            CarePlus Regional Clinical Grid: Online & Encrypted (TLS 1.3)
          </span>
          <span className="hidden md:inline-block text-slate-400">|</span>
          <span className="hidden md:inline-block text-slate-300">
            Node: Apex District Central (Tier-3 Tertiary Hub)
          </span>
          <span className="hidden lg:inline-flex items-center text-sky-400">
            <ShieldCheck className="w-3.5 h-3.5 mr-1" />
            HIPAA / ABHA Compliant Data Gateway
          </span>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1.5 text-slate-200">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span className="font-mono">{now.toLocaleTimeString()} IST</span>
          </div>

          <button 
            onClick={onOpenSOS}
            className="flex items-center px-2 py-0.5 rounded bg-rose-600 hover:bg-rose-700 text-white font-medium transition shadow-sm"
            title="Immediate Emergency Ambulance Triage"
          >
            <PhoneCall className="w-3 h-3 mr-1" />
            Emergency 108 Dispatch
          </button>
        </div>
      </div>

      {/* Main Navigation & Branding Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Platform Title */}
          <div className="flex items-center space-x-3.5 cursor-pointer" onClick={() => setActiveTab('command')}>
            <img 
              src="/careplus_logo.png" 
              alt="CarePlus Logo" 
              className="h-14 w-auto object-contain drop-shadow-sm"
            />
            <div className="border-l border-slate-200 pl-3.5 hidden sm:block">
              <div className="flex items-center space-x-2">
                <span className="text-xl font-bold tracking-tight text-slate-900 font-heading">
                  Care<span className="text-sky-600">Plus</span>
                </span>
                <span className="px-2 py-0.5 text-[11px] font-semibold bg-sky-100 text-sky-800 rounded">
                  v3.2 Enterprise
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">
                Online Healthcare Management System (CMS & EMR)
              </p>
            </div>
          </div>

          {/* Role Switcher & Action Tools */}
          <div className="flex items-center space-x-3">
            
            {/* Quick Booking Button */}
            <button
              onClick={onOpenBooking}
              className="hidden md:inline-flex items-center px-3.5 py-2 text-xs font-semibold rounded-lg text-white bg-brand-700 hover:bg-brand-800 transition shadow-sm"
            >
              Book Appointment
            </button>

            {/* Role Switcher Selector */}
            <div className="flex items-center bg-slate-100 p-1 rounded-lg border border-slate-200">
              <span className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold px-2 hidden lg:inline">
                View As:
              </span>
              
              <button
                onClick={() => setCurrentRole('admin')}
                className={`flex items-center px-2.5 py-1.5 rounded-md text-xs font-medium transition ${
                  currentRole === 'admin'
                    ? 'bg-white text-slate-900 shadow-sm font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Building2 className="w-3.5 h-3.5 mr-1.5 text-blue-700" />
                Admin / DHO
              </button>

              <button
                onClick={() => setCurrentRole('doctor')}
                className={`flex items-center px-2.5 py-1.5 rounded-md text-xs font-medium transition ${
                  currentRole === 'doctor'
                    ? 'bg-white text-slate-900 shadow-sm font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Stethoscope className="w-3.5 h-3.5 mr-1.5 text-teal-600" />
                Doctor / OPD
              </button>

              <button
                onClick={() => setCurrentRole('patient')}
                className={`flex items-center px-2.5 py-1.5 rounded-md text-xs font-medium transition ${
                  currentRole === 'patient'
                    ? 'bg-white text-slate-900 shadow-sm font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <User className="w-3.5 h-3.5 mr-1.5 text-emerald-600" />
                Patient Portal
              </button>
            </div>

            {/* Profile Avatar Indicator */}
            <div className="flex items-center pl-2 border-l border-slate-200">
              <div className="w-9 h-9 rounded-full bg-slate-100 border border-slate-300 flex items-center justify-center text-slate-700 font-semibold text-xs">
                {currentRole === 'admin' ? 'AD' : currentRole === 'doctor' ? 'DR' : 'PT'}
              </div>
            </div>

          </div>
        </div>

        {/* Primary Functional Tabs */}
        <nav className="flex space-x-1 sm:space-x-4 border-t border-slate-100 overflow-x-auto py-2 text-xs font-medium">
          <button
            onClick={() => setActiveTab('command')}
            className={`px-3 py-2 rounded-md whitespace-nowrap transition flex items-center ${
              activeTab === 'command'
                ? 'bg-brand-50 text-brand-800 font-semibold border border-brand-200'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Building2 className="w-4 h-4 mr-1.5 text-brand-700" />
            Command Center
          </button>

          <button
            onClick={() => setActiveTab('referrals')}
            className={`px-3 py-2 rounded-md whitespace-nowrap transition flex items-center ${
              activeTab === 'referrals'
                ? 'bg-brand-50 text-brand-800 font-semibold border border-brand-200'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-rose-500 mr-2"></span>
            7-Stage Referral Bridge
          </button>

          <button
            onClick={() => setActiveTab('queuetv')}
            className={`px-3 py-2 rounded-md whitespace-nowrap transition flex items-center ${
              activeTab === 'queuetv'
                ? 'bg-brand-50 text-brand-800 font-semibold border border-brand-200'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Clock className="w-4 h-4 mr-1.5 text-amber-600" />
            Queue TV (Live Room Display)
          </button>

          <button
            onClick={() => setActiveTab('diagnostics')}
            className={`px-3 py-2 rounded-md whitespace-nowrap transition flex items-center ${
              activeTab === 'diagnostics'
                ? 'bg-brand-50 text-brand-800 font-semibold border border-brand-200'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <ShieldCheck className="w-4 h-4 mr-1.5 text-teal-600" />
            Diagnostics Lab & Reports
          </button>

          <button
            onClick={() => setActiveTab('doctor')}
            className={`px-3 py-2 rounded-md whitespace-nowrap transition flex items-center ${
              activeTab === 'doctor'
                ? 'bg-brand-50 text-brand-800 font-semibold border border-brand-200'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Stethoscope className="w-4 h-4 mr-1.5 text-indigo-600" />
            Doctor Clinical Workstation
          </button>

          <button
            onClick={() => setActiveTab('patient')}
            className={`px-3 py-2 rounded-md whitespace-nowrap transition flex items-center ${
              activeTab === 'patient'
                ? 'bg-brand-50 text-brand-800 font-semibold border border-brand-200'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <User className="w-4 h-4 mr-1.5 text-emerald-600" />
            Patient Portal & EMR
          </button>

          <button
            onClick={() => setActiveTab('compliance')}
            className={`px-3 py-2 rounded-md whitespace-nowrap transition flex items-center ${
              activeTab === 'compliance'
                ? 'bg-brand-50 text-brand-800 font-semibold border border-brand-200'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <ShieldAlert className="w-4 h-4 mr-1.5 text-slate-700" />
            Security & Concurrency Audit
          </button>
        </nav>
      </div>
    </header>
  );
}
