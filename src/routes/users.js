import SecurityUsersService from '../services/security/users'
class SecurityUsersRoute {
    constructor(router) {
		this.router = router;
		this.registerRoutes();
    }
    
    registerRoutes() {
        this.router.post('/v1/authorize', this.sendUserToken.bind(this));
    }

    async sendUserToken(req, res, next) {
		try {
			await SecurityUsersService.sendUserToken(req, res, next);
		} catch (err) {
			return next(err);
		}
	}
}
export default SecurityUsersRoute;