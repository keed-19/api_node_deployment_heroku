'use strict'
const router = require('express').Router();
const User = require('../models/user')
const Joi = require('@hapi/joi');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const UserCtrl=require('../controllers/userController')

// ruta de registro
router.post('/usersreg', UserCtrl.saveUser)



//register
router.post('/register', async (req, res) => {

    // validando que el email nos e encuentre regisrrado en la base de datos
    const isTelefonoExist = await User.findOne({ phoneNumber: req.body.phoneNumber });
    if (isTelefonoExist) {
        return res.status(400).json({
                error: 'El numero telefonico ya esta registrado',
                status: 208
            });
    }

    //instancia del modelo en espera
    const user = new User({
        firstName: req.body.firstName,
        middleName: req.body.middleName,
        lastName: req.body.lastName,
        birthday: req.body.birthday,
        phoneNumber: req.body.phoneNumber,
        password: req.body.password,
        email: req.body.email
    });

    try {

        //almacenando los datos y devolviendo respuesta
        const savedUser = await user.save();

        res.json({
            message: 'usuario registrado',
            status: 200,
            data: savedUser
        });
    } catch (error) {
        res.status(400).json({
            error,
            status: 400
        });
    }
})


// LOGIN
router.post('/login', async (req, res) => {

    const pass = req.body.password;
    const numuser = req.body.phoneNumber;
    
    // Validaciond e existencia
    const user = await User.findOne({num_Telefono: numuser})
    if(!user) {
        return res.status(400).json({
        error: 'Usuario no encontrado',
        status: 204
        })
    }else if(user.password === pass){
        // Validacion de password en la base de datos
    // const validPassword = await bcrypt.compare(req.body.password, user.password)
        
        // Creando token
        const token = jwt.sign({
            user
        }, process.env.TOKEN_SECRET) 
        
        res.send({
            status:200,
            data: { token },
            message: 'Bienvenido'
        })
        
    }else{
      
        return res.status(400).json({
            error: 'Constraseña invalida',
            status: 203
        })
    } 

    

    // res.json({
    //     error: null,
    //     data: 'bienvenido'
    // })
})



router.get('/users', async(req, res)=>{

    // res.json(200,'esto si funciona')
    User.find({}, (err, users) => {
        if(err) return res.status(500).send({ message: `Error al hacer la petición: ${err}`})
        if(!users) return res.status(404).send({ message: `Aun no existen usuarios en la base de datos`})

        res.json(200, {users})
    })
})

module.exports = router