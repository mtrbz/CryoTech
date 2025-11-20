var empresaModel = require("../models/empresaModel");

function cadastrarEmpresa(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var razaoSocial = req.body.razaoSocialServer;
    var cnpj = req.body.cnpjServer;
    var cep = req.body.cepServer;
    var cidade = req.body.cidadeServer;
    var bairro = req.body.bairroServer;
    var numero = req.body.numeroServer;
    var token = req.body.tokenServer;

    // Faça as validações dos valores
    if (razaoSocial == undefined) {
        res.status(400).send("Razao social está undefined!");
    } else if (cnpj == undefined) {
        res.status(400).send("CNPJ está undefined!");
    } else if (cep == undefined) {
        res.status(400).send("CEP está undefined!");
    } else if (cidade == undefined) {
        res.status(400).send("cidade está undefined!");
    } else if (bairro == undefined) {
        res.status(400).send("bairro está undefined!");
    } else if (numero == undefined) {
        res.status(400).send("numero está undefined!");
    } else if (token == undefined) {
        res.status(400).send("token está undefined!");
    } else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        empresaModel.cadastrarEmpresa(razaoSocial, cnpj, cep, cidade, bairro, numero, token)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

module.exports = {
    cadastrarEmpresa
}