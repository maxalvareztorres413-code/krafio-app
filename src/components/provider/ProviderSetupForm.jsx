import { useState } from 'react'
import { ChevronRight, Paintbrush, Droplet, Zap, Truck, Sparkles, Trees, Bug, Wind, Hammer, Settings, Wrench, Briefcase, X, MapPin, Loader, ArrowLeft } from 'lucide-react'
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

const STEPS = [
  { label: 'Lo esencial', hint: 'Nombre, oficio y teléfono' },
  { label: 'Tu perfil', hint: 'Experiencia y descripción' },
  { label: 'Ubicación', hint: 'Zona de trabajo y especialidades' },
]

export default function ProviderSetupForm({ onComplete }) {
  const { user, fetchProfile } = useAuth()
  const [step, setStep] = useState(1)
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
    tags: [],
    address: '',
    latitude: null,
    longitude: null,
  })
  const [tagInput, setTagInput] = useState('')
  const [geocoding, setGeocoding] = useState(false)
  const [geocodeError, setGeocodeError] = useState('')

  const set = (key, val) => setForm(prev => ({ ...prev, [key]: val }))

  const addTag = () => {
    const t = tagInput.trim()
    if (!t || form.tags.length >= 6 || form.tags.includes(t)) { setTagInput(''); return }
    set('tags', [...form.tags, t])
    setTagInput('')
  }

  const removeTag = (t) => set('tags', form.tags.filter(x => x !== t))

  const geocodeAddress = async () => {
    if (!form.address.trim()) return
    setGeocoding(true)
    setGeocodeError('')
    try {
      const q = encodeURIComponent(form.address.trim())
      const res = await fetch(`https://nominatim.openstreetmap.org/search?q=${q}&format=json&limit=1`, {
        headers: { 'User-Agent': 'KrafioApp/1.0' },
      })
      const data = await res.json()
      if (data.length === 0) { setGeocodeError('No encontramos esa dirección. Intenta con más detalles.'); setGeocoding(false); return }
      setForm(prev => ({ ...prev, latitude: parseFloat(data[0].lat), longitude: parseFloat(data[0].lon) }))
    } catch {
      setGeocodeError('Error de conexión al geocodificar.')
    }
    setGeocoding(false)
  }

  const validateStep = () => {
    if (step === 1) {
      if (!form.full_name.trim()) return 'Escribe tu nombre.'
      if (!form.category) return 'Elige una categoría.'
      if (!form.phone.trim()) return 'Agrega tu teléfono.'
    }
    if (step === 2) {
      if (!form.years_experience) return 'Indica tus años de experiencia.'
    }
    return null
  }

  const next = () => {
    const err = validateStep()
    if (err) { setError(err); return }
    setError('')
    setStep(s => s + 1)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
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
        company: form.company || form.full_name,
        category: form.category,
        phone: form.phone,
        years_experience: parseInt(form.years_experience) || 0,
        reference_price: form.reference_price,
        bio: form.bio,
        tags: form.tags,
        address: form.address || null,
        latitude: form.latitude,
        longitude: form.longitude,
      })

    if (providerErr) { setError(providerErr.message); setLoading(false); return }

    await fetchProfile(user.id)
    onComplete()
    setLoading(false)
  }

  const inputStyle = { width: '100%', padding: '14px 16px', borderRadius: 14, border: '1.5px solid #D4C9B5', background: 'white', color: '#2C2416', fontFamily: 'system-ui', fontSize: 15, outline: 'none', boxSizing: 'border-box' }
  const labelStyle = { display: 'block', fontSize: 11, fontFamily: 'system-ui', fontWeight: 700, color: '#7A6F5C', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 6 }

  return (
    <div style={{ minHeight: '100svh', background: '#F4EFE6', fontFamily: 'Georgia, serif' }}>
      <div style={{ maxWidth: 480, margin: '0 auto', padding: '0 0 120px' }}>

        {/* Header */}
        <div style={{ background: '#2C2416', padding: '48px 20px 28px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
            {step > 1 && (
              <button onClick={() => { setStep(s => s - 1); setError('') }} style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(244,239,230,0.12)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <ArrowLeft size={18} color="#F4EFE6" />
              </button>
            )}
            <div>
              <p style={{ color: '#D97757', fontFamily: 'system-ui', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.14em', margin: 0 }}>
                Krafio · Paso {step} de {STEPS.length}
              </p>
            </div>
          </div>

          <h1 style={{ color: '#F4EFE6', fontFamily: 'Georgia, serif', fontStyle: 'italic', fontWeight: 400, fontSize: 30, margin: '0 0 4px' }}>
            {STEPS[step - 1].label}
          </h1>
          <p style={{ color: 'rgba(244,239,230,0.5)', fontFamily: 'system-ui', fontSize: 13, margin: 0 }}>
            {STEPS[step - 1].hint}
          </p>

          {/* Progress bar */}
          <div style={{ display: 'flex', gap: 6, marginTop: 20 }}>
            {STEPS.map((_, i) => (
              <div key={i} style={{ flex: 1, height: 3, borderRadius: 2, background: i < step ? '#D97757' : 'rgba(244,239,230,0.2)', transition: 'background 0.3s' }} />
            ))}
          </div>
        </div>

        <div style={{ padding: '24px 20px' }}>
          {error && (
            <div style={{ marginBottom: 16, padding: '12px 16px', borderRadius: 12, background: '#FAE4DC', color: '#A8553C', fontFamily: 'system-ui', fontSize: 13 }}>
              {error}
            </div>
          )}

          {/* PASO 1 */}
          {step === 1 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <label style={labelStyle}>Tu nombre completo *</label>
                <input style={inputStyle} placeholder="Ej: Martín Restrepo" value={form.full_name} onChange={e => set('full_name', e.target.value)} />
              </div>
              <div>
                <label style={labelStyle}>Nombre de tu negocio (opcional)</label>
                <input style={inputStyle} placeholder="Ej: Pinturas Restrepo" value={form.company} onChange={e => set('company', e.target.value)} />
                <p style={{ fontSize: 11, color: '#B0A898', fontFamily: 'system-ui', marginTop: 4 }}>Si no tienes, usaremos tu nombre.</p>
              </div>
              <div>
                <label style={labelStyle}>Teléfono de contacto *</label>
                <input style={inputStyle} placeholder="+57 300 123 4567" value={form.phone} onChange={e => set('phone', e.target.value)} />
              </div>
              <div>
                <label style={labelStyle}>¿En qué eres experto? *</label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
                  {CATEGORIES.map(cat => {
                    const Icon = cat.icon
                    const selected = form.category === cat.id
                    return (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => set('category', cat.id)}
                        style={{
                          padding: '12px 6px', borderRadius: 14, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
                          border: `2px solid ${selected ? cat.color : 'transparent'}`,
                          background: selected ? `${cat.color}18` : 'white',
                          cursor: 'pointer',
                        }}
                      >
                        <Icon size={20} color={cat.color} />
                        <span style={{ fontSize: 11, color: '#2C2416', fontFamily: 'system-ui', fontWeight: selected ? 700 : 400, textAlign: 'center', lineHeight: 1.2 }}>
                          {cat.label}
                        </span>
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>
          )}

          {/* PASO 2 */}
          {step === 2 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <label style={labelStyle}>Años de experiencia *</label>
                <input style={inputStyle} type="number" min="0" placeholder="Ej: 5" value={form.years_experience} onChange={e => set('years_experience', e.target.value)} />
              </div>
              <div>
                <label style={labelStyle}>Precio referencial (opcional)</label>
                <input style={inputStyle} placeholder="Ej: Desde $80.000" value={form.reference_price} onChange={e => set('reference_price', e.target.value)} />
                <p style={{ fontSize: 11, color: '#B0A898', fontFamily: 'system-ui', marginTop: 4 }}>El cliente verá esto como referencia, no es un compromiso.</p>
              </div>
              <div>
                <label style={labelStyle}>Cuéntate (opcional)</label>
                <textarea
                  rows={4}
                  placeholder="¿Qué te hace diferente? ¿En qué te especializas? Sé breve y directo."
                  value={form.bio}
                  onChange={e => set('bio', e.target.value)}
                  style={{ ...inputStyle, resize: 'none', lineHeight: 1.5 }}
                />
              </div>
            </div>
          )}

          {/* PASO 3 */}
          {step === 3 && (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <label style={labelStyle}>Zona de trabajo (opcional)</label>
                <div style={{ display: 'flex', gap: 8 }}>
                  <input
                    type="text"
                    placeholder="Ej: Bogotá, Chapinero"
                    value={form.address}
                    onChange={e => { set('address', e.target.value); set('latitude', null); set('longitude', null); setGeocodeError('') }}
                    style={{ ...inputStyle, flex: 1 }}
                  />
                  <button
                    type="button"
                    onClick={geocodeAddress}
                    disabled={geocoding || !form.address.trim()}
                    style={{
                      padding: '0 16px', borderRadius: 14, border: 'none', cursor: form.address.trim() ? 'pointer' : 'default',
                      background: form.latitude ? '#6B8E4E' : '#2C2416', color: '#F4EFE6', flexShrink: 0,
                      display: 'flex', alignItems: 'center', gap: 4, opacity: (!form.address.trim() || geocoding) ? 0.6 : 1,
                    }}
                  >
                    {geocoding ? <Loader size={14} style={{ animation: 'spin 1s linear infinite' }} /> : <MapPin size={14} />}
                    <span style={{ fontSize: 12, fontFamily: 'system-ui', fontWeight: 600 }}>{form.latitude ? 'OK' : 'Ubicar'}</span>
                  </button>
                </div>
                {geocodeError && <p style={{ fontSize: 11, color: '#A8553C', fontFamily: 'system-ui', marginTop: 4 }}>{geocodeError}</p>}
                {form.latitude && <p style={{ fontSize: 11, color: '#6B8E4E', fontFamily: 'system-ui', marginTop: 4 }}>✓ Ubicación confirmada</p>}
              </div>

              <div>
                <label style={labelStyle}>Especialidades (hasta 6, opcional)</label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 8 }}>
                  {form.tags.map(t => (
                    <span key={t} style={{ display: 'inline-flex', alignItems: 'center', gap: 4, background: 'rgba(217,119,87,0.12)', color: '#A8553C', borderRadius: 20, padding: '4px 10px', fontSize: 12, fontFamily: 'system-ui', fontWeight: 600 }}>
                      {t}
                      <button type="button" onClick={() => removeTag(t)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: '#A8553C', lineHeight: 1 }}>
                        <X size={12} />
                      </button>
                    </span>
                  ))}
                </div>
                {form.tags.length < 6 && (
                  <div style={{ display: 'flex', gap: 8 }}>
                    <input
                      type="text"
                      placeholder="Ej: Impermeabilización, Estuco..."
                      value={tagInput}
                      onChange={e => setTagInput(e.target.value)}
                      onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addTag() } }}
                      style={{ ...inputStyle, flex: 1 }}
                    />
                    <button type="button" onClick={addTag} style={{ padding: '0 18px', borderRadius: 14, background: '#2C2416', color: '#F4EFE6', fontFamily: 'system-ui', fontSize: 15, fontWeight: 600, border: 'none', cursor: 'pointer', flexShrink: 0 }}>
                      +
                    </button>
                  </div>
                )}
                <p style={{ fontSize: 11, color: '#B0A898', fontFamily: 'system-ui', marginTop: 6 }}>
                  Ayudan a los clientes a encontrarte. Puedes agregarlas después.
                </p>
              </div>

              <button
                type="submit"
                disabled={loading}
                style={{ marginTop: 8, width: '100%', padding: '16px', borderRadius: 16, background: loading ? '#B0A898' : '#D97757', color: 'white', fontFamily: 'system-ui', fontWeight: 700, fontSize: 16, border: 'none', cursor: loading ? 'default' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}
              >
                {loading ? 'Creando tu perfil...' : 'Publicar mi perfil'}
                {!loading && <ChevronRight size={20} />}
              </button>
            </form>
          )}
        </div>

        {/* CTA bottom — pasos 1 y 2 */}
        {step < 3 && (
          <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, padding: '16px 20px 32px', background: 'linear-gradient(to top, #F4EFE6 70%, transparent)', maxWidth: 480, margin: '0 auto' }}>
            <button
              onClick={next}
              style={{ width: '100%', padding: '16px', borderRadius: 16, background: '#2C2416', color: '#F4EFE6', fontFamily: 'system-ui', fontWeight: 700, fontSize: 16, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}
            >
              Continuar
              <ChevronRight size={20} />
            </button>
            {step === 3 - 1 && (
              <p style={{ textAlign: 'center', fontSize: 12, color: '#B0A898', fontFamily: 'system-ui', marginTop: 10 }}>
                El último paso es opcional — puedes completarlo después.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
