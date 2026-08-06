// Oddiy SVG iconlar. Hech qanday kutubxona kerak emas —
// shuning uchun internet yoki npm paket bo'lmasa ham iconlar doim ko'rinadi.
import React from 'react'

function make(children) {
  return function Icon({ size = 18, color = 'currentColor', ...rest }) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...rest}
      >
        {children}
      </svg>
    )
  }
}

export const Home = make(<><path d="M3 10.5 12 3l9 7.5" /><path d="M5 9.5V21h14V9.5" /></>)
export const Info = make(<><circle cx="12" cy="12" r="9" /><path d="M12 11v5M12 8h.01" /></>)
export const LayoutDashboard = make(<><rect x="3" y="3" width="7" height="8" rx="1" /><rect x="14" y="3" width="7" height="5" rx="1" /><rect x="14" y="11" width="7" height="10" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /></>)
export const Users = make(<><circle cx="9" cy="8" r="3.2" /><path d="M3 20c0-3.3 2.7-5.5 6-5.5s6 2.2 6 5.5" /><path d="M17 20c0-2.6-1-4.4-2.5-5.4M16 5.2a3.2 3.2 0 0 1 0 5.6" /></>)
export const Users2 = Users
export const Shield = make(<><path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" /></>)
export const User = make(<><circle cx="12" cy="8" r="3.5" /><path d="M4.5 20c0-3.6 3.3-6 7.5-6s7.5 2.4 7.5 6" /></>)
export const UserCheck = make(<><circle cx="9" cy="8" r="3.5" /><path d="M2.5 20c0-3.4 2.9-6 6.5-6 1.3 0 2.5.3 3.5.9" /><path d="m15.5 16.5 2 2 4-4" /></>)
export const UserPlus = make(<><circle cx="9" cy="8" r="3.5" /><path d="M2.5 20c0-3.4 2.9-6 6.5-6 1 0 2 .2 2.9.5" /><path d="M18 13v6M15 16h6" /></>)
export const GraduationCap = make(<><path d="M2 9l10-4 10 4-10 4L2 9z" /><path d="M6 11v5c0 1.3 2.7 2.5 6 2.5s6-1.2 6-2.5v-5" /></>)
export const BookOpen = make(<><path d="M12 6.5C10.5 5 8.3 4.5 3 4.5V19c5.3 0 7.5.6 9 2 1.5-1.4 3.7-2 9-2V4.5c-5.3 0-7.5.5-9 2z" /><path d="M12 6.5V21" /></>)
export const LogOut = make(<><path d="M9 4H5.5A1.5 1.5 0 0 0 4 5.5v13A1.5 1.5 0 0 0 5.5 20H9" /><path d="M15 8l4 4-4 4M19 12H9" /></>)
export const KeyRound = make(<><circle cx="8" cy="12" r="4" /><path d="M12 12h9l-2 2 2 2" /></>)
export const Clock = make(<><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>)
export const Clock3 = Clock
export const RefreshCw = make(<><path d="M20 11a8 8 0 0 0-13.7-4.6L3 9" /><path d="M4 13a8 8 0 0 0 13.7 4.6L21 15" /><path d="M3 5v4h4M21 19v-4h-4" /></>)
export const Check = make(<path d="m5 13 4 4 10-10" />)
export const CheckCircle2 = make(<><circle cx="12" cy="12" r="9" /><path d="m8 12 3 3 5-6" /></>)
export const BadgeCheck = make(<><path d="M12 3l2.2 1.7 2.8-.2.6 2.7 2.2 1.7-1.3 2.5 1.3 2.5-2.2 1.7-.6 2.7-2.8-.2L12 21l-2.2-1.7-2.8.2-.6-2.7L4.2 15l1.3-2.5L4.2 10l2.2-1.7.6-2.7 2.8.2L12 3z" /><path d="m9 12 2 2 4-4" /></>)
export const X = make(<path d="M6 6l12 12M18 6 6 18" />)
export const Trash2 = make(<><path d="M4 7h16M9 7V5h6v2" /><path d="M6 7l1 13h10l1-13" /><path d="M10 11v6M14 11v6" /></>)
export const Save = make(<><path d="M5 4h11l3 3v13H5z" /><path d="M8 4v5h7V4M8 20v-6h8v6" /></>)
export const Send = make(<><path d="M21 3 3 10.5l7 3 3 7L21 3z" /><path d="m10 13.5 4.5-4.5" /></>)
export const Megaphone = make(<><path d="M3 10v4l12 5V5L3 10z" /><path d="M15 8a3.5 3.5 0 0 1 0 8" /><path d="M6 15v4h3v-3" /></>)
export const MessageSquare = make(<path d="M4 5h16v11H9l-5 4V5z" />)
export const Coins = make(<><ellipse cx="9" cy="7" rx="6" ry="3" /><path d="M3 7v5c0 1.7 2.7 3 6 3s6-1.3 6-3V7" /><path d="M15 12.5c2.9-.3 6-1.5 6-3v5c0 1.7-2.7 3-6 3-1.3 0-2.5-.2-3.5-.6" /></>)
export const Award = make(<><circle cx="12" cy="9" r="5" /><path d="m8.5 13.5-1 7.5 4.5-2.5 4.5 2.5-1-7.5" /></>)
export const Target = make(<><circle cx="12" cy="12" r="8.5" /><circle cx="12" cy="12" r="4.5" /><circle cx="12" cy="12" r="1" /></>)
export const Sparkles = make(<><path d="M12 3.5 13.6 8 18 9.5 13.6 11 12 15.5 10.4 11 6 9.5 10.4 8 12 3.5z" /><path d="M18.5 16.5l.7 1.8 1.8.7-1.8.7-.7 1.8-.7-1.8-1.8-.7 1.8-.7.7-1.8z" /></>)
export const Zap = make(<path d="M13 2 4 14h7l-1 8 9-12h-7l1-8z" />)
export const MapPin = make(<><path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11z" /><circle cx="12" cy="10" r="2.6" /></>)
export const Phone = make(<path d="M6 3h3l2 5-2.5 1.5a12 12 0 0 0 6 6L16 13l5 2v3a2 2 0 0 1-2.2 2C10.6 19.4 4.6 13.4 4 5.2A2 2 0 0 1 6 3z" />)
export const CalendarCheck = make(<><rect x="3.5" y="5" width="17" height="16" rx="2" /><path d="M8 3v4M16 3v4M3.5 10h17" /><path d="m9 15 2.2 2.2L15.5 13" /></>)
export const ArrowRight = make(<path d="M4 12h15m-6-6 6 6-6 6" />)
export const History = make(<><path d="M3.5 12a8.5 8.5 0 1 0 2.6-6.1L3 9" /><path d="M3 5v4h4" /><path d="M12 8v4.5l3 1.8" /></>)
export const Eye = make(<><path d="M2 12s3.8-6 10-6 10 6 10 6-3.8 6-10 6-10-6-10-6z" /><circle cx="12" cy="12" r="2.8" /></>)
export const Menu = make(<path d="M4 7h16M4 12h16M4 17h16" />)
export const ImagePlus = make(<><rect x="3" y="4" width="14" height="14" rx="2" /><circle cx="8" cy="9" r="1.6" /><path d="m3.5 16 4-4 4 3.5" /><path d="M19 3v6M16 6h6" /></>)
export const Camera = make(<><path d="M3 8h3l1.5-2h9L18 8h3v12H3z" /><circle cx="12" cy="13.5" r="3.8" /></>)
export const Film = make(<><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M7 4v16M17 4v16M3 12h18M3 8h4M17 8h4M3 16h4M17 16h4" /></>)
export const Home2 = Home
export const Star = make(<path d="m12 3.5 2.6 5.4 5.9.8-4.3 4.1 1.1 5.9L12 16.9 6.7 19.7l1.1-5.9L3.5 9.7l5.9-.8L12 3.5z" />)
export const MapHouse = MapPin
export const Layers = make(<><path d="m12 3 9 5-9 5-9-5 9-5z" /><path d="m3 13 9 5 9-5" /></>)
export const Wallet = make(<><rect x="3" y="6" width="18" height="13" rx="3" /><path d="M3 10h18" /><circle cx="17" cy="14" r="1.3" /></>)
export const Search = make(<><circle cx="11" cy="11" r="6.5" /><path d="m16 16 4.5 4.5" /></>)
export const CalendarDays = make(<><rect x="3.5" y="5" width="17" height="16" rx="2" /><path d="M8 3v4M16 3v4M3.5 10h17" /><path d="M8 14h.01M12 14h.01M16 14h.01M8 17.5h.01M12 17.5h.01" /></>)
export const ClipboardList = make(<><rect x="5" y="4" width="14" height="17" rx="2" /><path d="M9 4h6M9 2.5h6V4H9z" /><path d="M9 11h6M9 15h4" /></>)
export const Trophy = make(<><path d="M7 4h10v4a5 5 0 0 1-10 0V4z" /><path d="M7 6H4v2a3 3 0 0 0 3 3M17 6h3v2a3 3 0 0 1-3 3" /><path d="M12 13v3M9 20h6M10 16h4l1 4H9l1-4z" /></>)
export const Medal = make(<><path d="M8.5 3 12 8l3.5-5M6 21h12" /><circle cx="12" cy="13.5" r="5.5" /><path d="m10 14 1.5 1.5L15 12.5" /></>)
export const Pencil = make(<><path d="M17 3l4 4L8 20l-5 1 1-5L17 3z" /></>)
export const Plus = make(<path d="M12 5v14M5 12h14" />)
export const Circle = make(<circle cx="12" cy="12" r="8.5" />)
export const DoorOpen = make(<><path d="M4 21V4a1 1 0 0 1 1-1h11a1 1 0 0 1 1 1v17" /><path d="M8 21V9h8v12" /><path d="M4 21h16" /></>)
