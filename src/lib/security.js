import jwt from 'jsonwebtoken';
import expressJwt from 'express-jwt';
import settings from './settings';

const DEVELOPER_MODE = settings.developerMode === true;
const SET_TOKEN_AS_REVOKEN_ON_EXCEPTION = true;

const PATHS_WITH_OPEN_ACCESS = [
	'/api/v1/authorize',
	/\/ajax\//i
];

const scope = {
	ADMIN: 'admin',
	DASHBOARD: 'dashboard',
	READ_TESTS: 'read:test',
	WRITE_TESTS: 'write:test',
	READ_WORKERS: 'read:workers',
	WRITE_WORKERS: 'write:workers',
	READ_SITEMAP: 'read:sitemap',
	READ_SETTINGS: 'read:settings',
	WRITE_SETTINGS: 'write:settings',
};

const checkUserScope = (requiredScope, req, res, next) => {
	if (DEVELOPER_MODE === true) {
		next();
	} else if (
		req.user &&
		req.user.scopes &&
		req.user.scopes.length > 0 &&
		(req.user.scopes.includes(scope.ADMIN) ||
			req.user.scopes.includes(requiredScope))
	) {
		next();
	} else {
		res.status(403).send({ error: true, message: 'Forbidden' });
	}
};

const verifyToken = token =>
	new Promise((resolve, reject) => {
		jwt.verify(token, settings.jwtSecretKey, (err, decoded) => {
			if (err) {
				reject(err);
			} else {
				// check on blacklist
				resolve(decoded);
			}
		});
	});

const checkTokenInBlacklistCallback = async (req, payload, done) => {
	try {
        const { jti } = payload;
        // Get Token Black List from Database
		const blacklist = [];
		const tokenIsRevoked = blacklist.includes(jti);
		return done(null, tokenIsRevoked);
	} catch (e) {
		done(e, SET_TOKEN_AS_REVOKEN_ON_EXCEPTION);
	}
};

const applyMiddleware = app => {
	if (DEVELOPER_MODE === false) {
		app.use(
			expressJwt({
				secret: settings.jwtSecretKey,
                isRevoked: checkTokenInBlacklistCallback,
                algorithms: ['RS256']
			}).unless({ path: PATHS_WITH_OPEN_ACCESS })
		);
	}
};

const getAccessControlAllowOrigin = () =>
    [settings.platformBaseUrl, settings.adminBaseURL] || '*';
    
export default {
	checkUserScope,
	scope,
	verifyToken,
	applyMiddleware,
	getAccessControlAllowOrigin,
	DEVELOPER_MODE
};
