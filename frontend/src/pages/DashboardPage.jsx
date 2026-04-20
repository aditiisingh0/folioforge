import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import api from '../utils/api'
import { calcCompletion, formatDate, THEMES } from '../utils/helpers'
import Navbar from '../components/Navbar'
import { Edit3, Eye, Clock, CheckCircle2, AlertCircle, Layers, Github, Linkedin, ArrowRight, Sparkles } from 'lucide-react'

export default function DashboardPage() {
  const { user } = useAuth()
  const [portfolio, setPortfolio] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/portfolio').then(r => setPortfolio(r.data.portfolio)).catch(console.error).finally(() => setLoading(false))
  }, [])

  const completion = calcCompletion(portfolio)
  const theme = THEMES.find(t => t.id === portfolio?.theme) || THEMES[0]

  const stats = [
    { label: 'Skills',   value: portfolio?.skills?.length || 0,   icon: Sparkles },
    { label: 'Projects', value: portfolio?.projects?.length || 0, icon: Layers },
    { label: 'Socials',  value: Object.values(portfolio?.socialLinks || {}).filter(Boolean).length, icon: Github },
  ]

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: '#0a0a0f' }}>
      <div className="w-8 h-8 border-2 border-violet-500 border-t-transparent rounded-full animate-spin" />
    </div>
  )

  return (
    <div className="min-h-screen pt-16" style={{ background: '#0a0a0f' }}>
      <Navbar />

      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-10 animate-fade-up">
          <p className="text-white/40 text-sm mb-1" style={{ fontFamily: 'DM Mono, monospace' }}>dashboard</p>
          <h1 className="text-3xl font-700" style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700 }}>
            Hey, {user?.name?.split(' ')[0]} 👋
          </h1>
        </div>

        {/* Completion card */}
        <div className="glass rounded-2xl p-6 mb-6 animate-fade-up delay-100" style={{ border: `1px solid ${theme.accent}25` }}>
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="font-600 text-white/90 mb-1" style={{ fontFamily: 'Syne, sans-serif', fontWeight: 600 }}>
                Profile completion
              </h2>
              <p className="text-sm text-white/40" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                {completion < 100 ? 'Fill in more details to stand out.' : 'Your portfolio is complete!'}
              </p>
            </div>
            <div className="text-3xl font-800" style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, color: theme.accent }}>
              {completion}%
            </div>
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${completion}%` }} />
          </div>

          {completion < 100 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {!portfolio?.bio && <span className="text-xs px-2.5 py-1 rounded-full flex items-center gap-1"
                style={{ background: 'rgba(251,113,133,0.1)', border: '1px solid rgba(251,113,133,0.2)', color: '#fb7185', fontFamily: 'DM Sans, sans-serif' }}>
                <AlertCircle size={11} /> Add bio</span>}
              {!portfolio?.tagline && <span className="text-xs px-2.5 py-1 rounded-full flex items-center gap-1"
                style={{ background: 'rgba(251,113,133,0.1)', border: '1px solid rgba(251,113,133,0.2)', color: '#fb7185', fontFamily: 'DM Sans, sans-serif' }}>
                <AlertCircle size={11} /> Add tagline</span>}
              {!portfolio?.skills?.length && <span className="text-xs px-2.5 py-1 rounded-full flex items-center gap-1"
                style={{ background: 'rgba(251,113,133,0.1)', border: '1px solid rgba(251,113,133,0.2)', color: '#fb7185', fontFamily: 'DM Sans, sans-serif' }}>
                <AlertCircle size={11} /> Add skills</span>}
              {!portfolio?.projects?.length && <span className="text-xs px-2.5 py-1 rounded-full flex items-center gap-1"
                style={{ background: 'rgba(251,113,133,0.1)', border: '1px solid rgba(251,113,133,0.2)', color: '#fb7185', fontFamily: 'DM Sans, sans-serif' }}>
                <AlertCircle size={11} /> Add projects</span>}
            </div>
          )}
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-4 mb-6 animate-fade-up delay-200">
          {stats.map(({ label, value, icon: Icon }) => (
            <div key={label} className="glass rounded-xl p-4 text-center">
              <Icon size={16} className="mx-auto mb-2" style={{ color: theme.accent }} />
              <div className="text-2xl font-700 mb-0.5" style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, color: theme.accent }}>{value}</div>
              <div className="text-xs text-white/40" style={{ fontFamily: 'DM Sans, sans-serif' }}>{label}</div>
            </div>
          ))}
        </div>

        {/* Action cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 animate-fade-up delay-300">
          <Link to="/editor" className="glass glass-hover rounded-2xl p-5 flex items-center gap-4 group">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: 'rgba(124,58,237,0.2)', border: '1px solid rgba(124,58,237,0.3)' }}>
              <Edit3 size={18} style={{ color: '#a78bfa' }} />
            </div>
            <div className="flex-1">
              <h3 className="font-600 mb-0.5" style={{ fontFamily: 'Syne, sans-serif', fontWeight: 600 }}>Edit Portfolio</h3>
              <p className="text-sm text-white/40" style={{ fontFamily: 'DM Sans, sans-serif' }}>Update your info & live preview</p>
            </div>
            <ArrowRight size={16} className="text-white/20 group-hover:text-violet-400 transition-colors" />
          </Link>

          <Link to={`/portfolio/${user?.username}`} target="_blank"
            className="glass glass-hover rounded-2xl p-5 flex items-center gap-4 group">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: 'rgba(52,211,153,0.15)', border: '1px solid rgba(52,211,153,0.25)' }}>
              <Eye size={18} style={{ color: '#34d399' }} />
            </div>
            <div className="flex-1">
              <h3 className="font-600 mb-0.5" style={{ fontFamily: 'Syne, sans-serif', fontWeight: 600 }}>View Public Page</h3>
              <p className="text-sm text-white/40" style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.7rem' }}>
                /portfolio/{user?.username}
              </p>
            </div>
            <ArrowRight size={16} className="text-white/20 group-hover:text-emerald-400 transition-colors" />
          </Link>
        </div>

        {/* Last updated + theme */}
        <div className="glass rounded-2xl p-5 flex flex-wrap items-center gap-6 animate-fade-up delay-400">
          <div className="flex items-center gap-2 text-white/40 text-sm" style={{ fontFamily: 'DM Sans, sans-serif' }}>
            <Clock size={14} />
            {portfolio?.updatedAt ? `Last updated ${formatDate(portfolio.updatedAt)}` : 'Not yet saved'}
          </div>
          <div className="flex items-center gap-2 text-white/40 text-sm" style={{ fontFamily: 'DM Sans, sans-serif' }}>
            <span className="w-3 h-3 rounded-full" style={{ background: theme.accent }} />
            Theme: {theme.label}
          </div>
          {portfolio?.socialLinks?.github && (
            <a href={portfolio.socialLinks.github} target="_blank" rel="noreferrer"
              className="flex items-center gap-1.5 text-sm text-white/40 hover:text-white/70 transition-colors">
              <Github size={14} /> GitHub
            </a>
          )}
          {portfolio?.socialLinks?.linkedin && (
            <a href={portfolio.socialLinks.linkedin} target="_blank" rel="noreferrer"
              className="flex items-center gap-1.5 text-sm text-white/40 hover:text-white/70 transition-colors">
              <Linkedin size={14} /> LinkedIn
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
