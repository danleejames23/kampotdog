import React, { useState } from 'react';
import './Donate.css';

const presetAmounts = [10, 25, 50, 100, 250];

const Donate = () => {
    const [amount, setAmount] = useState('');
    const [selected, setSelected] = useState(null);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handlePreset = (val) => {
        setSelected(val);
        setAmount(val.toString());
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!amount || Number(amount) <= 0) return alert('Please enter a donation amount');
        setSubmitted(true);
    };

    if (submitted) {
        return (
            <div className="donate-page sb-page">
                <div className="donate-thankyou">
                    <span className="donate-heart">❤️</span>
                    <h1>Thank You{name ? `, ${name}` : ''}!</h1>
                    <p>Your generous donation of <strong>${amount}</strong> will help our dogs live their best lives.</p>
                    <p className="donate-note">This is a demo page - no payment has been processed.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="donate-page sb-page">
            <div className="donate-hero">
                <h1>Support The Pack</h1>
                <p>Every dollar helps us provide food, shelter, and medical care for our dogs</p>
            </div>

            <div className="donate-container">
                <form className="donate-form" onSubmit={handleSubmit}>
                    <h2>Make a Donation</h2>

                    <label className="donate-label">Select Amount</label>
                    <div className="donate-presets">
                        {presetAmounts.map((val) => (
                            <button
                                key={val}
                                type="button"
                                className={`donate-preset ${selected === val ? 'active' : ''}`}
                                onClick={() => handlePreset(val)}
                            >
                                ${val}
                            </button>
                        ))}
                    </div>

                    <label className="donate-label">Or Enter Custom Amount</label>
                    <div className="donate-custom">
                        <span className="donate-dollar">$</span>
                        <input
                            type="number"
                            min="1"
                            placeholder="0.00"
                            value={amount}
                            onChange={(e) => { setAmount(e.target.value); setSelected(null); }}
                        />
                    </div>

                    <label className="donate-label">Your Name (optional)</label>
                    <input
                        type="text"
                        className="donate-input"
                        placeholder="John Doe"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                    <label className="donate-label">Email (optional)</label>
                    <input
                        type="email"
                        className="donate-input"
                        placeholder="john@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <button type="submit" className="donate-submit">
                        Donate {amount ? `$${amount}` : ''}
                    </button>

                    <p className="donate-disclaimer">
                        This is a demonstration page. No real payment will be processed.
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Donate;
