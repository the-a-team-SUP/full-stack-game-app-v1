'use strict';
module.exports = (sequelize, DataTypes) => {
  const Question = sequelize.define('Question', {
    content: DataTypes.STRING,
    gameId: DataTypes.INTEGER
  }, {});
  Question.associate = function(models) {
    // associations can be defined here
  };
  return Question;
};