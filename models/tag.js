'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tag extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Tag.belongsToMany(models.Post, {through: models.PostTag});
      Tag.hasMany(models.PostTag);
    }
  }
  Tag.init({
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    vote: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Tag',
  });
  return Tag;
};