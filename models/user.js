const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        require: true,
        min: 3,
        max: 255
    },
    apellido_P: {
        type: String,
        require: true,
        min: 3,
        max: 255
    },
    apellido_M: {
        type: String,
        require: true,
        min: 3,
        max: 255
    },
    f_Nacimiento: {
        type: String,
        require: true,
        min: 3,
        max: 255
    },
    num_Telefono : {
        type: Number,
        require: true,
    },
    password: {
        type: String,
        require: true,
        minlength: 6
    },
})

module.exports = mongoose.model('User', userSchema)