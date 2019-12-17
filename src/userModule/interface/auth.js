const jwt = require('jsonwebtoken')
const Joi = require('joi');
const express = require('express');
const router = express.Router();
const _= require ('lodash');
import passwordService from ".core/domain/PasswordService";



router.post('/', async (req, res) =>
{
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await passwordService.logIn(req.body.email, req.body.password);
    if (!user) return res.status(400).send('Invalid email or pasword.');

    //pierwszy argument to to co chcemy zakodowac
    const token = jwt.sign({ _id: user._id }, 'JWT_SECRET'); // jak zwrocic ten JWT secret 
    //- mosh zrobil to przez biblioteke config do zrobienia

    res.send(token);

});

function validate(req)
{
    const schema =
    {
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
    }

}

module.exports = router;