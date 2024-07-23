import { api } from "../api/index";

export const productApi = api.injectEndpoints({
  endpoints: (build) => ({
    getProducts: build.query({
      query: (params) => ({
        url: "get/products",
        params,
      }),
      providesTags: ["Product"],
    }),
    getProductById: build.query({
      query: (id) => ({
        url: `/get/product/${id}`,
      }),
      providesTags: ["Product"],
    }),
    createProduct: build.mutation({
      query: (body) => ({
        url: "/create/product",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Product", "Seller"],
    }),
    updateProduct: build.mutation({
      query: ({ id, body }) => ({
        url: `/update/product/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Product", "Seller"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useCreateProductMutation,
  useDeleteProductMutation,
  useUpdateProductMutation,
} = productApi;
