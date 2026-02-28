import { apiSlice } from "./apiSlice";

export const classApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getClasses: builder.query({
            query: () => "/class/my-classes",
        }),
    }),
});