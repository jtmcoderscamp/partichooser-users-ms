import mongoose from "mongoose"
import User from "./user-model"
// const express = require('express');
// const router = express.Router();

async function _getUsers() {
  return await User
  .find()
  .sort(surname)
}

export async function getAllUsers() {
  const users = await _getUsers();
  console.log(users);
}

async function _getOneUser(Id_or_Surname_or_Email) {
  return await User
  .find()
  .or([{Id:Id_or_Surname_or_Email},{email:Id_or_Surname_or_Email},{surname:Id_or_Surname_or_Email}])
  .sort(surname)
}

export async function getOneUser() {
  const users = await _getOneUser();
  console.log(users);
}



export async function addUser(id,nameUser,surnameUser,emailUser,rolesUser,){
  const user = new User({
    uuid:id,
    name: nameUser,
    surname: surnameUser,
    email:emailUser,
    roles: rolesUser
  });

  const result= await user.save();
  console.log(result);
}


///////////////////////--------------------    II wersja

// router.get('/', async (req, res) => {
//   const users = await User.find().sort('surname');
//   res.send(users);
// });

// router.get('/:id', async (req, res) => {
//   const user = await User.findById(req.params.id);

//   if (!user) return res.status(404).send('The Mentor with the given ID was not found.');

//   res.send(user);
// });

// router.post('/', async (req, res) => {
//   const { error } = validate(req.body); 
//   if (error) return res.status(400).send(error.details[0].message);

//     let user = new User({ 
//     id:req.body.id,
//     name: req.body.name,
//     surname:req.body.surname,
//     email:req.body.email,
//     roles:req.body.roles,
//   });
//   user = await user.save();
  
//   res.send(user);
// });

// router.delete('/:id', async (req, res) => {
//   const user = await User.findByIdAndRemove(req.params.id);

//   if (!user) return res.status(404).send('The mentor with the given ID was not found.');

//   res.send(user);
// });



// export default router; 







