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

function cadastrarFuncionario(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var nome = req.body.nomeServer;
    var cpf = req.body.cpfServer;
    var dtNasc = req.body.dtNascServer;
    var email = req.body.emailServer;
    var telefone = req.body.telefoneServer;
    var senha = req.body.senhaServer;
    var token = req.body.tokenServer;

    if (nome == undefined) {
        res.status(400).send("Razao social está undefined!");
    } else if (cpf == undefined) {
        res.status(400).send("cpf está undefined!");
    } else if (dtNasc == undefined) {
        res.status(400).send("data de nascimento está undefined!");
    } else if (email == undefined) {
        res.status(400).send("email está undefined!");
    } else if (telefone == undefined) {
        res.status(400).send("telefone está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("senha está undefined!");
    } else if (token == undefined) {
        res.status(400).send("token está undefined!");
    } else {
        
        empresaModel.buscarPorToken(token)
            .then(empresas => {
                if (empresas.length == 0) {
                    console.log(empresas)
                    return res.status(404).send('Token inválido')
                }

                var fkEmpresa = empresas[0].idEmpresa;
                // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
                empresaModel.cadastrarFuncionario(fkEmpresa, nome, cpf, dtNasc, email, telefone, senha)
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
            }) 
    }
}

function buscarPorToken(req, res) {
  var token = req.body.token;

  empresaModel.buscarPorToken(token).then((resultado) => {
    res.status(200).json(resultado);
  });
}

module.exports = {
    cadastrarEmpresa,
    cadastrarFuncionario,
    buscarPorToken
}