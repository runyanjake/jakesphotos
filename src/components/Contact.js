import React from 'react';
import { Helmet } from 'react-helmet';
import './Contact.css';

const Contact = () => {
    return (
        <div className="contact">
            <Helmet><title>Contact</title></Helmet>
            <h1>Contact Me</h1>
            <p>Email: jake@runyan.dev</p>
            <p>Instagram: @jakerunyanphotography</p>
        </div>
    );
};

export default Contact;