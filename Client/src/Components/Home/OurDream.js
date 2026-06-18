import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import './OurDream.css';
import boatride1 from './images/boatride1.jpg';
import boatride2 from './images/boatride2.jpg';
import boatride3 from './images/boatride3.jpg';
import boatride4 from './images/boatride4.jpg';

const recoveryMoments = [
    { src: boatride1, alt: 'KDS rescue dog on a boat ride during recovery' },
    { src: boatride2, alt: 'KDS rescue dogs enjoying a calm boat ride' },
    { src: boatride3, alt: 'Recovered KDS dogs relaxing on a boat ride' },
    { src: boatride4, alt: 'KDS dogs experiencing enrichment on the water' },
];

const OurDream = () => {
    const [selectedImageIndex, setSelectedImageIndex] = useState(null);

    const closeLightbox = () => setSelectedImageIndex(null);
    const showPrevImage = () => {
        setSelectedImageIndex((prev) => {
            if (prev === null) return prev;
            return (prev - 1 + recoveryMoments.length) % recoveryMoments.length;
        });
    };
    const showNextImage = () => {
        setSelectedImageIndex((prev) => {
            if (prev === null) return prev;
            return (prev + 1) % recoveryMoments.length;
        });
    };

    const lightbox = selectedImageIndex !== null ? (
        <div
            className="our-dream-lightbox"
            role="dialog"
            aria-modal="true"
            aria-label="Full-size recovery image"
            onClick={closeLightbox}
        >
            <div className="our-dream-lightbox-content" onClick={(event) => event.stopPropagation()}>
                <button
                    type="button"
                    className="our-dream-lightbox-nav our-dream-lightbox-nav-prev"
                    aria-label="Previous image"
                    onClick={showPrevImage}
                >
                    &#8249;
                </button>

                <button
                    type="button"
                    className="our-dream-lightbox-nav our-dream-lightbox-nav-next"
                    aria-label="Next image"
                    onClick={showNextImage}
                >
                    &#8250;
                </button>

                <button
                    type="button"
                    className="our-dream-lightbox-close"
                    aria-label="Close full-size image"
                    onClick={closeLightbox}
                >
                    &times;
                </button>
                <img
                    src={recoveryMoments[selectedImageIndex].src}
                    alt={recoveryMoments[selectedImageIndex].alt}
                />
                <p className="our-dream-lightbox-count">
                    {selectedImageIndex + 1} / {recoveryMoments.length}
                </p>
            </div>
        </div>
    ) : null;

    useEffect(() => {
        if (selectedImageIndex === null) return undefined;

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
        return () => window.removeEventListener('keydown', handleKeydown);
    }, [selectedImageIndex]);

    return (
        <section className="our-dream-section">
            <div className="our-dream-inner">
                <span className="our-dream-eyebrow">vision for kampot dog sanctuary</span>
                <h2 className="our-dream-title">OUR DREAM</h2>

                <div className="our-dream-copy">
                    <p>
                        We are working to reduce thoughtless backyard breeding of dominant breeds used for status
                        or security, but whose needs are never met, or worse.
                    </p>
                    <p>
                        We do what we can to offer outreach to street dogs in and around Kampot, and we would love
                        to grow this initiative in the future. We want to educate the community on the importance
                        of de-sexing animals for both their health and population control.
                    </p>
                    <p>
                        Your donation can make a world of difference. Help us give these dogs the second chance
                        they deserve.
                    </p>
                    <p>
                        For a detailed list of where your donations will go, please visit our donations page or
                        email us with any questions.
                    </p>
                </div>

                <div className="our-dream-gallery-wrap">
                    <p className="our-dream-gallery-intro">
                        Recovery also means joy. These boat rides showcase rescued dogs rebuilding confidence,
                        feeling safe, and enjoying life again.
                    </p>
                    <div className="our-dream-gallery" aria-label="Boat ride recovery moments">
                        {recoveryMoments.map((item, index) => (
                            <button
                                key={index}
                                type="button"
                                className="our-dream-gallery-card"
                                aria-label={`Open photo ${index + 1} in full size`}
                                onClick={() => setSelectedImageIndex(index)}
                            >
                                <img src={item.src} alt={item.alt} loading="lazy" />
                            </button>
                        ))}
                    </div>
                </div>

                <div className="our-dream-actions">
                    <a href="/donations#payment-methods" className="our-dream-btn our-dream-btn-primary">
                        Help The Dream
                    </a>
                    <a href="/contact" className="our-dream-btn our-dream-btn-secondary">
                        Contact The Team
                    </a>
                </div>
            </div>

            {lightbox && typeof document !== 'undefined' ? createPortal(lightbox, document.body) : null}
        </section>
    );
};

export default OurDream;
