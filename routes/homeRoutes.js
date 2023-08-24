const { HomeController } = require("../Controllers/HomeController.js");
const express = require("express");
const router = express.Router();

router.get("/", HomeController.getHome);

module.exports = router;
