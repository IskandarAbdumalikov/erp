import { api } from "../api/index";

export const sellerApi = api.injectEndpoints({
  endpoints: (build) => ({
    getSellers: build.query({
      query: (params) => ({
        url: "get/sellers",
        params,
      }),
      providesTags: ["Seller"],
    }),
    loginSeller: build.mutation({
      query: (body) => ({
        url: "/auth/sign-in",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Seller"],
    }),
    registerSeller: build.mutation({
      query: (body) => ({
        url: "/auth/sign-up",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Seller"],
    }),
  }),
});

export const {
  useGetSellersQuery,
  useRegisterSellerMutation,
  useLoginSellerMutation,
} = sellerApi;
