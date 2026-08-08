import { useState, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
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
        flushSync: true,
      });
    },
    [navigate]
  );

  const onSelect = useCallback((api: CarouselApi) => {
    setCurrentIndex(api?.selectedScrollSnap() ?? 0);
  }, []);

  const onInit = useCallback(
    (api: CarouselApi) => {
      apiRef.current = api;
      setTotalSlides(api?.scrollSnapList().length ?? 0);
      onSelect(api);
      api?.on('select', () => onSelect(api));
    },
    [onSelect]
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.06,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  return (
    <motion.article
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5 }}
      className="py-8"
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="flex flex-row items-center justify-center gap-4 my-8"
      >
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{ originX: 1 }}
          className="border-t-2 border-gray-500 w-full rounded-full"
        />

        <h2 className="text-2xl font-poppins font-bold text-center mb-4 whitespace-nowrap">
          Categorías
        </h2>

        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{ originX: 0 }}
          className="border-t-2 border-gray-500 w-full rounded-full"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="relative w-10/12 sm:w-12/13 mx-auto"
      >
        <Carousel setApi={onInit} className="w-full">
          <motion.div
            variants={containerVariants}
            initial={false}
            animate={categories.length ? 'visible' : 'hidden'}
          >
            <CarouselContent className="space-x-2">
              {categories?.slice(0, 5).map((category, index) => (
                <CarouselItem
                  key={category.id}
                  className="rounded-2xl basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
                >
                  <motion.div
                    variants={itemVariants}
                    custom={index}
                    whileHover={{ y: -6 }}
                    style={{ willChange: 'transform' }}
                    className="w-full rounded-2xl flex flex-col mb-1 relative gap-0 p-1"
                  >
                    <div className="relative p-0 m-2 overflow-hidden rounded-2xl">
                      <motion.img
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.4 }}
                        src={category.urlImage || 'https://placehold.co/600x480'}
                        alt={category.name}
                        className="object-cover w-full h-52 rounded-2xl"
                      />
                    </div>
                    <div className="relative flex flex-row justify-between items-center p-0 px-4">
                      <motion.div
                      >
                        <Button
                          variant="default"
                          className="z-10 text-xs cursor-pointer w-14 rounded-4xl font-poppins absolute bottom-12 mt-2 right-6 dark:bg-black dark:text-white"
                          onClick={() => handleCategory(category.id)}
                        >
                          <ArrowRight className="w-4 h-4" />
                        </Button>
                      </motion.div>
                      <p className="text-sm font-medium text-gray-500 max-w-52 truncate font-poppins">
                        {category.name}
                      </p>
                    </div>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </motion.div>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex justify-center mt-4 gap-2"
        >
          {Array.from({ length: totalSlides }).map((_, index) => (
            <motion.div
              key={index}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{
                scale: index === currentIndex ? 1.2 : 1,
                opacity: 1
              }}
              transition={{ duration: 0.3 }}
              className={`w-3 h-3 rounded-full border border-black transition-colors ${index === currentIndex ? 'bg-black' : 'bg-white'
                }`}
            />
          ))}
        </motion.div>
      </motion.div>
    </motion.article>
  );
}