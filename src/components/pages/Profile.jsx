import { useRef, useState } from 'react'
import { User, Coins, BadgeCheck, LogOut, MapPin, Camera, Trash2 } from '../../icons.jsx'
import { roleLabel, statusLabel, fileToDataUrl } from '../../utils.js'
import { api } from '../../api.js'
import { useAuth } from '../../context/AuthContext.jsx'
import Avatar from '../shared/Avatar.jsx'

export default function Profile({ onLogout }) {
  const { user, refresh } = useAuth()
  const [msg, setMsg] = useState('')
  const [busy, setBusy] = useState(false)
  const fileRef = useRef(null)

  async function pick(e) {
    const f = e.target.files?.[0]
    if (!f) return
    if (f.size > 4 * 1024 * 1024) {
      setMsg('Rasm 4MB dan katta. Kichikroq tanlang.')
      e.target.value = ''
      return
    }
    setBusy(true)
    setMsg('')
    try {
      const fresh = await api.setAvatar(user.id, await fileToDataUrl(f))
      await refresh()
      setMsg(`Rasm yangilandi ✓ (${fresh.name})`)
    } catch (err) {
      setMsg(err.message)
    }
    setBusy(false)
    e.target.value = ''
  }

  async function remove() {
    if (!user.avatar) return
    setBusy(true)
    setMsg('')
    try {
      await api.setAvatar(user.id, '')
      await refresh()
      setMsg('Rasm olib tashlandi')
    } catch (err) {
      setMsg(err.message)
    }
    setBusy(false)
  }

  const rows = [
    ['Rol', roleLabel(user.role)],
    ['Status', statusLabel(user)],
    ['Guruh', user.group || '—'],
    ['Yoshi', user.age || '—'],
    ['Telefon', user.phone || '—'],
    ['Ota-ona', user.parents || '—'],
    ['Ota-ona telefoni', user.parent_phone || '—'],
    ['Yashash joyi', user.address || '—'],
  ]

  return (
    <div className="stack">
      <div className="card profile">
        <button className="avatar-wrap" onClick={() => fileRef.current.click()} title="Rasmni o'zgartirish">
          <Avatar user={user} size="big" />
          <span className="avatar-badge"><Camera size={14} /></span>
        </button>
        <input ref={fileRef} type="file" accept="image/*" hidden onChange={pick} />
        <div>
          <h3>{user.name}</h3>
          <div className="row wrap">
            <span className="tag"><BadgeCheck size={13} /> {statusLabel(user)}</span>
            {user.role === 'student' && <span className="tag"><Coins size={13} /> {user.coins || 0} coin</span>}
            {user.address && <span className="tag"><MapPin size={12} /> {user.address}</span>}
          </div>
          {msg && <div className="notice sm">{msg}</div>}
          <div className="row">
            <button className="chipbtn" disabled={busy} onClick={() => fileRef.current.click()}>
              <Camera size={13} /> Rasm yuklash
            </button>
            {user.avatar && (
              <button className="chipbtn bad" disabled={busy} onClick={remove}>
                <Trash2 size={13} /> O'chirish
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="card">
        <h3><User size={16} /> Ma'lumotlar</h3>
        <table className="table">
          <tbody>
            {rows.map(([k, v]) => (
              <tr key={k}><td className="muted">{k}</td><td>{v}</td></tr>
            ))}
          </tbody>
        </table>
      </div>

      <button className="btn danger" onClick={onLogout}><LogOut size={15} /> Chiqish</button>
    </div>
  )
}