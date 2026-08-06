export default function BottomNav({ nav, active, onNav }) {
  return (
    <nav className="bottomnav">
      {nav.slice(0, 5).map((n) => (
        <button key={n.id} className={active === n.id ? 'active' : ''} onClick={() => onNav(n.id)}>
          <n.Icon size={19} />
          <span>{n.short || n.label}</span>
        </button>
      ))}
    </nav>
  )
}
