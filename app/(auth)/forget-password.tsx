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
} from "react-native";

export default function SignInScreen() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

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
              source={require("../../assets/images/home/logo.png")}
              className="w-[226px] h-48"
              resizeMode="contain" // Added resizeMode for better logo fit
            />
          </View>
          {/* Wrapper View */}
          <View className="w-full">
            {/* --- Header --- */}
            <View className="items-center mb-12">
              <View className="flex-row">
                <Text className="text-3xl font-bold text-[#569C7D] mr-2">
                  Forget Your
                </Text>
                <Text className="text-3xl font-bold text-[#3B75A2]">
                  Password
                </Text>
              </View>
              <Text className="text-gray-500 mt-3 text-base font-medium">
                Enter your email to reset your password
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
                  className="bg-gray-100 rounded-2xl h-14 px-5 text-black text-base"
                />
              </View>

              {/* --- Sign In Button --- */}
              <TouchableOpacity
                className="w-full bg-[#C59D5F] rounded-full h-14 items-center justify-center mt-6 shadow-lg shadow-orange-900/20"
                activeOpacity={0.8}
                onPress={() => console.log("Sign In Pressed")}
              >
                <Text className="text-white text-xl font-bold">
                  Get Verification Code
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
