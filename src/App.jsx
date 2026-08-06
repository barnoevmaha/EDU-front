import { useState } from 'react'
import { GraduationCap, Eye, RefreshCw } from './icons.jsx'
import { useAuth } from './context/AuthContext.jsx'
import { useLocalStorage } from './hooks/useLocalStorage.js'
import { buildNav } from './nav.js'
import Login from './components/Login.jsx'
import Sidebar from './components/layout/Sidebar.jsx'
import Topbar from './components/layout/Topbar.jsx'
import BottomNav from './components/layout/BottomNav.jsx'
import Home from './components/pages/Home.jsx'
import About from './components/pages/About.jsx'
import Dashboard from './components/pages/Dashboard.jsx'
import Schedule from './components/pages/Schedule.jsx'
import Homework from './components/pages/Homework.jsx'
import Leaderboard from './components/pages/Leaderboard.jsx'
import Student from './components/pages/Student.jsx'
import Teachers from './components/pages/Teachers.jsx'
import Admins from './components/pages/Admins.jsx'
import Profile from './components/pages/Profile.jsx'

export default function App() {
  const { user, loading, logout, refresh, isStaff, isViewer } = useAuth()
  const [tab, setTab] = useLocalStorage('edu_tab', 'home')
  const [busy, setBusy] = useState(false)
  const [confirmOut, setConfirmOut] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  // Birinchi soniyada ekran "sakramasligi" uchun kichik yuklanish holati.
  if (loading) {
    return (
      <>
        <div className="blobs" aria-hidden="true"><i /><i /><i /></div>
        <div className="boot">
          <span className="mark"><GraduationCap size={22} /></span>
          <p>Yuklanmoqda…</p>
        </div>
      </>
    )
  }

  // ================= KIRISH EKRANI =================
  if (!user) {
    return <Login />
  }

  // ================= ASOSIY SAYT =================
  const nav = buildNav(user, isStaff)
  const active = nav.some((n) => n.id === tab) ? tab : 'home'

  async function checkStatus() {
    setBusy(true)
    try {
      await refresh()
    } catch (err) {
      // xatoni ko'rsatish shart emas, holat baribir yangilanadi
    }
    setBusy(false)
  }

  return (
    <div className="shell">
      <div className="blobs" aria-hidden="true"><i /><i /><i /></div>
      <Sidebar
        nav={nav}
        active={active}
        onNav={(id) => { setTab(id); setMenuOpen(false) }}
        onLogout={() => setConfirmOut(true)}
        open={menuOpen}
      />

      {menuOpen && <div className="backdrop only-mobile" onClick={() => setMenuOpen(false)} />}

      <main className="main">
        <Topbar
          nav={nav}
          active={active}
          user={user}
          menuOpen={menuOpen}
          onToggleMenu={() => setMenuOpen((v) => !v)}
          onProfile={() => { setTab('profile'); setMenuOpen(false) }}
        />

        <div className="page">
          {isViewer && (
            <div className="notice row between">
              <span>
                <Eye size={14} /> Siz hozircha <b>tomoshabin</b>siz — saytni bemalol ko'rasiz,
                lekin o'quvchi imkoniyatlari yopiq. Admin sizni o'quvchi qilib belgilaydi.
              </span>
              <button className="chipbtn" onClick={checkStatus} disabled={busy}>
                <RefreshCw size={13} /> {busy ? '…' : 'Tekshirish'}
              </button>
            </div>
          )}

          {active === 'home' && <Home go={setTab} />}
          {active === 'about' && <About />}
          {active === 'dashboard' && <Dashboard />}
          {active === 'schedule' && <Schedule />}
          {active === 'homework' && <Homework />}
          {active === 'leaderboard' && <Leaderboard />}
          {active === 'student' && <Student />}
          {active === 'teachers' && <Teachers />}
          {active === 'admins' && <Admins />}
          {active === 'profile' && <Profile onLogout={() => setConfirmOut(true)} />}
        </div>
      </main>

      <BottomNav nav={nav} active={active} onNav={setTab} />

      {confirmOut && (
        <div className="backdrop" onClick={() => setConfirmOut(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>Aniq chiqmoqchimisiz?</h3>
            <p className="muted">Keyingi safar ism va parolni qaytadan kiritasiz.</p>
            <div className="row end">
              <button className="btn ghost" onClick={() => setConfirmOut(false)}>Yo'q</button>
              <button className="btn danger" onClick={() => { logout(); setTab('home'); setConfirmOut(false) }}>
                Ha, chiqaman
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
