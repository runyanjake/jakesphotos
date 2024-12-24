import React from 'react';

const Home = () => {
    // Use require.context to load all images from the static/photos directory
    const importAll = (r) => {
        let images = {};
        r.keys().forEach((item) => { images[item.replace('./', '')] = r(item); });
        return images;
    };

    const images = importAll(require.context('../../static/photos', false, /\.(png|jpe?g|svg)$/));

    return (
        <div className="gallery">
            {Object.keys(images).map((key, index) => (
                <img key={index} src={images[key]} alt={`Jake Runyan ${index + 1}`} className="gallery-photo" />
            ))}
        </div>
    );
};

export default Home;