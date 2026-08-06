import { Shield, UserCheck, Trash2, History, RefreshCw } from '../../icons.jsx'
import { api } from '../../api.js'
import { useFetch } from '../../hooks/useFetch.js'
import { roleLabel } from '../../utils.js'

const STATUSES = [
  { id: 'viewer', label: 'Tomoshabin' },
  { id: 'student', label: "O'quvchi" },
  { id: 'blocked', label: 'Bloklangan' },
]

function label(status) {
  if (status === 'student') return "O'quvchi"
  if (status === 'blocked') return 'Bloklangan'
  if (status === 'active') return 'Faol'
  return 'Tomoshabin'
}

function tone(status) {
  if (status === 'student' || status === 'active') return 'ok'
  if (status === 'blocked') return 'bad'
  return 'warn'
}

export default function Admins() {
  const users = useFetch(() => api.users(), [])
  const logins = useFetch(() => api.logins(), [])

  async function change(id, status) {
    await api.setStatus(id, status)
    users.reload()
  }

  return (
    <div className="stack">
      <div className="card">
        <h3><Shield size={16} /> Foydalanuvchilar boshqaruvi</h3>
        <p className="muted sm">
          Yangi o'quvchi avval <b>Tomoshabin</b> bo'ladi. Uni <b>O'quvchi</b> qilsangiz,
          profilida "O'quvchi" deb chiqadi.
        </p>
        <div className="scroll">
          <table className="table">
            <thead><tr><th>Ism</th><th>Rol</th><th>Status</th><th>Amal</th></tr></thead>
            <tbody>
              {(users.data || []).map((u) => (
                <tr key={u.id}>
                  <td>{u.name}<div className="muted sm">{u.phone || '—'}</div></td>
                  <td>{roleLabel(u.role)}</td>
                  <td><span className={`badge ${tone(u.status)}`}>{label(u.status)}</span></td>
                  <td>
                    <div className="row wrap">
                      {STATUSES.map((s) => (
                        <button key={s.id}
                          className={`chipbtn ${u.status === s.id ? 'ok' : ''}`}
                          onClick={() => change(u.id, s.id)}>
                          <UserCheck size={13} /> {s.label}
                        </button>
                      ))}
                      <button className="chipbtn bad"
                        onClick={async () => { await api.removeUser(u.id); users.reload() }}>
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {(users.data || []).length === 0 && (
                <tr><td colSpan={4} className="muted">Bo'sh</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card">
        <div className="row between">
          <h3><History size={16} /> Saytga kirganlar</h3>
          <button className="chipbtn" onClick={logins.reload}><RefreshCw size={13} /> Yangilash</button>
        </div>
        <div className="scroll">
          <table className="table">
            <thead><tr><th>Ism</th><th>Rol</th><th>Status</th><th>Vaqt</th></tr></thead>
            <tbody>
              {(logins.data || []).map((l) => (
                <tr key={l.id}>
                  <td>{l.name}</td>
                  <td>{roleLabel(l.role)}</td>
                  <td><span className={`badge ${tone(l.status)}`}>{label(l.status)}</span></td>
                  <td className="muted sm nowrap">{l.at}</td>
                </tr>
              ))}
              {(logins.data || []).length === 0 && (
                <tr><td colSpan={4} className="muted">Hali hech kim kirmagan</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}