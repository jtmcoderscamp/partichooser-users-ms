import express from "express";
import asyncHandler from "express-async-handler";
import TestServicePort from "../core/_TestServicePort";

export default class TestRestController{

    constructor(testServiceImplementation = new TestServicePort()){
        this._testService = testServiceImplementation;
        this._router = express.Router();

        //use the built-in json middleware to parse json requests
        this.router.use('/', express.json());

        /**
         * A simple route that returns the body of a request (if it had any) with an added testResult field
         * Note the use of express-async-handler library for simple error handling syntax with async/await
         */
        this.router.get('/:testId', asyncHandler(async (req, res, next) => {
            const myResponseBody = await this._testService.findTestResult(req.params.testId);
            res.status(200).send(myResponseBody);
        }));

        /**
         * Simple error-handling that always just sends the error message with code 500
         */
        this.router.use('/', (error, req, res, next) => {
            if (error) {
                res.status(500).send(error.message);
            } else {
              next();
            }
        });
    }

    get router() {
        return this._router;
    }
}