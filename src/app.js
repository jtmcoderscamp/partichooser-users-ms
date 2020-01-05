import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import UserRepository from "./userModule/infrastructure/UserRepository";
import UserService from "./userModule/core/UserService";
import UserRestController from "./userModule/interface/UserRestController";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

//connect db
mongoose.connect(process.env.DB_URI)
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...'));

const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userRestController = new UserRestController(userService);

//enable cors FOR EVERYTHING
app.use(cors({
  exposedHeaders: ['x-auth-token'],
}));

//wiring up the routes
app.use(express.json());
app.use('/users/', userRestController.router);

app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}...`);
});




