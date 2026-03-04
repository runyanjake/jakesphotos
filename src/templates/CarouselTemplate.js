import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import './CarouselTemplate.css';

const VISIBLE = 3;
const AUTOPLAY_DELAY = 4000;

function parseSlides(content) {
    const parts = content.split(/^## /m);
    return parts
        .filter(part => part.trim())
        .map(part => {
            const lines = part.split('\n');
            const headingLine = lines[0].trim();
            const rest = lines.slice(1);

            const linkMatch = headingLine.match(/^\[(.+?)\]\((.+?)\)/);
            const label = linkMatch ? linkMatch[1] : headingLine;
            const path = linkMatch ? linkMatch[2] : null;

            let imageUrl = null;
            for (const line of rest) {
                const imgMatch = line.match(/!\[.*?\]\((.*?)\)/);
                if (imgMatch) { imageUrl = imgMatch[1]; break; }
            }

            return { label, path, imageUrl };
        })
        .filter(s => s.imageUrl);
}

function buildTrack(slides) {
    // Prepend last VISIBLE slides, append first VISIBLE slides as clones.
    // Real slides start at trackIndex = VISIBLE.
    const pre = slides.slice(-VISIBLE);
    const post = slides.slice(0, VISIBLE);
    return [...pre, ...slides, ...post];
}

export default function CarouselTemplate({ page }) {
    const { frontmatter, content } = page;
    const slides = parseSlides(content);
    const count = slides.length;
    const track = buildTrack(slides);

    // Start positioned at the first real slide (after the prepended clones)
    const [trackIndex, setTrackIndex] = useState(VISIBLE);
    const [animated, setAnimated] = useState(true);
    const [paused, setPaused] = useState(false);
    const timerRef = useRef(null);

    const advance = useCallback(() => setTrackIndex(i => i + 1), []);

    const startTimer = useCallback(() => {
        clearInterval(timerRef.current);
        timerRef.current = setInterval(advance, AUTOPLAY_DELAY);
    }, [advance]);

    useEffect(() => {
        if (!paused) startTimer();
        else clearInterval(timerRef.current);
        return () => clearInterval(timerRef.current);
    }, [paused, startTimer]);

    // After the CSS transition lands in the clone zone, snap silently to the real equivalent
    const handleTransitionEnd = useCallback(() => {
        if (trackIndex >= count + VISIBLE) {
            setAnimated(false);
            setTrackIndex(VISIBLE);
        } else if (trackIndex < VISIBLE) {
            setAnimated(false);
            setTrackIndex(count);
        }
    }, [trackIndex, count]);

    // Re-enable animation on the next two frames after a silent snap
    useEffect(() => {
        if (!animated) {
            const f1 = requestAnimationFrame(() => {
                const f2 = requestAnimationFrame(() => setAnimated(true));
                return () => cancelAnimationFrame(f2);
            });
            return () => cancelAnimationFrame(f1);
        }
    }, [animated]);

    const handlePrev = () => { setTrackIndex(i => i - 1); if (!paused) startTimer(); };
    const handleNext = () => { setTrackIndex(i => i + 1); if (!paused) startTimer(); };
    const goTo = (slideIndex) => { setTrackIndex(slideIndex + VISIBLE); if (!paused) startTimer(); };

    // Which real slide is at the left edge of the window (for dots)
    const activeSlide = ((trackIndex - VISIBLE) % count + count) % count;

    if (!count) return null;

    return (
        <>
            <Helmet><title>{frontmatter.title}</title></Helmet>
            <div
                className="carousel"
                onMouseEnter={() => setPaused(true)}
                onMouseLeave={() => setPaused(false)}
            >
                <div
                    className="carousel-track"
                    style={{
                        transform: `translateX(calc(-${trackIndex * 100 / 3}vw))`,
                        transition: animated ? 'transform 1.2s ease' : 'none',
                    }}
                    onTransitionEnd={handleTransitionEnd}
                >
                    {track.map((slide, i) => (
                        <div key={i} className="carousel-slide">
                            {slide.path ? (
                                <Link to={slide.path} className="carousel-slide-inner">
                                    <img className="carousel-image" src={slide.imageUrl} alt={slide.label} />
                                    <div className="carousel-caption">{slide.label}</div>
                                </Link>
                            ) : (
                                <div className="carousel-slide-inner">
                                    <img className="carousel-image" src={slide.imageUrl} alt={slide.label} />
                                    <div className="carousel-caption">{slide.label}</div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                <button className="carousel-btn carousel-btn-prev" onClick={handlePrev} aria-label="Previous">&#8249;</button>
                <button className="carousel-btn carousel-btn-next" onClick={handleNext} aria-label="Next">&#8250;</button>

                <div className="carousel-dots">
                    {slides.map((_, i) => (
                        <button
                            key={i}
                            className={`carousel-dot${i === activeSlide ? ' active' : ''}`}
                            onClick={() => goTo(i)}
                            aria-label={`Go to slide ${i + 1}`}
                        />
                    ))}
                </div>
            </div>
        </>
    );
}
