import UserServicePort from "./_UserServicePort";
import UserRepositoryPort from "./_UserRepositoryPort";

export default class UserService extends UserServicePort {

    constructor(userRepository = new UserRepositoryPort()){
        super();
        this.userRepository = userRepository;

        throw new Error("This is just a stub");
    }
}