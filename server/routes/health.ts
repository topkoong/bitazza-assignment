import express, { Router } from 'express';
import { healthCheckController } from '../controllers/health';

const healthCheckRouter: Router = express.Router();

healthCheckRouter.get('/health', healthCheckController);

export default healthCheckRouter;