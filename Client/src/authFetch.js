import { apiUrl } from './config/api';

const authFetch = (url, options = {}) => {
    const token = localStorage.getItem('adminToken');
    const resolvedUrl = /^https?:\/\//i.test(url) ? url : apiUrl(url);

    return fetch(resolvedUrl, {
        ...options,
        headers: {
            ...(options.headers || {}),
            'Authorization': `Bearer ${token}`,
        },
    });
};

export default authFetch;
