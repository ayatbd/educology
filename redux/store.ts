import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import authReducer from './features/auth/authSlice';
import { apiSlice } from './api/apiSlice';

// 1. Import Persist logic
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';

// 2. Configure Persistence
const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['auth'], // Only persist the auth slice (tokens)
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);

export const store = configureStore({
    reducer: {
        auth: persistedAuthReducer, // Use the persisted reducer
        [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            // 3. Ignore persist actions to prevent warnings
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }).concat(apiSlice.middleware),
});

setupListeners(store.dispatch);

export const persistor = persistStore(store); // Export persistor for App.tsx

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;