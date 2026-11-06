import React, { useState } from 'react';
import { 
  Stethoscope, 
  User, 
  ShieldAlert, 
  Lock, 
  Mail, 
  UserCheck, 
  ArrowRight, 
  ShieldCheck, 
  AlertCircle, 
  CheckCircle2, 
  Eye, 
  EyeOff,
  Activity,
  HeartPulse,
  Building2,
  Sparkles
} from 'lucide-react';
import { loginUser, registerUser } from '../services/api';

export default function AuthPage({ onAuthSuccess }) {
  const [mode, setMode] = useState('login'); // 'login' or 'signup'
  const [selectedRole, setSelectedRole] = useState('patient'); // 'doctor', 'patient', 'admin'
  const [showPassword, setShowPassword] = useState(false);
  
  // Login form state
  const [loginForm, setLoginForm] = useState({
    usernameOrEmail: '',
    password: '',
  });

  // Signup form state
  const [signupForm, setSignupForm] = useState({
    fullName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    specialization: 'General Medicine',
    role: 'patient',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // When selectedRole tab changes in login mode
  const handleRoleTabClick = (role) => {
    setSelectedRole(role);
    setError('');
    setSuccessMsg('');
    setLoginForm({
      usernameOrEmail: '',
      password: '',
    });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if (!loginForm.usernameOrEmail || !loginForm.password) {
      setError('Please provide your username/email and password.');
      return;
    }
    setError('');
    setLoading(true);
    try {
      const authUser = await loginUser(loginForm.usernameOrEmail, loginForm.password);
      onAuthSuccess(authUser);
    } catch (err) {
      setError(err.message || 'Authentication failed. Please verify credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    if (!signupForm.fullName || !signupForm.username || !signupForm.email || !signupForm.password) {
      setError('Please complete all required fields.');
      return;
    }
    if (signupForm.password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }
    if (signupForm.password !== signupForm.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setError('');
    setLoading(true);
    try {
      const authUser = await registerUser({
        fullName: signupForm.fullName,
        username: signupForm.username,
        email: signupForm.email,
        password: signupForm.password,
        role: signupForm.role,
        specialization: signupForm.role === 'doctor' ? signupForm.specialization : undefined,
      });
      setSuccessMsg('Account registered successfully! Redirecting to your workspace...');
      setTimeout(() => {
        onAuthSuccess(authUser);
      }, 700);
    } catch (err) {
      setError(err.message || 'Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-sky-950 to-slate-900 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 text-slate-800">
      
      {/* Top Banner */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center mb-6">
        <div className="inline-flex items-center justify-center p-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-xl mb-4">
          <img 
            src="/careplus_logo.png" 
            alt="CarePlus Healthcare Logo" 
            className="h-16 w-auto object-contain"
          />
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-heading">
          Care<span className="text-sky-400">Plus</span> Portal
        </h1>
        <p className="mt-1 text-xs text-sky-200">
          Enterprise Outpatient Clinic & Electronic Medical Records (EMR)
        </p>
      </div>

      {/* Main Card */}
      <div className="sm:mx-auto sm:w-full sm:max-w-xl">
        <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
          
          {/* Auth Mode Toggle Tabs (Sign In vs Create Account) */}
          <div className="grid grid-cols-2 border-b border-slate-200 bg-slate-50 text-sm font-semibold">
            <button
              onClick={() => { setMode('login'); setError(''); setSuccessMsg(''); }}
              className={`py-3.5 text-center transition flex items-center justify-center space-x-2 ${
                mode === 'login'
                  ? 'bg-white text-brand-800 border-b-2 border-brand-700 shadow-sm'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              <UserCheck className="w-4 h-4" />
              <span>Sign In</span>
            </button>
            <button
              onClick={() => { setMode('signup'); setError(''); setSuccessMsg(''); }}
              className={`py-3.5 text-center transition flex items-center justify-center space-x-2 ${
                mode === 'signup'
                  ? 'bg-white text-brand-800 border-b-2 border-brand-700 shadow-sm'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>Create Account (Sign Up)</span>
            </button>
          </div>

          <div className="p-6 sm:p-8">
            
            {/* Error & Success Messages */}
            {error && (
              <div className="mb-5 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-start space-x-2.5">
                <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5 text-rose-600" />
                <div className="font-medium">{error}</div>
              </div>
            )}

            {successMsg && (
              <div className="mb-5 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center space-x-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <div className="font-medium">{successMsg}</div>
              </div>
            )}

            {/* ======================= MODE 1: LOGIN ======================= */}
            {mode === 'login' && (
              <div className="space-y-6">
                
                {/* Role Tabs for Login */}
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-2">
                    Select Your Role to Sign In:
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => handleRoleTabClick('patient')}
                      className={`p-2.5 rounded-xl border text-xs font-bold transition flex flex-col items-center justify-center space-y-1.5 ${
                        selectedRole === 'patient'
                          ? 'border-sky-500 bg-sky-50 text-sky-800 ring-2 ring-sky-200'
                          : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <User className="w-5 h-5 text-sky-600" />
                      <span>Patient</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleRoleTabClick('doctor')}
                      className={`p-2.5 rounded-xl border text-xs font-bold transition flex flex-col items-center justify-center space-y-1.5 ${
                        selectedRole === 'doctor'
                          ? 'border-teal-600 bg-teal-50 text-teal-900 ring-2 ring-teal-200'
                          : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <Stethoscope className="w-5 h-5 text-teal-600" />
                      <span>Doctor</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleRoleTabClick('admin')}
                      className={`p-2.5 rounded-xl border text-xs font-bold transition flex flex-col items-center justify-center space-y-1.5 ${
                        selectedRole === 'admin'
                          ? 'border-indigo-600 bg-indigo-50 text-indigo-900 ring-2 ring-indigo-200'
                          : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <ShieldAlert className="w-5 h-5 text-indigo-600" />
                      <span>Admin</span>
                    </button>
                  </div>
                </div>

                {/* Login Form */}
                <form onSubmit={handleLoginSubmit} className="space-y-4 text-xs">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Username or Healthcare Email
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      <input
                        type="text"
                        value={loginForm.usernameOrEmail}
                        onChange={(e) => setLoginForm({ ...loginForm, usernameOrEmail: e.target.value })}
                        placeholder="e.g. rahul.patil or dr.kulkarni"
                        className="w-full pl-9 pr-3 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-600 text-slate-800"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="font-semibold text-slate-700">
                        Password
                      </label>
                    </div>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={loginForm.password}
                        onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                        placeholder="••••••••"
                        className="w-full pl-9 pr-10 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-600 text-slate-800"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 bg-brand-700 hover:bg-brand-800 disabled:opacity-60 text-white font-bold rounded-xl shadow-md transition flex items-center justify-center space-x-2 text-sm"
                  >
                    <span>{loading ? 'Authenticating...' : `Sign In as ${selectedRole.toUpperCase()}`}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>

                <div className="pt-4 border-t border-slate-200 text-center">
                  <p className="text-xs text-slate-500">
                    Don't have an account yet?{' '}
                    <button
                      type="button"
                      onClick={() => { setMode('signup'); setError(''); setSuccessMsg(''); }}
                      className="text-brand-700 hover:text-brand-800 font-bold underline"
                    >
                      Register Patient or Doctor Profile
                    </button>
                  </p>
                </div>

              </div>
            )}

            {/* ======================= MODE 2: SIGN UP ======================= */}
            {mode === 'signup' && (
              <form onSubmit={handleSignupSubmit} className="space-y-4 text-xs">
                
                {/* Role Selection for Registration */}
                <div>
                  <label className="block font-semibold text-slate-700 mb-1.5">
                    Register as:
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <label 
                      className={`flex items-center p-3 rounded-xl border cursor-pointer transition ${
                        signupForm.role === 'patient'
                          ? 'border-sky-500 bg-sky-50 text-sky-900 ring-1 ring-sky-300 font-bold'
                          : 'border-slate-200 text-slate-600 hover:bg-slate-50 font-medium'
                      }`}
                    >
                      <input 
                        type="radio" 
                        name="signupRole" 
                        value="patient" 
                        checked={signupForm.role === 'patient'} 
                        onChange={() => setSignupForm({ ...signupForm, role: 'patient' })}
                        className="mr-2 text-sky-600"
                      />
                      <User className="w-4 h-4 mr-1.5 text-sky-600" />
                      <span>Citizen Patient</span>
                    </label>

                    <label 
                      className={`flex items-center p-3 rounded-xl border cursor-pointer transition ${
                        signupForm.role === 'doctor'
                          ? 'border-teal-600 bg-teal-50 text-teal-900 ring-1 ring-teal-300 font-bold'
                          : 'border-slate-200 text-slate-600 hover:bg-slate-50 font-medium'
                      }`}
                    >
                      <input 
                        type="radio" 
                        name="signupRole" 
                        value="doctor" 
                        checked={signupForm.role === 'doctor'} 
                        onChange={() => setSignupForm({ ...signupForm, role: 'doctor' })}
                        className="mr-2 text-teal-600"
                      />
                      <Stethoscope className="w-4 h-4 mr-1.5 text-teal-600" />
                      <span>Physician Doctor</span>
                    </label>
                  </div>
                </div>

                {/* Full Name */}
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Full Legal Name
                  </label>
                  <input
                    type="text"
                    value={signupForm.fullName}
                    onChange={(e) => setSignupForm({ ...signupForm, fullName: e.target.value })}
                    placeholder={signupForm.role === 'doctor' ? 'e.g. Dr. Shruti Deshmukh, MD' : 'e.g. Amit S. Sharma'}
                    className="w-full px-3 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-600 text-slate-800"
                    required
                  />
                </div>

                {/* Username & Email Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Choose Username
                    </label>
                    <input
                      type="text"
                      value={signupForm.username}
                      onChange={(e) => setSignupForm({ ...signupForm, username: e.target.value })}
                      placeholder="e.g. shruti.doc"
                      className="w-full px-3 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-600 text-slate-800"
                      required
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={signupForm.email}
                      onChange={(e) => setSignupForm({ ...signupForm, email: e.target.value })}
                      placeholder="e.g. shruti@careplus.health"
                      className="w-full px-3 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-600 text-slate-800"
                      required
                    />
                  </div>
                </div>

                {/* Specialization (if Doctor) */}
                {signupForm.role === 'doctor' && (
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Clinical Specialty / Department
                    </label>
                    <select
                      value={signupForm.specialization}
                      onChange={(e) => setSignupForm({ ...signupForm, specialization: e.target.value })}
                      className="w-full px-3 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-600 text-slate-800"
                    >
                      <option value="General Medicine">General Medicine</option>
                      <option value="Cardiology">Cardiology</option>
                      <option value="Pediatrics">Pediatrics</option>
                      <option value="Orthopedics">Orthopedics</option>
                      <option value="Gynecology & Obstetrics">Gynecology & Obstetrics</option>
                      <option value="Neurology">Neurology</option>
                    </select>
                  </div>
                )}

                {/* Password & Confirm */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Password (min 6 chars)
                    </label>
                    <input
                      type="password"
                      value={signupForm.password}
                      onChange={(e) => setSignupForm({ ...signupForm, password: e.target.value })}
                      placeholder="••••••••"
                      className="w-full px-3 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-600 text-slate-800"
                      required
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      value={signupForm.confirmPassword}
                      onChange={(e) => setSignupForm({ ...signupForm, confirmPassword: e.target.value })}
                      placeholder="••••••••"
                      className="w-full px-3 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-600 text-slate-800"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-brand-700 hover:bg-brand-800 disabled:opacity-60 text-white font-bold rounded-xl shadow-md transition flex items-center justify-center space-x-2 text-sm mt-2"
                >
                  <span>{loading ? 'Creating Account in Database...' : 'Register & Launch Portal'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}

          </div>

          {/* Footer Security Badge */}
          <div className="bg-slate-50 px-6 py-3 border-t border-slate-200 text-center text-[11px] text-slate-500 flex items-center justify-center space-x-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>256-Bit TLS Encryption • HIPAA & ABHA Compliant Data Protection</span>
          </div>

        </div>
      </div>

    </div>
  );
}

