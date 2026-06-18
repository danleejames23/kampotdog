import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { apiUrl, getImageUrl } from '../../config/api';
import '../Pages/Pages.css';
import './Blogs.css';
import PawConfetti from '../Scrapbook/PawConfetti';

const Blogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchBlogs = async () => {
        setLoading(true);
        try {
            const res = await fetch(apiUrl('/blogs'));
            const data = await res.json();
            if (!Array.isArray(data)) {
                setBlogs([]);
                return;
            }

            const featuredTitle = 'who is joe?';
            const featured = data.filter((blog) => blog.title?.trim().toLowerCase() === featuredTitle);
            const others = data.filter((blog) => blog.title?.trim().toLowerCase() !== featuredTitle);
            setBlogs([...featured, ...others]);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBlogs();
    }, []);

    return (
        <div className="blogs-page sb-page">
            <PawConfetti />
            <section className="kds-hero kds-hero--orange blogs-hero">
                <div className="kds-hero-content">
                    <span className="kds-eyebrow">KDS Stories</span>
                    <h1>Information / Blogs</h1>
                    <p className="kds-hero-sub">Tips, stories, and dog profiles from the sanctuary.</p>
                </div>
            </section>

            <section className="blogs-grid-wrap">
                <div className="blogs-grid">
                {loading ? (
                    <p className="blogs-msg">Loading...</p>
                ) : blogs.length === 0 ? (
                    <p className="blogs-msg">No posts yet.</p>
                ) : (
                    blogs.map((blog) => (
                        <Link key={blog.id} to={`/blogs/${blog.id}`} className="blog-card-link">
                            <div className="blog-card">
                                <div className="blog-card-thumb">
                                    {blog.image ? (
                                        <img
                                            src={getImageUrl(blog.image)}
                                            alt={blog.title}
                                            className="blog-thumb-img"
                                        />
                                    ) : (
                                        <div className="blog-thumb-placeholder">
                                            <span>🐾</span>
                                        </div>
                                    )}
                                </div>
                                <div className="blog-card-body">
                                    <h2 className="blog-card-title">{blog.title}</h2>
                                    <p className="blog-card-meta">
                                        {formatDistanceToNow(new Date(blog.created_at), { addSuffix: true })}
                                    </p>
                                    <p className="blog-card-excerpt">
                                        {blog.content.length > 120
                                            ? blog.content.substring(0, 120) + '...'
                                            : blog.content}
                                    </p>
                                    <span className="blog-card-read-btn">Read Article →</span>
                                </div>
                            </div>
                        </Link>
                    ))
                )}
                </div>
            </section>
        </div>
    );
};

export default Blogs;
