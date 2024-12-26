import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import logo from './static/navbar-logo.png';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <Link to="/">
                    <img src={logo} alt="Logo" className="logo" />
                </Link>
            </div>
            <div className="navbar-title">
                <h1>Photography Portfolio</h1>
            </div>
            <div className="navbar-icons">
                <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer">
                    <img src="path/to/github-icon.png" alt="GitHub" className="icon" />
                </a>
                <a href="https://www.instagram.com/yourusername" target="_blank" rel="noopener noreferrer">
                    <img src="path/to/instagram-icon.png" alt="Instagram" className="icon" />
                </a>
            </div>
        </nav>
    );
};

export default Navbar;