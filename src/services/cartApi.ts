import { baseApi } from "./baseApi";
import type { CartItem } from "@/src/models/Product";
import { getProductList } from "@/src/models/Product";

interface CartResponse {
  userId: string;
  items: CartItem[];
  cartTotal: number;
}

interface RawCartResponse {
  userId: string;
  items?: unknown;
  cartTotal?: number;
}

const normalizeCartResponse = (response: RawCartResponse): CartResponse => ({
  userId: response.userId,
  items: getProductList(response.items).map(item => ({
    ...item,
    quantity: Number((item as CartItem).quantity || 0),
    subtotal: Number((item as CartItem).subtotal || item.price * Number((item as CartItem).quantity || 0)),
  })),
  cartTotal: Number(response.cartTotal || 0),
});

export const cartApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getCart: builder.query<CartResponse, string>({
      query: userId => ({
        url: "/cart/getCart",
        params: { userId },
      }),
      transformResponse: normalizeCartResponse,
      providesTags: ["Cart"],
    }),
    addCart: builder.mutation<CartResponse, { userId: string; productId: string; quantity?: number }>({
      query: body => ({
        url: "/cart/addCart",
        method: "POST",
        body: { ...body, quantity: body.quantity ?? 1 },
      }),
      transformResponse: normalizeCartResponse,
      invalidatesTags: ["Cart"],
    }),
    updateCart: builder.mutation<CartResponse, { userId: string; productId: string; quantity: number }>({
      query: body => ({
        url: "/cart/updateCart",
        method: "PUT",
        body,
      }),
      transformResponse: normalizeCartResponse,
      invalidatesTags: ["Cart"],
    }),
    deleteCart: builder.mutation<{ message: string }, string>({
      query: userId => ({
        url: "/cart/deleteCart",
        method: "DELETE",
        body: { userId },
      }),
      invalidatesTags: ["Cart"],
    }),
  }),
});

export const {
  useGetCartQuery,
  useAddCartMutation,
  useUpdateCartMutation,
  useDeleteCartMutation,
} = cartApi;
