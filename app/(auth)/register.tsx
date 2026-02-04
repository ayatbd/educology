import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { Eye, EyeOff, Check } from "lucide-react-native";

export default function SignUpScreen() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  return (
    <SafeAreaView className="flex-1 bg-black">
      <StatusBar barStyle="light-content" />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView
          contentContainerStyle={{ paddingBottom: 40 }}
          className="px-6 pt-10"
          showsVerticalScrollIndicator={false}
        >
          {/* --- Header --- */}
          <View className="items-center mb-8">
            <View className="flex-row">
              <Text className="text-3xl font-bold text-[#569C7D] mr-2">
                Create An
              </Text>
              <Text className="text-3xl font-bold text-[#3B75A2]">Account</Text>
            </View>
            <Text className="text-gray-500 mt-2 text-base">
              Fill in your information.
            </Text>
          </View>

          {/* --- Form Fields --- */}
          <View className="space-y-5">
            {/* Name Input */}
            <View>
              <Text className="text-gray-500 mb-2 ml-1">Name</Text>
              <TextInput
                placeholder="Enter your name"
                placeholderTextColor="#9CA3AF"
                className="bg-white rounded-2xl h-14 px-4 text-black text-base"
              />
            </View>

            {/* Email Input */}
            <View>
              <Text className="text-gray-500 mb-2 ml-1">Email</Text>
              <TextInput
                placeholder="Enter your email"
                placeholderTextColor="#9CA3AF"
                keyboardType="email-address"
                autoCapitalize="none"
                className="bg-white rounded-2xl h-14 px-4 text-black text-base"
              />
            </View>

            {/* Phone Input */}
            <View>
              <Text className="text-gray-500 mb-2 ml-1">Phone</Text>
              <TextInput
                placeholder="Enter your phone number" // Fixed placeholder to match context (image said email by mistake)
                placeholderTextColor="#9CA3AF"
                keyboardType="phone-pad"
                className="bg-white rounded-2xl h-14 px-4 text-black text-base"
              />
            </View>

            {/* New Password Input */}
            <View>
              <Text className="text-gray-500 mb-2 ml-1">New Password</Text>
              <View className="flex-row items-center bg-white rounded-2xl h-14 px-4">
                <TextInput
                  placeholder="Enter your Password"
                  placeholderTextColor="#9CA3AF"
                  secureTextEntry={!showPassword}
                  className="flex-1 text-black text-base h-full"
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <Eye size={20} color="#9CA3AF" />
                  ) : (
                    <EyeOff size={20} color="#9CA3AF" />
                  )}
                </TouchableOpacity>
              </View>
            </View>

            {/* Confirm Password Input */}
            <View>
              <Text className="text-gray-500 mb-2 ml-1">Confirm Password</Text>
              <View className="flex-row items-center bg-white rounded-2xl h-14 px-4">
                <TextInput
                  placeholder="Enter your Password"
                  placeholderTextColor="#9CA3AF"
                  secureTextEntry={!showConfirmPassword}
                  className="flex-1 text-black text-base h-full"
                />
                <TouchableOpacity
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <Eye size={20} color="#9CA3AF" />
                  ) : (
                    <EyeOff size={20} color="#9CA3AF" />
                  )}
                </TouchableOpacity>
              </View>
            </View>

            {/* --- Terms Checkbox --- */}
            <View className="flex-row items-center mt-2">
              <TouchableOpacity
                onPress={() => setIsChecked(!isChecked)}
                className={`w-6 h-6 rounded bg-[#2A4559] items-center justify-center mr-3 ${
                  isChecked ? "bg-[#3B75A2]" : "bg-[#2A4559]"
                }`}
              >
                {isChecked && <Check size={16} color="white" strokeWidth={3} />}
              </TouchableOpacity>
              <Text className="text-gray-500 flex-1 flex-wrap">
                I agree with this{" "}
                <Text className="text-[#3B75A2]">Terms of Use</Text> and{" "}
                <Text className="text-[#3B75A2]">Privacy Policy</Text>.
              </Text>
            </View>

            {/* --- Sign Up Button --- */}
            <TouchableOpacity
              className="w-full bg-[#C59D5F] rounded-full h-14 items-center justify-center mt-4 shadow-lg shadow-orange-900/20"
              activeOpacity={0.8}
            >
              <Text className="text-white text-xl font-bold">Sign Up</Text>
            </TouchableOpacity>

            {/* --- Footer Link --- */}
            <View className="flex-row justify-center mt-6">
              <Text className="text-gray-500 text-base">
                Already have an account?{" "}
              </Text>
              <TouchableOpacity>
                <Text className="text-[#3B75A2] font-bold text-base">
                  Sign In
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
