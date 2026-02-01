import { useMutation } from "@tanstack/react-query";
import useCart from "./useCart";
import SaleService from "@/services/sales";
import { toastAppSuccess } from "@/utils/toast";


const useCreateSale = () => {
    const saleService = new SaleService()
    const {cart, totalPriceCartProducts} = useCart()

    const createSale = useMutation({
        mutationFn: () => saleService.createSale(cart, totalPriceCartProducts),
        onSuccess: (data) => {
            toastAppSuccess("Venta creada con exito")
        },
        onError: (error) => {
            console.log("error ", error)
        }
    })

    return {
        createSale: createSale.mutateAsync,
        isLoading: createSale.isPending
    }
}

export default useCreateSale