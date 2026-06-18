import React, { useState, useEffect, useRef } from 'react';
import { apiUrl } from '../../config/api';
import './YouTubeSection.css';

const YT_CHANNEL_URL = 'https://www.youtube.com/@kampotdogsanctuary';

const VideoCard = ({ v, onClick }) => (
    <div className="yt-card" onClick={() => onClick(v)}>
        <div className="yt-thumb-wrapper">
            <img
                src={v.thumbnail || `https://img.youtube.com/vi/${v.youtube_id}/hqdefault.jpg`}
                alt={v.title}
                className="yt-thumb"
                loading="lazy"
            />
            <div className="yt-play-btn">
                <svg viewBox="0 0 68 48" width="58" height="40">
                    <path d="M66.5 7.7s-.7-4.7-2.7-6.8C60.7.2 57.2.1 55.6 0 46.4-.6 34 0 34 0S21.6-.6 12.4 0C10.8.1 7.3.2 4.2.9 2.2 3 1.5 7.7 1.5 7.7S.8 13.3.8 18.8v5.2c0 5.5.7 11.1.7 11.1s.7 4.7 2.7 6.8c3.1.8 6.6.8 8.2 1 5.9.5 25.6.8 25.6.8s12.4-.1 21.6-.6c1.6-.1 5.1-.2 8.2-1 2-2.1 2.7-6.8 2.7-6.8s.7-5.5.7-11.1v-5.2c0-5.5-.7-11.1-.7-11.1z" fill="#FF0000"/>
                    <path d="M27 33V13l18.1 10L27 33z" fill="#fff"/>
                </svg>
            </div>
        </div>
        <div className="yt-card-info">
            <p className="yt-card-title">{v.title}</p>
        </div>
    </div>
);

const YouTubeSection = () => {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeVideo, setActiveVideo] = useState(null);
    const tickerRef = useRef(null);
    const animRef = useRef(null);
    const posRef = useRef(0);
    const pausedRef = useRef(false);

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const loadVideos = async (endpoint) => {
                    const res = await fetch(apiUrl(endpoint));
                    if (!res.ok) return [];
                    const data = await res.json();
                    return Array.isArray(data) ? data : [];
                };

                const savedVideos = await loadVideos('/videos');
                if (savedVideos.length > 0) {
                    setVideos(savedVideos);
                    return;
                }

                const channelVideos = await loadVideos('/videos/channel');
                setVideos(channelVideos);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchVideos();
    }, []);

    useEffect(() => {
        if (!videos.length) return;
        const el = tickerRef.current;
        if (!el) return;
        const speed = 0.6;

        const tick = () => {
            if (!pausedRef.current) {
                posRef.current -= speed;
                const half = el.scrollWidth / 2;
                if (Math.abs(posRef.current) >= half) posRef.current = 0;
                el.style.transform = `translateX(${posRef.current}px)`;
            }
            animRef.current = requestAnimationFrame(tick);
        };
        animRef.current = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(animRef.current);
    }, [videos]);

    return (
        <div className="yt-section">
            <div className="yt-header">
                <div className="yt-header-text">
                    <span className="yt-eyebrow">Subscribe for stories & updates</span>
                    <h2 className="yt-section-title">Find Us On YouTube</h2>
                </div>
                <a
                    href={YT_CHANNEL_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="yt-subscribe-btn"
                >
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                        <path d="M23.5 6.2s-.3-2-1.2-2.8c-1.1-1.2-2.4-1.2-3-1.3C16.6 2 12 2 12 2s-4.6 0-7.3.1c-.6.1-1.9.1-3 1.3C.8 4.2.5 6.2.5 6.2S.2 8.5.2 10.8v2.1c0 2.3.3 4.6.3 4.6s.3 2 1.2 2.8c1.1 1.2 2.6 1.1 3.3 1.2C7.2 21.7 12 21.8 12 21.8s4.6 0 7.3-.2c.6-.1 1.9-.1 3-1.2.9-.8 1.2-2.8 1.2-2.8s.3-2.3.3-4.6v-2.1C23.8 8.5 23.5 6.2 23.5 6.2zM9.7 15.5V8.4l6.6 3.6-6.6 3.5z"/>
                    </svg>
                    Subscribe
                </a>
            </div>

            {loading ? (
                <div className="yt-loading">Loading videos...</div>
            ) : videos.length === 0 ? (
                <p className="yt-empty">No videos found.</p>
            ) : (
                <div
                    className="yt-ticker-viewport"
                    onMouseEnter={() => { pausedRef.current = true; }}
                    onMouseLeave={() => { pausedRef.current = false; }}
                >
                    <div className="yt-ticker-track" ref={tickerRef}>
                        {[...videos, ...videos].map((v, i) => (
                            <VideoCard key={`${v.youtube_id}-${i}`} v={v} onClick={setActiveVideo} />
                        ))}
                    </div>
                </div>
            )}

            {activeVideo && (
                <div className="yt-modal-overlay" onClick={() => setActiveVideo(null)}>
                    <div className="yt-modal" onClick={(e) => e.stopPropagation()}>
                        <button className="yt-modal-close" onClick={() => setActiveVideo(null)}>&times;</button>
                        <div className="yt-modal-video">
                            <iframe
                                src={`https://www.youtube.com/embed/${activeVideo.youtube_id}?autoplay=1&mute=1&playsinline=1&rel=0&modestbranding=1`}
                                title={activeVideo.title}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                        <p className="yt-modal-title">{activeVideo.title}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default YouTubeSection;
