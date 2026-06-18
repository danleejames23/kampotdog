// Production API URL - same origin since backend serves frontend
const PRODUCTION_API_URL = '';

// Use production URL in production, otherwise localhost or env var
const rawApiBaseUrl = process.env.REACT_APP_API_URL || 
    (process.env.NODE_ENV === 'production' ? PRODUCTION_API_URL : 'http://localhost:4000');

export const API_BASE_URL = rawApiBaseUrl.replace(/\/$/, '');

export const apiUrl = (path = '') => {
    if (!path) return API_BASE_URL;
    return `${API_BASE_URL}${path.startsWith('/') ? path : `/${path}`}`;
};

export const getImageUrl = (imageName) => {
    if (!imageName) return '';
    return apiUrl(`/images/${imageName}`);
};