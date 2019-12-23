const Joi = require('joi');
const express = require('express');
const router = express.Router();
const _ =require('lodash');
import passwordService from "../core/PasswordService";


router.post('/', async (req, res) => 
{
    
    let service = new passwordService;
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message)
    if (req.body.password==req.body.newPassword) return res.status(400).send("New password and old password cannot be the same");

    let user = service.changePassword(req.body.email, req.body.password, req.body.newPassword);
    if (!user) return res.status(400).send("Email or old password is not correct");

    res.send(_.pick(user, ['_id', 'name', 'email']));
    //jaki status tutaj zwrocic?

});

function validate(req)
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