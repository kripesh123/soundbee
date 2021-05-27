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