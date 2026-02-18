import { Stack } from "expo-router";
import "./global.css";
import { Provider } from "react-redux";
import { persistor, store } from "@/redux/store";
import { PersistGate } from "redux-persist/integration/react";

export default function RootLayout() {
  return (
    <Provider store={store}>
      {/* Wait for storage to load before rendering the app */}
      <PersistGate loading={null} persistor={persistor}>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="homepage" options={{ headerShown: false }} />
          <Stack.Screen
            name="(auth)/register"
            options={{ headerShown: false }}
          />
          <Stack.Screen name="(auth)/login" options={{ headerShown: false }} />
          <Stack.Screen
            name="(auth)/send-otp"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="(auth)/forget-password"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="(auth)/verify-email"
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="class-details/[id]"
            options={{ headerShown: false }}
          />
        </Stack>
      </PersistGate>
    </Provider>
  );
}
