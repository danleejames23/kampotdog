import React, { useState, useEffect } from 'react';
import HomeDarkCardLeftPic from "./images/leftd1.png";
import HomeDarkCardRightPic from "./images/rightd2.png";
import { apiUrl } from '../../config/api';

const CardBelowHome = () => {
    const [counters, setCounters] = useState([]);

    useEffect(() => {
        const fetchCounters = async () => {
            try {
                const res = await fetch(apiUrl(`/counters?ts=${Date.now()}`), {
                    cache: 'no-store',
                });
                const data = await res.json();
                setCounters(Array.isArray(data) ? data : []);
            } catch (err) {
                console.error(err);
            }
        };
        fetchCounters();
    }, []);

    return (
        <div className="counter-banner">
            <div className="counter-dog counter-dog-left">
                <img src={HomeDarkCardLeftPic} alt="Dog with toy" />
            </div>
            <div className="counter-items">
                {counters.map((c) => (
                    <div key={c.key} className="counter-item">
                        <span className="counter-value">{c.value}</span>
                        <span className="counter-label">{c.label}</span>
                    </div>
                ))}
            </div>
            <div className="counter-dog counter-dog-right">
                <img src={HomeDarkCardRightPic} alt="Dog pic" />
            </div>
        </div>
    );
};

export default CardBelowHome;