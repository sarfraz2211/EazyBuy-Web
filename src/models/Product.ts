export interface Product {
  _id: string;
  productName: string;
  name?: string;
  price: number;
  image?: string;
  imageUrl?: string;
  description?: string;
  category?: string;
  stock?: number;
  rating?: number;
}

export interface CartItem extends Product {
  quantity: number;
  subtotal?: number;
}

// Some APIs return the array directly, while others wrap it in data/products.
export function getProductList(response: unknown): Product[] {
  if (Array.isArray(response)) return response.map(normalizeProduct);

  const value = response as { data?: unknown; products?: unknown } | undefined;
  if (Array.isArray(value?.data)) return value.data.map(normalizeProduct);
  if (Array.isArray(value?.products)) return value.products.map(normalizeProduct);

  return [];
}

export function normalizeProduct(product: Product): Product {
  return {
    ...product,
    productName: product.productName || product.name || "Untitled product",
    image: product.image || product.imageUrl,
    price: Number(product.price || 0),
  };
}
