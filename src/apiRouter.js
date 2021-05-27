import express from 'express';

import WorkersRoute from './routes/workers';
import SecurityUsersRoute from './routes/users';

const apiRouter = express.Router();

new WorkersRoute(apiRouter); 
new SecurityUsersRoute(apiRouter);

export default apiRouter;