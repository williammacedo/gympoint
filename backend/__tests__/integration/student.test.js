import request from 'supertest';

import factory from '../factories';
import app from '../../src/app';

describe('Student', () => {
  it('should register a new student', async () => {
    const student = await factory.attrs('Student');

    const response = await request(app)
      .post('/students')
      .send(student);

    expect(response.body).toHaveProperty('id');
  });
});
