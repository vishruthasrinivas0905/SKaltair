const API_BASE = import.meta.env.VITE_API_BASE || '';

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE}/api/v1${path}`, {
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    ...options,
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(payload.message || 'Something went wrong. Please try again.');
  return payload.data ?? payload;
}

export const api = {
  publicContent: (kind) => request(`/${({ program: 'programs', publication: 'publications', news: 'news', person: 'people' })[kind]}`),
  submitApplication: (data) => request('/applications', { method: 'POST', body: JSON.stringify(data) }),
  submitContact: (data) => request('/contact', { method: 'POST', body: JSON.stringify(data) }),
};
