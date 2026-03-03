import React from 'react';
import ReactMarkdown from 'react-markdown';
import './MarkdownRenderer.css';

const MarkdownRenderer = ({ content }) => (
    <div className="markdown-body">
        <ReactMarkdown>{content}</ReactMarkdown>
    </div>
);

export default MarkdownRenderer;
