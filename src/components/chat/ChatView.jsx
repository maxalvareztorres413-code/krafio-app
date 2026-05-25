import { useState, useEffect, useRef } from 'react'
import { Send, ArrowLeft, MessageCircle } from 'lucide-react'
import { supabase } from '../../lib/supabase'

export default function ChatView({ conversationId, currentUserId, currentUserName, otherUserName, onBack, lang = 'es' }) {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(true)
  const bottomRef = useRef(null)

  const markIncomingAsRead = async () => {
    await supabase
      .from('messages')
      .update({ read_at: new Date().toISOString() })
      .eq('conversation_id', conversationId)
      .neq('sender_id', currentUserId)
      .is('read_at', null)
  }

  useEffect(() => {
    if (!conversationId) return
    loadMessages()

    const channel = supabase
      .channel(`conv-${conversationId}`)
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'messages',
        filter: `conversation_id=eq.${conversationId}`,
      }, payload => {
        setMessages(prev => prev.find(m => m.id === payload.new.id) ? prev : [...prev, payload.new])
        // Mark immediately if the incoming message is from the other person
        if (payload.new.sender_id !== currentUserId) {
          supabase.from('messages')
            .update({ read_at: new Date().toISOString() })
            .eq('id', payload.new.id)
        }
        setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: 'smooth' }), 50)
      })
      .on('postgres_changes', {
        event: 'UPDATE',
        schema: 'public',
        table: 'messages',
        filter: `conversation_id=eq.${conversationId}`,
      }, payload => {
        setMessages(prev => prev.map(m => m.id === payload.new.id ? { ...m, read_at: payload.new.read_at } : m))
      })
      .subscribe()

    return () => supabase.removeChannel(channel)
  }, [conversationId])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const loadMessages = async () => {
    const { data } = await supabase
      .from('messages')
      .select('*')
      .eq('conversation_id', conversationId)
      .order('created_at', { ascending: true })
    setMessages(data || [])
    setLoading(false)
    // Mark all unread incoming messages as read on open
    markIncomingAsRead()
  }

  const sendMessage = async () => {
    const content = input.trim()
    if (!content) return
    setInput('')
    const { error } = await supabase.from('messages').insert({
      conversation_id: conversationId,
      sender_id: currentUserId,
      content,
    })
    if (!error) {
      await supabase.from('conversations').update({
        last_message_at: new Date().toISOString(),
        last_message_preview: content.slice(0, 100),
      }).eq('id', conversationId)
      // Fire push notification (fire-and-forget)
      fetch('/api/push', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ conversationId, senderId: currentUserId, senderName: currentUserName || otherUserName, message: content.slice(0, 100) }),
      }).catch(() => {})
    }
  }

  const fmt = ts => new Date(ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

  const labels = {
    placeholder: { es: 'Escribe un mensaje...', en: 'Write a message...', pt: 'Escreva uma mensagem...', fr: 'Écrivez un message...' },
    empty: { es: 'Inicia la conversación', en: 'Start the conversation', pt: 'Inicie a conversa', fr: 'Commencez la conversation' },
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100svh', background: '#F4EFE6', fontFamily: 'Georgia, serif' }}>
      {/* Header */}
      <div style={{ padding: '48px 20px 16px', background: '#2C2416', display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
        <button onClick={onBack} style={{
          width: 40, height: 40, borderRadius: '50%', border: 'none', cursor: 'pointer',
          background: 'rgba(244,239,230,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <ArrowLeft size={20} color="#F4EFE6" />
        </button>
        <div style={{ flex: 1 }}>
          <div style={{ color: '#F4EFE6', fontFamily: 'system-ui', fontWeight: 600, fontSize: 16 }}>{otherUserName}</div>
          <div style={{ color: 'rgba(244,239,230,0.5)', fontFamily: 'system-ui', fontSize: 11, marginTop: 1 }}>Krafio</div>
        </div>
      </div>

      {/* Messages */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 8 }}>
        {loading ? (
          <div style={{ textAlign: 'center', color: '#7A6F5C', fontFamily: 'system-ui', paddingTop: 40 }}>...</div>
        ) : messages.length === 0 ? (
          <div style={{ textAlign: 'center', paddingTop: 56 }}>
            <div style={{ width: 56, height: 56, borderRadius: '50%', background: '#EBE4D4', margin: '0 auto 12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <MessageCircle size={24} color="#7A6F5C" />
            </div>
            <p style={{ color: '#7A6F5C', fontFamily: 'system-ui', fontSize: 14 }}>{labels.empty[lang] || labels.empty.es}</p>
          </div>
        ) : messages.map(msg => {
          const isMe = msg.sender_id === currentUserId
          return (
            <div key={msg.id} style={{ display: 'flex', justifyContent: isMe ? 'flex-end' : 'flex-start' }}>
              <div style={{
                maxWidth: '75%', padding: '10px 14px', fontSize: 14, lineHeight: 1.45,
                background: isMe ? '#2C2416' : 'white',
                color: isMe ? '#F4EFE6' : '#2C2416',
                fontFamily: 'system-ui',
                borderRadius: isMe ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.07)',
              }}>
                <div>{msg.content}</div>
                {msg.metadata?.photos?.length > 0 && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginTop: 6 }}>
                    {msg.metadata.photos.map((url, i) => (
                      <img key={i} src={url} alt="" onClick={() => window.open(url, '_blank')}
                        style={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 8, cursor: 'pointer' }} />
                    ))}
                  </div>
                )}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 3, marginTop: 3 }}>
                  <span style={{ fontSize: 10, color: isMe ? 'rgba(244,239,230,0.45)' : '#B0A898', fontFamily: 'system-ui' }}>
                    {fmt(msg.created_at)}
                  </span>
                  {isMe && (
                    <span style={{ fontSize: 12, lineHeight: 1, color: msg.read_at ? '#D97757' : 'rgba(244,239,230,0.35)' }}>
                      ✓✓
                    </span>
                  )}
                </div>
              </div>
            </div>
          )
        })}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div style={{ padding: '12px 20px 28px', background: '#F4EFE6', flexShrink: 0 }}>
        <div style={{
          display: 'flex', gap: 8, alignItems: 'center',
          background: 'white', borderRadius: 24, padding: '6px 6px 6px 16px',
          border: '1px solid #D4C9B5',
        }}>
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), sendMessage())}
            placeholder={labels.placeholder[lang] || labels.placeholder.es}
            style={{ flex: 1, border: 'none', outline: 'none', fontSize: 14, background: 'transparent', color: '#2C2416', fontFamily: 'system-ui', padding: '6px 0' }}
          />
          <button
            onClick={sendMessage}
            disabled={!input.trim()}
            style={{
              width: 40, height: 40, borderRadius: 20, border: 'none',
              cursor: input.trim() ? 'pointer' : 'default',
              background: input.trim() ? '#D97757' : '#EBE4D4',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0, transition: 'background 0.15s',
            }}
          >
            <Send size={16} color={input.trim() ? 'white' : '#A0927E'} />
          </button>
        </div>
      </div>
    </div>
  )
}
