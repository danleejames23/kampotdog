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

const fetchYoutubeTitle = async (videoId) => {
    try {
        const res = await fetch(
            `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`
        );
        if (res.ok) {
            const data = await res.json();
            return data.title || '';
        }
    } catch (err) {
        console.error('Could not fetch YouTube title:', err);
    }
    return '';
};

const ManageVideos = () => {
    const [videos, setVideos] = useState([]);
    const [url, setUrl] = useState('');
    const [title, setTitle] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [loading, setLoading] = useState(true);
    const [adding, setAdding] = useState(false);
    const [fetchingTitle, setFetchingTitle] = useState(false);

    const fetchVideos = async () => {
        try {
            const res = await fetch(apiUrl('/videos'));
            const data = await res.json();
            setVideos(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchVideos(); }, []);

    const handleUrlChange = async (e) => {
        const newUrl = e.target.value;
        setUrl(newUrl);
        const videoId = extractYoutubeId(newUrl);
        if (videoId) {
            setFetchingTitle(true);
            const fetchedTitle = await fetchYoutubeTitle(videoId);
            if (fetchedTitle) setTitle(fetchedTitle);
            setFetchingTitle(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const youtube_id = extractYoutubeId(url);
        if (!youtube_id) return alert('Invalid YouTube URL. Please paste a valid YouTube link.');

        const videoTitle = title.trim() || 'Untitled Video';
        setAdding(true);

        try {
            const res = await authFetch('/videos', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ youtube_id, title: videoTitle }),
            });
            if (res.ok) {
                setUrl('');
                setTitle('');
                setShowForm(false);
                fetchVideos();
            } else {
                const err = await res.json();
                alert('Error: ' + (err.error || 'Failed to add video'));
            }
        } catch (err) {
            console.error(err);
            alert('Network error. Make sure the server is running.');
        } finally {
            setAdding(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Delete this video?')) return;
        try {
            const res = await authFetch(`/videos/${id}`, { method: 'DELETE' });
            if (res.ok) fetchVideos();
        } catch (err) {
            console.error(err);
        }
    };

    const detectedId = extractYoutubeId(url);

    return (
        <div className="manage-videos-container">
            <div className="manage-blogs-header">
                <h2 className="manage-blogs-title">YouTube Videos</h2>
                <button className="new-post-btn" onClick={() => setShowForm(!showForm)}>
                    {showForm ? 'Cancel' : '+ Add Video'}
                </button>
            </div>

            {showForm && (
                <form className="video-add-form" onSubmit={handleSubmit}>
                    <div className="video-form-field">
                        <label className="blog-field-label">YouTube URL</label>
                        <input
                            type="text"
                            placeholder="Paste YouTube video link here"
                            value={url}
                            onChange={handleUrlChange}
                        />
                    </div>
                    {fetchingTitle && <p style={{ color: '#888', fontSize: '13px' }}>Fetching title...</p>}
                    {title && (
                        <div className="video-form-field">
                            <label className="blog-field-label">Video Title (auto-detected)</label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>
                    )}
                    {detectedId && (
                        <div className="video-preview">
                            <img
                                src={`https://img.youtube.com/vi/${detectedId}/mqdefault.jpg`}
                                alt="Thumbnail preview"
                            />
                        </div>
                    )}
                    <button type="submit" className="new-post-btn" disabled={adding || !detectedId}>
                        {adding ? 'Adding...' : 'Add Video'}
                    </button>
                </form>
            )}

            {loading ? (
                <p>Loading...</p>
            ) : videos.length === 0 ? (
                <p style={{ color: '#888', marginTop: '20px' }}>No videos added yet.</p>
            ) : (
                <div className="video-admin-list">
                    {videos.map((v) => (
                        <div key={v.id} className="video-admin-card">
                            <img
                                className="video-admin-thumb"
                                src={`https://img.youtube.com/vi/${v.youtube_id}/mqdefault.jpg`}
                                alt={v.title}
                            />
                            <div className="video-admin-info">
                                <p className="video-admin-title">{v.title}</p>
                                <p className="video-admin-id">{v.youtube_id}</p>
                            </div>
                            <button className="dog-admin-delete" onClick={() => handleDelete(v.id)}>Delete</button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ManageVideos;
