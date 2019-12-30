import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose"
import MongoDB from "mongodb";
import TestRestController from "./testModule/interface/TestRestController";
import MockTestRepository from "./testModule/infrastructure/MockTestRepository";
import TestService from "./testModule/core/TestService";
import UserRepository from "./userModule/infrastructure/UserRepository";
import UserEntity from "./userModule/infrastructure/userModel"
//import auth from "../src/userModule/interface/auth";
//import changePas from "../src/userModule/interface/changePas";
//import newPas from "../src/userModule/interface/newPas";
import UserService from "./userModule/core/UserService";
import UserRestController from "./userModule/interface/userRestController";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const db =  process.env.db;


//initialization of the example testModule
const testRepositoryImplementation = new MockTestRepository();
const testServiceImplementation = new TestService(testRepositoryImplementation);
const testApi = new TestRestController(testServiceImplementation);


//wiring up the routes
app.use(express.json());

app.use("/tests",testApi.router);
/*app.use('/api/auth', auth);
app.use('/api/changePas', changePas);
app.use('/api/newPas', newPas);*/

//connect db
mongoose.connect(process.env.DB_URI)
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...'));

const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userRestController = new UserRestController(userService);


app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}...`);
});


app.use('/users/', userRestController.router);





