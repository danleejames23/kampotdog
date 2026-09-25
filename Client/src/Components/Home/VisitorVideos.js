import React, { useEffect, useRef, useState } from 'react';
import './LearnMore.css';

const defaultVideo = {
    id: 'KLlYX7sbeHo',
    title: 'KDS Visitor Review',
    byline: 'Tom Trips Out',
    description: 'A full review and experience video from a KDS visitor.',
};

const VisitorVideos = ({
    eyebrow = 'KDS Visitor Stories',
    sectionTitle = 'Visitor Reviews From KDS',
    subtitle = 'Honest reviews and experience videos from people who have visited the sanctuary. Check the other pages for more reviews and visitor stories.',
    badgeLabel = 'Video',
    video = defaultVideo,
}) => {
    const [activeVideoId, setActiveVideoId] = useState('');
    const sectionRef = useRef(null);

    useEffect(() => {
        if (!sectionRef.current || activeVideoId) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setActiveVideoId(video.id);
                    observer.disconnect();
                }
            },
            { threshold: 0.5 }
        );

        observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, [activeVideoId, video.id]);

    return (
        <section className="visitor-videos-section" ref={sectionRef}>
            <div className="visitor-videos-shell">
                <span className="visitor-videos-eyebrow">{eyebrow}</span>
                <h2 className="visitor-videos-title">{sectionTitle}</h2>
                <p className="visitor-videos-subtitle">{subtitle}</p>

                <div className="visitor-video-card">
                    <div className="visitor-video-wrapper">
                        {activeVideoId ? (
                            <iframe
                                src={`https://www.youtube.com/embed/${activeVideoId}?autoplay=0&playsinline=1&rel=0&modestbranding=1&controls=1`}
                                title={video.title}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                referrerPolicy="strict-origin-when-cross-origin"
                            ></iframe>
                        ) : (
                            <img
                                src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`}
                                alt={video.title}
                                className="visitor-video-thumb"
                                loading="lazy"
                            />
                        )}
                    </div>

                    <div className="visitor-video-meta">
                        <span className="visitor-video-badge">{badgeLabel}</span>
                        <h3>{video.title}</h3>
                        <p className="visitor-video-byline">By {video.byline}</p>
                        <p className="visitor-video-desc">{video.description}</p>
                        <a className="learn-more-video-fallback" href={`https://www.youtube.com/watch?v=${video.id}`} target="_blank" rel="noopener noreferrer">
                            Watch on YouTube ↗
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default VisitorVideos;
