const SearchController = require("../Controllers/SearchController.js");
const express = require("express");
const router = express.Router();

router.get('/busca', SearchController.getBusca);
router.post('/busca', (req, res) => {
    const query = req.query['dropdown'];
    if (query == "user") {
        SearchController.getUserByName(req, res);
    } else if (query == "equipe") {
        SearchController.getByEquipe(req, res);
    } else if (query == "cidade") {
        SearchController.getByCidade(req, res);
    } else if (query == "estado") {
        SearchController.getByEstado(req, res);
    } else {
        // Lógica para caso nenhuma query seja fornecida
        res.status(400).json({ error: query });
    }
});

router.get('/usuario/busca', SearchController.getBuscaUser);
router.post('/usuario/busca', (req, res) => {
    const query = req.query['dropdown'];
    if (query == "equipe") {
        SearchController.getUserByFiltro(req, res, "equipe");
    } else if (query == "cidade") {
        SearchController.getUserByFiltro(req, res, "cidade");
    } else if (query == "estado") {
        SearchController.getUserByFiltro(req, res, "estado");
    } else if (query == "posicao") {
        SearchController.getUserByFiltro(req, res, "posicao");
    } else {
        // Lógica para caso nenhuma query seja fornecida
        res.status(400).json({ error: query });
    }
})

module.exports = router;