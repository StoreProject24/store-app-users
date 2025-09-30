import api from '../../api';
class BrandsService {
  async getBrands() {
    const response = await api.get(`/brands`);
    return response.data;
  }
}

export default BrandsService;
