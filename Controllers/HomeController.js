const path = require("path");
const db = require('../models');

class HomeController {
  static async getHome(req, res) {
    try {
      const check = checkCookies(req, res);
      console.log(check)
      const data = await db.sequelize.query(`SELECT eve.id, eve.titulo_evento, eve.data_hora, cid.nome_cidade, est.nome_estado, eve.observacoes
      FROM eventos AS eve
      INNER JOIN cidades AS cid ON eve.id_cidade_evento = cid.id
      INNER JOIN estados AS est ON eve.id_estado = est.id;`)
      if(check == true) {
        const user_data = await db.User.findOne({where:{ email: atob(req.cookies.sessionId)}})
        data.push(user_data)
        console.log(data);
        console.log(data[0][0]);
        res.render('../views/index', { data: data })
      } else {
        res.render('../views/index', { data: data })
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

async function checkCookies(req, res) {
  try {
      const sessionId = req.cookies.sessionId
      const maxAge = req.cookies.expirationTime;
      if (sessionId == null || maxAge == null) {
          console.log(`Não autorizado`)
          return false
      } else {
          var result = await db.User.findOne({ 
            where: { 
              email: atob(sessionId),
              ativo: 1 
            } 
          })
          try {
              if (result) {
                  if (maxAge < Date.now()) {
                      console.log(`Não autorizado`)
                      return false
                  } else {
                      console.log(`${sessionId} Autorizado`)
                      return true
                  }
              } else {
                  console.log(`Não autorizado`)
                  return false
              }
          } catch (error) {
              console.log(`Erro ao listar: ${error.message}`)
              return false
          }
      }
  } catch (error) {
      console.log(`Erro ao listar: ${error.message}`)
      return false
  }
}

module.exports = HomeController;
