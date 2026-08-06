import { GraduationCap, LogOut } from '../../icons.jsx'

export default function Sidebar({ nav, active, onNav, onLogout, open, onClose }) {
  return (
    <aside className={`sidebar ${open ? 'open' : ''}`}>
      <div className="brand">
        <span className="mark"><GraduationCap size={20} /></span> EduCenter
      </div>
      {nav.map((n) => (
        <button
          key={n.id}
          className={`side ${active === n.id ? 'active' : ''}`}
          onClick={() => onNav(n.id)}
        >
          <n.Icon size={18} /> {n.label}
        </button>
      ))}
      <button className="side out" onClick={onLogout}>
        <LogOut size={18} /> Chiqish
      </button>
    </aside>
  )
}
