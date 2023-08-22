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

module.exports = router;