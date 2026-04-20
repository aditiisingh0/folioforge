import { useState, useEffect, useCallback, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../utils/api'
import { THEMES } from '../utils/helpers'
import Navbar from '../components/Navbar'
import PortfolioPreview from '../components/PortfolioPreview'
import toast from 'react-hot-toast'
import { Plus, X, Save, Loader2, ChevronDown, ChevronUp } from 'lucide-react'

const Section = ({ title, children, defaultOpen = true }) => {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="glass rounded-2xl overflow-hidden mb-4">
      <button onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-white/3 transition-colors">
        <span className="font-600 text-sm" style={{ fontFamily: 'Syne, sans-serif', fontWeight: 600 }}>{title}</span>
        {open ? <ChevronUp size={15} className="text-white/40" /> : <ChevronDown size={15} className="text-white/40" />}
      </button>
      {open && <div className="px-5 pb-5 space-y-4">{children}</div>}
    </div>
  )
}

const Label = ({ children }) => (
  <label className="block text-xs text-white/50 mb-1.5 font-500" style={{ fontFamily: 'DM Sans, sans-serif' }}>{children}</label>
)

export default function EditorPage() {
  const navigate = useNavigate()
  const [saving, setSaving] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const [skillInput, setSkillInput] = useState('')
  const saveTimeout = useRef(null)

  const [form, setForm] = useState({
    name: '', bio: '', tagline: '', skills: [], projects: [],
    socialLinks: { github: '', linkedin: '', twitter: '', website: '', email: '' },
    theme: 'aurora', avatar: '', isPublic: true
  })

  useEffect(() => {
    api.get('/portfolio').then(r => {
      const p = r.data.portfolio
      setForm({
        name: p.name || '',
        bio: p.bio || '',
        tagline: p.tagline || '',
        skills: p.skills || [],
        projects: p.projects?.map(pr => ({ title: pr.title || '', description: pr.description || '', link: pr.link || '', tags: pr.tags || [] })) || [],
        socialLinks: { github: '', linkedin: '', twitter: '', website: '', email: '', ...p.socialLinks },
        theme: p.theme || 'aurora',
        avatar: p.avatar || '',
        isPublic: p.isPublic ?? true,
      })
      setLoaded(true)
    }).catch(() => { toast.error('Could not load portfolio.'); navigate('/dashboard') })
  }, [navigate])

  const set = (field, val) => setForm(f => ({ ...f, [field]: val }))
  const setSocial = (k, v) => setForm(f => ({ ...f, socialLinks: { ...f.socialLinks, [k]: v } }))

  const addSkill = () => {
    const s = skillInput.trim()
    if (!s || form.skills.includes(s)) { setSkillInput(''); return }
    set('skills', [...form.skills, s])
    setSkillInput('')
  }

  const removeSkill = (i) => set('skills', form.skills.filter((_, idx) => idx !== i))

  const addProject = () => set('projects', [...form.projects, { title: '', description: '', link: '', tags: [] }])

  const updateProject = (i, field, val) => {
    const updated = [...form.projects]
    updated[i] = { ...updated[i], [field]: val }
    set('projects', updated)
  }

  const removeProject = (i) => set('projects', form.projects.filter((_, idx) => idx !== i))

  const addProjectTag = (i, tag) => {
    const trimmed = tag.trim()
    if (!trimmed || form.projects[i].tags?.includes(trimmed)) return
    updateProject(i, 'tags', [...(form.projects[i].tags || []), trimmed])
  }

  const removeProjectTag = (i, j) => {
    const updated = [...form.projects]
    updated[i].tags = updated[i].tags.filter((_, idx) => idx !== j)
    set('projects', updated)
  }

  const save = useCallback(async (silent = false) => {
    setSaving(true)
    try {
      await api.put('/portfolio', form)
      if (!silent) toast.success('Portfolio saved!')
    } catch (err) {
      if (!silent) toast.error(err.response?.data?.message || 'Save failed.')
    } finally {
      setSaving(false)
    }
  }, [form])

  // Auto-save debounce
  useEffect(() => {
    if (!loaded) return
    if (saveTimeout.current) clearTimeout(saveTimeout.current)
    saveTimeout.current = setTimeout(() => save(true), 2500)
    return () => clearTimeout(saveTimeout.current)
  }, [form, loaded, save])

  if (!loaded) return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: '#0a0a0f' }}>
      <div className="w-8 h-8 border-2 border-violet-500 border-t-transparent rounded-full animate-spin" />
    </div>
  )

  return (
    <div className="min-h-screen pt-16 flex flex-col" style={{ background: '#0a0a0f' }}>
      <Navbar />

      {/* Toolbar */}
      <div className="flex items-center justify-between px-6 py-3 border-b border-white/5"
        style={{ background: 'rgba(10,10,15,0.9)' }}>
        <div className="flex items-center gap-3">
          <h1 className="font-700 text-sm" style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700 }}>Portfolio Editor</h1>
          {saving && (
            <span className="flex items-center gap-1.5 text-xs text-white/40" style={{ fontFamily: 'DM Mono, monospace' }}>
              <Loader2 size={11} className="animate-spin" /> saving…
            </span>
          )}
        </div>
        <button onClick={() => save(false)} disabled={saving}
          className="btn-primary flex items-center gap-2 text-sm py-2 px-4">
          <Save size={13} className="relative z-10" />
          <span>Save</span>
        </button>
      </div>

      {/* Split layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Form panel */}
        <div className="w-full lg:w-1/2 split-panel overflow-y-auto px-6 py-6 border-r border-white/5">

          <Section title="Basic Info">
            <div>
              <Label>Display Name</Label>
              <input className="input-field" placeholder="Alex Johnson" value={form.name} onChange={e => set('name', e.target.value)} />
            </div>
            <div>
              <Label>Tagline</Label>
              <input className="input-field" placeholder="Full-stack developer & open source enthusiast" value={form.tagline} onChange={e => set('tagline', e.target.value)} />
            </div>
            <div>
              <Label>Bio</Label>
              <textarea className="input-field" rows={4} placeholder="Tell the world about yourself…" value={form.bio} onChange={e => set('bio', e.target.value)} />
            </div>
            <div>
              <Label>Avatar URL <span className="text-white/25">(optional)</span></Label>
              <input className="input-field" placeholder="https://…/avatar.jpg" value={form.avatar} onChange={e => set('avatar', e.target.value)} />
            </div>
          </Section>

          <Section title="Skills">
            <div className="flex gap-2">
              <input className="input-field" placeholder="e.g. React" value={skillInput}
                onChange={e => setSkillInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addSkill())} />
              <button onClick={addSkill} className="btn-primary px-4 py-2 text-sm flex-shrink-0">
                <span><Plus size={15} /></span>
              </button>
            </div>
            {form.skills.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-1">
                {form.skills.map((s, i) => (
                  <span key={i} className="tag-chip flex items-center gap-1">
                    {s}
                    <button onClick={() => removeSkill(i)} className="hover:text-white transition-colors ml-1">
                      <X size={10} />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </Section>

          <Section title="Projects">
            {form.projects.map((p, i) => (
              <div key={i} className="rounded-xl p-4 space-y-3 mb-3" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-white/40 font-500" style={{ fontFamily: 'DM Mono, monospace' }}>Project {i + 1}</span>
                  <button onClick={() => removeProject(i)} className="text-white/30 hover:text-red-400 transition-colors">
                    <X size={14} />
                  </button>
                </div>
                <div>
                  <Label>Title</Label>
                  <input className="input-field" placeholder="My Awesome Project" value={p.title} onChange={e => updateProject(i, 'title', e.target.value)} />
                </div>
                <div>
                  <Label>Description</Label>
                  <textarea className="input-field" rows={2} placeholder="What did you build?" value={p.description} onChange={e => updateProject(i, 'description', e.target.value)} />
                </div>
                <div>
                  <Label>Link</Label>
                  <input className="input-field" placeholder="https://github.com/you/project" value={p.link} onChange={e => updateProject(i, 'link', e.target.value)} />
                </div>
                <div>
                  <Label>Tags <span className="text-white/25">(press Enter)</span></Label>
                  <input className="input-field" placeholder="React, TypeScript…"
                    onKeyDown={e => { if (e.key === 'Enter') { addProjectTag(i, e.target.value); e.target.value = '' }}} />
                  {p.tags?.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {p.tags.map((tag, j) => (
                        <span key={j} className="tag-chip flex items-center gap-1">
                          {tag}
                          <button onClick={() => removeProjectTag(i, j)}><X size={9} /></button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            <button onClick={addProject} className="btn-ghost w-full flex items-center justify-center gap-2 text-sm">
              <Plus size={14} /> Add Project
            </button>
          </Section>

          <Section title="Social Links">
            {['github', 'linkedin', 'twitter', 'website', 'email'].map(key => (
              <div key={key}>
                <Label>{key.charAt(0).toUpperCase() + key.slice(1)}</Label>
                <input className="input-field" placeholder={
                  key === 'github' ? 'https://github.com/you' :
                  key === 'linkedin' ? 'https://linkedin.com/in/you' :
                  key === 'email' ? 'you@example.com' :
                  key === 'twitter' ? 'https://twitter.com/you' : 'https://yourwebsite.com'
                }
                  value={form.socialLinks[key]} onChange={e => setSocial(key, e.target.value)} />
              </div>
            ))}
          </Section>

          <Section title="Theme">
            <div className="grid grid-cols-5 gap-2">
              {THEMES.map(t => (
                <button key={t.id} onClick={() => set('theme', t.id)}
                  className="flex flex-col items-center gap-2 py-3 rounded-xl transition-all"
                  style={{
                    background: form.theme === t.id ? `${t.accent}20` : 'rgba(255,255,255,0.03)',
                    border: `1px solid ${form.theme === t.id ? t.accent + '60' : 'rgba(255,255,255,0.07)'}`,
                  }}>
                  <span className="w-5 h-5 rounded-full" style={{ background: t.accent }} />
                  <span className="text-xs text-white/50" style={{ fontFamily: 'DM Sans, sans-serif' }}>{t.label}</span>
                </button>
              ))}
            </div>
          </Section>

          <Section title="Settings">
            <label className="flex items-center gap-3 cursor-pointer">
              <div className="relative">
                <input type="checkbox" className="sr-only" checked={form.isPublic} onChange={e => set('isPublic', e.target.checked)} />
                <div className="w-10 h-5 rounded-full transition-colors" style={{ background: form.isPublic ? '#7c3aed' : 'rgba(255,255,255,0.1)' }} />
                <div className="absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform shadow"
                  style={{ transform: form.isPublic ? 'translateX(20px)' : 'translateX(0)' }} />
              </div>
              <span className="text-sm text-white/70" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                Portfolio is {form.isPublic ? 'public' : 'private'}
              </span>
            </label>
          </Section>
        </div>

        {/* Preview panel — hidden on mobile */}
        <div className="hidden lg:block lg:w-1/2 split-panel p-6">
          <div className="h-full rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.07)' }}>
            <PortfolioPreview data={form} compact />
          </div>
        </div>
      </div>
    </div>
  )
}
