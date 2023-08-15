'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Jogadores extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Jogadores.belongsTo(models.User, { foreignKey: 'id_jogador' })
      Jogadores.belongsTo(models.Equipes, { foreignKey: 'id_equipe' })
    }
  }
  Jogadores.init({
    id_equipe: DataTypes.INTEGER,
    id_jogador: DataTypes.INTEGER,
    lider: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Jogadores',
  });
  return Jogadores;
};