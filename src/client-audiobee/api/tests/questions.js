export default class Questions {
    constructor(client) {
        this.client = client;
        this.resourceUrl = '/tests'
    }

    retrieve(id, filter) {
      return this.client.get(`${this.resourceUrl}/${id}/questions`, filter);
    }

    create(id, data) {
		return this.client.post(`${this.resourceUrl}/${id}/questions`, data);
    }
}