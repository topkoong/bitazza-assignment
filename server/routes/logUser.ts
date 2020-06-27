import express from 'express';
import { logUser, getUserLogs } from '../controllers/logUser';
const router = express.Router();

router
    .route('/')
    .get(getUserLogs);

router
    .route('/userlogs')
    .post(logUser);



export default router;
