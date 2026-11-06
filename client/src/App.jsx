import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import CommandDashboard from './components/CommandDashboard';
import ReferralBridge from './components/ReferralBridge';
import QueueTV from './components/QueueTV';
import DiagnosticsCenter from './components/DiagnosticsCenter';
import DoctorWorkstation from './components/DoctorWorkstation';
import PatientPortal from './components/PatientPortal';
import AdminCompliance from './components/AdminCompliance';
import BookAppointmentModal from './components/BookAppointmentModal';
import SOSModal from './components/SOSModal';
import AuthPage from './components/AuthPage';
import { getStoredUser, logoutUser } from './services/api';

export default function App() {
  const [currentUser, setCurrentUser] = useState(() => getStoredUser());
  const [currentRole, setCurrentRole] = useState(() => {
    const user = getStoredUser();
    return user?.roleKey || 'patient';
  });
  const [activeTab, setActiveTab] = useState(() => {
    const user = getStoredUser();
    if (user?.roleKey === 'doctor') return 'doctor';
    if (user?.roleKey === 'admin') return 'command';
    return 'patient';
  });

  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isSOSOpen, setIsSOSOpen] = useState(false);

  // Synced appointments state
  const [appointments, setAppointments] = useState([
    {
      id: 'APT-7402',
      doctorName: 'Dr. Vivek Kulkarni, MD',
      department: 'General Medicine',
      date: '2026-10-14',
      slotTime: '10:00 AM',
      reason: 'Hypertension Follow-up & Medication Review',
      status: 'CONFIRMED'
    },
    {
      id: 'APT-7189',
      doctorName: 'Dr. Ananya Iyer, DM',
      department: 'Cardiology',
      date: '2026-10-20',
      slotTime: '11:30 AM',
      reason: 'Echocardiogram Follow-up',
      status: 'CONFIRMED'
    }
  ]);

  // When a user successfully logs in or signs up
  const handleAuthSuccess = (user) => {
    setCurrentUser(user);
    const roleKey = user.roleKey || 'patient';
    setCurrentRole(roleKey);
    if (roleKey === 'doctor') {
      setActiveTab('doctor');
    } else if (roleKey === 'admin') {
      setActiveTab('command');
    } else {
      setActiveTab('patient');
    }
  };

  // Sign out handler
  const handleLogout = () => {
    logoutUser();
    setCurrentUser(null);
  };

  // Enforce role-based tab access restrictions
  useEffect(() => {
    if (!currentUser) return;
    const roleKey = currentUser.roleKey || 'patient';

    if (roleKey === 'doctor') {
      const doctorAllowed = ['doctor', 'diagnostics', 'referrals', 'queuetv'];
      if (!doctorAllowed.includes(activeTab)) {
        setActiveTab('doctor');
      }
    } else if (roleKey === 'patient') {
      if (activeTab !== 'patient') {
        setActiveTab('patient');
      }
    }
    // Admin has access to all tabs
  }, [currentUser, activeTab]);

  // Handle role change (only allowed for Admin scope)
  const handleRoleChange = (newRole) => {
    if (currentUser?.roleKey !== 'admin') return;
    setCurrentRole(newRole);
    if (newRole === 'patient') {
      setActiveTab('patient');
    } else if (newRole === 'doctor') {
      setActiveTab('doctor');
    } else {
      setActiveTab('command');
    }
  };

  const handleBookSuccess = (newApt) => {
    setAppointments([newApt, ...appointments]);
  };

  // 1. If not authenticated, first show the Sign Up / Login page for doctor and patient
  if (!currentUser) {
    return <AuthPage onAuthSuccess={handleAuthSuccess} />;
  }

  // 2. Authenticated user view
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-800">
      
      {/* Top Header with Role Indicators and Sign Out */}
      <Header
        currentUser={currentUser}
        currentRole={currentRole}
        setCurrentRole={handleRoleChange}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenBooking={() => setIsBookingOpen(true)}
        onOpenSOS={() => setIsSOSOpen(true)}
        onLogout={handleLogout}
      />

      {/* Main Content Area: Restricted by User Role */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* DOCTOR VIEW: Doctor Workstation, Diagnostics, Queue TV, Referrals */}
        {activeTab === 'doctor' && (currentUser.roleKey === 'doctor' || currentUser.roleKey === 'admin') && (
          <DoctorWorkstation
            currentUser={currentUser}
            onOpenReferral={() => setActiveTab('referrals')}
          />
        )}

        {/* PATIENT VIEW: Patient Health Portal */}
        {activeTab === 'patient' && (currentUser.roleKey === 'patient' || currentUser.roleKey === 'admin') && (
          <PatientPortal
            currentUser={currentUser}
            onOpenBooking={() => setIsBookingOpen(true)}
            onOpenSOS={() => setIsSOSOpen(true)}
            appointments={appointments}
          />
        )}

        {/* CLINICAL SUPPORT VIEWS (Accessible to Doctor & Admin) */}
        {activeTab === 'diagnostics' && (currentUser.roleKey === 'doctor' || currentUser.roleKey === 'admin') && (
          <DiagnosticsCenter />
        )}

        {activeTab === 'referrals' && (currentUser.roleKey === 'doctor' || currentUser.roleKey === 'admin') && (
          <ReferralBridge />
        )}

        {activeTab === 'queuetv' && (currentUser.roleKey === 'doctor' || currentUser.roleKey === 'admin') && (
          <QueueTV />
        )}

        {/* ADMIN EXCLUSIVE VIEWS */}
        {activeTab === 'command' && currentUser.roleKey === 'admin' && (
          <CommandDashboard
            setActiveTab={setActiveTab}
            onOpenBooking={() => setIsBookingOpen(true)}
            onOpenSOS={() => setIsSOSOpen(true)}
            referralsCount={4}
          />
        )}

        {activeTab === 'compliance' && currentUser.roleKey === 'admin' && (
          <AdminCompliance />
        )}

      </main>

      {/* Trustworthy Enterprise Healthcare Footer */}
      <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 py-8 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            
            <div className="flex items-center space-x-3">
              <img 
                src="/careplus_logo.png" 
                alt="CarePlus Logo" 
                className="h-8 w-auto bg-white/90 p-0.5 rounded" 
              />
              <div>
                <span className="text-sm font-bold text-white font-heading">CarePlus</span>
                <span className="ml-2 text-[10px] text-emerald-400 font-mono">● MySQL 8.0 Connected</span>
              </div>
            </div>

            <div className="text-center md:text-right text-[11px] text-slate-400">
              Logged in as <span className="font-semibold text-white">{currentUser.fullName || currentUser.username}</span> 
              {' '}(<span className="text-sky-400 font-mono">{currentUser.roleKey?.toUpperCase()}</span>) 
              • <button onClick={handleLogout} className="text-rose-400 hover:text-rose-300 font-semibold underline ml-1">Sign Out</button>
            </div>

          </div>
        </div>
      </footer>

      {/* Modals */}
      <BookAppointmentModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        onBookSuccess={handleBookSuccess}
        currentUser={currentUser}
      />

      <SOSModal
        isOpen={isSOSOpen}
        onClose={() => setIsSOSOpen(false)}
      />

    </div>
  );
}
