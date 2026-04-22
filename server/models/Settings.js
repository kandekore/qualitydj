const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema(
  {
    // singleton key so we always upsert the same document
    key: { type: String, default: 'global', unique: true },

    // SMTP transport
    smtpHost: { type: String, default: '' },
    smtpPort: { type: Number, default: 587 },
    smtpSecure: { type: Boolean, default: false }, // true for port 465
    smtpUser: { type: String, default: '' },
    smtpPass: { type: String, default: '' },

    // From identity
    mailFromAddress: { type: String, default: '' },
    mailFromName: { type: String, default: 'Quality Wedding DJ' },

    // Notification routing
    adminNotifyEmails: { type: [String], default: [] },
    customerEmailEnabled: { type: Boolean, default: true },

    siteName: { type: String, default: 'Quality Wedding DJ' },
    siteUrl: { type: String, default: 'https://qualityweddingdj.co.uk' },
  },
  { timestamps: true }
);

settingsSchema.statics.getSingleton = async function () {
  let doc = await this.findOne({ key: 'global' });
  if (!doc) doc = await this.create({ key: 'global' });
  return doc;
};

module.exports = mongoose.model('Settings', settingsSchema);
