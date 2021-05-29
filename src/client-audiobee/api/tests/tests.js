export default class Tests {
    constructor(client) {
        this.client = client;
        this.resourceUrl = '/tests'
    }

    list(filter) {
        return this.client.get(this.resourceUrl, filter);
    }

    create(data) {
		return this.client.post(this.resourceUrl, data);
    }
    
    retrieve(id, filter) {
    return this.client.get(`${this.resourceUrl}/${id}`, filter);
    }

    testQuestions(id, filter) {
      return this.client.get(`${this.resourceUrl}/${id}/`, filter);
    }
}