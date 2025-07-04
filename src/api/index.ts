import axios from "axios";

const api = axios.create({
	baseURL: "http://192.168.20.22:3002/api",
	timeout: 10000,
	headers: {
		"Content-Type": "application/json",
	},
});

export default api;
