import { useRouter, useLocalSearchParams } from "expo-router";
import { ArrowLeft, Eye, EyeOff } from "lucide-react-native";
import React, { useState } from "react";
import { useResetPasswordMutation } from "@/redux/api/authApi";
import {
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
} from "react-native";

export default function ResetPasswordScreen() {
  const router = useRouter();

  const { email } = useLocalSearchParams<{ email: string }>();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const handleResetPassword = async () => {
    // Basic Validation
    if (!newPassword || !confirmPassword) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match.");
      return;
    }

    if (newPassword.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters long.");
      return;
    }

    if (!email) {
      Alert.alert(
        "Error",
        "Session missing (Email not found). Please try again.",
      );
      router.replace("/login");
      return;
    }

    try {
      const payload = {
        email: email,
        newPassword: newPassword,
      };

      await resetPassword(payload).unwrap();

      // 5. Success Handler
      Alert.alert(
        "Success",
        "Your password has been reset successfully. Please login.",
        [{ text: "OK", onPress: () => router.replace("/login") }],
      );
    } catch (error: any) {
      // 6. Error Handler
      const msg = error?.data?.message || "Failed to reset password.";
      Alert.alert("Error", msg);
      console.error("Reset Password Error:", error);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" />

      <View className="px-6 pt-10">
        <TouchableOpacity
          onPress={() => router.back()}
          className="w-10 h-10 justify-center"
        >
          <ArrowLeft size={28} color="black" />
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: "center",
            gap: 20,
            paddingBottom: 40,
          }}
          className="px-6"
          keyboardShouldPersistTaps="handled"
        >
          {/* --- Title Section --- */}
          <View className="items-center mb-6">
            <View className="flex-row">
              <Text className="text-3xl font-bold text-[#569C7D] mr-2">
                Reset Your
              </Text>
              <Text className="text-3xl font-bold text-[#2A4559]">
                Password
              </Text>
            </View>
            <Text className="text-gray-500 text-center mt-4 text-base leading-6 px-4">
              Enter your new password to reset your password
            </Text>
          </View>

          {/* New Password Input */}
          <View>
            <Text className="text-gray-500 mb-3 ml-1 text-base">
              New Password
            </Text>
            <View className="flex-row items-center bg-gray-100 rounded-2xl h-14 px-5 border border-gray-200 focus:border-[#569C7D]">
              <TextInput
                placeholder="Enter new password"
                placeholderTextColor="#9CA3AF"
                value={newPassword}
                onChangeText={setNewPassword}
                secureTextEntry={!showNewPass}
                className="flex-1 text-black text-base h-full"
              />
              <TouchableOpacity
                onPress={() => setShowNewPass(!showNewPass)}
                className="ml-2"
              >
                {showNewPass ? (
                  <Eye size={22} color="#6B7280" />
                ) : (
                  <EyeOff size={22} color="#6B7280" />
                )}
              </TouchableOpacity>
            </View>
          </View>

          {/* Confirm Password Input */}
          <View>
            <Text className="text-gray-500 mb-3 ml-1 text-base">
              Confirm Password
            </Text>
            <View className="flex-row items-center bg-gray-100 rounded-2xl h-14 px-5 border border-gray-200 focus:border-[#569C7D]">
              <TextInput
                placeholder="Re-enter password"
                placeholderTextColor="#9CA3AF"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!showConfirmPass}
                className="flex-1 text-black text-base h-full"
              />
              <TouchableOpacity
                onPress={() => setShowConfirmPass(!showConfirmPass)}
                className="ml-2"
              >
                {showConfirmPass ? (
                  <Eye size={22} color="#6B7280" />
                ) : (
                  <EyeOff size={22} color="#6B7280" />
                )}
              </TouchableOpacity>
            </View>
          </View>

          {/* --- Reset Button --- */}
          <TouchableOpacity
            className={`w-full rounded-full h-14 items-center justify-center shadow-lg shadow-orange-900/20 mb-8 mt-4 ${
              isLoading ? "bg-[#C59D5F]/70" : "bg-[#C59D5F]"
            }`}
            activeOpacity={0.8}
            onPress={handleResetPassword}
            disabled={isLoading}
          >
            <Text className="text-white text-xl font-bold">
              {isLoading ? "Resetting..." : "Reset Password"}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
