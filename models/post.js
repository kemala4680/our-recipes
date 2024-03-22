'use strict';
const {
  Model
} = require('sequelize');
const helper = require('../helpers');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Post.belongsTo(models.User);
      Post.belongsToMany(models.Tag, {through: models.PostTag});
      Post.hasMany(models.PostTag);
    }

    get created() {
      return helper.created(this.createdAt);
    }
  }
  Post.init({
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    imgURL: DataTypes.TEXT,
    vote: DataTypes.INTEGER,
    UserId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id'
      },
      allowNull: false,
      onDelete: 'cascade',
      onUpdate: 'cascade'
    }
  }, {
    sequelize,
    modelName: 'Post',
  });
  Post.beforeCreate((post) => {
    post.vote = 0;
  })
  return Post;
};