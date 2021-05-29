import security from '../lib/security';
import TestsService from '../services/tests/tests';
import TestQuestionsService from '../services/tests/testQuestions';

class TestsRoute {
    constructor(router) {
		this.router = router;
		this.registerRoutes();
    }
    
    registerRoutes() {
      this.router.get(
        '/v1/tests',
        security.checkUserScope.bind(this, security.scope.READ_TESTS),
        this.getTests.bind(this)
      );
      this.router.post(
        '/v1/tests',
        security.checkUserScope.bind(this, security.scope.WRITE_TESTS),
        this.addTests.bind(this)
      );
      this.router.get(
        '/v1/tests/:id',
        security.checkUserScope.bind(this, security.scope.READ_TESTS),
        this.getSingleTest.bind(this)
      );
      this.router.post(
        '/v1/tests/:id/questions',
        security.checkUserScope.bind(this, security.scope.WRITE_QUESTIONS),
        this.postQuestions.bind(this)
      );
      this.router.get(
        '/v1/tests/:id/questions',
        security.checkUserScope.bind(this, security.scope.READ_QUESTIONS),
        this.getQuestions.bind(this)
      );
    }

    postQuestions(req, res, next) {
      TestQuestionsService.addQuestions(req.params.id, req.body)
        .then(data => res.send(data))
        .catch(next);
    }

    getQuestions(req, res, next) {
      TestQuestionsService.getQuestionsForTest(req.params.id)
        .then(data => {
          if(data) {
            return res.send(data);
          }
          return res.status(404).end();
        })
    }

    getSingleTest(req, res, next) {
        TestsService.getSingleTest(req.params.id)
        .then(data => {
          if (data) {
            return res.send(data);
          }
          return res.status(404).end();
        })
        .catch(next);
    }

    getTests(req, res, next) {
		TestsService.getTests(req.query)
			.then(data => res.send(data))
			.catch(next);
    }
    
    addTests(req, res, next) {
      TestsService.addTest(req.body)
            .then(data => res.send(data))
            .catch(next);
    }
}

export default TestsRoute;