const path = require("path");

class CadastroController {
  static async getCadastro() {
    try {
      res.sendFile(path.join(__dirname, "../views", "signup.html"));
    } catch (error) {
      const error_message = [];
      error_message.push({
        title: "Error",
        message: error.message,
      });
      res.render("../views/error", { data: error_message });
    }
  }

  static async getLogin() {
    try {
      res.sendFile(path.join(__dirname, "../views", "login.html"));
    } catch (error) {
      const error_message = [];
      error_message.push({
        title: "Error",
        message: error.message,
      });
      res.render("../views/error", { data: error_message });
    }
  }

  static async tryLogin(req, res) {}
}

module.exports = CadastroController;
