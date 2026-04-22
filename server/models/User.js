const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    phone: { type: String },
    password: { type: String },
    spotifyId: { type: String, unique: true, sparse: true },
    spotifyDisplayName: { type: String },
    spotifyEmail: { type: String },
    role: { type: String, enum: ['client', 'admin'], default: 'client' },
    weddingDate: { type: String },
    venue: { type: String },
    emailVerified: { type: Boolean, default: false },
    verifyToken: { type: String, index: true },
    verifyTokenExpires: { type: Date },
    resetToken: { type: String, index: true },
    resetTokenExpires: { type: Date },
  },
  { timestamps: true }
);

userSchema.pre('save', async function () {
  if (!this.isModified('password') || !this.password) return;
  this.password = await bcrypt.hash(this.password, 12);
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  if (!this.password) return false;
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
