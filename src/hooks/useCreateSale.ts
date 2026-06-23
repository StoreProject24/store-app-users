import { useMutation } from "@tanstack/react-query";
import useCart from "./useCart";
import useAnalytics from "./useAnalytics";
import SaleService from "@/services/sales";
import { toastAppError, toastAppSuccess } from "@/utils/toast";
import useTranslation from "./useTranslation";


const useCreateSale = () => {
    const saleService = new SaleService()
    const { t } = useTranslation()
    const { cart, totalPriceCartProducts, clearCart } = useCart()
    const { track } = useAnalytics()

    const createSale = useMutation({
        mutationFn: () => saleService.createSale(cart, totalPriceCartProducts),
        onSuccess: () => {
            track('sale_completed', {
                saleTotal: totalPriceCartProducts,
                saleItemsCount: cart.length,
                products: cart.map(item => ({
                    productId: item.productId,
                    productName: item.name,
                    quantity: item.quantity,
                    price: item.pricePublic,
                    combinationId: item.combinationId,
                })),
            })
            toastAppSuccess(t("sucessSale"))
        },
        onError: () => {
            toastAppError(t("errorCreateSale"))
        }
    })

    return {
        createSale: createSale.mutateAsync,
        isLoading: createSale.isPending
    }
}

export default useCreateSale