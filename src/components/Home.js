import React, { useEffect, useRef } from 'react';
import Masonry from 'masonry-layout';
import images from '../data/Images'; // Import the image URLs
import { Helmet } from 'react-helmet';
import './Home.css'; // Ensure you have your CSS for styling

// Shuffle function to randomize the array
const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
    return array;
};

const Home = () => {
    const masonryRef = useRef(null);
    
    // Shuffle images on component mount
    const shuffledImages = shuffleArray([...images]); // Create a copy and shuffle

    useEffect(() => {
        const masonry = new Masonry(masonryRef.current, {
            itemSelector: '.gallery-photo',
            columnWidth: '.gallery-photo',
            percentPosition: true,
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
            <Helmet><title>Jake Runyan Photography</title></Helmet>
            {shuffledImages.map((image, index) => (
                <img key={index} src={image} alt={`© Jake Runyan ${index + 1}`} className="gallery-photo" />
            ))}
        </div>
    );
};

export default Home;