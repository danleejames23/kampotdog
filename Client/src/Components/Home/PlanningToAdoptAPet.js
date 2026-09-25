import React, { useRef, useState } from 'react';
import Card from "./Card";
import { counters } from '../../data/siteData';
import s1Image from './images/s1.jpg';
import s2Image from './images/s2.jpg';
import s3Image from './images/s3.jpg';

const staticCards = [
  {
    id: 'dogs-on-site',
    bgImage: s1Image,
    description: "Food, medicine, vet bills, and daily care add up fast. If you're here, you already know the dogs are worth it."
  },
  {
    id: 'help-us-help-dogs',
    bgImage: s2Image,
    title: "HELP US HELP DOGS",
    description: "Your donation helps us keep feeding, treating, and rehabilitating the dogs while easing pressure on the sanctuary."
  },
  {
    id: 'every-contribution-counts',
    bgImage: s3Image,
    title: "EVERY CONTRIBUTION COUNTS",
    description: "No gift is too small. Your support helps keep the dogs safe, fed, and cared for every day."
  }
];

const PlanningToAdoptAPet = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartX = useRef(null);
  const dogsOnSiteValue = counters.find((counter) => counter.key === 'dogs_on_site')?.value || '85';

  const cards = staticCards.map((card) => (
    card.id === 'dogs-on-site'
      ? { ...card, title: `WE CURRENTLY HAVE ${dogsOnSiteValue} DOGS ON SITE` }
      : card
  ));

  const handleTouchStart = (event) => {
    touchStartX.current = event.touches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (event) => {
    if (touchStartX.current === null) return;
    const touchEndX = event.changedTouches[0]?.clientX ?? touchStartX.current;
    const distance = touchEndX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(distance) < 40) return;
    setCurrentIndex((index) => (
      distance < 0
        ? Math.min(index + 1, cards.length - 1)
        : Math.max(index - 1, 0)
    ));
  };

  return (
    <div className='planning-container'>
        <div className='boxes-carousel'>
          <div
            className='boxes-viewport'
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            aria-label="Swipe to browse support cards"
          >
            <div
              className='boxes-container'
              style={{ '--cards-offset': `${currentIndex * 100}%` }}
            >
              {cards.map((card) => (
                <div key={card.id} className='card-slide'>
                  <Card title={card.title} description={card.description} bgImage={card.bgImage} />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className='boxes-dots' aria-label='Card pagination'>
          {cards.map((card, index) => (
            <button
              key={card.id}
              type="button"
              className={`boxes-dot ${currentIndex === index ? 'boxes-dot-active' : ''}`}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Show card ${index + 1}`}
              aria-pressed={currentIndex === index}
            />
          ))}
        </div>
    </div>
  )
}

export default PlanningToAdoptAPet;
