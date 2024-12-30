import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-links left">
                <a href="https://github.com/runyanjake/jakesphotos" rel="noopener noreferrer">GitHub</a>
                <a href="https://www.instagram.com/jakerunyanphotography" rel="noopener noreferrer">Instagram</a>
            </div>
            <div className="footer-title">
                <p>&copy; {new Date().getFullYear()} Jake Runyan</p>
            </div>
            <div className="footer-links right">
                <a href="/">Home</a>
                <a href="/contact">Contact</a>
                <a href="/about">About</a>
            </div>
        </footer>
    );
};

export default Footer;