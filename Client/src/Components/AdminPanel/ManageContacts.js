import React, { useState, useEffect } from 'react';
import { apiUrl } from '../../config/api';

const STATUS_COLOURS = {
    unread:     { bg: '#fff3cd', color: '#856404' },
    read:       { bg: '#d1ecf1', color: '#0c5460' },
    responded:  { bg: '#d4edda', color: '#155724' },
    archived:   { bg: '#e2e3e5', color: '#383d41' },
};

const ManageContacts = () => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');

    const fetchMessages = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('adminToken');
            const res = await fetch(apiUrl('/contact/all'), {
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = await res.json();
            setMessages(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchMessages(); }, []);

    const updateStatus = async (id, status) => {
        const token = localStorage.getItem('adminToken');
        await fetch(apiUrl(`/contact/status/${id}`), {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
            body: JSON.stringify({ status }),
        });
        setMessages(m => m.map(x => x.id === id ? { ...x, status } : x));
    };

    const deleteMessage = async (id) => {
        if (!window.confirm('Delete this message?')) return;
        const token = localStorage.getItem('adminToken');
        await fetch(apiUrl(`/contact/delete/${id}`), {
            method: 'DELETE',
            headers: { Authorization: `Bearer ${token}` },
        });
        setMessages(m => m.filter(x => x.id !== id));
    };

    const filtered = filter === 'all' ? messages : messages.filter(m => m.status === filter);
    const unreadCount = messages.filter(m => m.status === 'unread').length;

    return (
        <div style={{ padding: '24px' }}>
            <h2 style={{ fontFamily: 'var(--title-font)', color: '#008B8B', fontSize: '1.8rem', marginBottom: '8px' }}>
                Contact Messages
            </h2>
            <p style={{ color: '#666', fontFamily: 'Oxygen, sans-serif', fontSize: '0.9rem', marginBottom: '24px' }}>
                {messages.length} total &bull; <strong style={{ color: '#856404' }}>{unreadCount} unread</strong>
            </p>

            {/* Filter tabs */}
            <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', flexWrap: 'wrap' }}>
                {['all', 'unread', 'read', 'responded', 'archived'].map(f => (
                    <button key={f} onClick={() => setFilter(f)} style={{
                        padding: '7px 18px', borderRadius: '999px',
                        border: filter === f ? 'none' : '1.5px solid #ddd',
                        background: filter === f ? '#008B8B' : 'white',
                        color: filter === f ? 'white' : '#555',
                        fontFamily: 'Oxygen, sans-serif', fontSize: '0.82rem', fontWeight: 700,
                        cursor: 'pointer', textTransform: 'capitalize',
                    }}>{f}</button>
                ))}
            </div>

            {loading ? (
                <p style={{ color: '#999', fontFamily: 'Oxygen, sans-serif' }}>Loading...</p>
            ) : filtered.length === 0 ? (
                <p style={{ color: '#999', fontFamily: 'Oxygen, sans-serif' }}>No messages found.</p>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {filtered.map(m => {
                        const sc = STATUS_COLOURS[m.status] || STATUS_COLOURS.unread;
                        return (
                            <div key={m.id} style={{
                                background: 'white', borderRadius: '16px', padding: '24px 28px',
                                boxShadow: '0 2px 12px rgba(0,0,0,0.07)',
                                borderLeft: `4px solid ${m.status === 'unread' ? '#f59e0b' : '#008B8B'}`,
                            }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '16px', flexWrap: 'wrap' }}>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                                            <h3 style={{ fontFamily: 'var(--title-font)', fontSize: '1.1rem', margin: 0, color: '#1F2130' }}>
                                                {m.subject}
                                            </h3>
                                            <span style={{
                                                background: sc.bg, color: sc.color,
                                                padding: '3px 12px', borderRadius: '999px',
                                                fontFamily: 'Oxygen, sans-serif', fontSize: '0.75rem', fontWeight: 700,
                                                textTransform: 'capitalize',
                                            }}>{m.status}</span>
                                        </div>
                                        <p style={{ margin: '0 0 4px', fontFamily: 'Oxygen, sans-serif', fontSize: '0.9rem', color: '#444' }}>
                                            <strong>{m.name}</strong> - <a href={`mailto:${m.email}`} style={{ color: '#008B8B' }}>{m.email}</a>
                                        </p>
                                        <div style={{ margin: '12px 0 0', background: '#f5f4f0', borderRadius: '10px', padding: '14px 16px' }}>
                                            <p style={{ fontFamily: 'Oxygen, sans-serif', fontSize: '0.92rem', color: '#444', lineHeight: 1.6, margin: 0, whiteSpace: 'pre-wrap' }}>
                                                {m.message}
                                            </p>
                                        </div>
                                        <p style={{ margin: '8px 0 0', fontFamily: 'Oxygen, sans-serif', fontSize: '0.75rem', color: '#aaa' }}>
                                            {new Date(m.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                                        </p>
                                    </div>

                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', minWidth: '150px' }}>
                                        <a href={`mailto:${m.email}?subject=Re: ${encodeURIComponent(m.subject)}`}
                                            style={{ padding: '8px 12px', borderRadius: '8px', background: '#e6f5f5', color: '#008B8B', fontFamily: 'Oxygen, sans-serif', fontSize: '0.82rem', fontWeight: 700, textDecoration: 'none', textAlign: 'center' }}>
                                            Reply via Email
                                        </a>
                                        <label style={{ fontFamily: 'Oxygen, sans-serif', fontSize: '0.75rem', fontWeight: 700, color: '#888', textTransform: 'uppercase', letterSpacing: '1px' }}>Status</label>
                                        <select value={m.status} onChange={e => updateStatus(m.id, e.target.value)}
                                            style={{ padding: '8px 12px', borderRadius: '8px', border: '1.5px solid #ddd', fontFamily: 'Oxygen, sans-serif', fontSize: '0.88rem', cursor: 'pointer' }}>
                                            <option value="unread">Unread</option>
                                            <option value="read">Read</option>
                                            <option value="responded">Responded</option>
                                            <option value="archived">Archived</option>
                                        </select>
                                        <button onClick={() => deleteMessage(m.id)}
                                            style={{ padding: '8px 12px', borderRadius: '8px', border: 'none', background: '#fee2e2', color: '#991b1b', fontFamily: 'Oxygen, sans-serif', fontSize: '0.82rem', fontWeight: 700, cursor: 'pointer' }}>
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default ManageContacts;
