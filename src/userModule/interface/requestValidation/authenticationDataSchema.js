import Joi from "joi";

const authenticationDataSchema = {
    email: Joi.string().required().email(),
    password: Joi.string().min(1).required()
}

export default authenticationDataSchema;