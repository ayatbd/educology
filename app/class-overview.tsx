import React from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

// Mock Data
const stats = [
  {
    id: 1,
    label: "On Track",
    count: "24",
    color: "bg-green-500",
    bgColor: "bg-green-50",
    textColor: "text-green-800",
  },
  {
    id: 2,
    label: "Needs Attention",
    count: "09",
    color: "bg-yellow-400",
    bgColor: "bg-yellow-50",
    textColor: "text-yellow-800",
  },
  {
    id: 3,
    label: "Falling Behind",
    count: "07",
    color: "bg-orange-500",
    bgColor: "bg-orange-50",
    textColor: "text-orange-800",
  },
  {
    id: 4,
    label: "Critical Risk",
    count: "03",
    color: "bg-red-500",
    bgColor: "bg-red-50",
    textColor: "text-red-800",
  },
];

const students = [
  {
    id: 1,
    name: "Rakibul Hasan",
    phone: "+8801827347685",
    status: "Critical",
    statusColor: "text-red-500",
    dotColor: "bg-red-500",
  },
  {
    id: 2,
    name: "Rakibul Hasan",
    phone: "+8801827347685",
    status: "Attention",
    statusColor: "text-yellow-500",
    dotColor: "bg-yellow-500",
  },
  {
    id: 3,
    name: "Rakibul Hasan",
    phone: "+8801827347685",
    status: "Behind",
    statusColor: "text-orange-500",
    dotColor: "bg-orange-500",
  },
  {
    id: 4,
    name: "Rakibul Hasan",
    phone: "+8801827347685",
    status: "Attention",
    statusColor: "text-yellow-500",
    dotColor: "bg-yellow-500",
  },
  {
    id: 5,
    name: "Rakibul Hasan",
    phone: "+8801827347685",
    status: "Critical",
    statusColor: "text-red-500",
    dotColor: "bg-red-500",
  },
  {
    id: 6,
    name: "Rakibul Hasan",
    phone: "+8801827347685",
    status: "Attention",
    statusColor: "text-yellow-500",
    dotColor: "bg-yellow-500",
  },
];

export default function ClassOverview() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View className="flex-row items-center px-4 py-4 justify-between">
        <TouchableOpacity>
          <Ionicons name="arrow-back" size={28} color="#1e293b" />
        </TouchableOpacity>
        <Text className="text-2xl font-semibold text-slate-800">
          Class Overview
        </Text>
        <View className="w-8" /> {/* Spacer for centering */}
      </View>

      <ScrollView showsVerticalScrollIndicator={false} className="px-4">
        {/* Stats Grid */}
        <View className="flex-row flex-wrap justify-between mt-2">
          {stats.map((item) => (
            <View
              key={item.id}
              className={`w-[48%] p-4 mb-4 rounded-2xl border border-slate-100 ${item.bgColor} shadow-sm`}
            >
              <View className="flex-row justify-between items-start">
                <View className={`w-8 h-8 rounded-full ${item.color}`} />
                <Text className="text-4xl font-light text-slate-600">
                  {item.count}
                </Text>
              </View>
              <Text
                className={`text-right mt-2 text-lg font-medium text-slate-700`}
              >
                {item.label}
              </Text>
            </View>
          ))}
        </View>

        {/* Student List Header */}
        <View className="flex-row justify-between items-end mt-4 mb-2">
          <View>
            <Text className="text-xl font-bold text-slate-800">Student</Text>
          </View>
          <View className="flex-row items-center">
            <Text className="text-slate-600 font-semibold mr-4">
              38 Student
            </Text>
            <TouchableOpacity>
              <MaterialCommunityIcons
                name="filter-variant"
                size={28}
                color="black"
              />
            </TouchableOpacity>
          </View>
        </View>
        <View className="h-[1px] bg-slate-200 w-full mb-4" />

        {/* List of Students */}
        {students.map((student, index) => (
          <View
            key={index}
            className="flex-row items-center py-4 border-b border-slate-100"
          >
            {/* Profile Image */}
            <Image
              source={{
                uri: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
              }}
              className="w-12 h-12 rounded-full"
            />

            {/* Info */}
            <View className="flex-1 ml-3">
              <Text className="text-lg font-bold text-teal-700">
                {student.name}
              </Text>
              <Text className="text-xs text-slate-400">{student.phone}</Text>
            </View>

            {/* Status Indicator */}
            <View className="flex-row items-center mr-4">
              <View
                className={`w-3 h-3 rounded-full ${student.dotColor} mr-2`}
              />
              <Text className={`text-xs font-medium ${student.statusColor}`}>
                {student.status}
              </Text>
            </View>

            {/* Button */}
            <TouchableOpacity className="bg-slate-700 px-6 py-2 rounded-full">
              <Text className="text-white font-medium">View</Text>
            </TouchableOpacity>
          </View>
        ))}

        <View className="h-10" />
      </ScrollView>
    </SafeAreaView>
  );
}
