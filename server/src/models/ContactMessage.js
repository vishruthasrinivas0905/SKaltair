import mongoose from 'mongoose';

const contactMessageSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, maxlength: 120 },
  email: { type: String, required: true, trim: true, lowercase: true, maxlength: 254 },
  organisation: { type: String, default: '', maxlength: 180 },
  phone: { type: String, default: '', maxlength: 40 },
  category: { type: String, required: true, maxlength: 90 },
  subject: { type: String, required: true, maxlength: 180 },
  message: { type: String, required: true, maxlength: 5000 },
  consent: { type: Boolean, required: true },
  status: { type: String, enum: ['new', 'reviewing', 'responded', 'closed'], default: 'new' },
}, { timestamps: true });

export const ContactMessage = mongoose.models.ContactMessage || mongoose.model('ContactMessage', contactMessageSchema);
