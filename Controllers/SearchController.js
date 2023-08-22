const path = require("path");
const db = require("../models");

class SearchController {
  // render page
  static async getBusca(req, res) {
    try {
      let data = [
        {
          message: "Comece a pesquisar!",
        },
      ];
      res.render("../views/search", { data: data });
    } catch (error) {
      console.log(`Erro ao listar: ${error.message}`);
      const error_message = [];
      error_message.push({
        title: "Falha no carregamento",
        message: error.message,
      });
      res.render("../views/error", { data: error_message });
    }
  }

  //get user by name
  static async getUserByName(req, res) {
    let nome = req.body.query;
    console.log(req.body);
    var query = `SELECT 
        u.id, 
        u.nome, 
        u.biografia, 
        p.nome_posicao, 
        c.nome_cidade, 
        est.nome_estado FROM users u JOIN posicoes p ON u.id_posicao = p.id JOIN cidades c ON u.id_cidade = c.id JOIN estados est ON u.id_estado = est.id WHERE u.nome LIKE '%${nome}%';`;
    try {
      let result = await db.sequelize.query(query);
      if (result[0].length === 0 && result[1].length === 0) {
        result = [{ message: "Nenhum usuário encontrado" }];
      }
      res.status(200).send(result);
    } catch (error) {
      console.log(`Erro ao listar: ${error.message}`);
      const error_message = [];
      error_message.push({
        title: "Falha na consulta",
        message: error.message,
      });
      res.render("../views/error", { data: error_message });
    }
  }

  static async getByEstado(req, res) {
    let nome = req.body.query;
    console.log(req.body);
    var query = `SELECT 
        id, 
        nome_estado,
        sigla
        FROM estados 
        WHERE nome_estado LIKE '%${nome}%';`;
    try {
      let result = await db.sequelize.query(query);
      if (result[0].length === 0 && result[1].length === 0) {
        result = [{ message: "Nenhum estado encontrado" }];
      }
      console.log(result);
      res.status(200).send(result);
    } catch (error) {
      console.log(`Erro ao listar: ${error.message}`);
      const error_message = [];
      error_message.push({
        title: "Falha na consulta",
        message: error.message,
      });
      res.render("../views/error", { data: error_message });
    }
  }

  static async getByCidade(req, res) {
    let nome = req.body.query;
    console.log(req.body);
    var query = `SELECT 
        c.id, 
        c.nome_cidade, 
        est.nome_estado 
        FROM cidades c 
        JOIN estados est ON c.id_estado = est.id 
        WHERE c.nome_cidade LIKE '%${nome}%';`;
    try {
      let result = await db.sequelize.query(query);
      if (result[0].length === 0 && result[1].length === 0) {
        result = [{ message: "Nenhuma cidade encontrada" }];
      }
      console.log(result);
      res.status(200).send(result);
    } catch (error) {
      console.log(`Erro ao listar: ${error.message}`);
      const error_message = [];
      error_message.push({
        title: "Falha na consulta",
        message: error.message,
      });
      res.render("../views/error", { data: error_message });
    }
  }

  static async getByEquipe(req, res) {
    let nome = req.body.query;
    console.log(req.body);
    var query = `SELECT 
        e.id, 
        e.nome_equipe,
        e.observacoes,
        COUNT(j.id) AS numero_jogadores
        FROM equipes e
        LEFT JOIN jogadores j ON e.id = j.id_equipe
        WHERE e.nome_equipe LIKE '%${nome}%'
        GROUP BY e.id, e.nome_equipe, e.observacoes;`;
    try {
      let result = await db.sequelize.query(query);
      if (result[0].length === 0 && result[1].length === 0) {
        result = [{ message: "Nenhuma equipe encontrada" }];
      }
      console.log(result);
      res.status(200).send(result);
    } catch (error) {
      console.log(`Erro ao listar: ${error.message}`);
      const error_message = [];
      error_message.push({
        title: "Falha na consulta",
        message: error.message,
      });
      res.render("../views/error", { data: error_message });
    }
  }
}

module.exports = SearchController;
