import TestRepositoryPort from "./_TestRepositoryPort";

/**
 * An abstract class describing the expected behavior of TestService implementations
 */
export default class TestServicePort {
    /**
     * Constructor taking an object of a class inheriting after TestRepositoryPort as an argument
     * @param {TestRepositoryPort} testRepository 
     */
    constructor(testRepository) {
        if (new.target === TestServicePort) {
            throw new Error("Attempting to create an instance of an abstract class.");
        }
    }

    /**
     * An method that returns a test result (presumably from repository provided as constructor's argument)
     * @param {String} testId
     * @returns {Promise<{stringFromDb: String}>} 
     */
    async findTestResult(testId) {
        throw new Error("Attempting to call an abstract method!");
    }
}