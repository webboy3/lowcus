export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, subject, message } = req.body || {};
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // Keep your API key in environment variables
  const API_KEY = process.env.ELASTIC_EMAIL_API_KEY;
  const TO_EMAIL = process.env.TO_EMAIL || 'you@yourdomain.com';
  const FROM_EMAIL = process.env.FROM_EMAIL || 'no-reply@yourdomain.com';

  const payload = {
    Recipients: { To: [ TO_EMAIL ] },
    Content: {
      Subject: subject,
      From: FROM_EMAIL,
      Body: [
        {
          ContentType: 'PlainText',
          Content: `From: ${name} <${email}>\n\n${message}`
        }
      ]
    }
  };

  try {
    const r = await fetch('https://api.elasticemail.com/v4/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-ElasticEmail-ApiKey': API_KEY
      },
      body: JSON.stringify(payload)
    });

    if (!r.ok) {
      const txt = await r.text();
      return res.status(500).json({ error: txt || 'Elastic Email send failed' });
    }

    return res.status(200).json({ ok: true });
  } catch (e) {
    return res.status(500).json({ error: 'Server error' });
  }
}
