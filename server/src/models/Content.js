import mongoose from 'mongoose';

const contentSchema = new mongoose.Schema({
  kind: { type: String, required: true, enum: ['program', 'publication', 'news', 'person'] },
  slug: { type: String, required: true, trim: true },
  title: { type: String, required: true, trim: true },
  description: { type: String, default: '' },
  status: { type: String, enum: ['draft', 'published'], default: 'draft' },
  data: { type: mongoose.Schema.Types.Mixed, default: {} },
}, { timestamps: true, strict: true });

contentSchema.index({ kind: 1, slug: 1 }, { unique: true });
export const Content = mongoose.models.Content || mongoose.model('Content', contentSchema);
