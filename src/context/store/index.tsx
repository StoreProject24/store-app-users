import useGetCategories from '@/queries/categories';
import useGetBrands from '@/queries/brands';
import useGetStore from '@/queries/store';
import React from 'react';

const StoreContext = ({ children }: { children: React.ReactNode }) => {
  const { isLoading, error } = useGetStore();
  useGetCategories();
  useGetBrands();
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  return children;
};

export default StoreContext;
