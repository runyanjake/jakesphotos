import React from 'react';
import './About.css';

const About = () => {
    return (
        <div className="about-container">
            <div className="about-content">
                <img 
                    src="https://gallery.whitney.rip/api/v1/t/287329d8835b299400819437c9c2a2d192041159/2tdm690t/fit_4096" 
                    alt="Jake" 
                    className="about-image" 
                />
                <h1 className="about-title">About Me</h1>
                <p>
                    I'm Jake, a small time photographer out of the Bay Area. I started shooting as a kid on my dad's old 
                    Canon EOS 60D, and now have graduated to owning my own gear. Having an artistic outlet has always been
                    a force of balance for me, and with a background in video and photo editing, this has been a fun one.
                </p>
                <p>
                    My current setup is a Sony Alpha 6300 with a 27mm pancake lens. This budget setup was perfect for bringing
                    my camera along on bike rides, as cycing is another hobby. You can find me on Youtube as Jake's West Coast.
                    My current photography interests include capturing the beauty of the Bay Area and California coast on 
                    our bike rides, as well as moments in my everyday life.
                </p>
                <p>
                    If you'd like to learn more about Jake, the person, you can find more at my instagram @runyanjake or on my 
                    personal website jake.runyan.dev.
                </p>
            </div>
        </div>
    );
};

export default About;
