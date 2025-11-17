create database cryotech;

use cryotech;

create table empresa (
idEmpresa int primary key auto_increment,
razaoSocial varchar(45),
cnpj varchar(45),
cep char(8),
cidade varchar(45),
bairro varchar(45),
numero varchar(45)
);

create table funcionario (
idFuncionario int,
fkEmpresa int,
nome varchar(45),
cargo varchar(45),
cpf varchar(45),
dtNasc date,
email varchar(45),
telContato varchar(45),
senha varchar(45),
primary key (idFuncionario, fkEmpresa),
foreign key (fkEmpresa)
	references empresa(idEmpresa)
);

create table servico (
idServico int primary key,
tipo varchar(45),
valor decimal (6,2),
fkFuncionario int,
	foreign key (fkFuncionario)
		references funcionario(idFuncionario)
);

create table local (
idLocal int primary key,
localServico varchar(45),
fkServico int,
	foreign key (fkServico)
		references servico(idServico)
);

create table sensor (
idSensor int primary key auto_increment,
status varchar(45),
numSerie varchar(45),
fkLocal int,
	foreign key (fkLocal)
		references local(idLocal)
);

create table registro (
idRegistro int,
fkSensor int,
dtRegistro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
medicao decimal(4,2),
primary key (idRegistro, fkSensor),
	foreign key (fkSensor)
		references sensor(idSensor)
);

insert into empresa values 
(default, 'Swift', '12345678000199', '04567890', 'São Paulo', 'Vila Olímpia', '500'),
(default, 'Friboi', '98765432000155', '22031010', 'São Paulo', 'Consolação', '120'),
(default, 'Sadia', '11122233000177', '70040900', 'São Paulo', 'Vila Maria', '300');

insert into funcionario value
(1, 1, 'Julia', 'RH', '12345678901', '2000-04-15', 'julia@swift.com', '(11)99999-1111', 'sptech'),
(2, 2, 'Fernando', 'Técnico de Instalação', '98765432100', '1988-07-22', 'fernando@email.com', '(11)98888-2222', 'brandao123'),
(3, 3, 'Jotape', 'Analista Ambiental', '45678912300', '1995-02-10', 'jp@sadia.com', '(11)97777-3333', 'algoritmos');

insert into servico values
(1, 'Câmara Fria', 1400.00, 2),
(2, 'Frigorífico', 1800.00, 1),
(3, 'Transporte', 2400.00, 3);

insert into local values
(1, 'Câmara Fria Swift', 1),
(2, 'Frigorífico Friboi', 2),
(3, 'Caminhão Sadia', 3);

insert into sensor values
(default, 'Ativo', '1', 1),
(default, 'Ativo', '2', 1),
(default, 'Ativo', '3', 2),
(default, 'Inativo', '4', 3);

insert into registro values
(1, 1, '2025-10-31 08:00:00', '-13.5°C'),
(2, 1, '2025-10-31 12:00:00', '-25.2°C'),
(3, 2, '2025-10-31 09:30:00', '-18ºC'),
(4, 3, '2025-10-31 10:15:00', '-21.8°C'),
(5, 4, '2025-10-31 07:45:00', 'Desligado');

select 
e.razaoSocial as Empresa,
f.nome as Funcionário,
sv.tipo as Serviço,
l.localServico as 'Local do Serviço',
s.status as Sensor,
r.medicao as Registro
from empresa as e join funcionario as f
on f.fkEmpresa = e.idEmpresa join servico as sv
on sv.fkFuncionario = f.idFuncionario join local as l
on l.fkServico = sv.idServico join sensor as s
on s.fkLocal = l.idLocal join registro as r
on r.fkSensor = s.idSensor;

select 
e.razaoSocial as Empresa,
concat(e.cep, ' - ', e.cidade, ', ', e.bairro, ' - ', e.numero) as Endereço,
concat(f.nome, ' - ', f.email) as Funcionário,
concat(sv.tipo, ' - R$', sv.valor) as Serviço,
l.localServico as 'Local do Serviço',
concat('Sensor ', s.numSerie, ' - ', s.status) as Sensor,
case
when r.medicao = 'Desligado'
then 'Sem registro'
else
concat(r.medicao, ' , ', r.dtRegistro)
end Registro
from empresa as e join funcionario as f
on f.fkEmpresa = e.idEmpresa join servico as sv
on sv.fkFuncionario = f.idFuncionario join local as l
on l.fkServico = sv.idServico join sensor as s
on s.fkLocal = l.idLocal join registro as r
on r.fkSensor = s.idSensor;


select funcionario.nome as Funcionario,
empresa.razaoSocial as Empresa
from empresa join funcionario
on funcionario.fkEmpresa = empresa.idEmpresa
where empresa.razaoSocial = 'Swift';

describe registro;

select 
e.razaoSocial as Empresa,
concat(f.nome, ' - ', f.email) as Funcionário,
sv.tipo as Serviço,
l.localServico as Local,
concat('Sensor ', s.numSerie, ' - ', s.status) as Sensor,
concat(r.medicao, ' - ', r.dtRegistro) as Registro
from empresa as e join funcionario as f
on f.fkEmpresa = e.idEmpresa join servico as sv 
on sv.fkFuncionario = f.idFuncionario join local as l
on l.fkServico = sv.idServico join sensor as s
on s.fkLocal = l.idLocal join registro as r
on r.fkSensor = s.idSensor;

select * from funcionario;

select * from servico;

update funcionario set nome = 'Julia'
where nome = ''