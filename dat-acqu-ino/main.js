// importa os bibliotecas necessários
const serialport = require('serialport');
const express = require('express');
const mysql = require('mysql2');

// constantes para configurações
const SERIAL_BAUD_RATE = 9600;
const SERVIDOR_PORTA = 3300;

// habilita ou desabilita a inserção de dados no banco de dados
const HABILITAR_OPERACAO_INSERIR = true;

// função para comunicação serial
const serial = async (
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

    // lista as portas seriais disponíveis e procura pelo Arduino
    const portas = await serialport.SerialPort.list();
    const portaArduino = portas.find((porta) => porta.vendorId == 2341 && porta.productId == 43);
    if (!portaArduino) {
        throw new Error('O arduino não foi encontrado em nenhuma porta serial');
    }

    // configura a porta serial com o baud rate especificado
    const arduino = new serialport.SerialPort(
        {
            path: portaArduino.path,
            baudRate: SERIAL_BAUD_RATE
        }
    );

    // evento quando a porta serial é aberta
    arduino.on('open', () => {
        console.log(`A leitura do arduino foi iniciada na porta ${portaArduino.path} utilizando Baud Rate de ${SERIAL_BAUD_RATE}`);
    });

    // processa os dados recebidos do Arduino
    arduino.pipe(new serialport.ReadlineParser({ delimiter: '\r\n' })).on('data', async (data) => {
        console.log(data);
        const valores = data.split(';');
        const sensorAnalogico = parseFloat(valores[0] * -1);
        console.log(`Valor do sensor: ${sensorAnalogico}`)
        const sensorAnalogico2 = sensorAnalogico + 4;
        const sensorAnalogico3 = sensorAnalogico * 2;
        const sensorAnalogico4 = sensorAnalogico + 5;
        const sensorAnalogico5 = sensorAnalogico - 8;
        const sensorAnalogico6 = sensorAnalogico + 20;
        const sensorAnalogico7 = sensorAnalogico - 12;
        const sensorAnalogico8 = sensorAnalogico / 2;

        // armazena os valores dos sensores nos arrays correspondentes
        valoresSensorAnalogico.push(sensorAnalogico);
        valoresSensorAnalogico2.push(sensorAnalogico2);
        valoresSensorAnalogico3.push(sensorAnalogico3);
        valoresSensorAnalogico4.push(sensorAnalogico4);
        valoresSensorAnalogico5.push(sensorAnalogico5);
        valoresSensorAnalogico6.push(sensorAnalogico6);
        valoresSensorAnalogico7.push(sensorAnalogico7);
        valoresSensorAnalogico8.push(sensorAnalogico8);


        // insere os dados no banco de dados (se habilitado)
        if (HABILITAR_OPERACAO_INSERIR) {

            // este insert irá inserir os dados na tabela "medida"
            await poolBancoDados.execute(
                'INSERT INTO registro (medicao, fkSensor) VALUES (?,?)',
                [sensorAnalogico, 1]
            );

            await poolBancoDados.execute(
                'INSERT INTO registro (medicao, fkSensor) VALUES (?,?)',
                [sensorAnalogico2, 2]
            );

            await poolBancoDados.execute(
                'INSERT INTO registro (medicao, fkSensor) VALUES (?,?)',
                [sensorAnalogico3, 3]
            );

            await poolBancoDados.execute(
                'INSERT INTO registro (medicao, fkSensor) VALUES (?,?)',
                [sensorAnalogico4, 4]
            );

            await poolBancoDados.execute(
                'INSERT INTO registro (medicao, fkSensor) VALUES (?,?)',
                [sensorAnalogico5, 5]
            );

            await poolBancoDados.execute(
                'INSERT INTO registro (medicao, fkSensor) VALUES (?,?)',
                [sensorAnalogico6, 6]
            );

            await poolBancoDados.execute(
                'INSERT INTO registro (medicao, fkSensor) VALUES (?,?)',
                [sensorAnalogico7, 7]
            );

            await poolBancoDados.execute(
                'INSERT INTO registro (medicao, fkSensor) VALUES (?,?)',
                [sensorAnalogico8, 8]
            );

        }       

    });

    // evento para lidar com erros na comunicação serial
    arduino.on('error', (mensagem) => {
        console.error(`Erro no arduino (Mensagem: ${mensagem}`)
    });
}

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

    // define os endpoints da API para cada tipo de sensor
    app.get('/sensores/analogico', (_, response) => {
        return response.json(valoresSensorAnalogico);
    });
    app.get('/sensores/analogico2', (_, response) => {
        return response.json(valoresSensorAnalogico2);
    });
        app.get('/sensores/analogico3', (_, response) => {
        return response.json(valoresSensorAnalogico3);
    });

     app.get('/sensores/analogico4', (_, response) => {
        return response.json(valoresSensorAnalogico4);
    });

     app.get('/sensores/analogico5', (_, response) => {
        return response.json(valoresSensorAnalogico5);
    });

     app.get('/sensores/analogico6', (_, response) => {
        return response.json(valoresSensorAnalogico6);
    });

     app.get('/sensores/analogico7', (_, response) => {
        return response.json(valoresSensorAnalogico7);
    });

     app.get('/sensores/analogico8', (_, response) => {
        return response.json(valoresSensorAnalogico8);
    });
}

// função principal assíncrona para iniciar a comunicação serial e o servidor web
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

    // inicia a comunicação serial
    await serial(
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