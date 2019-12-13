import UserRepositoryPort from "./_UserRepositoryPort";
import User from "./domain/User";

/**
 * An abstract class describing the expected behavior of PasswordService implementations
 */
export default class PasswordServicePort
{
    /**
     * Constructor taking an object of a class inheriting after UserRepositoryPort as an argument
     * @param {UserRepositoryPort} userRepository 
     */
    constructor(userRepository)
    {
        if (new.target === UserServicePort) 
        {
            throw new Error("Attempting to create an instance of an abstract class.");
        }
    }

    /**
     * A method that returns the data of the user trying to log in (as long as email and password combination is right)
     * @param {string} email - the unique email of the user
     * @param {string} password - the password (not yet hashed) of the user
     * @returns {Promise<User>} 
     */
    async logIn(email, password)
    {
        throw new Error("Attempting to call an abstract method!");



    }

    /**
     * The method that performs user credentials validation and password change
     * @param {string} email - the unique email of the user changing password
     * @param {string} oldPassword - old password needed to confirm identity of the user changing password
     * @param {string} newPassword - new password
     * @returns {Promise<User>} 
     */
    async changePassword(email, oldPassword, newPassword)
    {
        throw new Error("Attempting to call an abstract method!");


    }

    /**
     * The method that forcefully sets a new password for the specified user
     * @param {string} uuid - the UUID specifying the user
     * @param {string} newPassword - new password
     */
    async setPassword(uuid, newPassword)
    {
        throw new Error("Attempting to call an abstract method!");


    }

}