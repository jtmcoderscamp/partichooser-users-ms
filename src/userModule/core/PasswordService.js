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

        let salt = bcrypt.genSalt(10);
        password = bcrypt.hash(password, salt);
        const validPassword = await bcrypt.compare(password, user.password);
        if (validPassword) return user;
        else return null;
        
        
    }

    async changePassword(email, oldPassword, newPassword)
    {
        let user = await this.userRepository.selectByEmail(email);
        if (!user) return null;
        //what should return if user is not find
        //are passwords hashed?
        const validPassword = await bcrypt.compare(oldPassword, user.password);
        if (validPassword) 
        {
            user.password = newPassword;
            await user.save();
            return user;
        }
        else return null;
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