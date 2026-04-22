const nodemailer = require('nodemailer');
const Settings = require('../models/Settings');

function buildTransport(s) {
  const transport = {
    host: s.smtpHost,
    port: s.smtpPort,
    secure: !!s.smtpSecure,
  };
  if (s.smtpUser || s.smtpPass) {
    transport.auth = { user: s.smtpUser, pass: s.smtpPass };
  }
  return nodemailer.createTransport(transport);
}

function fromHeader(s) {
  const addr = s.mailFromAddress || s.smtpUser;
  if (!addr) return null;
  return s.mailFromName ? `${s.mailFromName} <${addr}>` : addr;
}

// Returns null if mail system not configured yet.
async function sendMail({ to, subject, text, html, replyTo }) {
  const s = await Settings.getSingleton();
  if (!s.smtpHost || !s.smtpPort) {
    console.warn('[mailer] SMTP not configured — skipping send to', to);
    return { skipped: true, reason: 'smtp-unconfigured' };
  }
  const from = fromHeader(s);
  if (!from) {
    console.warn('[mailer] No From address configured — skipping send to', to);
    return { skipped: true, reason: 'no-from-address' };
  }

  const transporter = buildTransport(s);
  const info = await transporter.sendMail({
    from,
    to,
    subject,
    text,
    html,
    replyTo,
  });
  return { sent: true, messageId: info.messageId };
}

// Fire-and-forget: never throws. Used from request handlers so a mail
// failure doesn't fail the user's request.
async function sendMailSafe(opts) {
  try {
    return await sendMail(opts);
  } catch (err) {
    console.error('[mailer] send failed:', err.message);
    return { sent: false, error: err.message };
  }
}

async function getAdminRecipients() {
  const s = await Settings.getSingleton();
  const list = Array.isArray(s.adminNotifyEmails) ? s.adminNotifyEmails : [];
  return list.filter(Boolean);
}

async function isCustomerEmailEnabled() {
  const s = await Settings.getSingleton();
  return !!s.customerEmailEnabled;
}

async function getSiteContext() {
  const s = await Settings.getSingleton();
  return {
    siteName: s.siteName || 'Quality Wedding DJ',
    siteUrl: s.siteUrl || 'https://qualityweddingdj.co.uk',
  };
}

module.exports = {
  sendMail,
  sendMailSafe,
  getAdminRecipients,
  isCustomerEmailEnabled,
  getSiteContext,
};
