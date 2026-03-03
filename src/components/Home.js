import React, { useEffect, useMemo, useRef, useState } from 'react';
import Masonry from 'masonry-layout';
import images from '../data/Images';
import { Helmet } from 'react-helmet';
import './Home.css';
import Lightbox from './Lightbox';

const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

const Home = () => {
    const masonryRef = useRef(null);
    const [focusedImage, setFocusedImage] = useState(null);

    // Compute once on mount; avoids a re-shuffle on every render
    const shuffledImages = useMemo(() => shuffleArray([...images]), []);

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
            <div className="gallery" ref={masonryRef}>
                <Helmet><title>Jake Runyan Photography</title></Helmet>
                {shuffledImages.map((image) => (
                    <img key={image} src={image} alt="© Jake Runyan" className="gallery-photo" style={{ cursor: 'pointer' }} onClick={() => setFocusedImage(image)} />
                ))}
            </div>
            {focusedImage && <Lightbox src={focusedImage} onClose={() => setFocusedImage(null)} />}
        </>
    );
};

export default Home;