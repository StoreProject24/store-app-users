import { useCallback, useMemo } from 'react';
import { useCartStore } from '@/store/cart';
import { CartItem, getCartKey } from '@/types/cart';
import useAnalytics from './useAnalytics';

const useCart = () => {
  const {
    cart,
    addCart,
    removeCart,
    clearCart,
    increaseQuantityProduct,
    decreaseQuantityProduct,
  } = useCartStore();

  const { track } = useAnalytics();

  const handleAddCart = useCallback(
    (item: Omit<CartItem, 'key'>) => {
      const key = getCartKey(item.productId, item.combinationId);

      const existing = cart.find(cartItem => cartItem.key === key);

      if (!existing) {
        addCart({ ...item, key });
        track('product_added_to_cart', {
          productId: item.productId,
          productName: item.name,
          productPrice: item.pricePublic,
          combinationId: item.combinationId,
          quantity: item.quantity,
        });
      } else {
        if (existing.quantity + item.quantity > existing.stock) return;

        increaseQuantityProduct(key);
        track('product_added_to_cart', {
          productId: item.productId,
          productName: item.name,
          productPrice: item.pricePublic,
          combinationId: item.combinationId,
          quantity: 1,
        });
      }
    },
    [cart, addCart, increaseQuantityProduct, track]
  );

  const handleIncreaseQuantityProduct = useCallback(
    (key: string) => {
      const item = cart.find(i => i.key === key);
      if (item && item.quantity < item.stock) {
        increaseQuantityProduct(key);
      }
    },
    [cart, increaseQuantityProduct]
  );

  const handleDecreaseQuantityProduct = useCallback(
    (key: string) => {
      const item = cart.find(i => i.key == key);
      if (!item) return;

      if (item.quantity === 1) {
        removeCart(key);
        track('product_removed_from_cart', {
          productId: item.productId,
          productName: item.name,
          productPrice: item.pricePublic,
          combinationId: item.combinationId,
        });
      } else {
        decreaseQuantityProduct(key);
      }
    },
    [cart, removeCart, decreaseQuantityProduct, track]
  );

  const handleProductInCart = useCallback(
    (productId: number, combinationId?: number) => {
      const key = `${productId}-${combinationId ?? 'simple'}`;
      return cart.find(item => item.key === key);
    },
    [cart]
  );
  
  const totalCartProducts = cart.length

  const totalPriceCartProducts = useMemo(
    () =>
      cart.reduce(
        (acc, item) => acc + item.pricePublic * item.quantity,
        0
      ),
    [cart]
  );

  return {
    cart,
    totalCartProducts,
    totalPriceCartProducts,
    handleAddCart,
    handleIncreaseQuantityProduct,
    handleDecreaseQuantityProduct,
    removeCart,
    clearCart,
    handleProductInCart,
  };
};

export default useCart;
