import { useRouter } from "expo-router"; // If using Expo Router, otherwise remove
import { ArrowLeft, Eye, EyeOff } from "lucide-react-native";
import React, { useEffect, useRef, useState } from "react";
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
} from "react-native";

export default function VerifyEmailScreen() {
  const router = useRouter(); // Remove if not using Expo Router

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" />

      {/* --- Header / Back Button --- */}
      <View className="px-6 pt-10">
        <TouchableOpacity
          onPress={() => router.back()} // Or navigation.goBack()
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
          }}
          className="px-6"
          keyboardShouldPersistTaps="handled"
        >
          {/* --- Title Section --- */}
          <View className="items-center mb-10">
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

          {/* Password Input */}
          <View>
            <Text className="text-gray-500 mb-3 ml-1 text-base">Password</Text>
            <View className="flex-row items-center bg-gray-100 rounded-2xl h-14 px-5">
              <TextInput
                placeholder="Enter your Password"
                placeholderTextColor="#9CA3AF"
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
          </View>

          {/* Password Input */}
          <View>
            <Text className="text-gray-500 mb-3 ml-1 text-base">Password</Text>
            <View className="flex-row items-center bg-gray-100 rounded-2xl h-14 px-5">
              <TextInput
                placeholder="Enter your Password"
                placeholderTextColor="#9CA3AF"
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
          </View>

          {/* --- Confirm Button --- */}
          <TouchableOpacity
            className="w-full bg-[#C59D5F] rounded-full h-14 items-center justify-center shadow-lg shadow-orange-900/20 mb-8"
            activeOpacity={0.8}
          >
            <Text className="text-white text-xl font-bold">Confirm Code</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
