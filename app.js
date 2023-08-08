const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;
const routes = require("./routes/index.js");

routes(app);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.listen(port, () => {
  console.log(`rodando:
    http://localhost:${port}/`);
  app.use(function (req, res, next) {
    res.status(404);

    if (req.accepts("html")) {
      var error = [
        {
          title: "404 not found",
          message: "Page not found",
        },
      ];
      res.render("/src/views/error", { data: error });
    }
  });
});

module.exports = app;
