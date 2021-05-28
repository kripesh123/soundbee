import security from '../lib/security';
import TestsService from '../services/tests/tests';

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
    //   this.router.post(
    //     '/v1/workers',
    //     security.checkUserScope.bind(this, security.scope.WRITE_WORKERS),
    //     this.addWorkers.bind(this)
    //   );
      this.router.get(
        '/v1/tests/:id',
        security.checkUserScope.bind(this, security.scope.READ_TESTS),
        this.getSingleTest.bind(this)
      );
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
    
    // addWorkers(req, res, next) {
    //     WorkersService.addWorker(req.body)
    //         .then(data => res.send(data))
    //         .catch(next);
    // }
}

export default TestsRoute;