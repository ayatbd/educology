import { logout } from "@/redux/features/auth/authSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { LogOut } from "lucide-react-native";
import React, { useState } from "react";
import {
  Image,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";

// Mock Data
const ROLES = [
  {
    id: "student",
    title: "I'm a Student",
    subtitle: "Sign in / Sign up as a Student",
    image:
      "https://img.freepik.com/free-vector/student-with-laptop-studying_23-2148509899.jpg?w=150",
  },
  {
    id: "parent",
    title: "I'm a Parent",
    subtitle: "Sign in / Sign up as a Parent",
    image:
      "https://img.freepik.com/free-vector/family-couple-with-kids_23-2148529524.jpg?w=150",
  },
  {
    id: "teacher",
    title: "I'm a Teacher",
    subtitle: "Sign in / Sign up as a Teacher",
    image:
      "https://img.freepik.com/free-vector/teacher-standing-near-blackboard_23-2148040407.jpg?w=150",
  },
  {
    id: "assistant",
    title: "I'm an Assistant",
    subtitle: "Sign in / Sign up as an Assistant",
    image:
      "https://img.freepik.com/free-vector/business-woman-working-laptop_23-2148512143.jpg?w=150",
  },
];

export default function Index() {
  const router = useRouter(); // 2. Initialize the router
  const [selectedRole, setSelectedRole] = useState("teacher");
  const dispatch = useDispatch();

  // 3. Handle Navigation on Next Press
  const handleNext = () => {
    // You can pass the role as a parameter if needed
    router.push({
      pathname: "/register",
      params: { role: selectedRole },
    });
  };

  // const handleLogout = async () => {
  //   Alert.alert("Log Out", "Are you sure you want to log out?", [
  //     { text: "Cancel", style: "cancel" },
  //     {
  //       text: "Log Out",
  //       style: "destructive",
  //       onPress: async () => {
  //         try {
  //           await AsyncStorage.removeItem("userToken");
  //           // await messaging().deleteToken();
  //           dispatch(logout());
  //           router.replace("/login");
  //         } catch (error) {
  //           console.error("Logout failed", error);
  //         }
  //       },
  //     },
  //   ]);
  // };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" />

      {/* <TouchableOpacity
        onPress={handleLogout}
        className="flex-row items-center justify-center w-48 mt-14 bg-red-50 p-4 rounded-2xl border border-red-100"
      >
        <LogOut size={20} color="#EF4444" style={{ marginRight: 10 }} />
        <Text className="text-red-500 font-bold text-lg">Log Out</Text>
      </TouchableOpacity> */}

      <ScrollView
        className="flex-1 px-6"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        {/* --- Logo Section --- */}
        <View className="items-center mb-8">
          <Image
            source={require("../assets/images/home/logo.png")}
            className="w-[226px] h-48"
            resizeMode="contain" // Added resizeMode for better logo fit
          />
        </View>

        {/* --- Header Text --- */}
        <View className="items-center mb-8">
          <View className="flex-row flex-wrap justify-center">
            <Text className="text-2xl font-bold text-[#569C7D]">
              Welcome to{" "}
            </Text>
            <Text className="text-2xl font-bold text-[#2A4559]">educology</Text>
          </View>
          <Text className="text-gray-500 text-center mt-3 leading-6 px-2">
            Manage your classes, lessons, and progress—all in one smart learning
            app.
          </Text>
        </View>

        {/* --- Section Title --- */}
        <Text className="text-xl font-bold text-[#6B9E86] text-center mb-6">
          Select your role to continue
        </Text>

        {/* --- Cards List --- */}
        <View className="space-y-4">
          {ROLES.map((role) => {
            const isSelected = selectedRole === role.id;

            return (
              // 4. REMOVED <Link> wrapper here. Just use TouchableOpacity.
              <TouchableOpacity
                key={role.id}
                onPress={() => setSelectedRole(role.id)}
                activeOpacity={0.8}
                className={`flex-row items-center p-3 rounded-2xl border-2 overflow-hidden ${
                  isSelected
                    ? "bg-[#F0F9F6] border-[#7CBFA5]"
                    : "bg-gray-50 border-transparent"
                }`}
              >
                {/* Role Image */}
                <View className="w-16 h-16 rounded-xl overflow-hidden mr-4 bg-gray-200">
                  <Image
                    source={{ uri: role.image }}
                    className="w-full h-full"
                    resizeMode="cover"
                  />
                </View>

                {/* Text Content */}
                <View className="flex-1">
                  <Text
                    className={`text-lg font-bold mb-1 ${
                      isSelected ? "text-[#4A8B71]" : "text-[#569C7D]"
                    }`}
                  >
                    {role.title}
                  </Text>
                  <Text className="text-gray-500 text-xs">{role.subtitle}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* --- Next Button --- */}
        <TouchableOpacity
          onPress={handleNext} // 5. Added navigation handler here
          className="mt-10 bg-[#C59D5F] py-4 rounded-3xl items-center shadow-lg shadow-orange-100"
          activeOpacity={0.9}
        >
          <Text className="text-white text-xl font-bold">Next</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity
          onPress={() => router.push("/main")} // 5. Added navigation handler here
          className="mt-10 bg-[#C59D5F] py-4 rounded-3xl items-center shadow-lg shadow-orange-100"
          activeOpacity={0.9}
        >
          <Text className="text-white text-xl font-bold">Go to Homepage</Text>
        </TouchableOpacity> */}
      </ScrollView>
    </SafeAreaView>
  );
}
