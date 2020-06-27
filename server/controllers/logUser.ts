import { Request, Response, NextFunction } from 'express';
import User from '../models/User';
import Logs from '../models/Logs';
import ErrorResponse from '../middleware/utils/errorResponse';

const updateLogs = async (user, res: Response) => {
    const logs = await Logs.findOneAndUpdate({ name: 'Logs' }, { $push: { userLogs: { user: user._id } } });
    res.status(201).json({
        success: true,
        user,
        logs
    });
}

export const logUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (req.header('X-Auth-Token-Msg') === 'bIt@zza-@ss|gnmEnt') {
            const { email } = req.body;
            if (email) {
                const existingUser = await User.exists({ email });
                if (!existingUser) {
                    const newUser = await User.create({ email });
                    if (newUser) {
                        const existingLogs = await Logs.exists({ name: 'Logs' });
                        if (!existingLogs) {
                            const logs = new Logs({ name: 'Logs', userLogs: [{ user: newUser._id }] });
                            await logs.save();
                            res.status(201).json({
                                success: true,
                                user: newUser,
                                logs
                            });
                        } else {
                            await updateLogs(newUser, res);
                        }
                    } else {
                        next(
                            new ErrorResponse(`We're not able to create the following email: ${req.body.email}`, 404)
                        );
                    }
                } else {
                    const user = await User.findOne({ email });
                    await updateLogs(user, res);
                }
            } else {
                next(
                    new ErrorResponse(`Please enter a valid email`, 404)
                );
            }
        } else {
            next(
                new ErrorResponse(`No authorization header is found`, 401)
            );
        }

    } catch (error) {
        next(
            new ErrorResponse(`We're not able to find/create the following email: ${req.body.email}`, 404)
        );
    }

}

export const getUserLogs = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (req.header('X-Auth-Token-Msg') === 'bIt@zza-@ss|gnmEnt') {
            const logs = await Logs.find().populate('userLogs');
            res.status(200).json({
                success: true,
                logs
            });
        } else {
            next(
                new ErrorResponse(`No authorization header is found`, 401)
            );
        }
    } catch (error) {
        next(
            new ErrorResponse(`We're not able to retrieve any users from the logs`, 404)
        );
    }
}