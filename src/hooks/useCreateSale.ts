import { useMutation } from "@tanstack/react-query";
import useCart from "./useCart";
import SaleService from "@/services/sales";
import { toastAppError, toastAppSuccess } from "@/utils/toast";
import useTranslation from "./useTranslation";


const useCreateSale = () => {
    const saleService = new SaleService()
    const {t} = useTranslation()
    const {cart, totalPriceCartProducts} = useCart()

    const createSale = useMutation({
        mutationFn: () => saleService.createSale(cart, totalPriceCartProducts),
        onSuccess: (data) => {
            toastAppSuccess(t("sucessSale"))
        },
        onError: (error) => {
            toastAppError(t("errorCreateSale"))
        }
    })

    return {
        createSale: createSale.mutateAsync,
        isLoading: createSale.isPending
    }
}

export default useCreateSale