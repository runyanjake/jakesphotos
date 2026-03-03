import React from 'react';
import { Link } from 'react-router-dom';
import { useSiteConfig } from '../framework/ContentProvider';
import './Footer.css';

const Footer = () => {
    const { footerCopyright, nav, social } = useSiteConfig();
    return (
        <footer className="footer">
            <div className="footer-links left">
                {social.map(({ label, url }) => (
                    <a key={url} href={url} rel="noopener noreferrer">{label}</a>
                ))}
            </div>
            <div className="footer-title">
                <p>&copy; {new Date().getFullYear()} {footerCopyright}</p>
            </div>
            <div className="footer-links right">
                <Link to="/">Home</Link>
                {nav.map(({ label, path }) => (
                    <Link key={path} to={path}>{label}</Link>
                ))}
            </div>
        </footer>
    );
};

export default Footer;
