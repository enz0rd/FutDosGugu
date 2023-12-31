'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsTo(models.Posicoes, { foreignKey: 'id_posicao' })
      User.belongsTo(models.Cidades, { foreignKey: 'id_cidade' })
      User.belongsTo(models.Estados, { foreignKey: 'id_estado' })
    }
  }
  User.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    nome: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    cpf: DataTypes.STRING,
    telefone: DataTypes.STRING,
    biografia: DataTypes.STRING,
    ativo: DataTypes.INTEGER,
    id_posicao: DataTypes.INTEGER,
    id_cidade: DataTypes.INTEGER,
    id_estado: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};