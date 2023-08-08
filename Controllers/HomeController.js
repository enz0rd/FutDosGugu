const path = require("path");

class HomeController {
  static async getHome(req, res) {
    try {
      res.sendFile(path.join(__dirname, "../views", "index.html"));
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

module.exports = HomeController;
