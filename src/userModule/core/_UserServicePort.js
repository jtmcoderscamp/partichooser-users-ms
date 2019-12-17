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

}