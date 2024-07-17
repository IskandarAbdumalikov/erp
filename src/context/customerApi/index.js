import { api } from "../api";

export const customerApi = api.injectEndpoints({
  endpoints: (build) => ({
    getCustomers: build.query({
      query: (params) => ({
        url: "/get/customers",
        params,
      }),
      providesTags: ["Customer"],
    }),
    getSingleCustomer: build.query({
      query: (id) => ({
        url: `/get/customer/${id}`,
      }),
      providesTags: ["Customer"],
    }),
    getCustomersBySearch: build.query({
      query: (search) => ({
        url: `/get/customers/search/${search}`,
      }),
      providesTags: ["Customer"],
    }),
    signIn: build.mutation({
      query: (body) => ({
        url: "/auth/sign-in",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Customer"],
    }),
    registerCustomer: build.mutation({
      query: (body) => ({
        url: "/create/customer",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Customer"],
    }),
    pinCustomer: build.mutation({
      query: ({ customer }) => ({
        url: `/update/customer/${customer._id}`,
        method: "PATCH",
        body: { ...customer, pin: !customer.pin },
      }),
      invalidatesTags: ["Customer"],
    }),
    updateCustomer: build.mutation({
      query: ({ id, ...body }) => ({
        url: `/update/customer/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Customer"],
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
