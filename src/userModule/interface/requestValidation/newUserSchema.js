import Joi from "joi";

const newUserSchema = {
    name: Joi.string().min(1).required(),
    surname: Joi.string().min(1).required(),
    email: Joi.string().required().email()
}

export default newUserSchema;