import security from '../lib/security';
import TestTakeAnswersService from '../services/tests/testTakeAnswer';

class TakeAnswersRoute {
    constructor(router) {
		this.router = router;
		this.registerRoutes();
    }
    
    registerRoutes() {
      this.router.get(
        '/v1/takeAnswers',
        security.checkUserScope.bind(this, security.scope.READ_TAKE_ANSWERS),
        this.getTakeAnswers.bind(this)
      );
      this.router.post(
        '/v1/takeAnswers',
        security.checkUserScope.bind(this, security.scope.WRITE_TAKE_ANSWERS),
        this.addTakeAnswers.bind(this)
      );
      this.router.get(
        '/v1/takeAnswers/:id',
        security.checkUserScope.bind(this, security.scope.READ_TAKE_ANSWERS),
        this.getSingleTakeAnswer.bind(this)
      );

    }

    getSingleTakeAnswer(req, res, next) {
        TestTakeAnswersService.getSingleTestTakeAnswer(req.params.id)
        .then(data => {
          if (data) {
            return res.send(data);
          }
          return res.status(404).end();
        })
        .catch(next);
    }

    getTakeAnswers(req, res, next) {
		TestTakeAnswersService.getTestTakeAnswers(req.query)
			.then(data => res.send(data))
			.catch(next);
    }
    
    addTakeAnswers(req, res, next) {
        TestTakeAnswersService.addTestTakeAnswer(req.body)
            .then(data => res.send(data))
            .catch(next);
    }
}

export default TakeAnswersRoute;