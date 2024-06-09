import { BASE_URL } from "@/config/default";
import { selectToken, updateToken } from "@/redux/userSlice";
import store from "@/redux/store";
import axios from "axios";

const axiosInstance = axios.create({
	baseURL: BASE_URL,
	headers: {
		"Content-Type": "application/json",
	},
});

// request interceptor
axiosInstance.interceptors.request.use(
	(config) => {
		const state = store.getState();
		const token = selectToken(state);
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	},
);

// response interceptor
axiosInstance.interceptors.response.use(
	(response) => response,

	async (error) => {
		const originalRequest = error.config;
		if (error.response.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true;
			try {
				const response = await axios.get(`${BASE_URL}/api/auth/refresh`, {
					withCredentials: true,
				});

				const newToken = response.data.data.token;
				store.dispatch(updateToken(newToken));
				axiosInstance.defaults.headers.common["Authorization"] =
					"Bearer " + newToken;

				return axiosInstance(originalRequest);
			} catch (error) {
				return Promise.reject(error);
			}
		}
		return Promise.reject(error);
	},
);

export default axiosInstance;
