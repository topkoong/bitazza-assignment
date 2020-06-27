import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';

import { errorHandler } from '../middleware/errors';
import connectDB from '../config/db';

import health from '../routes/health';
import usage from '../routes/usage';
import logUser from '../routes/logUser';

// Connect to database
connectDB();

const app = express();

// middlewares
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(cors());

// Mount routers
app.use('/api/logs', logUser);
app.use(errorHandler);
app.use('/api', health);
app.use('/api', usage);


const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Server is running on port ${port}`));