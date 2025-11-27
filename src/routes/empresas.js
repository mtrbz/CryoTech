var express = require("express");
var router = express.Router();

var empresaController = require("../controllers/empresaController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrarEmpresa", function (req, res) {
    empresaController.cadastrarEmpresa(req, res);
});

router.post("/cadastrarFuncionario", function (req, res) {
    empresaController.cadastrarFuncionario(req, res);
});

router.post("/enviarFaleConosco", function (req, res) {
    empresaController.enviarFaleConosco(req, res);
});

router.get("/obterTemperaturaMedia", function (req, res) {
    empresaController.obterTemperaturaMedia(req, res);
});

router.get("/atualizarTemperaturaMedia", function (req, res) {
    empresaController.atualizarTemperaturaMedia(req, res);
});

module.exports = router;