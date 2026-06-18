import React, { useState, useEffect } from 'react';
import authFetch from '../../authFetch';
import { apiUrl } from '../../config/api';

const extractYoutubeId = (url) => {
    if (!url) return null;
    const trimmed = url.trim();
    const patterns = [
        /[?&]v=([a-zA-Z0-9_-]{11})/,
        /youtu\.be\/([a-zA-Z0-9_-]{11})/,
        /youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/,
        /youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/,
        /^([a-zA-Z0-9_-]{11})$/,
    ];
    for (const p of patterns) {
        const match = trimmed.match(p);
        if (match) return match[1];
    }
    return null;
};

const ManageFeaturedVideo = () => {
    const [videoId, setVideoId] = useState('');
    const [title, setTitle] = useState('');
    const [url, setUrl] = useState('');
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const res = await fetch(apiUrl('/settings'));
                const data = await res.json();
                if (data.featured_video_id) setVideoId(data.featured_video_id);
                if (data.featured_video_title) setTitle(data.featured_video_title);
            } catch (err) {
                console.error(err);
            }
        };
        fetchSettings();
    }, []);

    const handleUrlChange = (e) => {
        setUrl(e.target.value);
        setMessage('');
    };

    const handleSave = async () => {
        if (url && !extractYoutubeId(url)) {
            return setMessage('Invalid YouTube URL');
        }

        setSaving(true);
        try {
            if (url && extractYoutubeId(url)) {
                await authFetch('/settings/featured_video_id', {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ value: extractYoutubeId(url) }),
                });
                setVideoId(extractYoutubeId(url));
            }
            if (title.trim()) {
                await authFetch('/settings/featured_video_title', {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ value: title.trim() }),
                });
            }
            setUrl('');
            setMessage('Saved successfully!');
        } catch (err) {
            console.error(err);
            setMessage('Error saving');
        } finally {
            setSaving(false);
        }
    };

    const previewId = extractYoutubeId(url) || videoId;

    return (
        <div className="manage-videos-container">
            <div className="manage-blogs-header">
                <h2 className="manage-blogs-title">Featured Documentary</h2>
            </div>

            <div className="video-add-form">
                <div className="video-form-field">
                    <label className="blog-field-label">Section Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => { setTitle(e.target.value); setMessage(''); }}
                        placeholder="Learn More In This Documentary"
                    />
                </div>

                <div className="video-form-field">
                    <label className="blog-field-label">YouTube URL (paste to change video)</label>
                    <input
                        type="text"
                        value={url}
                        onChange={handleUrlChange}
                        placeholder="https://www.youtube.com/watch?v=..."
                    />
                </div>

                {previewId && (
                    <div className="video-preview">
                        <img
                            src={`https://img.youtube.com/vi/${previewId}/hqdefault.jpg`}
                            alt="Current featured video"
                            style={{ maxWidth: '400px', borderRadius: '10px' }}
                        />
                        <p style={{ fontSize: '12px', color: '#888', marginTop: '6px' }}>
                            Current ID: {previewId}
                        </p>
                    </div>
                )}

                {message && (
                    <p style={{ color: message.includes('Error') || message.includes('Invalid') ? '#e74c3c' : '#27ae60', fontWeight: 'bold', fontSize: '14px' }}>
                        {message}
                    </p>
                )}

                <button className="new-post-btn" onClick={handleSave} disabled={saving}>
                    {saving ? 'Saving...' : 'Save Changes'}
                </button>
            </div>
        </div>
    );
};

export default ManageFeaturedVideo;
