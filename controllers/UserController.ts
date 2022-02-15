const router = require('express').Router();
import { UserModel } from '../models/UserEspera';
import Joi from '@hapi/joi';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
import client from 'twilio';


const saveUser = async(req, res)=>{ 

    // validando que el email nos e encuentre regisrrado en la base de datos
    const isTelefonoExist = await UserModel.findOne({ phoneNumber: req.body.phoneNumber });
    if (isTelefonoExist) {
        return res.status(400).json({
                error: 'El numero telefonico ya esta registrado',
                status: 208
            });
    }

    //instancia del modelo en espera
    const user = new UserModel({
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

export { saveUser };