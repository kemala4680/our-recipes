'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PostTag extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      PostTag.belongsTo(models.Post);
      PostTag.belongsTo(models.Tag);
    }
  }
  PostTag.init({
    PostId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Posts',
        key: 'id'
      },
      allowNull: false,
      onDelete: cascade,
      onUpdate: cascade
    },
    TagId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Tag',
        key: 'id'
      },
      allowNull: false,
      onDelete: cascade,
      onUpdate: cascade
    }
  }, {
    sequelize,
    modelName: 'PostTag',
  });
  return PostTag;
};