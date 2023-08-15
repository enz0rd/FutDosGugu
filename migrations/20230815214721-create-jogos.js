'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Jogos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_equipe_origem: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Equipes',
          key: 'id'
        }
      },
      id_equipe_fora: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Equipes',
          key: 'id'
        }
      },
      pontos_origem: {
        type: Sequelize.INTEGER
      },
      pontos_fora: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Jogos');
  }
};