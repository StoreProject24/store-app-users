import { useCallback } from 'react';

const ProductCardSkeleton = () => {
  const SkeletonCard = useCallback(() => (
    <div className="w-[20rem] h-90 rounded-2xl py-0 pb-1 flex flex-col relative sm:w-[15rem] md:w-[18rem] lg:w-[12rem] xl:w-[16rem] 2xl:w-[24rem] bg-gray-100 dark:bg-gray-800">
      <div className="w-full h-64 bg-gray-300 rounded-2xl" />
      <div className="absolute top-52 right-2 w-20 h-8 bg-gray-400 rounded-3xl" />
      <div className="flex flex-col justify-between items-center gap-2 px-4 mt-2">
        <div className="w-3/4 h-4 bg-gray-300 rounded" />
        <div className="flex flex-row justify-between items-center gap-2 w-full">
          <div className="w-1/2 h-3 bg-gray-300 rounded" />
          <div className="w-1/4 h-3 bg-gray-300 rounded" />
        </div>
      </div>
    </div>
  ), []);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5 gap-4 animate-pulse">
      {Array.from({ length: 14 }).map((_, index) => (
        <SkeletonCard key={index + 2} />
      ))}
    </div>
  );
};

export default ProductCardSkeleton;
