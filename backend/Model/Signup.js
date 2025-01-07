const mongoose = require('mongoose')

const user = new mongoose.Schema({

    name: { type: String, require: true },
    email: { type: String, require: true, unique: true },
    phone: { type: Number, require: true },
    password: { type: String, require: true },
    confirmPassword: { type: String, require: true }

}, { Collection: 'AutenticationData' })

const SignupData = mongoose.model("userData", user)
module.exports = SignupData;

