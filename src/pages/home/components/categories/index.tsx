import { useState, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi
} from '@/components/ui/carousel';
import { useCategoriesStore } from '@/store/categories';

export default function Categories() {
  const navigate = useNavigate();
  const { categories } = useCategoriesStore();

  const apiRef = useRef<CarouselApi | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [totalSlides, setTotalSlides] = useState(0);

  const handleCategory = useCallback(
    (id: number) => {
      navigate(`/products?categoryIds=${id}`, {
        flushSync: true
      });
    },
    [navigate]
  );

  const onSelect = useCallback((api: CarouselApi) => {
    setCurrentIndex(api?.selectedScrollSnap() ?? 0);
  }, []);

  const onInit = useCallback((api: CarouselApi) => {
    apiRef.current = api;
    setTotalSlides(api?.scrollSnapList().length ?? 0);
    onSelect(api);
    api?.on('select', () => onSelect(api));
  }, [onSelect]);


  return (
    <article className="py-8">
      <div className="flex flex-row items-center justify-center gap-4 my-8">
        <div className="border-t-2 border-gray-500 w-full rounded-full" />
        <h2 className="text-2xl font-poppins font-bold text-center mb-4">Categorías</h2>
        <div className="border-t-2 border-gray-500 w-full rounded-full" />
      </div>
      <div className="relative w-10/12 sm:w-12/13 mx-auto">
        <Carousel setApi={onInit} className="w-full">
          <CarouselContent className="space-x-2">
            {categories.map(category => (
              <CarouselItem
                key={category.id}
                className="rounded-2xl basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
              >
                <div className="w-full rounded-2xl flex flex-col mb-1 relative gap-0 p-1">
                  <div className="relative p-0 m-2">
                    <img
                      src="https://placehold.co/600x400"
                      alt={category.name}
                      className="object-cover w-full h-full rounded-2xl"
                    />
                  </div>
                  <div className="relative flex flex-row justify-between items-center p-0 px-4">
                    <Button
                      variant="default"
                      className="z-10 text-xs cursor-pointer w-14 rounded-4xl font-poppins absolute bottom-12 mt-2 right-6 dark:bg-black dark:text-white"
                      onClick={() => handleCategory(category.id)}
                    >
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                    <p className="text-sm font-medium text-gray-500 max-w-52 truncate font-poppins">
                      {category.name}
                    </p>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
        <div className="flex justify-center mt-4 gap-2">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <div
              key={`${index}-${currentIndex}`}
              className={`w-3 h-3 rounded-full border border-black transition-colors ${index === currentIndex ? 'bg-black' : 'bg-white'
                }`}
            />
          ))}
        </div>
      </div>
    </article>
  );
}
