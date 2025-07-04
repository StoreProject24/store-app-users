import { create } from "zustand";
import { persist, createJSONStorage, devtools } from "zustand/middleware";
import { Store } from "@/types/store";

type StoreState = {
    store: Store | Partial<Store>;
    setStore: (data: Store) => void;
}

export const useStoreStore = create<StoreState>()(
  devtools(
    persist(
      (set) => ({
        store: {},
        setStore: (data: Store) => set({ store: data }),
      }),
      {
        name: "store-store",
        storage: createJSONStorage(() => sessionStorage),
      }
    )
  )
);
