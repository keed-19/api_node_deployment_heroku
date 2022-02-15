'use strict'
const router = require('express').Router();
const User = require('../models/user')
const Joi = require('@hapi/joi');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const UserCtrl=require('../controllers/userController')
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);



const saveUser = async(req, res)=>{ 

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
}

module.exports = {
    saveUser,
}