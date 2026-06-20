// src/redux/services/productApi.ts

import { baseApi } from "./baseApi";
import type { Product } from "@/src/models/Product";

export const productApi =
  baseApi.injectEndpoints({

    endpoints: builder => ({

      getProducts:

        builder.query<Product[] | { data?: Product[]; products?: Product[] }, string>({

          query: merchantId =>

            `/products/getProduct/${merchantId}`,
        }),

      searchProducts:

        builder.query<Product[] | { data?: Product[]; products?: Product[] }, { merchantId: string; searchTerm: string }>({

          // The protected route receives the typed search text as a query parameter.
          query: ({ merchantId, searchTerm }) => ({
            url: `/products/searchProduct/${merchantId}`,
            params: { search: searchTerm },
          }),
        }),
    }),
  });

export const {

  useGetProductsQuery,

  useSearchProductsQuery,

} = productApi;
