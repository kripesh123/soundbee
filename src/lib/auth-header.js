import jwt from 'jsonwebtoken';
import serverConfigs from '../../config/server';

const cert = serverConfigs.jwtSecretKey;
class AuthHeader {
	encodeUserLoginAuth(userId, options) {
		return jwt.sign({ userId }, cert, options);
	}

	decodeUserLoginAuth(token) {
		try {
			return jwt.verify(token, cert);
		} catch (error) {
			return error;
		}
	}

	encodeUserPassword(token) {
		return jwt.sign({ password: token }, cert);
	}

	decodeUserPassword(token) {
		return jwt.verify(token, cert);
	}
}
export default new AuthHeader();
