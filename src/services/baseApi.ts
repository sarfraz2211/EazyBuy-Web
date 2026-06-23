
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({

  reducerPath: "api",

  tagTypes: ["Cart"],

  baseQuery: fetchBaseQuery({

    baseUrl:
      "https://e-commerce-vpz9.onrender.com/api",

    prepareHeaders: headers => {

      if (
        typeof window !== "undefined"
      ) {

        const token =
          localStorage.getItem(
            "token"
          );

        if (token) {

          headers.set(
            "Authorization",
            `Bearer ${token}`
          );
        }
      }

      return headers;
    },
  }),

  endpoints: () => ({}),
});
