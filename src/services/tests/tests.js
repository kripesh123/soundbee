import models from '../../lib/models'
import parse from '../../lib/parse'

export async function getAll() {
    return await models.Worker.findAll({order: [['id', 'DESC']]})  
}

class WorkerService {

    getFilter(params = {}) {

		const filter = {};
		const id = parse.isNumber(params.id);

		if (id) {
			filter.id = id;
		}

		if (params.email) {
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

    // async addWorker(data) {
    //     const worker = this.getValidDataForInsert(data);
    //     // is email unique
	// 	if (worker.email && worker.email.length > 0) {

	// 		const workerCount = await models.Worker.findAndCountAll({
    //             where: { 
    //                 email: worker.email
    //             }
    //         });

	// 		if (workerCount.count > 0) {
	// 			return Promise.reject('Worker email must be unique');
	// 		}
    //     }
    
    //     const insertResponse = await models.Worker.create(worker);
    //     const newWorkerId = insertResponse.id;
    //     const newWorker = await this.getSingleWorker(newWorkerId)
    //     return newWorker;

    // }

    async getSingleTest(id) {
		if (!parse.isNumber(id)) {
			return Promise.reject('Invalid identifier');
		}
		const items = await this.getTests({ id });
        return items.data.length > 0 ? items.data[0] : {};
	}

    // getValidDataForInsert(data) {
    //     const worker = {};
    //     worker.name = parse.getString(data.name);
    //     worker.email = parse.getString(data.email);
    //     worker.password = parse.getString(data.password);
    //     worker.isActive = Boolean(data.isActive);
    //     return worker;
    // }
}

export default new WorkerService();