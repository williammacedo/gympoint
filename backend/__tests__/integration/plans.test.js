import request from 'supertest';

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

  it('should list all plans', async () => {
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

  it('should delete a plan and return a message', async () => {
    const plan = await factory.create('Plan');

    const response = await request(app)
      .delete(`/plans/${plan.id}`)
      .auth(token, { type: 'bearer' })
      .send();

    expect(response.status).toBe(204);
  });
});
