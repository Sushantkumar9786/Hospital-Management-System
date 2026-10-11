import React from 'react';
import { 
  Building2, 
  Users, 
  Bed, 
  Activity, 
  PhoneForwarded, 
  AlertTriangle, 
  ArrowUpRight, 
  Clock, 
  CheckCircle2, 
  TrendingUp,
  Stethoscope,
  ChevronRight
} from 'lucide-react';
import { FACILITIES } from '../data/mockData';

export default function CommandDashboard({ 
  setActiveTab, 
  onOpenBooking, 
  onOpenSOS,
  referralsCount 
}) {
  const [selectedFacility, setSelectedFacility] = React.useState('all');

  const totalBeds = FACILITIES.reduce((acc, f) => acc + f.totalBeds, 0);
  const occupiedBeds = FACILITIES.reduce((acc, f) => acc + f.occupiedBeds, 0);
  const occupancyRate = Math.round((occupiedBeds / totalBeds) * 100);

  const totalDoctors = FACILITIES.reduce((acc, f) => acc + f.doctorsOnDuty, 0);
  const totalOpd = FACILITIES.reduce((acc, f) => acc + f.activeOpdQueue, 0);
  const totalTele = FACILITIES.reduce((acc, f) => acc + f.teleConsultActive, 0);

  const filteredFacilities = selectedFacility === 'all' 
    ? FACILITIES 
    : FACILITIES.filter(f => f.id === selectedFacility);

  return (
    <div className="space-y-6">
      
      {/* Alert Header Banner */}
      <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-lg shadow-sm flex items-start justify-between">
        <div className="flex items-start space-x-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="text-sm font-semibold text-amber-900">
              Regional Health Network Advisory: Heatwave OPD Protocol Active
            </h4>
            <p className="text-xs text-amber-700 mt-0.5">
              PHCs and Community Centers report 18% surge in dehydration and acute heat exhaustion. 
              All secondary triage nodes have been provisioned with extra oral rehydration and saline buffers.
            </p>
          </div>
        </div>
        <span className="text-[11px] font-mono text-amber-700 bg-amber-100 px-2 py-1 rounded">
          Zone Alert #2026-44B
        </span>
      </div>

      {/* Primary Key Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        
        {/* Metric 1 */}
        <div className="clinic-card p-4 border-l-4 border-l-sky-600">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Total Bed Occupancy
            </span>
            <Bed className="w-4 h-4 text-sky-600" />
          </div>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-2xl font-bold text-slate-900 font-heading">
              {occupancyRate}%
            </span>
            <span className="text-xs font-medium text-slate-500">
              {occupiedBeds}/{totalBeds} Beds
            </span>
          </div>
          {/* Progress Bar */}
          <div className="w-full bg-slate-100 rounded-full h-1.5 mt-3">
            <div 
              className={`h-1.5 rounded-full ${occupancyRate > 85 ? 'bg-amber-500' : 'bg-sky-600'}`} 
              style={{ width: `${occupancyRate}%` }}
            ></div>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="clinic-card p-4 border-l-4 border-l-teal-600">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Specialists On Duty
            </span>
            <Stethoscope className="w-4 h-4 text-teal-600" />
          </div>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-2xl font-bold text-slate-900 font-heading">
              {totalDoctors}
            </span>
            <span className="text-xs font-semibold text-teal-700 bg-teal-50 px-2 py-0.5 rounded">
              Active Shift
            </span>
          </div>
          <p className="text-[11px] text-slate-500 mt-3">Across 4 Network Facilities</p>
        </div>

        {/* Metric 3 */}
        <div className="clinic-card p-4 border-l-4 border-l-indigo-600">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Active OPD Queue
            </span>
            <Users className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-2xl font-bold text-slate-900 font-heading">
              {totalOpd}
            </span>
            <span className="text-xs font-medium text-indigo-600 flex items-center">
              <TrendingUp className="w-3 h-3 mr-0.5" /> Normal Flow
            </span>
          </div>
          <p className="text-[11px] text-slate-500 mt-3">Average wait: 14.5 mins</p>
        </div>

        {/* Metric 4 */}
        <div className="clinic-card p-4 border-l-4 border-l-rose-500">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Active Referrals
            </span>
            <PhoneForwarded className="w-4 h-4 text-rose-500" />
          </div>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-2xl font-bold text-slate-900 font-heading">
              {referralsCount || 4}
            </span>
            <span className="text-xs font-semibold text-rose-700 bg-rose-50 px-2 py-0.5 rounded">
              1 Critical
            </span>
          </div>
          <button 
            onClick={() => setActiveTab('referrals')}
            className="text-[11px] text-rose-600 hover:text-rose-800 font-medium mt-3 flex items-center"
          >
            Open 7-Stage Pipeline <ChevronRight className="w-3 h-3 ml-0.5" />
          </button>
        </div>

        {/* Metric 5 */}
        <div className="clinic-card p-4 border-l-4 border-l-emerald-600">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Tele-Consultations
            </span>
            <Activity className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-2xl font-bold text-slate-900 font-heading">
              {totalTele}
            </span>
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
              Live WebRTC
            </span>
          </div>
          <p className="text-[11px] text-slate-500 mt-3">Zero network latency drops</p>
        </div>

      </div>

      {/* Facilities Hierarchy & Real-Time Capacity Grid */}
      <div className="clinic-card p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-slate-200 gap-4">
          <div>
            <h3 className="text-base font-bold text-slate-900 font-heading flex items-center">
              <Building2 className="w-5 h-5 mr-2 text-brand-700" />
              Regional Healthcare Facility Grid & Bed Capacity
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Real-time telemetry synchronized with CarePlus EMR Core Engine
            </p>
          </div>

          {/* Filter Facility */}
          <div className="flex items-center space-x-2">
            <span className="text-xs text-slate-500 font-medium">Filter Node:</span>
            <select
              value={selectedFacility}
              onChange={(e) => setSelectedFacility(e.target.value)}
              className="text-xs font-medium border border-slate-300 rounded-lg px-2.5 py-1.5 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500"
            >
              <option value="all">All Facilities (4 Active)</option>
              {FACILITIES.map(f => (
                <option key={f.id} value={f.id}>{f.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          {filteredFacilities.map((fac) => {
            const facOccupancy = Math.round((fac.occupiedBeds / fac.totalBeds) * 100);
            return (
              <div 
                key={fac.id} 
                className="p-4 rounded-lg border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-slate-300 transition"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{fac.name}</h4>
                    <p className="text-xs text-slate-500">{fac.type} &bull; {fac.location}</p>
                  </div>
                  <span className={`clinic-badge ${
                    fac.emergencyStatus.includes('Elevated')
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-emerald-100 text-emerald-800'
                  }`}>
                    {fac.emergencyStatus}
                  </span>
                </div>

                {/* Capacity stats */}
                <div className="grid grid-cols-3 gap-2 mt-4 text-center">
                  <div className="bg-white p-2 rounded border border-slate-200">
                    <span className="block text-xs text-slate-500 font-medium">General Beds</span>
                    <span className="text-sm font-bold text-slate-800">
                      {fac.occupiedBeds} / {fac.totalBeds}
                    </span>
                  </div>

                  <div className="bg-white p-2 rounded border border-slate-200">
                    <span className="block text-xs text-slate-500 font-medium">ICU / HDU</span>
                    <span className="text-sm font-bold text-slate-800">
                      {fac.occupiedIcu} / {fac.icuBeds}
                    </span>
                  </div>

                  <div className="bg-white p-2 rounded border border-slate-200">
                    <span className="block text-xs text-slate-500 font-medium">OPD Queue</span>
                    <span className="text-sm font-bold text-slate-800">
                      {fac.activeOpdQueue} Wait
                    </span>
                  </div>
                </div>

                {/* Occupancy Progress */}
                <div className="mt-3">
                  <div className="flex justify-between text-xs text-slate-500 font-medium mb-1">
                    <span>Bed Saturation</span>
                    <span>{facOccupancy}%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        facOccupancy > 85 ? 'bg-amber-500' : 'bg-brand-600'
                      }`}
                      style={{ width: `${facOccupancy}%` }}
                    ></div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200 flex items-center justify-between text-xs">
                  <span className="text-slate-600 font-medium">
                    Specialists On-Duty: <strong className="text-slate-900">{fac.doctorsOnDuty}</strong>
                  </span>
                  <button 
                    onClick={() => setActiveTab('queuetv')}
                    className="text-brand-700 hover:text-brand-900 font-semibold flex items-center"
                  >
                    View Room Queue <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Clinical Workflow Quick Launchers */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div 
          onClick={() => setActiveTab('referrals')}
          className="clinic-card p-4 cursor-pointer hover:border-brand-500 bg-gradient-to-br from-white to-sky-50/30"
        >
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-sky-100 flex items-center justify-center text-sky-700">
              <PhoneForwarded className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">7-Stage Referral Bridge</h4>
              <p className="text-xs text-slate-500 mt-0.5">Triage, dispatch, & track transfers</p>
            </div>
          </div>
        </div>

        <div 
          onClick={() => setActiveTab('queuetv')}
          className="clinic-card p-4 cursor-pointer hover:border-brand-500 bg-gradient-to-br from-white to-amber-50/30"
        >
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center text-amber-700">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">Queue TV Waiting Display</h4>
              <p className="text-xs text-slate-500 mt-0.5">Audio chime token caller display</p>
            </div>
          </div>
        </div>

        <div 
          onClick={() => setActiveTab('diagnostics')}
          className="clinic-card p-4 cursor-pointer hover:border-brand-500 bg-gradient-to-br from-white to-teal-50/30"
        >
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-teal-100 flex items-center justify-center text-teal-700">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">Diagnostic Coordination</h4>
              <p className="text-xs text-slate-500 mt-0.5">Lab orders, barcodes & pathology</p>
            </div>
          </div>
        </div>

        <div 
          onClick={() => setActiveTab('compliance')}
          className="clinic-card p-4 cursor-pointer hover:border-brand-500 bg-gradient-to-br from-white to-slate-100/50"
        >
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-slate-200 flex items-center justify-center text-slate-800">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">HIPAA & Concurrency Lab</h4>
              <p className="text-xs text-slate-500 mt-0.5">Pessimistic lock & audit logs</p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
