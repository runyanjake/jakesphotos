import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useSiteConfig } from '../framework/ContentProvider';
import './MenuTemplate.css';

export default function CollectionIndexTemplate({ page }) {
    const { collections } = useSiteConfig();
    const { title, description } = page.frontmatter;

    return (
        <div className="menu-page">
            <Helmet><title>{title}</title></Helmet>
            <div className="menu-header">
                <h1>{title}</h1>
                {description && <p className="menu-description">{description}</p>}
            </div>
            <div className="menu-grid">
                {(collections || []).map(col => (
                    <Link key={col.slug} to={col.path} className="menu-card">
                        {col.previewImage && (
                            <img className="menu-card-image" src={col.previewImage} alt={col.label} />
                        )}
                        <div className="menu-card-title">{col.label}</div>
                        {col.description && (
                            <div className="menu-card-desc">{col.description}</div>
                        )}
                    </Link>
                ))}
            </div>
        </div>
    );
}
