import { useEffect, useState } from 'react'
import { UserPlus, Coins, Save, Check, Clock3, X, Search, MapPin, Phone, Trash2, Users } from '../../icons.jsx'
import { api } from '../../api.js'
import { useAuth } from '../../context/AuthContext.jsx'

const today = () => new Date().toISOString().slice(0, 10)

const EMPTY = {
  name: '', group: '', age: '',
  parents: '', parent_phone: '', phone: '', address: '',
}

// Ustoz va admin uchun: o'quvchi qo'shish + yo'qlama jadvali.
export default function Student() {
  const { user } = useAuth()
  const [list, setList] = useState([])
  const [marks, setMarks] = useState({})
  const [date, setDate] = useState(today())
  const [form, setForm] = useState(EMPTY)
  const [search, setSearch] = useState('')
  const [msg, setMsg] = useState('')
  const [open, setOpen] = useState(null) // ochilgan o'quvchi kartochkasi
  const [confirm, setConfirm] = useState(null) // { type: 'student' | 'group', id?, name, count? }

  async function load(day = date) {
    setList(await api.users('student'))
    setMarks(await api.attendance(day))
  }

  useEffect(() => {
    load(date).catch(() => {})
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date])

  async function delStudent() {
    const s = confirm
    setConfirm(null)
    setMsg('')
    try {
      await api.removeUser(s.id)
      setMsg(`"${s.name}" o'chirildi ✓`)
      load()
    } catch (err) {
      setMsg(err.message)
    }
  }

  async function delGroup() {
    const g = confirm
    setConfirm(null)
    setMsg('')
    try {
      const res = await api.removeGroup(g.name)
      setMsg(`"${g.name}" guruhi (${res.deleted} o'quvchi) o'chirildi ✓`)
      load()
    } catch (err) {
      setMsg(err.message)
    }
  }

  async function addStudent(e) {
    e.preventDefault()
    setMsg('')
    try {
      await api.saveStudent({ ...form, added_by: user.name })
      setForm(EMPTY)
      setMsg("O'quvchi saqlandi ✓")
      load()
    } catch (err) {
      setMsg(err.message)
    }
  }

  async function mark(id, status, coins) {
    setMarks(await api.mark({ date, student_id: id, status, coins, by: user.name }))
    setList(await api.users('student'))
  }

  const shown = list.filter((s) =>
    s.name.toLowerCase().includes(search.trim().toLowerCase()),
  )

  const groups = [...new Set(list.map((s) => s.group).filter(Boolean))].sort()

  return (
    <div className="stack">
      <form className="card" onSubmit={addStudent}>
        <h3><UserPlus size={16} /> O'quvchi qo'shish</h3>
        <p className="muted sm">Ism majburiy, qolgan maydonlarni keyin ham to'ldirsangiz bo'ladi.</p>
        <div className="grid2">
          <Field label="Ism familiya" required value={form.name} on={(v) => setForm({ ...form, name: v })} />
          <Field label="Guruh" value={form.group} on={(v) => setForm({ ...form, group: v })} />
          <Field label="Yoshi" value={form.age} on={(v) => setForm({ ...form, age: v })} />
          <Field label="O'quvchi telefoni" value={form.phone} on={(v) => setForm({ ...form, phone: v })} />
          <Field label="Ota-ona ismi" value={form.parents} on={(v) => setForm({ ...form, parents: v })} />
          <Field label="Ota-ona telefoni" value={form.parent_phone} on={(v) => setForm({ ...form, parent_phone: v })} />
          <Field label="Yashash joyi" wide value={form.address} on={(v) => setForm({ ...form, address: v })} />
        </div>
        {msg && <div className="notice">{msg}</div>}
        <button className="btn"><Save size={15} /> Saqlash</button>
      </form>

      <div className="card">
        <div className="row between wrap">
          <h3><Users size={16} /> Guruhlar</h3>
          <span className="muted sm">{groups.length} ta guruh</span>
        </div>
        {groups.length === 0 ? (
          <p className="muted">Hozircha guruhlar yo'q.</p>
        ) : (
          <div className="row wrap">
            {groups.map((g) => {
              const count = list.filter((s) => s.group === g).length
              return (
                <span key={g} className="chipbtn">
                  {g} · {count} ta
                  <button className="icon" title="Guruhni o'chirish"
                    onClick={() => setConfirm({ type: 'group', name: g, count })}>
                    <Trash2 size={13} />
                  </button>
                </span>
              )
            })}
          </div>
        )}
      </div>

      <div className="card">
        <div className="row between wrap">
          <h3>Yo'qlama jadvali</h3>
          <div className="row">
            <span className="search">
              <Search size={14} />
              <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Qidirish…" />
            </span>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          </div>
        </div>

        <div className="scroll">
          <table className="table">
            <thead>
              <tr><th>O'quvchi</th><th>Guruh</th><th>Holat</th><th>Coin</th><th>Belgilash</th></tr>
            </thead>
            <tbody>
              {shown.map((s) => {
                const m = marks[s.id]
                return (
                  <tr key={s.id}>
                    <td>
                      <button className="linkname" onClick={() => setOpen(open === s.id ? null : s.id)}>
                        {s.name}
                      </button>
                      {open === s.id && (
                        <div className="details">
                          <span><Phone size={12} /> {s.phone || '—'}</span>
                          <span>Ota-ona: {s.parents || '—'} {s.parent_phone && `(${s.parent_phone})`}</span>
                          <span><MapPin size={12} /> {s.address || '—'}</span>
                          <span>Yoshi: {s.age || '—'}</span>
                        </div>
                      )}
                    </td>
                    <td>{s.group || '—'}</td>
                    <td>
                      {m
                        ? <span className={`badge ${m.status === 'keldi' ? 'ok' : m.status === 'kechikdi' ? 'warn' : 'bad'}`}>{m.status}</span>
                        : <span className="muted">—</span>}
                    </td>
                    <td className="nowrap"><Coins size={13} /> {s.coins}</td>
                    <td>
                      <div className="row wrap">
                        <button className="chipbtn ok" title="Keldi" onClick={() => mark(s.id, 'keldi', 5)}><Check size={14} /></button>
                        <button className="chipbtn warn" title="Kechikdi" onClick={() => mark(s.id, 'kechikdi', 2)}><Clock3 size={14} /></button>
                        <button className="chipbtn bad" title="Kelmadi" onClick={() => mark(s.id, "yo'q", 0)}><X size={14} /></button>
                        <button className="chipbtn" onClick={async () => { await api.coins(s.id, 1); load() }}>+1</button>
                        <button className="chipbtn" onClick={async () => { await api.coins(s.id, -1); load() }}>−1</button>
                        <button className="icon" title="O'quvchini o'chirish"
                          onClick={() => setConfirm({ type: 'student', id: s.id, name: s.name })}>
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
              {shown.length === 0 && (
                <tr><td colSpan={5} className="muted">O'quvchilar topilmadi.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {confirm && (
        <div className="backdrop" onClick={() => setConfirm(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>
              {confirm.type === 'group' ? `"${confirm.name}" guruhini o'chirish` : 'O\'quvchini o\'chirish'}
            </h3>
            <p className="muted">
              {confirm.type === 'group'
                ? `Bu guruhdagi ${confirm.count} ta o'quvchi, ularning davomati va topshiriqlari birga o'chadi. Qaytarib bo'lmaydi!`
                : `"${confirm.name}" o'quvchisi, davomati va topshiriqlari o'chadi. Qaytarib bo'lmaydi!`}
            </p>
            <div className="row end">
              <button className="btn ghost" onClick={() => setConfirm(null)}>Bekor qilish</button>
              <button className="btn danger"
                onClick={() => (confirm.type === 'group' ? delGroup() : delStudent())}>
                <Trash2 size={15} /> Ha, o'chirish
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// Bir xil input'larni takrorlab yozmaslik uchun kichik komponent.
function Field({ label, value, on, required, wide }) {
  return (
    <label className={wide ? 'field wide' : 'field'}>
      <span>{label}</span>
      <input required={required} value={value} onChange={(e) => on(e.target.value)} />
    </label>
  )
}
