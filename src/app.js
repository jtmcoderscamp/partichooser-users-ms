import express from "express";
import dotenv from "dotenv";
import TestRestController from "./testModule/interface/TestRestController";
import MockTestRepository from "./testModule/infrastructure/MockTestRepository";
import TestService from "./testModule/core/TestService";
import auth from "../src/userModule/interface/auth";
import changePas from "../src/userModule/interface/changePas";
import newPas from "../src/userModule/interface/newPas";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;


//initialization of the example testModule
const testRepositoryImplementation = new MockTestRepository();
const testServiceImplementation = new TestService(testRepositoryImplementation);
const testApi = new TestRestController(testServiceImplementation);

//wiring up the routes
app.use("/tests",testApi.router);
app.use('/auth', auth);
app.use('/changePas', changePas);
app.use('/newPas', newPas);

app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}...`);
});