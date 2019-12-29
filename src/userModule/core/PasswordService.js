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
        if (!user) return null;

        const validPassword = await bcrypt.compare(password, user.password);
        if (validPassword) return user; 
        else return null;
    }

    async changePassword(email, oldPassword, newPassword)
    {
        let user = await this.userRepository.selectByEmail(email);
        if (!user) return null;

        const validPassword = await bcrypt.compare(oldPassword, user.password);
        if (validPassword) 
        {
            await this.userRepository.updatePassword(user.uuid, this.hash(newPassword));
            return user;
        }
        else return null;
    }

    async setPassword(uuid, newPassword)
    {
        let user = await this.userRepository.selectByUuid(uuid);
        await this.userRepository.updatePassword(user.uuid, this.hash(newPassword));
        return user;
    }

    hash(password)
    {
        let salt = bcrypt.genSalt(10);
        return password = bcrypt.hash(password, salt);
    }

}