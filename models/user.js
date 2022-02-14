const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        require: true
    },
    middleName: {
        type: String,
        require: true
    },
    lastName: {
        type: String,
        require: true
    },
    phoneNumber : {
        type: Number,
        require: true
    },
    birthday: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
    }
})

const AuditFields = mongoose.Schema ({
    createdAt: Date,
    updatedAt: Date,
    deletedAt: Date
})

const Clients = mongoose.Schema ({
    firstName: String,
    middleName: String,
    lastName: String,
    phoneNumber: String,
    birthday: Date,
    externalId?: Number,
})

const Users = mongoose.Schema ({
    username: string, // es el número de telefono del registro 
    password: string,
    email?: string,
    clientId?: string,
})

const RegisterRequests = mongoose.Schema ({
    tokenTotp: string,
})

module.exports = mongoose.model('User', userSchema)