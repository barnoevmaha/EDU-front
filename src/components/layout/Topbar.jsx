import { Menu, X } from '../../icons.jsx'
import { statusLabel } from '../../utils.js'
import Avatar from '../shared/Avatar.jsx'

export default function Topbar({ nav, active, user, menuOpen, onToggleMenu, onProfile }) {
  return (
    <header className="topbar">
      <button className="burger" onClick={onToggleMenu} aria-label="Menyu">
        {menuOpen ? <X size={20} /> : <Menu size={20} />}
      </button>
      <span className="title">{nav.find((n) => n.id === active)?.label}</span>
      <button className="me" onClick={onProfile}>
        <Avatar user={user} size="sm" />
        <span className="me-text">
          <b>{user.name}</b>
          <span>{statusLabel(user)}</span>
        </span>
      </button>
    </header>
  )
}
