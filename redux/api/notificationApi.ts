import { apiSlice } from "./apiSlice";

export const notificationApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getNotifications: builder.query({
            query: () => "/notification/my-notifications",
            providesTags: ["Notification"],
        }),
    }),
});

export const { useGetNotificationsQuery } = notificationApi;