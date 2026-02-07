import { Stack } from "expo-router";
import "./global.css";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react"; // Import this
import { store, persistor } from "./path/to/store"; // Import store and persistor
import MainNavigation from "./navigation"; // Your existing navigation

export default function RootLayout() {
  return (
    <Provider store={store}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)/register" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)/login" options={{ headerShown: false }} />
        <Stack.Screen
          name="(auth)/reset-password"
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
      </Stack>
    </Provider>
  );
}
