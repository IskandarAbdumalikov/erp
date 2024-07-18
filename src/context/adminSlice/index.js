import { api } from "../api";

export const adminApi = api.injectEndpoints({
  endpoints: (build) => ({
    getAdmins: build.query({
      query: (params) => ({
        url: "/get/admins",
        params,
      }),
      providesTags: ["Admin"],
    }),
    getProfile: build.query({
      query: (params) => ({
        url: "/get/profile",
        params,
      }),
      providesTags: ["Admin", "Profile"],
    }),
    updateProfile: build.mutation({
      query: (body) => ({
        url: "/update/profile",
        method: "PATCH",
        body,
      }),
      providesTags: ["Admin", "Profile"],
    }),
    signIn: build.mutation({
      query: (body) => ({
        url: "/admin/sign-in",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Admin"],
    }),
    registerAdmin: build.mutation({
      query: (body) => ({
        url: "/admin/sign-up",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Admin"],
    }),
  }),
});

export const {
  useRegisterAdminMutation,
  useSignInMutation,
  useGetAdminsQuery,
  useGetProfileQuery,
  useUpdateProfileMutation,
} = adminApi;
