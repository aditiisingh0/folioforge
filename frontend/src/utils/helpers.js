export const calcCompletion = (portfolio) => {
  if (!portfolio) return 0
  const checks = [
    !!portfolio.name,
    !!portfolio.bio,
    !!portfolio.tagline,
    portfolio.skills?.length > 0,
    portfolio.projects?.length > 0,
    !!portfolio.socialLinks?.github || !!portfolio.socialLinks?.linkedin,
    !!portfolio.avatar,
  ]
  return Math.round((checks.filter(Boolean).length / checks.length) * 100)
}

export const THEMES = [
  { id: 'aurora',   label: 'Aurora',   accent: '#a78bfa', bg: '#0d0d1a' },
  { id: 'midnight', label: 'Midnight', accent: '#60a5fa', bg: '#090912' },
  { id: 'slate',    label: 'Slate',    accent: '#94a3b8', bg: '#0f1117' },
  { id: 'forest',   label: 'Forest',   accent: '#34d399', bg: '#0a110d' },
  { id: 'crimson',  label: 'Crimson',  accent: '#fb7185', bg: '#110a0a' },
]

export const formatDate = (dateStr) => {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}
