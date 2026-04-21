import { Link } from 'react-router-dom'
import { ArrowRight, Zap, Globe, Palette, Lock, BarChart2, Share2 } from 'lucide-react'
import Navbar from '../components/Navbar'

const features = [
  { icon: Zap,       title: 'Live Preview',      desc: 'See your portfolio update in real-time as you type.' },
  { icon: Globe,     title: 'Public URL',         desc: 'Share a clean link — /portfolio/yourname — with anyone.' },
  { icon: Palette,   title: '5 Beautiful Themes', desc: 'Aurora, Midnight, Slate, Forest, Crimson. Pick your vibe.' },
  { icon: Lock,      title: 'Secure Auth',        desc: 'JWT + bcrypt. Your data stays yours.' },
  { icon: BarChart2, title: 'Completion Score',   desc: 'Track how polished your portfolio is at a glance.' },
  { icon: Share2,    title: 'No Login Required',  desc: 'Visitors see your public page instantly, no account needed.' },
]

export default function LandingPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0f', color: '#e8e8f0' }}>
      <Navbar />

      {/* ── Hero ── */}
      <section style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', padding: '5rem 1.5rem 3rem', overflow: 'hidden' }}>

        {/* Orb left */}
        <div style={{ position: 'absolute', top: '25%', left: '20%', width: '28rem', height: '28rem', borderRadius: '50%', background: 'radial-gradient(circle, rgba(124,58,237,0.25) 0%, transparent 70%)', filter: 'blur(60px)', pointerEvents: 'none' }} />
        {/* Orb right */}
        <div style={{ position: 'absolute', bottom: '20%', right: '15%', width: '22rem', height: '22rem', borderRadius: '50%', background: 'radial-gradient(circle, rgba(37,99,235,0.2) 0%, transparent 70%)', filter: 'blur(60px)', pointerEvents: 'none' }} />

        <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', maxWidth: '760px', margin: '0 auto' }}>

          {/* Badge */}
          <div className="animate-fade-up" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.375rem 0.875rem', borderRadius: '9999px', marginBottom: '2rem', background: 'rgba(124,58,237,0.15)', border: '1px solid rgba(124,58,237,0.35)', color: '#a78bfa', fontSize: '0.75rem', fontFamily: 'var(--font-mono)' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#a78bfa' }} className="animate-pulse" />
            Built for developers &amp; creatives
          </div>

          {/* ── HEADLINE — uses safe split to avoid gradient-text cutting off ── */}
          <h1 className="animate-fade-up delay-100"
            style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(2.8rem, 8vw, 5rem)', lineHeight: 1.05, letterSpacing: '-0.025em', color: '#f0f0ff', marginBottom: '1.5rem' }}>
            Your story,<br />
            <span style={{
              background: 'linear-gradient(135deg, #c4b5fd 0%, #818cf8 45%, #34d399 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              display: 'inline-block',
              color: '#a78bfa', /* hard fallback */
            }}>
              beautifully told.
            </span>
          </h1>

          <p className="animate-fade-up delay-200"
            style={{ fontSize: '1.125rem', color: 'rgba(232,232,240,0.55)', marginBottom: '2.5rem', maxWidth: '520px', margin: '0 auto 2.5rem', lineHeight: 1.7, fontFamily: 'var(--font-body)' }}>
            Build a stunning personal portfolio in minutes. Add your projects, skills, and socials.
            Share one link. Make an impression.
          </p>

          <div className="animate-fade-up delay-300" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
            <Link to="/signup" className="btn-primary" style={{ fontSize: '1rem', padding: '0.875rem 2rem', gap: '0.5rem' }}>
              Start building free <ArrowRight size={16} />
            </Link>
            <Link to="/portfolio/demo" className="btn-ghost" style={{ fontSize: '1rem' }}>
              See a demo →
            </Link>
          </div>
        </div>

        {/* ── Browser mockup ── */}
        <div className="animate-fade-up delay-400" style={{ position: 'relative', zIndex: 10, marginTop: '4rem', width: '100%', maxWidth: '640px' }}>
          <div className="glass" style={{ borderRadius: '1.25rem', padding: '1px', boxShadow: '0 40px 80px rgba(0,0,0,0.7)' }}>
            <div style={{ borderRadius: '1.125rem', overflow: 'hidden', background: '#0d0d1a' }}>
              {/* Browser chrome */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1rem', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'rgba(239,68,68,0.5)' }} />
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'rgba(234,179,8,0.5)' }} />
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'rgba(34,197,94,0.5)' }} />
                <div style={{ flex: 1, margin: '0 1rem', padding: '0.25rem 0.75rem', borderRadius: '0.375rem', background: 'rgba(255,255,255,0.05)', textAlign: 'center', color: 'rgba(255,255,255,0.3)', fontSize: '0.7rem', fontFamily: 'var(--font-mono)' }}>
                  folioforge/portfolio/yourname
                </div>
              </div>
              {/* Content */}
              <div style={{ padding: '1.5rem', display: 'flex', alignItems: 'flex-start', gap: '1.25rem' }}>
                <div style={{ width: '56px', height: '56px', borderRadius: '0.875rem', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.25rem', color: '#a78bfa', background: 'rgba(124,58,237,0.22)', border: '1px solid rgba(124,58,237,0.35)' }}>
                  A
                </div>
                <div style={{ flex: 1 }}>
                  <div className="skeleton" style={{ height: '18px', width: '140px', marginBottom: '8px' }} />
                  <div className="skeleton" style={{ height: '12px', width: '200px', marginBottom: '14px', opacity: 0.5 }} />
                  <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>
                    {['React', 'Node.js', 'MongoDB', 'TypeScript'].map(s => (
                      <span key={s} className="tag-chip">{s}</span>
                    ))}
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                    {[1, 2].map(i => (
                      <div key={i} className="glass" style={{ borderRadius: '0.75rem', padding: '0.75rem' }}>
                        <div className="skeleton" style={{ height: '11px', width: '80px', marginBottom: '6px' }} />
                        <div className="skeleton" style={{ height: '9px', width: '100%', opacity: 0.5 }} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section style={{ padding: '6rem 1.5rem' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(1.75rem, 4vw, 2.25rem)', textAlign: 'center', marginBottom: '0.75rem', color: '#f0f0ff' }}>
            Everything you need
          </h2>
          <p style={{ textAlign: 'center', color: 'rgba(232,232,240,0.4)', marginBottom: '3.5rem', fontFamily: 'var(--font-body)' }}>
            No fluff. Just the right tools.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1rem' }}>
            {features.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="glass glass-hover" style={{ borderRadius: '1.25rem', padding: '1.25rem' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem', background: 'rgba(124,58,237,0.18)', border: '1px solid rgba(124,58,237,0.28)' }}>
                  <Icon size={18} color="#a78bfa" />
                </div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 600, marginBottom: '0.4rem', color: 'rgba(240,240,255,0.9)', fontSize: '0.95rem' }}>{title}</h3>
                <p style={{ fontSize: '0.85rem', color: 'rgba(232,232,240,0.4)', lineHeight: 1.6, fontFamily: 'var(--font-body)' }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ padding: '4rem 1.5rem 6rem', textAlign: 'center' }}>
        <div style={{ maxWidth: '520px', margin: '0 auto', background: 'rgba(124,58,237,0.07)', border: '1px solid rgba(124,58,237,0.22)', borderRadius: '1.75rem', padding: '3.5rem 2.5rem' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.875rem', marginBottom: '0.75rem', color: '#f0f0ff' }}>
            Ready to stand out?
          </h2>
          <p style={{ color: 'rgba(232,232,240,0.4)', marginBottom: '2rem', fontFamily: 'var(--font-body)' }}>Free to start. No credit card required.</p>
          <Link to="/signup" className="btn-primary" style={{ fontSize: '1rem', padding: '0.875rem 2rem', gap: '0.5rem' }}>
            Create your portfolio <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <footer style={{ textAlign: 'center', padding: '1.5rem', color: 'rgba(232,232,240,0.2)', fontSize: '0.8rem', borderTop: '1px solid rgba(255,255,255,0.05)', fontFamily: 'var(--font-body)' }}>
        FolioForge — Built with React, Node.js &amp; MongoDB
      </footer>
    </div>
  )
}
