import { BaseQueryApi, createApi, FetchArgs, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Mutex } from 'async-mutex';
import { logout, setCredentials } from '../features/auth/authSlice';
import { RootState } from '../store'; // Adjust path to your store.ts

const mutex = new Mutex();

interface ApiResponse {
    success: boolean;
    data: {
        accessToken: string;
        refreshToken: string;
    };
}
// http://10.10.20.34:5000/api/v1
// https://lms-orpin-five.vercel.app/api/v1
const baseQuery = fetchBaseQuery({
    baseUrl: 'https://lms-orpin-five.vercel.app/api/v1',
    prepareHeaders: (headers, { getState }) => {
        const state = getState() as RootState;
        // 1. Read directly from Redux state (Redux Persist handles the storage retrieval)
        const token = state.auth.accessToken;

        if (token) {
            headers.set('authorization', `Bearer ${token}`);
        }
        return headers;
    },
});

const baseQueryWithReauth = async (args: string | FetchArgs, api: BaseQueryApi, extraOptions: Record<string, unknown>) => {
    await mutex.waitForUnlock();
    let result = await baseQuery(args, api, extraOptions);

    if (result.error && result.error.status === 401) {
        if (!mutex.isLocked()) {
            const release = await mutex.acquire();
            try {
                // 2. Get Refresh Token from Redux State instead of localStorage
                const state = api.getState() as RootState;
                const refreshToken = state.auth.refreshToken;

                if (refreshToken) {
                    const refreshResult = await baseQuery(
                        {
                            url: '/auth/refresh',
                            method: 'POST',
                            body: { refreshToken },
                        },
                        api,
                        extraOptions
                    );

                    const responseData = refreshResult.data as ApiResponse;

                    // FIX: Access nested data properly based on your JSON
                    const newAccessToken = responseData?.data?.accessToken;
                    const newRefreshToken = responseData?.data?.refreshToken;

                    if (newAccessToken) {
                        // 3. Update Redux (Redux Persist will save this automatically)
                        api.dispatch(setCredentials({
                            accessToken: newAccessToken,
                            refreshToken: newRefreshToken || refreshToken
                        }));

                        // Retry the original request
                        result = await baseQuery(args, api, extraOptions);
                    } else {
                        api.dispatch(logout());
                        // 4. Remove window.location. Use State-Based Navigation in your UI.
                    }
                } else {
                    api.dispatch(logout());
                }
            } finally {
                release();
            }
        } else {
            await mutex.waitForUnlock();
            result = await baseQuery(args, api, extraOptions);
        }
    }
    return result;
};

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: baseQueryWithReauth,
    tagTypes: ["Notification", "Class", "Homework"],
    endpoints: () => ({}),
});