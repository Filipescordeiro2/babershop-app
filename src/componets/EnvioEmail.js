import React, { useRef } from 'react';
import emailjs from 'emailjs-com';

export const ContactUs = () => {
    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();

        const formData = new FormData(form.current);
        const templateParams = {};
        formData.forEach((value, key) => {
            templateParams[key] = value;
        });

        emailjs.sendForm('gmailMessage', 'template_q1qwjy9', templateParams, 'OKM0SJIN2jhnhSTSJ')
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });
    };

    return (
        <form ref={form} onSubmit={sendEmail}>
            <label>Nome</label>
            <input type="text" name="user_name" />
            <label>E-mail</label>
            <input type="email" name="user_email" />
            <input type="submit" value="Enviar" />
        </form>
    );
};
