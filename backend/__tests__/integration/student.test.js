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

  it('should return error, whe try create student with missing required fields', async () => {
    const student = await factory.attrs('Student', { name: null });
    const response = await request(app)
      .post('/students')
      .auth(token, { type: 'bearer' })
      .send(student);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
    expect(response.body).toHaveProperty('messages');
  });

  it('should return error, whe try update student with missing required fields', async () => {
    const student = await factory.attrs('Student', { name: null });
    const response = await request(app)
      .put('/students/1')
      .auth(token, { type: 'bearer' })
      .send(student);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
    expect(response.body).toHaveProperty('messages');
  });

  it('should create a new student', async () => {
    const student = await factory.attrs('Student');
    const response = await request(app)
      .post('/students')
      .auth(token, { type: 'bearer' })
      .send(student);
    expect(response.body).toHaveProperty('id');
  });

  it('should return Student not found.', async () => {
    const student = await factory.create('Student');
    const newDataStudent = await factory.attrs('Student');

    const response = await request(app)
      .put(`/students/${student.id + 1}`)
      .auth(token, { type: 'bearer' })
      .send(newDataStudent);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
    expect(response.body.error).toBe('Student not found.');
  });

  it('should update student with the same email', async () => {
    const student = await factory.create('Student');
    const newDataStudent = await factory.attrs('Student');

    const response = await request(app)
      .put(`/students/${student.id}`)
      .auth(token, { type: 'bearer' })
      .send(newDataStudent);

    expect(response.body).toHaveProperty('name');
    expect(response.body).toHaveProperty('email');
  });

  it('should update student with diferent email', async () => {
    const student = await factory.create('StudentRuntime');
    const newDataStudent = await factory.attrs('StudentRuntime');

    const response = await request(app)
      .put(`/students/${student.id}`)
      .auth(token, { type: 'bearer' })
      .send(newDataStudent);

    expect(response.body).toHaveProperty('name');
    expect(response.body).toHaveProperty('email');
  });

  it('should return There is already a student with this email: when update student', async () => {
    const student = await factory.create('Student', {
      email: 'student@gympoint.com',
    });

    factory.create('Student', {
      email: 'student2@gympoint.com',
    });

    const newDataStudent = await factory.attrs('Student', {
      email: 'student2@gympoint.com',
    });

    const response = await request(app)
      .put(`/students/${student.id}`)
      .auth(token, { type: 'bearer' })
      .send(newDataStudent);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
    expect(response.body.error).toContain(
      'There is already a student with this email'
    );
  });

  it('should return There is already a student with this email: when create new student ', async () => {
    await factory.create('StudentRuntime', {
      email: 'student@gympoint.com',
    });

    const newDataStudent = await factory.attrs('StudentRuntime', {
      email: 'student@gympoint.com',
    });

    const response = await request(app)
      .post(`/students`)
      .auth(token, { type: 'bearer' })
      .send(newDataStudent);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
    expect(response.body.error).toContain(
      'There is already a student with this email'
    );
  });
});
