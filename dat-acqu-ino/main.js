// importa os bibliotecas necessários
const express = require('express');
const mysql = require('mysql2');

// constantes para configurações
const SERVIDOR_PORTA = 3300;

// habilita ou desabilita a inserção de dados no banco de dados
const HABILITAR_OPERACAO_INSERIR = true;

// função para "simular" comunicação serial (sem Arduino)
const simularSensores = async (
    valoresSensorAnalogico,
    valoresSensorAnalogico2,
    valoresSensorAnalogico3,
    valoresSensorAnalogico4,
    valoresSensorAnalogico5,
    valoresSensorAnalogico6,
    valoresSensorAnalogico7,
    valoresSensorAnalogico8
) => {

    // conexão com o banco de dados MySQL
    let poolBancoDados = mysql.createPool(
        {
            host: '127.0.0.1',
            user: 'aluno',
            password: 'Sptech#2024',
            database: 'cryotech',
            port: 3307
        }
    ).promise();

    console.log("Simulador de sensores iniciado. Gerando dados a cada 2s...");

    // gera dados simulados continuamente
    setInterval(async () => {

        // temperatura simulada: -20 a 10°C
        const sensorAnalogico = parseFloat(Math.floor((Math.random() * 40 - 20)));
        const sensorAnalogico2 = sensorAnalogico - 30;
        const sensorAnalogico3 = sensorAnalogico + 10;
        const sensorAnalogico4 = parseFloat(Math.floor((Math.random() * 50 - 25)));
        const sensorAnalogico5 = parseFloat(Math.floor((Math.random() * 15 - 5)));
        const sensorAnalogico6 = parseFloat(Math.floor((Math.random() * 20 - 10)));
        const sensorAnalogico7 = sensorAnalogico + parseFloat(Math.floor((Math.random() * 10 - 5)));
        const sensorAnalogico8 = sensorAnalogico / 2;

        // adiciona nos arrays
        valoresSensorAnalogico.push(sensorAnalogico);
        valoresSensorAnalogico2.push(sensorAnalogico2);
        valoresSensorAnalogico3.push(sensorAnalogico3);
        valoresSensorAnalogico4.push(sensorAnalogico4);
        valoresSensorAnalogico5.push(sensorAnalogico5);
        valoresSensorAnalogico6.push(sensorAnalogico6);
        valoresSensorAnalogico7.push(sensorAnalogico7);
        valoresSensorAnalogico8.push(sensorAnalogico8);

        console.log("Simulado:", sensorAnalogico);

        // insere no banco se estiver habilitado
        if (HABILITAR_OPERACAO_INSERIR) {
            try {

                await poolBancoDados.execute(
                    'INSERT INTO registro (medicao, fkSensor) VALUES (?,?)',
                    [sensorAnalogico, 1]
                );

                 await poolBancoDados.execute(
                    `INSERT INTO registro (medicao, fkSensor) VALUES (?, ?)`,
                    [sensorAnalogico2, 2]
                );

                await poolBancoDados.execute(
                    `INSERT INTO registro (medicao, fkSensor) VALUES (?, ?)`,
                    [sensorAnalogico3, 3]
                );

                await poolBancoDados.execute(
                    `INSERT INTO registro (medicao, fkSensor) VALUES (?, ?)`,
                    [sensorAnalogico4, 4]
                );

                await poolBancoDados.execute(
                    `INSERT INTO registro (medicao, fkSensor) VALUES (?, ?)`,
                    [sensorAnalogico5, 5]
                );

                await poolBancoDados.execute(
                    `INSERT INTO registro (medicao, fkSensor) VALUES (?, ?)`,
                    [sensorAnalogico6, 6]
                );

                await poolBancoDados.execute(
                    `INSERT INTO registro (medicao, fkSensor) VALUES (?, ?)`,
                    [sensorAnalogico7, 7]
                );

                await poolBancoDados.execute(
                    `INSERT INTO registro (medicao, fkSensor) VALUES (?, ?)`,
                    [sensorAnalogico8, 8]
                );

                console.log("Valor inserido no banco:", sensorAnalogico);
            } catch (erro) {
                console.error("Erro ao inserir no banco:", erro);
            }
        }

    }, 2000); // a cada 2 segundos
};

// função para criar e configurar o servidor web
const servidor = (
    valoresSensorAnalogico, valoresSensorAnalogico2, valoresSensorAnalogico3,
    valoresSensorAnalogico4, valoresSensorAnalogico5, valoresSensorAnalogico6,
    valoresSensorAnalogico7, valoresSensorAnalogico8
) => {
    const app = express();

    // configurações de requisição e resposta
    app.use((request, response, next) => {
        response.header('Access-Control-Allow-Origin', '*');
        response.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
        next();
    });

    // inicia o servidor na porta especificada
    app.listen(SERVIDOR_PORTA, () => {
        console.log(`API executada com sucesso na porta ${SERVIDOR_PORTA}`);
    });

    // define os endpoints da API
    app.get('/sensores/analogico', (_, response) => {
        return response.json(valoresSensorAnalogico);
    });
    app.get('/sensores/analogico2', (_, response) => {
        return response.json(valoresSensorAnalogico2);
    });
    app.get('/sensores/analogico3', (_, response) => {
        return response.json(valoresSensorAnalogico3);
    });
    app.get('/sensores/analogico3', (_, response) => {
        return response.json(valoresSensorAnalogico4);
    });
    app.get('/sensores/analogico3', (_, response) => {
        return response.json(valoresSensorAnalogico5);
    });
    app.get('/sensores/analogico3', (_, response) => {
        return response.json(valoresSensorAnalogico6);
    });
    app.get('/sensores/analogico3', (_, response) => {
        return response.json(valoresSensorAnalogico7);
    });
    app.get('/sensores/analogico3', (_, response) => {
        return response.json(valoresSensorAnalogico8);
    });
};

// função principal
(async () => {

    // arrays para armazenar os valores dos sensores
    const valoresSensorAnalogico = [];
    const valoresSensorAnalogico2 = [];
    const valoresSensorAnalogico3 = [];
    const valoresSensorAnalogico4 = [];
    const valoresSensorAnalogico5 = [];
    const valoresSensorAnalogico6 = [];
    const valoresSensorAnalogico7 = [];
    const valoresSensorAnalogico8 = [];

    // inicia simulação
    simularSensores(
        valoresSensorAnalogico, valoresSensorAnalogico2, valoresSensorAnalogico3,
        valoresSensorAnalogico4, valoresSensorAnalogico5, valoresSensorAnalogico6,
        valoresSensorAnalogico7, valoresSensorAnalogico8
    );

    // inicia o servidor web
    servidor(
        valoresSensorAnalogico, valoresSensorAnalogico2, valoresSensorAnalogico3,
        valoresSensorAnalogico4, valoresSensorAnalogico5, valoresSensorAnalogico6,
        valoresSensorAnalogico7, valoresSensorAnalogico8
    );
})();
