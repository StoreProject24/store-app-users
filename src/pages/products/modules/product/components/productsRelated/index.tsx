import { useCallback } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'framer-motion';
import CardProduct from '@/components/cardProduct';
import useCart from '@/hooks/useCart';
import useGetRelatedProducts from '@/queries/products/related';
import { Product } from '@/types/products';
import Loading from '@/components/loading';
import ProductCardSkeleton from '@/components/skeletonProductCards';

interface ProductsRelatedProps {
  productId: number;
  categoryId: number;
}

const ProductsRelated = ({ productId, categoryId }: ProductsRelatedProps) => {
  const navigate = useNavigate();
  const {
    handleProductInCart,
    handleAddCart,
    handleDecreaseQuantityProduct,
    handleIncreaseQuantityProduct,
  } = useCart();
  const { products, isLoading } = useGetRelatedProducts(productId, categoryId);

  const handleProduct = useCallback(
    (id: number) => {
      navigate(`/products/${id}`);
    },
    [navigate]
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };


  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 30,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring',
        damping: 18,
        stiffness: 120,
      },
    },
  };

  return (
    <Loading isLoading={isLoading} component={<ProductCardSkeleton limit={5} />}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="w-full grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
      >
        {products?.map((product: Product) => {
          const cartItem = handleProductInCart(product.id);
          return (
            <motion.div
              key={product.id}
              variants={itemVariants}
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.2 },
              }}
              whileTap={{ scale: 0.98 }}
            >
              <CardProduct
                product={product}
                isProductInCart={!!cartItem}
                handleProduct={handleProduct}
                cartItem={cartItem}
                handleAddCart={(v) =>
                  handleAddCart({
                    productId: v.id,
                    name: v.name,
                    pricePublic: v.pricePublic,
                    quantity: 1,
                    stock: v.quantity,
                    categoryId: v.categoryId,
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
    </Loading>
  );
};

export default ProductsRelated;