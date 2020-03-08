const dummyGame1 = {
  users: [
    JSON.stringify({
      userId: 1,
      score: 11
    }),
    JSON.stringify({
      userId: 2,
      score: 12
    }),
    JSON.stringify({
      userId: 3,
      score: 13
    }),
    JSON.stringify({
      userId: 4,
      score: 14
    }),
    JSON.stringify({
      userId: 5,
      score: 15
    })
  ],
  questionIds: [1, 2, 3, 4, 5],
  identifier: 'zxcvbnm',
  createdAt: new Date(),
  updatedAt: new Date()
};

const up = (queryInterface) => queryInterface.bulkInsert('Games', [dummyGame1]);

const down = (queryInterface) => queryInterface.bulkDelete('Games', null, {});

export {
  up,
  down
};
