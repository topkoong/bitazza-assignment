import * as dotenv from 'dotenv';
dotenv.config();

export const env = process.env.NODE_ENV;
export const mongoUri = process.env.MONGODB_URI;
export const serverPort = process.env.SERVER_PORT;