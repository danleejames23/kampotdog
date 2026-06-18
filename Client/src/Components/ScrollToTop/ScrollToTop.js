import React, { useState, useEffect } from 'react';
import './ScrollToTop.css';

const ScrollToTop = () => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const onScroll = () => setVisible(window.scrollY > 300);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const scrollUp = () => window.scrollTo({ top: 0, behavior: 'smooth' });

    return (
        <button
            className={`scroll-top-btn ${visible ? 'scroll-top-btn--visible' : ''}`}
            onClick={scrollUp}
            aria-label="Scroll to top"
        >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="22" height="22">
                <polyline points="18 15 12 9 6 15"/>
            </svg>
            <span>🐾</span>
        </button>
    );
};

export default ScrollToTop;
