/**
 * Archive: server.js
 * Description:
 * Author: Responsável por levantar o serviço do node para que seja possivel executar a api através do Express.
 */

//  confifurando o Setup da aplicação.
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const user = require('./app/models/user')

// URI do mlab:
mongoose.connect('mongodb://<samuellemes>:<abc123>@ds036079.mlab.com:36079/user', {
    useMongoClient: true
})

// Local: MongoDB
// mongoose.connect('mongodb://localhost:27017/user', {
//     useMongoClient: true
// })

// Configurando a variavel app para usar o 'bodyParser()'. E retornar os dados de um json e via post:
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// Definindo a porta onde será executada a api:
const port = process.env.port || 8000


// Rotas da API
// =========================================================================================================

// Criando uma instância das rotas via Express:
const router = express.Router()

router.use(function(req, res, next) {
    console.log('Algo está acontecendo aqui...')
    next()
})

// Route test. 
router.get('/', function(req, res) {
    res.json({ message: 'Beleza! Bem vindo(a) a nossa Loja!' })
})


// API's:
// ============================================================================================================

// definiddo um padrão das rotas prefixadas '/api':
app.use('/api', router)

// Iniciando a aplicação (Server)
app.listen(port)
console.log("Iniciando a app na porta " + port)