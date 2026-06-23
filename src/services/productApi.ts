// src/redux/services/productApi.ts

import { baseApi } from "./baseApi";
import type { Product } from "@/src/models/Product";

export interface ProductSearchParams {
  merchantId: string;
  searchTerm?: string;
  category?: string;
  priceSort?: string;
}

export const productApi =
  baseApi.injectEndpoints({

    endpoints: builder => ({

      getProducts:

        builder.query<Product[] | { data?: Product[]; products?: Product[] }, string>({

          query: merchantId =>

            `/products/getProduct/${merchantId}`,
        }),

      searchProducts:

        builder.query<Product[] | { data?: Product[]; products?: Product[] }, ProductSearchParams>({

          // The backend search route can filter by product text, category, and price sort.
          query: ({ merchantId, searchTerm, category, priceSort }) => ({
            url: `/products/searchProduct/${merchantId}`,
            params: {
              q: searchTerm || undefined,
              search: searchTerm || undefined,
              category: category && category !== "All" ? category : undefined,
              sort: priceSort || undefined,
            },
          }),
        }),
    }),
  });

export const {

  useGetProductsQuery,

  useSearchProductsQuery,

} = productApi;
