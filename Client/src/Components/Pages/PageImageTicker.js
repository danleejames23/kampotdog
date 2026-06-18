import React, { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import '../Home/ImageSlider.css';

const sliderContext = require.context('../Home/images/slider', false, /\.(png|jpe?g|webp)$/);

const allImages = sliderContext
    .keys()
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
    .map((key) => sliderContext(key));

const topIndices = new Set([5, 3, allImages.length - 1, 4]);
const restImages = allImages.filter((_, i) => !topIndices.has(i));

const group1 = restImages.slice(0, 9);
const group2 = restImages.slice(9, 18);
const group3 = restImages.slice(18);

export const PAGE_IMAGE_GROUPS = { vetdebt: group1, donations: group2, adopt: group3 };

const PageImageTicker = ({ page, lightboxEnabled = true, showControls = false }) => {
    const imgs = PAGE_IMAGE_GROUPS[page] || group1;
    const trackRef = useRef(null);
    const animRef = useRef(null);
    const posRef = useRef(0);
    const pausedRef = useRef(false);
    const [selectedImageIndex, setSelectedImageIndex] = useState(null);

    const stepLeft = useCallback(() => {
        pausedRef.current = true;
        posRef.current += 320;
        if (trackRef.current) {
            trackRef.current.style.transform = `translateX(${posRef.current}px)`;
        }
    }, []);

    const stepRight = useCallback(() => {
        pausedRef.current = true;
        posRef.current -= 320;
        if (trackRef.current) {
            trackRef.current.style.transform = `translateX(${posRef.current}px)`;
        }
    }, []);

    const closeLightbox = useCallback(() => setSelectedImageIndex(null), []);
    const showPrevImage = useCallback(() => {
        setSelectedImageIndex((prev) => {
            if (prev === null) return prev;
            return (prev - 1 + imgs.length) % imgs.length;
        });
    }, [imgs.length]);
    const showNextImage = useCallback(() => {
        setSelectedImageIndex((prev) => {
            if (prev === null) return prev;
            return (prev + 1) % imgs.length;
        });
    }, [imgs.length]);

    const lightbox = lightboxEnabled && selectedImageIndex !== null ? (
        <div
            className="img-slider-lightbox"
            role="dialog"
            aria-modal="true"
            aria-label="Full-size sanctuary image"
            onClick={closeLightbox}
        >
            <div className="img-slider-lightbox-content" onClick={(event) => event.stopPropagation()}>
                <button
                    type="button"
                    className="img-slider-lightbox-nav img-slider-lightbox-nav-prev"
                    aria-label="Previous image"
                    onClick={showPrevImage}
                >
                    &#8249;
                </button>

                <button
                    type="button"
                    className="img-slider-lightbox-nav img-slider-lightbox-nav-next"
                    aria-label="Next image"
                    onClick={showNextImage}
                >
                    &#8250;
                </button>

                <button
                    type="button"
                    className="img-slider-lightbox-close"
                    aria-label="Close full-size image"
                    onClick={closeLightbox}
                >
                    &times;
                </button>

                <img src={imgs[selectedImageIndex]} alt={`Sanctuary ${selectedImageIndex + 1}`} />
            </div>
        </div>
    ) : null;

    useEffect(() => {
        if (!imgs.length) return;
        const el = trackRef.current;
        if (!el) return;
        const tick = () => {
            if (!pausedRef.current) {
                posRef.current -= 0.5;
                const half = el.scrollWidth / 2;
                if (Math.abs(posRef.current) >= half) posRef.current = 0;
                el.style.transform = `translateX(${posRef.current}px)`;
            }
            animRef.current = requestAnimationFrame(tick);
        };
        animRef.current = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(animRef.current);
    }, [imgs]);

    useEffect(() => {
        if (selectedImageIndex === null) return undefined;

        const originalOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';

        const handleKeydown = (event) => {
            if (event.key === 'Escape') {
                closeLightbox();
            } else if (event.key === 'ArrowLeft') {
                showPrevImage();
            } else if (event.key === 'ArrowRight') {
                showNextImage();
            }
        };

        window.addEventListener('keydown', handleKeydown);
        return () => {
            window.removeEventListener('keydown', handleKeydown);
            document.body.style.overflow = originalOverflow;
        };
    }, [selectedImageIndex, showNextImage, showPrevImage, closeLightbox]);

    return (
        <>
            <div
                className="img-ticker-viewport"
                onMouseEnter={() => { pausedRef.current = true; }}
                onMouseLeave={() => { pausedRef.current = false; }}
            >
                <div className="img-ticker-track" ref={trackRef}>
                    {[...imgs, ...imgs].map((src, i) => (
                        <button
                            key={i}
                            type="button"
                            className="img-ticker-card"
                            aria-label={`Sanctuary image ${((i % imgs.length) || imgs.length)}`}
                            onClick={() => {
                                if (lightboxEnabled) {
                                    setSelectedImageIndex(i % imgs.length);
                                }
                            }}
                        >
                            <img src={src} alt={`Sanctuary ${i + 1}`} />
                        </button>
                    ))}
                </div>
            </div>

            {showControls ? (
                <div className="img-ticker-controls" aria-label="Carousel controls">
                    <button
                        type="button"
                        className="img-slider-arrow-hidden img-slider-prev"
                        onClick={stepLeft}
                        aria-label="Show previous images"
                    >
                        &#8249;
                    </button>
                    <button
                        type="button"
                        className="img-slider-arrow-hidden img-slider-next"
                        onClick={stepRight}
                        aria-label="Show next images"
                    >
                        &#8250;
                    </button>
                </div>
            ) : null}

            {lightbox && typeof document !== 'undefined' ? createPortal(lightbox, document.body) : null}
        </>
    );
};

export default PageImageTicker;
