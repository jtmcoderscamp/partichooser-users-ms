const jwt = require('jsonwebtoken')
const Joi = require('joi');
const express = require('express');
const router = express.Router();
const _ = require('lodash');
import passwordService from "../core/PasswordService";
require('dotenv').config();


router.post('/', async (req, res) =>
{
    const { error } = validateData(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let service = new passwordService;
    let user = await service.logIn(req.body.email, req.body.password);
    if (!user) return res.status(400).send('Invalid email or password.');
    else 
    {
       const token = jwt.sign({uuid: user.uuid }, process.env.JWT_SECRET); 
       // czy to tak zadziała? czy znajdzie mi ten process/env.JWT-SECRET?
       //nie powinna ta byc metoda w User.js? jak na kursie u Mosha.
       res.header('x-auth-token', token).send(_pick(user,['name','surname','email','roles']));
    }
});

function validateData(req)
{
    const schema =
    {
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
    }

    return Joi.validate(req, schema)
}

export default router;