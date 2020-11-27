'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require('bcryptjs');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User.init({
    username: {
      type: 'DataTypes.STRING',
      allowNull: false,
      validate: {
        len: {
          args: [6, 10],
          msg: 'Panjang Username harus 6 - 10'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [4, 10],
          msg: 'Panjang Password harus 4 - 10'
        },
        notNull: {
          args: true,
          msg: 'Password tidak boleh kosong'
        }
      }
    },
    highest_score: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate (userData) {
        userData.highest_score = 0
        const salt = bcrypt.genSaltSync(10);
        userData.password = bcrypt.hashSync(userData.password, salt);
      }
    }
  });
  return User;
};