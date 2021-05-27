import Workers from "./api/workers";
import ApiClient from "./apiClient";

export default class Client {
    constructor(options = {}) {
        this.apiBaseUrl = options.apiBaseUrl || '/api/v1';
        this.apiToken = options.apiToken;
        this.ajaxBaseUrl = options.ajaxBaseUrl || '/ajax';
        
        const apiClient = new ApiClient({
			baseUrl: this.apiBaseUrl,
			token: this.apiToken
		});
        this.workers = new Workers(apiClient);
    }

    static authorize = (baseUrl, email) => ApiClient.authorize(baseUrl, email);
}