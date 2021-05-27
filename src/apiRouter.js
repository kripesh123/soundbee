import express from 'express';

import WorkersRoute from './routes/workers';

const apiRouter = express.Router();

new WorkersRoute(apiRouter); 

export default apiRouter;