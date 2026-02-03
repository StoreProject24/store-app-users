import { useState } from 'react';
import { useParams } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';
import useGetProduct from '@/queries/products/product';
import { BreadcrumbWithCustomSeparator } from './components/breadcrum';
import ProductsRelated from './components/productsRelated';
import ProductDetails from './components/productDetails';

const Product = () => {
  const { id } = useParams();
  const { product, isLoading } = useGetProduct(Number(id));
  const [activeImage, setActiveImage] = useState<number>(0);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-12 h-12 border-4 border-gray-300 border-t-black rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="px-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 0.25,
          ease: "easeOut",
        }}
      >
        <BreadcrumbWithCustomSeparator nameProduct={product?.name} />
      </motion.div>

      <div className="flex flex-col gap-5 w-full md:flex-row">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="w-full h-80 md:w-1/2 sm:h-160 rounded-xl"
        >
          <AnimatePresence mode="wait">
            <motion.img
              key={activeImage}
              src={product?.images?.[activeImage]?.urlImage}
              alt={product?.name}
              loading="lazy"
              decoding="async"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="w-full h-2/3 object-cover rounded-xl border-2"
            />
          </AnimatePresence>
          <div className="w-full overflow-auto pb-3">
            <div className="flex flex-row gap-1 sm:gap-5 sm:w-32 sm:h-36 mt-2">
              {product?.images.map((image, index) => {
                const isActive = index === activeImage;
                return (
                  <motion.button
                    key={image.urlImage}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.2 + index * 0.05 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveImage(index)}
                    className={`w-20 h-20 sm:w-32 sm:h-32 border rounded-lg cursor-pointer aspect-square transition-colors ${isActive ? 'border-gray-500' : ''
                      }`}
                  >
                    <img
                      src={image.urlImage}
                      alt={product?.name}
                      className="w-full h-full object-cover rounded-lg bg-white"
                    />
                  </motion.button>
                );
              })}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex-1"
        >
          <motion.h4
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="text-2xl font-bold"
          >
            {product?.name}
          </motion.h4>
          <motion.small
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="text-sm text-gray-500"
          >
            Descripcion
          </motion.small>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.5 }}
            className="h-20 sm:h-64 overflow-y-auto"
          >
            <div
              dangerouslySetInnerHTML={{
                __html: product?.description ?? '',
              }}
              className="text-gray-600"
            />
          </motion.div>
          <ProductDetails product={product ?? null} />
        </motion.div>
      </div>

      <div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="flex flex-row items-center justify-center gap-4 my-8"
        >
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ originX: 1 }}
            className="border-t-2 border-gray-500 w-full rounded-full"
          />
          <h2 className="text-2xl font-bold text-center mb-4 w-1/2 xl:w-full whitespace-nowrap">
            Productos relacionados
          </h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ originX: 0 }}
            className="border-t-2 border-gray-500 w-full rounded-full"
          />
        </motion.div>
        <div className="flex justify-center">
          <div className="flex flex-row gap-8 mt-4 overflow-x-auto pb-4 w-full">
            {typeof product?.id === 'number' && typeof product?.categoryId === 'number' ? (
              <ProductsRelated productId={product.id} categoryId={product.categoryId} />
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;