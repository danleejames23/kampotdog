import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { Link, useParams } from 'react-router-dom';
import { apiUrl, getImageUrl } from '../../config/api';
import './Blogs.css';

const BlogArticle = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchBlog = async () => {
            setLoading(true);
            setError('');
            try {
                const res = await fetch(apiUrl(`/blogs/${id}`));
                if (!res.ok) {
                    throw new Error('Blog not found');
                }
                const data = await res.json();
                setBlog(data);
            } catch (err) {
                setError('Blog not found.');
            } finally {
                setLoading(false);
            }
        };

        fetchBlog();
    }, [id]);

    return (
        <div className="blog-article-page sb-page">
            <div className="blog-article-shell">
                {loading ? (
                    <p className="blog-article-msg">Loading article...</p>
                ) : error || !blog ? (
                    <div className="blog-article-content">
                        <Link to="/blogs" className="blog-article-back">← Back to Blogs</Link>
                        <p className="blog-article-msg">{error || 'Blog not found.'}</p>
                    </div>
                ) : (
                    <div className="blog-article-content">
                        <Link to="/blogs" className="blog-article-back">← Back to Blogs</Link>
                        <h1 className="blog-article-title">{blog.title}</h1>
                        <p className="blog-article-meta">
                            {format(new Date(blog.created_at), 'MMMM d, yyyy')}
                        </p>
                        <div className="blog-article-divider" />
                        <div className="blog-article-body">
                            {blog.image && (
                                <div className="blog-article-inline-media">
                                    <img
                                        src={getImageUrl(blog.image)}
                                        alt={blog.title}
                                        className="blog-article-inline-img"
                                    />
                                </div>
                            )}
                            {blog.content.split('\n').map((para, index) =>
                                para.trim() ? <p key={index}>{para}</p> : <br key={index} />
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BlogArticle;