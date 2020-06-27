import express, { Router } from 'express';
import { nodeProcessUsageController } from '../controllers/usage';

const nodeProcessUsageRouter: Router = express.Router();

nodeProcessUsageRouter.get('/usage', nodeProcessUsageController);

export default nodeProcessUsageRouter;