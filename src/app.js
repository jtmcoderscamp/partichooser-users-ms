import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose"
import TestRestController from "./testModule/interface/TestRestController";
import MockTestRepository from "./testModule/infrastructure/MockTestRepository";
import TestService from "./testModule/core/TestService";
import {  getAllUsers,  getOneUser,  addUser } from "./testModule/infrastructure/User";
import User from "./testModule/infrastructure/user-model"

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const db =  process.env.db;

//initialization of the example testModule
const testRepositoryImplementation = new MockTestRepository();
const testServiceImplementation = new TestService(testRepositoryImplementation);
const testApi = new TestRestController(testServiceImplementation);


//wiring up the routes
app.use("/tests",testApi.router);

app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}...`);
});

//connect db
mongoose.connect(db)
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...'));

  addUser('18','Jane','Smith','23mail@gmail.com',['mentor']);