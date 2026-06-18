import React, { useState, useEffect, useRef } from 'react';
import authFetch from '../../authFetch';
import { apiUrl, getImageUrl } from '../../config/api';

const ManageDogs = () => {
    const [dogs, setDogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingDogId, setEditingDogId] = useState(null);
    const [name, setName] = useState('');
    const [breed, setBreed] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('Male');
    const [description, setDescription] = useState('');
    const [lookingForHome, setLookingForHome] = useState(false);
    const [sponsored, setSponsored] = useState(false);
    const [pinned, setPinned] = useState(false);
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [currentImage, setCurrentImage] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const [successMsg, setSuccessMsg] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const fileInputRef = useRef(null);

    const fetchDogs = async () => {
        setLoading(true);
        try {
            const res = await fetch(apiUrl('/dogs'));
            const data = await res.json();
            setDogs(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchDogs(); }, []);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setErrorMsg('');
            setImage(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const removeImage = () => {
        setImage(null);
        setImagePreview(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const resetForm = () => {
        setEditingDogId(null);
        setName(''); setBreed(''); setAge(''); setGender('Male');
        setDescription('');
        setLookingForHome(false);
        setSponsored(false);
        setPinned(false);
        setImage(null);
        setImagePreview(null);
        setCurrentImage(null);
        setErrorMsg('');
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const handleToggleForm = () => {
        if (showForm) {
            resetForm();
        }
        setShowForm(!showForm);
    };

    const handleEdit = (dog) => {
        setSuccessMsg('');
        setErrorMsg('');
        setEditingDogId(dog.id);
        setName(dog.name || '');
        setBreed(dog.breed || '');
        setAge(dog.age || '');
        setGender(dog.gender || 'Male');
        setDescription(dog.description || '');
        setLookingForHome(Boolean(dog.looking_for_home));
        setSponsored(Boolean(dog.sponsored));
        setPinned(Boolean(dog.pinned));
        setImage(null);
        setImagePreview(null);
        setCurrentImage(dog.image ? getImageUrl(dog.image) : null);
        if (fileInputRef.current) fileInputRef.current.value = '';
        setShowForm(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleSubmit = async () => {
        if (!name.trim()) {
            setErrorMsg('Dog name is required.');
            return;
        }
        setSubmitting(true);
        setSuccessMsg('');
        setErrorMsg('');
        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('breed', breed);
            formData.append('age', age);
            formData.append('gender', gender);
            formData.append('description', description);
            formData.append('looking_for_home', lookingForHome);
            formData.append('sponsored', sponsored);
            formData.append('pinned', pinned);
            if (image) formData.append('image', image);

            const endpoint = editingDogId
                ? `/dogs/${editingDogId}`
                : '/dogs';

            const res = await authFetch(endpoint, {
                method: editingDogId ? 'PUT' : 'POST',
                body: formData,
            });
            const data = await res.json().catch(() => ({}));
            if (res.ok) {
                const nextMessage = editingDogId ? 'Dog updated successfully.' : 'Dog added to The Pack.';
                resetForm();
                setShowForm(false);
                setSuccessMsg(nextMessage);
                setTimeout(() => setSuccessMsg(''), 3000);
                fetchDogs();
                return;
            }
            if (res.status === 401) {
                setErrorMsg('Your admin session expired. Log out and sign in again.');
            } else {
                setErrorMsg(data.error || 'Could not save dog.');
            }
        } catch (err) {
            console.error(err);
            setErrorMsg('Could not save dog. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Delete this dog?')) return;
        try {
            setSuccessMsg('');
            setErrorMsg('');
            const res = await authFetch(`/dogs/${id}`, { method: 'DELETE' });
            const data = await res.json().catch(() => ({}));
            if (!res.ok) {
                setErrorMsg(data.error || 'Could not delete dog.');
                return;
            }
            setSuccessMsg('Dog deleted successfully.');
            setTimeout(() => setSuccessMsg(''), 3000);
            fetchDogs();
        } catch (err) {
            console.error(err);
            setErrorMsg('Could not delete dog. Please try again.');
        }
    };

    return (
        <div className="manage-dogs-container">
            <div className="manage-blogs-header">
                <h2 className="manage-blogs-title">Manage Dogs</h2>
                <button className="new-post-btn" onClick={handleToggleForm}>
                    {showForm ? 'Cancel' : '+ Add Dog'}
                </button>
            </div>

            {successMsg ? <div className="counter-save-notice">{successMsg}</div> : null}
            {errorMsg ? <div className="counter-save-error">{errorMsg}</div> : null}

            {showForm && (
                <div className="blog-editor">
                    <div className="blog-editor-top">
                        <div className="blog-editor-left">
                            <div className="blog-editor-field">
                                <label className="blog-field-label">Dog Name *</label>
                                <input
                                    className="blog-title-input"
                                    type="text"
                                    placeholder="Enter dog's name"
                                    value={name}
                                    onChange={(e) => {
                                        setName(e.target.value);
                                        if (errorMsg) setErrorMsg('');
                                    }}
                                />
                            </div>
                            <div className="blog-editor-row2">
                                <div className="blog-editor-field">
                                    <label className="blog-field-label">Breed</label>
                                    <input
                                        type="text"
                                        placeholder="e.g. Golden Retriever"
                                        value={breed}
                                        onChange={(e) => setBreed(e.target.value)}
                                    />
                                </div>
                                <div className="blog-editor-field">
                                    <label className="blog-field-label">Age</label>
                                    <input
                                        type="text"
                                        placeholder="e.g. 2 years"
                                        value={age}
                                        onChange={(e) => setAge(e.target.value)}
                                    />
                                </div>
                                <div className="blog-editor-field">
                                    <label className="blog-field-label">Gender</label>
                                    <select value={gender} onChange={(e) => setGender(e.target.value)}>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="blog-editor-image-box">
                            <label className="blog-field-label">Dog Photo</label>
                            <div className="blog-image-drop" onClick={() => fileInputRef.current.click()}>
                                {imagePreview ? (
                                    <img src={imagePreview} alt="preview" className="blog-image-preview" />
                                ) : currentImage ? (
                                    <img src={currentImage} alt="Current dog" className="blog-image-preview" />
                                ) : (
                                    <div className="blog-image-placeholder">
                                        <span className="blog-image-icon">🐕</span>
                                        <p>Upload photo of dog</p>
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
                            {(imagePreview || currentImage) && (
                                <button className="blog-remove-img" onClick={removeImage}>Remove selected image</button>
                            )}
                        </div>
                    </div>

                    <label className="dog-home-toggle">
                        <input
                            type="checkbox"
                            checked={lookingForHome}
                            onChange={(e) => {
                                const checked = e.target.checked;
                                setLookingForHome(checked);
                                if (checked) setSponsored(false);
                            }}
                        />
                        <span>This dog needs a sponsor</span>
                    </label>

                    <label className="dog-home-toggle">
                        <input
                            type="checkbox"
                            checked={sponsored}
                            onChange={(e) => {
                                const checked = e.target.checked;
                                setSponsored(checked);
                                if (checked) setLookingForHome(false);
                            }}
                        />
                        <span>This dog is already sponsored</span>
                    </label>

                    <label className="dog-home-toggle">
                        <input
                            type="checkbox"
                            checked={pinned}
                            onChange={(e) => setPinned(e.target.checked)}
                        />
                        <span>Feature this dog on top</span>
                    </label>

                    <label className="blog-field-label">Description</label>
                    <textarea
                        className="blog-textarea-large"
                        placeholder="Write a brief description about this dog - personality, history, special needs..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        style={{ minHeight: '160px' }}
                    />

                    <div className="blog-editor-actions">
                        <button className="blog-cancel-btn" onClick={() => { resetForm(); setShowForm(false); }}>Cancel</button>
                        <button className="new-post-btn" onClick={handleSubmit} disabled={submitting}>
                            {submitting ? (editingDogId ? 'Saving...' : 'Adding...') : (editingDogId ? 'Save Dog' : 'Add Dog')}
                        </button>
                    </div>
                </div>
            )}

            <div className="dog-admin-list">
                {loading ? (
                    <p>Loading...</p>
                ) : dogs.length === 0 ? (
                    <p className="blog-empty-msg">No dogs added yet.</p>
                ) : (
                    dogs.map((dog) => (
                        <div key={dog.id} className="dog-admin-card">
                            {dog.image ? (
                                <img src={getImageUrl(dog.image)} alt={dog.name} className="dog-admin-thumb" />
                            ) : (
                                <div className="dog-admin-thumb-placeholder">🐕</div>
                            )}
                            <div className="dog-admin-info">
                                <h3>{dog.name}</h3>
                                <p>{[dog.breed, dog.age, dog.gender].filter(Boolean).join(' • ')}</p>
                                <div className="dog-admin-status-row">
                                    {dog.looking_for_home ? <span className="dog-admin-status">Needs a Sponsor</span> : null}
                                    {dog.sponsored ? <span className="dog-admin-status dog-admin-status--sponsored">Sponsored</span> : null}
                                    {dog.pinned ? <span className="dog-admin-status dog-admin-status--featured">Featured</span> : null}
                                </div>
                            </div>
                            <div className="dog-admin-actions">
                                <button className="dog-admin-edit" onClick={() => handleEdit(dog)}>Edit</button>
                                <button className="dog-admin-delete" onClick={() => handleDelete(dog.id)}>Delete</button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default ManageDogs;
