import { create } from 'zustand';
import { persist, createJSONStorage, devtools } from 'zustand/middleware';
import { Store } from '@/types/store';
import { Languages, StoreState } from './type';

export const useStoreStore = create<StoreState>()(
  devtools(
    persist(
      set => ({
        languages: ["es", "en"],
        language: "es",
        store: {},
        setStore: (data: Store) => set({ store: data }),
        setLanguage: (v: Languages["languages"]) => set({ language: v }),
      }),
      {
        name: 'store-store',
        storage: createJSONStorage(() => sessionStorage),
      }
    )
  )
);
