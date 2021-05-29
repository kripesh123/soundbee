import security from '../lib/security';
import TestTakesService from '../services/tests/testTake';

class TakesRoute {
    constructor(router) {
		this.router = router;
		this.registerRoutes();
    }
    
    registerRoutes() {
      this.router.get(
        '/v1/takes',
        security.checkUserScope.bind(this, security.scope.READ_TAKES),
        this.getTakes.bind(this)
      );
      this.router.post(
        '/v1/takes',
        security.checkUserScope.bind(this, security.scope.WRITE_TAKES),
        this.addTakes.bind(this)
      );
      this.router.get(
        '/v1/takes/:id',
        security.checkUserScope.bind(this, security.scope.READ_TAKES),
        this.getSingleTake.bind(this)
      );

      this.router.get(
        '/v1/takes/:testId/workers/:workerId',
        security.checkUserScope.bind(this, security.scope.READ_TAKES),
        this.getWorkerTestTake.bind(this)
      );
    }

    getWorkerTestTake(req, res, next) {
        TestTakesService.getworkerTestTaken(req.params.testId, req.params.workerId)
        .then(data => {
          if(data) {
            return res.send(data);
          }
          return res.status(404).end();
        })
    }

    getSingleTake(req, res, next) {
        TestTakesService.getSingleTestTake(req.params.id)
        .then(data => {
          if (data) {
            return res.send(data);
          }
          return res.status(404).end();
        })
        .catch(next);
    }

    getTakes(req, res, next) {
		TestTakesService.getTestTakes(req.query)
			.then(data => res.send(data))
			.catch(next);
    }
    
    addTakes(req, res, next) {
        TestTakesService.addTestTake(req.body)
            .then(data => res.send(data))
            .catch(next);
    }
}

export default TakesRoute;