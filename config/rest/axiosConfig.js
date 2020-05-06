import axios from 'axios';

const instance = axios.create({
	baseURL: process.env.vcApiBaseURL,
});

instance.interceptors.request.use(
	config => {
		const token = localStorage.getItem('jwt_access_token');
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	error => {
		return Promise.reject(error);
	}
);

export default instance;
