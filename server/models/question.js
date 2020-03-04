const questionDefinition = (sequelize, DataTypes) => {
  const Question = sequelize.define('Question', {
    content: DataTypes.STRING,
    choises: DataTypes.INTEGER,
    createdAt: { type: DataTypes.DATE },
    updatedAt: { type: DataTypes.DATE }
  }, {});

  Question.associate = (models) => {
    Question.hasMany(models.Game, {
      foreignKey: 'questionIds',
      as: 'Games',
      onDelete: 'CASCADE'
    });
  };

  return Question;
};

export default questionDefinition;
