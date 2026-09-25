import React, { useState } from 'react';
import { getImageUrl } from '../../config/api';
import { dogs } from '../../data/siteData';
import { submitNetlifyForm } from '../../utils/netlifyForms';
import './ThePack.css';
import PawConfetti from '../Scrapbook/PawConfetti';

const SPONSOR_AMOUNT = 50;

const popupOverlayStyle = {
    position: 'fixed',
    inset: 0,
    background: 'rgba(0, 30, 30, 0.65)',
    backdropFilter: 'blur(6px)',
    zIndex: 1000,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
};

const ThePack = () => {
    const [filter, setFilter] = useState('all');
    const [selectedDog, setSelectedDog] = useState(null);
    const [sponsorDog, setSponsorDog] = useState(null);
    const [sponsorForm, setSponsorForm] = useState({ name: '', email: '', phone: '', message: '' });
    const [sponsorStatus, setSponsorStatus] = useState('');
    const [sponsorSubmitting, setSponsorSubmitting] = useState(false);

    const handleSponsorChange = (e) => setSponsorForm(f => ({ ...f, [e.target.name]: e.target.value }));

    const handleSponsorSubmit = async (e) => {
        e.preventDefault();
        setSponsorSubmitting(true);
        try {
            await submitNetlifyForm('sponsor-interest', {
                ...sponsorForm,
                dog: sponsorDog?.name,
            });
            setSponsorStatus('success');
        } catch {
            setSponsorStatus('error');
        } finally {
            setSponsorSubmitting(false);
        }
    };

    const openSponsor = (e, dog) => {
        e.stopPropagation();
        setSponsorDog(dog);
        setSponsorStatus('');
        setSponsorForm({ name: '', email: '', phone: '', message: '' });
    };

    const filtered = dogs.filter((dog) => {
        const isSponsored = dog.sponsored === 1 || dog.sponsored === true;
        if (filter === 'needs') return !isSponsored && !dog.adopted;
        if (filter === 'sponsored') return isSponsored;
        return true;
    });

    return (
        <div className="pack-page sb-page">
            <PawConfetti />
            <div className="pack-hero">
                <div className="pack-hero-content">
                    <h1>Meet The Pack</h1>
                    <p>Every dog here has a story. Every one deserves a loving home.</p>
                    <div className="pack-filter-bar">
                        <button
                            className={`pack-filter-btn${filter === 'all' ? ' active' : ''}`}
                            onClick={() => setFilter('all')}
                        >
                            All Dogs
                        </button>
                        <button
                            className={`pack-filter-btn${filter === 'needs' ? ' active' : ''}`}
                            onClick={() => setFilter('needs')}
                        >
                            🐾 Needs a Sponsor
                        </button>
                        <button
                            className={`pack-filter-btn${filter === 'sponsored' ? ' active' : ''}`}
                            onClick={() => setFilter('sponsored')}
                        >
                            ✅ Sponsored
                        </button>
                    </div>
                </div>
            </div>

            {filtered.length === 0 ? (
                <p className="pack-msg">No dogs found.</p>
            ) : (
                <div className="pack-grid">
                    {filtered.map((dog) => (
                        <div key={dog.id} className="pack-card-link" onClick={() => setSelectedDog(dog)}>
                            <div className="pack-card">
                                <div className="pack-card-img">
                                    {dog.pinned && <div className="pack-card-pin">Featured</div>}
                                    {dog.adopted ? (
                                        <div className="pack-card-banner pack-card-banner--adopted">🏡 Adopted</div>
                                    ) : dog.sponsored ? null : (
                                        <div className="pack-card-banner">❤️ Needs a Sponsor</div>
                                    )}
                                    {dog.image ? (
                                        <img src={getImageUrl(dog.image)} alt={dog.name} loading="lazy" />
                                    ) : (
                                        <div className="pack-card-placeholder"><span>🐕</span></div>
                                    )}
                                    <div className="pack-card-overlay">
                                        <span className="pack-overlay-cta">View {dog.name}'s Bio →</span>
                                    </div>
                                </div>
                                <div className="pack-card-footer">
                                    <h3 className="pack-card-name">{dog.name}</h3>
                                    {dog.adopted ? (
                                        <span className="pack-sponsor-indicator pack-sponsor-indicator--adopted" aria-label={`${dog.name} has been adopted`}>
                                            🏡 Adopted
                                        </span>
                                    ) : dog.sponsored ? (
                                        <span className="pack-sponsor-indicator" aria-label={`${dog.name} is sponsored`}>
                                            ✅ Sponsored
                                        </span>
                                    ) : (
                                        <button
                                            className="pack-sponsor-btn"
                                            onClick={(e) => openSponsor(e, dog)}
                                        >
                                            🐾 Sponsor
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            {selectedDog && (
                <div className="pack-modal-overlay" style={popupOverlayStyle} onClick={() => setSelectedDog(null)}>
                    <div className="pack-modal" onClick={(e) => e.stopPropagation()}>
                        <button className="pack-modal-close" onClick={() => setSelectedDog(null)}>×</button>
                        <div className="pack-modal-img">
                            {selectedDog.image ? (
                                <img src={getImageUrl(selectedDog.image)} alt={selectedDog.name} />
                            ) : (
                                <div className="pack-modal-placeholder"><span>🐕</span></div>
                            )}
                        </div>
                        <div className="pack-modal-body">
                            <span className="pack-modal-kicker">Sanctuary Profile</span>
                            <h2 className="pack-modal-name">{selectedDog.name}</h2>
                            {selectedDog.age ? (
                                <p className="pack-modal-age">Age: {selectedDog.age}</p>
                            ) : null}
                            {selectedDog.description ? (
                                <div className="pack-modal-bio-card">
                                    <p className="pack-modal-desc">{selectedDog.description}</p>
                                </div>
                            ) : (
                                <div className="pack-modal-coming">
                                    <span className="pack-modal-paw">🐾</span>
                                    <p>Profile Coming Soon</p>
                                    <span className="pack-modal-sub">We're working on {selectedDog.name}'s full story - check back soon!</span>
                                </div>
                            )}
                            {selectedDog.adopted ? (
                                <div className="pack-sponsor-indicator pack-sponsor-indicator--modal pack-sponsor-indicator--adopted">
                                    🏡 {selectedDog.name} has found a home
                                </div>
                            ) : selectedDog.sponsored ? (
                                <div className="pack-sponsor-indicator pack-sponsor-indicator--modal">
                                    ✅ {selectedDog.name} is already sponsored
                                </div>
                            ) : (
                                <button
                                    className="pack-sponsor-btn pack-sponsor-btn--modal"
                                    onClick={(e) => { setSelectedDog(null); openSponsor(e, selectedDog); }}
                                >
                                    🐾 Sponsor {selectedDog.name} - ${SPONSOR_AMOUNT}/month
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {sponsorDog && (
                <div className="pack-modal-overlay" style={popupOverlayStyle} onClick={() => setSponsorDog(null)}>
                    <div className="pack-sponsor-modal" onClick={(e) => e.stopPropagation()}>
                        <button className="pack-modal-close" onClick={() => setSponsorDog(null)}>×</button>

                        <div className="pack-sponsor-modal-header">
                            {sponsorDog.image && (
                                <div className="pack-sponsor-modal-avatar">
                                    <img src={getImageUrl(sponsorDog.image)} alt={sponsorDog.name} />
                                </div>
                            )}
                            <div>
                                <h2 className="pack-sponsor-modal-title">Sponsor {sponsorDog.name}</h2>
                                <p className="pack-sponsor-modal-sub">
                                    <strong>${SPONSOR_AMOUNT}/month</strong> covers food, vet care &amp; love for {sponsorDog.name}. You'll receive regular updates and become part of their story.
                                </p>
                            </div>
                        </div>

                        {/* What your money covers */}
                        <div className="pack-sponsor-breakdown">
                            <h4 className="pack-sponsor-breakdown-title">What your $50/month covers</h4>
                            <div className="pack-sponsor-breakdown-grid">
                                <div className="pack-sbd-item">
                                    <span className="pack-sbd-icon">🍖</span>
                                    <div>
                                        <strong>Daily Food</strong>
                                        <p>Quality meals every day - tailored to their size and health needs</p>
                                    </div>
                                </div>
                                <div className="pack-sbd-item">
                                    <span className="pack-sbd-icon">💉</span>
                                    <div>
                                        <strong>Vet Treatment</strong>
                                        <p>Vaccinations, medications, check-ups and emergency care when needed</p>
                                    </div>
                                </div>
                                <div className="pack-sbd-item">
                                    <span className="pack-sbd-icon">🏠</span>
                                    <div>
                                        <strong>Safe Shelter</strong>
                                        <p>A warm, secure place to sleep with regular cleaning and enrichment</p>
                                    </div>
                                </div>
                                <div className="pack-sbd-item">
                                    <span className="pack-sbd-icon">🛁</span>
                                    <div>
                                        <strong>Grooming & Care</strong>
                                        <p>Flea and tick prevention, worming, dental care and general upkeep</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* What sponsors get */}
                        <div className="pack-sponsor-perks">
                            <h4 className="pack-sponsor-perks-title">What you get as a sponsor</h4>
                            <ul className="pack-sponsor-perks-list">
                                <li>📸 <span>Personal photos &amp; videos of <strong>{sponsorDog.name}</strong> sent directly to you</span></li>
                                <li>📰 <span>A monthly newsletter dedicated to <strong>{sponsorDog.name}</strong> - how they're doing, progress &amp; personality updates</span></li>
                                <li>🏡 <span>Personal sanctuary visits when you are in Kampot and we can arrange safely for the dogs</span></li>
                                <li>❤️ <span>A digital sponsor certificate with <strong>{sponsorDog.name}</strong>'s photo</span></li>
                                <li>🌍 <span>The knowledge that you are directly changing a life - every single month</span></li>
                            </ul>
                        </div>

                        {sponsorStatus === 'success' ? (
                            <div className="pack-sponsor-success">
                                <div style={{ fontSize: '2.5rem' }}>🐾</div>
                                <h3>Thank you so much!</h3>
                                <p>We've received your interest in sponsoring {sponsorDog.name}. Our team will be in touch very soon to get you set up.</p>
                                <button className="pack-sponsor-btn" onClick={() => setSponsorDog(null)}>Close</button>
                            </div>
                        ) : (
                            <form className="pack-sponsor-form" name="sponsor-interest" data-netlify="true" onSubmit={handleSponsorSubmit}>
                                <div className="pack-sform-row">
                                    <div className="pack-sform-group">
                                        <label>Your Name *</label>
                                        <input name="name" value={sponsorForm.name} onChange={handleSponsorChange} required placeholder="Full name" />
                                    </div>
                                    <div className="pack-sform-group">
                                        <label>Email *</label>
                                        <input type="email" name="email" value={sponsorForm.email} onChange={handleSponsorChange} required placeholder="your@email.com" />
                                    </div>
                                </div>
                                <div className="pack-sform-group">
                                    <label>Phone Number</label>
                                    <input name="phone" value={sponsorForm.phone} onChange={handleSponsorChange} placeholder="+1 234 567 8900" />
                                </div>
                                <div className="pack-sform-group">
                                    <label>Why do you want to sponsor {sponsorDog.name}?</label>
                                    <textarea name="message" value={sponsorForm.message} onChange={handleSponsorChange} rows={3} placeholder="Tell us a little about yourself..." />
                                </div>
                                {sponsorStatus === 'error' && (
                                    <p className="pack-sform-error">Something went wrong - please try again or email us directly.</p>
                                )}
                                <div className="pack-sform-actions">
                                    <button type="submit" className="pack-sponsor-btn" disabled={sponsorSubmitting}>
                                        {sponsorSubmitting ? 'Sending...' : `Register My Interest`}
                                    </button>
                                    <button type="button" className="pack-coming-soon-btn" disabled>
                                        💳 Pay ${SPONSOR_AMOUNT}/mo - Coming Soon
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ThePack;
