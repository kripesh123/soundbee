import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import AuthHeader from './lib/auth-header';
import serverSettings from './lib/settings';
import models from './lib/models'
import AudioBeeClient from './client-audiobee/index';

// cost factor for hashes
const { saltRounds } = serverSettings;

const ajaxRouter = express.Router();
const TOKEN_PAYLOAD = { email: 'store', scopes: ['admin'] };
const STORE_ACCESS_TOKEN = jwt.sign(TOKEN_PAYLOAD, serverSettings.jwtSecretKey); 

const api = new AudioBeeClient({
	apiBaseUrl: serverSettings.apiBaseUrl,
	apiToken: STORE_ACCESS_TOKEN
});

const TESTS_CACHE_CONTROL = 'public, max-age=60';
const TEST_DETAILS_CACHE_CONTROL = 'public, max-age=60';

ajaxRouter.post('/register', async (req, res, next) => {

    // set data for response
    const data = {
        status: false,
        isRightToken: true,
        isWorkerSaved: false
    };
    const filter = {
        email: req.body.email
    };
    // check if url params contains token MOCKING
    const requestToken = await `${AuthHeader.encodeUserLoginAuth(
		req.body.name
	)}xXx${AuthHeader.encodeUserLoginAuth(req.body.email)}xXx${
		req.body.password
	}`;
    
    if(requestToken && !data.status) {
        const requestTokenArray = requestToken.split('xXx');

		// if requestToken array has no splitable part response token is wrong
		if (requestTokenArray.length < 1) {
			data.isRightToken = false;
			res.status('200').send(data);
			return false;
        }
        
        (async () => {
			// decode token parts and check if valid email is the second part of them
			const name = await AuthHeader.decodeUserLoginAuth(
				requestTokenArray[0]
			).userId;
		
			const eMail = await AuthHeader.decodeUserLoginAuth(requestTokenArray[1])
				.userId;
			const passWord = requestTokenArray[2];

			if (
				requestTokenArray.length < 1 ||
				!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
					eMail
				)
			) {
				// if (requestTokenArray.length < 1) {
				data.isRightToken = false;
				res.status('200').send(data);
				return false;
			}

			// check once if worker email is existig in database
			filter.email = eMail;
			await api.workers.list(filter).then(({ status, json }) => {
				if (json.data.length > 0) {
					// data.isWorkerSaved = true;
					res.status(status).send(data);
					return false;
				}
			});
			// generate password-hash
			const salt = bcrypt.genSaltSync(saltRounds);
			const hashPassword = bcrypt.hashSync(passWord, salt);

			const workerDraft = {
				name: name,
				email: eMail.toLowerCase(),
				password: hashPassword
			};

			// create new worker in database
			await api.workers.create(workerDraft).then(({ status, json }) => {
				if(json.error){
					
				} else {
					data.isWorkerSaved = true;
					return res.status(status).send(data);
				}
			});
			return true;
		})();
    }

    // send worker a doi email
	async function registerWorker() {
        if(data.status) {
            const tokenConcatString = `${AuthHeader.encodeUserLoginAuth(
				req.body.name
			)}xXx${AuthHeader.encodeUserLoginAuth(req.body.email)}xXx${
				req.body.password
            }`;
            // TODO - send tokenConcatString to worker's email
            await Promise.all([res.status('200').send(data)])
        }
        return false;
    }

    // check if worker exist in database
	if (!requestToken) {
		await api.workers.list(filter).then(({ status, json }) => {
			if (json.data.length > 0) {
				res.status(status).send(data);
				return false;
			}
			data.status = true;
			registerWorker();
		});
	}
})

ajaxRouter.post('/login', async (req, res, next) => {
	const workerData = {
		token: '',
		authenticated: false,
		loggedin_failed: false,
		worker_settings: null,
	};

	
	// check if worker exists in database and grant or denie access
	const result = await await models.Worker.findOne({
		where: {email: req.body.email.toLowerCase()},
		limit: 1
	});

	if (!result) {
		api.workers.list().then(({ status, json }) => {
			workerData.loggedin_failed = true;
			let objJsonB64 = JSON.stringify(workerData);
			objJsonB64 = Buffer.from(objJsonB64).toString('base64');
			return res.status(status).send(JSON.stringify(objJsonB64));
		});
		return;
	}
	const workerPassword = result.password;
	const inputPassword = req.body.password;
	bcrypt.compare(inputPassword, workerPassword, async (err, out) => {
		if (out == true) {
			workerData.token = AuthHeader.encodeUserLoginAuth(result.id);
			workerData.authenticated = true;

			await api.workers.retrieve(result.id).then(({ status, json }) => {
				workerData.worker_settings = json;
				workerData.worker_settings.password = '*******';

				let objJsonB64 = JSON.stringify(workerData);
				objJsonB64 = Buffer.from(objJsonB64).toString('base64');
				return res.status(status).send(JSON.stringify(objJsonB64));	
			});
			return true;
		}
		workerData.loggedin_failed = true;
		let objJsonB64 = JSON.stringify(workerData);
		objJsonB64 = Buffer.from(objJsonB64).toString('base64');
		res.status(200).send(JSON.stringify(objJsonB64));
	});
})

ajaxRouter.get('/tests', (req, res) => {
	const filter = req.query;
	filter.isActive = true;
	api.tests.list(filter).then(({ status, json }) =>
		res
			.status(status)
			.header('Cache-Control', TESTS_CACHE_CONTROL)
			.send(json)
	);
});

ajaxRouter.get('/tests/:id', (req, res) => {
	api.tests.retrieve(req.params.id).then(({ status, json }) =>
		res
			.status(status)
			.header('Cache-Control', TEST_DETAILS_CACHE_CONTROL)
			.send(json)
	);
});

ajaxRouter.get('/tests/:id/questions', (req, res) => {
	api.questions.retrieve(req.params.id).then(({status, json}) =>
		res.status(status).send(json)
	);
})

ajaxRouter.get('/tests/:id/questions/:questionId/answers', (req, res) => {
	api.answers.retrieve(req.params.id, req.params.questionId).then(({status, json}) => {
		res.status(status).send(json)
	})
})

ajaxRouter.post('/takes', async (req, res, next) => {
	api.takes.create(req.body).then(({status, json}) => {
		res.status(status).send(json)
	})
})

ajaxRouter.post('/takeAnswers', async (req, res, next) => {
	api.takeAnswers.create(req.body).then(({status, json}) => {
		res.status(status).send(json)
	})
})

export default ajaxRouter;