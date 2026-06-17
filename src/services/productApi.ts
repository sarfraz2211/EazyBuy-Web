// src/redux/services/productApi.ts

import { baseApi } from "./baseApi";

export const productApi =
  baseApi.injectEndpoints({

    endpoints: builder => ({

      getProducts:

        builder.query<any, string>({

          query: merchantId =>

            `/products/getProduct/${merchantId}`,
        }),

      searchProducts:

        builder.query<any, string>({

          query: merchantId =>

            `/products/searchProduct/${merchantId}`,
        }),
    }),
  });

export const {

  useGetProductsQuery,

  useSearchProductsQuery,

} = productApi;