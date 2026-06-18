require('dotenv').config();
const express = require('express');
require('./db');
const path = require('path');
const petRouter = require('./Routes/PetRoute');
const AdoptFormRoute = require('./Routes/AdoptFormRoute');
const AdminRoute = require('./Routes/AdminRoute');
const BlogRoute = require('./Routes/BlogRoute');
const DogRoute = require('./Routes/DogRoute');
const CounterRoute = require('./Routes/CounterRoute');
const VideoRoute = require('./Routes/VideoRoute');
const SettingsRoute = require('./Routes/SettingsRoute');
const ReturnRoute = require('./Routes/ReturnRoute');
const ContactRoute = require('./Routes/ContactRoute');
const SponsorshipRoute = require('./Routes/SponsorshipRoute');
const cors = require('cors');

const app = express();

const allowedOrigins = (process.env.CORS_ORIGIN || '')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);

app.use(cors(allowedOrigins.length > 0 ? { origin: allowedOrigins } : undefined));

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/booklet', express.static(path.join(__dirname, '../booklet')));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get('/documents/adoption-brochure.pdf', (req, res) => {
    res.sendFile(path.join(__dirname, '../WEBSITE adoption brochure.pdf'));
});

app.use(petRouter);
app.use('/form', AdoptFormRoute);
app.use('/admin', AdminRoute);
app.use('/blogs', BlogRoute);
app.use('/dogs', DogRoute);
app.use('/counters', CounterRoute);
app.use('/videos', VideoRoute);
app.use('/settings', SettingsRoute);
app.use('/returns', ReturnRoute);
app.use('/contact', ContactRoute);
app.use('/sponsorships', SponsorshipRoute);

// Serve React frontend static files
app.use(express.static(path.join(__dirname, '../Client/build')));

// Catch-all: serve React app for any non-API route
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../Client/build/index.html'));
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});