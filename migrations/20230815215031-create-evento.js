'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Eventos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      titulo_evento: {
        type: Sequelize.STRING
      },
      data_hora: {
        type: Sequelize.STRING
      },
      valor_total: {
        type: Sequelize.FLOAT
      },
      comida_evento: {
        type: Sequelize.INTEGER
      },
      endereco_evento: {
        type: Sequelize.STRING
      },
      link_maps: {
        type: Sequelize.STRING
      },
      link_grupo_zap: {
        type: Sequelize.STRING
      },
      observacoes: {
        type: Sequelize.STRING
      },
      ativo: {
        type: Sequelize.INTEGER
      },
      id_cidade_evento: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Cidades',
          key: 'id'
        }
      },
      id_estado: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Estados',
          key: 'id'
        }
      },
      id_organizador: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id'
        }
      },
      id_jogo: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Jogos',
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
    await queryInterface.dropTable('Eventos');
  }
};