import React from 'react';
import { Link } from 'react-router-dom';
import './Pages.css';
import PageImageTicker from './PageImageTicker';
import VisitorVideos from '../Home/VisitorVideos';
import PawConfetti from '../Scrapbook/PawConfetti';
import ld1 from '../Home/images/ld1.png';
import rd1 from '../Home/images/rd1.png';

const goFundMeUrl = 'https://www.gofundme.com/f/vet-debt-kampot-dog-sanctuary';

const marqueeItems = [
    '🦴 the vets need paying',
    '💛 we owe them everything',
    '🐾 every $ counts',
    '🏥 keeping dogs alive',
    '❤️ thank you',
];

const VetDebt = () => {
    return (
        <div className="kds-page sb-page">
            <PawConfetti />
            <section className="kds-hero kds-hero--teal vd-hero">
                <img src={ld1} alt="" className="vd-hero-img vd-hero-img--left" aria-hidden="true" />
                <img src={rd1} alt="" className="vd-hero-img vd-hero-img--right" aria-hidden="true" />
                <div className="kds-hero-content">
                    <span className="kds-eyebrow">An Urgent Appeal</span>
                    <h1>Vet Debt</h1>
                    <p className="kds-hero-sub">
                        Our dogs are alive today because brave vets extended us credit. We owe them.
                        The full GoFundMe fundraiser with the vet bill details is embedded below.
                    </p>
                </div>
            </section>


            <div className="sb-marquee" aria-hidden="true">
                <div className="sb-marquee-track">
                    {[...marqueeItems, ...marqueeItems, ...marqueeItems].map((m, i) => (
                        <span key={i} className="sb-marquee-item">{m}</span>
                    ))}
                </div>
            </div>

            {/* Why It Matters — quirky stats strip */}
            <section className="vd-band vd-band--paper">
                <div className="vd-band-inner">
                    <div className="vd-band-head">
                        <span className="sb-eyebrow sb-eyebrow--orange">
                            <span className="sb-eyebrow-dot" />
                            The Reality
                        </span>
                        <h2 className="vd-band-title">Why We're Asking</h2>
                    </div>
                    <div className="vd-stat-grid">
                        <div className="sb-chip sb-chip--orange">
                            <span className="vd-stat-emoji">🏥</span>
                            <span className="vd-stat-text"><strong>2 clinics</strong> extended us credit</span>
                        </div>
                        <div className="sb-chip sb-chip--teal">
                            <span className="vd-stat-emoji">💉</span>
                            <span className="vd-stat-text"><strong>70+ dogs</strong> treated this year</span>
                        </div>
                        <div className="sb-chip sb-chip--pink">
                            <span className="vd-stat-emoji">🦴</span>
                            <span className="vd-stat-text"><strong>$0</strong> spent on anything else</span>
                        </div>
                        <div className="sb-chip sb-chip--cream">
                            <span className="vd-stat-emoji">❤️</span>
                            <span className="vd-stat-text"><strong>100%</strong> goes to the vets</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* GoFundMe section */}
            <section className="vd-band vd-band--gfm">
                <div className="vd-band-label vd-band-label--pink">📮 GoFundMe</div>
                <div className="vd-gfm-section vd-gfm-section--lead">
                    <div className="vd-gfm-embed-shell">
                        <iframe
                            className="vd-gfm-embed"
                            src={goFundMeUrl}
                            title="Kampot Dog Sanctuary GoFundMe fundraiser page"
                            loading="lazy"
                            allow="payment"
                        />
                    </div>

                    <div className="vd-gfm-header">
                        <span className="vd-gfm-eyebrow">GoFundMe</span>
                        <h2 className="vd-gfm-title">The Vet Bill Details Live Here</h2>
                        <p className="vd-gfm-text">
                            The fundraiser includes the vet bill information and the running story of
                            what is owed. It is now the main section on this page so people can read the
                            full campaign details without hunting for a button.
                        </p>
                        <div className="vd-gfm-actions">
                            <a href={goFundMeUrl} target="_blank" rel="noopener noreferrer" className="kds-cta kds-cta--teal">
                                Open in New Tab &nbsp;↗
                            </a>
                            <Link to="/donations#payment-methods" className="kds-cta">
                                Donate Another Way &nbsp;→
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Visitor Videos — on cream-tinted paper */}
            <section className="vd-band vd-band--videos">
                <div className="vd-band-label vd-band-label--teal">🎥 Hear It From Visitors</div>
                <VisitorVideos />
            </section>

            {/* Image ticker — on dotted background */}
            <section className="vd-band vd-band--ticker">
                <div className="vd-band-label vd-band-label--orange">📸 From The Sanctuary</div>
                <div className="page-ticker-wrap">
                    <PageImageTicker page="vetdebt" showControls />
                </div>
            </section>

            <div className="kds-donate-banner">
                <h2>Help Us Pay The Vets</h2>
                <p>
                    Every contribution - large or small - goes directly toward our vet bills.
                    Without these clinics, our dogs would not survive.
                </p>
                <Link to="/donations#payment-methods" className="kds-cta">
                    Donate Now &nbsp;❤️
                </Link>
            </div>
        </div>
    );
};

export default VetDebt;
