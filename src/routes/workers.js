import security from '../lib/security';
import WorkersService from '../services/workers/workers';

class WorkersRoute {
    constructor(router) {
		this.router = router;
		this.registerRoutes();
    }
    
    registerRoutes() {
      this.router.get(
        '/v1/workers',
        security.checkUserScope.bind(this, security.scope.READ_WORKERS),
        this.getWorkers.bind(this)
      );
      this.router.post(
        '/v1/workers',
        security.checkUserScope.bind(this, security.scope.WRITE_WORKERS),
        this.addWorkers.bind(this)
      );
      this.router.get(
        '/v1/workers/:id',
        security.checkUserScope.bind(this, security.scope.READ_CUSTOMERS),
        this.getSingleCustomer.bind(this)
      );
    }

    getSingleCustomer(req, res, next) {
      WorkersService.getSingleWorker(req.params.id)
        .then(data => {
          if (data) {
            return res.send(data);
          }
          return res.status(404).end();
        })
        .catch(next);
    }

    getWorkers(req, res, next) {
		WorkersService.getWorkers(req.query)
			.then(data => res.send(data))
			.catch(next);
    }
    
    addWorkers(req, res, next) {
        WorkersService.addWorker(req.body)
            .then(data => res.send(data))
            .catch(next);
    }
}

export default WorkersRoute;