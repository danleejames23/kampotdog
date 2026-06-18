import React from 'react';

const PawConfetti = ({ count = 14 }) => (
    <div className="sb-paws-bg" aria-hidden="true">
        {Array.from({ length: count }).map((_, i) => (
            <span key={i} className="sb-paw">🐾</span>
        ))}
    </div>
);

export default PawConfetti;
