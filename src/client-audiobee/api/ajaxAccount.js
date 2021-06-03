export default class AjaxAccount {
	constructor(client) {
		this.client = client;
	}

	retrieve(data) {
		return this.client.post(`/customer-account`, data);
	}
}
