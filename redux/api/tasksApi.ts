import { apiSlice } from "./apiSlice";

const taskApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getTasks: builder.query({
            query: () => "/task/69918b0e5c764119a79a4191",
            //providesTags: ["Class"],
        }),
        addTask: builder.mutation({
            query: (credentials) => ({
                url: "/class/add",
                method: "POST",
                body: credentials,
            }),
            invalidatesTags: ["Homework"],
        }),
    }),
});

export const { useGetTasksQuery, useAddTaskMutation } = taskApi;