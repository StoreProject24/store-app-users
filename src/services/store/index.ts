import api from "../../api";
class StoreService {
	async getStoreData() {
		const response = await api.get('/stores');
		return response.data.data;
	}
}

export default StoreService;
