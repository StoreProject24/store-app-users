import { useState } from 'react';
import { Product } from '@/types/products';
import useCart from '@/hooks/useCart';
import ProductWithVariants from '../variants';
import { CartItem } from '@/types/cart';
import ProductWithoutVariants from '../productWithoutVariants';

const ProductDetails = ({ product }: { product: Product | null }) => {
  const [quantity, setQuantity] = useState<number>(1);
  const [variantQuantities, setVariantQuantities] = useState<Record<number, number>>({});
  const { handleAddCart } = useCart();

  const handleQuantity = (type: 'increment' | 'decrement' | 'reset' | 'load', value: number) => {
    if (type === 'reset') {
      setQuantity(value);
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
      setQuantity(0);
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

  const confirmAddToCart = (item: Omit<CartItem, 'key'>) => {
    handleAddCart(item);
  };
 
  return product?.variantTypes.length ? (
    <ProductWithVariants
      product={product}
      variantQuantities={variantQuantities}
      handleVariantQuantity={handleVariantQuantity}
      handleAddCart={confirmAddToCart}
    />
  ) : (
    <ProductWithoutVariants handleAddCart={handleAddCart} handleQuantity={handleQuantity} product={product} quantity={quantity} />
  );
};

export default ProductDetails;