import { apiSlice } from './apiSlice';
import { setCredentials } from '../features/auth/authSlice';

export const authApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (credentials) => ({
                url: '/auth/login',
                method: 'POST',
                body: credentials,
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;

                    // Dispatching this updates Redux.
                    // Because we added 'redux-persist' in store.ts, 
                    // this will automatically save to AsyncStorage.
                    dispatch(setCredentials(data.data));
                } catch (err) {
                    console.error("Login failed", err);
                }
            },
        }),
        register: builder.mutation({
            query: (credentials) => {
                console.log(credentials);
                return {
                    url: '/auth/register',
                    method: 'POST',
                    body: credentials,
                }
            },
        }),
        forgotPassword: builder.mutation({
            query: (data) => ({
                url: '/auth/forgotPass',
                method: 'POST',
                body: data,
            }),
        }),
        verifyOtp: builder.mutation({
            query: (data) => ({
                url: '/auth/verifyOtp',
                method: 'POST',
                body: data,
            }),
        }),
        resetPassword: builder.mutation({
            query: (data) => ({
                url: '/auth/changePassword',
                method: 'POST',
                body: data,
            }),
        }),
    }),
});

export const {
    useLoginMutation,
    useRegisterMutation,
    useForgotPasswordMutation,
    useVerifyOtpMutation,
    useResetPasswordMutation
} = authApi;