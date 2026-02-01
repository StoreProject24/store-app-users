import { ENDPOINTS } from '@/lib/constants';
import api from '../../api';
import { CartItem } from '@/types/cart';
import { STATUS } from '@/constants';
class SaleService {
    async createSale(cart: CartItem[], totalSale: number) {
        const response = await api.post(ENDPOINTS.sale.create, {
            items: cart,
            total: totalSale,
            discount: 0,
            statusId: STATUS.pending
        })
        return response.data
    }
}
export default SaleService