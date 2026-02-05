import { useCallback } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'framer-motion';
import useGetRandomProducts from '@/queries/products/random';
import { Product } from '@/types/products';
import CardProduct from '@/components/cardProduct';
import useCart from '@/hooks/useCart';
import { Button } from '@/components/ui/button';
import Loading from '@/components/loading';
import ProductCardSkeleton from '@/components/skeletonProductCards';

const FeatureProducts = () => {
  const { products, isLoading, isError, refetch } = useGetRandomProducts();
  const {
    handleAddCart,
    handleDecreaseQuantityProduct,
    handleIncreaseQuantityProduct,
    handleProductInCart,
  } = useCart();
  const navigate = useNavigate();

  const handleProduct = useCallback(
    (id: number) => {
      navigate(`/products/${id}`);
    },
    [navigate]
  );

  const containerVariants = {
    visible: {
      transition: {
        staggerChildren: 0.04,
      },
    },
  };
  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring',
        damping: 18,
        stiffness: 140,
      },
    },
  };

  if (isError) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-10 text-red-500"
      >
        Error al cargar los productos
        <Button onClick={() => refetch()} variant='ghost'>
          <small>Refetch</small>
        </Button>
      </motion.div>
    );
  }

  return (
    <article className="py-4">
      <Loading isLoading={isLoading} component={<ProductCardSkeleton limit={5} />}>
        <>
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="flex flex-row items-center justify-center gap-4 my-8"
          >
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
              style={{ originX: 1 }}
              className="border-t-2 border-gray-500 w-full rounded-full"
            />
            <h2 className="text-2xl font-bold text-center mb-4 w-1/2 xl:w-full">Productos destacados</h2>
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
              style={{ originX: 0 }}
              className="border-t-2 border-gray-500 w-full rounded-full"
            />
          </motion.div>
          <motion.div
            variants={containerVariants}
            initial={false}
            animate={products?.length ? 'visible' : 'hidden'}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 items-center justify-center w-full"
          >
            {products?.map((product: Product) => {
              const cartItem = handleProductInCart(product.id);
              return (
                <motion.div
                  key={product.id}
                  variants={itemVariants}
                  whileHover={{
                    scale: 1.03,
                    transition: { duration: 0.2 },
                  }}
                >
                  <CardProduct
                    product={product}
                    cartItem={cartItem}
                    isProductInCart={!!cartItem}
                    handleProduct={handleProduct}
                    handleAddCart={(v) =>
                      handleAddCart({
                        productId: v.id,
                        name: v.name,
                        pricePublic: v.pricePublic,
                        stock: v.quantity,
                        categoryId: v.categoryId,
                        quantity: 1,
                        image: v.images[0]?.urlImage,
                      })
                    }
                    handleDecreaseQuantityProduct={() =>
                      handleDecreaseQuantityProduct(product.id.toString())
                    }
                    handleIncreaseQuantityProduct={() =>
                      handleIncreaseQuantityProduct(product.id.toString())
                    }
                  />
                </motion.div>
              );
            })}
          </motion.div>
        </>
      </Loading>
    </article>
  );
};

export default FeatureProducts;