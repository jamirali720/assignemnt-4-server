import nodemailer from 'nodemailer';
import configs from '../configs';

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: configs.NODE_ENV === 'production', // Use `true` for port 465, `false` for all other ports
  auth: {
    user: 'jamirali720@gmail.com',
    pass: 'leos ftyj piiz ukaj',
  },
});

export const sendContactEmail = async (emailData: { email: string; subject: string; text: string; html: string }) => {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: configs.adminEmail,
    to: emailData.email, // list of receivers
    subject: emailData.subject, // Subject line
    text: emailData.text, // plain text body
    html: emailData.html, // html body
  });

  console.log('Message sent: %s', info.messageId);
  return info.messageId;
};
