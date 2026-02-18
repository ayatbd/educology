import { router } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
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
} from "react-native";
import { useSendOtpMutation } from "@/redux/api/authApi";

export default function SendOtp() {
  const [email, setEmail] = useState("");

  const [sendOtp, { isLoading }] = useSendOtpMutation();

  const handleSubmit = async () => {
    if (!email.trim()) {
      Alert.alert("Error", "Please enter your email address.");
      return;
    }

    try {
      // Assuming your backend expects { email: "..." }
      await sendOtp({ email }).unwrap();

      Alert.alert("Success", "OTP sent successfully!");

      // Navigate to verify page and pass the email
      router.push({
        pathname: "/verify-email",
        params: { email: email },
      });
    } catch (error: any) {
      const errorMessage =
        error?.data?.message || "Failed to send OTP. Please try again.";
      Alert.alert("Error", errorMessage);
      console.error("Send OTP error:", error);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="light-content" />

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
              source={require("@/assets/images/home/logo.png")} // Ensure path is correct
              className="w-[226px] h-48"
              resizeMode="contain"
            />
          </View>

          <View className="w-full">
            <View className="items-center mb-12">
              <View className="flex-row">
                <Text className="text-3xl font-bold text-[#569C7D] mr-2">
                  Forget Your
                </Text>
                <Text className="text-3xl font-bold text-[#3B75A2]">
                  Password
                </Text>
              </View>
              <Text className="text-gray-500 mt-3 text-base font-medium text-center">
                Enter your email to reset your password
              </Text>
            </View>

            <View className="space-y-6">
              <View>
                <Text className="text-gray-500 mb-3 ml-1 text-base">Email</Text>
                <TextInput
                  value={email}
                  onChangeText={setEmail}
                  placeholder="Enter your email"
                  placeholderTextColor="#9CA3AF"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  className="bg-gray-100 rounded-2xl h-14 px-5 text-black text-base"
                />
              </View>
              <TouchableOpacity
                className={`w-full rounded-full h-14 items-center justify-center mt-6 shadow-lg shadow-orange-900/20 ${
                  isLoading ? "bg-[#C59D5F]/70" : "bg-[#C59D5F]"
                }`}
                activeOpacity={0.8}
                onPress={handleSubmit}
                disabled={isLoading}
              >
                <Text className="text-white text-xl font-bold">
                  {isLoading ? "Sending..." : "Get Verification Code"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
