import request from 'supertest';

import factory from '../factories';
import app from '../../src/app';
import User from '../../src/app/models/User';

describe('Student', () => {
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

  it('should return token not provided', async () => {
    const response = await request(app)
      .post('/student')
      .send({});

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('error');
    expect(response.body.error).toBe('Token not provided.');
  });

  it('should return token invalid', async () => {
    const response = await request(app)
      .post('/student')
      .auth('teste', { type: 'bearer' })
      .send({});

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('error');
    expect(response.body.error).toBe('Token invalid.');
  });

  it('should create a new student', async () => {
    const student = await factory.attrs('Student');

    const response = await request(app)
      .post('/students')
      .auth(token, { type: 'bearer' })
      .send(student);

    expect(response.body).toHaveProperty('id');
  });
});
