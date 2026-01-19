export interface CartItem {
    key: string;
    productId: number;
    combinationId?: number;
    name: string;
    pricePublic: number;
    quantity: number;
    stock: number;
    categoryId: number| null;
    variantName?: string;
    image?: string;
}

export const getCartKey = (
    productId: number,
    combinationId?: number
  ) => `${productId}-${combinationId ?? 'simple'}`;
  