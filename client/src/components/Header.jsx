import React from 'react';
import { 
  Building2, 
  ShieldCheck, 
  PhoneCall, 
  Clock, 
  LogOut, 
  UserCheck, 
  Stethoscope, 
  User, 
  ShieldAlert,
  ChevronDown,
  Sparkles
} from 'lucide-react';

export default function Header({ 
  currentUser,
  currentRole, 
  setCurrentRole, 
  activeTab, 
  setActiveTab,
  onOpenSOS,
  onOpenBooking,
  onLogout
}) {
  const [now, setNow] = React.useState(new Date());

  React.useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const actualRole = currentUser?.roleKey || currentRole || 'patient';
  const isAdmin = actualRole === 'admin';
  const isDoctor = actualRole === 'doctor';
  const isPatient = actualRole === 'patient';

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-sm">
      {/* Top Clinical Utility Strip */}
      <div className="bg-slate-900 text-slate-300 text-xs px-4 py-1.5 flex flex-wrap items-center justify-between border-b border-slate-800">
        <div className="flex items-center space-x-4">
          <span className="flex items-center text-emerald-400 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse mr-1.5"></span>
            CarePlus Clinical Grid: Connected to MySQL (careplus_db)
          </span>
          <span className="hidden md:inline-block text-slate-500">|</span>
          <span className="hidden md:inline-block text-slate-300">
            Node: Apex Tertiary District Hub
          </span>
          <span className="hidden lg:inline-flex items-center text-sky-400">
            <ShieldCheck className="w-3.5 h-3.5 mr-1" />
            Stateless JWT 6.x Session Active
          </span>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1.5 text-slate-300">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span className="font-mono">{now.toLocaleTimeString()} IST</span>
          </div>

          <button 
            onClick={onOpenSOS}
            className="flex items-center px-2 py-0.5 rounded bg-rose-600 hover:bg-rose-700 text-white font-medium transition shadow-sm text-[11px]"
            title="Immediate Emergency Ambulance Triage"
          >
            <PhoneCall className="w-3 h-3 mr-1" />
            108 SOS Dispatch
          </button>
        </div>
      </div>

      {/* Main Navigation & Branding Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Platform Title */}
          <div 
            className="flex items-center space-x-3.5 cursor-pointer" 
            onClick={() => {
              if (isAdmin) setActiveTab('command');
              else if (isDoctor) setActiveTab('doctor');
              else setActiveTab('patient');
            }}
          >
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
                <span className={`px-2 py-0.5 text-[11px] font-bold rounded uppercase tracking-wider ${
                  isAdmin ? 'bg-purple-100 text-purple-800' :
                  isDoctor ? 'bg-teal-100 text-teal-800' : 'bg-sky-100 text-sky-800'
                }`}>
                  {isAdmin ? 'Admin Console' : isDoctor ? 'Doctor Workstation' : 'Patient Portal'}
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">
                {isAdmin ? 'Complete Regional Facility & Governance Oversight' :
                 isDoctor ? 'Outpatient (OPD) Consultation & Clinical EMR' :
                 'Citizen Self-Service Health Records & Appointment Booking'}
              </p>
            </div>
          </div>

          {/* User Profile, Role Tools & Sign Out */}
          <div className="flex items-center space-x-3">
            
            {/* Quick Booking Button for Patients / Admins */}
            {(isPatient || isAdmin) && (
              <button
                onClick={onOpenBooking}
                className="hidden md:inline-flex items-center px-3.5 py-2 text-xs font-semibold rounded-lg text-white bg-brand-700 hover:bg-brand-800 transition shadow-sm"
              >
                Book OPD Slot
              </button>
            )}

            {/* Admin-Only Multi-View Switcher ("Admin can see both") */}
            {isAdmin && (
              <div className="hidden lg:flex items-center bg-slate-100 p-1 rounded-lg border border-slate-200">
                <span className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold px-2">
                  Admin Scope:
                </span>
                
                <button
                  onClick={() => { setCurrentRole('admin'); setActiveTab('command'); }}
                  className={`flex items-center px-2.5 py-1.5 rounded-md text-xs font-medium transition ${
                    currentRole === 'admin'
                      ? 'bg-white text-slate-900 shadow-sm font-semibold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Building2 className="w-3.5 h-3.5 mr-1.5 text-blue-700" />
                  Facility Hub
                </button>

                <button
                  onClick={() => { setCurrentRole('doctor'); setActiveTab('doctor'); }}
                  className={`flex items-center px-2.5 py-1.5 rounded-md text-xs font-medium transition ${
                    currentRole === 'doctor'
                      ? 'bg-white text-slate-900 shadow-sm font-semibold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Stethoscope className="w-3.5 h-3.5 mr-1.5 text-teal-600" />
                  Doctor View
                </button>

                <button
                  onClick={() => { setCurrentRole('patient'); setActiveTab('patient'); }}
                  className={`flex items-center px-2.5 py-1.5 rounded-md text-xs font-medium transition ${
                    currentRole === 'patient'
                      ? 'bg-white text-slate-900 shadow-sm font-semibold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <User className="w-3.5 h-3.5 mr-1.5 text-emerald-600" />
                  Patient View
                </button>
              </div>
            )}

            {/* Logged In User Pill */}
            <div className="flex items-center pl-2 border-l border-slate-200 space-x-2">
              <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs ${
                isAdmin ? 'bg-purple-100 text-purple-800 border border-purple-300' :
                isDoctor ? 'bg-teal-100 text-teal-800 border border-teal-300' :
                'bg-sky-100 text-sky-800 border border-sky-300'
              }`}>
                {isAdmin ? 'AD' : isDoctor ? 'DR' : 'PT'}
              </div>

              <div className="hidden sm:block text-left">
                <div className="text-xs font-bold text-slate-800 leading-tight">
                  {currentUser?.fullName || (isAdmin ? 'Administrator' : isDoctor ? 'Dr. Vivek Kulkarni' : 'Rahul Patil')}
                </div>
                <div className="text-[10px] text-slate-500 font-mono">
                  @{currentUser?.username || actualRole} • {actualRole.toUpperCase()}
                </div>
              </div>

              {/* Sign Out Button */}
              <button
                onClick={onLogout}
                className="ml-2 p-2 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition border border-transparent hover:border-rose-200"
                title="Sign Out / Switch Account"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>

        {/* Dynamic Functional Tabs tailored to Logged-in User Role */}
        <nav className="flex space-x-1 sm:space-x-3 border-t border-slate-100 overflow-x-auto py-2 text-xs font-medium">
          
          {/* ================= ADMIN VIEW (CAN SEE EVERYTHING) ================= */}
          {isAdmin && (
            <>
              <button
                onClick={() => setActiveTab('command')}
                className={`px-3 py-2 rounded-md whitespace-nowrap transition flex items-center ${
                  activeTab === 'command'
                    ? 'bg-brand-50 text-brand-800 font-semibold border border-brand-200 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Building2 className="w-4 h-4 mr-1.5 text-brand-700" />
                Facility Command Center
              </button>

              <button
                onClick={() => setActiveTab('referrals')}
                className={`px-3 py-2 rounded-md whitespace-nowrap transition flex items-center ${
                  activeTab === 'referrals'
                    ? 'bg-brand-50 text-brand-800 font-semibold border border-brand-200 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-rose-500 mr-2"></span>
                Referral Setu Bridge
              </button>

              <button
                onClick={() => setActiveTab('queuetv')}
                className={`px-3 py-2 rounded-md whitespace-nowrap transition flex items-center ${
                  activeTab === 'queuetv'
                    ? 'bg-brand-50 text-brand-800 font-semibold border border-brand-200 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Clock className="w-4 h-4 mr-1.5 text-amber-600" />
                Queue TV Broadcast
              </button>

              <button
                onClick={() => setActiveTab('diagnostics')}
                className={`px-3 py-2 rounded-md whitespace-nowrap transition flex items-center ${
                  activeTab === 'diagnostics'
                    ? 'bg-brand-50 text-brand-800 font-semibold border border-brand-200 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <ShieldCheck className="w-4 h-4 mr-1.5 text-teal-600" />
                Diagnostics Lab
              </button>

              <button
                onClick={() => setActiveTab('doctor')}
                className={`px-3 py-2 rounded-md whitespace-nowrap transition flex items-center ${
                  activeTab === 'doctor'
                    ? 'bg-brand-50 text-brand-800 font-semibold border border-brand-200 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Stethoscope className="w-4 h-4 mr-1.5 text-indigo-600" />
                Doctor Workstation
              </button>

              <button
                onClick={() => setActiveTab('patient')}
                className={`px-3 py-2 rounded-md whitespace-nowrap transition flex items-center ${
                  activeTab === 'patient'
                    ? 'bg-brand-50 text-brand-800 font-semibold border border-brand-200 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <User className="w-4 h-4 mr-1.5 text-emerald-600" />
                Patient Portal
              </button>

              <button
                onClick={() => setActiveTab('compliance')}
                className={`px-3 py-2 rounded-md whitespace-nowrap transition flex items-center ${
                  activeTab === 'compliance'
                    ? 'bg-brand-50 text-brand-800 font-semibold border border-brand-200 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <ShieldAlert className="w-4 h-4 mr-1.5 text-slate-700" />
                HIPAA & Concurrency Lab
              </button>
            </>
          )}

          {/* ================= DOCTOR VIEW (DOCTOR ONLY CAN SEE HIS DASHBOARD) ================= */}
          {isDoctor && (
            <>
              <button
                onClick={() => setActiveTab('doctor')}
                className={`px-3.5 py-2 rounded-md whitespace-nowrap transition flex items-center font-bold ${
                  activeTab === 'doctor'
                    ? 'bg-teal-50 text-teal-800 border border-teal-300 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Stethoscope className="w-4 h-4 mr-1.5 text-teal-600" />
                My OPD Consultation Workstation & Queue
              </button>

              <button
                onClick={() => setActiveTab('diagnostics')}
                className={`px-3 py-2 rounded-md whitespace-nowrap transition flex items-center ${
                  activeTab === 'diagnostics'
                    ? 'bg-teal-50 text-teal-800 border border-teal-300 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <ShieldCheck className="w-4 h-4 mr-1.5 text-teal-600" />
                Laboratory & Diagnostic Investigations
              </button>

              <button
                onClick={() => setActiveTab('referrals')}
                className={`px-3 py-2 rounded-md whitespace-nowrap transition flex items-center ${
                  activeTab === 'referrals'
                    ? 'bg-teal-50 text-teal-800 border border-teal-300 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-rose-500 mr-2"></span>
                Inter-Facility Referral Transfer Bridge
              </button>

              <button
                onClick={() => setActiveTab('queuetv')}
                className={`px-3 py-2 rounded-md whitespace-nowrap transition flex items-center ${
                  activeTab === 'queuetv'
                    ? 'bg-teal-50 text-teal-800 border border-teal-300 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Clock className="w-4 h-4 mr-1.5 text-amber-600" />
                Clinic Waiting Room Queue Display
              </button>
            </>
          )}

          {/* ================= PATIENT VIEW (PATIENT ONLY CAN SEE HIS DASHBOARD) ================= */}
          {isPatient && (
            <>
              <button
                onClick={() => setActiveTab('patient')}
                className={`px-4 py-2 rounded-md whitespace-nowrap transition flex items-center font-bold ${
                  activeTab === 'patient'
                    ? 'bg-sky-50 text-sky-800 border border-sky-300 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <User className="w-4 h-4 mr-1.5 text-sky-600" />
                My Patient Health Portal (ABHA ID, Vitals & Appointments)
              </button>

              <button
                onClick={onOpenBooking}
                className="px-3 py-2 rounded-md text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 font-semibold transition flex items-center"
              >
                <Clock className="w-3.5 h-3.5 mr-1 text-emerald-600" />
                Book New OPD Doctor Appointment
              </button>
            </>
          )}

        </nav>
      </div>
    </header>
  );
}
