import TestRepositoryPort from "../core/_TestRepositoryPort";

export default class MockTestRepository extends TestRepositoryPort {
    constructor() {
        super();
        this._testResultsInDatabase = {
            test1: "First test's result",
            test2: "Second test's result",
            test3: "Third test's result"
        }
    }

    async selectByTestId(id) {
        const resultRetrievedFromDb = this._testResultsInDatabase[id];
        if (resultRetrievedFromDb) {
            return {
                stringFromDb: resultRetrievedFromDb
            }
        } else throw new Error(`No results for id ${id}`);
    }
}