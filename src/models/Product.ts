export interface Product {
  _id: string;
  productName: string;
  price: number;
  image?: string;
  description?: string;
  category?: string;
  stock?: number;
  rating?: number;
}

export interface CartItem extends Product {
  quantity: number;
}

// Some APIs return the array directly, while others wrap it in data/products.
export function getProductList(response: unknown): Product[] {
  if (Array.isArray(response)) return response as Product[];

  const value = response as { data?: unknown; products?: unknown } | undefined;
  if (Array.isArray(value?.data)) return value.data as Product[];
  if (Array.isArray(value?.products)) return value.products as Product[];

  return [];
}
