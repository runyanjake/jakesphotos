import React from 'react';
import { Link } from 'react-router-dom';
import './MenuTemplate.css';

function parseMenuItems(content) {
    const parts = content.split(/^## /m);
    return parts
        .filter(part => part.trim())
        .map(part => {
            const lines = part.split('\n');
            const headingLine = lines[0].trim();
            const rest = lines.slice(1);

            // Extract label + path from [Label](path), fallback to plain text
            const linkMatch = headingLine.match(/^\[(.+?)\]\((.+?)\)/);
            const label = linkMatch ? linkMatch[1] : headingLine;
            const path = linkMatch ? linkMatch[2] : null;

            let imageUrl = null;
            const descLines = [];

            for (const line of rest) {
                const imgMatch = line.match(/!\[.*?\]\((.*?)\)/);
                if (imgMatch && !imageUrl) {
                    imageUrl = imgMatch[1];
                } else if (line.trim()) {
                    descLines.push(line.trim());
                }
            }

            return { label, path, imageUrl, desc: descLines.join(' ') };
        });
}

export default function MenuTemplate({ page }) {
    const { frontmatter, content } = page;
    const items = parseMenuItems(content);

    return (
        <div className="menu-page">
            <div className="menu-header">
                <h1>{frontmatter.title}</h1>
                {frontmatter.description && (
                    <p className="menu-description">{frontmatter.description}</p>
                )}
            </div>

            <div className="menu-grid">
                {items.map((item, i) => (
                    item.path ? (
                        <Link key={i} to={item.path} className="menu-card">
                            {item.imageUrl && (
                                <img
                                    className="menu-card-image"
                                    src={item.imageUrl}
                                    alt={item.label}
                                />
                            )}
                            <div className="menu-card-title">{item.label}</div>
                            {item.desc && (
                                <div className="menu-card-desc">{item.desc}</div>
                            )}
                        </Link>
                    ) : (
                        <div key={i} className="menu-card">
                            {item.imageUrl && (
                                <img
                                    className="menu-card-image"
                                    src={item.imageUrl}
                                    alt={item.label}
                                />
                            )}
                            <div className="menu-card-title">{item.label}</div>
                            {item.desc && (
                                <div className="menu-card-desc">{item.desc}</div>
                            )}
                        </div>
                    )
                ))}
            </div>
        </div>
    );
}
