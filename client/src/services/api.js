const API_BASE = '/api/v1';

export const DEMO_CREDENTIALS = {
  admin: { usernameOrEmail: 'admin', password: 'admin123', name: 'Chief Health Administrator', role: 'ROLE_ADMIN' },
  doctor: { usernameOrEmail: 'dr.kulkarni', password: 'doctor123', name: 'Dr. Vivek Kulkarni', role: 'ROLE_DOCTOR' },
  patient: { usernameOrEmail: 'rahul.patil', password: 'patient123', name: 'Rahul Narayan Patil', role: 'ROLE_PATIENT' },
};

const STORAGE_KEY = 'careplus_auth_user';

export function getStoredUser() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function setStoredUser(user) {
  try {
    if (user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  } catch (e) {
    console.error('Storage error', e);
  }
}

export async function loginUser(usernameOrEmail, password) {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ usernameOrEmail, password }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: 'Invalid credentials' }));
    throw new Error(err.message || 'Login failed. Please check your credentials.');
  }

  const data = await res.json();
  // Map backend ROLE_DOCTOR -> 'doctor', ROLE_PATIENT -> 'patient', ROLE_ADMIN -> 'admin'
  let roleCode = 'patient';
  if (data.role === 'ROLE_DOCTOR') roleCode = 'doctor';
  else if (data.role === 'ROLE_ADMIN') roleCode = 'admin';

  const authUser = {
    ...data,
    roleKey: roleCode,
  };
  setStoredUser(authUser);
  return authUser;
}

export async function registerUser({ username, email, password, fullName, role, specialization }) {
  const backendRole = role === 'doctor' ? 'ROLE_DOCTOR' : (role === 'admin' ? 'ROLE_ADMIN' : 'ROLE_PATIENT');

  const res = await fetch(`${API_BASE}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username,
      email,
      password,
      fullName,
      role: backendRole,
      specialization,
    }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: 'Registration failed' }));
    throw new Error(err.message || 'Registration failed.');
  }

  const data = await res.json();
  let roleCode = 'patient';
  if (data.role === 'ROLE_DOCTOR') roleCode = 'doctor';
  else if (data.role === 'ROLE_ADMIN') roleCode = 'admin';

  const authUser = {
    ...data,
    roleKey: roleCode,
  };
  setStoredUser(authUser);
  return authUser;
}

export function logoutUser() {
  setStoredUser(null);
}

export function getAuthHeader() {
  const user = getStoredUser();
  return user?.accessToken ? { Authorization: `Bearer ${user.accessToken}` } : {};
}

export async function getFacilityMetrics() {
  try {
    const res = await fetch(`${API_BASE}/admin/metrics`, {
      headers: getAuthHeader(),
    });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

export async function getAvailableSlots(doctorId = '11111111-1111-1111-1111-111111111111') {
  try {
    const res = await fetch(`${API_BASE}/appointments/slots/${doctorId}`, {
      headers: getAuthHeader(),
    });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

export async function bookAppointment(slotId, reason, patientId) {
  const user = getStoredUser();
  const pid = patientId || user?.userId || '22222222-2222-2222-2222-222222222222';

  const res = await fetch(`${API_BASE}/appointments/book?patientId=${pid}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeader(),
    },
    body: JSON.stringify({ slotId, reason }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || 'Slot reservation failed.');
  }
  return await res.json();
}
