import mongoose from "mongoose"
import UserEntity from "./userModel"

export default class UserRepository{

  async  _xFindUsers(Id_or_Surname_or_Email) {
    return await UserEntity
    .find()
    .or([{uuid:Id_or_Surname_or_Email},{surname:Id_or_Surname_or_Email},{email:Id_or_Surname_or_Email}])
    .sort('surname')
  }
  
  async  showUsers(Id_or_Surname_or_Email) {
    const users = await this._xFindUsers(Id_or_Surname_or_Email);
    console.log(users);
  }

  async  _xFindAllUsers() {
    return await UserEntity
    .find()
    .sort('surname')
  }
  
  async  showAllUsers() {
    const users = await this._xFindAllUsers();
    console.log(users);
  }
    
  async  addUser(id,nameUser,surnameUser,emailUser,rolesUser){
    const user = new UserEntity({
      uuid:id,
      name: nameUser,
      surname: surnameUser,
      email:emailUser,
      roles: rolesUser
    });
  
    const result= await user.save();
    console.log(result);
  }
  
}












