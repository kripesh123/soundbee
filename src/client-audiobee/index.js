import Workers from "./api/workers";
import Tests from "./api/tests/tests";
import TestQuestions from "./api/tests/questions";
import TestAnswers from "./api/tests/answers";
import TestTakes from "./api/tests/takes";
import TestTakeAnswers from "./api/tests/takeAnswers";
import AjaxLogin from "./api/ajaxLogin";
import AjaxRegister from "./api/ajaxRegister";
import AjaxAccount from "./api/ajaxAccount";
import ApiClient from "./apiClient";
import AjaxClient from "./ajaxClient";

export default class Client {
    constructor(options = {}) {
        this.apiBaseUrl = options.apiBaseUrl || '/api/v1';
        this.apiToken = options.apiToken;
        this.ajaxBaseUrl = options.ajaxBaseUrl || '/ajax';
        
        const apiClient = new ApiClient({
			baseUrl: this.apiBaseUrl,
			token: this.apiToken
        });
        
        const ajaxClient = new AjaxClient({ baseUrl: this.ajaxBaseUrl });
        this.workers = new Workers(apiClient);
        this.tests = new Tests(apiClient);
        this.questions = new TestQuestions(apiClient);
        this.answers = new TestAnswers(apiClient);
        this.takes = new TestTakes(apiClient);
        this.takeAnswers = new TestTakeAnswers(apiClient);
        
        this.ajax = {};
        this.ajax.tests = new Tests(ajaxClient);
        this.ajax.login = new AjaxLogin(ajaxClient);
        this.ajax.register = new AjaxRegister(ajaxClient);
        this.ajax.questions = new TestQuestions(ajaxClient);
        this.ajax.answers = new TestAnswers(ajaxClient);
        this.ajax.takes = new TestTakes(ajaxClient);
        this.ajax.takeAnswers = new TestTakeAnswers(ajaxClient);
        this.ajax.accounts = new AjaxAccount(ajaxClient);
    }

    static authorize = (baseUrl, email) => ApiClient.authorize(baseUrl, email);
}