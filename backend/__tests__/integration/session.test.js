import request from 'supertest';

import app from '../../src/app';
import User from '../../src/app/models/User';

describe('Session', () => {
  beforeAll(async () => {
    await User.create({
      name: 'Administrador',
      email: 'admin@gympoint.com',
      password: '123456',
    });
  });

  it('should respond with error: user not found', async () => {
    const user = { email: 'usuario@gympoint.com', password: '123456' };

    const response = await request(app)
      .post('/sessions')
      .send(user);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('error');
    expect(response.body.error).toBe('User not found.');
  });

  it('should respond with error: Wrong password', async () => {
    const user = { email: 'admin@gympoint.com', password: '123456789' };

    const response = await request(app)
      .post('/sessions')
      .send(user);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('error');
    expect(response.body.error).toBe('Wrong password.');
  });

  it('should authenticate user', async () => {
    const user = { email: 'admin@gympoint.com', password: '123456' };

    const response = await request(app)
      .post('/sessions')
      .send(user);

    expect(response.body).toHaveProperty('token');
  });
});
