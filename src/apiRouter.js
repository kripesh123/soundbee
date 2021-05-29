import express from 'express';

import WorkersRoute from './routes/workers';
import SecurityUsersRoute from './routes/users';
import TestsRoute from './routes/tests';
import TakesRoute from './routes/takes'
import TakeAnswersRoute from './routes/takeAnswers';

const apiRouter = express.Router();

new WorkersRoute(apiRouter); 
new SecurityUsersRoute(apiRouter);
new TestsRoute(apiRouter);
new TakesRoute(apiRouter);
new TakeAnswersRoute(apiRouter)

export default apiRouter;