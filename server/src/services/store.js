import { randomUUID } from 'node:crypto';
import { Application } from '../models/Application.js';
import { ContactMessage } from '../models/ContactMessage.js';
import { Content } from '../models/Content.js';
import { seedContent } from '../data/seeds.js';

let mongoReady = false;
let memory = { content: structuredClone(seedContent), applications: [], messages: [] };
export function setMongoReady(value) { mongoReady = value; }
export function isMongoReady() { return mongoReady; }
export function resetDemoStore() { memory = { content: structuredClone(seedContent), applications: [], messages: [] }; }

export async function seedMongo() {
  const count = await Content.countDocuments();
  if (!count) await Content.insertMany(seedContent);
  else {
    const previousProgramTitles = { 'short-term': 'Short-term research', 'mid-term': 'Mid-term research', 'long-term': 'Long-term research' };
    await Promise.all(seedContent.filter(item => item.kind === 'program').map(item => Content.updateOne(
      { kind: 'program', slug: item.slug, title: previousProgramTitles[item.slug] },
      { $set: { title: item.title, description: item.description, data: item.data } },
    )));
  }
}

export async function listContent(kind, { publishedOnly = true } = {}) {
  if (mongoReady) return Content.find({ kind, ...(publishedOnly ? { status: 'published' } : {}) }).sort({ createdAt: -1 }).lean();
  return memory.content.filter(x => x.kind === kind && (!publishedOnly || x.status === 'published')).map(x => ({ ...x }));
}
export async function saveContent(kind, input, id) {
  const allowed = ['program', 'publication', 'news', 'person'];
  if (!allowed.includes(kind)) throw Object.assign(new Error('Unsupported content type.'), { status: 400 });
  const data = { kind, slug: input.slug, title: input.title, description: input.description || '', status: input.status || 'draft', data: input.data || {} };
  if (mongoReady) {
    if (id) return Content.findByIdAndUpdate(id, data, { new: true, runValidators: true }).lean();
    return (await Content.create(data)).toObject();
  }
  if (id) {
    const index = memory.content.findIndex(x => x._id === id && x.kind === kind);
    if (index < 0) return null;
    memory.content[index] = { ...memory.content[index], ...data, updatedAt: new Date().toISOString() };
    return memory.content[index];
  }
  const row = { ...data, _id: randomUUID(), createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
  memory.content.push(row);
  return row;
}
export async function deleteContent(kind, id) {
  if (mongoReady) return (await Content.findOneAndDelete({ _id: id, kind })) !== null;
  const before = memory.content.length;
  memory.content = memory.content.filter(x => !(x._id === id && x.kind === kind));
  return memory.content.length !== before;
}
export async function createApplication(input) {
  const reference = `SKA-${new Date().getUTCFullYear()}-${randomUUID().slice(0, 8).toUpperCase()}`;
  const data = { ...input, reference, status: 'new' };
  if (mongoReady) return (await Application.create(data)).toObject();
  const row = { ...data, _id: randomUUID(), createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
  memory.applications.unshift(row);
  return row;
}
export async function listApplications() {
  if (mongoReady) return Application.find().sort({ createdAt: -1 }).lean();
  return memory.applications.map(x => ({ ...x }));
}
export async function listContactMessages() {
  if (mongoReady) return ContactMessage.find().sort({ createdAt: -1 }).lean();
  return memory.messages.map(x => ({ ...x }));
}
export async function updateApplication(id, status) {
  if (mongoReady) return Application.findByIdAndUpdate(id, { status }, { new: true, runValidators: true }).lean();
  const row = memory.applications.find(x => x._id === id);
  if (!row) return null;
  row.status = status;
  row.updatedAt = new Date().toISOString();
  return { ...row };
}
export async function createContact(input) {
  if (mongoReady) return (await ContactMessage.create(input)).toObject();
  const row = { ...input, _id: randomUUID(), status: 'new', createdAt: new Date().toISOString() };
  memory.messages.unshift(row);
  return row;
}
