export default class Workers {
    constructor(client) {
        this.client = client;
        this.resourceUrl = '/workers'
    }

    list(filter) {
        return this.client.get(this.resourceUrl, filter);
    }

    create(data) {
		return this.client.post(this.resourceUrl, data);
	}
}