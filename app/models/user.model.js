module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("user", {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    age: DataTypes.STRING,
    Password: DataTypes.STRING,
    gender: DataTypes.STRING,
  });

  return User;
};
