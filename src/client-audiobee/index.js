import Workers from "./api/workers";
import Tests from "./api/tests/tests";
import TestQuestions from "./api/tests/questions";
import TestAnswers from "./api/tests/answers";
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
        this.tests = new Tests(apiClient);
        this.questions = new TestQuestions(apiClient);
        this.answers = new TestAnswers(apiClient);
    }

    static authorize = (baseUrl, email) => ApiClient.authorize(baseUrl, email);
}