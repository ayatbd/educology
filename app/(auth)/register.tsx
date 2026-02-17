import { useRegisterMutation } from "@/redux/api/authApi";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import { Check, Eye, EyeOff, FileInput, Upload } from "lucide-react-native";
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

export default function SignUpScreen() {
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const [image, setImage] = useState<ImagePicker.ImagePickerAsset | null>(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
  });

  const [registerUser, { isLoading }] = useRegisterMutation();

  const handleInputChange = (
    key: "firstName" | "lastName" | "email" | "phone" | "password",
    value: string,
  ) => {
    setFormData({ ...formData, [key]: value });
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });

    if (!result.canceled) {
      setImage(result.assets[0]);
    }
  };

  const handleRegister = async () => {
    if (!isChecked) {
      Alert.alert("Error", "Please agree to the Terms of Use.");
      return;
    }

    if (!formData.email || !formData.password || !formData.firstName) {
      Alert.alert("Error", "Please fill in all required fields.");
      return;
    }

    const submitData = new FormData();

    const fcmToken = "dummy_fcm_token";
    const role = "student";

    const dataBody = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      password: formData.password,
      fcmToken,
      role,
    };

    submitData.append("data", JSON.stringify(dataBody));

    if (image) {
      const uriParts = image.uri.split(".");
      const fileType = uriParts[uriParts.length - 1];

      submitData.append("image", {
        uri:
          Platform.OS === "ios" ? image.uri.replace("file://", "") : image.uri,
        name: `photo.${fileType}`,
        type: `image/${fileType}`,
      });
    }

    try {
      const response = await registerUser(submitData).unwrap();
      Alert.alert("Success", "Account created successfully!");
      router.push("/verify-email");
    } catch (error) {
      const errorMessage =
        (error &&
          typeof error === "object" &&
          "data" in error &&
          (error as any).data?.message) ||
        "Registration failed";
      Alert.alert("Error", errorMessage);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <StatusBar barStyle="light-content" />

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
          className="px-6"
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View className="w-full">
            <View className="items-center mb-8">
              <View className="flex-row">
                <Text className="text-3xl font-bold text-[#569C7D] mr-2">
                  Create An
                </Text>
                <Text className="text-3xl font-bold text-[#3B75A2]">
                  Account
                </Text>
              </View>
              <Text className="text-gray-500 mt-2 text-base">
                Fill in your information.
              </Text>
            </View>

            <View className="gap-5">
              <View>
                <Text className="text-gray-500 mb-2 ml-1">Upload Image</Text>
                <TouchableOpacity
                  onPress={pickImage}
                  className="bg-white rounded-2xl h-14 px-4 flex-row items-center justify-between overflow-hidden"
                >
                  {image ? (
                    <View className="flex-row items-center">
                      <Image
                        source={{ uri: image.uri }}
                        className="w-10 h-10 rounded-full mr-3"
                      />
                      <Text
                        className="text-black text-base max-w-[200px]"
                        numberOfLines={1}
                      >
                        Image Selected
                      </Text>
                    </View>
                  ) : (
                    <View className="flex-row items-center">
                      <FileInput size={20} color="#9CA3AF" />
                      <Text className="text-[#9CA3AF] ml-3 text-base">
                        Select Profile Photo
                      </Text>
                    </View>
                  )}
                  <Upload size={20} color="#3B75A2" />
                </TouchableOpacity>
              </View>

              <View>
                <Text className="text-gray-500 mb-2 ml-1">First Name</Text>
                <TextInput
                  value={formData.firstName}
                  onChangeText={(text) => handleInputChange("firstName", text)}
                  placeholder="Enter your first name"
                  placeholderTextColor="#9CA3AF"
                  className="bg-white rounded-2xl h-14 px-4 text-black text-base"
                />
              </View>

              <View>
                <Text className="text-gray-500 mb-2 ml-1">Last Name</Text>
                <TextInput
                  value={formData.lastName}
                  onChangeText={(text) => handleInputChange("lastName", text)}
                  placeholder="Enter your last name"
                  placeholderTextColor="#9CA3AF"
                  className="bg-white rounded-2xl h-14 px-4 text-black text-base"
                />
              </View>

              <View>
                <Text className="text-gray-500 mb-2 ml-1">Email</Text>
                <TextInput
                  value={formData.email}
                  onChangeText={(text) => handleInputChange("email", text)}
                  placeholder="Enter your email"
                  placeholderTextColor="#9CA3AF"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  className="bg-white rounded-2xl h-14 px-4 text-black text-base"
                />
              </View>

              <View>
                <Text className="text-gray-500 mb-2 ml-1">Phone</Text>
                <TextInput
                  value={formData.phone}
                  onChangeText={(text) => handleInputChange("phone", text)}
                  placeholder="Enter your phone number"
                  placeholderTextColor="#9CA3AF"
                  keyboardType="phone-pad"
                  className="bg-white rounded-2xl h-14 px-4 text-black text-base"
                />
              </View>

              <View>
                <Text className="text-gray-500 mb-2 ml-1">Password</Text>
                <View className="flex-row items-center bg-white rounded-2xl h-14 px-4">
                  <TextInput
                    value={formData.password}
                    onChangeText={(text) => handleInputChange("password", text)}
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

              <View className="flex-row items-center mt-2">
                <TouchableOpacity
                  onPress={() => setIsChecked(!isChecked)}
                  className={`w-6 h-6 rounded bg-[#2A4559] items-center justify-center mr-3 ${
                    isChecked ? "bg-[#3B75A2]" : "bg-[#2A4559]"
                  }`}
                >
                  {isChecked && (
                    <Check size={16} color="white" strokeWidth={3} />
                  )}
                </TouchableOpacity>
                <Text className="text-gray-500 flex-1 flex-wrap">
                  I agree with this{" "}
                  <Text className="text-[#3B75A2]">Terms of Use</Text> and{" "}
                  <Text className="text-[#3B75A2]">Privacy Policy</Text>.
                </Text>
              </View>

              <TouchableOpacity
                onPress={handleRegister}
                disabled={isLoading}
                className={`w-full rounded-full h-14 items-center justify-center mt-4 shadow-lg shadow-orange-900/20 ${isLoading ? "bg-[#C59D5F]/70" : "bg-[#C59D5F]"}`}
                activeOpacity={0.8}
              >
                <Text className="text-white text-xl font-bold">
                  {isLoading ? "Signing Up..." : "Sign Up"}
                </Text>
              </TouchableOpacity>

              <View className="flex-row justify-center mt-6">
                <Text className="text-gray-500 text-base">
                  Already have an account?{" "}
                </Text>
                <TouchableOpacity onPress={() => router.push("/login")}>
                  <Text className="text-[#3B75A2] font-bold text-base">
                    Sign In
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
