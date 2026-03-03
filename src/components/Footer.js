import React from 'react';
import { Link } from 'react-router-dom';
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
                <Link to="/">Home</Link>
                <Link to="/contact">Contact</Link>
                <Link to="/about">About</Link>
            </div>
        </footer>
    );
};

export default Footer;