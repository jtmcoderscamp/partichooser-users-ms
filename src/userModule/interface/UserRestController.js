import express from "express";
import asyncHandler from "express-async-handler";
import Joi from "joi";
import UserServicePort from "../core/_UserServicePort";
import User from "../core/domain/User";
import ValidationError from "../core/errors/ValidationError";
import AuthenticationFailedError from "../core/errors/AuthenticationFailedError";
import newUserSchema from "./requestValidation/newUserSchema";
import extractAuthDetails from "./middlewares/extractAuthDetails";
import authenticationDataSchema from "./requestValidation/authenticationDataSchema";
import jwt from "jsonwebtoken";
import _ from "lodash";
import passwordChangeRequestSchema from "./requestValidation/passwordChangeRequestSchema";

export default class UserRestController{

    constructor(userServiceImplementation = new UserServicePort()){
        this._userService = userServiceImplementation;
        this._router = express.Router();

        //use the built-in json middleware to parse json requests
        this.router.use('/', express.json());

        //use the custom middleware to extract authentication data from token
        this.router.use('/', extractAuthDetails);

        /**
         * Authenticate user
         */
        this.router.post('/auth', asyncHandler(async (req, res) => {
            const {error} = Joi.validate(req.body, authenticationDataSchema);
            if (error) throw new ValidationError(error.details[0].message);

            let user = await this._userService.logIn(req.body.email, req.body.password);
            if (!user) throw new AuthenticationFailedError("Invalid email or password.");

            const token = jwt.sign({ uuid: user.uuid, roles: user.roles }, process.env.JWT_SECRET);

            res.status(200).header('x-auth-token', token).send(_.pick(user,['uuid','name','surname','email','roles']));
        }));

        /**
         * Change password
         */
        this.router.put('/passwords', asyncHandler(async (req, res) => {
            const { error } = Joi.validate(req.body, passwordChangeRequestSchema);
            if (error) throw new ValidationError(error.details[0].message);

            if (req.body.password===req.body.newPassword){
                throw new ValidationError("New password and old password cannot be the same");
            }

            await this._userService.changePassword(req.body.email, req.body.password, req.body.newPassword);
            
            res.sendStatus(200);
        }));

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
