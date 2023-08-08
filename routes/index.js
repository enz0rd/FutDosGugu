const home = require("./homeRoutes.js");

module.exports = (app) => {
  app.use(home);
  app.set("view engine", "ejs");
};
