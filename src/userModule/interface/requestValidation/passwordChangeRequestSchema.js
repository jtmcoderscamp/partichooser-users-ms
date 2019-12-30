import Joi from "joi";

const passwordChangeRequestSchema = {
    email: Joi.string().required().email(),
    password: Joi.string().min(5).required(),
    newPassword: Joi.string().min(5).required()
}

export default passwordChangeRequestSchema;