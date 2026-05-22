import { useState } from 'react'
import { ChevronRight, Paintbrush, Droplet, Zap, Truck, Sparkles, Trees, Bug, Wind, Hammer, Settings, Wrench, Briefcase } from 'lucide-react'
import { supabase } from '../../lib/supabase'
import { useAuth } from '../../contexts/AuthContext'

const CATEGORIES = [
  { id: 'pintura', label: 'Pintura', icon: Paintbrush, color: '#D97757' },
  { id: 'fontaneria', label: 'Fontanería', icon: Droplet, color: '#4A6FA5' },
  { id: 'electricidad', label: 'Electricidad', icon: Zap, color: '#E0A458' },
  { id: 'mudanza', label: 'Mudanza', icon: Truck, color: '#6B8E4E' },
  { id: 'limpieza', label: 'Limpieza', icon: Sparkles, color: '#9B6B9E' },
  { id: 'jardineria', label: 'Jardinería', icon: Trees, color: '#5C7F3E' },
  { id: 'plagas', label: 'Plagas', icon: Bug, color: '#7A5C3E' },
  { id: 'aire', label: 'Aire acond.', icon: Wind, color: '#5A8DA8' },
  { id: 'carpinteria', label: 'Carpintería', icon: Hammer, color: '#8B6F47' },
  { id: 'cerrajeria', label: 'Cerrajería', icon: Settings, color: '#6E6E6E' },
  { id: 'albanileria', label: 'Albañilería', icon: Wrench, color: '#A0826D' },
  { id: 'todos', label: 'Todoterreno', icon: Briefcase, color: '#D97757' },
]

export default function ProviderSetupForm({ onComplete }) {
  const { user, fetchProfile } = useAuth()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    full_name: '',
    company: '',
    category: '',
    phone: '',
    years_experience: '',
    reference_price: '',
    bio: '',
  })

  const set = (key, val) => setForm(prev => ({ ...prev, [key]: val }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.category) { setError('Elige una categoría de servicio.'); return }
    setLoading(true)
    setError('')

    const { error: profileErr } = await supabase
      .from('profiles')
      .update({ full_name: form.full_name })
      .eq('id', user.id)

    if (profileErr) { setError(profileErr.message); setLoading(false); return }

    const { error: providerErr } = await supabase
      .from('providers')
      .upsert({
        id: user.id,
        company: form.company,
        category: form.category,
        phone: form.phone,
        years_experience: parseInt(form.years_experience) || 0,
        reference_price: form.reference_price,
        bio: form.bio,
      })

    if (providerErr) { setError(providerErr.message); setLoading(false); return }

    await fetchProfile(user.id)
    onComplete()
    setLoading(false)
  }

  return (
    <div className="min-h-screen" style={{ background: '#F4EFE6', fontFamily: 'Georgia, serif' }}>
      <div className="max-w-md mx-auto px-5 pt-12 pb-32">
        <div className="mb-5 inline-block px-4 py-1.5 rounded-full" style={{ background: 'rgba(217,119,87,0.15)' }}>
          <p className="text-xs uppercase tracking-widest" style={{ color: '#A8553C', fontFamily: 'system-ui', fontWeight: 700 }}>
            Krafio · Nuevo proveedor
          </p>
        </div>

        <h1 className="text-4xl leading-tight mb-2" style={{ color: '#2C2416', fontStyle: 'italic', fontWeight: 400 }}>
          Crea tu perfil<br />
          <span style={{ color: '#D97757' }}>profesional</span>
        </h1>
        <p className="text-sm mb-8" style={{ color: '#7A6F5C', fontFamily: 'system-ui' }}>
          Los clientes verán esta información. Puedes editarlo después.
        </p>

        {error && (
          <div className="mb-4 p-3 rounded-xl text-sm" style={{ background: '#FAE4DC', color: '#A8553C', fontFamily: 'system-ui' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {[
            { key: 'full_name', label: 'Tu nombre completo', placeholder: 'Ej: Martín Restrepo', required: true },
            { key: 'company', label: 'Nombre del negocio', placeholder: 'Ej: Pinturas Restrepo', required: true },
            { key: 'phone', label: 'Teléfono de contacto', placeholder: '+57 300 123 4567', required: true },
            { key: 'years_experience', label: 'Años de experiencia', placeholder: '5', type: 'number', required: true },
            { key: 'reference_price', label: 'Precio referencial (opcional)', placeholder: 'Ej: Desde $80.000', required: false },
          ].map(f => (
            <div key={f.key}>
              <label className="text-xs uppercase tracking-wider block mb-1.5" style={{ color: '#7A6F5C', fontFamily: 'system-ui', fontWeight: 600 }}>
                {f.label}
              </label>
              <input
                type={f.type || 'text'}
                placeholder={f.placeholder}
                value={form[f.key]}
                onChange={e => set(f.key, e.target.value)}
                required={f.required}
                min={f.type === 'number' ? 0 : undefined}
                className="w-full px-4 py-3 rounded-xl outline-none border"
                style={{ borderColor: '#D4C9B5', background: 'white', color: '#2C2416', fontFamily: 'system-ui' }}
              />
            </div>
          ))}

          <div>
            <label className="text-xs uppercase tracking-wider block mb-2" style={{ color: '#7A6F5C', fontFamily: 'system-ui', fontWeight: 600 }}>
              Categoría principal *
            </label>
            <div className="grid grid-cols-3 gap-2">
              {CATEGORIES.map(cat => {
                const Icon = cat.icon
                const selected = form.category === cat.id
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => set('category', cat.id)}
                    className="p-3 rounded-xl flex flex-col items-center gap-1.5 border-2 transition-all"
                    style={{
                      borderColor: selected ? cat.color : 'transparent',
                      background: selected ? `${cat.color}22` : 'white',
                    }}
                  >
                    <Icon size={20} color={cat.color} />
                    <span className="text-xs text-center leading-tight" style={{ color: '#2C2416', fontFamily: 'system-ui', fontWeight: selected ? 600 : 400 }}>
                      {cat.label}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          <div>
            <label className="text-xs uppercase tracking-wider block mb-1.5" style={{ color: '#7A6F5C', fontFamily: 'system-ui', fontWeight: 600 }}>
              Descripción del servicio
            </label>
            <textarea
              rows={4}
              placeholder="Cuéntales a los clientes qué haces y qué te hace único..."
              value={form.bio}
              onChange={e => set('bio', e.target.value)}
              className="w-full px-4 py-3 rounded-xl outline-none border resize-none"
              style={{ borderColor: '#D4C9B5', background: 'white', color: '#2C2416', fontFamily: 'system-ui' }}
            />
          </div>

          <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto px-5 py-4" style={{ background: 'linear-gradient(to top, #F4EFE6 70%, transparent)' }}>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-2xl flex items-center justify-center gap-2 shadow-lg"
              style={{ background: '#2C2416', color: '#F4EFE6', fontFamily: 'system-ui', fontWeight: 600, opacity: loading ? 0.7 : 1 }}
            >
              {loading ? 'Guardando...' : 'Guardar y continuar'}
              <ChevronRight size={20} />
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
