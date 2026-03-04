import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSiteConfig } from '../framework/ContentProvider';
import './Navbar.css';
import logo from './static/navbar-logo.png';
import github_dark from './static/github-dark.png';
import github_light from './static/github-light.png';
import instagram_dark from './static/instagram-dark.png';
import instagram_light from './static/instagram-light.png';

const ICON_MAP = {
    github:    { dark: github_light,    light: github_dark    },
    instagram: { dark: instagram_light, light: instagram_dark },
};

const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');

const Navbar = () => {
    const { siteTitle, nav, social } = useSiteConfig();
    const [isDarkMode, setIsDarkMode] = useState(darkModeQuery.matches);

    useEffect(() => {
        const handler = (e) => setIsDarkMode(e.matches);
        darkModeQuery.addEventListener('change', handler);
        return () => darkModeQuery.removeEventListener('change', handler);
    }, []);

    return (
        <nav className="navbar">
            <div className="navbar-left">
                <Link to="/">
                    <img src={logo} alt="Logo" className="logo" />
                </Link>
                <div className="navbar-links">
                    {nav.map(({ label, path }) => (
                        <Link key={path} to={path}>{label}</Link>
                    ))}
                </div>
            </div>
            <div className="navbar-center">
                <h1>{siteTitle}</h1>
            </div>
            <div className="navbar-right">
                {social.map(({ label, url, icon }) => {
                    const icons = ICON_MAP[icon];
                    const src = icons ? (isDarkMode ? icons.dark : icons.light) : null;
                    return (
                        <a key={icon} href={url} target="_blank" rel="noopener noreferrer">
                            {src && <img src={src} alt={label} className="icon" title={label} />}
                        </a>
                    );
                })}
            </div>
        </nav>
    );
};

export default Navbar;
