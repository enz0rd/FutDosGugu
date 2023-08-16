'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Estados extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Estados.init({
    nome_estado: DataTypes.STRING,
    sigla: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Estados',
  });
  return Estados;
};