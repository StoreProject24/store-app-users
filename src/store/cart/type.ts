import { Product } from "@/types/products";

export interface CartItem extends Product {
    quantity: number;
}

export interface CartStore {
	cart: CartItem[];
	addCart: (newCart: CartItem) => void;
	removeCart: (id: number) => void;
	increaseQuantityProduct: (id: number) => void;
	decreaseQuantityProduct: (id: number) => void;
	clearCart: () => void;
}