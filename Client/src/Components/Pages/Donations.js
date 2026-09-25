import React, { useState } from 'react';
import './Pages.css';
import PageImageTicker from './PageImageTicker';
import { counters } from '../../data/siteData';
import qrCode from './qrcode.png';
import wiseLogo from './wiselogo.webp';
import abaLogo from './abalogo.jpeg';
import paypalLogo from './paypallogo.png';
import revolutLogo from './revolutlogo.png';
import foodImg from './food.png';
import vetBillsImg from './vetbills.png';
import animalMamaImg from './animalmama.png';
import topdogImg from './topdog.png';
import bottomdogImg from './bottomdog.png';
import VisitorVideos from '../Home/VisitorVideos';
import PawConfetti from '../Scrapbook/PawConfetti';
import lq1 from '../Home/images/lq1.png';
import rq1 from '../Home/images/rq1.png';

const paymentMethods = [
    {
        key: 'wise',
        name: 'Wise',
        tagline: 'International transfer - low fees, great rates',
        url: 'https://wise.com/pay/me/alexanderpauls6',
        cta: 'Donate via Wise',
        logoBg: '#fff',
        logo: wiseLogo,
        logoAlt: 'Wise logo',
        logoHeight: 54,
    },
    {
        key: 'revolut',
        name: 'Revolut',
        tagline: 'Instant transfer from your Revolut app',
        url: 'https://revolut.me/josephcsmx',
        cta: 'Donate via Revolut',
        logoBg: '#fff',
        logo: revolutLogo,
        logoAlt: 'Revolut logo',
        logoHeight: 54,
    },
    {
        key: 'paypal',
        name: 'PayPal',
        tagline: 'Pay with your PayPal balance, card or bank',
        url: 'https://www.paypal.com/paypalme/schwine2?locale.x=en_AU',
        cta: 'Donate via PayPal',
        logoBg: '#fff',
        logo: paypalLogo,
        logoAlt: 'PayPal logo',
        logoHeight: 54,
    },
];

const buildCategories = (dogsOnSiteValue) => [
    {
        emoji: '🍖',
        title: 'Food',
        text: 'Keeping the dogs healthy starts with the basics. We mix 8kg of biscuits with 8kg of rice every meal, plus pork, beef, duck or chicken from the local market for flavour and nutrition.',
        cost: '$30+ daily minimum • $250 per 10×20kg bags',
    },
    {
        emoji: '💉',
        title: 'Vet Bills',
        text: 'PPAWS in Kampot and Animal Mama in Phnom Penh keep our dogs alive - extending us credit when we cannot pay upfront. Clearing these debts protects every dog in our care.',
        cost: 'Outstanding: $8,500+',
    },
    {
        emoji: '🛡️',
        title: 'Bravecto',
        text: `Flea and tick treatment is essential. Tick fever can ruin or end a dog's life - fleas would be a nightmare across ${dogsOnSiteValue} dogs. Every 3 months, we treat the entire pack.`,
        cost: '$750 USD per 3 months (discounted)',
    },
    {
        emoji: '🪱',
        title: 'Advocate',
        text: 'Broad‑spectrum parasite prevention - fleas, ear mites, biting lice, hookworm, roundworm, whipworm, heartworm, sarcoptic mange and demodex. Parasites do not even need to bite to be killed.',
        cost: 'Monthly dosing for the pack',
    },
    {
        emoji: '🛏️',
        title: 'Essentials',
        text: 'Bedding, towels, duvets and shelter maintenance. In the rainy season, dry beds prevent skin conditions. The local community donates what they can - we make every item go far.',
        cost: 'Ongoing maintenance costs',
    },
    {
        emoji: '🚑',
        title: 'Rescue',
        text: 'Sometimes we have to act fast with what we have at hand. Once the essentials are paid for, we want to invest in proper rescue gear - keeping our team and the dogs safer, and rescuing more.',
        cost: 'Rescue equipment fund',
    },
];

const Donations = () => {
    const [copied, setCopied] = useState('');
    const dogsOnSiteValue = counters.find((counter) => counter.key === 'dogs_on_site')?.value || '85';

    const categories = buildCategories(dogsOnSiteValue);

    const copyLink = (text, key) => {
        navigator.clipboard.writeText(text).then(() => {
            setCopied(key);
            setTimeout(() => setCopied(''), 1800);
        });
    };

    return (
        <div className="kds-page sb-page">
            <PawConfetti />
            {/* Hero */}
            <section className="kds-hero kds-hero--orange don-hero">
                <img src={lq1} alt="" className="don-hero-img don-hero-img--left" aria-hidden="true" />
                <img src={rq1} alt="" className="don-hero-img don-hero-img--right" aria-hidden="true" />
                <div className="kds-hero-content">
                    <span className="kds-eyebrow">Ways To Donate</span>
                    <h1>Donations</h1>
                    <p className="kds-hero-sub">
                        We are stretched to breaking point but every contribution - no matter the size -
                        goes directly to the dogs. Pick your preferred way to give below.
                    </p>
                </div>
            </section>

            {/* Patreon + Intro block */}
            <section className="kds-section">
                {/* Help us. Help dogs. intro */}
                <div className="don-intro-block">
                    <h2 className="don-intro-heading">Help us. Help dogs.</h2>
                    <p>Every donation counts.</p>
                    <p>Every cent of your donation will go towards improving the lives of dogs.</p>
                    <p>Read the section below to find out how your money can help.</p>
                    <p>We are able to accept direct donations using the 4 methods below.</p>
                    <p>If you have a question please email us at <a href="mailto:kampotdogsanctuary@gmail.com" className="don-email-link">kampotdogsanctuary@gmail.com</a> we will be happy to talk with you ^.^</p>
                </div>

                {/* Patreon monthly card */}
                <div className="don-patreon-card">
                    <div className="don-patreon-content">
                        <h3 className="don-patreon-title">Join The K.D.S. Crew!</h3>
                        <p>Set up a meaningful monthly donation on Patreon.</p>
                        <p>Options start at as little as <strong>$5 per month</strong>.</p>
                        <p>For less than a takeaway coffee you could help us plan ahead and secure our future.</p>
                        <p>The dogs are counting on us!</p>
                        <p>Join the K.D.S. crew today :)</p>
                        <a
                            href="https://www.patreon.com/kampotdogsanctuary"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="don-patreon-link"
                        >
                            www.patreon.com/kampotdogsanctuary →
                        </a>
                    </div>
                    <div className="don-patreon-badge">
                        <div className="don-patreon-badge-inner">
                            <span className="don-patreon-badge-top">Donate Monthly</span>
                            <span className="don-patreon-badge-mid">Support us on</span>
                            <span className="don-patreon-badge-brand">PATREON</span>
                            <span className="don-patreon-badge-sub">Follow the link</span>
                        </div>
                        <p className="don-patreon-caption">Get more from Kampot Dog Sanctuary on Patreon</p>
                        <p className="don-patreon-caption-sub">Help us help dogs</p>
                    </div>
                </div>
            </section>

            {/* Payment Methods - FIRST */}
            <section className="kds-section" id="payment-methods">
                <h2 className="kds-section-title">Choose How To Give</h2>
                <p className="kds-section-sub">
                    100% of every donation goes directly to the sanctuary - food, vet bills and rescue.
                </p>

                <div className="pay-grid-v2">
                    {paymentMethods.map((m) => (
                        <div className="pay-card-v2" key={m.key}>
                            <div className="pay-card-v2-logo">
                                <img src={m.logo} alt={m.logoAlt} />
                            </div>
                            <p className="pay-card-v2-tagline">{m.tagline}</p>
                            <div className="pay-card-v2-actions">
                                <a
                                    href={m.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="pay-card-v2-cta"
                                >
                                    {m.cta} →
                                </a>
                                <button
                                    type="button"
                                    className="pay-copy-btn"
                                    onClick={() => copyLink(m.url, m.key)}
                                >
                                    {copied === m.key ? '✓ Copied!' : 'Copy link'}
                                </button>
                            </div>
                        </div>
                    ))}

                    {/* QR / ABA card */}
                    <div className="pay-card-v2 pay-card-v2--qr">
                        <div className="pay-card-v2-logo pay-card-v2-logo--aba">
                            <img src={abaLogo} alt="ABA Bank" />
                        </div>
                        <p className="pay-card-v2-tagline">
                            Open your camera, scan the code and donate in seconds.
                        </p>
                        <div className="pay-qr-wrap">
                            <img src={qrCode} alt="KDS donation QR code" className="pay-qr-img" />
                        </div>
                    </div>
                </div>

                <p className="pay-footnote">
                    🐾 All donations go directly to Kampot Dog Sanctuary. Thank you for keeping the pack safe.
                </p>
            </section>

            <VisitorVideos
                eyebrow="KDS Video"
                sectionTitle="KDS Walkthrough Video"
                subtitle="A quick walkthrough made by KDS to show the sanctuary and the dogs."
                badgeLabel="Walkthrough Video"
                video={{
                    id: 'ikybTBIdjkE',
                    title: 'KDS Walkthrough',
                    byline: 'Made by KDS',
                    description: 'A quick walkthrough video from KDS showing the sanctuary and the dogs.',
                }}
            />

            {/* Image ticker */}
            <div className="page-ticker-wrap">
                <PageImageTicker page="donations" />
            </div>

            {/* Where money goes - SECOND */}
            <section className="kds-section">
                <h2 className="kds-section-title">Where Your Money Goes</h2>
                <p className="kds-section-sub">
                    The real, day‑to‑day costs of running a sanctuary for {dogsOnSiteValue} dogs.
                </p>

                {/* FOOD - premium split row */}
                <div className="wmg-split">
                    <div className="wmg-split-img">
                        <img src={foodImg} alt="Dog food bag" />
                    </div>
                    <div className="wmg-split-content">
                        <h2 className="wmg-split-title">Food</h2>
                        <p>Keeping the dogs healthy starts with the basics, food.</p>
                        <p>10 x 20kg bags of dog biscuits costs us <strong>$250 USD</strong>.</p>
                        <p>Each meal time the dogs consume <strong>8kg of biscuits and 8kg of rice</strong>.</p>
                        <p>This food is mixed with pork, beef, duck or chicken from the local market to improve the flavour and nutrition of their meals.</p>
                        <p><strong>Minimum daily cost $30 USD.</strong></p>
                        <p>When high protein diets are needed for rehabilitating starved dogs or larger breeds, this cost is much higher.</p>
                    </div>
                </div>

                {/* VET BILLS - all one card */}
                <div className="wmg-card" style={{ marginTop: '40px' }}>
                    <h2 className="wmg-split-title">Vet Bills</h2>

                    {/* PPAWS row */}
                    <div className="wmg-inner-split">
                        <div className="wmg-split-img wmg-split-img--captioned">
                            <img src={vetBillsImg} alt="Vet treating a dog" />
                            <div className="wmg-img-caption">
                                <a href="https://ppaws.com/" target="_blank" rel="noopener noreferrer" className="wmg-caption-link">
                                    Phnom Penh Animal Welfare Society | Veterinary Clinic | PPAWS
                                </a>
                                <p>Phnom Penh Animal Welfare Society (PPAWS) is a volunteer organisation and full service veterinary clinic based in Phnom Penh, Cambodia.</p>
                            </div>
                        </div>
                        <div className="wmg-split-content">
                            <h3 className="wmg-vet-name">PPAWS</h3>
                            <p>Our local clinic who, despite our mounting vet bills, generously continue to work with us to treat new and ongoing health problems, and de-sex our dogs. We need your help to clear our debts and maintain this relationship.</p>
                            <p>Our local vet clinic in Kampot, PPAWS is not only providing wonderful care to family pets and outreach programs to tackle issues such as eradicating rabies, addressing population control of strays through education and free access to services for those who can't pay to de-sex their pets.</p>
                            <a href="https://ppaws.com/" target="_blank" rel="noopener noreferrer" className="wmg-vet-link">Click on the link to find out more about them →</a>
                        </div>
                    </div>

                    <div className="wmg-divider" />

                    {/* Animal Mama row */}
                    <div className="wmg-inner-split">
                        <div className="wmg-split-img">
                            <img src={animalMamaImg} alt="Animal Mama logo" style={{ maxHeight: '260px', objectFit: 'contain' }} />
                        </div>
                        <div className="wmg-split-content">
                            <h3 className="wmg-vet-name">Animal Mama</h3>
                            <p>Animal Mama Veterinary Clinic is located in Phnom Penh and their team of dedicated staff and modern state of the art treatment options mean that our more severe cases are rushed to them in private transport.</p>
                            <p>From treating life threatening wounds on injured dogs, to providing cancer treatments, they are a lifeline. As true animal rescuers with big hearts, they have offered treatment and advice to us and generously extended us credit.</p>
                            <p>With your help we would love to clear those debts and maintain our relationship.</p>
                            <a href="https://www.facebook.com/AnimalMamaCambodia/" target="_blank" rel="noopener noreferrer" className="wmg-vet-link">Click the picture to read more about their work on their Facebook page →</a>
                        </div>
                    </div>
                </div>

                {/* REGULAR MEDICATIONS - one card */}
                <div className="wmg-card" style={{ marginTop: '40px' }}>
                    <h2 className="wmg-split-title">Regular Medications</h2>

                    {/* Bravecto row */}
                    <div className="wmg-inner-split">
                        <div className="wmg-split-img">
                            <img src={topdogImg} alt="Bravecto flea and tick treatment" style={{ maxHeight: '300px', objectFit: 'contain' }} />
                        </div>
                        <div className="wmg-split-content">
                            <h3 className="wmg-vet-name" style={{ color: '#1a4fa8' }}>Bravecto</h3>
                            <p>This flea and tick treatment is an essential.</p>
                            <p>Every 3 months administering this to all of the dogs costs <strong>$750 USD</strong>. This is at a discounted rate from a kind supplier. The high street price would be much higher.</p>
                            <p>Tick fever can ruin or take a dog's life and flea infestations would be a nightmare.</p>
                        </div>
                    </div>

                    <div className="wmg-divider" />

                    {/* Advocate row */}
                    <div className="wmg-inner-split">
                        <div className="wmg-split-img">
                            <img src={bottomdogImg} alt="Advocate parasite treatment" style={{ maxHeight: '300px', objectFit: 'contain' }} />
                        </div>
                        <div className="wmg-split-content">
                            <h3 className="wmg-vet-name" style={{ color: '#c07a00' }}>Advocate</h3>
                            <p>Advocate for Dogs is an effective, broad-spectrum parasite treatment and prevention for dogs. Parasites do not have to bite to be killed by the treatment.</p>
                            <p>Preventing all sorts of nasties like fleas and their larvae - ear mites - biting lice - hookworm - roundworm - whipworm - heartworm - sarcoptic mange - Demodex canis.</p>
                        </div>
                    </div>
                </div>

                {/* Remaining categories as cards */}
                <div className="don-grid" style={{ marginTop: '60px' }}>
                    {categories.slice(4).map((cat) => (
                        <div className="don-category" key={cat.title}>
                            <div className="don-cat-top" />
                            <div className="don-cat-body">
                                <span className="don-cat-emoji">{cat.emoji}</span>
                                <h3 className="don-cat-title">{cat.title}</h3>
                                <p className="don-cat-text">{cat.text}</p>
                                <div className="don-cat-cost">{cat.cost}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Donations;
