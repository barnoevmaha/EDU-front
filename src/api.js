// Backend bilan gaplashadigan yagona joy.
// Bironta joyda fetch yozib yurmaslik uchun hammasi shu yerga yig'ilgan.
//
// Lokal: VITE_API_URL bo'sh -> xuddi shu origin /api (vite proxy ishlaydi).
// Vercel: VITE_API_URL = Railway URL (masalan https://edu-back.up.railway.app)
//         -> API so'rovlari o'sha serverga boradi.
// Railway: VITE_API_URL bo'sh -> backend frontendni ham serve qiladi, hammasi bir joyda.

const API_ROOT = (import.meta.env.VITE_API_URL || '').replace(/\/+$/, '')
const BASE = API_ROOT + '/api'

async function request(path, method = 'GET', body) {
  const res = await fetch(BASE + path, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
  })

  // Server ba'zan bo'sh javob qaytarishi mumkin - shuning uchun catch qo'ydik.
  const data = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(data.detail || 'Serverda xatolik yuz berdi')
  return data
}

export const api = {
  login: (payload) => request('/login', 'POST', payload),
  me: (id) => request(`/users/${id}`),

  users: (role) => request('/users' + (role ? `?role=${role}` : '')),
  setStatus: (id, status) => request(`/users/${id}/status`, 'POST', { status }),
  removeUser: (id) => request(`/users/${id}`, 'DELETE'),
  removeGroup: (group) => request(`/groups/${encodeURIComponent(group)}`, 'DELETE'),
  saveStudent: (payload) => request('/students', 'POST', payload),
  coins: (id, delta) => request(`/students/${id}/coins`, 'POST', { delta }),
  setAvatar: (id, avatar) => request(`/users/${id}/avatar`, 'POST', { avatar }),
  logins: () => request('/logins'),
  stats: () => request('/stats'),
  leaderboard: () => request('/leaderboard'),

  attendance: (date) => request(`/attendance?date=${date}`),
  mark: (payload) => request('/attendance', 'POST', payload),
  myAttendance: (id) => request(`/attendance/student/${id}`),

  posts: () => request('/posts'),
  addPost: (payload) => request('/posts', 'POST', payload),
  delPost: (id, user) =>
    request(`/posts/${id}?by_name=${encodeURIComponent(user.name)}&by_role=${encodeURIComponent(user.role)}`, 'DELETE'),
  comment: (id, payload) => request(`/posts/${id}/comments`, 'POST', payload),

  schedule: (group) => request('/schedule' + (group ? `?group=${group}` : '')),
  addLesson: (payload) => request('/schedule', 'POST', payload),
  delLesson: (id) => request(`/schedule/${id}`, 'DELETE'),

  homeworks: (stu) => request('/homeworks' + (stu ? `?stu=${stu}` : '')),
  addHomework: (payload) => request('/homeworks', 'POST', payload),
  delHomework: (id, name) => request(`/homeworks/${id}?by_name=${encodeURIComponent(name)}`, 'DELETE'),
  setDone: (id, payload) => request(`/homeworks/${id}/submit`, 'POST', payload),
}