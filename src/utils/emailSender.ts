import nodemailer from 'nodemailer';
import ejs from 'ejs';
import path from 'path';

export const sendMail = async (email: any, subject: any, data: any) => {
  try {
    const html: string = await ejs.renderFile(
      path.join(__dirname, '..', 'views', 'email.ejs'),
      { data: data },
    );
    const transporter = nodemailer.createTransport({
      host: process.env.HOST,
      service: process.env.SERVICE,
      // port: 587,
      port: 465,
      secure: true,
      auth: {
        user: process.env.USER,
        pass: process.env.PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.USER,
      to: email,
      subject: subject,
      html: html,
    });
  } catch (error: any) {
    throw new Error(error);
  }
};
