import errorTypes from "./errorTypes";
import UserServiceError from "./_UserServiceError";

export default class UnauthorizedError extends UserServiceError{
    get ERROR_TYPE() {
        return errorTypes.UNAUTHORIZED_ERROR;
    }
}