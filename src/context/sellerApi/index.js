import { api } from "../api/index";

export const sellerApi = api.injectEndpoints({
  endpoints: (build) => ({
    getSellers: build.query({
      query: (params) => ({
        url: "get/sellers",
        params,
      }),
      providesTags: ["Seller", "Expense"],
    }),
    getSingleSeller: build.query({
      query: (id) => ({
        url: `get/seller/${id}`,
      }),
      providesTags: ["Seller", "Expense"],
    }),
    getSellersBySearch: build.query({
      query: (params) => ({
        url: "get/sellers/search",
        params,
      }),
      providesTags: ["Seller", "Expense"],
    }),
    pinSeller: build.mutation({
      query: ({ seller }) => ({
        url: `/update/seller/${seller._id}`,
        method: "PATCH",
        body: { ...seller, pin: !seller.pin },
      }),
      invalidatesTags: ["Seller", "Payment"],
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
  useGetSellersBySearchQuery,
  useRegisterSellerMutation,
  useLoginSellerMutation,
  useGetSingleSellerQuery,
  usePinSellerMutation,
} = sellerApi;
