import React from 'react';
import useGetCategories from '@/queries/categories';
import useGetBrands from '@/queries/brands';
import useGetStore from '@/queries/store';
import LoadingPage from '@/components/loadingPage';
import ErrorPage from '@/components/errorPage';

const StoreContext = ({ children }: { children: React.ReactNode }) => {
  const { isLoading, error } = useGetStore();
  useGetCategories();
  useGetBrands();
  if (isLoading) return <LoadingPage />
  if (error) return <ErrorPage message={error.message} />
  return children;
};

export default StoreContext;
