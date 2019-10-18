import User from '../../src/app/models/User';

import factory from '../factories';

describe('Test Model User', () => {
  it('should update model without password update', async () => {
    const user = await factory.create('User');
    const userUpdate = await factory.attrs('User', { password: null });

    User.update(userUpdate, { where: { id: user.id } });
  });
});
