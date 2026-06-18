import React, { useEffect, useState } from 'react';
import authFetch from '../../authFetch';
import { apiUrl, getImageUrl } from '../../config/api';

const SPONSOR_DETAILS = {
  yinyang: {
    dog_name: 'Yin Yang',
    sponsor_name: 'Daniel James',
    sponsor_email: 'danleejames2026@gmail.com',
    sponsor_phone: 'N/A',
    sponsor_reason: 'N/A',
    sponsored_at: '2026-06-01',
  },
};

const formatDate = (dateStr) => {
  if (!dateStr) return 'N/A';
  const parsed = new Date(dateStr);
  if (Number.isNaN(parsed.getTime())) return dateStr;
  return parsed.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
};

const addOneMonth = (dateStr) => {
  if (!dateStr) return '';
  const parsed = new Date(dateStr);
  if (Number.isNaN(parsed.getTime())) return '';
  parsed.setMonth(parsed.getMonth() + 1);
  return parsed.toISOString().slice(0, 10);
};

const ManageSponsorships = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRows = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await authFetch('/sponsorships');
        const data = await res.json().catch(() => []);
        if (res.ok && Array.isArray(data) && data.length > 0) {
          setRows(data);
          return;
        }

        // Fallback: derive sponsored dogs from public dogs API and merge known sponsor details.
        const dogsRes = await fetch(apiUrl('/dogs'));
        const dogsData = await dogsRes.json().catch(() => []);
        if (!dogsRes.ok || !Array.isArray(dogsData)) {
          setError('Could not load sponsorships.');
          setRows([]);
          return;
        }

        const sponsoredDogs = dogsData.filter((dog) => {
          const key = String(dog.name || '').toLowerCase().replace(/\s+/g, '');
          return Boolean(SPONSOR_DETAILS[key]);
        });
        const fallbackRows = sponsoredDogs.map((dog, index) => {
          const key = String(dog.name || '').toLowerCase().replace(/\s+/g, '');
          const details = SPONSOR_DETAILS[key] || {};
          const sponsoredAt = details.sponsored_at || '';
          return {
            id: `fallback-${dog.id || index}`,
            dog_name: details.dog_name || dog.name,
            sponsor_name: details.sponsor_name || 'N/A',
            sponsor_email: details.sponsor_email || 'N/A',
            sponsor_phone: details.sponsor_phone || 'N/A',
            sponsor_reason: details.sponsor_reason || 'N/A',
            sponsored_at: sponsoredAt,
            next_payment_due: addOneMonth(sponsoredAt),
            dog_image: dog.image || '',
            dog_sponsored: 1,
          };
        });

        setRows(fallbackRows);
      } catch {
        setError('Could not load sponsorships.');
        setRows([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRows();
  }, []);

  return (
    <div className="manage-sponsorships-container">
      <p className="admin-panel-note">
        Sponsored dogs are listed here with sponsor details, start date and next monthly due date.
      </p>

      {loading ? <p>Loading sponsorships...</p> : null}
      {error ? <p className="counter-save-error">{error}</p> : null}

      {!loading && !error && rows.length === 0 ? (
        <p className="blog-empty-msg">No sponsorship records yet.</p>
      ) : null}

      <div className="sponsor-admin-list">
        {rows.map((row) => (
          <article key={row.id} className="sponsor-admin-card">
            <div className="sponsor-admin-head">
              <h3>{row.dog_display_name || row.dog_name}</h3>
              <span className={`sponsor-admin-pill${row.dog_sponsored ? ' sponsor-admin-pill--active' : ''}`}>
                {row.dog_sponsored ? 'Marked Sponsored' : 'Dog Status Not Updated'}
              </span>
            </div>
            <div className="sponsor-admin-dog-media">
              {row.dog_image ? (
                <img src={getImageUrl(row.dog_image)} alt={row.dog_display_name || row.dog_name} />
              ) : (
                <div className="sponsor-admin-dog-placeholder" aria-hidden="true">🐕</div>
              )}
            </div>
            <div className="sponsor-admin-grid">
              <p><strong>Name:</strong> {row.sponsor_name || 'N/A'}</p>
              <p><strong>Email:</strong> {row.sponsor_email || 'N/A'}</p>
              <p><strong>Phone:</strong> {row.sponsor_phone || 'N/A'}</p>
              <p><strong>Why:</strong> {row.sponsor_reason || 'N/A'}</p>
              <p><strong>Sponsored On:</strong> {formatDate(row.sponsored_at || row.created_at)}</p>
              <p><strong>Next Payment Due:</strong> {formatDate(row.next_payment_due)}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default ManageSponsorships;
