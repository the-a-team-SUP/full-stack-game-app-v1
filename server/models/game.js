const gameDefinition = (sequelize, DataTypes) => {
  const game = sequelize.define('Game', {
    name: DataTypes.STRING,
    description: DataTypes.STRING
  }, {});

  return game;
};

export default gameDefinition;
