import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { Bell } from "lucide-react-native";
import React from "react";
import {
  Image,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type CourseCardDetails = {
  id: number;
  title: string;
  subject: string;
  students: number;
  image: string;
};

const MainScreen = () => {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="white" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
        className="px-6"
      >
        {/* Header Section */}
        <View className="flex-row justify-between items-center px-5 py-4">
          <View className="flex-row items-center gap-3">
            <Image
              source={{
                uri: "https://img.freepik.com/free-photo/portrait-young-business-man-holding-clipboard_23-2149213426.jpg",
              }}
              className="w-12 h-12 rounded-full border border-gray-200"
            />
            <View>
              <Text className="text-gray-500 text-xs font-medium">
                Welcome Back!
              </Text>
              <Text className="text-slate-800 text-lg font-bold">
                Falcon Thought
              </Text>
            </View>
          </View>

          <TouchableOpacity className="relative p-2 bg-gray-50 rounded-full">
            <Bell size={24} color="#334155" />
            <View className="absolute top-2 right-2.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white" />
          </TouchableOpacity>
        </View>

        {/* Hero Banner */}
        <LinearGradient
          colors={["#64937D", "#33526A"]}
          style={{ padding: 15, borderRadius: 10 }}
        >
          <View className="mt-2 rounded-2xl px-4 flex-row items-center overflow-hidden">
            <View className="flex-1 z-10 pr-2">
              <Text className="text-white text-xl font-bold mb-2">
                Welcome to Educology
              </Text>
              <Text className="text-gray-200 text-xs leading-5">
                Your teaching space is ready. Manage your classes, lessons, and
                student progress from one place.
              </Text>
            </View>
            {/* 3D Character Placeholder */}
            <Image
              source={require("../assets/images/home/welcome_image.png")}
              className="w-32 h-32"
              resizeMode="contain"
            />
          </View>
        </LinearGradient>

        {/* Stats Section */}
        <View className="flex-row mt-6 gap-4">
          <View className="flex-1 bg-gray-100 rounded-xl py-6 px-4 items-center justify-center border border-gray-200">
            <Text className="text-[#a68656] text-4xl font-bold">12</Text>
            <Text className="text-gray-600 text-sm font-medium mt-1">
              Total Courses
            </Text>
          </View>

          <View className="flex-1 bg-gray-100 rounded-xl py-6 px-4 items-center justify-center border border-gray-200">
            <Text className="text-[#a68656] text-4xl font-bold">360</Text>
            <Text className="text-gray-600 text-sm font-medium mt-1">
              Total Students
            </Text>
          </View>
        </View>

        {/* Course List Header */}
        <View className="mt-6 mb-6">
          <Text className="text-slate-800 text-lg font-bold">
            My Assign Courses
          </Text>
        </View>

        {/* Course List Items */}
        <View className="gap-4">
          {coursesData.map((course, index) => (
            <CourseCard key={index} data={course} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// Reusable Course Card Component
const CourseCard = ({ data }: { data: CourseCardDetails }) => {
  const handlePress = () => {
    router.push({
      pathname: "/class-details/[id]",
      params: { id: data.id },
    });
  };
  return (
    <TouchableOpacity onPress={handlePress} activeOpacity={0.8}>
      <View className="bg-white rounded-2xl p-1.5 flex-row shadow-sm border border-gray-100">
        <Image
          source={{ uri: data.image }}
          className="w-24 h-24 rounded-xl bg-gray-200"
          resizeMode="cover"
        />

        <View className="ml-3 flex-1 justify-between">
          <View>
            <Text
              className="text-slate-800 font-bold text-sm"
              numberOfLines={1}
            >
              {data.title}
            </Text>
            <Text className="text-gray-500 text-xs mt-1">{data.subject}</Text>
          </View>

          <View className="flex-row items-center mt-2">
            <View className="bg-cyan-50 px-3 py-1 rounded-full">
              <Text className="text-cyan-600 text-[10px] font-bold">
                Active
              </Text>
            </View>
          </View>

          <Text className="text-gray-400 text-[10px] mt-2">
            Total Enrolled Student : {data.students}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

// Dummy Data
const coursesData = [
  {
    id: 1,
    title: "Grade 10 – Mathematics",
    subject: "Mathematics",
    students: 12,
    image:
      "https://img.freepik.com/free-photo/kids-learning-school_23-2148858206.jpg",
  },
  {
    id: 2,
    title: "Grade 10 – Mathematics",
    subject: "Mathematics",
    students: 12,
    image:
      "https://img.freepik.com/free-vector/math-background-with-realistic-elements_1361-1279.jpg",
  },
  {
    id: 3,
    title: "Grade 10 – Mathematics",
    subject: "Mathematics",
    students: 12,
    image:
      "https://img.freepik.com/free-photo/calculator-with-finance-concept-table_23-2149126209.jpg",
  },
  {
    id: 4,
    title: "Grade 10 – Mathematics",
    subject: "Mathematics",
    students: 12,
    image:
      "https://img.freepik.com/free-vector/mathematics-concept-illustration_114360-3972.jpg",
  },
];

export default MainScreen;
