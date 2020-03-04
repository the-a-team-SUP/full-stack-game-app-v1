const gameDefinition = (sequelize, DataTypes) => {
  const game = sequelize.define('Game', {
  users: {
    type: DataTypes.ARRAY(DataTypes.TEXT)
  },
  questionIds: {
    type: DataTypes.ARRAY(DataTypes.INTEGER)
  }
  }, {});

  return game;
};

export default gameDefinition;
