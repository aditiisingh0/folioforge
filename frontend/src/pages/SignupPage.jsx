import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { User, Mail, Lock, AtSign, Eye, EyeOff, ArrowRight } from 'lucide-react'
import toast from 'react-hot-toast'

export default function SignupPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '', username: '' })
  const [showPw, setShowPw] = useState(false)
  const [loading, setLoading] = useState(false)
  const { signup } = useAuth()
  const navigate = useNavigate()

  const handle = (e) => {
    let val = e.target.value
    if (e.target.name === 'username') val = val.toLowerCase().replace(/[^a-z0-9_-]/g, '')
    setForm({ ...form, [e.target.name]: val })
  }

  const submit = async (e) => {
    e.preventDefault()
    const { name, email, password, username } = form
    if (!name || !email || !password || !username) return toast.error('Please fill in all fields.')
    if (password.length < 6) return toast.error('Password must be at least 6 characters.')
    if (username.length < 3) return toast.error('Username must be at least 3 characters.')
    setLoading(true)
    try {
      await signup(name, email, password, username)
      toast.success('Account created! Welcome 🎉')
      navigate('/dashboard')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Signup failed.')
    } finally {
      setLoading(false)
    }
  }

  const fields = [
    { name: 'name',     label: 'Full Name',  icon: User,   type: 'text',     placeholder: 'Alex Johnson',      autocomplete: 'name' },
    { name: 'username', label: 'Username',   icon: AtSign, type: 'text',     placeholder: 'alexj',             autocomplete: 'username' },
    { name: 'email',    label: 'Email',      icon: Mail,   type: 'email',    placeholder: 'alex@example.com',  autocomplete: 'email' },
  ]

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12" style={{ background: '#0a0a0f' }}>
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full opacity-15 blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, #4f46e5 0%, transparent 70%)' }} />

      <div className="relative z-10 w-full max-w-md">
        <Link to="/" className="block text-center font-700 text-xl mb-8 gradient-text"
          style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700 }}>
          folio<span style={{ color: '#a78bfa' }}>Forge</span>
        </Link>git remote -v

        <div className="glass rounded-2xl p-8 animate-fade-up">
          <h1 className="text-2xl font-700 mb-1" style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700 }}>Create your account</h1>
          <p className="text-white/40 text-sm mb-8" style={{ fontFamily: 'DM Sans, sans-serif' }}>Your portfolio awaits.</p>

          <form onSubmit={submit} className="space-y-4">
            {fields.map(({ name, label, icon: Icon, type, placeholder, autocomplete }) => (
              <div key={name}>
                <label className="block text-xs text-white/50 mb-1.5 font-500" style={{ fontFamily: 'DM Sans, sans-serif' }}>{label}</label>
                <div className="relative">
                  <Icon size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
                  <input
                    name={name} type={type} value={form[name]} onChange={handle}
                    placeholder={placeholder} autoComplete={autocomplete}
                    className="input-field pl-9"
                  />
                </div>
                {name === 'username' && form.username && (
                  <p className="text-xs text-white/30 mt-1 pl-1" style={{ fontFamily: 'DM Mono, monospace' }}>
                    FolioForge/portfolio/{form.username}
                  </p>
                )}
              </div>
            ))}

            <div>
              <label className="block text-xs text-white/50 mb-1.5 font-500" style={{ fontFamily: 'DM Sans, sans-serif' }}>Password</label>
              <div className="relative">
                <Lock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
                <input
                  name="password" type={showPw ? 'text' : 'password'} value={form.password} onChange={handle}
                  placeholder="Min. 6 characters" autoComplete="new-password"
                  className="input-field pl-9 pr-10"
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
                <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /><span>Creating account…</span></>
              ) : (
                <><span>Create account</span><ArrowRight size={15} className="relative z-10" /></>
              )}
            </button>
          </form>

          <p className="text-center text-sm text-white/40 mt-6" style={{ fontFamily: 'DM Sans, sans-serif' }}>
            Already have an account?{' '}
            <Link to="/login" className="text-violet-400 hover:text-violet-300 transition-colors font-500">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
