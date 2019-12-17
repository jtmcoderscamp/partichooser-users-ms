const Joi = require('joi');
const express = require('express');
const router = express.Router();
const _ =require('lodash');
import UserRepositoryPort from "./_UserRepositoryPort";


router.post('/', async (req, res) => 
{
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message)

    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send("User not find");

    const salt = await bcrypt.genSalt(10);
    user.password = bcrypt.hash(user.password, salt); //tutaj dostajemy haslo do zahashowania
    // i zmieniamy haslo na nowe
   // user = new User(_.pick(req.body, ['name', 'email', 'password']));
    await user.save();
    res.send(_.pick(user, ['_id', 'name', 'email']));
    //zwracamy uzytkownika z nowym haslem aby zostal zapisany w bazie danych
    //powyzsza odpowiedz moze byc inna

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