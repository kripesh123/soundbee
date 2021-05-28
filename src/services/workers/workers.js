import models from '../../lib/models'
import parse from '../../lib/parse'

export async function getAll() {
    return await models.Worker.findAll({order: [['id', 'DESC']]})  
}

class WorkerService {

    getFilter(params = {}) {

		const filter = {};
		const id = params.id;

		if (id) {
			filter.id = id;
		}

		if (params.email) {
			filter.email = params.email.toLowerCase();
		}

		return filter;
	}

    async getWorkers(params = {}) {
        const filter = this.getFilter(params);
        const limit = parse.getNumberIfPositive(params.limit) || 100;
		const offset = parse.getNumberIfPositive(params.offset) || 0;
        const [customers, customersCount] = await Promise.all([
            models.Worker.findAll({
                where: filter,
                limit,
                offset,
                order: [['id', 'DESC']]
            }),
            models.Worker.count()
        ]);
        const result = {
            total_count: customersCount,
            has_more: offset + customers.length < customersCount,
            data: customers
        };
        return result;
    }

    async addWorker(data) {
        const worker = this.getValidDataForInsert(data);
        // is email unique
		if (worker.email && worker.email.length > 0) {

			const workerCount = await models.Worker.findAndCountAll({
                where: { 
                    email: worker.email
                }
            });

			if (workerCount.count > 0) {
				return Promise.reject('Worker email must be unique');
			}
        }
    
        const insertResponse = await models.Worker.create(worker);
        const newWorkerId = insertResponse.id;
        const newWorker = await this.getSingleWorker(newWorkerId)
        return newWorker;

    }

    async getSingleWorker(id) {
		if (!parse.isNumber(id)) {
			return Promise.reject('Invalid identifier');
		}
		const items = await this.getWorkers({ id });
        return items.data.length > 0 ? items.data[0] : {};
	}

    getValidDataForInsert(data) {
        const worker = {};
        worker.name = parse.getString(data.name);
        worker.email = parse.getString(data.email);
        worker.password = parse.getString(data.password);
        worker.isActive = Boolean(data.isActive);
        return worker;
    }
}

export default new WorkerService();