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
    // Dentro del método que invoca POST 
    // Usaremos la propiedad error del objeto que nos entrega schemaRegister.validate()
    // const { error } = schemaRegister.validate(req.body)

    // // Si este error existe, aqui se termina la ejecución devolviedonos el error
    // if (error) {
    //     return res.status(400).json(
    //         { error: error.details[0].message }
    //     )
    // }

    // validando que el email nos e encuentre regisrrado en la base de datos
    const isTelefonoExist = await User.findOne({ num_Telefono: req.body.num_Telefono });
    if (isTelefonoExist) {
        return res.status(400).json(
            {error: 'El numero telefonico ya esta registrado'}
        )
    }

    //encriptacion de la contrasseña con un numero aleatorio de la libreria bycript
    const salt = await bcrypt.genSalt(10)
    const password = await bcrypt.hash(req.body.password, salt)

    const user = new User({
        name: req.body.name,
        apellido_P: req.body.apellido_P,
        apellido_M: req.body.apellido_M,
        f_Nacimiento: req.body.f_Nacimiento,
        num_Telefono: req.body.num_Telefono,
        password: password
    });

    // Creamos el objeto usando el model que creaos anteriormente
    // const user = new User({
    //     name: req.body.name,
    //     email: req.body.email,
    //     password: req.body.password
    // });
    // Usamos .save() del model para almacenar los datos en Mongo
    try {
        const savedUser = await user.save()
        res.json({
            message: 'usuario registrado',
            error: null,
            data: savedUser
        })
    } catch (error) {
        res.status(400).json({error})
    }
})


// LOGIN
router.post('/login', async (req, res) => {
    
    // Validaciond e existencia
    const user = await User.findOne({num_Telefono: req.body.num_Telefono})
    if(!user) return res.status(400).json({error: 'Usuario no encontrado'})

    // Validacion de password en la base de datos
    const validPassword = await bcrypt.compare(req.body.password, user.password)
    if(!validPassword){
        return res.status(400).json({error: 'Constraseña invalida'})
    }else{
      // Creando token
        const token = jwt.sign({
            num_Telefono: user.num_Telefono,
            id: user._id
        }, process.env.TOKEN_SECRET) 
        
        res.send({
            error: null,
            data: { token },
            message: 'Bienvenido'
        })

        var accountSid = 'AC43a41423f1bdec4ad27bbd8e254407f2'; // Tu Account SID obtenido de www.twilio.com/console
        var authToken = '7077ccc41aa2784f647ffe7273ca3b61'; // Tu Auth Token
        var twilio = require('twilio');
        var client = new twilio(accountSid, authToken);

        client.messages.create({
            body: 'Hello from Node',
            to: user.num_Telefono,  // Número al que se enviará el SMS
            from: '9192389847' // Número comprado de Twilio.com
        })
        .then((message) => console.log(message.sid));
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