import express from "express";
import asyncHandler from "express-async-handler";
import Joi from "joi";
import UserServicePort from "../core/_USerServicePort";
import User from "../core/domain/User";
import ValidationError from "../core/errors/ValidationError";
import newUserSchema from "./requestValidation/newUserSchema";

export default class UserRestController{

    constructor(userServiceImplementation = new UserServicePort()){
        this._userService = userServiceImplementation;
        this._router = express.Router();

        //use the built-in json middleware to parse json requests
        this.router.use('/', express.json());

        /**
         * Get user specified by UUID
         */
        this.router.get('/:userId', asyncHandler(async (req, res, next) => {
            const responseBody = await this._userService.findUserByUuid(req.params.userId);
            res.status(200).send(responseBody);
        }));

        /**
         * Get all users
         */
        this.router.get('/', asyncHandler(async (req, res, next) => {
            const responseBody = await this._userService.findAllUsers();
            res.status(200).send(responseBody);
        }));

        /**
         * Adds a new user
         */
        this.router.post('/', asyncHandler(async (req, res, next) => {
            const {error} = Joi.validate(req.body, newUserSchema);
            if (error) throw new ValidationError(error.details[0].message);

            const newUser = User.fromObject(req.body);
            const responseBody = await this._userService.addNewUser(newUser);
            res.status(200).send(responseBody);
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