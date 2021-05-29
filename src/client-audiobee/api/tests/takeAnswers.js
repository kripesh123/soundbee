export default class TakeAnswers {
    constructor(client) {
        this.client = client;
        this.resourceUrl = '/takeAnswers'
    }

    retrieve(id, filter) {
      return this.client.get(`${this.resourceUrl}/${id}`, filter);
    }

    list(filter) {
        return this.client.get(this.resourceUrl, filter);
    }

    create(data) {
		return this.client.post(this.resourceUrl, data);
    }
}