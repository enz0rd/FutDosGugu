const CadastroController = require("../Controllers/CadastroController.js");
const express = require("express");
const router = express.Router();

router.get("/entrar", CadastroController.getEntrar);
router.post("/entrar", CadastroController.tryLogin)
router.get("/logout", CadastroController.Logout);
router.post("/cadastrar", CadastroController.trySignup);
router.put("/atualizar/:id", CadastroController.attCadastro);
router.delete("/excluir/:id", CadastroController.delCadastro);

module.exports = router;
