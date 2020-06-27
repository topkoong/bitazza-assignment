import { Request, Response, NextFunction } from 'express';
export const healthCheckController = (req: Request, res: Response, next: NextFunction) => {
    const healthcheck = {
        uptime: process.uptime(),
        message: 'OK',
        timestamp: Date.now(),
    };
    try {
        res.status(200).json(healthcheck);
    } catch (e) {
        healthcheck.message = e;
        res.status(503).json(healthcheck.message);
    }
}