export default async function handler(req, res) {
  // CORS configuration
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-uipath-secret');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, message } = req.body || {};

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email, and message are required' });
    }

    const webhookUrl = process.env.UIPATH_WEBHOOK_URL;
    const webhookSecret = process.env.UIPATH_WEBHOOK_SECRET || 'AlbertPortfolio2026SecureKey';

    let uipathTriggered = false;

    // Trigger UiPath Webhook if configured
    if (webhookUrl) {
      try {
        const uipathRes = await fetch(webhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-uipath-secret': webhookSecret
          },
          body: JSON.stringify({
            name,
            email,
            message,
            timestamp: new Date().toISOString(),
            source: 'albertsimpleportfolio'
          })
        });

        if (uipathRes.ok) {
          uipathTriggered = true;
        } else {
          console.warn('UiPath response not ok:', uipathRes.status);
        }
      } catch (uiErr) {
        console.warn('Failed to dispatch to UiPath webhook:', uiErr.message);
      }
    }

    // Always send FormSubmit email backup so no inquiry is ever lost
    try {
      await fetch('https://formsubmit.co/ajax/albertlivingstan73@gmail.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name,
          email,
          message,
          _subject: `Portfolio inquiry from ${name}`,
          _template: 'table'
        })
      });
    } catch (fsErr) {
      console.warn('FormSubmit backup failed:', fsErr.message);
    }

    return res.status(200).json({
      success: true,
      uipathTriggered,
      message: 'Your message has been sent successfully!'
    });
  } catch (error) {
    console.error('Contact handler error:', error);
    return res.status(500).json({ error: error.message || 'Internal server error' });
  }
}
