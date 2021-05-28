import express from 'express';

import WorkersRoute from './routes/workers';
import SecurityUsersRoute from './routes/users';
import TestsRoute from './routes/tests';

const apiRouter = express.Router();

new WorkersRoute(apiRouter); 
new SecurityUsersRoute(apiRouter);
new TestsRoute(apiRouter);

export default apiRouter;