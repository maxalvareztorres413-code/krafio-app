const webpush = require('web-push');
const { createClient } = require('@supabase/supabase-js');
const { Resend } = require('resend');

webpush.setVapidDetails(
  'mailto:hola@krafio.app',
  process.env.VITE_VAPID_PUBLIC_KEY,
  process.env.VAPID_PRIVATE_KEY
);

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).end();

  const { conversationId, senderId, senderName, message } = req.body || {};
  if (!conversationId || !senderId) return res.status(400).json({ error: 'Missing fields' });

  const supabase = createClient(
    process.env.VITE_SUPABASE_URL,
    process.env.VITE_SUPABASE_ANON_KEY
  );

  // Admin client to read auth.users emails (service role key, never exposed to browser)
  const supabaseAdmin = createClient(
    process.env.VITE_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );

  const { data: conv } = await supabase
    .from('conversations')
    .select('provider_id, client_id')
    .eq('id', conversationId)
    .single();

  if (!conv) return res.status(404).json({ error: 'Conversation not found' });

  const recipientId = senderId === conv.client_id ? conv.provider_id : conv.client_id;

  // 1. Try push notification first
  const { data: sub } = await supabase
    .from('push_subscriptions')
    .select('subscription')
    .eq('user_id', recipientId)
    .single();

  let pushSent = false;
  if (sub?.subscription) {
    try {
      await webpush.sendNotification(
        sub.subscription,
        JSON.stringify({
          title: `Krafio — ${senderName || 'Nuevo mensaje'}`,
          body: message || 'Tienes un mensaje nuevo',
          url: '/',
        })
      );
      pushSent = true;
    } catch {
      // Push expired or invalid — fall through to email
    }
  }

  // 2. Email fallback when no push subscription or push failed
  if (!pushSent && process.env.RESEND_API_KEY && process.env.SUPABASE_SERVICE_ROLE_KEY) {
    try {
      const { data: userData } = await supabaseAdmin.auth.admin.getUserById(recipientId);
      const recipientEmail = userData?.user?.email;

      if (recipientEmail) {
        const resend = new Resend(process.env.RESEND_API_KEY);
        await resend.emails.send({
          from: 'Krafio <onboarding@resend.dev>',
          to: recipientEmail,
          subject: `${senderName || 'Alguien'} te envió un mensaje en Krafio`,
          html: `
            <div style="font-family:system-ui,sans-serif;max-width:480px;margin:0 auto;background:#F4EFE6;padding:32px 24px;border-radius:16px;">
              <div style="margin-bottom:24px;">
                <span style="display:inline-block;background:#2C2416;color:#F4EFE6;padding:6px 14px;border-radius:20px;font-size:13px;font-weight:700;letter-spacing:1px;">KRAFIO</span>
              </div>
              <h2 style="color:#2C2416;font-family:Georgia,serif;font-style:italic;margin:0 0 8px;">Tienes un mensaje nuevo</h2>
              <p style="color:#7A6F5C;font-size:14px;margin:0 0 20px;">
                <strong style="color:#2C2416;">${senderName || 'Un usuario'}</strong> te escribió:
              </p>
              <div style="background:white;border-radius:12px;padding:16px 20px;margin-bottom:24px;border-left:3px solid #D97757;">
                <p style="color:#2C2416;margin:0;font-size:15px;line-height:1.5;">"${message}"</p>
              </div>
              <a href="https://krafio-app.vercel.app"
                style="display:inline-block;background:#2C2416;color:#F4EFE6;padding:14px 28px;border-radius:12px;text-decoration:none;font-weight:600;font-size:15px;">
                Responder →
              </a>
              <p style="color:#B0A898;font-size:11px;margin-top:32px;">
                Recibiste este correo porque alguien te contactó en Krafio.
                Si no quieres más notificaciones, ajusta tu configuración en la app.
              </p>
            </div>
          `,
        });
        return res.status(200).json({ sent: 'email' });
      }
    } catch {
      // Email failed silently — don't break the chat flow
    }
  }

  res.status(200).json({ sent: pushSent ? 'push' : 'none' });
};
