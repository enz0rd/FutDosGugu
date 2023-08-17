const home = require("./homeRoutes.js");
const cadastros = require("./cadastrosRoutes.js");
const bodyParser = require('body-parser')

module.exports = (app) => {
  app.use(bodyParser.json());
  app.use(home, cadastros);
  app.set("view engine", "ejs");
};
