import React, { useState } from 'react';
import { 
  ShieldAlert, 
  Lock, 
  CheckCircle2, 
  XCircle, 
  Play, 
  RotateCcw, 
  Search, 
  FileCheck, 
  Database,
  Layers,
  Key
} from 'lucide-react';
import { HIPAA_AUDIT_LOGS } from '../data/mockData';

export default function AdminCompliance() {
  const [logs, setLogs] = useState(HIPAA_AUDIT_LOGS);
  const [search, setSearch] = useState('');

  // Concurrency Simulation State
  const [simState, setSimState] = useState('idle'); // idle, running, finished
  const [simResults, setSimResults] = useState(null);

  const runConcurrencyTest = () => {
    setSimState('running');
    setSimResults(null);

    setTimeout(() => {
      setSimResults({
        slotId: 'SLOT-91a2-44df-901c',
        timestamp: new Date().toISOString(),
        threadA: {
          client: 'Patient A (Mobile App Webhook)',
          time: '12:00:00.104 IST',
          lockAcquired: true,
          status: 'SUCCESS (200 OK)',
          message: 'Acquired JPA PESSIMISTIC_WRITE Lock on row. Slot booked. Transaction committed.'
        },
        threadB: {
          client: 'Patient B (Web Portal Direct)',
          time: '12:00:00.106 IST',
          lockAcquired: false,
          status: 'REJECTED (409 CONFLICT)',
          message: 'Pessimistic lock prevented dirty read. Threw SlotAlreadyBookedException.'
        }
      });
      setSimState('finished');
    }, 1200);
  };

  const filteredLogs = logs.filter(l => 
    l.userId.toLowerCase().includes(search.toLowerCase()) ||
    l.action.toLowerCase().includes(search.toLowerCase()) ||
    l.patientHealthId.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      
      {/* Title */}
      <div className="pb-4 border-b border-slate-200">
        <h2 className="text-xl font-bold text-slate-900 font-heading flex items-center">
          <ShieldAlert className="w-5 h-5 mr-2 text-brand-700" />
          Enterprise Healthcare Governance, HIPAA Audit & Concurrency Lab
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Zero-trust role-based access control, immutable EMR access audit trails, and row-level pessimistic locking simulation.
        </p>
      </div>

      {/* Concurrency Simulator Card */}
      <div className="clinic-card p-6 border-l-4 border-l-indigo-600">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-slate-200 gap-3">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-mono font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
                Database Concurrency Sandbox
              </span>
              <span className="text-xs font-semibold text-slate-600">
                JPA LockModeType.PESSIMISTIC_WRITE
              </span>
            </div>
            <h3 className="text-base font-bold text-slate-900 font-heading mt-1">
              Race Condition & Double-Booking Prevention Verification
            </h3>
            <p className="text-xs text-slate-500">
              Simulate 2 concurrent transactions requesting the exact same doctor appointment slot at identical milliseconds.
            </p>
          </div>

          <button
            onClick={runConcurrencyTest}
            disabled={simState === 'running'}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white text-xs font-bold rounded-lg shadow-sm transition flex items-center whitespace-nowrap"
          >
            {simState === 'running' ? (
              <>
                <RotateCcw className="w-3.5 h-3.5 mr-1.5 animate-spin" />
                Executing Concurrent Threads...
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 mr-1.5" />
                Execute Double-Booking Race Test
              </>
            )}
          </button>
        </div>

        {/* Results Visualizer */}
        {simResults && (
          <div className="mt-6 space-y-4">
            <div className="bg-slate-900 text-white p-4 rounded-lg text-xs font-mono">
              <span className="text-sky-400 font-bold">SQL TARGET:</span> SELECT s FROM DoctorSlot s WHERE s.id = '{simResults.slotId}' FOR UPDATE
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Thread A */}
              <div className="p-4 rounded-lg border-2 border-emerald-400 bg-emerald-50/40 text-xs">
                <div className="flex items-center justify-between pb-2 border-b border-emerald-200">
                  <span className="font-bold text-emerald-900 flex items-center">
                    <CheckCircle2 className="w-4 h-4 mr-1 text-emerald-600" />
                    Thread 1: {simResults.threadA.client}
                  </span>
                  <span className="font-mono text-[10px] text-emerald-700 font-bold">
                    {simResults.threadA.time}
                  </span>
                </div>
                <div className="mt-3 space-y-1.5 text-slate-800">
                  <p><strong>Result:</strong> <span className="text-emerald-700 font-bold">{simResults.threadA.status}</span></p>
                  <p className="text-slate-600">{simResults.threadA.message}</p>
                  <p className="text-[11px] text-slate-500 font-mono">Locked Row State: isBooked = TRUE</p>
                </div>
              </div>

              {/* Thread B */}
              <div className="p-4 rounded-lg border-2 border-rose-400 bg-rose-50/40 text-xs">
                <div className="flex items-center justify-between pb-2 border-b border-rose-200">
                  <span className="font-bold text-rose-900 flex items-center">
                    <XCircle className="w-4 h-4 mr-1 text-rose-600" />
                    Thread 2: {simResults.threadB.client}
                  </span>
                  <span className="font-mono text-[10px] text-rose-700 font-bold">
                    {simResults.threadB.time}
                  </span>
                </div>
                <div className="mt-3 space-y-1.5 text-slate-800">
                  <p><strong>Result:</strong> <span className="text-rose-700 font-bold">{simResults.threadB.status}</span></p>
                  <p className="text-slate-600">{simResults.threadB.message}</p>
                  <p className="text-[11px] text-slate-500 font-mono">Exception: SlotAlreadyBookedException</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* HIPAA / GDPR Audit Logs Table */}
      <div className="clinic-card p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-slate-200 gap-3">
          <div>
            <h3 className="text-base font-bold text-slate-900 font-heading flex items-center">
              <FileCheck className="w-5 h-5 mr-2 text-brand-700" />
              HIPAA / GDPR Immutable Clinical Access Audit Trail
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Cryptographically timestamped audit logging for every read/write action on electronic patient health records.
            </p>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search user, action, health ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full text-xs pl-8 pr-3 py-1.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>
        </div>

        <div className="overflow-x-auto mt-4">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50 text-slate-600 uppercase tracking-wider font-semibold border-b border-slate-200">
                <th className="py-2.5 px-4">Event ID & Timestamp</th>
                <th className="py-2.5 px-4">User Principal / Role</th>
                <th className="py-2.5 px-4">Action Event</th>
                <th className="py-2.5 px-4">Patient Target</th>
                <th className="py-2.5 px-4">Client IP</th>
                <th className="py-2.5 px-4 text-right">Audit Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredLogs.map((log) => {
                const isBlocked = log.status.includes('BLOCKED');
                return (
                  <tr key={log.id} className="hover:bg-slate-50/70">
                    <td className="py-3 px-4">
                      <span className="font-mono font-bold text-slate-800 block">{log.id}</span>
                      <span className="text-[10px] text-slate-400">{log.timestamp}</span>
                    </td>
                    <td className="py-3 px-4">
                      <strong className="text-slate-800 block">{log.userId}</strong>
                      <span className="text-[10px] font-mono text-slate-500">{log.role}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-mono font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded text-[11px]">
                        {log.action}
                      </span>
                      <p className="text-[11px] text-slate-500 mt-1">{log.notes}</p>
                    </td>
                    <td className="py-3 px-4 font-mono font-semibold text-slate-700">
                      {log.patientHealthId}
                    </td>
                    <td className="py-3 px-4 font-mono text-slate-500">
                      {log.ipAddress}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <span className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                        isBlocked
                          ? 'bg-rose-100 text-rose-800 border border-rose-300'
                          : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      }`}>
                        {log.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Spring Security 6 RBAC Architecture Card */}
      <div className="clinic-card p-6">
        <h3 className="text-base font-bold text-slate-900 font-heading pb-3 border-b border-slate-200 flex items-center">
          <Key className="w-5 h-5 mr-2 text-brand-700" />
          Spring Security 6 Role-Based Access Hierarchy & Route Perimeter
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 text-xs">
          <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
            <span className="text-xs font-bold text-blue-900 block mb-1">ROLE_ADMIN</span>
            <p className="text-slate-600 mb-2">Full facility administration, user identity lifecycle, compliance auditing, system telemetry.</p>
            <span className="font-mono text-[10px] bg-white p-1 rounded border border-slate-200 block text-slate-700">
              Matcher: /api/v1/admin/**
            </span>
          </div>

          <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
            <span className="text-xs font-bold text-teal-900 block mb-1">ROLE_DOCTOR</span>
            <p className="text-slate-600 mb-2">OPD schedule management, clinical consultation SOAP notes, digital prescriptions, lab orders.</p>
            <span className="font-mono text-[10px] bg-white p-1 rounded border border-slate-200 block text-slate-700">
              Matcher: /api/v1/doctor/**
            </span>
          </div>

          <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
            <span className="text-xs font-bold text-emerald-900 block mb-1">ROLE_PATIENT</span>
            <p className="text-slate-600 mb-2">Self-service appointment booking, ABHA health record retrieval, lab test report access, SOS dispatch.</p>
            <span className="font-mono text-[10px] bg-white p-1 rounded border border-slate-200 block text-slate-700">
              Matcher: /api/v1/patient/**
            </span>
          </div>
        </div>
      </div>

    </div>
  );
}
