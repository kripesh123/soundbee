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
			const data = await SecurityTokensService.sendUserToken(req);
			return res.send(data);
		} catch (err) {
			return next(err);
		}
	}
}