import models from '../../lib/models'
import parse from '../../lib/parse'

class TestService {

    getFilter(params = {}) {

		const filter = {};
		const id = parse.getNumberIfValid(params.id);

		if (id) {
			filter.id = id;
		}

		if (params.userId) {
			filter.userId = parse.isNumber(params.userId);
		}

		return filter;
	}

    async getTests(params = {}) {
        const filter = this.getFilter(params);
        const limit = parse.getNumberIfPositive(params.limit) || 100;
        const offset = parse.getNumberIfPositive(params.offset) || 0;
        const [tests, testsCount] = await Promise.all([
            models.Test.findAll({
                where: filter,
                limit,
                offset,
                order: [['id', 'DESC']],
                include: [
                    { model: models.TestQuestion, as: 'questions' }
                ]
            }),
            models.Test.count()
        ]);
        const result = {
            total_count: testsCount,
            has_more: offset + tests.length < testsCount,
            data: tests
        };
        return result;
    }

    async addTest(data) {
        const test = this.getValidDataForInsert(data);
        // does user exist
        if (test.userId) {
			const userCount = await models.User.findAndCountAll({
                where: { 
                    id: test.userId
                }
            });
			if (userCount.count <= 0) {
				return Promise.reject('This User does not exist.');
			}
        }
        const insertResponse = await models.Test.create(test);
        const newTestId = insertResponse.id;
        const newTest = await this.getSingleTest(newTestId)
        return newTest;

    }

    async getSingleTest(id) {
		if (!parse.isNumber(id)) {
			return Promise.reject('Invalid identifier');
		}
		const items = await this.getTests({ id });
        return items.data.length > 0 ? items.data[0] : {};
	}

    getValidDataForInsert(data) {
        const test = {};
        test.userId = parse.getNumberIfValid(data.userId);
        test.name = parse.getString(data.name);
        test.slug = parse.getString(data.slug);
        test.description = parse.getString(data.description);
        test.metaTitle = parse.getString(data.metaTitle);
        test.metaDescription = parse.getString(data.metaDescription);
        test.score = parse.getNumberIfValid(data.score)
        test.isActive = Boolean(data.isActive);
        return test;
    }
}

export default new TestService();