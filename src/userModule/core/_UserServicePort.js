import UserRepositoryPort from "./_UserRepositoryPort";
import User from "./domain/User";

/**
 * An abstract class describing the expected behavior of UserService implementations
 */
export default class UserServicePort {
    /**
     * Constructor taking an object of a class inheriting after UserRepositoryPort as an argument
     * @param {UserRepositoryPort} userRepository 
     */
    constructor(userRepository) {
        if (new.target === UserServicePort) {
            throw new Error("Attempting to create an instance of an abstract class.");
        }
    }

    /**
     * A method that returns the details of all users in the database
     * @returns {Promise<User[]>} 
     */
    async findAllUsers() {
        throw new Error("Attempting to call an abstract method!");
    }

    /**
     * A method that returns the details of a specified user from the database
     * @param {String} uuid - UUID identifying the user
     * @returns {Promise<User>} 
     */
    async findUserByUuid(uuid) {
        throw new Error("Attempting to call an abstract method!");
    }

    /**
     * A method that returns the details of a specified user from the database
     * @param {String} email - the unique email of the user
     * @returns {Promise<User>} 
     */
    async findUserByEmail(email) {
        throw new Error("Attempting to call an abstract method!");
    }

    /**
     * A method that leads to addition of a new user to the database
     * @param {User} user - object describing the basic data of the user to add
     * @returns {Promise<User>} - the user data saved to the database
     */
    async addNewUser(user) {
        throw new Error("Attempting to call an abstract method!");
    }

    /**
     * A method that returns the data of the user trying to log in (as long as email and password combination is right)
     * @param {string} email - the unique email of the user
     * @param {string} password - the password (not yet hashed) of the user
     * @returns {Promise<User>} 
     */
    async logIn(email, password){
        throw new Error("Attempting to call an abstract method!");
    }

    /**
     * The method that performs user credentials validation and password change
     * @param {string} email - the unique email of the user changing password
     * @param {string} oldPassword - old password needed to confirm identity of the user changing password
     * @param {string} newPassword - new password
     * @returns {Promise<User>} 
     */
    async changePassword(email, oldPassword, newPassword){
        throw new Error("Attempting to call an abstract method!");
    }

    /**
     * The method that forcefully sets a new password for the specified user
     * @param {string} uuid - the UUID specifying the user
     * @param {string} newPassword - new password
     */
    async setPassword(uuid, newPassword){
        throw new Error("Attempting to call an abstract method!");
    }

}