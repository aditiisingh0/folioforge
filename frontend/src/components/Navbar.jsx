import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { LogOut, LayoutDashboard, Eye } from 'lucide-react'
import toast from 'react-hot-toast'

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    toast.success('Logged out')
    navigate('/')
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-16 flex items-center px-6 border-b border-white/5"
      style={{ background: 'rgba(10,10,15,0.8)', backdropFilter: 'blur(12px)' }}>
      <Link to="/" className="font-display text-lg font-700 gradient-text mr-auto" style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700 }}>
        folio<span style={{ color: '#a78bfa' }}>Forge</span>
      </Link>

      {user ? (
        <div className="flex items-center gap-3">
          <Link to="/dashboard" className="flex items-center gap-1.5 text-sm text-white/60 hover:text-white/90 transition-colors px-3 py-1.5 rounded-lg hover:bg-white/5">
            <LayoutDashboard size={15} />
            <span style={{ fontFamily: 'DM Sans, sans-serif' }}>Dashboard</span>
          </Link>
          <Link to={`/portfolio/${user.username}`} target="_blank"
            className="flex items-center gap-1.5 text-sm text-white/60 hover:text-white/90 transition-colors px-3 py-1.5 rounded-lg hover:bg-white/5">
            <Eye size={15} />
            <span style={{ fontFamily: 'DM Sans, sans-serif' }}>View Portfolio</span>
          </Link>
          <div className="w-px h-5 bg-white/10 mx-1" />
          <div className="w-8 h-8 rounded-full bg-violet-600/30 border border-violet-500/30 flex items-center justify-center text-violet-300 text-sm font-600" style={{ fontFamily: 'Syne, sans-serif', fontWeight: 600 }}>
            {user.name?.[0]?.toUpperCase()}
          </div>
          <button onClick={handleLogout} className="p-2 text-white/40 hover:text-white/80 hover:bg-white/5 rounded-lg transition-all">
            <LogOut size={16} />
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-3">
          <Link to="/login" className="btn-ghost text-sm px-4 py-2">Log in</Link>
          <Link to="/signup" className="btn-primary text-sm px-4 py-2"><span>Get started</span></Link>
        </div>
      )}
    </nav>
  )
}
