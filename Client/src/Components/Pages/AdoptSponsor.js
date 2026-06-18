import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Pages.css';
import PageImageTicker from './PageImageTicker';
import { apiUrl } from '../../config/api';
import PdfBookletViewer from './PdfBookletViewer';
import VisitorVideos from '../Home/VisitorVideos';
import PawConfetti from '../Scrapbook/PawConfetti';
import lw1 from '../Home/images/lw1.png';
import rw1 from '../Home/images/rw1.png';

const RETURN_REASONS = [
    'Change in living situation',
    'Allergies in the household',
    'Behavioural challenges',
    'Financial difficulties',
    'Moving abroad / cannot take dog',
    'Family circumstances changed',
    'Other',
];

const AdoptSponsor = () => {
    const [showReturnModal, setShowReturnModal] = useState(false);
    const [returnForm, setReturnForm] = useState({ dogName: '', adopterName: '', email: '', phone: '', reason: '', additionalInfo: '' });
    const [returnStatus, setReturnStatus] = useState('');
    const [submitting, setSubmitting] = useState(false);

    const handleReturnChange = (e) => setReturnForm(f => ({ ...f, [e.target.name]: e.target.value }));

    const handleReturnSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            const res = await fetch(apiUrl('/returns/save'), {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(returnForm),
            });
            if (res.ok) {
                setReturnStatus('success');
                setReturnForm({ dogName: '', adopterName: '', email: '', phone: '', reason: '', additionalInfo: '' });
            } else {
                setReturnStatus('error');
            }
        } catch {
            setReturnStatus('error');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="kds-page sb-page">
            <PawConfetti />
            {/* Hero */}
            <section className="kds-hero kds-hero--teal as-hero">
                <img src={lw1} alt="" className="as-hero-img as-hero-img--left" aria-hidden="true" />
                <img src={rw1} alt="" className="as-hero-img as-hero-img--right" aria-hidden="true" />
                <div className="kds-hero-content">
                    <span className="kds-eyebrow">Forever Homes & Sponsors</span>
                    <h1>Adopt or Sponsor</h1>
                    <p className="kds-hero-sub">
                        Over <strong>35 of our dogs</strong> are up for adoption. Can't adopt but
                        fell in love with one? Sponsor a dog instead and stay part of their journey.
                    </p>
                </div>
            </section>

            <PdfBookletViewer
                title="Adoption Booklet"
                subtitle="Flip through each page using the arrows on the booklet."
            />

            {/* Two-panel split */}
            <section className="kds-section">
                <div className="as-split">
                    {/* ADOPT */}
                    <div className="as-panel as-panel--adopt">
                        <div className="as-panel-banner">
                            <div className="as-panel-banner-emoji">🏠</div>
                        </div>
                        <div className="as-panel-body">
                            <span className="as-panel-tag">Adopt</span>
                            <h2 className="as-panel-title">Bring One Home</h2>
                            <p className="as-panel-text">
                                Every adoption changes a life - both the dog's and yours.
                                Our dogs come vaccinated, de‑sexed, and ready for a fresh start.
                            </p>
                            <ul className="as-bullet-list">
                                <li>Full vet history and vaccinations</li>
                                <li>De‑sexed without exception</li>
                                <li>Adopters sign a contract of care</li>
                                <li>We support you for life - questions any time</li>
                            </ul>
                            <Link to="/the-pack" className="kds-cta kds-cta--teal">
                                Meet The Pack &nbsp;→
                            </Link>
                        </div>
                    </div>

                    {/* SPONSOR */}
                    <div className="as-panel as-panel--sponsor">
                        <div className="as-panel-banner">
                            <div className="as-panel-banner-emoji">🐾</div>
                        </div>
                        <div className="as-panel-body">
                            <span className="as-panel-tag">Sponsor</span>
                            <h2 className="as-panel-title">Adopt From Afar</h2>
                            <p className="as-panel-text">
                                Can't adopt right now? <strong>Sponsor a dog</strong> through our
                                Pack page and support their food, vet care and quality of life.
                                Pick a dog you connect with and sponsor directly there.
                            </p>
                            <ul className="as-bullet-list">
                                <li>Browse dogs available for sponsorship</li>
                                <li>Choose the dog you feel most connected to</li>
                                <li>Sponsor directly from each dog's profile</li>
                                <li>Help cover food, care and vet treatment</li>
                            </ul>
                            <Link to="/the-pack" className="kds-cta">
                                Sponsor Through The Pack &nbsp;❤️
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* How adoption works */}
            <section className="kds-section">
                <h2 className="kds-section-title">How Adoption Works</h2>
                <p className="kds-section-sub">
                    A simple, careful process designed to find the right home for the right dog.
                </p>

                <div className="as-steps">
                    <div className="as-step">
                        <div className="as-step-num">1</div>
                        <h3 className="as-step-title">See Who's Available</h3>
                        <p className="as-step-text">
                            Browse our available dogs on the website or in the printed booklet at the bar. Please take your time - finding the right match matters more than moving quickly.
                        </p>
                    </div>
                    <div className="as-step">
                        <div className="as-step-num">2</div>
                        <h3 className="as-step-title">Visit In Person First</h3>
                        <p className="as-step-text">
                            <strong>This step is non-negotiable.</strong> We require all prospective adopters to visit the sanctuary before any adoption proceeds. Spend time with the dogs, come back more than once, and make sure you truly connect - not just in photos.
                        </p>
                    </div>
                    <div className="as-step">
                        <div className="as-step-num">3</div>
                        <h3 className="as-step-title">Application & Suitability Check</h3>
                        <p className="as-step-text">
                            Email us to express formal interest - the whole team will be informed. We will then assess suitability, which includes photos of your home, garden and living space. We may also ask about your lifestyle, finances, employment and household. Please understand this is not personal - it exists entirely to protect the dog.
                        </p>
                    </div>
                    <div className="as-step">
                        <div className="as-step-num">4</div>
                        <h3 className="as-step-title">Sign & Take Them Home</h3>
                        <p className="as-step-text">
                            All adopters must sign a written agreement committing to return the dog to KDS if circumstances ever change - no exceptions. Every dog leaves vaccinated, de‑sexed and microchipped. We remain available to you and the dog for life.
                        </p>
                    </div>
                </div>

                {/* Return a Dog CTA */}
                <div className="as-return-strip">
                    <div className="as-return-text">
                        <h3>Circumstances Changed?</h3>
                        <p>If your situation has changed and you need to return a dog to us, please don't hesitate - we will always take them back. Fill in the form and we'll be in touch straight away.</p>
                    </div>
                    <button className="as-return-btn" onClick={() => { setShowReturnModal(true); setReturnStatus(''); }}>
                        🐾 Return a Dog to KDS
                    </button>
                </div>
            </section>

            <VisitorVideos
                eyebrow="KDS Video"
                sectionTitle="KDS Walkthrough Video"
                subtitle="A quick walkthrough made by KDS to show the sanctuary and give you a feel for the space."
                badgeLabel="Walkthrough Video"
                video={{
                    id: 'Avsixhmxvvg',
                    title: 'KDS Walkthrough',
                    byline: 'Made by KDS',
                    description: 'A quick walkthrough video from KDS showing the sanctuary and the dogs.',
                }}
            />

            {/* Return a Dog Modal */}
            {showReturnModal && (
                <div className="as-modal-overlay" onClick={() => setShowReturnModal(false)}>
                    <div className="as-modal" onClick={e => e.stopPropagation()}>
                        <button className="as-modal-close" onClick={() => setShowReturnModal(false)}>&times;</button>
                        <h2 className="as-modal-title">Return a Dog to KDS</h2>
                        <p className="as-modal-sub">We understand that circumstances change. Please fill in the form below and we'll be in touch as soon as possible.</p>

                        {returnStatus === 'success' ? (
                            <div className="as-modal-success">
                                <div className="as-modal-success-icon">🐾</div>
                                <h3>Thank you - we'll be in touch soon.</h3>
                                <p>We appreciate you reaching out. Our team will contact you within 24 hours.</p>
                                <button className="as-return-btn" onClick={() => setShowReturnModal(false)}>Close</button>
                            </div>
                        ) : (
                            <form className="as-return-form" onSubmit={handleReturnSubmit}>
                                <div className="as-form-row">
                                    <div className="as-form-group">
                                        <label>Dog's Name *</label>
                                        <input name="dogName" value={returnForm.dogName} onChange={handleReturnChange} required placeholder="e.g. Bruno" />
                                    </div>
                                    <div className="as-form-group">
                                        <label>Your Name *</label>
                                        <input name="adopterName" value={returnForm.adopterName} onChange={handleReturnChange} required placeholder="Full name" />
                                    </div>
                                </div>
                                <div className="as-form-row">
                                    <div className="as-form-group">
                                        <label>Email *</label>
                                        <input type="email" name="email" value={returnForm.email} onChange={handleReturnChange} required placeholder="your@email.com" />
                                    </div>
                                    <div className="as-form-group">
                                        <label>Phone *</label>
                                        <input name="phone" value={returnForm.phone} onChange={handleReturnChange} required placeholder="+1 234 567 8900" />
                                    </div>
                                </div>
                                <div className="as-form-group">
                                    <label>Reason for Return *</label>
                                    <select name="reason" value={returnForm.reason} onChange={handleReturnChange} required>
                                        <option value="">Select a reason...</option>
                                        {RETURN_REASONS.map(r => <option key={r} value={r}>{r}</option>)}
                                    </select>
                                </div>
                                <div className="as-form-group">
                                    <label>Additional Information</label>
                                    <textarea name="additionalInfo" value={returnForm.additionalInfo} onChange={handleReturnChange} rows={4} placeholder="Any extra details you'd like to share..." />
                                </div>
                                {returnStatus === 'error' && <p className="as-form-error">Something went wrong. Please try again or email us directly.</p>}
                                <button type="submit" className="as-return-btn" disabled={submitting}>
                                    {submitting ? 'Sending...' : 'Submit Return Request'}
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            )}

            {/* Image ticker */}
            <div className="page-ticker-wrap">
                <PageImageTicker page="adopt" />
            </div>

            {/* Donate banner */}
            <div className="kds-donate-banner">
                <h2>Not Ready To Adopt Or Sponsor?</h2>
                <p>
                    A one‑time donation still keeps the lights on, the dogs fed and the vets paid.
                    Every gift makes a real difference.
                </p>
                <Link to="/donations" className="kds-cta">
                    Donate Instead &nbsp;❤️
                </Link>
            </div>
        </div>
    );
};

export default AdoptSponsor;
