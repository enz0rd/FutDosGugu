'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Evento extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Evento.belongsTo(models.Cidades, { foreignKey: 'id_cidade_evento' });
      Evento.belongsTo(models.User, { foreignKey: 'id_organizador' });
      Evento.belongsTo(models.Jogos, { foreignKey: 'id_jogo' });
    }
  }
  Evento.init({
    titulo_evento: DataTypes.STRING,
    data_hora: DataTypes.STRING,
    valor_total: DataTypes.FLOAT,
    comida_evento: DataTypes.INTEGER,
    endereco_evento: DataTypes.STRING,
    link_maps: DataTypes.STRING,
    link_grupo_zap: DataTypes.STRING,
    id_cidade_evento: DataTypes.INTEGER,
    id_organizador: DataTypes.INTEGER,
    id_jogo: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Evento',
  });
  return Evento;
};