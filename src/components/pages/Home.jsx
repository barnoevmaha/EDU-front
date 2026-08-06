import { useEffect, useState } from 'react'
import {
  Sparkles, BookOpen, Users, Coins, ArrowRight, CheckCircle2, Megaphone, Star, Trophy,
} from '../../icons.jsx'
import { api } from '../../api.js'
import { useAuth } from '../../context/AuthContext.jsx'

const COURSES = [
  { name: 'Ingliz tili', info: "IELTS va so'zlashuv · 6 oy", age: '10–40 yosh', color: 'a' },
  { name: 'IT dasturlash', info: 'HTML, CSS, JS, React · 8 oy', age: '14–35 yosh', color: 'b' },
  { name: 'Matematika', info: 'DTM va olimpiada · 9 oy', age: '11–18 yosh', color: 'c' },
  { name: 'Grafik dizayn', info: 'Figma, Photoshop · 5 oy', age: '14–40 yosh', color: 'd' },
]

const REVIEWS = [
  { name: 'Dilnoza R.', text: "Ingliz tili kursidan keyin IELTS 7.0 oldim. Ustozlar juda e'tiborli." },
  { name: 'Javohir T.', text: 'IT kursida 4 ta loyiha qildim, hozir frilanser sifatida ishlayapman.' },
]

export default function Home({ go }) {
  const { user } = useAuth()
  const [stats, setStats] = useState({ students: 0, teachers: 0, posts: 0, coins: 0 })
  const [posts, setPosts] = useState([])
  const [top, setTop] = useState([])

  useEffect(() => {
    api.stats().then(setStats).catch(() => {})
    api.posts().then((list) => setPosts(list.slice(0, 3))).catch(() => {})
    api.leaderboard().then((l) => setTop(l.slice(0, 3))).catch(() => {})
  }, [])

  return (
    <div className="stack">
      <section className="hero">
        <span className="chip"><Sparkles size={13} /> Xush kelibsiz, {user.name.split(' ')[0]}!</span>
        <h1>Bilim — eng foydali <em>sarmoya</em></h1>
        <p>
          Tajribali ustozlar, kichik guruhlar va har bir o'quvchi uchun shaxsiy yondashuv.
          Davomat, coin, topshiriq va e'lonlar — hammasi shu saytda.
        </p>
        <div className="row">
          <button className="btn" onClick={() => go('dashboard')}>E'lonlarni ko'rish <ArrowRight size={16} /></button>
          <button className="btn ghost" onClick={() => go('schedule')}>Dars jadvali</button>
        </div>
      </section>

      <div className="grid4">
        {[
          { Icon: Users, v: stats.students, l: "O'quvchilar" },
          { Icon: BookOpen, v: stats.teachers, l: 'Ustozlar' },
          { Icon: Megaphone, v: stats.posts, l: "E'lonlar" },
          { Icon: Coins, v: stats.coins, l: 'Jami coin' },
        ].map((s) => (
          <div className="card stat" key={s.l}>
            <span className="stat-ico"><s.Icon size={18} /></span>
            <b>{s.v}</b>
            <span className="muted sm">{s.l}</span>
          </div>
        ))}
      </div>

      {top.length > 0 && (
        <div className="card">
          <div className="row between">
            <h3><Trophy size={16} /> Eng yaxshi o'quvchilar</h3>
            <button className="link" onClick={() => go('leaderboard')}>To'liq reyting</button>
          </div>
          <div className="grid3">
            {top.map((s) => (
              <div className="mini" key={s.id}>
                <b className="big">🥇</b>
                <b>{s.name}</b>
                <span className="muted sm">{s.group || '—'}</span>
                <span className="tag"><Coins size={11} /> {s.coins} coin</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="card">
        <h3>Kurslarimiz</h3>
        <div className="grid2">
          {COURSES.map((c) => (
            <div className={`mini course ${c.color}`} key={c.name}>
              <b>{c.name}</b>
              <span className="muted">{c.info}</span>
              <span className="tag">{c.age}</span>
            </div>
          ))}
        </div>
      </div>

      {posts.length > 0 && (
        <div className="card">
          <div className="row between">
            <h3><Megaphone size={16} /> So'nggi e'lonlar</h3>
            <button className="link" onClick={() => go('dashboard')}>Hammasi</button>
          </div>
          <div className="grid2">
            {posts.map((p) => (
              <div className="mini" key={p.id}>
                {p.media && p.media_type !== 'video' && <img className="thumb" src={p.media} alt="" />}
                <b>{p.author}</b>
                <span className="muted clamp">{p.text || 'Rasm'}</span>
                <span className="tag">{p.created_at}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid2">
        <div className="card">
          <h3>Nega aynan biz?</h3>
          <ul className="checks">
            {[
              'Kichik guruhlar va shaxsiy mentor',
              'Har oy nazorat imtihoni',
              'Coin tizimi bilan motivatsiya',
              'Topshiriqlar va dars jadvali onlayn',
              'Ota-onalar uchun hisobot',
            ].map((t) => <li key={t}><CheckCircle2 size={16} /> {t}</li>)}
          </ul>
        </div>
        <div className="card">
          <h3><Star size={16} /> O'quvchilar fikri</h3>
          {REVIEWS.map((r) => (
            <blockquote key={r.name}>
              <p>"{r.text}"</p>
              <cite>— {r.name}</cite>
            </blockquote>
          ))}
        </div>
      </div>
    </div>
  )
}
