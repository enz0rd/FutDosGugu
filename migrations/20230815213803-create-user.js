'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nome: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      cpf: {
        type: Sequelize.STRING
      },
      telefone: {
        type: Sequelize.STRING
      },
      id_posicao: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Posicoes',
          key: 'id'
        }
      },
      id_cidade: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Cidades',
          key: 'id'
        }
      },
      id_equipe: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Equipes',
          key: 'id'
        }
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
    await queryInterface.dropTable('Users');
  }
};