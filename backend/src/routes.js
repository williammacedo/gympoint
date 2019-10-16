import { Router } from 'express';

import authHeader from './app/middlewares/auth';

import StudentController from './app/controllers/StudentController';
import SessionController from './app/controllers/SessionController';

const routes = new Router();

routes.post('/sessions', SessionController.store);

routes.use(authHeader);

routes.post('/students', StudentController.store);

export default routes;
