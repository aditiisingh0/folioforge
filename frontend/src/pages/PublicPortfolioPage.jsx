import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import api from '../utils/api'
import { Github, Linkedin, Twitter, Globe, Mail, ExternalLink, ArrowLeft } from 'lucide-react'

const themeStyles = {
  aurora:   { bg: '#0d0d1a', card: 'rgba(167,139,250,0.08)', accent: '#a78bfa', border: 'rgba(167,139,250,0.15)', text: '#e8e8ff', muted: 'rgba(232,232,255,0.5)' },
  midnight: { bg: '#090912', card: 'rgba(96,165,250,0.08)',  accent: '#60a5fa', border: 'rgba(96,165,250,0.15)',  text: '#e0e8ff', muted: 'rgba(224,232,255,0.5)' },
  slate:    { bg: '#0f1117', card: 'rgba(148,163,184,0.08)', accent: '#94a3b8', border: 'rgba(148,163,184,0.15)', text: '#e2e8f0', muted: 'rgba(226,232,240,0.5)' },
  forest:   { bg: '#0a110d', card: 'rgba(52,211,153,0.08)',  accent: '#34d399', border: 'rgba(52,211,153,0.15)',  text: '#e0fff0', muted: 'rgba(224,255,240,0.5)' },
  crimson:  { bg: '#110a0a', card: 'rgba(251,113,133,0.08)', accent: '#fb7185', border: 'rgba(251,113,133,0.15)', text: '#ffe0e4', muted: 'rgba(255,224,228,0.5)' },
}

const socialConfig = {
  github:   { icon: Github,   label: 'GitHub' },
  linkedin: { icon: Linkedin, label: 'LinkedIn' },
  twitter:  { icon: Twitter,  label: 'Twitter/X' },
  website:  { icon: Globe,    label: 'Website' },
  email:    { icon: Mail,     label: 'Email' },
}

export default function PublicPortfolioPage() {
  const { username } = useParams()
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    api.get(`/portfolio/${username}`)
      .then(r => setData(r.data))
      .catch(err => { if (err.response?.status === 404) setNotFound(true) })
      .finally(() => setLoading(false))
  }, [username])

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: '#0a0a0f' }}>
      <div className="w-8 h-8 border-2 border-violet-500 border-t-transparent rounded-full animate-spin" />
    </div>
  )

  if (notFound) return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center" style={{ background: '#0a0a0f' }}>
      <p className="text-6xl mb-4">🔍</p>
      <h1 className="text-2xl font-700 mb-2" style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700 }}>Portfolio not found</h1>
      <p className="text-white/40 mb-8 text-sm" style={{ fontFamily: 'DM Sans, sans-serif' }}>
        <span style={{ fontFamily: 'DM Mono, monospace' }}>{username}</span> hasn't set up a public portfolio yet.
      </p>
      <Link to="/" className="btn-primary text-sm px-5 py-2.5"><span>← Go home</span></Link>
    </div>
  )

  const { portfolio, user } = data
  const t = themeStyles[portfolio?.theme] || themeStyles.aurora
  const initials = portfolio?.name
    ? portfolio.name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)
    : username?.[0]?.toUpperCase()

  return (
    <div className="min-h-screen" style={{ background: t.bg, color: t.text, fontFamily: 'DM Sans, sans-serif' }}>
      {/* Top bar */}
      <div className="fixed top-0 left-0 right-0 z-40 h-12 flex items-center justify-between px-6 border-b"
        style={{ background: `${t.bg}cc`, backdropFilter: 'blur(12px)', borderColor: t.border }}>
        <Link to="/" className="flex items-center gap-1.5 text-sm opacity-40 hover:opacity-70 transition-opacity">
          <ArrowLeft size={13} />
          <span style={{ fontFamily: 'DM Sans, sans-serif' }}>FolioForge</span>
        </Link>
        <span className="text-xs opacity-30" style={{ fontFamily: 'DM Mono, monospace' }}>/portfolio/{username}</span>
      </div>

      {/* Main content */}
      <main className="max-w-2xl mx-auto px-6 pt-24 pb-20">

        {/* Hero */}
        <header className="flex items-start gap-6 mb-12 animate-fade-up">
          <div className="w-20 h-20 rounded-2xl flex-shrink-0 flex items-center justify-center text-2xl font-700 overflow-hidden"
            style={{ background: `${t.accent}25`, border: `2px solid ${t.accent}40`, fontFamily: 'Syne, sans-serif', fontWeight: 700, color: t.accent }}>
            {portfolio?.avatar
              ? <img src={portfolio.avatar} alt={portfolio.name} className="w-full h-full object-cover" />
              : initials}
          </div>
          <div>
            <h1 className="text-3xl font-800 mb-1" style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800 }}>
              {portfolio?.name || username}
            </h1>
            {portfolio?.tagline && (
              <p className="text-base mb-3" style={{ color: t.muted }}>{portfolio.tagline}</p>
            )}
            {/* Socials */}
            <div className="flex items-center gap-4 flex-wrap">
              {portfolio?.socialLinks && Object.entries(portfolio.socialLinks).map(([key, val]) => {
                if (!val) return null
                const { icon: Icon, label } = socialConfig[key] || { icon: Globe, label: key }
                const href = key === 'email' ? `mailto:${val}` : val
                return (
                  <a key={key} href={href} target="_blank" rel="noreferrer"
                    className="flex items-center gap-1.5 text-sm transition-opacity hover:opacity-90"
                    style={{ color: t.accent, opacity: 0.65 }}>
                    <Icon size={14} />
                    <span>{label}</span>
                  </a>
                )
              })}
            </div>
          </div>
        </header>

        {/* Bio */}
        {portfolio?.bio && (
          <section className="mb-12 animate-fade-up delay-100">
            <h2 className="text-xs uppercase tracking-widest mb-4 font-500"
              style={{ color: t.accent, fontFamily: 'DM Mono, monospace', opacity: 0.6 }}>About</h2>
            <p className="text-base leading-relaxed" style={{ color: t.muted }}>{portfolio.bio}</p>
          </section>
        )}

        {/* Skills */}
        {portfolio?.skills?.length > 0 && (
          <section className="mb-12 animate-fade-up delay-200">
            <h2 className="text-xs uppercase tracking-widest mb-4 font-500"
              style={{ color: t.accent, fontFamily: 'DM Mono, monospace', opacity: 0.6 }}>Skills</h2>
            <div className="flex flex-wrap gap-2">
              {portfolio.skills.map((s, i) => (
                <span key={i} className="text-sm px-3.5 py-1.5 rounded-full"
                  style={{ background: `${t.accent}15`, border: `1px solid ${t.accent}30`, color: t.accent, fontFamily: 'DM Mono, monospace', fontSize: '0.8rem' }}>
                  {s}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {portfolio?.projects?.length > 0 && (
          <section className="animate-fade-up delay-300">
            <h2 className="text-xs uppercase tracking-widest mb-4 font-500"
              style={{ color: t.accent, fontFamily: 'DM Mono, monospace', opacity: 0.6 }}>Projects</h2>
            <div className="space-y-4">
              {portfolio.projects.map((p, i) => (
                <div key={i} className="rounded-2xl p-5 transition-all hover:translate-y-[-1px]"
                  style={{ background: t.card, border: `1px solid ${t.border}`, transition: 'all 0.2s ease' }}>
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-lg font-600" style={{ fontFamily: 'Syne, sans-serif', fontWeight: 600 }}>{p.title}</h3>
                    {p.link && (
                      <a href={p.link} target="_blank" rel="noreferrer"
                        className="flex items-center gap-1 text-sm flex-shrink-0 px-3 py-1.5 rounded-lg transition-all"
                        style={{ background: `${t.accent}15`, color: t.accent, border: `1px solid ${t.accent}30` }}>
                        <ExternalLink size={12} />
                        <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.75rem' }}>View</span>
                      </a>
                    )}
                  </div>
                  {p.description && (
                    <p className="text-sm mt-2 leading-relaxed" style={{ color: t.muted }}>{p.description}</p>
                  )}
                  {p.tags?.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {p.tags.map((tag, j) => (
                        <span key={j} className="text-xs px-2 py-0.5 rounded"
                          style={{ background: `${t.accent}10`, color: t.accent, fontFamily: 'DM Mono, monospace' }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Footer */}
        <footer className="mt-20 text-center">
          <p className="text-xs opacity-20" style={{ fontFamily: 'DM Mono, monospace' }}>
            Built with{' '}
            <Link to="/" className="hover:opacity-60 transition-opacity" style={{ color: t.accent }}>FolioForge</Link>
          </p>
        </footer>
      </main>
    </div>
  )
}
