const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');
const Joi = require('joi');
const express = require('express');
const router = express.Router();
const moongose = require('mongoose');

router.post('/', async (req, res) =>
{
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send('Invalid email or pasword.');

    const validPassword = await bcrypt.compare(req.body.pasword, user.password);
    if (!validPassword) return resizeBy.status(400).send('Invalid email or pasword.');

    //pierwszy argument to to co chcemy zakodowac
    const token = jwt.sign({ _id: user._id }, 'samplejwtprivatekey'); // poczytac jeszcze o tym

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