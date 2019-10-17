import { factory } from 'factory-girl';
import faker from 'faker';

import Student from '../src/app/models/Student';

factory.define('Student', Student, {
  name: faker.name.findName(),
  email: faker.internet.email(),
  age: faker.random.number(80),
  weight: faker.random.number({ max: 150, precision: 0.1 }),
  height: faker.random.number({ max: 3, precision: 0.1 }),
});

export default factory;
