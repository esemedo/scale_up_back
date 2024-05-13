import { Request, Response } from 'express'; 
import { SendEmailDto,sendEmail } from './../lib/mail.utils';
async function sendRouteEmail(req: Request, res: Response) {
    const params: SendEmailDto = req.body;

    try {
        const result = await sendEmail({
            receiver: params.receiver,
            subject: params.subject,
            message: params.message,
        });

        res.status(200).json({
            accepted: result.accepted
        });
    } catch (error) {
        res.status(500).json({
            message: "Unable to send email this time"
        });
    }
}

export { sendRouteEmail };
