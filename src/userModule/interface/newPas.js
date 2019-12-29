const Joi = require('joi');
const express = require('express');
const router = express.Router();
const _ =require('lodash');
import passwordService from "../core/PasswordService";


router.post('/', async (req, res) => 
{
    let service = new passwordService;
    const { error } = validateData(req.body);
    if (error) return res.status(400).send(error.details[0].message)

    let user = await service.setPassword(req.body.uuid, req.body.newPassword);
    if (!user) return res.status(400).send("User not find");
    else return res.sendStatus(200);
    // res.sendStatus(200) // equivalent to res.status(200).send('OK')
});

function validateData(req)
{
    const schema =
    {
        uuid: Joi.string().min(5).max(255).required(),
        newPassword: Joi.string().min(5).max(255).required()
    }
    return Joi.validate(req, schema);
}

export default router;