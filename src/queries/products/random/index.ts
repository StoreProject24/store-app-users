import { useQuery } from '@tanstack/react-query';
import ProductService from '@/services/products';

const useGetRandomProducts = () => {
  const productService = new ProductService();
  const { data, isLoading, isError, isRefetching, refetch } = useQuery({
    queryKey: ['random-products'],
    queryFn: () => productService.getRandomProducts(),
    select: data => data.data.products,
    refetchOnWindowFocus: false,
  });

  return { products: data, isLoading: isLoading && isRefetching, isError, refetch };
};

export default useGetRandomProducts;
