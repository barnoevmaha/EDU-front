import { useEffect, useState } from 'react'
import {
  CalendarDays, Plus, Trash2, Clock, Users, DoorOpen, BookOpen,
} from '../../icons.jsx'
import { api } from '../../api.js'
import { useAuth } from '../../context/AuthContext.jsx'

const DAYS = ['Dushanba', 'Seshanba', 'Chorshanba', 'Payshanba', 'Juma', 'Shanba']

const EMPTY = { day: 'Dushanba', time: '', subject: '', group: '', teacher: '', room: '' }

export default function Schedule() {
  const { user, isStaff } = useAuth()
  const [rows, setRows] = useState([])
  const [form, setForm] = useState(EMPTY)
  const [msg, setMsg] = useState('')

  useEffect(() => {
    api.schedule().then(setRows).catch(() => {})
  }, [])

  async function add(e) {
    e.preventDefault()
    setMsg('')
    try {
      const fresh = await api.addLesson({ ...form, teacher: user.name })
      setRows(fresh)
      setForm(EMPTY)
      setMsg('Dars qo\'shildi ✓')
    } catch (err) {
      setMsg(err.message)
    }
  }

  async function remove(id) {
    setRows(await api.delLesson(id))
  }

  const grouped = DAYS.map((day) => ({
    day,
    lessons: rows.filter((r) => r.day === day),
  })).filter((g) => g.lessons.length > 0)

  return (
    <div className="stack">
      {isStaff && (
        <form className="card" onSubmit={add}>
          <h3><Plus size={16} /> Dars qo'shish</h3>
          <div className="grid2">
            <label className="field">
              <span>Kun</span>
              <select value={form.day} onChange={(e) => setForm({ ...form, day: e.target.value })}>
                {DAYS.map((d) => <option key={d}>{d}</option>)}
              </select>
            </label>
            <label className="field">
              <span>Vaqt (masalan: 14:00 - 15:30)</span>
              <input value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })}
                placeholder="14:00 - 15:30" required />
            </label>
            <label className="field">
              <span>Fan</span>
              <input value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })}
                placeholder="Ingliz tili" required />
            </label>
            <label className="field">
              <span>Guruh</span>
              <input value={form.group} onChange={(e) => setForm({ ...form, group: e.target.value })}
                placeholder="4.16 Backend" />
            </label>
            <label className="field">
              <span>Xona</span>
              <input value={form.room} onChange={(e) => setForm({ ...form, room: e.target.value })}
                placeholder="Xona 3" />
            </label>
          </div>
          {msg && <div className="notice">{msg}</div>}
          <button className="btn"><Plus size={15} /> Saqlash</button>
        </form>
      )}

      <div className="card">
        <h3><CalendarDays size={16} /> Dars jadvali</h3>
        {rows.length === 0 && <p className="muted">Hozircha jadval bo'sh.</p>}

        <div className="schedule">
          {grouped.map((g) => (
            <div className="sched-day" key={g.day}>
              <h4>{g.day}</h4>
              <div className="sched-list">
                {g.lessons.map((r) => (
                  <div className="sched-item" key={r.id}>
                    <div className="sched-time">
                      <span className="tag"><Clock size={11} /> {r.time || 'Vaqt kiritilmagan'}</span>
                      {isStaff && (
                        <button className="icon" title="O'chirish" onClick={() => remove(r.id)}>
                          <Trash2 size={14} />
                        </button>
                      )}
                    </div>
                    <b className="sched-subject"><BookOpen size={14} /> {r.subject}</b>
                    <div className="muted sm sched-meta">
                      {r.group && <span><Users size={11} /> {r.group}</span>}
                      {r.teacher && <span>{r.teacher}</span>}
                      {r.room && <span><DoorOpen size={11} /> {r.room}</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}