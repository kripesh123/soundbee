import models from '../../lib/models'
import parse from '../../lib/parse'

class TestTakesService {

    getFilter(params = {}) {

		const filter = {};
		const id = parse.getNumberIfValid(params.id);

		if (id) {
			filter.id = id;
		}

		if (params.testId) {
			filter.testId = parse.isNumber(params.testId);
        }
        
        if (params.workerId) {
			filter.workerId = parse.isNumber(params.workerId);
		}

		return filter;
	}

    async getTestTakes(params = {}) {
        const filter = this.getFilter(params);
        const limit = parse.getNumberIfPositive(params.limit) || 100;
        const offset = parse.getNumberIfPositive(params.offset) || 0;
        const [testTakes, testTakesCount] = await Promise.all([
            models.TestTake.findAll({
                where: filter,
                limit,
                offset,
                order: [['id', 'DESC']],
            }),
            models.TestTake.count()
        ]);
        const result = {
            total_count: testTakesCount,
            has_more: offset + testTakes.length < testTakesCount,
            data: testTakes
        };
        return result;
    }

    async getworkerTestTaken(testId, workerId) {
        const workerTests = await models.TestTake.findAll({
            where: {
                testId,
                workerId 
            }
        })
        return workerTests;
    }

    async addTestTake(data) {
        const take = this.getValidDataForInsert(data);
        // does test exist
        const testCount = await models.Test.findAndCountAll({
            where: { 
                id: data.testId
            }
        });
        // does worker exist
        const workerCount = await models.Worker.findAndCountAll({
            where: { 
                id: data.workerId
            }
        });
        if (testCount.count <= 0 || workerCount.count <= 0) {
            return Promise.reject('Test/Worker does not exist.');
        }
        const insertResponse = await models.TestTake.create(take);
        const newTestTakeId = insertResponse.id;
        const newTestTake = await this.getSingleTestTake(newTestTakeId)
        return newTestTake;

    }

    async getSingleTestTake(id) {
		if (!parse.isNumber(id)) {
			return Promise.reject('Invalid identifier');
		}
		const items = await this.getTestTakes({ id });
        return items.data.length > 0 ? items.data[0] : {};
	}

    getValidDataForInsert(data) {
        const take = {};
        take.testId = parse.getNumberIfValid(data.testId);
        take.workerId = parse.getNumberIfValid(data.workerId)
        take.content = parse.getString(data.content);
        take.score = parse.getNumberIfValid(data.score);
        take.isActive = Boolean(data.isActive);
        return take;
    }
}

export default new TestTakesService();