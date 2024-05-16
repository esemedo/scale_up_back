import { Request, Response } from 'express';
import { createNotif } from '../services/NotificationService';

export const addNotif = async (req: Request, res: Response) => {
    const body = req.body;

    const notif = await createNotif(body);

    res.status(200).json(notif);
};