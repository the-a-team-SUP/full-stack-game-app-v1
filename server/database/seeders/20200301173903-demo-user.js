import Hasher from '../../helpers/passwordHashHelper';

const dummy1 = {
  name: 'Jasmin',
  gender: 'Male',
  email: 'jaja@gmail.com',
  username: 'jasmin',
  password: Hasher.hashPassword('123456789'),
  role: 'Admin',
  isVerified: true,
  createdAt: new Date(),
  updatedAt: new Date()
};

const up = (queryInterface) => queryInterface.bulkInsert('Users', [dummy1]);

const down = (queryInterface) => queryInterface.bulkDelete('Users', null, {});

export {
  up,
  down
};
