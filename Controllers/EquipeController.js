const path = require("path");
const { checkCookies } = require("./HomeController");
const db = require("../models");

class EquipeController {
  static async getCreateEquipe(req, res) {
    try {
      const check = checkCookies(req, res);
      if (check == true) {
        const data = await db.User.findOne({
          where: { email: atob(req.cookies.sessionId) },
        });
        console.log(data);
        res.render("../views/createEquipe", { data: data });
      } else {
        res.redirect('/entrar');
      }
    } catch (error) {
      const error_message = [];
      error_message.push({
        title: "Error",
        message: error.message,
      });
      res.render("../views/error", { data: error_message });
    }
  }

  static async postCreateEquipe(req, res) {
    try {
      console.log(req.cookies.sessionId);
      const check = checkCookies(req, res);
      if (check == true) {
        let body = req.body;
        console.log("post create Equipe");
        const newTeam = await createEquipe(body);
        if (newTeam === true) {
          res.send({ message: "Equipe Criada!" });
        } else {
          res.send({
            message: `Não foi possível criar equipe | ${newTeam.message}`,
          });
        }
      } else {
        res.redirect('/entrar');
      }
    } catch (error) {
      const error_message = [];
      error_message.push({
        title: "Error",
        message: error.message,
      });
      res.render("../views/error", { data: error_message });
    }
  }

  static async getEquipes(req, res) {
    try {
      const check = checkCookies(req, res);

      if (check == true) {
        const data = await db.Equipes.findAll({
          where: {
            visibilidade: "public",
          },
        });
        const user_data = await db.User.findOne({
          where: { email: atob(req.cookies.sessionId) },
        });
        data.push(user_data);
        res.render("../views/listaEquipes", { data: data });
      } else {
        res.render("../views/listaEquipes", { data: data });
      }
    } catch (error) {
      const error_message = [];
      error_message.push({
        title: "Error",
        message: error.message,
      });
      res.render("../views/error", { data: error_message });
    }
  }

  static async attEquipe(req, res) {
    try {
      console.log(req.cookies.sessionId);
      const check = checkCookies(req, res);
      if (check == true) {
        let id = req.params.id;
        let body = req.body;
        console.log("update atualiza Equipe");
        const attTeam = await atualizaEquipe(body, id);
        if (attTeam === true) {
          res.send({ message: "Equipe atualizada!" });
        } else {
          res.send({
            message: `Não foi possível atualizar equipe | ${newTeam.message}`,
          });
        }
      } else {
        res.redirect('/entrar');
      }
    } catch (error) {
      const error_message = [];
      error_message.push({
        title: "Error",
        message: error.message,
      });
      res.render("../views/error", { data: error_message });
    }
  }

  static async delEquipe(req, res) {
    try {
      console.log(req.cookies.sessionId);
      const check = checkCookies(req, res);
      if (check) {
        const id_eq = req.params.id;
        console.log("delete deletar equipe");
        const check = await db.Equipes.findOne({ where: { id: id_eq } });
        if (check !== null) {
          const deleteEquipe = await check.update({ ativo: 0 });
          res.send({ message: "Equipe excluída!" });
        } else {
          res.send({ message: "Equipe não encontrada!" });
        }
      } else {
        res.redirect('/entrar');
      }
    } catch (error) {
      const error_message = [];
      error_message.push({
        title: "Error",
        message: error.message,
      });
      res.render("../views/error", { data: error_message });
    }
  }
}

async function atualizaEquipe(data, id) {
  try {
    var check = await db.Equipes.findOne({
      where: {
        id: id.id,
        ativo: 1,
      },
    });
    if (check !== null) {
      try {
        const atualiza = await check.update(data);
        const atualizado_em = await check.update({ updatedAt: Date.UTC() });
        return true;
      } catch (error) {
        return { message: error.message };
      }
    } else {
      return { message: "Equipe não encontrada, tente novamente" };
    }
  } catch (error) {
    return { message: error.message };
  }
}

async function createEquipe(data) {
  try {
    var check = await db.Equipes.findOne({
      where: {
        nome_equipe: data.nome_equipe,
      },
    });
    if (check === null) {
      try {
        var idPlayer = await db.User.findOne({
          attributes: ["id"],
          where: {
            email: atob(data.sessionId),
          },
        });
        const create = await db.Equipes.create({
          nome_equipe: data.nome_equipe,
          observacoes: data.observacoes,
          recrutando: data.recrutando,
          visibilidade: data.visibilidade,
          ativo: 1,
          createdAt: Date.UTC(),
          updatedAt: Date.UTC(),
        });
        const addLider = await db.Jogadores.create({
          id_equipe: create.id,
          id_jogador: idPlayer.id,
          lider: 1,
          createdAt: Date.UTC(),
          updatedAt: Date.UTC(),
        });
        return true;
      } catch (error) {
        return { message: error.message };
      }
    } else {
      return { message: "Já existe uma equipe com esse nome, tente novamente" };
    }
  } catch (error) {
    return { message: error.message };
  }
}

module.exports = EquipeController;
