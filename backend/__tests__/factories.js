import { factory } from 'factory-girl';
import faker from 'faker';

import Student from '../src/app/models/Student';
import User from '../src/app/models/User';

factory.define('User', User, {
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password(10),
});

factory.define('Student', Student, {
  name: faker.name.findName(),
  email: faker.internet.email(),
  age: faker.random.number(80),
  weight: faker.random.number({ max: 150, precision: 0.1 }),
  height: faker.random.number({ max: 3, precision: 0.1 }),
});

factory.define('StudentRuntime', Student, () => {
  const attrs = {
    name: faker.name.findName(),
    email: faker.internet.email(),
    age: faker.random.number(80),
    weight: faker.random.number({ max: 150, precision: 0.1 }),
    height: faker.random.number({ max: 3, precision: 0.1 }),
  };
  return attrs;
});

export default factory;
