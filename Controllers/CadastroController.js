const path = require("path");
const db = require("../models");
const cookieParser = require("cookie-parser");
const { where } = require("sequelize");

class CadastroController {
  //Get feito
  static async getEntrar(req, res) {
    try {
      res.sendFile(path.join(__dirname, "../views", "signup.html"));
    } catch (error) {
      console.log(`Erro ao listar: ${error.message}`);
      const error_message = [];
      error_message.push({
        title: "Error",
        message: error.message,
      });
      res.render("../views/error", { data: error_message });
    }
  }

  //post feito
  static async tryLogin(req, res) {
    try {
      console.log(req.body);
      const resp = await db.User.findOne({
        where: {
          email: req.body.email,
          password: btoa(req.body.password),
          ativo: 1
        },
      });
      if (resp != null) {
        try {
          const sessionId = btoa(req.body.email);
          const maxAge = 3600000;
          const expirationTime = Date.now() + maxAge;
          res.cookie("sessionId", sessionId, { value: true, maxAge: 3600000 });
          res.cookie("expirationTime", expirationTime, { maxAge });
          console.log("redirecting");
          res.redirect("/");
        } catch (error) {
          console.log(`Erro ao listar: ${error.message}`);
          const error_message = [];
          error_message.push({
            title: "Error",
            message: error.message,
          });
          res.render("../views/error", { data: error_message });
        }
      } else {
        res.send({ message: "Invalid Credentials" });
      }
    } catch (error) {
      console.log(`Erro ao listar: ${error.message}`);
      const error_message = [];
      error_message.push({
        title: "Error",
        message: error.message,
      });
      res.render("../views/error", { data: error_message });
    }
  }

  //post feito
  static async trySignup(req, res) {
    try {
      console.log(req.body);
      const resp = await db.User.findOne({
        where: {
          email: req.body.email,
        },
      });
      if (resp) {
        res.send({ message: "Esse email já está em uso!" });
      } else {
        const add = await db.User.create({
          nome: req.body.nome,
          email: req.body.email,
          password: btoa(req.body.password),
          cpf: req.body.cpf,
          telefone: req.body.telefone,
          id_posicao: req.body.id_posicao,
          id_cidade: req.body.id_cidade,
          ativo: 1,
          createdAt: Date.UTC(),
          updatedAt: Date.UTC(),
        });
        try {
          const sessionId = btoa(req.body.email);
          const maxAge = 3600000;
          const expirationTime = Date.now() + maxAge;
          res.cookie("sessionId", sessionId, { value: true, maxAge: 3600000 });
          res.cookie("expirationTime", expirationTime, { maxAge });
          console.log("redirecting");
          res.redirect("/home");
        } catch (error) {
          console.log(`Erro ao listar: ${error.message}`);
          const error_message = [];
          error_message.push({
            title: "Error",
            message: error.message,
          });
          res.render("../views/error", { data: error_message });
        }
      }
    } catch (error) {
      console.log(`Erro ao listar: ${error.message}`);
      const error_message = [];
      error_message.push({
        title: "Error",
        message: error.message,
      });
      res.render("../views/error", { data: error_message });
    }
  }

  //Get feito
  static async Logout(req, res) {
    res.clearCookie("sessionId");
    res.clearCookie("expirationTime");
    res.sendFile(path.join(__dirname, "../views", "logout.html"));
  }

  //put feito
  static async attCadastro(req, res) {
    const { id } = req.params;
    const updateData = req.body;
    console.log(updateData)
    try {
      const user = await db.User.findOne({
        where: {
          id: id.id,
          ativo: 1
        }
      });

      if (!user) {
        return res.status(404).json({ error: "Usuário não encontrado!" });
      }

      if (updateData != null) {
        // Update user's data with the fields from req.body
        await user.update(updateData);
        await user.update({updatedAt: Date.UTC()});
        res.status(200).send({ message: "Usuário atualizado!" });
      } else {
        res.send({ message: "Nenhum dado alterado!" });
      }
    } catch (error) {
      console.log(`Erro ao listar: ${error.message}`);
      const error_message = [];
      error_message.push({
        title: "Error",
        message: error.message,
      });
      res.render("../views/error", { data: error_message });
    }
  }

  //del feito
  static async delCadastro(req, res) {
    try {
      const id = req.params;
      console.log(id)
      const user = await db.User.findOne({
        where: {
          id: id.id,
          ativo: 1
        }
      });
      if (!user) {
        return res.status(404).json({ error: "Usuário não encontrado!" });
      }
      // Update user's data with the fields from req.body
      await user.update({ ativo: 0 });
      res.status(200).send({ message: "Usuário excluído!" });
    } catch (error) {
      console.log(`Erro ao listar: ${error.message}`);
      const error_message = [];
      error_message.push({
        title: "Error",
        message: error.message,
      });
      res.render("../views/error", { data: error_message });
    }
  }

  // users methods

  //get by name
  static async getByName(req,res){
    let nome = req.query['nome'];
    var query = `SELECT 
    u.id, 
    u.nome, 
    u.biografia, 
    p.nome_posicao, 
    c.nome_cidade, 
    est.nome_estado,
    eq.nome_equipe 
FROM 
    users u
JOIN 
    posicoes p ON u.id_posicao = p.id
JOIN 
    cidades c ON u.id_cidade = c.id
JOIN 
    estados est ON u.id_estado = est.id
JOIN 
    equipes eq ON u.id_equipe = eq.id
WHERE 
    u.nome LIKE '%${nome}%';`;
    try{
      let result = await db.sequelize.query(query);
      console.log(result)
      if (result[0].length === 0 && result[1].length === 0) {
        result = [{ message: "Nenhum usuário encontrado" }];
      }
      res.status(200).send({'data':result});
    }catch(error){
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

module.exports = CadastroController;
