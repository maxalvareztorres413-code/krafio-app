import { useState, useEffect } from 'react'
import { ArrowLeft, MessageCircle } from 'lucide-react'
import { supabase } from '../../lib/supabase'

export default function InboxView({ currentUserId, onOpenChat, onBack, lang = 'es' }) {
  const [conversations, setConversations] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    load()
    const channel = supabase
      .channel(`inbox-${currentUserId}`)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'conversations', filter: `provider_id=eq.${currentUserId}` }, load)
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages' }, load)
      .subscribe()
    return () => supabase.removeChannel(channel)
  }, [currentUserId])

  const load = async () => {
    const { data: convs } = await supabase
      .from('conversations')
      .select('id, last_message_at, last_message_preview, client_id')
      .eq('provider_id', currentUserId)
      .order('last_message_at', { ascending: false })

    if (!convs?.length) { setConversations([]); setLoading(false); return }

    const { data: profiles } = await supabase
      .from('profiles')
      .select('id, full_name')
      .in('id', convs.map(c => c.client_id))

    const profileMap = {}
    profiles?.forEach(p => { profileMap[p.id] = p })

    setConversations(convs.map(c => ({ ...c, clientName: profileMap[c.client_id]?.full_name || 'Cliente' })))
    setLoading(false)
  }

  const relTime = ts => {
    const diff = Date.now() - new Date(ts).getTime()
    const m = Math.floor(diff / 60000)
    if (m < 1) return lang === 'en' ? 'now' : 'ahora'
    if (m < 60) return `${m}m`
    if (m < 1440) return `${Math.floor(m / 60)}h`
    return `${Math.floor(m / 1440)}d`
  }

  const labels = {
    title: { es: 'Mensajes', en: 'Inbox', pt: 'Mensagens', fr: 'Messagerie' },
    empty: { es: 'Sin mensajes aún', en: 'No messages yet', pt: 'Nenhuma mensagem', fr: 'Aucun message' },
    emptySub: { es: 'Cuando un cliente te contacte, aparecerá aquí.', en: 'When a client contacts you, it will appear here.', pt: 'Quando um cliente entrar em contato, aparecerá aqui.', fr: 'Quand un client vous contacte, il apparaîtra ici.' },
    newConv: { es: 'Nueva conversación', en: 'New conversation', pt: 'Nova conversa', fr: 'Nouvelle conversation' },
  }
  const l = k => labels[k][lang] || labels[k].es

  return (
    <div className="min-h-screen" style={{ background: '#F4EFE6', fontFamily: 'Georgia, serif' }}>
      <div className="max-w-md mx-auto">
        <div className="px-5 pt-12 pb-4">
          <button onClick={onBack} className="w-10 h-10 rounded-full flex items-center justify-center mb-5" style={{ background: '#EBE4D4' }}>
            <ArrowLeft size={20} color="#2C2416" />
          </button>
          <h2 className="text-3xl" style={{ color: '#2C2416', fontStyle: 'italic', fontWeight: 400 }}>{l('title')}</h2>
        </div>

        <div className="px-5 space-y-2">
          {loading ? (
            <div className="text-center pt-10" style={{ color: '#7A6F5C', fontFamily: 'system-ui' }}>...</div>
          ) : conversations.length === 0 ? (
            <div className="text-center pt-14">
              <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-3" style={{ background: '#EBE4D4' }}>
                <MessageCircle size={24} color="#7A6F5C" />
              </div>
              <p className="text-sm" style={{ color: '#7A6F5C', fontFamily: 'system-ui', fontWeight: 500 }}>{l('empty')}</p>
              <p className="text-xs mt-1" style={{ color: '#B0A898', fontFamily: 'system-ui' }}>{l('emptySub')}</p>
            </div>
          ) : conversations.map(conv => {
            return (
              <button
                key={conv.id}
                onClick={() => onOpenChat(conv.id, conv.clientName)}
                className="w-full p-4 rounded-2xl flex items-center gap-3 text-left"
                style={{ background: 'white' }}
              >
                <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: '#D97757' }}>
                  <span style={{ color: 'white', fontFamily: 'system-ui', fontWeight: 700, fontSize: 18 }}>{conv.clientName[0].toUpperCase()}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline mb-0.5">
                    <span className="text-sm" style={{ color: '#2C2416', fontFamily: 'system-ui', fontWeight: 600 }}>{conv.clientName}</span>
                    <span className="text-xs ml-2 flex-shrink-0" style={{ color: '#B0A898', fontFamily: 'system-ui' }}>{relTime(conv.last_message_at)}</span>
                  </div>
                  <p className="text-xs truncate" style={{ color: '#7A6F5C', fontFamily: 'system-ui' }}>
                    {conv.last_message_preview || l('newConv')}
                  </p>
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
