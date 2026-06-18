import React, { useState, useEffect } from 'react';
import { apiUrl } from '../../config/api';

const STATUS_COLOURS = {
    pending:    { bg: '#fff3cd', color: '#856404' },
    contacted:  { bg: '#d1ecf1', color: '#0c5460' },
    resolved:   { bg: '#d4edda', color: '#155724' },
    declined:   { bg: '#f8d7da', color: '#721c24' },
};

const ManageReturns = () => {
    const [returns, setReturns] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');

    const fetchReturns = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('adminToken');
            const res = await fetch(apiUrl('/returns/all'), {
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = await res.json();
            setReturns(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchReturns(); }, []);

    const updateStatus = async (id, status) => {
        const token = localStorage.getItem('adminToken');
        await fetch(apiUrl(`/returns/status/${id}`), {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
            body: JSON.stringify({ status }),
        });
        setReturns(r => r.map(x => x.id === id ? { ...x, status } : x));
    };

    const deleteReturn = async (id) => {
        if (!window.confirm('Delete this return request?')) return;
        const token = localStorage.getItem('adminToken');
        await fetch(apiUrl(`/returns/delete/${id}`), {
            method: 'DELETE',
            headers: { Authorization: `Bearer ${token}` },
        });
        setReturns(r => r.filter(x => x.id !== id));
    };

    const filtered = filter === 'all' ? returns : returns.filter(r => r.status === filter);

    return (
        <div style={{ padding: '24px' }}>
            <h2 style={{ fontFamily: 'var(--title-font)', color: '#008B8B', fontSize: '1.8rem', marginBottom: '8px' }}>
                Return Requests
            </h2>
            <p style={{ color: '#666', fontFamily: 'Oxygen, sans-serif', fontSize: '0.9rem', marginBottom: '24px' }}>
                {returns.length} total &bull; {returns.filter(r => r.status === 'pending').length} pending
            </p>

            {/* Filter tabs */}
            <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', flexWrap: 'wrap' }}>
                {['all', 'pending', 'contacted', 'resolved', 'declined'].map(f => (
                    <button
                        key={f}
                        onClick={() => setFilter(f)}
                        style={{
                            padding: '7px 18px',
                            borderRadius: '999px',
                            border: filter === f ? 'none' : '1.5px solid #ddd',
                            background: filter === f ? '#008B8B' : 'white',
                            color: filter === f ? 'white' : '#555',
                            fontFamily: 'Oxygen, sans-serif',
                            fontSize: '0.82rem',
                            fontWeight: 700,
                            cursor: 'pointer',
                            textTransform: 'capitalize',
                        }}
                    >{f}</button>
                ))}
            </div>

            {loading ? (
                <p style={{ color: '#999', fontFamily: 'Oxygen, sans-serif' }}>Loading...</p>
            ) : filtered.length === 0 ? (
                <p style={{ color: '#999', fontFamily: 'Oxygen, sans-serif' }}>No return requests found.</p>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {filtered.map(r => {
                        const sc = STATUS_COLOURS[r.status] || STATUS_COLOURS.pending;
                        return (
                            <div key={r.id} style={{
                                background: 'white',
                                borderRadius: '16px',
                                padding: '24px 28px',
                                boxShadow: '0 2px 12px rgba(0,0,0,0.07)',
                                borderLeft: '4px solid #008B8B',
                            }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '16px', flexWrap: 'wrap' }}>
                                    <div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '6px' }}>
                                            <h3 style={{ fontFamily: 'var(--title-font)', fontSize: '1.2rem', margin: 0, color: '#1F2130' }}>
                                                🐾 {r.dog_name}
                                            </h3>
                                            <span style={{
                                                background: sc.bg, color: sc.color,
                                                padding: '3px 12px', borderRadius: '999px',
                                                fontFamily: 'Oxygen, sans-serif', fontSize: '0.75rem', fontWeight: 700,
                                                textTransform: 'capitalize',
                                            }}>{r.status}</span>
                                        </div>
                                        <p style={{ margin: '0 0 4px', fontFamily: 'Oxygen, sans-serif', fontSize: '0.9rem', color: '#444' }}>
                                            <strong>Adopter:</strong> {r.adopter_name}
                                        </p>
                                        <p style={{ margin: '0 0 4px', fontFamily: 'Oxygen, sans-serif', fontSize: '0.9rem', color: '#444' }}>
                                            <strong>Email:</strong> <a href={`mailto:${r.email}`} style={{ color: '#008B8B' }}>{r.email}</a>
                                            &nbsp;&bull;&nbsp;
                                            <strong>Phone:</strong> <a href={`tel:${r.phone}`} style={{ color: '#008B8B' }}>{r.phone}</a>
                                        </p>
                                        <p style={{ margin: '0 0 4px', fontFamily: 'Oxygen, sans-serif', fontSize: '0.9rem', color: '#444' }}>
                                            <strong>Reason:</strong> {r.reason}
                                        </p>
                                        {r.additional_info && (
                                            <p style={{ margin: '8px 0 0', fontFamily: 'Oxygen, sans-serif', fontSize: '0.88rem', color: '#666', background: '#f5f4f0', borderRadius: '8px', padding: '10px 14px' }}>
                                                {r.additional_info}
                                            </p>
                                        )}
                                        <p style={{ margin: '8px 0 0', fontFamily: 'Oxygen, sans-serif', fontSize: '0.75rem', color: '#aaa' }}>
                                            Submitted: {new Date(r.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                                        </p>
                                    </div>

                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', minWidth: '150px' }}>
                                        <label style={{ fontFamily: 'Oxygen, sans-serif', fontSize: '0.75rem', fontWeight: 700, color: '#888', textTransform: 'uppercase', letterSpacing: '1px' }}>Update Status</label>
                                        <select
                                            value={r.status}
                                            onChange={e => updateStatus(r.id, e.target.value)}
                                            style={{ padding: '8px 12px', borderRadius: '8px', border: '1.5px solid #ddd', fontFamily: 'Oxygen, sans-serif', fontSize: '0.88rem', cursor: 'pointer' }}
                                        >
                                            <option value="pending">Pending</option>
                                            <option value="contacted">Contacted</option>
                                            <option value="resolved">Resolved</option>
                                            <option value="declined">Declined</option>
                                        </select>
                                        <button
                                            onClick={() => deleteReturn(r.id)}
                                            style={{ padding: '8px 12px', borderRadius: '8px', border: 'none', background: '#fee2e2', color: '#991b1b', fontFamily: 'Oxygen, sans-serif', fontSize: '0.82rem', fontWeight: 700, cursor: 'pointer' }}
                                        >
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

export default ManageReturns;
