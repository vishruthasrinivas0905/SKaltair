import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema({
  reference: { type: String, required: true, unique: true },
  name: { type: String, required: true, trim: true, maxlength: 120 },
  email: { type: String, required: true, trim: true, lowercase: true, maxlength: 254 },
  phone: { type: String, default: '', maxlength: 40 },
  affiliation: { type: String, default: '', maxlength: 180 },
  program: { type: String, required: true, enum: ['short-term', 'mid-term', 'long-term'] },
  theme: { type: String, required: true, maxlength: 180 },
  title: { type: String, required: true, maxlength: 180 },
  summary: { type: String, required: true, maxlength: 6000 },
  duration: { type: String, default: '', maxlength: 80 },
  availability: { type: String, default: '', maxlength: 2000 },
  status: { type: String, enum: ['new', 'reviewing', 'contacted', 'closed'], default: 'new' },
  consent: { type: Boolean, required: true },
}, { timestamps: true });

export const Application = mongoose.models.Application || mongoose.model('Application', applicationSchema);
