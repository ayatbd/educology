import { apiSlice } from "./apiSlice";

const classApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getClasses: builder.query({
            query: () => "/class/69918b0e5c764119a79a4191",
            //providesTags: ["Class"],
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