import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { apiUrl, getImageUrl } from '../../config/api';
import './ThePack.css';

const DogDetail = () => {
    const { id } = useParams();
    const [dog, setDog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchDog = async () => {
            try {
                const res = await fetch(apiUrl(`/dogs/${id}`));
                if (!res.ok) throw new Error('Not found');
                const data = await res.json();
                setDog(data);
            } catch (err) {
                setError(true);
            } finally {
                setLoading(false);
            }
        };
        fetchDog();
    }, [id]);

    if (loading) return <div className="dog-detail-page sb-page"><p className="pack-msg">Loading...</p></div>;
    if (error || !dog) return (
        <div className="dog-detail-page sb-page">
            <p className="pack-msg">Dog not found.</p>
            <Link to="/the-pack" className="back-to-pack">← Back to The Pack</Link>
        </div>
    );

    return (
        <div className="dog-detail-page sb-page">
            <Link to="/the-pack" className="back-to-pack">← Back to The Pack</Link>

            <div className="dog-detail-card">
                <div className="dog-detail-image">
                    {dog.image ? (
                        <img src={getImageUrl(dog.image)} alt={dog.name} />
                    ) : (
                        <div className="dog-detail-placeholder">
                            <span>🐕</span>
                        </div>
                    )}
                </div>

                <div className="dog-detail-info">
                    <h1 className="dog-detail-name">{dog.name}</h1>

                    <div className="dog-detail-tags">
                        {dog.breed && <span className="dog-tag">{dog.breed}</span>}
                        {dog.age && <span className="dog-tag">{dog.age}</span>}
                        {dog.gender && <span className="dog-tag">{dog.gender}</span>}
                    </div>

                    {dog.description && (
                        <div className="dog-detail-desc">
                            <h3>About {dog.name}</h3>
                            {dog.description.split('\n').map((para, i) =>
                                para.trim() ? <p key={i}>{para}</p> : <br key={i} />
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DogDetail;
