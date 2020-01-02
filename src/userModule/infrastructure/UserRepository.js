import UserRepositoryPort from "../core/_UserRepositoryPort";
import mongoose from "mongoose"
import UserEntity from "./userModel"
import User from "../core/domain/User";
import UserDuplicationError from "../core/errors/UserDuplicationError";

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
      
    async  selectAll() {
        const users = await this._xFindAllUsers();
        return users.map( (user) => User.fromObject(user));
    }

    /**
     * Adds new user to the database
     * @param {User} user 
     */
    async  addNewUser(user){
        const entity = new UserEntity({
          uuid: user.uuid,
          name: user.name,
          surname: user.surname,
          email: user.email,
          roles: [...user.roles],
          password: user.password
        });
        try{
            const result= await entity.save();
            return User.fromObject(result);
        }catch(error){
            if (error.code==11000){
                console.log(error);
                throw new UserDuplicationError("Duplicate User data", error);
            }
            else throw error;
        }
    }


    async _selectByUuid(uuid) {
        return await UserEntity
        .findOne({uuid:uuid})
    }
         
    async  selectByUuid(uuid) {
        const user = await this._selectByUuid(uuid);
        return User.fromObject(user);
    }

    async _selectByEmail(email) {
        return await UserEntity
        .findOne({email:email})
    }

    async selectByEmail(email) {
        const user = await this._selectByEmail(email);
        return User.fromObject(user);
    }

    async updatePassword(uuid, password) {
        const user = await UserEntity.findOneAndUpdate({uuid:uuid},{$set:{password: password}});
        return User.fromObject(user);
    }


    
}