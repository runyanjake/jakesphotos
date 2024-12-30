import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import logo from './static/navbar-logo.png';
import github_dark from './static/github-dark.png';
import github_light from './static/github-light.png';
import instagram_dark from './static/instagram-dark.png';
import instagram_light from './static/instagram-light.png';

const Navbar = () => {
    const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const githubIcon = isDarkMode ? github_light : github_dark;
    const instagramIcon = isDarkMode ? instagram_light : instagram_dark;

    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <Link to="/">
                    <img src={logo} alt="Logo" className="logo" />
                </Link>
                <div className="navbar-links">
                    <Link to="/contact">Contact</Link>
                    <Link to="/about">About</Link>
                </div>
            </div>
            <div className="navbar-title">
                <h1>Jake Runyan Photography</h1>
            </div>
            <div className="navbar-icons">
                <a href="https://www.instagram.com/jakerunyanphotography" target="_blank" rel="noopener noreferrer">
                    <img src={instagramIcon} alt="Instagram" className="icon" title="My Instagram" />
                </a>
                <a href="https://github.com/runyanjake/jakesphotos" target="_blank" rel="noopener noreferrer">
                    <img src={githubIcon} alt="GitHub" className="icon" title="This Website's Source Code!" />
                </a>
            </div>
        </nav>
    );
};

export default Navbar;
