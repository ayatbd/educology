import { useRouter, useLocalSearchParams } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
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
  Alert,
} from "react-native";

// Assuming you have these mutations in your API slice
// If you don't have resendOtpMutation, you'll need to add it to your api file
import {
  useVerifyOtpMutation,
  useResendOtpMutation,
} from "@/redux/api/authApi";

export default function VerifyEmailScreen() {
  const router = useRouter();

  // 1. Get the email passed from Sign Up screen
  const { email } = useLocalSearchParams();

  const [otp, setOtp] = useState(["", "", "", "", ""]);
  const [timer, setTimer] = useState(30);
  const inputRefs = useRef([]);

  // Redux Toolkit Mutations
  const [verifyEmail, { isLoading: isVerifying }] = useVerifyOtpMutation();
  // Optional: Add this to your API slice if you want the resend button to work with backend
  const [resendOtp, { isLoading: isResending }] = useResendOtpMutation();

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timer]);

  const handleOtpChange = (text: string, index: number) => {
    // Handle pasting logic (if user pastes "12345")
    if (text.length > 1) {
      const pastedChars = text.slice(0, 5).split("");
      const newOtp = [...otp];
      pastedChars.forEach((char, i) => {
        if (index + i < 5) newOtp[index + i] = char;
      });
      setOtp(newOtp);
      // Focus the last filled input
      const lastIndex = Math.min(index + text.length, 4);
      inputRefs.current[lastIndex]?.focus();
      return;
    }

    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text.length === 1 && index < 4) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === "Backspace") {
      if (otp[index] === "" && index > 0) {
        inputRefs.current[index - 1]?.focus();
        const newOtp = [...otp];
        newOtp[index - 1] = "";
        setOtp(newOtp);
      }
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins < 10 ? "0" : ""}${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const handleResend = async () => {
    if (timer > 0) return;

    try {
      if (!email) {
        Alert.alert("Error", "Email not found. Please try signing up again.");
        return;
      }

      // Call Backend API to resend
      await resendOtp({ email }).unwrap();

      Alert.alert("Sent", "A new code has been sent to your email.");
      setTimer(30);
    } catch (error) {
      const msg = error?.data?.message || "Failed to resend code.";
      Alert.alert("Error", msg);
    }
  };

  const handleVerify = async () => {
    const otpCode = otp.join("");

    if (otpCode.length < 5) {
      Alert.alert("Invalid Code", "Please enter the full 5-digit code.");
      return;
    }

    if (!email) {
      Alert.alert(
        "Error",
        "Session error: Email missing. Please go back and try again.",
      );
      return;
    }

    try {
      const payload = {
        email: email,
        oneTimeCode: otpCode, // Ensure this key matches your backend expectation
      };

      await verifyEmail(payload).unwrap();

      Alert.alert("Success", "Email verified successfully!", [
        { text: "OK", onPress: () => router.replace("/login") }, // or navigate to Home
      ]);
    } catch (error) {
      const errorMessage =
        error?.data?.message || "Verification failed. Invalid code.";
      Alert.alert("Verification Failed", errorMessage);
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
            paddingBottom: 20,
          }}
          className="px-6 mt-10"
          keyboardShouldPersistTaps="handled"
        >
          <View className="items-center mb-10">
            <View className="flex-row">
              <Text className="text-3xl font-bold text-[#569C7D] mr-2">
                Verify your
              </Text>
              <Text className="text-3xl font-bold text-[#2A4559]">email</Text>
            </View>
            <Text className="text-gray-500 text-center mt-4 text-base leading-6 px-4">
              We’ve sent an email with an activation code to{"\n"}
              <Text className="font-bold text-[#2A4559]">
                {email || "your email"}
              </Text>
            </Text>
          </View>

          <View className="flex-row justify-between mb-4 px-2">
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                value={digit}
                onChangeText={(text) => handleOtpChange(text, index)}
                onKeyPress={(e) => handleKeyPress(e, index)}
                keyboardType="number-pad"
                maxLength={textInputMaxLength(index)} // Helper below or just use 1
                selectTextOnFocus
                className={`w-14 h-14 border rounded-2xl text-center text-2xl text-[#2A4559] ${
                  digit
                    ? "border-[#569C7D] bg-[#F0F9F6]"
                    : "border-gray-300 bg-white"
                }`}
              />
            ))}
          </View>

          <View className="items-center mb-10">
            <Text className="text-[#2A4559] font-medium text-lg">
              {formatTime(timer)}
            </Text>
          </View>

          <View className="flex-row justify-between items-center mb-8 px-1">
            <Text className="text-gray-500 text-base">
              Didn’t get the code?
            </Text>
            <TouchableOpacity
              onPress={handleResend}
              disabled={timer > 0 || isResending}
            >
              <Text
                className={`font-bold text-base ${
                  timer > 0 ? "text-gray-300" : "text-[#3B75A2]"
                }`}
              >
                {isResending ? "Sending..." : "Resend"}
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            className={`w-full rounded-full h-14 items-center justify-center shadow-lg shadow-orange-900/20 mb-8 ${
              isVerifying ? "bg-[#C59D5F]/70" : "bg-[#C59D5F]"
            }`}
            activeOpacity={0.8}
            onPress={handleVerify}
            disabled={isVerifying}
          >
            <Text className="text-white text-xl font-bold">
              {isVerifying ? "Verifying..." : "Confirm Code"}
            </Text>
          </TouchableOpacity>

          <Text className="text-center text-gray-500 text-sm leading-5 px-2">
            <Text className="text-red-500 font-bold">Note:</Text> If you have
            not received the email in your inbox, please check your spam or junk
            folder.
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// Helper to allow pasting logic (optional refinement)
// If we pasted 5 chars into the first box, maxLength needs to allow it briefly for the handler to catch it
// Otherwise keep it 1.
const textInputMaxLength = (index) => (index === 0 ? 5 : 1);
