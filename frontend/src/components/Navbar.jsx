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
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
      height: '4rem', display: 'flex', alignItems: 'center', padding: '0 1.5rem',
      background: 'rgba(10,10,15,0.85)', backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(255,255,255,0.06)',
    }}>
      {/* Brand */}
      <Link to="/" style={{ marginRight: 'auto', textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
        <span style={{
          fontFamily: 'Syne, Arial Black, sans-serif', fontWeight: 800, fontSize: '1.125rem',
          background: 'linear-gradient(135deg, #c4b5fd, #818cf8)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          backgroundClip: 'text', color: '#a78bfa', /* fallback */
          display: 'inline-block',
        }}>
          folio
        </span>
        <span style={{ color: '#a78bfa', fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '1.125rem' }}>.</span>
        <span style={{ fontFamily: 'Syne, Arial Black, sans-serif', fontWeight: 800, fontSize: '1.125rem', color: '#e8e8f0' }}>build</span>
      </Link>

      {user ? (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Link to="/dashboard" style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', color: 'rgba(255,255,255,0.55)', textDecoration: 'none', fontSize: '0.875rem', padding: '0.375rem 0.75rem', borderRadius: '0.5rem', fontFamily: 'var(--font-body)', transition: 'color 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.color = 'rgba(255,255,255,0.9)'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.55)'}>
            <LayoutDashboard size={14} /> Dashboard
          </Link>
          <Link to={`/portfolio/${user.username}`} target="_blank"
            style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', color: 'rgba(255,255,255,0.55)', textDecoration: 'none', fontSize: '0.875rem', padding: '0.375rem 0.75rem', borderRadius: '0.5rem', fontFamily: 'var(--font-body)', transition: 'color 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.color = 'rgba(255,255,255,0.9)'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.55)'}>
            <Eye size={14} /> View Portfolio
          </Link>
          <div style={{ width: '1px', height: '20px', background: 'rgba(255,255,255,0.1)', margin: '0 0.25rem' }} />
          <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(124,58,237,0.3)', border: '1px solid rgba(124,58,237,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#c4b5fd', fontSize: '0.875rem', fontFamily: 'var(--font-display)', fontWeight: 600 }}>
            {user.name?.[0]?.toUpperCase()}
          </div>
          <button onClick={handleLogout} style={{ padding: '0.375rem', color: 'rgba(255,255,255,0.35)', background: 'none', border: 'none', cursor: 'pointer', borderRadius: '0.5rem', display: 'flex', transition: 'color 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.color = 'rgba(255,255,255,0.8)'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.35)'}>
            <LogOut size={15} />
          </button>
        </div>
      ) : (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <Link to="/login" className="btn-ghost" style={{ fontSize: '0.875rem', padding: '0.5rem 1.25rem' }}>Log in</Link>
          <Link to="/signup" className="btn-primary" style={{ fontSize: '0.875rem', padding: '0.5rem 1.25rem' }}>Get started</Link>
        </div>
      )}
    </nav>
  )
}
