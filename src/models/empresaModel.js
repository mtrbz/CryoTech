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
module.exports = {
    cadastrarEmpresa,
    cadastrarFuncionario,
    buscarPorToken
}