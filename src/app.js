import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import UserRepository from "./userModule/infrastructure/UserRepository";
import UserService from "./userModule/core/UserService";
import UserRestController from "./userModule/interface/userRestController";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

//connect db
mongoose.connect(process.env.DB_URI || "mongodb+srv://admin:coderscamp@coderscamp-yucbg.mongodb.net/test?retryWrites=true&w=majority")
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...'));

const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userRestController = new UserRestController(userService);

//wiring up the routes
app.use(express.json());
app.use('/users/', userRestController.router);

app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}...`);
});





