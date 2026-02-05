import { Stack } from "expo-router";
import "./global.css";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)/register" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)/login" options={{ headerShown: false }} />
      <Stack.Screen
        name="(auth)/forget-password"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="(auth)/verify-email"
        options={{ headerShown: false }}
      />
    </Stack>
  );
}
