const up = (queryInterface, Sequelize) => queryInterface.createTable('Questions', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  content: {
    type: Sequelize.STRING
  },
  choises: {
    type: Sequelize.ARRAY(Sequelize.TEXT)
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
const down = (queryInterface) => queryInterface.dropTable('Questions');

export default { up, down };
