import React from 'react';
import { featuredVideo } from '../../data/siteData';
import './LearnMore.css';
import ImageSlider from './ImageSlider';

const EMBED_BASE = 'https://www.youtube.com/embed';

const LearnMore = () => {
    const { youtube_id: videoId, title } = featuredVideo;

    const videoParams = new URLSearchParams({
        autoplay: '0',
        mute: '0',
        playsinline: '1',
        rel: '0',
        modestbranding: '1',
        controls: '1',
    });

    return (
        <div className="learn-more-section">
            <h2 className="learn-more-title">{title}</h2>
            <div className="learn-more-video-wrapper">
                <iframe
                    src={`${EMBED_BASE}/${videoId}?${videoParams.toString()}`}
                    title={title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    referrerPolicy="strict-origin-when-cross-origin"
                ></iframe>
            </div>
            <a className="learn-more-video-fallback" href={`https://www.youtube.com/watch?v=${videoId}`} target="_blank" rel="noopener noreferrer">
                If the player does not load, watch this video on YouTube ↗
            </a>
            <div className="learn-more-about">
                <p>At Kampot Dog Sanctuary, our mission is to rescue dogs trapped in bad situations and give them the life they deserve. Located in the south of Cambodia, Kampot town is home to locals, expats, and of course, dogs. If you are visiting Kampot, our doors are open to anyone who would like to visit us for a drink, a chat, and to meet the dogs.</p>
                <p>At the sanctuary, we offer care and medical attention to the dogs, working with qualified and generous local vets, where our bills grow daily, coupled with the cost of food and other needs. We work towards full rehabilitation and pack integration, ultimately aiming to find them trustworthy, loving adoptive homes. The new owners sign a contract of care with us, and all dogs are vaccinated and de-sexed without exception.</p>
                <p>However, in many complex cases, that home is with us long term. We currently have 40 dogs that will stay with us for the long haul.</p>
            </div>
            <ImageSlider />
        </div>
    );
};

export default LearnMore;
