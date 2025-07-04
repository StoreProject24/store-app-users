import api from "../../api";
class CategoriesService {
	async getCategories() {
		const response = await api.get(`/categories`);
		return response.data;
	}
}

export default CategoriesService;
