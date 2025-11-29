var database = require("../database/config")

function cadastrarEmpresa(razaoSocial, cnpj, cep, cidade, bairro, numero, token) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", razaoSocial, cnpj, cep, cidade, bairro, numero, token);
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucaoSql = `
        INSERT INTO empresa (razaoSocial, cnpj, cep, cidade, bairro, numero, token) VALUES 
        ('${razaoSocial}', '${cnpj}', '${cep}', '${cidade}', '${bairro}', '${numero}', '${token}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarPorToken(token) {
  var instrucaoSql = `SELECT * FROM empresa WHERE token = '${token}'`;

  return database.executar(instrucaoSql);
}

function cadastrarFuncionario(fkEmpresa, nome, cpf, dtNasc, email, telefone, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", fkEmpresa, nome, cpf, dtNasc, email, telefone, senha);
    
        var instrucaoSql = `
            INSERT INTO funcionario (idFuncionario, fkEmpresa, nome, cpf, dtNasc, email, telefone, senha) VALUES 
            (DEFAULT, '${fkEmpresa}', '${nome}', '${cpf}', '${dtNasc}', '${email}', '${telefone}', '${senha}');
        `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function enviarFaleConosco(nome, email, empresa, necessidade) {
    console.log('ACESSEI O FALE CONOSCO MODEL \n \n\t\t >> function enviarFaleConosco():', nome, email, empresa, necessidade);

    var instrucaoSql = `
        INSERT INTO faleConosco (nome, email, empresa, necessidade) VALUES
        ('${nome}', '${email}', '${empresa}', '${necessidade}');
    `;
    console.log('Executando a instrução SQL: \n' + instrucaoSql);
    return database.executar(instrucaoSql);
}

function obterTemperaturaMedia() {
    console.log('Acessei o model da temperatura!');
    
    var instrucaoSql = `
        SELECT medicao AS medTemp
        FROM registro
        ORDER BY idRegistro DESC
        LIMIT 10;
    `;

  return database.executar(instrucaoSql);
}

function atualizarTemperaturaMedia(limite) {
    console.log('Acessei o model de atualizar temperatura!');
    
    var instrucaoSql = `
        SELECT medicao AS medTemp
        FROM registro
        ORDER BY idRegistro DESC
        LIMIT ${limite};
    `;

  return database.executar(instrucaoSql);
}

module.exports = {
    cadastrarEmpresa,
    cadastrarFuncionario,
    buscarPorToken,
    enviarFaleConosco,
    obterTemperaturaMedia,
    atualizarTemperaturaMedia
}