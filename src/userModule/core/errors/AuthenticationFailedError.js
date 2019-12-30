import errorTypes from "./errorTypes";
import UserServiceError from "./_UserServiceError";

export default class AuthenticationFailedError extends UserServiceError{
    get ERROR_TYPE() {
        return errorTypes.AUTHENTICATION_FAILED_ERROR;
    }
}