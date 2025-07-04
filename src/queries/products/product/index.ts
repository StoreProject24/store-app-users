import { useQuery } from "@tanstack/react-query";
import ProductService from "@/services/products";

const useGetProduct = (id: number | null) => {
    const productService = new ProductService();
    const { data, isLoading, isError } = useQuery({
        queryKey: ['product', id],
        queryFn: () => productService.getProductById(id ?? 0),
        enabled: !!id,
        select: (data) => data.data.product,
        refetchOnWindowFocus: false,
    });

    return { product: data, isLoading, isError };
}

export default useGetProduct;