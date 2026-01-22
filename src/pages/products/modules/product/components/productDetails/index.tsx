import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import formatPrice from '@/lib/formatPrice';
import { Product } from '@/types/products';
import QuantitySelector from '@/components/quantitySelector';
import useCart from '@/hooks/useCart';
import ProductWithVariants from '../variants';
import { CartItem } from '@/types/cart';

const ProductDetails = ({ product }: { product: Product | null }) => {
  const [quantity, setQuantity] = useState<number>(0);
  const [variantQuantities, setVariantQuantities] = useState<Record<number, number>>({});
  const { handleAddCart } = useCart();

  const handleQuantity = (type: 'increment' | 'decrement' | 'reset' | 'load', value: number) => {
    if (type === 'reset') {
      setQuantity(0);
      return;
    }
    if (type === 'load') {
      setQuantity(value);
      return;
    }
    if (type === 'increment') {
      if (quantity < (product?.quantity ?? 0)) {
        setQuantity(quantity + 1);
      }
    } else if (quantity > 1) {
      setQuantity(quantity - 1);
    } else {
      setQuantity(1);
    }
  };

  const handleVariantQuantity = (
    combinationId: number,
    type: 'increment' | 'decrement' | 'reset'
  ) => {
    if (type === 'reset') {
      setVariantQuantities({});
      return;
    }
    setVariantQuantities(prev => {
      const current = prev[combinationId] ?? 1;

      let next = current;
      if (type === 'increment') next++;
      if (type === 'decrement') next = Math.max(1, current - 1);

      return {
        ...prev,
        [combinationId]: next,
      };
    });
  };

  const addProductToCart = (item: Omit<CartItem, 'key'>) => {
    handleAddCart(item);
  };

  const RenderView = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
      className="flex flex-col gap-5 w-full sm:flex-col justify-between"
    >
      <motion.h5
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.7 }}
        className="text-xl font-bold font-poppins"
      >
        {formatPrice(product?.pricePublic || 0)}
      </motion.h5>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.8 }}
        className="flex flex-col gap-5 w-full px-2 h-108 overflow-y-auto"
      >
        <QuantitySelector
          quantity={quantity}
          disabled={false}
          handleQuantity={v => handleQuantity(v, 0)}
        />
        <Button
          className="w-full"
          onClick={() => {
            if (!product?.id) return;
            handleAddCart({
              productId: product.id,
              name: product.name,
              pricePublic: product.pricePublic,
              quantity,
              stock: product.quantity,
              image: product.images?.[0]?.urlImage,
              categoryId: product.categoryId,
            });
          }}
        >
          Agregar al carrito
        </Button>
      </motion.div>
    </motion.div>
  );

  return product?.variantTypes.length ? (
    <ProductWithVariants
      product={product}
      variantQuantities={variantQuantities}
      handleVariantQuantity={handleVariantQuantity}
      handleAddCart={addProductToCart}
    />
  ) : (
    <RenderView />
  );
};

export default ProductDetails;