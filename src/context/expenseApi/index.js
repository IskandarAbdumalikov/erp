import { api } from "../api";

export const expenseApi = api.injectEndpoints({
  endpoints: (build) => ({
    getExpenses: build.query({
      query: (params) => ({
        url: "/get/expenses",
        params,
      }),
      providesTags: ["Expense"],
    }),
    getExpensesById: build.query({
      query: (id) => ({
        url: `/get/expenses/${id}`,
      }),
      providesTags: ["Expense"],
    }),
    createExpense: build.mutation({
      query: (body) => ({
        url: "/create/expense",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Expense"],
    }),
  }),
});

export const {
  useGetExpensesByIdQuery,
  useGetExpensesQuery,
  useCreateExpenseMutation,
} = expenseApi;
