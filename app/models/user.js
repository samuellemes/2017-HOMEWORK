/**
 * Arquivo: user.js
 * Author: Samuel Barreiro Lemes
 * Description: Arquivo responsável por tratar o modelo da classe 'user'
 */

const mongoose = require('mongoose')
const Schema = mongoose.Schema

/**
 * User:
 * 
 * -> Id: Integer
 * -> Name: String
 * -> User: String
 * -> Password: password
 * -> Email: email
 *
 */

const UserSchema = new Schema({
    name: String,
    user: String,
    password: String,
    email: String
})

module.exports = mongoose.model('User', UserSchema)