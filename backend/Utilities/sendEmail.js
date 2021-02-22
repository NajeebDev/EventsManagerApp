
const nodemailer = require('nodemailer');

const sendEmail = async (options) => {

    let transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: false,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    const message = {
        from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`, // sender Name & Email address
        to: options.email,
        subject: options.subject,
        Phone: options.Phone,
        text: options.text,
        html: options.html
    }

    let info = await transporter.sendMail(message);

    console.log("Message sent: ", info.messageId);
}

module.exports = sendEmail;