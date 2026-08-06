// Hamma joyda ishlatiladigan profil rasmi.
// Rasm bo'lmasa ism bosh harflari ko'rinadi (Telegramdagi kabi).
import { initials } from '../../utils.js'

export default function Avatar({ user, name, size = '' }) {
  const who = user || { name: name || '', avatar: '' }
  if (who.avatar) {
    return <img className={`avatar ${size}`} src={who.avatar} alt={who.name} />
  }
  return <span className={`avatar ${size}`}>{initials(who.name)}</span>
}
