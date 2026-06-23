import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
// import posthog from 'posthog-js';
import StoreService from '../../services/store';
import { useStoreStore } from '@/store/store';
import { Store } from '@/types/store';

const storeService = new StoreService();

const useGetStore = () => {
  const { setStore } = useStoreStore();
  const { data, isLoading, error } = useQuery({
    queryKey: ['store'],
    queryFn: () => storeService.getStoreData(),
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (data) {
      const store = data.store as Store;
      setStore(store);

      // Asocia toda la sesión a esta tienda en PostHog.
      // Todos los eventos posteriores quedan automáticamente
      // vinculados al grupo "store" sin necesidad de pasar
      // storeId manualmente en cada track().
      // posthog.group('store', String(store.id), {
      //   name: store.name,
      //   domain: store.domain,
      //   city: store.city,
      //   email: store.email,
      // });
    }
  }, [data, setStore]);

  return {
    isLoading,
    error,
  };
};

export default useGetStore;
