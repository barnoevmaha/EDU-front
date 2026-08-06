import { useEffect, useRef, useState } from 'react'
import {
  Megaphone, Send, Trash2, MessageSquare, ImagePlus, Film, X, CalendarCheck, Coins,
} from '../../icons.jsx'
import { api } from '../../api.js'
import { fileToDataUrl, roleLabel } from '../../utils.js'
import { useAuth } from '../../context/AuthContext.jsx'
import Avatar from '../shared/Avatar.jsx'

// E'lonlar sahifasi. Ustoz/admin yozadi, o'quvchi o'z e'lonini o'chira oladi.
export default function Dashboard() {
  const { user, isStaff } = useAuth()
  const [posts, setPosts] = useState([])
  const [text, setText] = useState('')
  const [media, setMedia] = useState(null)   // { url, type }
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  const [mine, setMine] = useState([])

  const imageInput = useRef(null)
  const videoInput = useRef(null)

  useEffect(() => {
    api.posts().then(setPosts).catch(() => {})
    if (user.role === 'student') {
      api.myAttendance(user.id).then(setMine).catch(() => {})
    }
  }, [user])

  // Telefonda kamera va galeriyani ochadi
  async function pickFile(e, type) {
    const file = e.target.files?.[0]
    if (!file) return

    if (file.size > 4 * 1024 * 1024) {
      setError('Fayl 4MB dan katta. Kichikroq fayl tanlang.')
      e.target.value = ''
      return
    }

    setError('')
    setMedia({ url: await fileToDataUrl(file), type })
    e.target.value = ''
  }

  async function publish(e) {
    e.preventDefault()
    if (!text.trim() && !media) {
      setError("E'lon bo'sh. Matn yozing yoki rasm tanlang.")
      return
    }

    setBusy(true)
    try {
      const list = await api.addPost({
        author: user.name,
        role: user.role,
        text,
        media: media?.url || '',
        media_type: media?.type || '',
      })
      setPosts(list)
      setText('')
      setMedia(null)
      setError('')
    } catch (err) {
      setError(err.message)
    }
    setBusy(false)
  }

  return (
    <div className="stack">
      {user.role === 'student' && (
        <div className="card">
          <h3><CalendarCheck size={16} /> Mening davomatim</h3>
          {mine.length === 0 ? (
            <p className="muted">Hozircha yozuv yo'q.</p>
          ) : (
            <div className="scroll">
              <table className="table">
                <thead><tr><th>Sana</th><th>Holat</th><th>Coin</th><th>Kim belgiladi</th></tr></thead>
                <tbody>
                  {mine.map((r) => (
                    <tr key={r.date}>
                      <td>{r.date}</td>
                      <td><span className={`badge ${r.status === 'keldi' ? 'ok' : r.status === 'kechikdi' ? 'warn' : 'bad'}`}>{r.status}</span></td>
                      <td><Coins size={13} /> {r.coins}</td>
                      <td className="muted sm">{r.by_name || '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {isStaff && (
        <form className="card composer" onSubmit={publish}>
          <h3><Megaphone size={16} /> Yangi e'lon</h3>
          <textarea
            rows={3}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="E'lon matnini yozing…"
          />

          {media && (
            <div className="preview">
              {media.type === 'video'
                ? <video src={media.url} controls />
                : <img src={media.url} alt="tanlangan fayl" />}
              <button type="button" className="icon float" onClick={() => setMedia(null)}>
                <X size={15} />
              </button>
            </div>
          )}

          {error && <div className="err">{error}</div>}

          <div className="row between wrap">
            <div className="row">
              <button type="button" className="chipbtn" onClick={() => imageInput.current.click()}>
                <ImagePlus size={14} /> Rasm
              </button>
              <button type="button" className="chipbtn" onClick={() => videoInput.current.click()}>
                <Film size={14} /> Video
              </button>
              <input ref={imageInput} type="file" accept="image/*" hidden
                onChange={(e) => pickFile(e, 'image')} />
              <input ref={videoInput} type="file" accept="video/*" hidden
                onChange={(e) => pickFile(e, 'video')} />
            </div>
            <button className="btn" disabled={busy}>
              <Send size={15} /> {busy ? 'Yuborilmoqda…' : 'Joylash'}
            </button>
          </div>
        </form>
      )}

      {posts.length === 0 && <div className="card muted">Hozircha e'lonlar yo'q.</div>}
      {posts.map((p) => (
        <Post key={p.id} post={p} user={user} isStaff={isStaff} setPosts={setPosts} />
      ))}
    </div>
  )
}

function Post({ post, user, isStaff, setPosts }) {
  const [comment, setComment] = useState('')
  const isVideo = post.media_type === 'video' || /\.(mp4|webm|ogg)$/i.test(post.media || '')
  const canDelete = isStaff || post.author === user.name

  async function send() {
    if (!comment.trim()) return
    setPosts(await api.comment(post.id, { author: user.name, text: comment }))
    setComment('')
  }

  return (
    <article className="card post">
      <header>
        <Avatar name={post.author} size="sm" />
        <div className="grow">
          <b>{post.author}</b>
          <div className="muted sm">{roleLabel(post.role)} · {post.created_at}</div>
        </div>
        {canDelete && (
          <button className="icon" title="O'chirish"
            onClick={async () => setPosts(await api.delPost(post.id, user))}>
            <Trash2 size={15} />
          </button>
        )}
      </header>

      {post.text && <p className="post-text">{post.text}</p>}
      {post.media && (
        <div className="media">
          {isVideo ? <video src={post.media} controls /> : <img src={post.media} alt="e'lon rasmi" />}
        </div>
      )}

      <div className="comments">
        {(post.comments || []).map((c) => (
          <div key={c.id} className="cmt">
            <Avatar name={c.author} size="xs" />
            <div><b>{c.author}</b><p>{c.text}</p></div>
          </div>
        ))}
        <div className="row">
          <input
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && send()}
            placeholder="Izoh yozing…"
          />
          <button className="btn ghost" onClick={send}><MessageSquare size={15} /></button>
        </div>
      </div>
    </article>
  )
}
