import { Link } from 'react-router-dom'
import { ArrowRight, Zap, Globe, Palette, Lock, BarChart2, Share2 } from 'lucide-react'
import Navbar from '../components/Navbar'

const features = [
  { icon: Zap,      title: 'Live Preview',     desc: 'See your portfolio update in real-time as you type.' },
  { icon: Globe,    title: 'Public URL',        desc: 'Share a clean URL — /portfolio/yourname — with anyone.' },
  { icon: Palette,  title: '5 Themes',          desc: 'Aurora, Midnight, Slate, Forest, Crimson. Pick your vibe.' },
  { icon: Lock,     title: 'Secure Auth',       desc: 'JWT + bcrypt. Your data stays yours.' },
  { icon: BarChart2,'title': 'Completion Score', desc: 'Track how polished your portfolio is.' },
  { icon: Share2,   title: 'No Login Required', desc: 'Visitors see your public page instantly.' },
]

export default function LandingPage() {
  return (
    <div className="min-h-screen" style={{ background: '#0a0a0f' }}>
      <Navbar />

      {/* Hero */}
      <section className="relative flex flex-col items-center justify-center min-h-screen px-6 pt-16 overflow-hidden">
        {/* Background orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-20 blur-3xl pointer-events-none"
          style={{ background: 'radial-gradient(circle, #7c3aed 0%, transparent 70%)' }} />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-15 blur-3xl pointer-events-none"
          style={{ background: 'radial-gradient(circle, #2563eb 0%, transparent 70%)' }} />

        <div className="relative z-10 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-8 text-xs font-500 animate-fade-up"
            style={{ background: 'rgba(124,58,237,0.15)', border: '1px solid rgba(124,58,237,0.3)', color: '#a78bfa', fontFamily: 'DM Mono, monospace' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
            Built for developers & creatives
          </div>

          <h1 className="text-5xl sm:text-7xl font-800 leading-none mb-6 animate-fade-up delay-100"
            style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, lineHeight: 1.05 }}>
            Your story,<br />
            <span className="gradient-text">beautifully told.</span>
          </h1>

          <p className="text-lg text-white/50 mb-10 max-w-xl mx-auto leading-relaxed animate-fade-up delay-200"
            style={{ fontFamily: 'DM Sans, sans-serif' }}>
            Build a stunning personal portfolio in minutes. Add your projects, skills, and socials.
            Share one link. Make an impression.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up delay-300">
            <Link to="/signup" className="btn-primary flex items-center gap-2 text-base px-6 py-3">
              <span>Start building free</span>
              <ArrowRight size={16} className="relative z-10" />
            </Link>
            <Link to="/portfolio/demo" className="btn-ghost text-base">
              See a demo →
            </Link>
          </div>
        </div>

        {/* Floating preview card */}
        <div className="relative z-10 mt-20 w-full max-w-2xl mx-auto animate-fade-up delay-400">
          <div className="glass rounded-2xl p-1" style={{ boxShadow: '0 40px 80px rgba(0,0,0,0.6)' }}>
            <div className="rounded-xl overflow-hidden" style={{ background: '#0d0d1a' }}>
              {/* Fake browser bar */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5">
                <div className="w-3 h-3 rounded-full bg-red-500/50" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                <div className="w-3 h-3 rounded-full bg-green-500/50" />
                <div className="flex-1 mx-4 px-3 py-1 rounded text-xs text-white/30 text-center" style={{ background: 'rgba(255,255,255,0.05)', fontFamily: 'DM Mono, monospace' }}>
                  FolioForge/portfolio/yourname
                </div>
              </div>
              {/* Preview content */}
              <div className="p-6 flex items-start gap-5">
                <div className="w-16 h-16 rounded-2xl flex-shrink-0 flex items-center justify-center text-2xl font-700"
                  style={{ background: 'rgba(124,58,237,0.25)', border: '1px solid rgba(124,58,237,0.4)', fontFamily: 'Syne, sans-serif', fontWeight: 700, color: '#a78bfa' }}>
                  A
                </div>
                <div className="flex-1">
                  <div className="h-5 w-40 rounded skeleton mb-2" />
                  <div className="h-3 w-56 rounded skeleton mb-4 opacity-50" />
                  <div className="flex gap-2 mb-4">
                    {['React', 'Node.js', 'MongoDB', 'TypeScript'].map(s => (
                      <span key={s} className="tag-chip">{s}</span>
                    ))}
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {[1,2].map(i => (
                      <div key={i} className="glass rounded-xl p-3">
                        <div className="h-3 w-24 rounded skeleton mb-2" />
                        <div className="h-2.5 w-full rounded skeleton opacity-50" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-700 text-center mb-4" style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700 }}>
            Everything you need
          </h2>
          <p className="text-white/40 text-center mb-14" style={{ fontFamily: 'DM Sans, sans-serif' }}>No fluff. Just the right tools.</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="glass glass-hover rounded-2xl p-5">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: 'rgba(124,58,237,0.2)', border: '1px solid rgba(124,58,237,0.3)' }}>
                  <Icon size={18} style={{ color: '#a78bfa' }} />
                </div>
                <h3 className="font-600 mb-1.5 text-white/90" style={{ fontFamily: 'Syne, sans-serif', fontWeight: 600 }}>{title}</h3>
                <p className="text-sm text-white/40 leading-relaxed" style={{ fontFamily: 'DM Sans, sans-serif' }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 text-center">
        <div className="max-w-xl mx-auto glass rounded-3xl p-12" style={{ background: 'rgba(124,58,237,0.07)', border: '1px solid rgba(124,58,237,0.2)' }}>
          <h2 className="text-3xl font-700 mb-3" style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700 }}>
            Ready to stand out?
          </h2>
          <p className="text-white/40 mb-8" style={{ fontFamily: 'DM Sans, sans-serif' }}>Free to start. No credit card required.</p>
          <Link to="/signup" className="btn-primary inline-flex items-center gap-2 text-base px-7 py-3">
            <span>Create your portfolio</span>
            <ArrowRight size={16} className="relative z-10" />
          </Link>
        </div>
      </section>

      <footer className="text-center py-8 text-white/20 text-sm border-t border-white/5" style={{ fontFamily: 'DM Sans, sans-serif' }}>
        FolioForge — Built with React, Node.js & MongoDB
      </footer>
    </div>
  )
}
