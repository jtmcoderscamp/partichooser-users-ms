import UserServicePort from "./_UserServicePort";
import UserRepositoryPort from "./_UserRepositoryPort";
import uuid4 from "uuid/v4";
import UserNotFoundError from "./errors/UserNotFoundError";
import bcrypt from "bcryptjs";
import AuthenticationFailedError from "./errors/AuthenticationFailedError";

export default class UserService extends UserServicePort {

    constructor(userRepository = new UserRepositoryPort()){
        super();
        this.userRepository = userRepository;
    }

    /**
     * A method that returns the details of all users in the database
     * @returns {Promise<User[]>} 
     */
    async findAllUsers() {
        return (await this.userRepository.selectAll()).map( user => user.stripPassword());
    }

    /**
     * A method that returns the details of a specified user from the database
     * @param {String} uuid - UUID identifying the user
     * @returns {Promise<User>} 
     */
    async findUserByUuid(uuid) {
        const user = await this.userRepository.selectByUuid(uuid);
        if (!user) throw new UserNotFoundError(`User with uuid ${uuid} not found`);
        return user.stripPassword();
    }

    /**
     * A method that returns the details of a specified user from the database
     * @param {String} email - the unique email of the user
     * @returns {Promise<User>} 
     */
    async findUserByEmail(email) {
        const user = await this.userRepository.selectByEmail(email);
        if (!user) throw new UserNotFoundError(`User with email ${email} not found`);
        return user.stripPassword();
    }

    /**
     * A method that leads to addition of a new user to the database
     * @param {User} user - object describing the basic data of the user to add
     * @returns {Promise<User>} - the user data saved to the database
     */
    async addNewUser(user) {
        if (user.uuid !== undefined) throw new Error("Can't add existing user.");
        user.uuid = uuid4();
        user.password = await this.hash("password");
        return (await this.userRepository.addNewUser(user)).stripPassword();
    }

    /**
     * A method that returns the data of the user trying to log in (as long as email and password combination is right)
     * @param {string} email - the unique email of the user
     * @param {string} password - the password (not yet hashed) of the user
     * @returns {Promise<User>} 
     */
    async logIn(email, password) {
        let user = await this.userRepository.selectByEmail(email);
        if (!user) return null;

        const validPassword = await bcrypt.compare(password, user.password);
        if (validPassword) return user; 
        else return null;
    }

    /**
     * The method that performs user credentials validation and password change
     * @param {string} email - the unique email of the user changing password
     * @param {string} oldPassword - old password needed to confirm identity of the user changing password
     * @param {string} newPassword - new password
     * @returns {Promise<User>} 
     */
    async changePassword(email, oldPassword, newPassword) {
        const user = await this.userRepository.selectByEmail(email);
        if (!user) throw new AuthenticationFailedError("Failed to authenticate as password change requester");

        const validPassword = await bcrypt.compare(oldPassword, user.password);
        if (!validPassword) throw new AuthenticationFailedError("Failed to authenticate as password change requester");
        
        const updatedUser = await this.userRepository.updatePassword(user.uuid, await this.hash(newPassword));

        return updatedUser.stripPassword();
    }

    /**
     * The method that forcefully sets a new password for the specified user
     * @param {string} uuid - the UUID specifying the user
     * @param {string} newPassword - new password
     */
    async setPassword(uuid, newPassword) {
        let user = await this.userRepository.selectByUuid(uuid);
        await this.userRepository.updatePassword(user.uuid, await this.hash(newPassword));
        return user;
    }

    /**
     * A simple password-hashing helper function
     * @param {string} password 
     * @returns {Promise<string>} hashed password
     */
    async hash(password) {
        let salt = await bcrypt.genSalt(10);
        return password = bcrypt.hash(password, salt);
    }
}