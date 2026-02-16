import api from './axios.js';

export const getTodosRequest = () => api.get('/todo/');

export const createTodoRequest = (payload) => api.post('/todo/', payload);

export const updateTodoRequest = (id, updates) => api.patch(`/todo/${id}`, updates);

export const deleteTodoRequest = (id) => api.delete(`/todo/${id}`);
