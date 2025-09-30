import { useQuery } from '@tanstack/react-query';
import ProductService from '@/services/products';

const useGetRandomProducts = () => {
  const productService = new ProductService();
  const { data, isLoading, isError } = useQuery({
    queryKey: ['random-products'],
    queryFn: () => productService.getRandomProducts(),
    select: data => data.data.products,
    refetchOnWindowFocus: false,
  });

  return { products: data, isLoading, isError };
};

export default useGetRandomProducts;
