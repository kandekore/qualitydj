const express = require('express');
const crypto = require('crypto');
const router = express.Router();
const User = require('../models/User');
const { generateToken, protect } = require('../middleware/auth');
const {
  sendMail,
  sendMailSafe,
  getSiteContext,
  isSmtpConfigured,
} = require('../lib/mailer');

const VERIFY_TTL_MS = 24 * 60 * 60 * 1000; // 24 hours
const RESET_TTL_MS = 60 * 60 * 1000; // 1 hour — shorter because it's a password-change power

function escapeHtml(s) {
  return String(s || '')
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

function newVerifyToken() {
  return {
    token: crypto.randomBytes(32).toString('base64url'),
    expires: new Date(Date.now() + VERIFY_TTL_MS),
  };
}

async function sendPasswordResetEmail(user, ctx) {
  const link = `${ctx.siteUrl}/reset-password?token=${user.resetToken}`;
  const text = `Hi ${user.name},\n\n` +
    `Someone — hopefully you — asked to reset the password on your ${ctx.siteName} account.\n\n` +
    `Click the link below to choose a new password:\n\n${link}\n\n` +
    `This link expires in 1 hour. If you didn't ask for this, you can safely ignore this email — your password will stay the same.\n\n` +
    `— ${ctx.siteName}\n${ctx.siteUrl}`;
  const html = `
    <div style="font-family:system-ui,sans-serif;max-width:560px;color:#333">
      <p>Hi ${escapeHtml(user.name)},</p>
      <p>Someone — hopefully you — asked to reset the password on your
         <strong>${escapeHtml(ctx.siteName)}</strong> account.</p>
      <p>Click the button below to choose a new password.</p>
      <p style="margin:1.5rem 0">
        <a href="${escapeHtml(link)}"
           style="display:inline-block;background:#d4a574;color:#fff;text-decoration:none;padding:0.75rem 1.5rem;border-radius:4px;font-weight:500">
          Reset my password
        </a>
      </p>
      <p style="color:#666;font-size:0.9rem">Or paste this link into your browser:<br>
        <a href="${escapeHtml(link)}">${escapeHtml(link)}</a></p>
      <p style="color:#666;font-size:0.85rem">This link expires in 1 hour. If you didn't ask for this, you can safely ignore this email — your password will stay the same.</p>
      <p style="margin-top:2rem;color:#888;font-size:0.85rem">— ${escapeHtml(ctx.siteName)}<br>
        <a href="${escapeHtml(ctx.siteUrl)}">${escapeHtml(ctx.siteUrl)}</a></p>
    </div>`;

  return sendMail({
    to: user.email,
    subject: `Reset your password — ${ctx.siteName}`,
    text,
    html,
  });
}

async function sendVerificationEmail(user, ctx) {
  const link = `${ctx.siteUrl}/verify-email?token=${user.verifyToken}`;
  const text = `Hi ${user.name},\n\n` +
    `Thanks for creating an account with ${ctx.siteName}.\n\n` +
    `Please confirm your email address by clicking the link below:\n\n${link}\n\n` +
    `This link expires in 24 hours. If you didn't ask for this, you can ignore it.\n\n` +
    `— ${ctx.siteName}\n${ctx.siteUrl}`;
  const html = `
    <div style="font-family:system-ui,sans-serif;max-width:560px;color:#333">
      <p>Hi ${escapeHtml(user.name)},</p>
      <p>Thanks for creating an account with <strong>${escapeHtml(ctx.siteName)}</strong>.</p>
      <p>Please confirm your email address by clicking the button below.</p>
      <p style="margin:1.5rem 0">
        <a href="${escapeHtml(link)}"
           style="display:inline-block;background:#d4a574;color:#fff;text-decoration:none;padding:0.75rem 1.5rem;border-radius:4px;font-weight:500">
          Verify my email
        </a>
      </p>
      <p style="color:#666;font-size:0.9rem">Or paste this link into your browser:<br>
        <a href="${escapeHtml(link)}">${escapeHtml(link)}</a></p>
      <p style="color:#666;font-size:0.85rem">This link expires in 24 hours. If you didn't ask for this, you can safely ignore it.</p>
      <p style="margin-top:2rem;color:#888;font-size:0.85rem">— ${escapeHtml(ctx.siteName)}<br>
        <a href="${escapeHtml(ctx.siteUrl)}">${escapeHtml(ctx.siteUrl)}</a></p>
    </div>`;

  return sendMail({
    to: user.email,
    subject: `Confirm your email — ${ctx.siteName}`,
    text,
    html,
  });
}

// Register with email/password
router.post('/register', async (req, res) => {
  try {
    const { name, email, phone, password, weddingDate, venue } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email, and password are required.' });
    }

    if (!(await isSmtpConfigured())) {
      return res.status(503).json({
        error: 'Email verification is not available right now. Please get in touch through the contact form.',
      });
    }

    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(400).json({ error: 'An account with this email already exists.' });
    }

    const { token, expires } = newVerifyToken();
    const user = await User.create({
      name, email, phone, password, weddingDate, venue,
      emailVerified: false,
      verifyToken: token,
      verifyTokenExpires: expires,
    });

    try {
      const ctx = await getSiteContext();
      await sendVerificationEmail(user, ctx);
    } catch (mailErr) {
      // Mail failed — roll the user back so they can retry
      console.error('Verification email send failed:', mailErr);
      await User.deleteOne({ _id: user._id });
      return res.status(502).json({
        error: 'Could not send verification email. Please try again shortly.',
      });
    }

    res.status(201).json({
      verificationSent: true,
      email: user.email,
      message: 'Check your email to confirm your address.',
    });
  } catch (err) {
    console.error('Register error:', err);
    res.status(500).json({ error: 'Server error.' });
  }
});

// Login with email/password
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required.' });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user || !user.password) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    if (!user.emailVerified) {
      return res.status(403).json({
        error: 'Please verify your email address before signing in. Check your inbox for the confirmation link.',
        code: 'EMAIL_NOT_VERIFIED',
        email: user.email,
      });
    }

    const token = generateToken(user);

    res.json({
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role, phone: user.phone },
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Server error.' });
  }
});

// Verify email from the link
router.post('/verify-email', async (req, res) => {
  try {
    const { token } = req.body;
    if (!token) return res.status(400).json({ error: 'Missing verification token.' });

    const user = await User.findOne({ verifyToken: token });
    if (!user) {
      return res.status(400).json({ error: 'This verification link is invalid or has already been used.' });
    }
    if (user.verifyTokenExpires && user.verifyTokenExpires.getTime() < Date.now()) {
      return res.status(400).json({
        error: 'This verification link has expired. Please request a new one.',
        code: 'EXPIRED',
      });
    }

    user.emailVerified = true;
    user.verifyToken = undefined;
    user.verifyTokenExpires = undefined;
    await user.save();

    const jwt = generateToken(user);
    res.json({
      verified: true,
      token: jwt,
      user: { id: user._id, name: user.name, email: user.email, role: user.role, phone: user.phone },
    });
  } catch (err) {
    console.error('Verify email error:', err);
    res.status(500).json({ error: 'Server error.' });
  }
});

// Resend verification email
router.post('/resend-verification', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: 'Email is required.' });

    // Generic success response — don't leak whether the email exists
    const respond = () => res.json({ ok: true, message: 'If an unverified account exists for this email, a new link has been sent.' });

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user || user.emailVerified) return respond();

    if (!(await isSmtpConfigured())) {
      return res.status(503).json({ error: 'Email is not configured. Please try again later.' });
    }

    const { token, expires } = newVerifyToken();
    user.verifyToken = token;
    user.verifyTokenExpires = expires;
    await user.save();

    const ctx = await getSiteContext();
    try {
      await sendVerificationEmail(user, ctx);
    } catch (e) {
      console.error('Resend failed:', e.message);
    }
    respond();
  } catch (err) {
    console.error('Resend error:', err);
    res.status(500).json({ error: 'Server error.' });
  }
});

// Start a password reset — always returns OK so callers can't enumerate emails
router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: 'Email is required.' });

    const respond = () => res.json({ ok: true, message: 'If an account exists for this email, a reset link has been sent.' });

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) return respond();

    if (!(await isSmtpConfigured())) {
      return res.status(503).json({ error: 'Email is not configured. Please try again later.' });
    }

    user.resetToken = crypto.randomBytes(32).toString('base64url');
    user.resetTokenExpires = new Date(Date.now() + RESET_TTL_MS);
    await user.save();

    const ctx = await getSiteContext();
    try {
      await sendPasswordResetEmail(user, ctx);
    } catch (e) {
      console.error('Password reset email failed:', e.message);
    }
    respond();
  } catch (err) {
    console.error('Forgot password error:', err);
    res.status(500).json({ error: 'Server error.' });
  }
});

// Complete a password reset
router.post('/reset-password', async (req, res) => {
  try {
    const { token, password } = req.body;
    if (!token || !password) {
      return res.status(400).json({ error: 'Token and new password are required.' });
    }
    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters.' });
    }

    const user = await User.findOne({ resetToken: token });
    if (!user) {
      return res.status(400).json({ error: 'This reset link is invalid or has already been used.' });
    }
    if (user.resetTokenExpires && user.resetTokenExpires.getTime() < Date.now()) {
      return res.status(400).json({
        error: 'This reset link has expired. Please request a new one.',
        code: 'EXPIRED',
      });
    }

    user.password = password; // pre-save hook hashes
    user.resetToken = undefined;
    user.resetTokenExpires = undefined;
    // If the account wasn't verified yet, resetting via email proves access — mark verified too
    if (!user.emailVerified) {
      user.emailVerified = true;
      user.verifyToken = undefined;
      user.verifyTokenExpires = undefined;
    }
    await user.save();

    const jwt = generateToken(user);
    res.json({
      reset: true,
      token: jwt,
      user: { id: user._id, name: user.name, email: user.email, role: user.role, phone: user.phone },
    });
  } catch (err) {
    console.error('Reset password error:', err);
    res.status(500).json({ error: 'Server error.' });
  }
});

// Get current user
router.get('/me', protect, async (req, res) => {
  res.json({
    user: {
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      phone: req.user.phone,
      role: req.user.role,
      weddingDate: req.user.weddingDate,
      venue: req.user.venue,
      spotifyId: req.user.spotifyId,
    },
  });
});

// Update profile
router.put('/me', protect, async (req, res) => {
  try {
    const { name, phone, weddingDate, venue } = req.body;
    const user = await User.findById(req.user._id);

    if (name) user.name = name;
    if (phone) user.phone = phone;
    if (weddingDate) user.weddingDate = weddingDate;
    if (venue) user.venue = venue;

    await user.save();

    res.json({
      user: { id: user._id, name: user.name, email: user.email, phone: user.phone, role: user.role, weddingDate: user.weddingDate, venue: user.venue },
    });
  } catch (err) {
    console.error('Update error:', err);
    res.status(500).json({ error: 'Server error.' });
  }
});

module.exports = router;
