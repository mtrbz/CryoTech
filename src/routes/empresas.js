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

router.get("/obterTemperaturaMedia/:idSensor", function (req, res) {
    empresaController.obterTemperaturaMedia(req, res);
});

router.get("/atualizarTemperaturaMedia/:idSensor", function (req, res) {
    empresaController.atualizarTemperaturaMedia(req, res);
});

router.get("/selecionarCamaras/:fkEmpresa", function (req, res) {
    empresaController.selecionarCamaras(req, res);
});

router.get("/selecionarFreezer/:fkEmpresa", function (req, res) {
    empresaController.selecionarFreezer(req, res);
});

router.get("/selecionarTransporte/:fkEmpresa", function (req, res) {
    empresaController.selecionarTransporte(req, res);
});

router.get("/kpiTempMedia/:idSensor", function (req, res) {
    empresaController.kpiTempMedia(req, res);
});

router.get("/kpiTempMaxima/:idSensor", function (req, res) {
    empresaController.kpiTempMaxima(req, res);
});

router.get("/kpiTempMinima/:idSensor", function (req, res) {
    empresaController.kpiTempMinima(req, res);
});

router.get("/kpiTotalSensores/:idSensor", function (req, res) {
    empresaController.kpiTotalSensores(req, res);
});

router.get("/kpiSensoresAtivos/:idSensor", function (req, res) {
    empresaController.kpiSensoresAtivos(req, res);
});

router.get("/kpiSensoresDefeito/:idSensor", function (req, res) {
    empresaController.kpiSensoresDefeito(req, res);
});

router.get("/obterGraficoBarra/:idSensor", function (req, res) {
    empresaController.obterGraficoBarra(req, res);
});

router.get("/atualizarGraficoBarra", function (req, res) {
    empresaController.atualizarGraficoBarra(req, res);
});

router.get("/kpiValorLote/:idSensor", function (req, res) {
    empresaController.kpiValorLote(req, res);
});

router.get("/kpiTipoLote/:idSensor", function (req, res) {
    empresaController.kpiTipoLote(req, res);
});

module.exports = router;