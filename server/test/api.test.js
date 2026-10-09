import { beforeEach, after, describe, it } from 'node:test';
import assert from 'node:assert/strict';
import request from 'supertest';
import app from '../src/app.js';
import { resetDemoStore } from '../src/services/store.js';

process.env.NODE_ENV = 'test';
beforeEach(() => resetDemoStore());
after(() => resetDemoStore());

const validApplication = {
  name: 'Asha Rao', email: 'asha@example.org', program: 'short-term', theme: 'Digital rights',
  title: 'Rights in digital public services', summary: 'This proposal examines how digital public services can protect rights and support access to justice.', consent: true,
};

describe('SKALTAIR API', () => {
  it('reports health and demo storage mode', async () => {
    const result = await request(app).get('/api/v1/health').expect(200);
    assert.equal(result.body.data.status, 'ok');
    assert.equal(result.body.data.storage, 'demo-memory');
  });

  it('rejects an incomplete application', async () => {
    const result = await request(app).post('/api/v1/applications').send({ email: 'bad' }).expect(400);
    assert.equal(result.body.issues.length > 0, true);
  });

  it('records an application and returns a reference without exposing applicant data', async () => {
    const result = await request(app).post('/api/v1/applications').send(validApplication).expect(201);
    assert.match(result.body.data.reference, /^SKA-\d{4}-[A-F0-9]{8}$/);
    assert.equal(Object.hasOwn(result.body.data, 'email'), false);
  });

  it('does not expose an admin portal or management API', async () => {
    await request(app).get('/api/v1/admin/applications').expect(404);
    await request(app).post('/api/v1/admin/login').send({ email: 'staff@example.org', password: 'not-used' }).expect(404);
  });


  it('serves seeded public research programmes', async () => {
    const result = await request(app).get('/api/v1/programs').expect(200);
    assert.equal(result.body.data.length, 3);
    assert.equal(result.body.data[0].kind, 'program');
    assert.deepEqual(result.body.data.map(program => program.title), ['Short-Term Program', 'Mid-Term Program', 'Long-Term Program']);
  });
});
