import PasswordServicePort from "./_PasswordServicePort";
import UserRepositoryPort from "./_UserRepositoryPort";
import bcrypt from "bcryptjs";

export default class PasswordService extends PasswordServicePort
{
    constructor(userRepository = new UserRepositoryPort())
    {
        super();
        this.userRepository = userRepository;
        throw new Error("This is just a stub");
    }

    async logIn(email, password)
    {
        let user = await this.userRepository.selectByEmail(email);
        let salt = bcrypt.genSalt(10);
        password = bcrypt.hash(password, salt);
        const validPassword = await bcrypt.compare(password, user.password);
        if (validPassword) return user;

        // return resizeBy.status(400).send('Invalid email or pasword.');
    }

    async changePassword(email, oldPassword, newPassword)
    {
        let user = await this.userRepository.selectByEmail(email);
        const validPassword = await bcrypt.compare(oldPassword, user.password);
        if (validPassword) 
        {
            user.password = newPassword;
        }
        return user;
    }

    async setPassword(uuid, newPassword)
    {
        let user = await this.userRepository.selectByUuid(uuid);
        let salt = bcrypt.genSalt(10);
        newPassword = bcrypt.hash(newPassword, salt);
        user.password = newPassword;
        return user;
    }


}