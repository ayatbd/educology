import { useRouter } from "expo-router"; // If using Expo Router, otherwise remove
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
} from "react-native";

export default function VerifyEmailScreen() {
  const router = useRouter(); // Remove if not using Expo Router

  // State for OTP (Array of 5 empty strings)
  const [otp, setOtp] = useState(["", "", "", "", ""]);

  // State for Timer (starts at 30 seconds for demo)
  const [timer, setTimer] = useState(30);

  // Refs to manage input focus
  const inputRefs = useRef<(TextInput | null)[]>([]);

  // Timer Logic
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Handle Input Change
  const handleOtpChange = (text: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    // Auto-focus next input if text is entered
    if (text.length === 1 && index < 4) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Handle Backspace
  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === "Backspace") {
      // If current box is empty and not the first box, move back
      if (otp[index] === "" && index > 0) {
        inputRefs.current[index - 1]?.focus();
        // Optional: Clear previous box as well
        const newOtp = [...otp];
        newOtp[index - 1] = "";
        setOtp(newOtp);
      }
    }
  };

  // Format Timer (mm:ss)
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins < 10 ? "0" : ""}${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const handleResend = () => {
    if (timer === 0) {
      setTimer(30); // Reset timer
      console.log("Resending code...");
    }
  };

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
            paddingBottom: 20,
          }}
          className="px-6 mt-10"
          keyboardShouldPersistTaps="handled"
        >
          {/* --- Title Section --- */}
          <View className="items-center mb-10">
            <View className="flex-row">
              <Text className="text-3xl font-bold text-[#569C7D] mr-2">
                Verify your
              </Text>
              <Text className="text-3xl font-bold text-[#2A4559]">email</Text>
            </View>
            <Text className="text-gray-500 text-center mt-4 text-base leading-6 px-4">
              We’ve sent an mail with an activation code to your Email
            </Text>
          </View>

          {/* --- OTP Inputs --- */}
          <View className="flex-row justify-between mb-4 px-2">
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                value={digit}
                onChangeText={(text) => handleOtpChange(text, index)}
                onKeyPress={(e) => handleKeyPress(e, index)}
                keyboardType="number-pad"
                maxLength={1}
                // Styling: changes border color when focused or filled
                className={`w-14 h-14 border rounded-2xl text-center text-2xl text-[#2A4559] ${
                  digit
                    ? "border-[#569C7D] bg-[#F0F9F6]" // Filled State
                    : "border-gray-300 bg-white" // Empty State
                }`}
              />
            ))}
          </View>

          {/* --- Timer --- */}
          <View className="items-center mb-10">
            <Text className="text-[#2A4559] font-medium text-lg">
              {formatTime(timer)}
            </Text>
          </View>

          {/* --- Resend Section --- */}
          <View className="flex-row justify-between items-center mb-8 px-1">
            <Text className="text-gray-500 text-base">
              Didn’t get the code?
            </Text>
            <TouchableOpacity onPress={handleResend} disabled={timer > 0}>
              <Text
                className={`font-bold text-base ${
                  timer > 0 ? "text-gray-300" : "text-[#3B75A2]"
                }`}
              >
                Resend
              </Text>
            </TouchableOpacity>
          </View>

          {/* --- Confirm Button --- */}
          <TouchableOpacity
            className="w-full bg-[#C59D5F] rounded-full h-14 items-center justify-center shadow-lg shadow-orange-900/20 mb-8"
            activeOpacity={0.8}
            onPress={() => (router.push("/reset-password"), console.log(otp))}
          >
            <Text className="text-white text-xl font-bold">Confirm Code</Text>
          </TouchableOpacity>

          {/* --- Footer Note --- */}
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
