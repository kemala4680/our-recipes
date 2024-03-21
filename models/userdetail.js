'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  UserDetail.init({
    username: DataTypes.STRING,
    reputation: DataTypes.INTEGER,
    profilePicture: DataTypes.TEXT,
    dateOfBirth: DataTypes.DATE,
    description: DataTypes.TEXT,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'UserDetail',
  });
  return UserDetail;
};