const up = (queryInterface, Sequelize) => queryInterface.createTable('Users', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  name: {
    type: Sequelize.STRING
  },
  gender: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING
  },
  username: {
    type: Sequelize.STRING,
    unique: true
  },
  password: {
    type: Sequelize.STRING
  },
  role: {
    type: Sequelize.STRING
  },
  social_id: {
    type: Sequelize.STRING,
    unique: true
  },
  provider: {
    type: Sequelize.STRING
  },
  isVerified: {
    type: Sequelize.BOOLEAN
  },
  profilePhoto: {
    type: Sequelize.STRING
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

const down = (queryInterface) => queryInterface.dropTable('Users');

export { up, down };
