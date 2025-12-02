// src/routes/bobia.js
const express = require('express');
const router = express.Router();
const { gerarResposta } = require('../controllers/bobiaController');

router.post("/perguntar", async (req, res) => {
    const pergunta = req.body.pergunta;

    try {
        const resultado = await gerarResposta(pergunta);
        res.json({ resultado });
    } catch (error) {
        res.status(500).json({ error: 'Erro interno do servidor' });
    }

});

module.exports = router;
