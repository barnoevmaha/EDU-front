import { GraduationCap, Phone } from '../../icons.jsx'
import { api } from '../../api.js'
import { useFetch } from '../../hooks/useFetch.js'
import Avatar from '../shared/Avatar.jsx'

export default function Teachers() {
  const { data, loading } = useFetch(() => api.users('teacher'), [])
  const list = data || []

  return (
    <div className="card">
      <h3><GraduationCap size={16} /> Ustozlar</h3>
      {loading && <p className="muted">Yuklanmoqda…</p>}
      <div className="grid3">
        {list.map((t) => (
          <div className="mini person" key={t.id}>
            <Avatar user={t} />
            <b>{t.name}</b>
            <span className="muted sm">{t.group || "Umumiy yo'nalish"}</span>
            {t.phone && <span className="tag"><Phone size={12} /> {t.phone}</span>}
          </div>
        ))}
      </div>
      {!loading && list.length === 0 && <p className="muted">Hozircha ustozlar ro'yxati bo'sh.</p>}
    </div>
  )
}