import React from 'react';
import { Helmet } from 'react-helmet';

const Contact = () => {
    return (
        <div className="contact">
            <Helmet><title>Contact</title></Helmet>
            <h1>Contact Me</h1>
            <p>Email: jake@runyan.dev</p>
        </div>
    );
};

export default Contact;