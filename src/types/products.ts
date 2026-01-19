export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  categoryId: number | null;
  sku: string;
  pricePublic: number;
  tags: string[];
  variantTypes: VariantTypes[];
  variantCombinations: VariantsCombinations[];
  storeId: number;
  images: ProductImages[];
  video: string;
  brandId: number | null;
  statusId: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductImages {
  id: number;
  productId: number;
  urlImage: string;
}

export type VariantTypes = {
  id: number;
  name: string;
  options: OptionsVariantType[];
  productId?: number;
  createdAt?: Date;
  updatedAt?: Date;
};

export type OptionsVariantType = {
  id: number;
  name: string;
  price: number;
  pricePublic: number;
  sku: string;
  quantity: number;
  status: boolean;
};

export type VariantsCombinations = {
  id: number;
  values: string[];
  price: number;
  pricePublic: number;
  label: string;
  quantity: number;
  sku: string;
  status: boolean;
};
