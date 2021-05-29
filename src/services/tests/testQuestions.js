import models from '../../lib/models'
import parse from '../../lib/parse'

class TestQuestionsService {

    getFilter(params = {}) {

		const filter = {};
		const id = parse.getNumberIfValid(params.id);

		if (id) {
			filter.id = id;
		}

		if (params.testId) {
			filter.testId = parse.isNumber(params.testId);
		}

		return filter;
	}

    async getTestQuestions(params = {}) {
        const filter = this.getFilter(params);
        const limit = parse.getNumberIfPositive(params.limit) || 100;
        const offset = parse.getNumberIfPositive(params.offset) || 0;
        const [testQuestions, testQuestionsCount] = await Promise.all([
            models.TestQuestion.findAll({
                where: filter,
                limit,
                offset,
                order: [['id', 'DESC']],
            }),
            models.TestQuestion.count()
        ]);
        const result = {
            total_count: testQuestionsCount,
            has_more: offset + testQuestions.length < testQuestionsCount,
            data: testQuestions
        };
        return result;
    }

    async getQuestionsForTest(id) {
        const testQuestoins = await models.TestQuestion.findAll({
            where: {testId: id}
        })
        return testQuestoins;
    }

    async addQuestions(id ,data) {
        const question = this.getValidDataForInsert(id ,data);
       // does test exist
        const testCount = await models.Test.findAndCountAll({
            where: { 
                id
            }
        });
        if (testCount.count <= 0) {
            return Promise.reject('Test does not exist.');
        }

        const insertResponse = await models.TestQuestion.create(question);
        const newTestQuestionId = insertResponse.id;
        const newTestQuestion = await this.getSingleTestQuestion(newTestQuestionId)
        return newTestQuestion;

    }

    async getSingleTestQuestion(id) {
		if (!parse.isNumber(id)) {
			return Promise.reject('Invalid identifier');
		}
		const items = await this.getTestQuestions({ id });
        return items.data.length > 0 ? items.data[0] : {};
	}

    getValidDataForInsert(id, data) {
        const question = {};
        question.testId = parse.getNumberIfValid(id);
        question.content = parse.getString(data.name);
        question.score = parse.getNumberIfValid(data.score)
        question.isActive = Boolean(data.isActive);
        return question;
    }
}

export default new TestQuestionsService();