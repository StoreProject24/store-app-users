import { useQuery } from "@tanstack/react-query";
import ProductService from "@/services/products";

const useGetRelatedProducts = (id: number | null, categoryId: number | null) => {
    const productService = new ProductService();
    const { data, isLoading, isError } = useQuery({
        queryKey: ['related-products', id, categoryId],
        queryFn: () => productService.getRelatedProducts(id ?? 0, categoryId ?? 0),
        enabled: !!id && !!categoryId,
        select: (data) => data.data.products,
        refetchOnWindowFocus: false,
    });

    return { products: data, isLoading, isError };
}

export default useGetRelatedProducts;