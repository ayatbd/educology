import { apiSlice } from "./apiSlice";

export const classApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getClasses: builder.query({
            query: () => "/class/my-classes",
            providesTags: ["Class"],
        }),
        addClass: builder.mutation({
            query: (credentials) => ({
                url: "/class/add",
                method: "POST",
                body: credentials,
            }),
            invalidatesTags: ["Class"],
        }),
    }),
});

export const { useGetClassesQuery, useAddClassMutation } = classApi;