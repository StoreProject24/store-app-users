import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import BrandsService from '../../services/brands';
import { useBrandsStore } from '@/store/brands';

const useGetBrands = () => {
  const brandService = new BrandsService();
  const { setBrands } = useBrandsStore();
  const { isLoading, data } = useQuery({
    queryKey: ['brands'],
    queryFn: brandService.getBrands,
    refetchOnWindowFocus: false,
    select: data => {
      return data.data.brands;
    },
    initialData: [],
  });

  useEffect(() => {
    if (data) {
      setBrands(data);
    }
  }, [data, setBrands]);

  return {
    isLoadingBrands: isLoading,
  };
};

export default useGetBrands;
