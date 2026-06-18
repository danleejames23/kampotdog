const db = require('../db');
const https = require('https');

const CHANNEL_ID = 'UCQYHP_ZO2q3h-4siG7TwPSQ';

const fetchUrl = (url, callback) => {
    const options = {
        headers: { 'User-Agent': 'Mozilla/5.0 (compatible; KDSBot/1.0)' }
    };
    https.get(url, options, (response) => {
        if (response.statusCode === 301 || response.statusCode === 302) {
            return fetchUrl(response.headers.location, callback);
        }
        let data = '';
        response.on('data', chunk => { data += chunk; });
        response.on('end', () => callback(null, data));
    }).on('error', (err) => callback(err));
};

const parseVideos = (xml) => {
    const videos = [];
    const entryRegex = /<entry>([\s\S]*?)<\/entry>/g;
    let match;
    while ((match = entryRegex.exec(xml)) !== null) {
        const entry = match[1];
        const idMatch = entry.match(/<yt:videoId>([^<]+)<\/yt:videoId>/);
        const titleMatch = entry.match(/<title>([^<]*)<\/title>/);
        const thumbMatch = entry.match(/url="(https:\/\/i\d\.ytimg\.com[^"]+)"/);
        const publishedMatch = entry.match(/<published>([^<]+)<\/published>/);
        if (idMatch && titleMatch) {
            const vid = idMatch[1].trim();
            videos.push({
                youtube_id: vid,
                title: titleMatch[1].replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').trim(),
                thumbnail: thumbMatch ? thumbMatch[1] : `https://img.youtube.com/vi/${vid}/hqdefault.jpg`,
                published: publishedMatch ? publishedMatch[1].trim() : null,
            });
        }
    }
    return videos;
};

const getChannelVideos = (req, res) => {
    const url = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;
    fetchUrl(url, (err, data) => {
        if (err) return res.status(500).json({ error: 'Failed to fetch channel feed' });
        try {
            res.json(parseVideos(data));
        } catch (e) {
            res.status(500).json({ error: 'Failed to parse feed' });
        }
    });
};

const getVideos = (req, res) => {
    try {
        const rows = db.prepare('SELECT * FROM videos ORDER BY created_at DESC').all();
        res.status(200).json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const createVideo = (req, res) => {
    try {
        const { youtube_id, title } = req.body;
        if (!youtube_id || !title) {
            return res.status(400).json({ error: 'youtube_id and title are required' });
        }
        const info = db.prepare('INSERT INTO videos (youtube_id, title) VALUES (?, ?)').run(youtube_id, title);
        const row = db.prepare('SELECT * FROM videos WHERE id = ?').get(info.lastInsertRowid);
        res.status(201).json(row);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const deleteVideo = (req, res) => {
    try {
        const { id } = req.params;
        db.prepare('DELETE FROM videos WHERE id = ?').run(id);
        res.status(200).json({ message: 'Video deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { getVideos, getChannelVideos, createVideo, deleteVideo };
