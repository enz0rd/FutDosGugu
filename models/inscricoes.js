'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Inscricoes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Inscricoes.belongsTo(models.User, { foreignKey: 'id_user' })
      Inscricoes.belongsTo(models.Evento, { foreignKey: 'id_evento' })
    }
  }
  Inscricoes.init({
    id_user: DataTypes.INTEGER,
    id_evento: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Inscricoes',
  });
  return Inscricoes;
};