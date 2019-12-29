import errorTypes from "./errorTypes";
import UserServiceError from "./_UserServiceError";

export default class ValidationError extends UserServiceError{
    get ERROR_TYPE() {
        return errorTypes.VALIDATION_ERROR;
    }
}