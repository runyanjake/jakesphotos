import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <p>&copy; {new Date().getFullYear()} Jake Runyan</p>
        </footer>
    );
};

export default Footer;