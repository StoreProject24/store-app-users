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
  variants: ProductVariants[];
  storeId: number;
  images?: ProductImages['images'];
  video: string;
  brandId: number | null;
  statusId: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductVariants {
  id: number;
  name: string;
  price: number;
  sku: string;
  quantity: number;
  productId: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductImages {
  images: ImageProduct[];
}

interface ImageProduct {
  productId: number;
  urlImage: string;
}