/*
• create a route (and supporting functions in the core) for password creation
○ only save hashed passwords to the DB

Klasa z metodą zapisująca hasła
Na razie nie mamy jeszcze autentykacji ani autoryzacji czegokolwiek,
więc zasadniczo dostajesz coś, co identyfikuje użytkownika oraz nowe hasło
i trzeba to zapisać do repo w tym użytkowniku. Wstępnie zakładałem, że to byłoby UserRepository.
Docelowo będzie pewnie więcej, niż jedna wersja (ta druga oparta
o link działający przez ograniczony czas :wink: )
ale podstawowa prawdopodobnie byłaby taka, że dostajesz email
i stare hasło (dane logowania) oraz nowe hasło do ustawienia.
Jak już będziesz miał logowanie, to będziesz mógł od razu z tego skorzystać.
Ale na razie chodzi głównie o to, żeby mieć te funkcje do zahashowania hasła.
A sprawami związanymi  z userami zajmują się - poza Tobą 
- Justyna (robi tworzenie użytkowników bez haseł -  :wink: ) oraz Magda (zajmuje się repozytorium).


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
const _ =require('lodash');
const moongose = require('mongoose');
//const User = require ('...UserRepository ')

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