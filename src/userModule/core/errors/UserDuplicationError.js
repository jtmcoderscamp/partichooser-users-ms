import errorTypes from "./errorTypes";
import UserServiceError from "./_UserServiceError";

export default class UserDuplicationError extends UserServiceError{
    get ERROR_TYPE() {
        return errorTypes.USER_DUPLICATION_ERROR;
    }
}