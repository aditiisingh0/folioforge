import { Github, Linkedin, Twitter, Globe, Mail, ExternalLink } from 'lucide-react'
import { THEMES } from '../utils/helpers'

const themeStyles = {
  aurora:   { bg: '#0d0d1a', card: 'rgba(167,139,250,0.08)', accent: '#a78bfa', border: 'rgba(167,139,250,0.15)', text: '#e8e8ff' },
  midnight: { bg: '#090912', card: 'rgba(96,165,250,0.08)',  accent: '#60a5fa', border: 'rgba(96,165,250,0.15)',  text: '#e0e8ff' },
  slate:    { bg: '#0f1117', card: 'rgba(148,163,184,0.08)', accent: '#94a3b8', border: 'rgba(148,163,184,0.15)', text: '#e2e8f0' },
  forest:   { bg: '#0a110d', card: 'rgba(52,211,153,0.08)',  accent: '#34d399', border: 'rgba(52,211,153,0.15)',  text: '#e0fff0' },
  crimson:  { bg: '#110a0a', card: 'rgba(251,113,133,0.08)', accent: '#fb7185', border: 'rgba(251,113,133,0.15)', text: '#ffe0e4' },
}

const socialIcons = { github: Github, linkedin: Linkedin, twitter: Twitter, website: Globe, email: Mail }

export default function PortfolioPreview({ data, compact = false }) {
  const t = themeStyles[data?.theme] || themeStyles.aurora
  const avatar = data?.avatar
  const initials = data?.name ? data.name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0,2) : '?'

  const px = compact ? 'p-6' : 'p-8 sm:p-12'

  return (
    <div className="h-full rounded-xl overflow-auto" style={{ background: t.bg, fontFamily: 'DM Sans, sans-serif', color: t.text }}>
      <div className={px}>
        {/* Header */}
        <header className="flex items-start gap-5 mb-8">
          <div className="w-16 h-16 rounded-2xl flex-shrink-0 flex items-center justify-center text-xl font-700 overflow-hidden"
            style={{ background: `${t.accent}25`, border: `1px solid ${t.accent}40`, fontFamily: 'Syne, sans-serif', fontWeight: 700, color: t.accent }}>
            {avatar
              ? <img src={avatar} alt={data?.name} className="w-full h-full object-cover" />
              : initials}
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-xl font-700 truncate" style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, color: t.text }}>
              {data?.name || 'Your Name'}
            </h1>
            {data?.tagline && (
              <p className="text-sm mt-0.5 opacity-60 truncate">{data.tagline}</p>
            )}
            {/* Social links */}
            {data?.socialLinks && (
              <div className="flex items-center gap-3 mt-3 flex-wrap">
                {Object.entries(data.socialLinks).map(([key, val]) => {
                  if (!val) return null
                  const Icon = socialIcons[key] || Globe
                  const href = key === 'email' ? `mailto:${val}` : val
                  return (
                    <a key={key} href={href} target="_blank" rel="noreferrer"
                      className="flex items-center gap-1 text-xs opacity-50 hover:opacity-90 transition-opacity"
                      style={{ color: t.accent }}>
                      <Icon size={12} />
                      <span className="hidden sm:inline capitalize">{key}</span>
                    </a>
                  )
                })}
              </div>
            )}
          </div>
        </header>

        {/* Bio */}
        {data?.bio && (
          <section className="mb-8">
            <h2 className="text-xs uppercase tracking-widest opacity-40 mb-3" style={{ fontFamily: 'DM Mono, monospace' }}>About</h2>
            <p className="text-sm leading-relaxed opacity-70">{data.bio}</p>
          </section>
        )}

        {/* Skills */}
        {data?.skills?.length > 0 && (
          <section className="mb-8">
            <h2 className="text-xs uppercase tracking-widest opacity-40 mb-3" style={{ fontFamily: 'DM Mono, monospace' }}>Skills</h2>
            <div className="flex flex-wrap gap-2">
              {data.skills.map((s, i) => (
                <span key={i} className="text-xs px-3 py-1 rounded-full"
                  style={{ background: `${t.accent}18`, border: `1px solid ${t.accent}30`, color: t.accent, fontFamily: 'DM Mono, monospace' }}>
                  {s}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {data?.projects?.length > 0 && (
          <section>
            <h2 className="text-xs uppercase tracking-widest opacity-40 mb-3" style={{ fontFamily: 'DM Mono, monospace' }}>Projects</h2>
            <div className="space-y-3">
              {data.projects.map((p, i) => (
                <div key={i} className="rounded-xl p-4"
                  style={{ background: t.card, border: `1px solid ${t.border}` }}>
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-600 text-sm" style={{ fontFamily: 'Syne, sans-serif', fontWeight: 600 }}>{p.title || 'Untitled'}</h3>
                    {p.link && (
                      <a href={p.link} target="_blank" rel="noreferrer" className="flex-shrink-0 opacity-50 hover:opacity-100 transition-opacity">
                        <ExternalLink size={13} style={{ color: t.accent }} />
                      </a>
                    )}
                  </div>
                  {p.description && <p className="text-xs mt-1.5 opacity-50 leading-relaxed">{p.description}</p>}
                  {p.tags?.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-2">
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

        {/* Empty state */}
        {!data?.bio && !data?.skills?.length && !data?.projects?.length && (
          <div className="text-center py-12 opacity-30">
            <p className="text-sm">Your portfolio will appear here as you fill in the form →</p>
          </div>
        )}
      </div>
    </div>
  )
}
