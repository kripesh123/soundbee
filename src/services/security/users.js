import bcrypt from 'bcrypt'
import models from '../../lib/models'
import parse from '../../lib/parse'
import AuthHeader from '../../lib/auth-header'

class SecurityUsersService {

    async getUserRoles(params) {
		const filter = {};
		const id = parse.getNumberIfValid(params.id);
		if (id) {
			filter.userId = id;
		}

		const email = parse.getString(params.email).toLowerCase();
		if (email && email.length > 0) {
			filter.email = email;
		}
		return await models.UserRole.findAll({ 
            where: filter,
            include: [
                {model: models.User, as: 'user'},
                {model: models.Role, as: 'role'},
              ]
        })
	}

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
            limit: 1
        });

        if (!user) {
            userData.loggedin_failed = true;
            let objJsonB64 = JSON.stringify(userData);
			objJsonB64 = Buffer.from(objJsonB64).toString('base64');
			return res.status(200).send(JSON.stringify(objJsonB64));
        }

        const userPassword = user.password;
        const inputPassword = req.body.password;
        
        bcrypt.compare(inputPassword, userPassword, (err, out) => {
            if (out) {
                userData.token = AuthHeader.encodeUserLoginAuth(user.id);
                userData.authenticated = true;
                userData.loggedin_failed = false;
                this.getUserRoles({id : user.id}).then(data => {
                    userData.user_settings = data;
                    userData.user_settings[0].user.password = '*******';
                    let objJsonB64 = JSON.stringify(userData);
                    objJsonB64 = Buffer.from(objJsonB64).toString('base64');
                    return res.status(200).send(JSON.stringify(objJsonB64));
                })
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