import { useState } from 'react'
import {
  GraduationCap, Shield, User, ArrowRight, KeyRound, Sparkles,
} from '../icons.jsx'
import { useAuth } from '../context/AuthContext.jsx'

const ROLES = [
  { id: 'teacher', label: 'Ustoz', desc: 'Ism familiya va markaz tokeni', Icon: GraduationCap },
  { id: 'admin', label: 'Admin', desc: 'Ism familiya va markaz tokeni', Icon: Shield },
  { id: 'student', label: "O'quvchi", desc: 'Ism familiya va doimiy parol', Icon: User },
]

export default function Login() {
  const { login } = useAuth()
  const [role, setRole] = useState(null)
  const [form, setForm] = useState({ name: '', secret: '' })
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  const picked = ROLES.find((r) => r.id === role)

  async function submit(e) {
    e.preventDefault()
    setError('')
    setBusy(true)
    try {
      await login({ role, name: form.name, secret: form.secret })
      setForm({ name: '', secret: '' })
    } catch (err) {
      setError(err.message)
    }
    setBusy(false)
  }

  return (
    <div className="auth">
      <div className="aurora" />
      <div className="auth-grid">
        <section className="auth-side">
          <span className="chip"><Sparkles size={13} /> 2015-yildan buyon 1200+ bitiruvchi</span>
          <h1>Bilim <em>ortida</em> kelajak turadi</h1>
          <p>
            EduCenter — davomat, coin motivatsiyasi, e'lonlar, topshiriqlar va
            ustoz-o'quvchi aloqasi bitta joyda. Sodda, tez va telefonda ham qulay.
          </p>
          <div className="auth-facts">
            {[['1200+', 'Bitiruvchi'], ['40+', 'Ustoz'], ['12', "Yo'nalish"]].map(([v, l]) => (
              <div key={l}><b>{v}</b><span>{l}</span></div>
            ))}
          </div>
        </section>

        <section className="auth-card">
          <div className="brand"><span className="mark"><GraduationCap size={20} /></span> EduCenter</div>

          {!role ? (
            <>
              <p className="muted">Kim sifatida kirmoqchisiz?</p>
              <div className="role-list">
                {ROLES.map((r) => (
                  <button key={r.id} className="role" onClick={() => { setRole(r.id); setError('') }}>
                    <span className="role-ico"><r.Icon size={18} /></span>
                    <span className="role-text"><b>{r.label}</b><span>{r.desc}</span></span>
                    <ArrowRight size={16} />
                  </button>
                ))}
              </div>
              <p className="muted sm center">
                Bir marta kirsangiz, shu qurilmada eslab qolinadi.
              </p>
            </>
          ) : (
            <form onSubmit={submit}>
              <p className="muted">{picked.label} sifatida kirish</p>
              <label>Ism familiya</label>
              <input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Ali Valiyev"
              />
              <label>{role === 'student' ? 'Doimiy parol' : 'Markaz tokeni'}</label>
              <input
                type={role === 'student' ? 'password' : 'text'}
                value={form.secret}
                onChange={(e) => setForm({ ...form, secret: e.target.value })}
                placeholder={role === 'student' ? '••••••' : '8017758520'}
              />
              {error && <div className="err">{error}</div>}
              <button className="btn" disabled={busy}>
                <KeyRound size={16} /> {busy ? 'Tekshirilmoqda…' : 'Kirish'}
              </button>
              <button type="button" className="link" onClick={() => { setRole(null); setError('') }}>
                Orqaga
              </button>
            </form>
          )}
        </section>
      </div>
    </div>
  )
}
