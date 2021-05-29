import models from '../../lib/models'
import parse from '../../lib/parse'

class TestAnswersService {

    getFilter(params = {}) {

		const filter = {};
		const id = parse.getNumberIfValid(params.id);

		if (id) {
			filter.id = id;
		}

		if (params.testId) {
			filter.testId = parse.isNumber(params.testId);
        }
        
        if (params.questionId) {
			filter.questionId = parse.isNumber(params.questionId);
		}

		return filter;
	}

    async getTestAnswers(params = {}) {
        const filter = this.getFilter(params);
        const limit = parse.getNumberIfPositive(params.limit) || 100;
        const offset = parse.getNumberIfPositive(params.offset) || 0;
        const [testAnswers, testAnswersCount] = await Promise.all([
            models.TestAnswer.findAll({
                where: filter,
                limit,
                offset,
                order: [['id', 'DESC']],
            }),
            models.TestAnswer.count()
        ]);
        const result = {
            total_count: testAnswersCount,
            has_more: offset + testAnswers.length < testAnswersCount,
            data: testAnswers
        };
        return result;
    }

    async getAnswersForQuestion(id, qId) {
        const testQuestoins = await models.TestAnswer.findAll({
            where: {
                testId: id, 
                questionId: qId
            }
        })
        return testQuestoins;
    }

    async addAnswers(id , questionId, data) {
        const answer = this.getValidDataForInsert(id, questionId, data);
        // does test exist
        const testCount = await models.Test.findAndCountAll({
            where: { 
                id
            }
        });
        // does question exist
        const questionCount = await models.TestQuestion.findAndCountAll({
            where: { 
                id: questionId
            }
        });
        if (testCount.count <= 0 || questionCount.count <= 0) {
            return Promise.reject('Test/Question does not exist.');
        }
        const insertResponse = await models.TestAnswer.create(answer);
        const newTestAnswerId = insertResponse.id;
        const newTestAnswer = await this.getSingleTestAnswer(newTestAnswerId)
        return newTestAnswer;

    }

    async getSingleTestAnswer(id) {
		if (!parse.isNumber(id)) {
			return Promise.reject('Invalid identifier');
		}
		const items = await this.getTestAnswers({ id });
        return items.data.length > 0 ? items.data[0] : {};
	}

    getValidDataForInsert(id, questionId, data) {
        const answer = {};
        answer.testId = parse.getNumberIfValid(id);
        answer.questionId = parse.getNumberIfValid(questionId)
        answer.content = parse.getString(data.content);
        answer.isCorrect = Boolean(data.isCorrect);
        answer.isActive = Boolean(data.isActive);
        return answer;
    }
}

export default new TestAnswersService();