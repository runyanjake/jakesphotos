import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import logo from './static/navbar-logo.png';
import github_dark from './static/github-dark.png';
import github_light from './static/github-light.png';

const Navbar = () => {
    const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const githubIcon = isDarkMode ? github_light : github_dark; //Icons are on dark background.

    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <Link to="/">
                    <img src={logo} alt="Logo" className="logo" />
                </Link>
            </div>
            <div className="navbar-title">
                <h1>Jake Runyan Photography</h1>
            </div>
            <div className="navbar-icons">
                <a href="https://github.com/runyanjake/jakesphotos" target="_blank" rel="noopener noreferrer">
                    <img src={githubIcon} alt="GitHub" className="icon" title="This Website's Source Code!"/>
                </a>
            </div>
        </nav>
    );
};

export default Navbar;