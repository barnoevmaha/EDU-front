import { useEffect, useState } from 'react'
import {
  ClipboardList, Plus, Trash2, CheckCircle2, Circle, CalendarDays, BookOpen,
} from '../../icons.jsx'
import { api } from '../../api.js'
import { useAuth } from '../../context/AuthContext.jsx'

const EMPTY = { title: '', group: '', subject: '', text: '', deadline: '' }

export default function Homework() {
  const { user, isStaff } = useAuth()
  const [list, setList] = useState([])
  const [form, setForm] = useState(EMPTY)
  const [msg, setMsg] = useState('')
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    api.homeworks(isStaff ? 0 : user.id).then(setList).catch(() => {})
  }, [isStaff, user.id])

  async function add(e) {
    e.preventDefault()
    setMsg('')
    if (!form.title.trim()) { setMsg('Topshiriq nomi yozing'); return }
    setBusy(true)
    try {
      const fresh = await api.addHomework({ ...form, author: user.name })
      setList(fresh)
      setForm(EMPTY)
      setMsg('Topshiriq e\'lon qilindi ✓')
    } catch (err) {
      setMsg(err.message)
    }
    setBusy(false)
  }

  async function remove(id) {
    setList(await api.delHomework(id, user.name))
  }

  async function toggle(hw) {
    setBusy(true)
    try {
      await api.setDone(hw.id, { student_id: user.id, student_name: user.name, done: !hw.done })
      setList(await api.homeworks(user.id))
    } catch (err) {
      setMsg(err.message)
    }
    setBusy(false)
  }

  return (
    <div className="stack">
      {isStaff && (
        <form className="card" onSubmit={add}>
          <h3><Plus size={16} /> Yangi topshiriq</h3>
          <div className="grid2">
            <label className="field wide"><span>Nomi</span>
              <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="Masalan: 6-sinf matematika ishi" required />
            </label>
            <label className="field"><span>Fan</span>
              <input value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })}
                placeholder="Matematika" />
            </label>
            <label className="field"><span>Guruh</span>
              <input value={form.group} onChange={(e) => setForm({ ...form, group: e.target.value })}
                placeholder="Hamma guruh uchun bo'lsa bo'sh" />
            </label>
            <label className="field"><span>Muddat</span>
              <input type="date" value={form.deadline} onChange={(e) => setForm({ ...form, deadline: e.target.value })} />
            </label>
            <label className="field wide"><span>Topshiriq matni</span>
              <textarea rows={3} value={form.text} onChange={(e) => setForm({ ...form, text: e.target.value })}
                placeholder="Nima qilish kerakligini yozing…" />
            </label>
          </div>
          {msg && <div className="notice">{msg}</div>}
          <button className="btn" disabled={busy}><Plus size={15} /> E'lon qilish</button>
        </form>
      )}

      {list.length === 0 && <div className="card muted">Hozircha topshiriqlar yo'q.</div>}

      {list.map((hw) => (
        <article className={`card post ${hw.done ? 'done' : ''}`} key={hw.id}>
          <header>
            <div className="grow">
              <b>{hw.title}</b>
              <div className="muted sm">
                {hw.subject && <span className="tag"><BookOpen size={11} /> {hw.subject}</span>}
                {hw.group && <span className="tag">{hw.group}</span>}
                {hw.deadline && <span className="tag"><CalendarDays size={11} /> {hw.deadline}</span>}
                {hw.author && <span className="muted"> · {hw.author}</span>}
              </div>
            </div>
            {isStaff && (
              <button className="icon" title="O'chirish" onClick={() => remove(hw.id)}>
                <Trash2 size={15} />
              </button>
            )}
          </header>

          {hw.text && <p className="post-text">{hw.text}</p>}

          {isStaff ? (
            <div className="row between wrap">
              <span className="tag">
                {hw.done_count} / {hw.total_count || 0} bajarildi
              </span>
              {(hw.done_by || []).length > 0 && (
                <span className="muted sm">Bajardi: {hw.done_by.join(', ')}</span>
              )}
            </div>
          ) : (
            <button
              className={`btn ${hw.done ? 'ghost' : ''}`}
              disabled={busy}
              onClick={() => toggle(hw)}
            >
              {hw.done
                ? <><CheckCircle2 size={15} /> Bajardim (boshqa o'chirish uchun bosing)</>
                : <><Circle size={15} /> Bajardim deb belgilash</>}
            </button>
          )}
        </article>
      ))}
    </div>
  )
}
