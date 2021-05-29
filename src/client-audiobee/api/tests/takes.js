export default class Take {
    constructor(client) {
        this.client = client;
        this.resourceUrl = '/takes'
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