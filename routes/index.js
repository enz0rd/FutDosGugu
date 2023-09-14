const home = require("./homeRoutes.js");
const cadastros = require("./cadastrosRoutes.js");
const search = require("./searchRoutes.js");
const equipes = require("./equipesRoutes.js");
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");

module.exports = (app) => {
  app.use(bodyParser.json());
  app.use(home, cadastros, search, equipes);
  app.set("view engine", "ejs");
  app.use(cookieParser());
};
