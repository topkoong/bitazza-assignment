import { Request, Response, NextFunction } from 'express';

export const nodeProcessUsageController = (req: Request, res: Response, next: NextFunction) => {
    try {
        const usage = {
            uptime: process.uptime(),
            memoryUsage: process.memoryUsage(),
            cpuUsage: process.cpuUsage(),
            timestamp: Date.now(),
            resourceUsage: process.resourceUsage(),
            requestProtocol: req.protocol,
            host: req.get('host'),
            requestURL: req.url,
            originalURL: req.originalUrl,
            requestFullURL: req.protocol + '://' + req.get('host') + req.originalUrl,
            baseUrl: req.baseUrl,
            headerHost: req.headers.host
        };
        res.status(200).json(usage);
    } catch (e) {
        res.status(503).json(e);
    }
};