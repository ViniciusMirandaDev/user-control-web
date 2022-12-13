import axios from 'axios';

const api = axios.create({
	baseURL: 'https://localhost:7062/api/',
});

export default api;
