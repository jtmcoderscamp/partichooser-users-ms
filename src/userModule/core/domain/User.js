export default class User{
    /**
     * 
     * @param {string} uuid - universally unique identifier 
     * @param {string} name - first name
     * @param {string} surname - last name
     * @param {string} email - valid (and unique, since it also serves as login)
     * @param {string[]} roles - roles of the specified user (possible "mentor" and/or "admin")
     * @param {string} password - hashed password
     */
    constructor(uuid, name, surname, email, roles = ["mentor"], password) {
        this.uuid = uuid;
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.roles = [...roles];
        this.password = password;
    }
}