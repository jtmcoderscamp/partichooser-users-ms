/*
• create a route (and supporting functions in the core) for password creation
○ only save hashed passwords to the DB

Klasa z metodą zapisująca hasła

• create a route (and supporting functions in the core) for logging in
○ send back a JWT (the fields within will be adjusted later based on needs - for now anything retrieved from UserRepository will do)
○ the JWT should be created at application interface level (the service's method should return the object containing the log-in data, managing the session through JWT is interface-level implementation detail)

• add the necessary environment variables (like JWT private key) to .env; add their names (but not final values!) to .env.example

For the time being, use a mock repository with necessary functions that will later be implemented in UserRepository

*/
const bcrypt = require('bcryptjs');
const Joi = require('joi');
const express = require('express');
const router = express.Router();
const moongose = require('mongoose');

router.post('/', async (req, res) => 
{
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message)

    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send('User already registered.');

    user = new User(_.pick(req.body, ['name', 'email', 'password']));

    const salt = await bcrypt.genSalt(10);
    user.password = bcrypt.hash(user.password, salt);
    await user.save();

    res.send(_.pick(user, ['_id', 'name', 'email']));

});


