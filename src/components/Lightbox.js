import React, { useEffect, useState } from 'react';
import './Lightbox.css';

const Lightbox = ({ src, onClose }) => {
    const [closing, setClosing] = useState(false);

    useEffect(() => {
        if (!closing) return;
        const t = setTimeout(onClose, 200);
        return () => clearTimeout(t);
    }, [closing, onClose]);

    useEffect(() => {
        const onKey = (e) => { if (e.key === 'Escape') setClosing(true); };
        document.addEventListener('keydown', onKey);
        return () => document.removeEventListener('keydown', onKey);
    }, []);

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => { document.body.style.overflow = ''; };
    }, []);

    return (
        <div
            className={`lightbox-overlay${closing ? ' closing' : ''}`}
            onClick={() => setClosing(true)}
            role="dialog"
            aria-modal="true"
        >
            <button className="lightbox-close" onClick={() => setClosing(true)} aria-label="Close">✕</button>
            <img
                className="lightbox-image"
                src={src}
                alt="Full size"
                onClick={() => setClosing(true)}
            />
        </div>
    );
};

export default Lightbox;
