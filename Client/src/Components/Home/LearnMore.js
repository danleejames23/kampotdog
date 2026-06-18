import React, { useState, useEffect } from 'react';
import { apiUrl } from '../../config/api';
import './LearnMore.css';
import ImageSlider from './ImageSlider';

const FALLBACK_VIDEO_ID = '88TDPIASN3Y';
const FALLBACK_TITLE = 'LEARN MORE';
const EMBED_BASE = 'https://www.youtube-nocookie.com/embed';

const LearnMore = () => {
    const [videoId, setVideoId] = useState(FALLBACK_VIDEO_ID);
    const [title, setTitle] = useState(FALLBACK_TITLE);

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const res = await fetch(apiUrl('/settings'));
                const data = await res.json();
                if (data.featured_video_id) setVideoId(data.featured_video_id);
                if (data.featured_video_title) setTitle(data.featured_video_title);
            } catch (err) {
                console.error(err);
                setVideoId((prev) => prev || FALLBACK_VIDEO_ID);
                setTitle((prev) => prev || FALLBACK_TITLE);
            }
        };
        fetchSettings();
    }, []);

    const videoParams = new URLSearchParams({
        autoplay: '1',
        mute: '0',
        playsinline: '1',
        rel: '0',
        modestbranding: '1',
        controls: '1',
        enablejsapi: '1',
        origin: window.location.origin,
    });

    return (
        <div className="learn-more-section">
            <h2 className="learn-more-title">{title}</h2>
            <div className="learn-more-video-wrapper">
                <iframe
                    src={`${EMBED_BASE}/${videoId || FALLBACK_VIDEO_ID}?${videoParams.toString()}`}
                    title={title}
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
            </div>
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
