'use strict';
const {
  Model
} = require('sequelize');
const user = require('./user');
module.exports = (sequelize, DataTypes) => {
  class UserDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      UserDetail.belongsTo(models.User);
    }
  }
  UserDetail.init({
    username: DataTypes.STRING,
    reputation: DataTypes.INTEGER,
    profilePicture: DataTypes.TEXT,
    dateOfBirth: DataTypes.DATE,
    description: DataTypes.TEXT,
    UserId:{
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id'
      },
      allowNull: false,
      onDelete: cascade,
      onUpdate: cascade
    }
  }, {
    sequelize,
    modelName: 'UserDetail',
  });
  return UserDetail;
};