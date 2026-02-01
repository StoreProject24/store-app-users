import { ENDPOINTS } from '@/lib/constants';
import api from '../../api';
class BrandsService {
  async getBrands() {
    const response = await api.get(ENDPOINTS.brands.get);
    return response.data;
  }
}

export default BrandsService;
