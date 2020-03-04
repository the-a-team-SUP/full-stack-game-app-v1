const up = (queryInterface, Sequelize) => queryInterface.createTable('Games', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  users: {
    type: Sequelize.ARRAY(Sequelize.TEXT)
  },
  questionIds: {
    type: Sequelize.ARRAY(Sequelize.INTEGER)
  },
  createdAt: {
    allowNull: false,
    type: Sequelize.DATE
  },
  updatedAt: {
    allowNull: false,
    type: Sequelize.DATE
  }
});

const down = (queryInterface) => queryInterface.dropTable('Games');

export default { up, down };
