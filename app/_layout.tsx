import { Stack } from "expo-router";
import "./global.css";
import { Provider } from "react-redux";
import { persistor, store } from "@/redux/store";
import { PersistGate } from "redux-persist/integration/react";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  useEffect(() => {
    // Logic to hide splash screen could go here
    // or inside PersistGate's onBeforeLift
  }, []);

  return (
    <Provider store={store}>
      <PersistGate
        loading={null}
        persistor={persistor}
        onBeforeLift={() => SplashScreen.hideAsync()}
      >
        <Stack
          screenOptions={{
            headerShown: false,
            animation: "fade",
          }}
        >
          <Stack.Screen name="index" />

          {/* Example: making a specific screen a modal */}
          <Stack.Screen
            name="participants"
            options={{ presentation: "modal" }}
          />
        </Stack>
      </PersistGate>
    </Provider>
  );
}
