import { useCallback, useMemo } from 'react';
import { useCartStore } from '@/store/cart';
import { CartItem, getCartKey } from '@/types/cart';

const useCart = () => {
  const {
    cart,
    addCart,
    removeCart,
    clearCart,
    increaseQuantityProduct,
    decreaseQuantityProduct,
  } = useCartStore();

  // ➕ AGREGAR AL CARRITO
  const handleAddCart = useCallback(
    (item: Omit<CartItem, 'key'>) => {
      const key = getCartKey(item.productId, item.combinationId);

      const existing = cart.find(cartItem => cartItem.key === key);

      if (!existing) {
        addCart({ ...item, key });
      } else {
        if (existing.quantity + item.quantity > existing.stock) return;

        increaseQuantityProduct(key);
      }
    },
    [cart, addCart, increaseQuantityProduct]
  );

  // ➕➖ CANTIDAD
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
      } else {
        decreaseQuantityProduct(key);
      }
    },
    [cart, removeCart, decreaseQuantityProduct]
  );

  const handleProductInCart = useCallback(
    (productId: number, combinationId?: number) => {
      const key = `${productId}-${combinationId ?? 'simple'}`;
      return cart.find(item => item.key === key);
    },
    [cart]
  );
  
  // 🧮 TOTALES
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
