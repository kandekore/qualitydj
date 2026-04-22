const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');
const {
  sendMailSafe,
  getAdminRecipients,
  isCustomerEmailEnabled,
  getSiteContext,
} = require('../lib/mailer');

function escapeHtml(s) {
  return String(s || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function adminEmailBody(c) {
  const line = (label, val) => (val ? `<tr><td style="padding:4px 12px 4px 0;color:#666"><strong>${label}</strong></td><td>${escapeHtml(val)}</td></tr>` : '');
  const plainLine = (label, val) => (val ? `${label}: ${val}\n` : '');
  const text = `New wedding enquiry via the website\n\n` +
    plainLine('Name', c.name) +
    plainLine('Email', c.email) +
    plainLine('Phone', c.phone) +
    plainLine('Venue', c.venue) +
    plainLine('Wedding date', c.date) +
    `\nMessage:\n${c.message}\n`;
  const html = `
    <div style="font-family:system-ui,sans-serif;max-width:560px">
      <h2 style="margin:0 0 1rem">New wedding enquiry</h2>
      <table style="border-collapse:collapse;margin-bottom:1rem">
        ${line('Name', c.name)}
        ${line('Email', c.email)}
        ${line('Phone', c.phone)}
        ${line('Venue', c.venue)}
        ${line('Wedding date', c.date)}
      </table>
      <div style="border-left:3px solid #d4a574;padding:0.5rem 1rem;background:#faf7f2">
        <strong style="display:block;margin-bottom:0.5rem">Message</strong>
        <div style="white-space:pre-wrap">${escapeHtml(c.message)}</div>
      </div>
    </div>`;
  return { text, html };
}

function customerEmailBody(c, ctx) {
  const text = `Hi ${c.name},\n\n` +
    `Thanks for getting in touch with ${ctx.siteName}. I've received your enquiry ` +
    `and I'll be in touch personally within the next day or two to discuss your day.\n\n` +
    `For reference, here's what you sent:\n\n${c.message}\n\n` +
    `If anything urgent comes up in the meantime, just reply to this email.\n\n` +
    `All the best,\nJan\n${ctx.siteName}\n${ctx.siteUrl}`;
  const html = `
    <div style="font-family:system-ui,sans-serif;max-width:560px;color:#333">
      <p>Hi ${escapeHtml(c.name)},</p>
      <p>Thanks for getting in touch with <strong>${escapeHtml(ctx.siteName)}</strong>.
      I've received your enquiry and I'll be in touch personally within the next day or two
      to discuss your day.</p>
      <p>For reference, here's what you sent:</p>
      <div style="border-left:3px solid #d4a574;padding:0.5rem 1rem;background:#faf7f2;white-space:pre-wrap">${escapeHtml(c.message)}</div>
      <p>If anything urgent comes up in the meantime, just reply to this email.</p>
      <p>All the best,<br>Jan<br>${escapeHtml(ctx.siteName)}<br>
        <a href="${escapeHtml(ctx.siteUrl)}">${escapeHtml(ctx.siteUrl)}</a></p>
    </div>`;
  return { text, html };
}

router.post('/', async (req, res) => {
  try {
    const { name, email, phone, venue, date, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email, and message are required.' });
    }

    const contact = await Contact.create({ name, email, phone, venue, date, message });

    // Fire-and-forget notifications — never block the response
    (async () => {
      const [adminEmails, customerEnabled, ctx] = await Promise.all([
        getAdminRecipients(),
        isCustomerEmailEnabled(),
        getSiteContext(),
      ]);

      if (adminEmails.length > 0) {
        const body = adminEmailBody(contact);
        await sendMailSafe({
          to: adminEmails,
          subject: `New enquiry: ${contact.name}${contact.venue ? ' — ' + contact.venue : ''}`,
          text: body.text,
          html: body.html,
          replyTo: contact.email,
        });
      }

      if (customerEnabled && contact.email) {
        const body = customerEmailBody(contact, ctx);
        await sendMailSafe({
          to: contact.email,
          subject: `Thanks for getting in touch — ${ctx.siteName}`,
          text: body.text,
          html: body.html,
        });
      }
    })();

    res.status(201).json({ success: true, id: contact._id });
  } catch (err) {
    console.error('Contact form error:', err);
    res.status(500).json({ error: 'Server error. Please try again.' });
  }
});

module.exports = router;
