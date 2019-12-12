import PasswordServicePort from "./_PasswordServicePort";
import UserRepositoryPort from "./_UserRepositoryPort";

export default class PasswordService extends PasswordServicePort {
    constructor(userRepository = new UserRepositoryPort()){
        super();
        this.userRepository = userRepository;

        throw new Error("This is just a stub");
    }
}