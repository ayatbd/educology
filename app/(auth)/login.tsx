import { router } from "expo-router";
import { Eye, EyeOff } from "lucide-react-native";
import React, { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  ActivityIndicator,
} from "react-native";

// 1. Import the mutation hook
// Make sure this path points to your actual authApi file location
import { useLoginMutation } from "../../redux/api/authApi";

export default function SignInScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // 2. Initialize the login mutation
  const [login, { isLoading }] = useLoginMutation();

  const handleForgotPassword = () => {
    router.push("/forget-password");
  };

  const handleSignIn = async () => {
    if (!email || !password) {
      Alert.alert("Missing Fields", "Please enter both email and password.");
      return;
    }

    try {
      // 3. Call the API
      // .unwrap() allows us to catch the error in the catch block easily
      const response = await login({ email, password }).unwrap();

      console.log("Login Successful:", response);

      // 4. Navigate to your main app screen
      // Use 'replace' so they can't go back to login by pressing back
      router.replace("/"); // Change this to your actual dashboard route, e.g., '/home'
    } catch (err: any) {
      console.error("Login Failed:", err);
      // Extract error message from backend response if available
      const errorMessage =
        err?.data?.message || "Invalid credentials or server error";
      Alert.alert("Login Failed", errorMessage);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: "center",
          }}
          className="px-6"
          keyboardShouldPersistTaps="handled"
        >
          {/* --- Logo Section --- */}
          <View className="items-center mb-8">
            <Image
              source={require("../../assets/images/home/logo.png")}
              className="w-[226px] h-48"
              resizeMode="contain"
            />
          </View>

          {/* Wrapper View */}
          <View className="w-full">
            {/* --- Header --- */}
            <View className="items-center mb-12">
              <View className="flex-row">
                <Text className="text-3xl font-bold text-[#569C7D] mr-2">
                  Welcome to
                </Text>
                <Text className="text-3xl font-bold text-[#3B75A2]">
                  educology
                </Text>
              </View>
              <Text className="text-gray-500 mt-3 text-base font-medium">
                Sign in to access your account
              </Text>
            </View>

            {/* --- Form Fields --- */}
            <View className="space-y-6">
              {/* Email Input */}
              <View>
                <Text className="text-gray-500 mb-3 ml-1 text-base">Email</Text>
                <TextInput
                  placeholder="Enter your email"
                  placeholderTextColor="#9CA3AF"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  // Bind state
                  value={email}
                  onChangeText={setEmail}
                  className="bg-gray-100 rounded-2xl h-14 px-5 text-black text-base"
                />
              </View>

              {/* Password Input */}
              <View>
                <Text className="text-gray-500 mb-3 ml-1 text-base">
                  Password
                </Text>
                <View className="flex-row items-center bg-gray-100 rounded-2xl h-14 px-5">
                  <TextInput
                    placeholder="Enter your Password"
                    placeholderTextColor="#9CA3AF"
                    // Bind state
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                    className="flex-1 text-black text-base h-full"
                  />
                  <TouchableOpacity
                    onPress={() => setShowPassword(!showPassword)}
                    className="ml-2"
                  >
                    {showPassword ? (
                      <Eye size={22} color="#6B7280" />
                    ) : (
                      <EyeOff size={22} color="#6B7280" />
                    )}
                  </TouchableOpacity>
                </View>

                {/* Forget Password Link */}
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={handleForgotPassword}
                  className="items-end mt-3"
                >
                  <Text className="text-gray-400 text-sm">
                    Forget Password?
                  </Text>
                </TouchableOpacity>
              </View>

              {/* --- Sign In Button --- */}
              <TouchableOpacity
                className={`w-full rounded-full h-14 items-center justify-center mt-6 shadow-lg shadow-orange-900/20 ${
                  isLoading ? "bg-[#C59D5F]/70" : "bg-[#C59D5F]"
                }`}
                activeOpacity={0.8}
                onPress={handleSignIn}
                disabled={isLoading} // Prevent double clicks
              >
                {isLoading ? (
                  <ActivityIndicator color="#FFF" />
                ) : (
                  <Text className="text-white text-xl font-bold">Sign In</Text>
                )}
              </TouchableOpacity>

              {/* --- Footer Link --- */}
              <View className="flex-row justify-center mt-8">
                <Text className="text-gray-500 text-base">
                  Don’t have an account?{" "}
                </Text>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => router.push("/register")}
                >
                  <Text className="text-[#3B75A2] font-bold text-base">
                    Sign Up
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
