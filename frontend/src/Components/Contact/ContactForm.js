import React, { useState, useContext } from 'react';
import styles from './Contact.module.css';
import { ModalBoxContext } from '../ModalBox/ModalBox';


const ContactForm = () => {

    const [status, setStatus] = useState("Submit");

    const { addModalBox } = useContext(ModalBoxContext);


    const handleSubmit = async (e) => {
        e.preventDefault();

        setStatus("Sending...");

        const { name, phone, email, subject, message } = e.target.elements;

        const today = Date.now();

        let date = new Intl.DateTimeFormat('en-US', {
            year: 'numeric', month: '2-digit', day: '2-digit',
            hour: '2-digit', minute: '2-digit', second: '2-digit'
        }).format(today);

        let details = {
            name: name.value,
            phone: phone.value,
            date: date,
            email: email.value,
            subject: subject.value,
            message: message.value,
        };

        let response = await fetch("http://localhost:7000/contact", {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify(details),
        });

        setStatus("Submit");

        addModalBox(
            <>
                <p>Than you for contacting us.</p>
                <p>Your Message have been sent successfully.</p>
            </>
        )


        // let result = await response.json();
        // alert(result.status);
    };

    return (
        <>
            <h1 className={styles.contact_head}>Get in touch</h1>
            <p className={styles.contact_text}>Want to get in touch? We'd love to hear from you. Here's how you can reach us...</p>
            <form className={styles.contact_form} onSubmit={handleSubmit}>

                <div>
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" required />
                </div>

                <div>
                    <label htmlFor="phone">Phone:</label>
                    <input type="text" id="phone" />
                </div>

                <div>
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" required />
                </div>

                <div>
                    <label htmlFor="subject">Subject:</label>
                    <input type="text" id="subject" />
                </div>

                <div>
                    <label htmlFor="message">Message:</label>
                    <textarea id="message" required />
                </div>

                <button className={styles.btn} type="submit">{status}</button>

            </form>
        </>
    );
};

export default ContactForm;
