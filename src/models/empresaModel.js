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

function cadastrarServicos(fkEmpresa, camaras, transportes, freezers) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", fkEmpresa, camaras, transportes, freezers);
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucaoSql = `
        INSERT INTO servico (fkEmpresa, camaras, transportes, freezers) VALUES 
        ('${fkEmpresa}', '${camaras}', '${transportes}', '${freezers}');
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

function enviarFaleConosco(nome, email, empresa, necessidade, camara, transporte, freezer) {
    console.log('ACESSEI O FALE CONOSCO MODEL \n \n\t\t >> function enviarFaleConosco():', nome, email, empresa, necessidade, camara, transporte, freezer);

    var instrucaoSql = `
        INSERT INTO faleConosco (nome, email, empresa, necessidade, camara, transporte, freezer) VALUES
        ('${nome}', '${email}', '${empresa}', '${necessidade}', '${camara}', '${transporte}', '${freezer}');
    `;
    console.log('Executando a instrução SQL: \n' + instrucaoSql);
    return database.executar(instrucaoSql);
}

function obterTemperaturaMedia(idSensor) {
    console.log('Acessei o model da temperatura!');
    
    var instrucaoSql = `
        SELECT temperatura FROM 
        vw_temp WHERE idSensor = ${idSensor}
        LIMIT 10;
    `;

  return database.executar(instrucaoSql);
}

function atualizarTemperaturaMedia(idSensor) {
    console.log('Acessei o model de atualizar temperatura!');
    
    var instrucaoSql = `
        SELECT medicao as medTemp
        FROM vw_sensor WHERE idSensor = ${idSensor}
        ORDER BY idRegistro DESC LIMIT 1;
    `;

  return database.executar(instrucaoSql);
}

function selecionarCamaras(idEmpresa) {
    console.log('Acessei o model de selecionar as camaras!');
    
    var instrucaoSql = `
        SELECT camaras FROM servico
        WHERE fkEmpresa = ${idEmpresa};
    `;

  return database.executar(instrucaoSql);
}

function selecionarTransporte(idEmpresa) {
    console.log('Acessei o model de selecionar os transportes!');
    
    var instrucaoSql = `
        SELECT transportes FROM servico
        WHERE fkEmpresa = ${idEmpresa};
    `;

  return database.executar(instrucaoSql);
}

function selecionarFreezer(idEmpresa) {
    console.log('Acessei o model de selecionar os freezers!');
    
    var instrucaoSql = `
        SELECT freezers FROM servico
        WHERE fkEmpresa = ${idEmpresa};
    `;

  return database.executar(instrucaoSql);
}

function kpiTempMedia(idSensor) {
    console.log('Acessei o model da temperatura!');
    
    var instrucaoSql = `
        SELECT ROUND(AVG(medicao)) AS tempMedia 
        FROM vw_temp WHERE idSensor = ${idSensor};
    `;

  return database.executar(instrucaoSql);
}

function kpiTempMaxima(idSensor) {
    console.log('Acessei o model da temperatura!');
    
    var instrucaoSql = `
        SELECT MAX(medicao) AS tempMaxima 
        FROM vw_temp WHERE idSensor = ${idSensor} 
        AND medicao <> 0.00;
    `;

  return database.executar(instrucaoSql);
}

function kpiTempMinima(idSensor) {
    console.log('Acessei o model da temperatura!');
    
    var instrucaoSql = `
        SELECT MIN(medicao) AS tempMinima 
        FROM vw_temp WHERE idSensor = ${idSensor};
    `;

  return database.executar(instrucaoSql);
}

function kpiTotalSensores(idSensor) {
    console.log('Acessei o model da temperatura!');
    
    var instrucaoSql = `
        SELECT COUNT(idSensor) AS total
        FROM sensor;
    `;

  return database.executar(instrucaoSql);
}

function kpiSensoresAtivos(idSensor) {
    console.log('Acessei o model da temperatura!');
    
    var instrucaoSql = `
        SELECT COUNT(idSensor) AS ativos
        FROM sensor WHERE status = 'ativo';
    `;

  return database.executar(instrucaoSql);
}

function kpiSensoresDefeito(idSensor) {
    console.log('Acessei o model da temperatura!');
    
    var instrucaoSql = `
        SELECT COUNT(idSensor) AS defeito
        FROM sensor WHERE idSensor = ${idSensor} 
        AND status <> 'ativo';
    `;

  return database.executar(instrucaoSql);
}

function obterGraficoBarra(idSensor) {
    console.log('Acessei o model da temperatura!');
    
    var instrucaoSql = `
        SELECT temperatura FROM 
        vw_temp WHERE idSensor = ${idSensor}
        LIMIT 10;
    `;

  return database.executar(instrucaoSql);
}

function atualizarGraficoBarra() {
    console.log('Acessei o model de atualizar temperatura!');
    
    var instrucaoSql = `
        SELECT medicao AS medTemp
        FROM registro
        ORDER BY idRegistro DESC
        LIMIT 1;
    `;

  return database.executar(instrucaoSql);
}

function kpiValorLote(idSensor) {
    console.log('Acessei o model da temperatura!');
    
    var instrucaoSql = `
       SELECT valor FROM vw_lote
       WHERE fkLocal = ${idSensor};
    `;

  return database.executar(instrucaoSql);
}

function kpiTipoLote(idSensor) {
    console.log('Acessei o model da temperatura!');
    
    var instrucaoSql = `
       SELECT tipo FROM vw_lote
       WHERE fkLocal = ${idSensor};
    `;

  return database.executar(instrucaoSql);
}

module.exports = {
    cadastrarEmpresa,
    cadastrarFuncionario,
    buscarPorToken,
    enviarFaleConosco,
    obterTemperaturaMedia,
    atualizarTemperaturaMedia,
    cadastrarServicos,
    selecionarCamaras,
    selecionarTransporte,
    selecionarFreezer,
    kpiTempMedia,
    kpiTempMaxima,
    kpiTempMinima,
    kpiTotalSensores,
    kpiSensoresAtivos,
    kpiSensoresDefeito,
    obterGraficoBarra,
    atualizarGraficoBarra,
    kpiValorLote,
    kpiTipoLote
}