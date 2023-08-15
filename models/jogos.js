'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Jogos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Jogos.belongsTo(models.Equipes, { foreignKey: 'id_equipe_origem' })
      Jogos.belongsTo(models.Equipes, { foreignKey: 'id_equipe_fora' })
    }
  }
  Jogos.init({
    id_equipe_origem: DataTypes.INTEGER,
    id_equipe_fora: DataTypes.INTEGER,
    pontos_origem: DataTypes.INTEGER,
    pontos_fora: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Jogos',
  });
  return Jogos;
};