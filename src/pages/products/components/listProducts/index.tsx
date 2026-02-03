import { memo } from 'react';
import { motion } from 'framer-motion';
import { Product } from '@/types/products';
import CardProduct from '@/components/cardProduct';
import useCart from '@/hooks/useCart';

interface Props {
  products: Product[];
  lastElementRef: React.RefObject<HTMLDivElement>;
  handleProduct: (id: number) => void;
}

const ListProducts = ({ products, lastElementRef, handleProduct }: Props) => {
  const {
    handleAddCart,
    handleDecreaseQuantityProduct,
    handleIncreaseQuantityProduct,
    handleProductInCart,
  } = useCart();

  return (
    <div className="w-full grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5 gap-4">
      {products.map((product, index) => {
        const isLast = index === products.length - 1;
        const cartItem = handleProductInCart(product.id);
        return (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.3,
              delay: index * 0.02,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            whileHover={{
              scale: 1.03,
              transition: { duration: 0.2 },
            }}
          >
            <CardProduct
              className="w-full flex-1"
              product={product}
              isLast={isLast}
              isProductInCart={!!cartItem}
              cartItem={cartItem}
              lastElementRef={lastElementRef}
              handleProduct={handleProduct}
              handleAddCart={(v) =>
                handleAddCart({
                  productId: v.id,
                  name: v.name,
                  pricePublic: v.pricePublic,
                  quantity: 1,
                  stock: v.quantity,
                  image: v.images[0]?.urlImage,
                  categoryId: v.categoryId,
                })
              }
              handleDecreaseQuantityProduct={(v) =>
                handleDecreaseQuantityProduct(v)
              }
              handleIncreaseQuantityProduct={(v) =>
                handleIncreaseQuantityProduct(v)
              }
            />
          </motion.div>
        );
      })}
    </div>
  );
};

export default memo(ListProducts);