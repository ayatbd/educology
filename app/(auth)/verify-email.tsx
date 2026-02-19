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
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
} from "react-native";

import {
  useVerifyOtpMutation,
  useResendOtpMutation,
} from "@/redux/api/authApi";

export default function VerifyEmailScreen() {
  const router = useRouter();

  // 1. Receive the 'source' param here
  const { email, source } = useLocalSearchParams<{
    email: string;
    source?: string;
  }>();

  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState<number>(30);

  const inputRefs = useRef<(TextInput | null)[]>([]);

  const [verifyEmail, { isLoading: isVerifying }] = useVerifyOtpMutation();
  const [resendOtp, { isLoading: isResending }] = useResendOtpMutation();

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleOtpChange = (text: string, index: number) => {
    if (text.length > 1) {
      const pastedChars = text.slice(0, 6).split("");
      const newOtp = [...otp];
      pastedChars.forEach((char, i) => {
        if (index + i < 6) newOtp[index + i] = char;
      });
      setOtp(newOtp);

      const lastIndex = Math.min(index + text.length, 5);
      inputRefs.current[lastIndex]?.focus();
      return;
    }

    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text.length === 1 && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (
    e: NativeSyntheticEvent<TextInputKeyPressEventData>,
    index: number,
  ) => {
    if (e.nativeEvent.key === "Backspace") {
      if (otp[index] === "" && index > 0) {
        inputRefs.current[index - 1]?.focus();
        const newOtp = [...otp];
        newOtp[index - 1] = "";
        setOtp(newOtp);
      }
    }
  };

  const formatTime = (seconds: number): string => {
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

      await resendOtp({ email }).unwrap();

      Alert.alert("Sent", "A new code has been sent to your email.");
      setTimer(30);
    } catch (error: any) {
      const msg = error?.data?.message || "Failed to resend code.";
      Alert.alert("Error", msg);
    }
  };

  const handleVerify = async () => {
    const otpCode = otp.join("");

    if (otpCode.length < 6) {
      Alert.alert("Invalid Code", "Please enter the full 6-digit code.");
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
        otp: otpCode,
      };

      await verifyEmail(payload).unwrap();

      Alert.alert("Success", "Email verified successfully!", [
        {
          text: "OK",
          onPress: () => {
            // 2. Conditional Navigation Logic
            if (source === "forgot-password") {
              // Redirect to Reset Password Page
              router.replace({
                pathname: "/reset-password", // Ensure this route exists in your app
                params: { email: email }, // Usually need email on reset page too
              });
            } else {
              // Default: Redirect to Login Page (Register flow)
              router.replace("/login");
            }
          },
        },
      ]);
    } catch (error: any) {
      const errorMessage =
        error?.data?.message || "Verification failed. Invalid code.";
      Alert.alert("Verification Failed", errorMessage);
      console.error("Verification error:", error);
    }
  };

  const textInputMaxLength = (index: number) => (index === 0 ? 6 : 1);

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

          <View className="flex-row justify-between mb-4 px-1">
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                value={digit}
                onChangeText={(text) => handleOtpChange(text, index)}
                onKeyPress={(e) => handleKeyPress(e, index)}
                keyboardType="number-pad"
                maxLength={textInputMaxLength(index)}
                selectTextOnFocus
                className={`w-12 h-12 border rounded-xl text-center text-xl text-[#2A4559] ${
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
