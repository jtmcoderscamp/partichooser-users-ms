import UserServicePort from "./_UserServicePort";
import UserRepositoryPort from "./_UserRepositoryPort";
import uuid4 from "uuid/v4";
import UserNotFoundError from "./errors/UserNotFoundError";

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
        return this.userRepository.selectAll();
    }

    /**
     * A method that returns the details of a specified user from the database
     * @param {String} uuid - UUID identifying the user
     * @returns {Promise<User>} 
     */
    async findUserByUuid(uuid) {
        const user = await this.userRepository.selectByUuid(uuid);
        if (!user) throw new UserNotFoundError(`User with uuid ${uuid} not found`);
        return user;
    }

    /**
     * A method that returns the details of a specified user from the database
     * @param {String} email - the unique email of the user
     * @returns {Promise<User>} 
     */
    async findUserByEmail(email) {
        const user = await this.userRepository.selectByEmail(email);
        if (!user) throw new UserNotFoundError(`User with email ${email} not found`);
        return user;
    }

    /**
     * A method that leads to addition of a new user to the database
     * @param {User} user - object describing the basic data of the user to add
     * @returns {Promise<User>} - the user data saved to the database
     */
    async addNewUser(user) {
        if (user.uuid !== undefined) throw new Error("Can't add existing user.");
        user.uuid = uuid4();
        return this.userRepository.addNewUser(user);
    }
}