const Joi = require('joi');
const express = require('express');
const router = express.Router();
const _ =require('lodash');
import passwordService from "../core/PasswordService";


router.post('/', async (req, res) => 
{
    const { error } = validateData(req.body);
    if (error) return res.status(400).send(error.details[0].message)
    if (req.body.password===req.body.newPassword)
    {
        return res.status(400).send("New password and old password cannot be the same");
    }
    let service = new passwordService;
    let user = await service.changePassword(req.body.email, req.body.password, req.body.newPassword);
    if (!user) return res.status(400).send("Email or old password is not correct");
    else return res.sendStatus(200);
    // res.sendStatus(200) // equivalent to res.status(200).send('OK')

});

function validateData(req)
{
    const schema =
    {
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required(),
        newPassword: Joi.string().min(5).max(255).required()
    }
    return Joi.validate(req, schema);
}

export default router;