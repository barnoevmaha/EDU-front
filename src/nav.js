// Menyu (navbar) tuzilmasi bitta joyda. Yangi sahifa qo'shilsa shu yerga qo'shilsa
// sidebar, topbar va bottom-nav avtomatik o'zgaradi.
// `short` — telefon pastki menyusi uchun qisqa nom.
import {
  Home, Info, LayoutDashboard, Users, GraduationCap, Shield, User,
  CalendarDays, ClipboardList, Trophy,
} from './icons.jsx'

export function buildNav(user, isStaff) {
  return [
    { id: 'home', label: 'Asosiy', short: 'Bosh', Icon: Home },
    { id: 'dashboard', label: "E'lonlar", short: "E'lon", Icon: LayoutDashboard },
    { id: 'schedule', label: 'Dars jadvali', short: 'Jadval', Icon: CalendarDays },
    { id: 'homework', label: 'Topshiriqlar', short: 'Topshiriq', Icon: ClipboardList },
    { id: 'leaderboard', label: 'Reyting', short: 'Reyting', Icon: Trophy },
    ...(isStaff ? [{ id: 'student', label: "O'quvchilar", short: "O'quvchi", Icon: Users }] : []),
    { id: 'teachers', label: 'Ustozlar', short: 'Ustoz', Icon: GraduationCap },
    ...(user?.role === 'admin' ? [{ id: 'admins', label: 'Admin', short: 'Admin', Icon: Shield }] : []),
    { id: 'profile', label: 'Profil', short: 'Profil', Icon: User },
    { id: 'about', label: 'Haqida', short: 'Haqida', Icon: Info },
  ]
}
