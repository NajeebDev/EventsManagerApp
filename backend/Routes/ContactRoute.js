const express = require('express');
const Contact = require('../Models/ContactModel');
const nodemailer = require('nodemailer');
const sendEmail = require('../Utilities/sendEmail')

const router = express.Router();


router.post('/', async (request, response) => {

    const { name, email, phone, date, subject, message } = request.body;

    // Saving the received E-Mail in the Database
    // const NewMessage = new Contact({
    //     name, email, phone, date, subject, message
    // });
    // await NewMessage.save();

    response.send(`Thank you ${name} for contacting us, your E-Mail has been sent !!`)

    const today = Date.now();
    let todayDate = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(today);

    const output = `
    <p>you have a new message</p>
    <ul>
        <li> From: ${name} </li>
        <li> Email: ${email} </li>
        <li> Phone: ${phone} </li>
        <li> Date: ${todayDate} </li>
        <li> Subject: ${subject} </li>
    </ul>
    <p> Message: ${message} </p>

    `

    let transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    let mailOptions = {
        from: email,
        to: process.env.CONTACT_EMAIL,
        subject,
        date,
        phone,
        message,
        html: output
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) throw error;
        console.log('Message sent', info.messageId);
        response.send({ msg: 'Email have been sent' });
    })
});




module.exports = router;