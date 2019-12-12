import mongoose from "mongoose"
import UserEntity from "./userModel"

export default class UserRepository{


  async  _getUsers() {
    return await UserEntity
    .find()
    .sort(surname)
  }
  
   async  getAllUsers() {
    const users = await _getUsers();
    console.log(users);
  }

  async  _getOneUser(Id_or_Surname_or_Email) {
    return await UserEntity
    .find()
    .or([{Id:Id_or_Surname_or_Email},{email:Id_or_Surname_or_Email},{surname:Id_or_Surname_or_Email}])
    .sort(surname)
  }
  
   async  getOneUser() {
    const users = await _getOneUser();
    console.log(users);
  }
  
  
  
   async  addUser(id,nameUser,surnameUser,emailUser,rolesUser){
    const user = new UserEntity({
      id:id,
      name: nameUser,
      surname: surnameUser,
      email:emailUser,
      roles: rolesUser
    });
  
    const result= await user.save();
    console.log(result);
  }
  

}












