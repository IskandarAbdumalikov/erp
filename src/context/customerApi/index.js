import { api } from "../api";

export const customerApi = api.injectEndpoints({
  endpoints: (build) => ({
    getCustomers: build.query({
      query: (params) => ({
        url: "/get/customers",
        params,
      }),
      providesTags: ["Customer", "Payment"],
    }),
    getSingleCustomer: build.query({
      query: (id) => ({
        url: `/get/customer/${id}`,
      }),
      providesTags: ["Customer", "Payment"],
    }),
    getCustomersBySearch: build.query({
      query: (search) => ({
        url: `/get/customers/search/${search}`,
      }),
      providesTags: ["Customer", "Payment"],
    }),
    signIn: build.mutation({
      query: (body) => ({
        url: "/auth/sign-in",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Customer", "Payment"],
    }),
    registerCustomer: build.mutation({
      query: (body) => ({
        url: "/create/customer",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Customer", "Payment"],
    }),
    pinCustomer: build.mutation({
      query: ({ customer }) => ({
        url: `/update/customer/${customer._id}`,
        method: "PATCH",
        body: { ...customer, pin: !customer.pin },
      }),
      invalidatesTags: ["Customer", "Payment"],
    }),
    updateCustomer: build.mutation({
      query: ({ id, ...body }) => ({
        url: `/update/customer/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Customer", "Payment"],
    }),
  }),
});

export const {
  useGetSingleCustomerQuery,
  useGetCustomersBySearchQuery,
  useRegisterCustomerMutation,
  useSignInMutation,
  useGetCustomersQuery,
  usePinCustomerMutation,
  useUpdateCustomerMutation,
} = customerApi;
