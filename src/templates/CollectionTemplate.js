import React, { useEffect, useMemo, useRef, useState } from 'react';
import Masonry from 'masonry-layout';
import { Helmet } from 'react-helmet';
import Lightbox from '../components/Lightbox';
import './CollectionTemplate.css';

const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

const CollectionTemplate = ({ page }) => {
    const masonryRef = useRef(null);
    const [focusedImage, setFocusedImage] = useState(null);

    const shuffledImages = useMemo(() => shuffleArray([...page.images]), [page.images]);

    useEffect(() => {
        const masonry = new Masonry(masonryRef.current, {
            itemSelector: '.gallery-photo',
            columnWidth: '.gallery-photo',
            percentPosition: true,
        });

        const relayout = () => masonry.layout();
        const imgElements = masonryRef.current.querySelectorAll('img');
        imgElements.forEach(img => img.addEventListener('load', relayout));

        return () => {
            imgElements.forEach(img => img.removeEventListener('load', relayout));
            masonry.destroy();
        };
    }, []);

    return (
        <>
            <Helmet><title>{page.frontmatter.title}</title></Helmet>
            <div className="gallery" ref={masonryRef}>
                {shuffledImages.map((image) => (
                    <img
                        key={image}
                        src={image}
                        alt="© Jake Runyan"
                        className="gallery-photo"
                        style={{ cursor: 'pointer' }}
                        onClick={() => setFocusedImage(image)}
                    />
                ))}
            </div>
            {focusedImage && <Lightbox src={focusedImage} onClose={() => setFocusedImage(null)} />}
        </>
    );
};

export default CollectionTemplate;
