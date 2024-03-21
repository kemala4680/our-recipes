'use strict';
const {
  Model
} = require('sequelize');
const helper = require('../helpers');
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

    get descLimiter() {
      return helper.textLimiter(this.description) + ' . . .';
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
  Tag.beforeCreate((tag) => {
    tag.vote = 0;
  })
  return Tag;
};