import axios from 'axios';

const api = axios.create({
	baseURL: 'https://usercontrol-api.azurewebsites.net/api/',
});

export default api;
