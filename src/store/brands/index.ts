import { create } from 'zustand';
import { persist, createJSONStorage, devtools } from 'zustand/middleware';
import { Brand } from '@/types/brand';

type BrandsState = {
  brands: Brand[] | Partial<Brand>;
  setBrands: (data: Brand[]) => void;
};

export const useBrandsStore = create<BrandsState>()(
  devtools(
    persist(
      set => ({
        brands: [],
        setBrands: (data: Brand[]) => set({ brands: data }),
      }),
      {
        name: 'store-brands',
        storage: createJSONStorage(() => sessionStorage),
      }
    )
  )
);
