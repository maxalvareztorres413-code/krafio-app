import { useState } from 'react'
import { X, Home, Briefcase, Mail, Lock, User, Eye, EyeOff } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'

const GoogleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
  </svg>
)

export default function AuthModal({ onClose, onSuccess, defaultRole = null }) {
  const { signIn, signUp, signInWithGoogle } = useAuth()
  const [step, setStep] = useState(defaultRole ? 'auth' : 'role')
  const [role, setRole] = useState(defaultRole)
  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({ email: '', password: '', fullName: '' })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const result = isLogin
      ? await signIn(form.email, form.password)
      : await signUp(form.email, form.password, role, form.fullName)

    if (result.error) {
      const msg = result.error.message
      setError(
        msg.includes('Invalid login') ? 'Correo o contraseña incorrectos.' :
        msg.includes('already registered') ? 'Este correo ya tiene una cuenta.' :
        msg.includes('Password should') ? 'La contraseña debe tener al menos 6 caracteres.' :
        msg
      )
    } else {
      onSuccess()
    }
    setLoading(false)
  }

  const handleGoogle = async () => {
    setLoading(true)
    const { error } = await signInWithGoogle(role)
    if (error) setError(error.message)
    setLoading(false)
  }

  const inputStyle = {
    background: 'white',
    borderColor: '#D4C9B5',
    color: '#2C2416',
    fontFamily: 'system-ui',
    fontSize: '15px',
  }

  if (step === 'role') {
    return (
      <div className="fixed inset-0 z-50 flex items-end justify-center" style={{ background: 'rgba(0,0,0,0.5)' }} onClick={onClose}>
        <div className="w-full max-w-md rounded-t-3xl p-6 pb-8" style={{ background: '#F4EFE6' }} onClick={e => e.stopPropagation()}>
          <div className="w-12 h-1 rounded-full mx-auto mb-6" style={{ background: '#D4C9B5' }} />
          <h2 className="text-2xl mb-1" style={{ color: '#2C2416', fontFamily: 'Georgia, serif', fontStyle: 'italic' }}>
            ¿Cómo quieres entrar?
          </h2>
          <p className="text-sm mb-6" style={{ color: '#7A6F5C', fontFamily: 'system-ui' }}>
            Elige tu rol para continuar en Krafio.
          </p>
          <div className="space-y-3">
            <button
              onClick={() => { setRole('client'); setStep('auth') }}
              className="w-full p-5 rounded-2xl flex items-center gap-4 text-left"
              style={{ background: '#2C2416', color: '#F4EFE6' }}
            >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(244,239,230,0.15)' }}>
                <Home size={22} color="#F4EFE6" />
              </div>
              <div>
                <div className="text-xs uppercase tracking-wider opacity-60 mb-0.5" style={{ fontFamily: 'system-ui' }}>Soy cliente</div>
                <div className="text-base" style={{ fontFamily: 'system-ui', fontWeight: 500 }}>Necesito un servicio</div>
              </div>
            </button>
            <button
              onClick={() => { setRole('provider'); setStep('auth') }}
              className="w-full p-5 rounded-2xl flex items-center gap-4 text-left border-2"
              style={{ borderColor: '#2C2416', color: '#2C2416', background: 'transparent' }}
            >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: '#EBE4D4' }}>
                <Briefcase size={22} color="#2C2416" />
              </div>
              <div>
                <div className="text-xs uppercase tracking-wider opacity-60 mb-0.5" style={{ fontFamily: 'system-ui' }}>Soy proveedor</div>
                <div className="text-base" style={{ fontFamily: 'system-ui', fontWeight: 500 }}>Quiero ofrecer servicios</div>
              </div>
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center" style={{ background: 'rgba(0,0,0,0.5)' }} onClick={onClose}>
      <div className="w-full max-w-md rounded-t-3xl p-6 pb-8" style={{ background: '#F4EFE6' }} onClick={e => e.stopPropagation()}>
        <div className="w-12 h-1 rounded-full mx-auto mb-5" style={{ background: '#D4C9B5' }} />

        <div className="flex items-start justify-between mb-5">
          <div>
            <h2 className="text-2xl" style={{ color: '#2C2416', fontFamily: 'Georgia, serif', fontStyle: 'italic' }}>
              {isLogin ? 'Bienvenido de vuelta' : 'Crea tu cuenta'}
            </h2>
            <p className="text-xs mt-0.5" style={{ color: '#7A6F5C', fontFamily: 'system-ui' }}>
              {role === 'client' ? '👤 Cuenta de cliente' : '🔧 Cuenta de proveedor'}
              <button onClick={() => setStep('role')} className="ml-2 underline">Cambiar</button>
            </p>
          </div>
          <button onClick={onClose} className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: '#EBE4D4' }}>
            <X size={16} color="#2C2416" />
          </button>
        </div>

        <button
          onClick={handleGoogle}
          disabled={loading}
          className="w-full py-3.5 rounded-2xl flex items-center justify-center gap-3 mb-4 border"
          style={{ borderColor: '#D4C9B5', background: 'white', color: '#2C2416', fontFamily: 'system-ui', fontWeight: 500 }}
        >
          <GoogleIcon />
          Continuar con Google
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="flex-1 h-px" style={{ background: '#D4C9B5' }} />
          <span className="text-xs" style={{ color: '#7A6F5C', fontFamily: 'system-ui' }}>o con correo</span>
          <div className="flex-1 h-px" style={{ background: '#D4C9B5' }} />
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-xl text-sm" style={{ background: '#FAE4DC', color: '#A8553C', fontFamily: 'system-ui' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3">
          {!isLogin && (
            <div className="relative">
              <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2" color="#7A6F5C" />
              <input
                type="text"
                placeholder="Nombre completo"
                value={form.fullName}
                onChange={e => setForm({ ...form, fullName: e.target.value })}
                required
                className="w-full py-3.5 pl-11 pr-4 rounded-xl outline-none border"
                style={inputStyle}
              />
            </div>
          )}
          <div className="relative">
            <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2" color="#7A6F5C" />
            <input
              type="email"
              placeholder="Correo electrónico"
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
              required
              className="w-full py-3.5 pl-11 pr-4 rounded-xl outline-none border"
              style={inputStyle}
            />
          </div>
          <div className="relative">
            <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2" color="#7A6F5C" />
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Contraseña"
              value={form.password}
              onChange={e => setForm({ ...form, password: e.target.value })}
              required
              className="w-full py-3.5 pl-11 pr-12 rounded-xl outline-none border"
              style={inputStyle}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2"
            >
              {showPassword ? <EyeOff size={16} color="#7A6F5C" /> : <Eye size={16} color="#7A6F5C" />}
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-2xl"
            style={{
              background: '#D97757',
              color: 'white',
              fontFamily: 'system-ui',
              fontWeight: 600,
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? 'Cargando...' : isLogin ? 'Iniciar sesión' : 'Crear cuenta'}
          </button>
        </form>

        <p className="text-center mt-4 text-sm" style={{ color: '#7A6F5C', fontFamily: 'system-ui' }}>
          {isLogin ? '¿No tienes cuenta?' : '¿Ya tienes cuenta?'}{' '}
          <button
            onClick={() => { setIsLogin(!isLogin); setError('') }}
            style={{ color: '#D97757', fontWeight: 600 }}
          >
            {isLogin ? 'Regístrate' : 'Inicia sesión'}
          </button>
        </p>
      </div>
    </div>
  )
}
