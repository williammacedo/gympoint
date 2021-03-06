import { Router } from 'express';

import authHeader from './app/middlewares/auth';

import validateStudentStore from './app/validators/StudentStore';
import validateStudentUpdate from './app/validators/StudentUpdate';

import validatePlan from './app/validators/PlanValidation';

import StudentController from './app/controllers/StudentController';
import SessionController from './app/controllers/SessionController';
import PlanController from './app/controllers/PlanController';

const routes = new Router();

routes.post('/sessions', SessionController.store);

routes.use(authHeader);

routes.post('/students', validateStudentStore, StudentController.store);
routes.put('/students/:id', validateStudentUpdate, StudentController.update);

routes.get('/plans', PlanController.index);
routes.post('/plans', validatePlan, PlanController.store);
routes.put('/plans/:id', validatePlan, PlanController.update);
routes.delete('/plans/:id', PlanController.delete);

export default routes;
