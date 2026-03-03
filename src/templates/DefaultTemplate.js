import React from 'react';
import { Helmet } from 'react-helmet';
import MarkdownRenderer from '../components/MarkdownRenderer';
import './DefaultTemplate.css';

const DefaultTemplate = ({ page }) => {
    const { title, profileImage } = page.frontmatter;
    return (
        <div className="default-container">
            <Helmet><title>{title}</title></Helmet>
            <div className="default-content">
                {profileImage && (
                    <img src={profileImage} alt={title} className="default-profile-image" />
                )}
                <h1 className="default-title">{title}</h1>
                <MarkdownRenderer content={page.content} />
            </div>
        </div>
    );
};

export default DefaultTemplate;
