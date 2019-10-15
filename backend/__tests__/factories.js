import { factory } from 'factory-girl';
import faker from 'faker';

import Student from '../src/app/models/Student';

factory.define('Student', Student, {
  name: faker.name.findName(),
  email: faker.internet.email(),
  age: faker.random.number(80),
  weight: faker.random.number({ max: 150, precision: 2 }),
  height: faker.random.number({ max: 2.2, precision: 2 }),
});

export default factory;
