import UserRepositoryPort from "../core/_UserRepositoryPort";
import mongoose from "mongoose"
import UserEntity from "./userModel"

export default class UserRepository extends UserRepositoryPort{
    constructor(){
        super();

      //  throw new Error("This is just a stub");
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

        
    async  addNewUser(id,nameUser,surnameUser,emailUser,rolesUser, password){
        const user = new UserEntity({
          uuid:id,
          name: nameUser,
          surname: surnameUser,
          email:emailUser,
          roles: rolesUser,
          pass:password
        });
      
        const result= await user.save();
        console.log(result);
    }


    async _selectByUuid(uuid) {
        return await UserEntity
        .find({uuid:uuid})
        .sort('surname')
    }
         
    async  selectByUuid(uuid) {
        const users = await this._selectByUuid(uuid);
        console.log(users);
    }
    async _selectByEmail(email) {
        return await UserEntity
        .find({email:email})
        .sort('surname')
    }
    async selectByEmail(email) {
        const users = await this._selectByEmail(email);
        console.log(users);
    }

    async updatePassword(uuid, password) {
        const user = await UserEntity.findByIdAndUpdate(uuid,{$set:{pass:'password'}})
    }


    
}