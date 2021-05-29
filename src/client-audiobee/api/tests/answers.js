export default class Answer {
    constructor(client) {
        this.client = client;
        this.resourceUrl = '/tests'
    }

    retrieve(id, questionId, filter) {
      return this.client.get(`${this.resourceUrl}/${id}/questions/${questionId}/answers`, filter);
    }

    create(id, questionId, data) {
		return this.client.post(`${this.resourceUrl}/${id}/questions${questionId}/answers`, data);
    }
}