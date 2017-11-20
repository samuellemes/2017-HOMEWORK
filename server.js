
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
const User = require('./app/models/user')

// URI do mlab:
mongoose.connect('mongodb://samuellemes:abc123@ds036079.mlab.com:36079/user', {
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

// GET ALL and POST
router.route('/users')

    /* 1) Method: Create user (acess in: POST http://localhost:8000/api/users) */
    .post(function(req, res) {
        const user = new User()

        // Set filds users (request)
        user.name = req.body.name
        user.user = req.body.user
        user.password = req.body.password
        user.email = req.body.email

        user.save(function(error) {
            if(error) {
                res.send('Erro ao tentar salvar user' + error)
            }
            res.json({ message: 'User cadastrado com sucesso!' })
        })
    })

    /* 2) Method: Selecionar users (access in: GET http://localhost:8000/api/users) */
    .get(function(req, res) {
        User.find(function(error, user) {
            if(error) {
                res.send('Erro ao tentar selecinar todos os users...' + error)
            }
            res.json(user)
        })
    })

    /* Rotas '/usser/:user_id' (util tanto para: GET, PUT and DELETE: id) */
    router.route('/users/:user_id')

    /* 3) Method: Select by Id: (access in: GET http://localhost:8000/api/users/:user_id)*/
    .get(function(req, res) {
        
        //Função para selecionar    determinado usuario por ID
        User.findById(req.params.user_id, function(error, user) {
            if(error) {
                res.send('Id do user não encontrado.....: ' + error)
            }
            res.json(user)
        })
    })

// definiddo um padrão das rotas prefixadas '/api':
app.use('/api', router)

// Iniciando a aplicação (Server)
app.listen(port)
console.log("Iniciando a app na porta " + port)