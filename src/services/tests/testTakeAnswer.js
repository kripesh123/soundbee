import models from '../../lib/models'
import parse from '../../lib/parse'

class TestTakeAnswerService {

    getFilter(params = {}) {

		const filter = {};
		const id = parse.getNumberIfValid(params.id);

		if (id) {
			filter.id = id;
		}

		if (params.takeId) {
			filter.takeId = parse.isNumber(params.takeId);
        }
        
        if (params.questionId) {
			filter.questionId = parse.isNumber(params.questionId);
        }
        
        if (params.answerId) {
			filter.answerId = parse.isNumber(params.answerId);
		}

		return filter;
	}

    async getTestTakeAnswers(params = {}) {
        const filter = this.getFilter(params);
        const limit = parse.getNumberIfPositive(params.limit) || 100;
        const offset = parse.getNumberIfPositive(params.offset) || 0;
        const [testTakeAnswers, testTakeAnswersCount] = await Promise.all([
            models.TestTakeAnswer.findAll({
                where: filter,
                limit,
                offset,
                order: [['id', 'DESC']],
            }),
            models.TestTakeAnswer.count()
        ]);
        const result = {
            total_count: testTakeAnswersCount,
            has_more: offset + testTakeAnswers.length < testTakeAnswersCount,
            data: testTakeAnswers
        };
        return result;
    }

    async addTestTakeAnswer(data) {
        const takeAnswer = this.getValidDataForInsert(data);
        // does take exist
        const takeCount = await models.TestTake.findAndCountAll({
            where: { 
                id: data.takeId
            }
        });
        // does question exist
        const questionCount = await models.TestQuestion.findAndCountAll({
            where: { 
                id: data.questionId
            }
        });
         // does answer exist
         const answerCount = await models.TestAnswer.findAndCountAll({
            where: { 
                id: data.answerId
            }
        });
        if (takeCount.count <= 0 || questionCount.count <= 0 || answerCount.count <= 0) {
            return Promise.reject('Take/Question/Answer does not exist.');
        }
        const insertResponse = await models.TestTakeAnswer.create(takeAnswer);
        const newTestTakeAnswerId = insertResponse.id;
        const newTestTakeAnswer = await this.getSingleTestTakeAnswer(newTestTakeAnswerId)
        return newTestTakeAnswer;

    }

    async getSingleTestTakeAnswer(id) {
		if (!parse.isNumber(id)) {
			return Promise.reject('Invalid identifier');
		}
		const items = await this.getTestTakeAnswers({ id });
        return items.data.length > 0 ? items.data[0] : {};
	}

    getValidDataForInsert(data) {
        const takeAnswer = {};
        takeAnswer.takeId = parse.getNumberIfValid(data.takeId);
        takeAnswer.questionId = parse.getNumberIfValid(data.questionId);
        takeAnswer.answerId = parse.getNumberIfValid(data.answerId);
        takeAnswer.content = parse.getString(data.content);
        takeAnswer.isActive = Boolean(data.isActive) || true;
        return takeAnswer;
    }
}

export default new TestTakeAnswerService();