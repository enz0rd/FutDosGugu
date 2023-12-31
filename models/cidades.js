'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cidades extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Cidades.belongsTo(models.Estados, { foreignKey: 'id_estado' })
    }
  }
  Cidades.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    nome_cidade: DataTypes.STRING,
    id_estado: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Cidades',
  });
  return Cidades;
};