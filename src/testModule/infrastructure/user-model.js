import mongoose from "mongoose";

   const userSchema = new mongoose.Schema({
        id:{
          type:String,
          unique:true,
          required:true
        },
        name:{
          type:String,
          required:true,
          minlength:3,
        }, 
        surname: {
          type:String,
          required:true,
          minlength:3,
        }, 
        email:{
          type:String,
          unique:true,
          minlength:4,
        },
        roles:  { 
          type:[String],
          required:true,
          enum: ['admin', 'mentor'] 
        }
    });
  
    export default User= mongoose.model('User', userSchema);
   
