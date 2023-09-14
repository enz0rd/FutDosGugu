const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;
const routes = require("./routes/index.js");
const cookieParser = require("cookie-parser");

routes(app);

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/'));
app.use(cookieParser());

app.listen(port, () => {
  console.log(`rodando:
    http://localhost:${port}/`);
  app.use(function (req, res, next) {
    res.status(404);

    if (req.accepts("html")) {
      var error = [
        {
          title: "404",
          message: "Página não encontrada",
        },
      ];
      res.render("../views/error", { data: error });
    }
  });
});

module.exports = app;
