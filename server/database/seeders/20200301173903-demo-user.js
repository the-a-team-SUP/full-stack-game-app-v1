const dummy1 = {
  name: 'Jasmin',
  email: 'jaja@gmail.com',
  createdAt: new Date(),
  updatedAt: new Date()
};

const up = (queryInterface) => queryInterface.bulkInsert('Users', [dummy1]);

const down = (queryInterface) => queryInterface.bulkDelete('Users', null, {});

export {
  up,
  down
};
