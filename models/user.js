'use strict';
const bcrypt = require('bcryptjs');

const {
  Model
} = require('sequelize');
const helper = require('../helpers');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Post);
      User.hasOne(models.UserDetail);
    }

    get created() {
      return `This Account made ${helper.created(this.createdAt)}`
    }
  }
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: {
          msg: 'email is required'
        },
        notNull: {
          msg: 'email is required'
        }, 
        isEmail: {
          msg: 'email is not a valid email address'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'password is required'
        },
        notNull: {
          msg: 'password is required'
        },
        len: {
          msg: 'password length between 8 and 16',
          args: [8, 16]
        }
      }
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'role is required'
        },
        notNull: {
          msg: 'role is required'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  User.beforeCreate((user) => {
    const salt = bcrypt.genSaltSync(8);
    user.password = bcrypt.hashSync(user.password, salt);
  })
  User.afterCreate(async (user) => {
    await sequelize.models.UserDetail.create({
      username: `Hello I'm New`, 
      reputation: 0, 
      dateOfBirth: new Date(),
      profilePicture: `https://img.pikbest.com/png-images/20210821/cute-cat-chef-character-icon_6079120.png!sw800`,
      description: '-',
      UserId: user.id
    });
  });
  return User;
};