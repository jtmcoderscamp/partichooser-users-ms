export default class UserServiceError extends Error {
    
    constructor(message, cause){
        super(message);
        this.message = message;
        this.cause = cause;
    }
}