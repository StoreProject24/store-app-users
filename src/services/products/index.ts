import api from '../../api';
class ProductsService {
  async getProductsByPage(page = 0, search = '', categoryIds: string[] = []) {
    const response = await api.get('/products', {
      params: {
        page,
        limit: 10,
        search,
        categoryIds: categoryIds.join(','),
      },
    });
    return response.data;
  }
  async getProductById(id: number) {
    const response = await api.get(`/products/${id}`);
    return response.data;
  }
  async getRelatedProducts(id: number, categoryId: number) {
    const response = await api.get(`/products/${id}/${categoryId}/related`, {
      params: {
        limit: 5,
      },
    });
    return response.data;
  }
  async getRandomProducts() {
    const response = await api.get('/products/random', {
      params: {
        limit: 5,
      },
    });
    return response.data;
  }
}

export default ProductsService;
