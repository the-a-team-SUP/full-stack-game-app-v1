const userDefinition = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING },
    picture: { type: DataTypes.STRING },
    userID: { type: DataTypes.BIGINT },
    isLoggedIn: { type: DataTypes.BOOLEAN },
    createdAt: { type: DataTypes.DATE },
    updatedAt: { type: DataTypes.DATE }
  }, {});

  return User;
};

export default userDefinition;
