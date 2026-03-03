import React from 'react';
import { Helmet } from 'react-helmet';
import MarkdownRenderer from '../components/MarkdownRenderer';
import './ContactTemplate.css';

const ContactTemplate = ({ page }) => {
    const { title, email, instagram } = page.frontmatter;
    return (
        <div className="contact-container">
            <Helmet><title>{title}</title></Helmet>
            <div className="contact-content">
                <h1 className="contact-title">{title}</h1>
                {email && (
                    <p className="contact-item">
                        Email: <a href={`mailto:${email}`}>{email}</a>
                    </p>
                )}
                {instagram && (
                    <p className="contact-item">
                        Instagram: <a
                            href={`https://www.instagram.com/${instagram}`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >@{instagram}</a>
                    </p>
                )}
                {page.content && <MarkdownRenderer content={page.content} />}
            </div>
        </div>
    );
};

export default ContactTemplate;
