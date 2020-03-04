const gameDefinition = (sequelize, DataTypes) => {
  const game = sequelize.define('Game', {
    users: {
      type: DataTypes.ARRAY(DataTypes.TEXT)
    },
    questionIds: {
      type: DataTypes.ARRAY(DataTypes.INTEGER)
    }
  }, {});

  game.associate = (models) => {
    game.belongsTo(models.Question, {
      foreignKey: 'questionIds',
      as: 'Questions',
      onDelete: 'CASCADE'
    });
  };

  return game;
};

export default gameDefinition;
