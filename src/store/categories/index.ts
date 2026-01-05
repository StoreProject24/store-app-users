import { create } from 'zustand';
import { persist, createJSONStorage, devtools } from 'zustand/middleware';
import { Category } from '@/types/category';

type CategoriesState = {
  categories: Category[];
  setCategories: (data: Category[]) => void;
};

export const useCategoriesStore = create<CategoriesState>()(
  devtools(
    persist(
      set => ({
        categories: [],
        setCategories: (data: Category[]) => set({ categories: data }),
      }),
      {
        name: 'store-categories',
        storage: createJSONStorage(() => sessionStorage),
      }
    )
  )
);
