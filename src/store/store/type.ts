import { Store } from '@/types/store';

export type Languages = {
    languages: "es" | "en"
}
export type StoreState = {
    store: Store | Partial<Store>;
    language: Languages["languages"];
    languages: ["es", "en"],
    setStore: (data: Store) => void;
    setLanguage: (v: Languages["languages"]) => void;
};