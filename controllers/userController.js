'use strict'
const Joi = require('@hapi/joi');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/user')



function saveUser(req, res){

    // validando que el telefono no se encuentre registrado en la base de datos
    User.findOne({ num_Telefono: req.body.num_Telefono })
    .then(data=>{
        if(data){
            return res.status(400).json(
                {error: 'El numero telefonico ya esta registrado'}
            )
        }else{
            //encriptacion de la contrasseña con un numero aleatorio de la libreria bycript
            const salt = bcrypt.genSalt(10)
            const password = bcrypt.hash(req.body.password, salt)

            const user = new User({
                name: req.body.name,
                apellido_P: req.body.apellido_P,
                apellido_M: req.body.apellido_M,
                f_Nacimiento: req.body.f_Nacimiento,
                num_Telefono: req.body.num_Telefono,
                password: password
            });
            try {
                const savedUser = user.save()
                res.json({
                    message: 'usuario registrado',
                    error: null,
                    data: savedUser
                })
            } catch (error) {
                res.status(400).json({error})
            }
        }
    })
}

module.exports = {
    saveUser,
}