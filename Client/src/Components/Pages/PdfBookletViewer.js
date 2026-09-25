import React, { useMemo, useState } from 'react';

const TOTAL_PAGES = 18;

const PdfBookletViewer = ({ title, subtitle }) => {
    const [page, setPage] = useState(1);

    const imageUrl = useMemo(() => `/booklet/p${page}.png`, [page]);

    const goPrev = () => setPage((currentPage) => Math.max(1, currentPage - 1));
    const goNext = () => setPage((currentPage) => Math.min(TOTAL_PAGES, currentPage + 1));

    const isFirstPage = page === 1;
    const isLastPage = page === TOTAL_PAGES;

    return (
        <section className="kds-section booklet-section">
            <div className="booklet-card">
                <div className="booklet-card-header">
                    <div>
                        <h2 className="kds-section-title booklet-title">{title}</h2>
                        <p className="kds-section-sub booklet-subtitle">{subtitle}</p>
                    </div>
                </div>

                <div className="booklet-viewer-shell">
                    <button
                        type="button"
                        className="booklet-side-btn booklet-side-btn--left"
                        onClick={goPrev}
                        disabled={isFirstPage}
                        aria-label="Previous booklet page"
                    >
                        ←
                    </button>

                    <img
                        key={imageUrl}
                        className="booklet-image"
                        src={imageUrl}
                        alt={`Adoption booklet page ${page}`}
                    />

                    <button
                        type="button"
                        className="booklet-side-btn booklet-side-btn--right"
                        onClick={goNext}
                        disabled={isLastPage}
                        aria-label="Next booklet page"
                    >
                        →
                    </button>
                </div>
            </div>
        </section>
    );
};

export default PdfBookletViewer;
