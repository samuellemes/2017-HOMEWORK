
/**
 * Archive: server.js
 * Description: Responsável por levantar o serviço do node para que seja possivel executar a api através do Express.
 * Author: Samuel Lemes
 */

// Configuring application setup (called packages):
const express = require('express')
const app = express()
const path = require('path')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const User = require('./app/models/user')
// Defining the port where the api will be executed:
const PORT = process.env.port || 8000

// Configuration mongoose promise:
mongoose.Promise = global.Promise

// Connection: URI of 'mlab' (data source in cloud MongoDB):
mongoose.connect('mongodb://samuellemes:abc123@ds036079.mlab.com:36079/user', {
    useMongoClient: true
})

// Connection: URI data source local MongoDB:
// mongoose.connect('mongodb://localhost:27017/user', {
//     useMongoClient: true
// })

// Setting the 'app' variable to use 'bodyParser()' and returning the data (POST):
app.use(bodyParser.urlencoded({ extended: true }))
// app.use(bodyParser.json())
app.use(express.static('./public'))

// template
app.set('views', path.join(__dirname, './public'))
app.set('view engine', 'ejs')

// Rotas da API // ========================================================================================================

// Creating an instance of the routes (express):
const router = express.Router()

// router.use(function(req, res, next) {
//     console.log('Something is happening here...')
//     next()
// })

// Route test. 
router.get('/', function(req, res, next) {
    res.json({ message: 'Hello, welcome here!' })
    next()
})


// API's // ===============================================================================================================

// GET ALL and POST
router.route('/users')

    /* 2) Method: Select all users (access in: GET http://localhost:8000/api/users) */
    .get(function(req, res) {
        User.find(function(error, user) {
           res.render('view-user', {user})
        //     if(error) {
        //         res.send('User id not found.....: ' + error)
        //     }
        //     res.json(user)
        })
    })

    /* Routes '/users/:user_id' (useful for: GET, PUT and DELETE: id) */
    router.route('/users/:user_id')

    /* 3) Method: Select by id: (access in: GET http://localhost:8000/api/users/:user_id)*/
    .get(function(req, res) {
        
        // Function to select user by id:
        User.findById(req.params.user_id, function(error, user) {
            if(error) {
                return res.send('User id not found.....: ' + error)
            }
            res.json(user)
        })
    })

    /* 4) Method: Update by id: (access in: PUT http://localhost:8000/api/users/:user_id) */
    .put(function(req, res) {

        // Function to select user by id:
        User.findById(req.params.user_id, function(error, user) {
            if(error) {
                return res.send('User id not found.....: ' + error)
            }

            // Rescuing user data:
            user.name = req.body.name
            user.user = req.body.user
            user.password = req.body.password
            user.email = req.body.email

            // Saving user properties:
            user.save(function(error) {
                if(error) {
                    res.send('User update error....' + error)
                }
                res.json({ message: 'User successfully registered!' })
            })
        })
    })

    /* 5) Method: Delete by id (access in: DELETE http://localhost:8000/users/:user_id) */
    .delete(function(req, res) {
        User.remove({
          _id: req.params.user_id
        }, function(error) {
            if(error) {
                res.send('User id not found...')
            }
            res.redirect('/api/users')
        })
    })


router.route('/add')

    .get(function(req, res) {
        const user = new User()
        res.render('add-user', { user, action: '/api/add'})
    })

     /* 1) Method: Create user (acess in: POST http://localhost:8000/api/add) */
    .post(function(req, res) {
        const user = new User()

        // Set filds users (request)
        user.name = req.body.name
        user.user = req.body.user
        user.password = req.body.password
        user.email = req.body.email

        user.save(function(error) {
            if(error) {
                res.send('Error trying to save user....' + error)
            }
            // res.json({ message: 'User successfully registered!' })
            res.redirect('/api/users')
        })
    })


router.route('/delete/:user_id')

    /* 5) Method: Delete by id (access in: DELETE http://localhost:8000/users/:user_id) */
    .get(function(req, res) {
        User.remove({
          _id: req.params.user_id
        }, function(error) {
            if(error) {
                res.send('User id not found...')
            }
            res.redirect('/api/users')
        })
    })

router.route('/edit/:user_id')
    /* 4) Method: Update by id: (access in: PUT http://localhost:8000/api/users/:user_id) */
    .get(function(req, res) {
        
                // Function to select user by id:
                User.findById(req.params.user_id, function(error, user) {
                    if(error) {
                        return res.send('User id not found.....: ' + error)
                    }
                    
                    // Rescuing user data:
                    res.render('add-user', { user, action: '/api/edit' })
                    
                })
    })

     /* 1) Method: Create user (acess in: POST http://localhost:8000/api/add) */
     .post(function(req, res) {
        const user = new User()

        // Set filds users (request)
        user.name = req.body.name
        user.user = req.body.user
        user.password = req.body.password
        user.email = req.body.email

        user.save(function(error) {
            if(error) {
                res.send('Error trying to save user....' + error)
            }
            // res.json({ message: 'User successfully registered!' })
            res.redirect('/api/users')
        })
    })

// Defining a pattern of the prefixed routes '/api':
app.use('/api', router)

// Starting the application (Server):
app.listen(PORT)
console.log("Starting app on port " + PORT)