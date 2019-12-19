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

    let user = await service.setPassword(req.body.uuid, req.body.newPassword);
    if (!user) return res.status(400).send("User not find");

    res.send(_.pick(user, ['_id', 'name', 'email']));
    // co zwracamy?

});

function validate(req)
{
    const schema =
    {
        uuid: Joi.string().min(5).max(255).required(),
        newPassword: Joi.string().min(5).max(255).required()
    }

}

export default router;