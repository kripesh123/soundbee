import bcrypt from 'bcrypt'
import models from '../../lib/models'
import AuthHeader from '../../lib/auth-header'

class SecurityUsersService {

    async sendUserToken(req, res, next) {
        const userData = {
            token: '',
            authenticated: false,
            loggedin_failed: false,
            user_settings: null,
        };

        // check if user exists in database and grant or denie access
        const user = await models.User.findOne({
            where: {email: req.body.email.toLowerCase()},
            limit: 1,
            include: [
                {model: models.Role, as: 'roles'},
            ]
        });
        const roles = user.roles.map(item => item.name);

        if (!user) {
            userData.loggedin_failed = true;
            let objJsonB64 = JSON.stringify(userData);
			objJsonB64 = Buffer.from(objJsonB64).toString('base64');
			return res.status(200).send(JSON.stringify(objJsonB64));
        }

        const userPassword = user.password;
        const inputPassword = req.body.password;
        
        bcrypt.compare(inputPassword, userPassword, (err, out) => {
            const jwtOptions = {};
			const payload = {
				scopes: roles,
				jti: user.id
			};
			// convert hour to sec
			jwtOptions.expiresIn = 1 * 60 * 60;
            if (out) {
                userData.token = AuthHeader.encodeUserLoginAuth(payload, jwtOptions);
                userData.authenticated = true;
                userData.loggedin_failed = false;
                let objJsonB64 = JSON.stringify(userData);
                objJsonB64 = Buffer.from(objJsonB64).toString('base64');
                return res.status(200).send(JSON.stringify(objJsonB64));
            } else {
                userData.loggedin_failed = true;
                let objJsonB64 = JSON.stringify(userData);
                objJsonB64 = Buffer.from(objJsonB64).toString('base64');
                return res.status(200).send(JSON.stringify(objJsonB64));
            }
        });
    }
}

export default new SecurityUsersService();