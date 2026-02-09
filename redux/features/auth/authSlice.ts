import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { jwtDecode } from 'jwt-decode';

interface AuthState {
    user: any | null; // You can replace 'any' with your User interface
    accessToken: string | null;
    refreshToken: string | null;
    isAuthenticated: boolean;
}

const initialState: AuthState = {
    user: null,
    accessToken: null,
    refreshToken: null,
    isAuthenticated: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action: PayloadAction<{ accessToken: string; refreshToken?: string }>) => {
            const { accessToken, refreshToken } = action.payload;

            // 1. Update State
            state.accessToken = accessToken;

            // We store refreshToken in Redux state now, so Redux Persist can save it too
            if (refreshToken) {
                state.refreshToken = refreshToken;
            }

            // 2. Decode Token
            if (accessToken) {
                try {
                    state.user = jwtDecode(accessToken);
                    state.isAuthenticated = true;
                } catch (e) {
                    state.isAuthenticated = false;
                    state.user = null;
                }
            }

            // REMOVED: localStorage.setItem(...) 
            // Reason: Redux Persist automatically saves this state change to AsyncStorage
        },
        logout: (state) => {
            state.user = null;
            state.accessToken = null;
            state.refreshToken = null;
            state.isAuthenticated = false;

            // REMOVED: localStorage.removeItem(...)
            // Reason: Redux Persist will detect these nulls and update AsyncStorage automatically
        },
    },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;