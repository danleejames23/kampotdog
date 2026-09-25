import React, { useState } from "react";
import contactDog from "../Home/images/kdopuitside.jpg";
import { submitNetlifyForm } from '../../utils/netlifyForms';
import './Contact.css';

const IconEmail = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="40" height="40">
    <rect x="2" y="4" width="20" height="16" rx="2"/>
    <polyline points="2,4 12,13 22,4"/>
  </svg>
);

const IconFacebook = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="40" height="40">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

const IconInstagram = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="40" height="40">
    <rect x="2" y="2" width="20" height="20" rx="5"/>
    <circle cx="12" cy="12" r="4"/>
    <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none"/>
  </svg>
);

const IconClock = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="40" height="40">
    <circle cx="12" cy="12" r="10"/>
    <polyline points="12,6 12,12 16,14"/>
  </svg>
);

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await submitNetlifyForm('contact', form);
      setStatus('success');
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch {
      setStatus('error');
    } finally {
      setSubmitting(false);
    }
  };

  const marqueeItems = [
    '🐾 woof woof',
    '✨ come say hi',
    '🐶 85 dogs await',
    '💌 we reply fast',
    '🏝 kampot, cambodia',
    '❤️ tail wags guaranteed',
  ];

  return (
    <div className="contact-page">

      {/* Decorative paw confetti */}
      <div className="contact-paws-bg" aria-hidden="true">
        {Array.from({ length: 14 }).map((_, i) => (
          <span key={i} className={`paw-bg paw-bg-${i}`}>🐾</span>
        ))}
      </div>

      {/* Hero */}
      <section className="contact-hero">
        <div className="contact-hero-content">
          <span className="contact-eyebrow">
            <span className="eyebrow-dot" />
            Pen Pals Wanted
          </span>
          <h1 className="contact-hero-title">
            Welcome To The <span className="contact-title-accent">Sanctuary</span>
          </h1>
          <p className="contact-hero-sub">
            This is the heart of Kampot Dog Sanctuary, where rescue, rehab and daily care happen.
            If you want to <em>visit the sanctuary</em>, volunteer, adopt, sponsor or ask a question,
            send us a message and we will help you plan your visit.
          </p>
          <div className="contact-hero-doodles" aria-hidden="true">
            <span className="doodle doodle-heart">♥</span>
            <span className="doodle doodle-star">✦</span>
            <span className="doodle doodle-squiggle">~</span>
          </div>
        </div>

        <div className="contact-hero-polaroid">
          <span className="polaroid-tape polaroid-tape--tl" />
          <span className="polaroid-tape polaroid-tape--br" />
          <div className="polaroid-image-wrap">
            <img src={contactDog} alt="Kampot Dog Sanctuary" />
          </div>
          <p className="polaroid-caption">Kampot Dog Sanctuary 🐾</p>
        </div>
      </section>

      {/* Quirky stats strip */}
      <section className="contact-stats">
        <div className="stat-chip stat-chip--teal">
          <span className="stat-emoji">🐶</span>
          <span className="stat-text"><strong>100+</strong> rescued dogs</span>
        </div>
        <div className="stat-chip stat-chip--orange">
          <span className="stat-emoji">💌</span>
          <span className="stat-text"><strong>&lt; 24h</strong> reply time</span>
        </div>
        <div className="stat-chip stat-chip--cream">
          <span className="stat-emoji">🏝</span>
          <span className="stat-text"><strong>Kampot</strong>, Cambodia</span>
        </div>
        <div className="stat-chip stat-chip--pink">
          <span className="stat-emoji">❤️</span>
          <span className="stat-text"><strong>Open</strong> 7 days</span>
        </div>
      </section>

      {/* Contact cards */}
      <section className="contact-cards-section">
        <a href="mailto:kampotdogsanctuary@gmail.com" className="contact-card contact-card--email">
          <div className="contact-card-sticker">say hi!</div>
          <div className="contact-card-icon contact-icon--email"><IconEmail /></div>
          <h3 className="contact-card-title">Email Us</h3>
          <p className="contact-card-value">kampotdogsanctuary@gmail.com</p>
          <span className="contact-card-cta">Send a message →</span>
        </a>

        <a href="https://www.facebook.com/kampotdogsanctuary" target="_blank" rel="noopener noreferrer" className="contact-card contact-card--facebook">
          <div className="contact-card-sticker">like us</div>
          <div className="contact-card-icon contact-icon--facebook"><IconFacebook /></div>
          <h3 className="contact-card-title">Facebook</h3>
          <p className="contact-card-value">Kampot Dog Sanctuary</p>
          <span className="contact-card-cta">Follow us →</span>
        </a>

        <a href="https://www.instagram.com/kampotdogsanctuary" target="_blank" rel="noopener noreferrer" className="contact-card contact-card--instagram">
          <div className="contact-card-sticker">pup pics</div>
          <div className="contact-card-icon contact-icon--instagram"><IconInstagram /></div>
          <h3 className="contact-card-title">Instagram</h3>
          <p className="contact-card-value">@kampotdogsanctuary</p>
          <span className="contact-card-cta">See our pics →</span>
        </a>

        <div className="contact-card contact-card--hours">
          <div className="contact-card-sticker">come by!</div>
          <div className="contact-card-icon contact-icon--hours"><IconClock /></div>
          <h3 className="contact-card-title">Opening Hours</h3>
          <p className="contact-card-value">10am – after dark<br/>7 days a week</p>
          <span className="contact-card-cta">Come visit us!</span>
        </div>
      </section>

      {/* Paw marquee divider */}
      <div className="contact-marquee" aria-hidden="true">
        <div className="contact-marquee-track">
          {[...marqueeItems, ...marqueeItems, ...marqueeItems].map((m, i) => (
            <span key={i} className="marquee-item">{m}</span>
          ))}
        </div>
      </div>

      {/* Contact Form + Map */}
      <section className="contact-form-section">
        <div className="contact-form-wrap">
          <div className="notebook-tab">📮 from: you</div>
          <span className="contact-eyebrow">
            <span className="eyebrow-dot" />
            Drop Us A Note
          </span>
          <h2 className="contact-form-title">Write Us A Love Letter</h2>
          <p className="contact-form-sub">(or just a quick hello — we read every single one)</p>

          {status === 'success' ? (
            <div className="contact-success">
              <div className="success-pawburst">
                <span>🐾</span><span>🎉</span><span>🐶</span>
              </div>
              <h3>Message received!</h3>
              <p>Thank you for reaching out. We'll be in touch very soon.</p>
              <button className="contact-submit-btn" onClick={() => setStatus('')}>Send Another</button>
            </div>
          ) : (
            <form className="contact-form" name="contact" data-netlify="true" onSubmit={handleSubmit}>
              <div className="contact-form-row">
                <div className="contact-form-group">
                  <label>👋 Your Name</label>
                  <input name="name" value={form.name} onChange={handleChange} required placeholder="Full name" />
                </div>
                <div className="contact-form-group">
                  <label>📧 Email Address</label>
                  <input type="email" name="email" value={form.email} onChange={handleChange} required placeholder="your@email.com" />
                </div>
              </div>
              <div className="contact-form-group">
                <label>💭 Subject</label>
                <input name="subject" value={form.subject} onChange={handleChange} required placeholder="What's it about?" />
              </div>
              <div className="contact-form-group">
                <label>✏️ Message</label>
                <textarea name="message" value={form.message} onChange={handleChange} required rows={5} placeholder="Tell us what's on your mind..." />
              </div>
              {status === 'error' && <p className="contact-form-error">Something went wrong - please try again or email us directly.</p>}
              <button type="submit" className="contact-submit-btn" disabled={submitting}>
                {submitting ? 'Sending...' : 'Send It! 🐾'}
              </button>
            </form>
          )}
        </div>

        <div className="contact-map">
          <div className="notebook-tab notebook-tab--orange">📍 find: us</div>
          <h2 className="contact-visit-title">Visit The Sanctuary</h2>
          <p className="contact-visit-desc">Based at <strong>High Tide Kampot</strong> — open 10am to after dark, 7 days a week.</p>
          <div className="contact-map-polaroid">
            <span className="polaroid-tape polaroid-tape--tl" />
            <div className="contact-map-frame">
              <iframe
                title="KDS Location"
                src="https://www.openstreetmap.org/export/embed.html?bbox=104.157%2C10.618%2C104.176%2C10.635&layer=mapnik&marker=10.626451%2C104.1661834"
                width="100%" height="100%"
                style={{ border: 0 }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <p className="polaroid-caption">x marks the pups 📍</p>
          </div>
          <a href="https://www.google.com/maps/search/High+Tide+Kampot" target="_blank" rel="noopener noreferrer" className="contact-directions-btn">
            📍 Get Directions
          </a>
        </div>
      </section>

      {/* Fun footer banner */}
      <div className="contact-fun-banner">
        <span className="contact-fun-paw">🐾</span>
        <p>Every visit, message and share helps us keep going. <strong>Thank you</strong> for being part of the KDS family!</p>
        <span className="contact-fun-paw">🐾</span>
      </div>

    </div>
  );
};

export default Contact;
