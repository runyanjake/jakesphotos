import React from 'react';
import './HomepageTemplate.css';

function parseSections(content) {
    const parts = content.split(/^## /m);
    return parts
        .filter(part => part.trim())
        .map(part => {
            const lines = part.split('\n');
            const heading = lines[0].trim();
            const rest = lines.slice(1);

            let imageUrl = null;
            const textLines = [];

            for (const line of rest) {
                const imgMatch = line.match(/!\[.*?\]\((.*?)\)/);
                if (imgMatch && !imageUrl) {
                    imageUrl = imgMatch[1];
                } else if (line.trim()) {
                    textLines.push(line.trim());
                }
            }

            return { heading, imageUrl, textLines };
        });
}

export default function HomepageTemplate({ page }) {
    const { frontmatter, content } = page;
    const sections = parseSections(content);

    return (
        <div className="homepage">
            <div className="homepage-hero">
                <h1 className="homepage-hero-title">{frontmatter.title}</h1>
                {frontmatter.subtitle && (
                    <p className="homepage-hero-subtitle">{frontmatter.subtitle}</p>
                )}
            </div>

            <div className="homepage-sections">
                {sections.map((section, i) => (
                    <div
                        key={i}
                        className={`homepage-section ${i % 2 === 0 ? 'image-left' : 'image-right'}`}
                    >
                        {section.imageUrl && (
                            <div className="homepage-section-image">
                                <img src={section.imageUrl} alt={section.heading} />
                            </div>
                        )}
                        <div className="homepage-section-text">
                            <h2>{section.heading}</h2>
                            {section.textLines.map((line, j) => (
                                <p key={j}>{line}</p>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
