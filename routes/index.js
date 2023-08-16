const home = require("./homeRoutes.js");
const cadastros = require("./cadastrosRoutes.js");

module.exports = (app) => {
  app.use(home, cadastros);
  app.set("view engine", "ejs");
};
