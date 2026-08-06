import { Target, Users2, Zap, MapPin, Clock, Award, Phone } from '../../icons.jsx'

export default function About() {
  return (
    <div className="stack">
      <section className="hero small">
        <h1>EduCenter <em>haqida</em></h1>
        <p>1200+ bitiruvchi, 40+ ustoz va 7 ta yo'nalish. Biz natijaga ishlaymiz.</p>
      </section>

      <div className="grid3">
        {[
          { Icon: Target, t: 'Missiya', d: "Har bir o'quvchining salohiyatini ochish." },
          { Icon: Users2, t: 'Jamoa', d: '40+ malakali ustoz va mentor.' },
          { Icon: Zap, t: 'Uslub', d: "Amaliyotga yo'naltirilgan interaktiv darslar." },
        ].map((c) => (
          <div className="card" key={c.t}>
            <span className="stat-ico"><c.Icon size={18} /></span>
            <h3>{c.t}</h3>
            <p className="muted">{c.d}</p>
          </div>
        ))}
      </div>

      <div className="card">
        <h3><Award size={16} /> Yutuqlarimiz</h3>
        <div className="grid3">
          {[['1200+', 'Bitiruvchi'], ['40+', 'Ustoz'], ['98%', 'Mamnunlik']].map(([v, l]) => (
            <div className="mini" key={l}><b className="big">{v}</b><span className="muted">{l}</span></div>
          ))}
        </div>
      </div>

      <div className="grid3">
        <div className="card"><h3><MapPin size={16} /> Manzil</h3><p className="muted">Navoiy 23 maktab oldidagi Marketni orqasida</p></div>
        <div className="card"><h3><Clock size={16} /> Ish vaqti</h3><p className="muted">Dushanba–Shanba, 09:00–20:00</p></div>
        <div className="card"><h3><Phone size={16} /> Aloqa</h3><p className="muted">+998 77 777 61 17</p></div>
      </div>
    </div>
  )
}