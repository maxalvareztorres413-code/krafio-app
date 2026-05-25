import { useState, useEffect } from 'react'
import { Users, Briefcase, Ban, RotateCcw, LogOut, Shield, CheckCircle } from 'lucide-react'
import { supabase } from '../../lib/supabase'

const TABS = [
  { id: 'providers', label: 'Proveedores', icon: Briefcase },
  { id: 'clients', label: 'Clientes', icon: Users },
]

export default function AdminPanel({ onSignOut }) {
  const [tab, setTab] = useState('providers')
  const [providers, setProviders] = useState([])
  const [clients, setClients] = useState([])
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState(null)

  useEffect(() => { loadAll() }, [])

  const loadAll = async () => {
    setLoading(true)
    const [{ data: provData }, { data: profData }] = await Promise.all([
      supabase.from('providers').select('id, company, category, approved, verified, created_at'),
      supabase.from('profiles').select('id, full_name, role, blocked, created_at'),
    ])

    const profileMap = {}
    profData?.forEach(p => { profileMap[p.id] = p })

    setProviders((provData || []).map(p => ({
      ...p,
      full_name: profileMap[p.id]?.full_name || '—',
      blocked: profileMap[p.id]?.blocked || false,
      verified: p.verified || false,
    })))

    setClients((profData || []).filter(p => p.role === 'client'))
    setLoading(false)
  }

  const toggleBlock = async (id, isProvider, blocked) => {
    setActionLoading(id + '_block')
    await supabase.from('profiles').update({ blocked }).eq('id', id)
    if (isProvider) setProviders(prev => prev.map(p => p.id === id ? { ...p, blocked } : p))
    else setClients(prev => prev.map(c => c.id === id ? { ...c, blocked } : c))
    setActionLoading(null)
  }

  const fmt = ts => new Date(ts).toLocaleDateString('es', { day: '2-digit', month: 'short', year: 'numeric' })

  const verifiedCount = providers.filter(p => p.verified).length
  const blockedCount = [...providers, ...clients].filter(p => p.blocked).length

  return (
    <div style={{ minHeight: '100svh', background: '#F4EFE6', fontFamily: 'system-ui' }}>
      {/* Header */}
      <div style={{ background: '#2C2416', padding: '48px 20px 20px' }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: '#D97757', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Shield size={18} color="white" />
              </div>
              <div>
                <div style={{ color: '#F4EFE6', fontWeight: 700, fontSize: 16 }}>Krafio Admin</div>
                <div style={{ color: 'rgba(244,239,230,0.5)', fontSize: 11 }}>Panel de administración</div>
              </div>
            </div>
            <button onClick={onSignOut} style={{ background: 'rgba(244,239,230,0.1)', border: 'none', borderRadius: 8, padding: '8px 12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, color: 'rgba(244,239,230,0.7)', fontSize: 13 }}>
              <LogOut size={14} /> Salir
            </button>
          </div>

          {/* Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
            {[
              { label: 'Proveedores', value: providers.length },
              { label: 'Verificados', value: verifiedCount },
              { label: 'Clientes', value: clients.length },
              { label: 'Bloqueados', value: blockedCount, highlight: blockedCount > 0 },
            ].map(s => (
              <div key={s.label} style={{ background: 'rgba(244,239,230,0.08)', borderRadius: 12, padding: '12px 10px', textAlign: 'center' }}>
                <div style={{ color: s.highlight ? '#D97757' : '#F4EFE6', fontWeight: 700, fontSize: 22 }}>{s.value}</div>
                <div style={{ color: 'rgba(244,239,230,0.5)', fontSize: 11 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ maxWidth: 720, margin: '0 auto', padding: '0 20px' }}>
        <div style={{ display: 'flex', gap: 4, padding: '16px 0' }}>
          {TABS.map(t => {
            const Icon = t.icon
            return (
              <button key={t.id} onClick={() => setTab(t.id)}
                style={{
                  padding: '8px 18px', borderRadius: 20, border: 'none', cursor: 'pointer',
                  background: tab === t.id ? '#2C2416' : 'rgba(44,36,22,0.08)',
                  color: tab === t.id ? '#F4EFE6' : '#7A6F5C',
                  fontWeight: 600, fontSize: 13, display: 'flex', alignItems: 'center', gap: 6,
                }}
              >
                <Icon size={14} /> {t.label}
                {t.id === 'providers' && blockedCount > 0 && (
                  <span style={{ background: '#D97757', color: 'white', borderRadius: 10, padding: '1px 6px', fontSize: 11 }}>{blockedCount}</span>
                )}
              </button>
            )
          })}
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: 48, color: '#7A6F5C' }}>Cargando...</div>
        ) : tab === 'providers' ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, paddingBottom: 40 }}>
            {providers.length === 0 && (
              <div style={{ textAlign: 'center', padding: 48, color: '#7A6F5C' }}>No hay proveedores registrados.</div>
            )}
            {providers.map(p => {
              const blockLoading = actionLoading === p.id + '_block'
              return (
                <div key={p.id} style={{
                  background: 'white', borderRadius: 16, padding: '14px 16px',
                  boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
                  opacity: p.blocked ? 0.6 : 1,
                  borderLeft: `3px solid ${p.verified ? '#6B8E4E' : '#E0A458'}`,
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                    <div>
                      <div style={{ fontWeight: 600, color: '#2C2416', fontSize: 15 }}>{p.full_name}</div>
                      <div style={{ fontSize: 12, color: '#7A6F5C', marginTop: 2 }}>{p.company || '—'} · {p.category || '—'}</div>
                      <div style={{ fontSize: 11, color: '#B0A898', marginTop: 2 }}>Registrado: {fmt(p.created_at)}</div>
                    </div>
                    {p.verified ? (
                      <span style={{ fontSize: 11, fontWeight: 600, borderRadius: 20, padding: '3px 10px', background: '#D1E7DD', color: '#0A5729', display: 'flex', alignItems: 'center', gap: 4 }}>
                        <CheckCircle size={11} /> Verificado
                      </span>
                    ) : (
                      <span style={{ fontSize: 11, fontWeight: 600, borderRadius: 20, padding: '3px 10px', background: '#FFF3CD', color: '#856404' }}>
                        Sin verificar
                      </span>
                    )}
                  </div>
                  <button onClick={() => toggleBlock(p.id, true, !p.blocked)} disabled={blockLoading}
                    style={{ padding: '6px 14px', borderRadius: 8, border: 'none', cursor: 'pointer', background: p.blocked ? '#EBE4D4' : '#FAE4DC', color: p.blocked ? '#7A6F5C' : '#A8553C', fontSize: 12, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4, opacity: blockLoading ? 0.6 : 1 }}>
                    {p.blocked ? <><RotateCcw size={13} /> Desbloquear</> : <><Ban size={13} /> Bloquear</>}
                  </button>
                </div>
              )
            })}
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, paddingBottom: 40 }}>
            {clients.length === 0 && (
              <div style={{ textAlign: 'center', padding: 48, color: '#7A6F5C' }}>No hay clientes registrados.</div>
            )}
            {clients.map(c => {
              const blockLoading = actionLoading === c.id + '_block'
              return (
                <div key={c.id} style={{
                  background: 'white', borderRadius: 16, padding: '14px 16px',
                  boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
                  opacity: c.blocked ? 0.6 : 1,
                  borderLeft: `3px solid ${c.blocked ? '#A8553C' : '#4A6FA5'}`,
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                    <div>
                      <div style={{ fontWeight: 600, color: '#2C2416', fontSize: 15 }}>{c.full_name || '—'}</div>
                      <div style={{ fontSize: 11, color: '#B0A898', marginTop: 2 }}>Registrado: {fmt(c.created_at)}</div>
                    </div>
                    {c.blocked && (
                      <span style={{ fontSize: 11, fontWeight: 600, borderRadius: 20, padding: '3px 10px', background: '#FAE4DC', color: '#A8553C' }}>Bloqueado</span>
                    )}
                  </div>
                  <button onClick={() => toggleBlock(c.id, false, !c.blocked)} disabled={blockLoading}
                    style={{ padding: '6px 14px', borderRadius: 8, border: 'none', cursor: 'pointer', background: c.blocked ? '#EBE4D4' : '#FAE4DC', color: c.blocked ? '#7A6F5C' : '#A8553C', fontSize: 12, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4, opacity: blockLoading ? 0.6 : 1 }}>
                    {c.blocked ? <><RotateCcw size={13} /> Desbloquear</> : <><Ban size={13} /> Bloquear</>}
                  </button>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
