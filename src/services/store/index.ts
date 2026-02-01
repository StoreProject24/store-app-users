import { ENDPOINTS } from '@/lib/constants';
import api from '../../api';
class StoreService {
  async getStoreData() {
    const response = await api.get(ENDPOINTS.store.get);
    return response.data.data;
  }
}

export default StoreService;
