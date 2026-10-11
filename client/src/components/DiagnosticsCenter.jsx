import React, { useState } from 'react';
import { 
  Activity, 
  Search, 
  FileText, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  Printer, 
  Download,
  PlusCircle,
  Filter,
  ShieldCheck,
  QrCode
} from 'lucide-react';
import { DIAGNOSTIC_TESTS } from '../data/mockData';

export default function DiagnosticsCenter() {
  const [tests, setTests] = useState(DIAGNOSTIC_TESTS);
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedReport, setSelectedReport] = useState(null);
  const [showOrderModal, setShowOrderModal] = useState(false);

  // New order state
  const [newOrder, setNewOrder] = useState({
    patientName: '',
    healthId: 'CP-MH-' + Math.floor(100000 + Math.random() * 900000),
    testName: 'Complete Blood Count (CBC) with Differential',
    department: 'Hematology',
    sampleType: 'Venous Whole Blood (EDTA)'
  });

  const handleCreateOrder = (e) => {
    e.preventDefault();
    if (!newOrder.patientName) return;

    const orderObj = {
      id: 'LAB-' + Math.floor(9050 + Math.random() * 1000),
      orderDate: new Date().toISOString().slice(0, 16).replace('T', ' '),
      patientName: newOrder.patientName,
      healthId: newOrder.healthId,
      testName: newOrder.testName,
      department: newOrder.department,
      sampleType: newOrder.sampleType,
      status: 'In Analysis',
      resultSummary: 'Sample barcoded and undergoing automated robotic analysis.',
      criticalAlert: false,
      reportedBy: 'Pending Pathologist Review'
    };

    setTests([orderObj, ...tests]);
    setShowOrderModal(false);
  };

  const filtered = filterStatus === 'all' 
    ? tests 
    : tests.filter(t => t.status.toLowerCase().replace(' ', '') === filterStatus.toLowerCase().replace(' ', ''));

  return (
    <div className="space-y-6">
      
      {/* Title & Actions Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h2 className="text-xl font-bold text-slate-900 font-heading flex items-center">
            <Activity className="w-5 h-5 mr-2 text-teal-600" />
            CarePlus Diagnostic Coordination & Laboratory Center
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Pathology, Biochemistry, Microbiology, and Imaging requisition with automated critical value flagging.
          </p>
        </div>

        <div className="flex items-center space-x-3 w-full sm:w-auto">
          {/* Status Filter */}
          <div className="flex items-center space-x-1.5 bg-white border border-slate-300 rounded-lg px-2.5 py-1.5">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="text-xs font-medium text-slate-700 bg-transparent focus:outline-none"
            >
              <option value="all">All Lab Orders</option>
              <option value="completed">Completed Reports</option>
              <option value="inanalysis">In Analysis</option>
              <option value="pendingcollection">Pending Collection</option>
            </select>
          </div>

          <button
            onClick={() => setShowOrderModal(true)}
            className="flex items-center px-3.5 py-2 text-xs font-semibold rounded-lg text-white bg-teal-600 hover:bg-teal-700 shadow-sm transition whitespace-nowrap"
          >
            <PlusCircle className="w-4 h-4 mr-1.5" />
            Requisition New Test
          </button>
        </div>
      </div>

      {/* Tests Table */}
      <div className="clinic-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50 text-slate-600 uppercase tracking-wider font-semibold border-b border-slate-200">
                <th className="py-3 px-4">Order ID & Date</th>
                <th className="py-3 px-4">Patient & Health ID</th>
                <th className="py-3 px-4">Investigation Requested</th>
                <th className="py-3 px-4">Department / Specimen</th>
                <th className="py-3 px-4">Result Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((test) => (
                <tr key={test.id} className="hover:bg-slate-50/80 transition">
                  <td className="py-3.5 px-4">
                    <span className="font-mono font-bold text-slate-900 block">{test.id}</span>
                    <span className="text-[11px] text-slate-400">{test.orderDate}</span>
                  </td>

                  <td className="py-3.5 px-4">
                    <strong className="text-slate-800 block">{test.patientName}</strong>
                    <span className="text-[11px] font-mono text-slate-500">{test.healthId}</span>
                  </td>

                  <td className="py-3.5 px-4">
                    <strong className="text-slate-900 block">{test.testName}</strong>
                    {test.criticalAlert && (
                      <span className="inline-flex items-center text-[10px] font-bold text-rose-700 bg-rose-50 px-1.5 py-0.5 rounded border border-rose-200 mt-1">
                        <AlertTriangle className="w-3 h-3 mr-1 text-rose-600" /> Critical Alert Value
                      </span>
                    )}
                  </td>

                  <td className="py-3.5 px-4 text-slate-600">
                    <span className="block font-medium">{test.department}</span>
                    <span className="text-[11px] text-slate-400">{test.sampleType}</span>
                  </td>

                  <td className="py-3.5 px-4">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold ${
                      test.status === 'Completed'
                        ? 'bg-emerald-100 text-emerald-800'
                        : test.status === 'In Analysis'
                        ? 'bg-sky-100 text-sky-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}>
                      {test.status === 'Completed' && <CheckCircle2 className="w-3 h-3 mr-1" />}
                      {test.status === 'In Analysis' && <Clock className="w-3 h-3 mr-1" />}
                      {test.status}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => setSelectedReport(test)}
                      className="px-3 py-1.5 rounded bg-brand-50 hover:bg-brand-100 text-brand-700 font-semibold border border-brand-200 transition inline-flex items-center"
                    >
                      <FileText className="w-3.5 h-3.5 mr-1" />
                      View Report
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Lab Report Modal */}
      {selectedReport && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full p-6 border border-slate-200 max-h-[92vh] overflow-y-auto">
            
            {/* Report Header */}
            <div className="flex items-start justify-between pb-4 border-b border-slate-200">
              <div className="flex items-center space-x-3">
                <img src="/careplus_logo.png" alt="CarePlus" className="h-10 w-auto" />
                <div>
                  <h3 className="text-base font-bold text-slate-900 font-heading">
                    CarePlus Central Diagnostic Pathology Laboratory
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Accredited Laboratory &bull; ISO 15189 / NABL Compliant &bull; Apex District Hub
                  </p>
                </div>
              </div>

              <button 
                onClick={() => setSelectedReport(null)}
                className="text-slate-400 hover:text-slate-600 font-bold p-1"
              >
                ✕
              </button>
            </div>

            {/* Patient Header Block */}
            <div className="bg-slate-50 rounded-lg p-3 my-4 grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs border border-slate-200">
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-semibold">Patient Name</span>
                <strong className="text-slate-800">{selectedReport.patientName}</strong>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-semibold">Health ID</span>
                <span className="font-mono text-slate-800">{selectedReport.healthId}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-semibold">Report ID</span>
                <span className="font-mono text-slate-800">{selectedReport.id}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-semibold">Ordered On</span>
                <span className="text-slate-800">{selectedReport.orderDate}</span>
              </div>
            </div>

            {/* Test Details */}
            <div className="space-y-4 my-4 text-xs">
              <div className="border border-slate-200 rounded-lg p-4">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <h4 className="font-bold text-slate-900 text-sm">
                    {selectedReport.testName}
                  </h4>
                  <span className="clinic-badge bg-teal-50 text-teal-700">
                    {selectedReport.department}
                  </span>
                </div>

                <div className="mt-3 space-y-2">
                  <p className="text-slate-600">
                    <strong>Specimen:</strong> {selectedReport.sampleType}
                  </p>
                  
                  <div className="bg-slate-100 p-3 rounded text-slate-800 font-mono text-xs">
                    <span className="font-sans font-semibold text-slate-500 block mb-1">Findings & Interpretation:</span>
                    {selectedReport.resultSummary}
                  </div>

                  {selectedReport.criticalAlert && (
                    <div className="bg-rose-50 border-l-4 border-rose-600 p-3 rounded-r text-rose-800 mt-2">
                      <strong className="block text-rose-900 font-bold flex items-center">
                        <AlertTriangle className="w-4 h-4 mr-1 text-rose-600" /> CRITICAL TELEMETRY ALERT:
                      </strong>
                      Value exceeds safety thresholds. Urgent physician consultation initiated.
                    </div>
                  )}
                </div>
              </div>

              {/* Pathologist Endorsement */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-200 text-xs">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-semibold">Signed & Validated By</span>
                  <span className="font-semibold text-slate-800 flex items-center mt-0.5">
                    <ShieldCheck className="w-3.5 h-3.5 mr-1 text-emerald-600" />
                    {selectedReport.reportedBy}
                  </span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={() => window.print()}
                    className="px-3 py-1.5 rounded border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold flex items-center"
                  >
                    <Printer className="w-3.5 h-3.5 mr-1" /> Print Report
                  </button>
                  <button 
                    onClick={() => alert("Digital copy verified and downloaded.")}
                    className="px-3 py-1.5 rounded bg-brand-700 hover:bg-brand-800 text-white font-semibold flex items-center shadow-sm"
                  >
                    <Download className="w-3.5 h-3.5 mr-1" /> Download PDF
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Order New Test Modal */}
      {showOrderModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 border border-slate-200 text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <h3 className="text-base font-bold text-slate-900 font-heading flex items-center">
                <PlusCircle className="w-5 h-5 mr-2 text-teal-600" />
                Diagnostic Requisition Order
              </h3>
              <button 
                onClick={() => setShowOrderModal(false)}
                className="text-slate-400 hover:text-slate-600 font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateOrder} className="mt-4 space-y-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Patient Name *</label>
                <input 
                  type="text" 
                  required
                  value={newOrder.patientName}
                  onChange={(e) => setNewOrder({ ...newOrder, patientName: e.target.value })}
                  placeholder="e.g. Rameshwar Patil"
                  className="w-full border border-slate-300 rounded px-2.5 py-1.5 focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Investigation Name</label>
                <select 
                  value={newOrder.testName}
                  onChange={(e) => setNewOrder({ ...newOrder, testName: e.target.value })}
                  className="w-full border border-slate-300 rounded px-2.5 py-1.5"
                >
                  <option value="Complete Blood Count (CBC) with Differential">Complete Blood Count (CBC) with Differential</option>
                  <option value="Lipid Profile & Atherogenic Risk Index">Lipid Profile & Atherogenic Risk Index</option>
                  <option value="Comprehensive Renal Function (Urea, Creatinine, Electrolytes)">Comprehensive Renal Function Panel</option>
                  <option value="Liver Function Panel (Bilirubin, SGOT, SGPT, Alk Phos)">Liver Function Panel</option>
                  <option value="Digital Chest Radiograph (X-Ray PA View)">Digital Chest Radiograph (X-Ray PA View)</option>
                  <option value="12-Lead Electrocardiogram (ECG)">12-Lead Electrocardiogram (ECG)</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Specimen / Pathology Sub-department</label>
                <select 
                  value={newOrder.department}
                  onChange={(e) => setNewOrder({ ...newOrder, department: e.target.value })}
                  className="w-full border border-slate-300 rounded px-2.5 py-1.5"
                >
                  <option value="Hematology">Hematology</option>
                  <option value="Clinical Biochemistry">Clinical Biochemistry</option>
                  <option value="Radiology & Imaging">Radiology & Imaging</option>
                  <option value="Microbiology & Serology">Microbiology & Serology</option>
                </select>
              </div>

              <div className="flex items-center justify-end space-x-2 pt-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setShowOrderModal(false)}
                  className="px-3 py-1.5 border border-slate-300 rounded text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-teal-600 hover:bg-teal-700 text-white rounded font-bold shadow-sm"
                >
                  Generate Barcode & Order
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
