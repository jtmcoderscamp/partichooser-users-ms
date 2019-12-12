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
     * @param {string} password - the hashed password of the user
     * @returns {Promise<User>} 
     */
    async selectByEmailAndPassword(email, password) {
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