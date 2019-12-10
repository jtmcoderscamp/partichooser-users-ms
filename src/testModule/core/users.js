const db = process.env.db;
const mongoose = require('mongoose');
mongoose.connect(db);

const usersSchema = new mongoose.Schema({
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
  city:  { 
    type:String,
    required:true,
    enum: ['Wrocław', 'Poznań','Gdańsk','Warszawa','Zabrze','Szczecin','Kraków'] 
  },
  email: {
    type:String,
    required:true,
    minlength:3,
  }, 
  points: Number,
  preference:String,
  description:String,
  reasonsForApplying:String,
  strengths:String,
  plansForTheFuture:String
});



const Users = mongoose.model('Users', usersSchema);



async function run() {
  const courses = await getCourses();
  console.log(courses);
}

run();
