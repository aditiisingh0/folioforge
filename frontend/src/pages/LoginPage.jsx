import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react'
import toast from 'react-hot-toast'

export default function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [showPw, setShowPw] = useState(false)
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const submit = async (e) => {
    e.preventDefault()
    if (!form.email || !form.password) return toast.error('Please fill in all fields.')
    setLoading(true)
    try {
      await login(form.email, form.password)
      toast.success('Welcome back!')
      navigate('/dashboard')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: '#0a0a0f' }}>
      {/* Background */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full opacity-15 blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, #7c3aed 0%, transparent 70%)' }} />

      <div className="relative z-10 w-full max-w-md">
        <Link to="/" className="block text-center font-700 text-xl mb-8 gradient-text"
          style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700 }}>
          folio<span style={{ color: '#a78bfa' }}>Forge</span>
        </Link>

        <div className="glass rounded-2xl p-8 animate-fade-up">
          <h1 className="text-2xl font-700 mb-1" style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700 }}>Welcome back</h1>
          <p className="text-white/40 text-sm mb-8" style={{ fontFamily: 'DM Sans, sans-serif' }}>Sign in to your account</p>

          <form onSubmit={submit} className="space-y-4">
            <div>
              <label className="block text-xs text-white/50 mb-1.5 font-500" style={{ fontFamily: 'DM Sans, sans-serif' }}>Email</label>
              <div className="relative">
                <Mail size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
                <input
                  name="email" type="email" value={form.email} onChange={handle}
                  placeholder="you@example.com"
                  className="input-field pl-9"
                  autoComplete="email"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs text-white/50 mb-1.5 font-500" style={{ fontFamily: 'DM Sans, sans-serif' }}>Password</label>
              <div className="relative">
                <Lock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
                <input
                  name="password" type={showPw ? 'text' : 'password'} value={form.password} onChange={handle}
                  placeholder="••••••••"
                  className="input-field pl-9 pr-10"
                  autoComplete="current-password"
                />
                <button type="button" onClick={() => setShowPw(!showPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors">
                  {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading}
              className="btn-primary w-full flex items-center justify-center gap-2 mt-2"
              style={{ opacity: loading ? 0.7 : 1 }}>
              {loading ? (
                <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /><span>Signing in…</span></>
              ) : (
                <><span>Sign in</span><ArrowRight size={15} className="relative z-10" /></>
              )}
            </button>
          </form>

          <p className="text-center text-sm text-white/40 mt-6" style={{ fontFamily: 'DM Sans, sans-serif' }}>
            Don't have an account?{' '}
            <Link to="/signup" className="text-violet-400 hover:text-violet-300 transition-colors font-500">Create one</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
