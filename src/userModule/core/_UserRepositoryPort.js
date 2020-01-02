import User from "./domain/User";

/**
 * An abstract class describing the expected behavior of TestRepository implementations
 */
export default class UserRepositoryPort {
    constructor() {
        if (new.target === UserRepositoryPort) {
            throw new Error("Attempting to create an instance of an abstract class.");
        }
    }

    /**
     * A method that retrieves all users from the database
     * @returns {Promise<User[]>} 
     */
    async selectAll() {
        throw new Error("Attempting to call an abstract method!");
    }

    /**
     * A method that retrieves the specified user from the database
     * @param {string} uuid - UUID identifying the user
     * @returns {Promise<User>} 
     */
    async selectByUuid(uuid) {
        throw new Error("Attempting to call an abstract method!");
    }

    /**
     * A method that retrieves the specified user from the database based on login data
     * @param {string} email - the unique email of the user
     * @returns {Promise<User>} 
     */
    async selectByEmail(email) {
        throw new Error("Attempting to call an abstract method!");
    }

    /**
     * A method that saves the user in the database or throws an error if UUID or email is duplicated
     * @param {User} user - object describing the user to be added to the database
     * @returns {Promise<User>} - the user data saved to the database
     */
    async addNewUser(user) {
        throw new Error("Attempting to call an abstract method!");
    }

    /**
     * A method that updates the password of specified user
     * @param {string} uuid - UUID identifying the user
     * @param {string} password - hashed password
     */
    async updatePassword(uuid, password) {
        throw new Error("Attempting to call an abstract method!");
    }
}
