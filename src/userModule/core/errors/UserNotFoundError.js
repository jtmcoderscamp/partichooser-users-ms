import errorTypes from "./errorTypes";
import UserServiceError from "./_UserServiceError";

export default class UserNotFoundError extends UserServiceError{
    get ERROR_TYPE() {
        return errorTypes.USER_NOT_FOUND_ERROR;
    }
}