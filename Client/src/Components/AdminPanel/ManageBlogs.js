import React, { useState, useEffect, useRef } from 'react';
import { formatDistanceToNow } from 'date-fns';
import authFetch from '../../authFetch';
import { apiUrl, getImageUrl } from '../../config/api';
import '../Blogs/Blogs.css';

const CATEGORIES = ['Dog Care', 'Cat Care', 'Adoption Tips', 'Health & Nutrition', 'Training', 'News'];

const ManageBlogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showEditor, setShowEditor] = useState(false);
    const [editingBlogId, setEditingBlogId] = useState(null);
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState(CATEGORIES[0]);
    const [content, setContent] = useState('');
    const [author, setAuthor] = useState('Admin');
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [removeExistingImage, setRemoveExistingImage] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [successMsg, setSuccessMsg] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const fileInputRef = useRef(null);

    const fetchBlogs = async () => {
        setLoading(true);
        try {
            const res = await fetch(apiUrl('/blogs'));
            const data = await res.json();
            setBlogs(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchBlogs(); }, []);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setImageFile(file);
        setImagePreview(URL.createObjectURL(file));
    };

    const resetForm = () => {
        setEditingBlogId(null);
        setTitle('');
        setCategory(CATEGORIES[0]);
        setContent('');
        setAuthor('Admin');
        setImageFile(null);
        setImagePreview(null);
        setRemoveExistingImage(false);
        setErrorMsg('');
    };

    const handleEdit = (blog) => {
        setEditingBlogId(blog.id);
        setTitle(blog.title || '');
        setCategory(blog.category || CATEGORIES[0]);
        setContent(blog.content || '');
        setAuthor(blog.author || 'Admin');
        setImageFile(null);
        setImagePreview(blog.image ? getImageUrl(blog.image) : null);
        setRemoveExistingImage(false);
        setErrorMsg('');
        setSuccessMsg('');
        setShowEditor(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title.trim() || !content.trim()) {
            setErrorMsg('Title and content are required.');
            return;
        }
        setSubmitting(true);
        setErrorMsg('');
        try {
            const formData = new FormData();
            formData.append('title', title);
            formData.append('category', category);
            formData.append('content', content);
            formData.append('author', author);
            formData.append('remove_image', removeExistingImage ? 'true' : 'false');
            if (imageFile) formData.append('image', imageFile);

            const endpoint = editingBlogId ? `/blogs/${editingBlogId}` : '/blogs';
            const method = editingBlogId ? 'PUT' : 'POST';
            const res = await authFetch(endpoint, {
                method,
                body: formData,
            });
            if (!res.ok) throw new Error('Failed to save');
            setSuccessMsg(editingBlogId ? 'Blog post updated!' : 'Blog post published!');
            setTimeout(() => setSuccessMsg(''), 3000);
            resetForm();
            setShowEditor(false);
            fetchBlogs();
        } catch (err) {
            setErrorMsg('Error publishing blog post.');
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async (id) => {
        try {
            const res = await authFetch(`/blogs/${id}`, { method: 'DELETE' });
            if (!res.ok) throw new Error('Failed to delete');
            setBlogs((prev) => prev.filter((b) => b.id !== id));
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="manage-blogs-container">
            <div className="manage-blogs-header">
                <h2 className="manage-blogs-title">Blog Posts</h2>
                <button className="new-post-btn" onClick={() => {
                    if (showEditor) {
                        resetForm();
                        setShowEditor(false);
                    } else {
                        resetForm();
                        setShowEditor(true);
                    }
                }}>
                    {showEditor ? '✕ Cancel' : '+ New Post'}
                </button>
            </div>

            {successMsg && <p className="blog-success-msg">{successMsg}</p>}

            {showEditor && (
                <form className="blog-editor" onSubmit={handleSubmit}>
                    <div className="blog-editor-top">
                        <div className="blog-editor-left">
                            <label className="blog-field-label">Post Title</label>
                            <input
                                className="blog-input blog-title-input"
                                type="text"
                                placeholder="Enter a compelling title..."
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                            <div className="blog-editor-row2">
                                <div className="blog-editor-field">
                                    <label className="blog-field-label">Category</label>
                                    <select className="blog-select" value={category} onChange={(e) => setCategory(e.target.value)}>
                                        {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                                    </select>
                                </div>
                                <div className="blog-editor-field">
                                    <label className="blog-field-label">Author</label>
                                    <input
                                        className="blog-input"
                                        type="text"
                                        placeholder="Author name"
                                        value={author}
                                        onChange={(e) => setAuthor(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="blog-editor-image-box">
                            <label className="blog-field-label">Blog Image</label>
                            <div
                                className="blog-image-drop"
                                onClick={() => fileInputRef.current.click()}
                            >
                                {imagePreview ? (
                                    <img src={imagePreview} alt="preview" className="blog-image-preview" />
                                ) : (
                                    <div className="blog-image-placeholder">
                                        <span className="blog-image-icon">🖼</span>
                                        <p>Upload image that goes with blog</p>
                                        <small>JPG, PNG, WEBP</small>
                                    </div>
                                )}
                            </div>
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                style={{ display: 'none' }}
                                onChange={handleImageChange}
                            />
                            {imagePreview && (
                                <button type="button" className="blog-remove-img" onClick={() => {
                                    setImageFile(null);
                                    setImagePreview(null);
                                    if (editingBlogId) setRemoveExistingImage(true);
                                }}>
                                    Remove image
                                </button>
                            )}
                        </div>
                    </div>

                    <label className="blog-field-label">Article Content</label>
                    <textarea
                        className="blog-textarea blog-textarea-large"
                        placeholder="Write your full article here. Share tips, stories, advice - go into as much detail as you like..."
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        rows={18}
                    />
                    <div className="blog-char-count">{content.length} characters</div>

                    {errorMsg && <p className="error-message">{errorMsg}</p>}

                    <div className="blog-editor-actions">
                        <button type="button" className="blog-cancel-btn" onClick={() => { resetForm(); setShowEditor(false); }}>
                            Cancel
                        </button>
                        <button className="blog-submit-btn" type="submit" disabled={submitting}>
                            {submitting ? (editingBlogId ? 'Saving...' : 'Publishing...') : (editingBlogId ? 'Save Changes' : '🚀 Publish Post')}
                        </button>
                    </div>
                </form>
            )}

            <div className="blog-list">
                {loading ? (
                    <p>Loading posts...</p>
                ) : blogs.length === 0 ? (
                    <p className="blog-empty-msg">No blog posts yet. Click <strong>+ New Post</strong> to create one.</p>
                ) : (
                    blogs.map((blog) => (
                        <div key={blog.id} className="blog-list-item">
                            {blog.image && (
                                <img
                                    src={getImageUrl(blog.image)}
                                    alt={blog.title}
                                    className="blog-list-thumb"
                                />
                            )}
                            <div className="blog-list-body">
                                <div className="blog-list-item-header">
                                    <div>
                                        <span className="blog-list-category">{blog.category}</span>
                                        <strong className="blog-list-title">{blog.title}</strong>
                                        <span className="blog-list-meta">
                                            by {blog.author} &bull; {formatDistanceToNow(new Date(blog.created_at), { addSuffix: true })}
                                        </span>
                                    </div>
                                    <div className="blog-list-actions">
                                        <button className="blog-edit-btn" onClick={() => handleEdit(blog)}>Edit</button>
                                        <button className="blog-delete-btn" onClick={() => handleDelete(blog.id)}>Delete</button>
                                    </div>
                                </div>
                                <p className="blog-list-content">
                                    {blog.content.length > 150 ? blog.content.substring(0, 150) + '...' : blog.content}
                                </p>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default ManageBlogs;
