import TestServicePort from "./_TestServicePort";
import TestRepositoryPort from "./_TestRepositoryPort";

export default class TestService extends TestServicePort {

    constructor(testRepository = new TestRepositoryPort()) {
        super();
        this._repository = testRepository;
    }

    async findTestResult(testId) {
        const result = await this._repository.selectByTestId(testId);
        return result;
    }
}