/**
 * An abstract class describing the expected behavior of TestRepository implementations
 */
export default class TestRepositoryPort {
    constructor() {
        if (new.target === TestRepositoryPort) {
            throw new Error("Attempting to create an instance of an abstract class.");
        }
    }

    /**
     * A method to retrieve string test result from database based on string id and return it in an object
     * @param {String} id 
     * @returns {Promise<{stringFromDb: String}>}
     */
    async selectByTestId(id) {
        throw new Error("Attempting to call an abstract method!");
    }
}