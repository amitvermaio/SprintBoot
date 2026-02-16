import api from './axios.js';

export const loginRequest = (credentials) => api.post('/auth/login', credentials);

export const registerRequest = (payload) => api.post('/auth/register', payload);
