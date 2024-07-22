import { api } from "../api";

export const profileApi = api.injectEndpoints({
  endpoints: (build) => ({
    getProfile: build.query({
      query: (params) => ({
        url: "/get/profile",
        params,
      }),
      providesTags: ["Profile"],
    }),
    updateProfile: build.mutation({
      query: (body) => ({
        url: "/update/profile",
        method: "PATCH",
        body,
      }),
      providesTags: ["Profile"],
    }),
  }),
});

export const { useGetProfileQuery, useUpdateProfileMutation } = profileApi;
