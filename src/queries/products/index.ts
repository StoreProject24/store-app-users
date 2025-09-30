import { useEffect, useState, useCallback, useRef } from 'react';
import { useLocation } from 'react-router'; 
import { useQuery } from '@tanstack/react-query';
import { Product } from '@/types/products';
import ProductService from '../../services/products';

const useGetProducts = () => {
  const productService = new ProductService();
  const location = useLocation();
  const [products, setProducts] = useState<Product[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState<string>('');
  const [categories, setCategories] = useState<string[]>([]);

  const prevSearchRef = useRef(search);
  const prevCategoriesRef = useRef(categories);

  const handleChangePage = useCallback(() => {
    setPage(prev => prev + 1);
  }, []);

  const query = useQuery({
    queryKey: ['products', page, search, categories.join(',')],
    queryFn: () => productService.getProductsByPage(page, search, categories),
    enabled: hasMore,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    const searchChanged = prevSearchRef.current !== search;
    const categoriesChanged =
      JSON.stringify(prevCategoriesRef.current) !== JSON.stringify(categories);

    if ((searchChanged || categoriesChanged) && page !== 1) {
      setProducts([]);
      setPage(1);
      setHasMore(true);
    }

    prevSearchRef.current = search;
    prevCategoriesRef.current = categories;
  }, [search, categories, page]);

  useEffect(() => {
    console.log('Current URL in useGetProducts:', location.pathname + location.search);
    console.log('Page:', page, 'Search:', search, 'Categories:', categories);
    if (!query.data || !query.data.data?.products) return;

    const newProducts = query.data.data.products;

    if (page === 1) {
      setProducts(newProducts);
    } else {
      setProducts(prev => [...prev, ...newProducts]);
    }
    setHasMore(true);

    if (newProducts.length === 0 || newProducts.length < query.data.data.limit) {
      setHasMore(false);
    }
  }, [query.data, page, location]);

  const safeSetSearch = useCallback(
    (value: string) => {
      if (value !== search) {
        setSearch(value);
      }
    },
    [search]
  );

  const safeSetCategories = useCallback(
    (value: string[]) => {
      if (JSON.stringify(value) !== JSON.stringify(categories)) {
        setCategories(value);
      }
    },
    [categories]
  );

  return {
    handleChangePage,
    setSearch: safeSetSearch,
    setCategories: safeSetCategories,
    isError: query.isError,
    isLoadingProducts: query.isLoading,
    isFetching: query.isFetching,
    products,
    hasMore,
  };
};

export default useGetProducts;
