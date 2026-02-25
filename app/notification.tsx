import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { ArrowLeft, BellRing } from "lucide-react-native";

// 1. Define the Type
interface Notification {
  id: string;
  title: string;
  description: string;
  time: string;
  isUnread?: boolean;
}

// 2. Mock Data
const notifications: Notification[] = [
  {
    id: "1",
    title: "New Homework Submission",
    description: '3 students submitted homework for "Grade 10 – Mathematics"',
    time: "16 minutes ago",
    isUnread: true,
  },
  {
    id: "2",
    title: "Exam Submissions Received",
    description: "Answer sheets for the Midterm Exam are ready for review.",
    time: "16 minutes ago",
  },
  {
    id: "3",
    title: "Lesson Recording Uploaded",
    description: 'A new lesson recording has been added to "Algebra Basics".',
    time: "16 minutes ago",
  },
  {
    id: "4",
    title: "New Announcement Published",
    description:
      "Your announcement has been successfully shared with students.",
    time: "16 minutes ago",
  },
  {
    id: "5",
    title: "New Announcement Published",
    description:
      "Your announcement has been successfully shared with students.",
    time: "16 minutes ago",
  },
  {
    id: "6",
    title: "New Announcement Published",
    description:
      "Your announcement has been successfully shared with students.",
    time: "16 minutes ago",
  },
];

export default function NotificationScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View className="flex-row items-center px-6 py-4 justify-between">
        <TouchableOpacity
          onPress={() => router.back()}
          className="w-10 h-10 items-center justify-center -ml-2"
        >
          <ArrowLeft size={28} color="#1e293b" />
        </TouchableOpacity>

        <Text className="text-2xl font-bold text-slate-700">Notification</Text>

        <View className="w-10" />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        {notifications.map((item) => (
          <TouchableOpacity
            key={item.id}
            activeOpacity={0.7}
            className={`flex-row px-6 py-5 ${item.isUnread ? "bg-emerald-50/40" : "bg-transparent"}`}
          >
            {/* Icon Container */}
            <View className="mt-1">
              <View className="relative">
                <BellRing size={24} color="#334155" strokeWidth={2.5} />
                {/* Optional notification dot if needed */}
                <View className="absolute top-0 right-0 w-2 h-2 bg-slate-700 rounded-full border border-white" />
              </View>
            </View>

            {/* Text Content */}
            <View className="flex-1 ml-4">
              <Text className="text-lg font-bold text-slate-800 leading-tight">
                {item.title}
              </Text>
              <Text className="text-slate-500 text-sm mt-1 leading-5">
                {item.description}
              </Text>
              <Text className="text-emerald-600/70 font-medium text-xs mt-2">
                {item.time}
              </Text>
            </View>
          </TouchableOpacity>
        ))}

        <View className="h-10" />
      </ScrollView>
    </SafeAreaView>
  );
}
