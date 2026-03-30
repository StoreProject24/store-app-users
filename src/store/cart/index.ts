import { create } from 'zustand';
import { CartItem } from '@/types/cart';
import { createJSONStorage, persist } from 'zustand/middleware';

interface CartStore {
  cart: CartItem[];

  addCart: (item: CartItem) => void;
  removeCart: (key: string) => void;
  clearCart: () => void;

  increaseQuantityProduct: (key: string) => void;
  decreaseQuantityProduct: (key: string) => void;
}
interface CartStore {
  cart: CartItem[];

  addCart: (item: CartItem) => void;
  removeCart: (key: string) => void;
  clearCart: () => void;

  increaseQuantityProduct: (key: string) => void;
  decreaseQuantityProduct: (key: string) => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, _) => ({
      cart: [],

      addCart: (item) =>
        set((state) => {
          const existing = state.cart.find(i => i.key === item.key);

          if (existing) {
            if (existing.quantity + item.quantity > existing.stock) {
              return state; // no supera stock
            }

            return {
              cart: state.cart.map(i =>
                i.key === item.key
                  ? { ...i, quantity: i.quantity + item.quantity }
                  : i
              ),
            };
          }
          return {
            cart: [...state.cart, item],
          };
        }),

      removeCart: (key) =>
        set((state) => ({
          cart: state.cart.filter(item => item.key !== key),
        })),

      clearCart: () => set({ cart: [] }),

      increaseQuantityProduct: (key) =>
        set((state) => ({
          cart: state.cart.map(item =>
            item.key === key && item.quantity < item.stock
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        })),

      decreaseQuantityProduct: (key) =>
        set((state) => ({
          cart: state.cart
            .map(item =>
              item.key === key
                ? { ...item, quantity: item.quantity - 1 }
                : item
            )
            .filter(item => item.quantity > 0),
        })),
    }),
    {
      name: 'store-cart',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
