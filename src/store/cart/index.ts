import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { CartItem, CartStore } from './type';

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cart: [] as CartItem[],
      addCart: (newCart: CartItem) => set({ cart: [...get().cart, newCart] }),
      removeCart: (id: number) => set({ cart: get().cart.filter(item => item.id !== id) }),
      increaseQuantityProduct: (id: number) =>
        set({
          cart: get().cart.map(item =>
            item.id === id ? { ...item, quantity: item.quantity + 1 } : item
          ),
        }),
      decreaseQuantityProduct: (id: number) =>
        set({
          cart: get().cart.map(item =>
            item.id === id ? { ...item, quantity: item.quantity - 1 } : item
          ),
        }),
      clearCart: () => set({ cart: [] }),
    }),
    {
      name: 'store-cart',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
