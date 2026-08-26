export default async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, message: 'Method not allowed.' });
  }

  const { name, phone, email, businessName, message } = req.body || {};

  // Validate
  const errors = [];
  if (!name || name.trim().length < 2) errors.push('Name is required.');
  if (!phone || phone.trim().length < 6) errors.push('Phone is required.');
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) errors.push('Valid email is required.');
  if (!businessName || businessName.trim().length < 1) errors.push('Business name is required.');
  if (!message || message.trim().length < 3) errors.push('Message is required.');

  if (errors.length > 0) {
    return res.status(400).json({ ok: false, errors });
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    return res.status(500).json({ ok: false, message: 'Telegram not configured on server.' });
  }

  const telegramText = [
    '🔔 <b>NEW JAR ARC ENQUIRY</b>',
    '',
    `👤 <b>Name:</b> ${name.trim()}`,
    `📞 <b>Phone:</b> ${phone.trim()}`,
    `📧 <b>Email:</b> ${email.trim()}`,
    `🏢 <b>Business:</b> ${businessName.trim()}`,
    '',
    '💬 <b>Message:</b>',
    message.trim(),
  ].join('\n');

  try {
    const tgRes = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text: telegramText, parse_mode: 'HTML' }),
    });

    const tgData = await tgRes.json();

    if (!tgData.ok) {
      return res.status(500).json({ ok: false, message: tgData.description || 'Telegram API error.' });
    }

    return res.status(200).json({ ok: true, message: 'Enquiry sent successfully.' });
  } catch (err) {
    return res.status(500).json({ ok: false, message: 'Failed to send enquiry.' });
  }
}
