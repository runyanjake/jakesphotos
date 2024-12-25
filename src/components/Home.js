import React, { useEffect, useRef } from 'react';
import Masonry from 'masonry-layout';
import './Home.css'; // Global styles

const Home = () => {
    const masonryRef = useRef(null);

    // Use require.context to load all images from the static/photos directory
    const importAll = (r) => {
        let images = {};
        r.keys().forEach((item) => { images[item.replace('./', '')] = r(item); });
        return images;
    };

    const images = importAll(require.context('../../static/photos', false, /\.(png|jpe?g|svg)$/));

    useEffect(() => {
        // Initialize Masonry after images have loaded
        const masonry = new Masonry(masonryRef.current, {
            itemSelector: '.gallery-photo',
            columnWidth: '.gallery-photo',
            percentPosition: true,
            horizontalOrder: true,
        });

        // Layout Masonry after all images have loaded
        const imgLoad = images => {
            const imgLoad = images.map(img => {
                return new Promise((resolve) => {
                    const imgElement = new Image();
                    imgElement.src = img;
                    imgElement.onload = resolve;
                });
            });
            return Promise.all(imgLoad);
        };

        imgLoad(Object.values(images)).then(() => {
            masonry.layout();
        });

        return () => {
            masonry.destroy(); // Cleanup on unmount
        };
    }, [images]);

    return (
        <div className="gallery" ref={masonryRef}>
            {Object.keys(images).map((key, index) => (
                <img key={index} src={images[key]} alt={`Jake Runyan ${index + 1}`} className="gallery-photo" />
            ))}
        </div>
    );
};

export default Home;