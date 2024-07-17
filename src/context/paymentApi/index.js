import { api } from "../api";

export const paymentApi = api.injectEndpoints({
  endpoints: (build) => ({
    getPayments: build.query({
      query: (params) => ({
        url: "/get/payments",
        params,
      }),
      providesTags: ["Payment"],
    }),
    getPaymentById: build.query({
      query: (id) => ({
        url: `/get/payments/${id}`,
      }),
      providesTags: ["Payment"],
    }),
    createPayment: build.mutation({
      query: (body) => ({
        url: "/create/payment",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Payment"],
    }),
  }),
});

export const {
  useGetPaymentByIdQuery,
  useGetPaymentsBySearchQuery,
  useGetPaymentsQuery,
  useCreatePaymentMutation,
} = paymentApi;
