import { useCallback } from 'react';

const ProductCardSkeleton = () => {
  const SkeletonCard = useCallback(() => (
    <div className="flex-1 w-full p-4 rounded-xl bg-gray-100 dark:bg-gray-800">
      <div className="w-full h-64 bg-gray-300 rounded-2xl" />
      <div className="absolute top-52 right-2 w-20 h-8 bg-gray-400 rounded-3xl" />
      <div className="flex flex-col justify-between items-center gap-2 px-4 mt-2 h-20">
        <div className="w-3/4 h-4 bg-gray-300 rounded" />
        <div className="flex flex-row justify-between items-center gap-2 w-full">
          <div className="w-1/2 h-3 bg-gray-300 rounded" />
          <div className="w-1/4 h-3 bg-gray-300 rounded" />
        </div>
      </div>
    </div>
  ), []);
  return (
    <div className="w-full grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5 gap-4 animate-pulse">
      {Array.from({ length: 14 }).map((_, index) => (
        <SkeletonCard key={index + 2} />
      ))}
    </div>
  );
};

export default ProductCardSkeleton;
