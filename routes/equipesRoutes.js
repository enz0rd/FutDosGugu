const EquipeController = require('../Controllers/EquipeController');
const express = require("express");
const router = express.Router();

router.get('/equipes', EquipeController.getEquipes);
router.get('/equipes/criar', EquipeController.getCreateEquipe);
router.post('/equipes/criar', EquipeController.postCreateEquipe);
router.put('/equipes/atualizar/:id', EquipeController.attEquipe);
router.delete('/equipes/excluir/:id', EquipeController.attEquipe);

module.exports = router;