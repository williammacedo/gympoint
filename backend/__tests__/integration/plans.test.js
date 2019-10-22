import request from 'supertest';

import truncate from '../util/truncate';

import app from '../../src/app';
import factory from '../factories';
import User from '../../src/app/models/User';

describe('Plans', () => {
  let token;

  beforeAll(async () => {
    await User.create({
      name: 'Administrador',
      email: 'admin@gympoint.com',
      password: '123456',
    });
    const responseAuth = await request(app)
      .post('/sessions')
      .send({ email: 'admin@gympoint.com', password: '123456' });

    token = responseAuth.body.token;
  });

  beforeEach(async () => {
    await truncate();
  });

  it('should list all plans', async () => {
    await factory.create('Plan');

    const response = await request(app)
      .get('/plans')
      .auth(token, { type: 'bearer' })
      .send();

    expect(response.body.length).toBeGreaterThan(0);
  });

  it('should create a new plan', async () => {
    const plan = await factory.attrs('PlanRandom');
    const response = await request(app)
      .post('/plans')
      .auth(token, { type: 'bearer' })
      .send(plan);

    expect(response.body).toHaveProperty('id');
  });

  it('should update a existing plan', async () => {
    const plan = await factory.create('PlanRandom');
    const planUpdate = await factory.attrs('PlanRandom');

    const response = await request(app)
      .put(`/plans/${plan.id}`)
      .auth(token, { type: 'bearer' })
      .send(planUpdate);

    expect(response.body).toHaveProperty('title');
    expect(response.body).toHaveProperty('duration');
    expect(response.body).toHaveProperty('price');
  });

  it('should fail on create a new plan without title', async () => {
    const plan = await factory.attrs('PlanRandom', { title: null });

    const response = await request(app)
      .post('/plans')
      .auth(token, { type: 'bearer' })
      .send(plan);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
    expect(response.body).toHaveProperty('messages');
  });

  it('should delete a plan and return a message', async () => {
    const plan = await factory.create('Plan');

    const response = await request(app)
      .delete(`/plans/${plan.id}`)
      .auth(token, { type: 'bearer' })
      .send();

    expect(response.status).toBe(204);
  });
});
