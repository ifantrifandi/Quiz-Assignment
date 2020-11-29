'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Quiz extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Quiz.init({
    question: {
      type: 'DataTypes.TEXT',
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Pertanyaan tidak boleh kosong'
        }
      }
    },
    answer: {
      type: 'DataTypes.STRING',
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'List Jawaban tidak boleh kosong'
        },
        contains: {
          args: '%',
          msg: 'List Jawaban harus ada % sebagai pemisah'
        }
      }
    },
    correct_answer: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Jawaban benar tidak boleh kosong'
        }
      }
    },
    image_question: DataTypes.TEXT,
    image_loop: DataTypes.INTEGER,
    score: DataTypes.INTEGER,
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Tipe Pertanyaan tidak boleh kosong'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Quiz',
    hooks: {
      beforeCreate (quiz){
        if(!quiz.score) {
          quiz.score = 10
        }
      }
    }
  });
  return Quiz;
};