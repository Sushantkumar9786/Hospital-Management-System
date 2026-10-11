import React, { useState } from 'react';
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

export default function App() {
  const [currentRole, setCurrentRole] = useState('admin');
  const [activeTab, setActiveTab] = useState('command');
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

  // When role changes, switch default view sensibly
  const handleRoleChange = (newRole) => {
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

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-800">
      
      {/* Top Header */}
      <Header
        currentRole={currentRole}
        setCurrentRole={handleRoleChange}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenBooking={() => setIsBookingOpen(true)}
        onOpenSOS={() => setIsSOSOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'command' && (
          <CommandDashboard
            setActiveTab={setActiveTab}
            onOpenBooking={() => setIsBookingOpen(true)}
            onOpenSOS={() => setIsSOSOpen(true)}
            referralsCount={4}
          />
        )}

        {activeTab === 'referrals' && (
          <ReferralBridge />
        )}

        {activeTab === 'queuetv' && (
          <QueueTV />
        )}

        {activeTab === 'diagnostics' && (
          <DiagnosticsCenter />
        )}

        {activeTab === 'doctor' && (
          <DoctorWorkstation
            onOpenReferral={() => setActiveTab('referrals')}
          />
        )}

        {activeTab === 'patient' && (
          <PatientPortal
            onOpenBooking={() => setIsBookingOpen(true)}
            onOpenSOS={() => setIsSOSOpen(true)}
            appointments={appointments}
          />
        )}

        {activeTab === 'compliance' && (
          <AdminCompliance />
        )}
      </main>

      {/* Trustworthy Enterprise Healthcare Footer */}
      <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 py-10 mt-12 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            
            {/* Col 1: Brand & Logo */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <img 
                  src="/careplus_logo.png" 
                  alt="CarePlus Logo" 
                  className="h-10 w-auto bg-white/90 p-1 rounded" 
                />
                <span className="text-base font-bold text-white font-heading">CarePlus</span>
              </div>
              <p className="text-slate-400 text-xs leading-relaxed">
                Integrated Outpatient Clinic Management System (CMS) & Electronic Medical Record (EMR) Platform for Regional Health Networks.
              </p>
              <span className="inline-block px-2.5 py-1 rounded bg-slate-800 text-sky-400 font-mono text-[10px]">
                HIPAA / GDPR / ABHA Compliant
              </span>
            </div>

            {/* Col 2: Clinical Services */}
            <div>
              <h4 className="text-slate-200 font-bold uppercase tracking-wider mb-3 text-[11px]">
                Platform Modules
              </h4>
              <ul className="space-y-2">
                <li><button onClick={() => setActiveTab('command')} className="hover:text-white transition">Facility Command Center</button></li>
                <li><button onClick={() => setActiveTab('referrals')} className="hover:text-white transition">7-Stage Referral Bridge</button></li>
                <li><button onClick={() => setActiveTab('queuetv')} className="hover:text-white transition">Queue TV Waiting Room</button></li>
                <li><button onClick={() => setActiveTab('diagnostics')} className="hover:text-white transition">Diagnostics & Pathology Lab</button></li>
              </ul>
            </div>

            {/* Col 3: Role Workspaces */}
            <div>
              <h4 className="text-slate-200 font-bold uppercase tracking-wider mb-3 text-[11px]">
                Clinical Roles
              </h4>
              <ul className="space-y-2">
                <li><button onClick={() => handleRoleChange('admin')} className="hover:text-white transition">Facility Chief Health Officer</button></li>
                <li><button onClick={() => handleRoleChange('doctor')} className="hover:text-white transition">Physician OPD Workstation</button></li>
                <li><button onClick={() => handleRoleChange('patient')} className="hover:text-white transition">Citizen Patient Portal</button></li>
                <li><button onClick={() => setActiveTab('compliance')} className="hover:text-white transition">HIPAA Audit Trail & Security</button></li>
              </ul>
            </div>

            {/* Col 4: Enterprise Architecture */}
            <div>
              <h4 className="text-slate-200 font-bold uppercase tracking-wider mb-3 text-[11px]">
                Technology Architecture
              </h4>
              <p className="text-slate-400 text-[11px] leading-relaxed mb-2">
                Powered by Java Spring Boot 3.2+ with Spring Security 6, JPA Pessimistic Locking row concurrency, and React 18 frontend.
              </p>
              <div className="space-y-1 font-mono text-[10px] text-slate-500">
                <div>Backend: Spring Boot 3.x (Java 21)</div>
                <div>Locking: PESSIMISTIC_WRITE</div>
                <div>Auth: Stateless JWT Token Filter</div>
              </div>
            </div>

          </div>

          <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
            <div>
              &copy; {new Date().getFullYear()} CarePlus Healthcare IT Systems. All rights reserved.
            </div>
            <div className="flex space-x-4">
              <span>Security Policy</span>
              <span>&bull;</span>
              <span>HIPAA Compliance</span>
              <span>&bull;</span>
              <span>Data Segregation Protocol</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <BookAppointmentModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        onBookSuccess={handleBookSuccess}
      />

      <SOSModal
        isOpen={isSOSOpen}
        onClose={() => setIsSOSOpen(false)}
      />

    </div>
  );
}
