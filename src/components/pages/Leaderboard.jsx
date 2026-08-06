import { useEffect, useState } from 'react'
import { Trophy, Medal, Coins, CheckCircle2, Clock } from '../../icons.jsx'
import { api } from '../../api.js'
import { useAuth } from '../../context/AuthContext.jsx'
import Avatar from '../shared/Avatar.jsx'

const MEDALS = ['🥇', '🥈', '🥉']

export default function Leaderboard() {
  const { user } = useAuth()
  const [list, setList] = useState([])

  useEffect(() => {
    api.leaderboard().then(setList).catch(() => {})
  }, [])

  return (
    <div className="stack">
      <div className="card">
        <h3><Trophy size={16} /> O'quvchilar reytingi</h3>
        <p className="muted sm">
          Coin va davomat bo'yicha tartiblanadi. Ko'p coin — yuqori o'rin!
        </p>
        <div className="scroll">
          <table className="table">
            <thead>
              <tr><th>#</th><th>O'quvchi</th><th>Guruh</th><th>Kelgan</th><th>Kechikkan</th><th>Coin</th></tr>
            </thead>
            <tbody>
              {list.map((s) => {
                const mine = s.id === user?.id
                return (
                  <tr key={s.id} className={mine ? 'rowme' : ''}>
                    <td className="nowrap">
                      {s.rank <= 3
                        ? <span className="medal">{MEDALS[s.rank - 1]}</span>
                        : <span className={`rank ${mine ? 'mine' : ''}`}>{s.rank}</span>}
                    </td>
                    <td className="nowrap">
                      <span className="row">
                        <Avatar user={s} size="xs" />
                        <b>{mine ? `${s.name} (siz)` : s.name}</b>
                      </span>
                    </td>
                    <td>{s.group || '—'}</td>
                    <td><span className="tag ok"><CheckCircle2 size={11} /> {s.attended}</span></td>
                    <td><span className="tag warn"><Clock size={11} /> {s.late}</span></td>
                    <td className="nowrap"><b className="coinv"><Coins size={14} /> {s.coins}</b></td>
                  </tr>
                )
              })}
              {list.length === 0 && (
                <tr><td colSpan={6} className="muted">Hozircha o'quvchilar yo'q.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}