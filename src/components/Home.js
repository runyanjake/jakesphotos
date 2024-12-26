import React, { useEffect, useRef } from 'react';
import Masonry from 'masonry-layout';
import images from '../data/Images'; // Import the image URLs
import './Home.css'; // Ensure you have your CSS for styling

const Home = () => {
    const masonryRef = useRef(null);

    useEffect(() => {
        const masonry = new Masonry(masonryRef.current, {
            itemSelector: '.gallery-photo',
            columnWidth: '.gallery-photo',
            percentPosition: true
        });

        // Layout Masonry after images have loaded
        const imagesLoaded = () => {
            masonry.layout();
        };

        // Add event listener for image load
        const imgElements = masonryRef.current.querySelectorAll('img');
        imgElements.forEach(img => {
            img.addEventListener('load', imagesLoaded);
        });

        return () => {
            imgElements.forEach(img => {
                img.removeEventListener('load', imagesLoaded);
            });
        };
    }, []);

    return (
        <div className="gallery" ref={masonryRef}>
            {images.map((image, index) => (
                <img key={index} src={image} alt={`Jake Runyan ${index + 1}`} className="gallery-photo" />
            ))}
        </div>
    );
};

export default Home;