import React, { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import './ImageSlider.css';

const sliderContext = require.context('./images/slider', false, /\.(png|jpe?g|webp)$/);

const allImages = sliderContext
    .keys()
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
    .map((key) => sliderContext(key));

const topIndices = [5, 3, allImages.length - 1, 4];
const topImages = topIndices.map((i) => allImages[i]);

const ImageSlider = () => {
    const carouselRef = useRef(null);
    const [selectedImageIndex, setSelectedImageIndex] = useState(null);

    const scroll = (direction) => {
        if (carouselRef.current) {
            carouselRef.current.scrollBy({
                left: direction === 'left' ? -340 : 340,
                behavior: 'smooth',
            });
        }
    };

    const openImage = useCallback((index) => {
        setSelectedImageIndex(index);
    }, []);

    const closeLightbox = useCallback(() => setSelectedImageIndex(null), []);
    const showPrevImage = useCallback(() => {
        setSelectedImageIndex((prev) => {
            if (prev === null) return prev;
            return (prev - 1 + topImages.length) % topImages.length;
        });
    }, []);
    const showNextImage = useCallback(() => {
        setSelectedImageIndex((prev) => {
            if (prev === null) return prev;
            return (prev + 1) % topImages.length;
        });
    }, []);

    const lightbox = selectedImageIndex !== null ? (
        <div
            className="img-slider-lightbox"
            role="dialog"
            aria-modal="true"
            aria-label="Full-size sanctuary slide"
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

                <img src={topImages[selectedImageIndex]} alt={`Sanctuary slide ${selectedImageIndex + 1}`} />
            </div>
        </div>
    ) : null;

    useEffect(() => {
        if (selectedImageIndex === null) return undefined;

        const previousOverflow = document.body.style.overflow;
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
            document.body.style.overflow = previousOverflow;
        };
    }, [selectedImageIndex, closeLightbox, showNextImage, showPrevImage]);

    return (
        <>
        <div className="img-slider-wrapper">
            <button className="img-slider-arrow img-slider-prev" onClick={() => scroll('left')}>&#8249;</button>
            <div className="img-slider-carousel" ref={carouselRef}>
                {topImages.map((src, i) => {
                    return (
                        <button
                            type="button"
                            className={`img-slider-card img-slider-card-button img-slider-card-button--${(i % 3) + 1}`}
                            key={i}
                            onClick={() => openImage(i)}
                            aria-label={`Open sanctuary slide ${i + 1} in full screen`}
                        >
                            <img src={src} alt={`Sanctuary slide ${i + 1}`} />
                        </button>
                    );
                })}
            </div>
            <button className="img-slider-arrow img-slider-next" onClick={() => scroll('right')}>&#8250;</button>
        </div>
            {lightbox && typeof document !== 'undefined' ? createPortal(lightbox, document.body) : null}
        </>
    );
};

export default ImageSlider;
