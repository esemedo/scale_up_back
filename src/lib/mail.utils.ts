import nodemailer from 'nodemailer';
import SMTPTransport from "nodemailer/lib/smtp-transport";

const transport = nodemailer.createTransport({
    
    host: "live.smtp.mailtrap.io",
    port: 587,
    auth: {
      user: "api",
      pass: "957d3f6f4c8b0740c6381a430df69f49"
    }
} as SMTPTransport.Options);

export type SendEmailDto = {
    receiver: string;
    subject: string;
    message: string;
}

export const sendEmail = async (dto: SendEmailDto)=>{
    const { receiver, subject, message } = dto;

    return await transport.sendMail({
        from:"info@demomailtrap.com",
        to:receiver,
        subject,
        text:message,
    })
}