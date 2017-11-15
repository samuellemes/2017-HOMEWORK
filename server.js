/**
 * Archive: server.js
 * Description:
 * Author: Responsável por levantar o serviço do node para que seja possivel executar a api através do Express.
 */

//  confifurando o Setup da aplicação.
var express = require('express')
var app = express()
var bodyParser = require('body-parser')

// Configurando a variavel app para usar o 'bodyParser()'. E retornar os dados de um json e via post:
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// Definindo a porta onde será executada a api:
var port = process.env.port || 8000;

// Criando uma instância das rotas via Express:
var router = express.Router()

// Route test. 
router.get('/', function(req, res) {
    res.json({ message: 'Beleza! Bem vindo(a) a nossa Loja.' })
});

// definiddo um padrão das rotas prefixadas '/api':
app.use('/api', router)

// Iniciando a aplicação (Server)
app.listen(port)
console.log("Iniciando a app na porta " + port)