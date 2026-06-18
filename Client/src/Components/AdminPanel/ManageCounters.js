import React, { useState, useEffect } from 'react';
import authFetch from '../../authFetch';
import { apiUrl } from '../../config/api';

const ManageCounters = () => {
    const [counters, setCounters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(null);
    const [editValue, setEditValue] = useState('');
    const [editLabel, setEditLabel] = useState('');
    const [saving, setSaving] = useState(false);
    const [saveNotice, setSaveNotice] = useState('');
    const [saveError, setSaveError] = useState('');

    const fetchCounters = async () => {
        try {
            const res = await fetch(apiUrl(`/counters?ts=${Date.now()}`), {
                cache: 'no-store',
            });
            const data = await res.json();
            setCounters(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchCounters(); }, []);

    const startEdit = (counter) => {
        setEditing(counter.key);
        setEditValue(counter.value);
        setEditLabel(counter.label);
    };

    const cancelEdit = () => {
        setEditing(null);
        setEditValue('');
        setEditLabel('');
        setSaveError('');
    };

    useEffect(() => {
        if (!saveNotice) {
            return undefined;
        }

        const timeoutId = window.setTimeout(() => {
            setSaveNotice('');
        }, 2500);

        return () => window.clearTimeout(timeoutId);
    }, [saveNotice]);

    const saveEdit = async (key) => {
        setSaving(true);
        setSaveError('');
        try {
            const res = await authFetch(`/counters/${key}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ value: editValue, label: editLabel }),
            });
            if (res.ok) {
                const updatedCounter = await res.json();
                setCounters((currentCounters) => currentCounters.map((counter) => (
                    counter.key === key ? updatedCounter : counter
                )));
                setEditing(null);
                setEditValue('');
                setEditLabel('');
                setSaveNotice('Saved');
                fetchCounters();
            } else {
                const errorData = await res.json().catch(() => ({}));
                setSaveError(errorData.error || 'Save failed. Please log in again and retry.');
            }
        } catch (err) {
            console.error(err);
            setSaveError('Save failed. Please check the server connection and try again.');
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="manage-counters-container">
            <h2 className="manage-blogs-title">Site Counters</h2>
            <p style={{ color: '#888', fontSize: '14px', marginBottom: '20px' }}>
                Edit the counter values displayed on the homepage banner.
            </p>
            {saveNotice ? <div className="counter-save-notice">{saveNotice}</div> : null}
            {saveError ? <div className="counter-save-error">{saveError}</div> : null}

            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className="counter-admin-list">
                    {counters.map((c) => (
                        <div key={c.key} className="counter-admin-card">
                            {editing === c.key ? (
                                <div className="counter-edit-form">
                                    <div className="counter-edit-fields">
                                        <div className="counter-edit-field">
                                            <label className="blog-field-label">Value</label>
                                            <input
                                                type="text"
                                                value={editValue}
                                                onChange={(e) => setEditValue(e.target.value)}
                                            />
                                        </div>
                                        <div className="counter-edit-field">
                                            <label className="blog-field-label">Label</label>
                                            <input
                                                type="text"
                                                value={editLabel}
                                                onChange={(e) => setEditLabel(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="counter-edit-actions">
                                        <button className="blog-cancel-btn" onClick={cancelEdit}>Cancel</button>
                                        <button className="new-post-btn" onClick={() => saveEdit(c.key)} disabled={saving}>
                                            {saving ? 'Saving...' : 'Save'}
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="counter-admin-display">
                                    <div className="counter-admin-info">
                                        <span className="counter-admin-value">{c.value}</span>
                                        <span className="counter-admin-label">{c.label}</span>
                                    </div>
                                    <button className="counter-edit-btn" onClick={() => startEdit(c)}>Edit</button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ManageCounters;
