import { ENDPOINTS } from '@/lib/constants';
import api from '../../api';
class CategoriesService {
  async getCategories() {
    const response = await api.get(ENDPOINTS.categories.get);
    return response.data;
  }
}

export default CategoriesService;
