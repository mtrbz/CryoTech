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

module.exports = {
    cadastrarEmpresa
}