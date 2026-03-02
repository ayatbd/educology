import React from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { Student, StatusType } from "../components/types/allTypes";
import { router } from "expo-router";

const studentData: Student[] = Array(8)
  .fill({
    id: "1",
    name: "Rakibul Hasan",
    phone: "+8801827347685",
    status: "Critical",
    image: "https://i.pravatar.cc/150?u=2",
  })
  .map((s, i) => ({
    ...s,
    id: i.toString(),
    status: i === 1 ? "Attention" : i === 4 ? "On Track" : "Critical",
  }));

const StatusIndicator = ({ status }: { status: StatusType }) => {
  const colors = {
    "On Track": "bg-green-500",
    Attention: "bg-yellow-500",
    Behind: "bg-orange-500",
    Critical: "bg-red-600",
  };
  const textColors = {
    "On Track": "text-green-600",
    Attention: "text-yellow-600",
    Behind: "text-orange-600",
    Critical: "text-red-600",
  };
  return (
    <View className="flex-row items-center">
      <View className={`w-3 h-3 rounded-full ${colors[status]} mr-2`} />
      <Text className={`text-sm font-medium ${textColors[status]}`}>
        {status}
      </Text>
    </View>
  );
};

const SectionHeader = ({ title }: { title: string }) => (
  <View className="mt-6 border-b border-slate-300 pb-2 mx-4">
    <Text className="text-xl font-bold text-slate-800">{title}</Text>
  </View>
);

const UserRow = ({
  item,
  hideStatus = false,
}: {
  item: Student;
  hideStatus?: boolean;
}) => (
  <View className="flex-row items-center px-4 py-3 border-b border-slate-100">
    <Image source={{ uri: item.image }} className="w-12 h-12 rounded-full" />
    <View className="flex-1 ml-3">
      <Text className="text-lg font-bold text-teal-800/70">{item.name}</Text>
      <Text className="text-[10px] text-slate-400 font-bold">{item.phone}</Text>
    </View>
    {!hideStatus && <StatusIndicator status={item.status} />}
  </View>
);

export default function Participate() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="px-4 py-3 flex-row items-center justify-between">
        <TouchableOpacity activeOpacity={0.7} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={26} color="black" />
        </TouchableOpacity>
        <Text className="text-2xl font-bold text-slate-700">Participate</Text>
        <View className="w-6" />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Search Input */}
        <View className="px-4 mt-2">
          <View className="flex-row items-center bg-white border border-slate-200 h-14 rounded-full px-5 shadow-sm">
            <Ionicons name="search-outline" size={22} color="#94a3b8" />
            <TextInput
              placeholder="Search by name or phone no."
              className="flex-1 ml-3 text-base text-slate-600"
              placeholderTextColor="#cbd5e1"
            />
          </View>
        </View>

        <SectionHeader title="Teacher" />
        <UserRow item={studentData[0]} hideStatus />

        <SectionHeader title="Assistants" />
        <UserRow item={studentData[0]} hideStatus />

        <SectionHeader title="Student  (38 Student)" />
        {studentData.map((student) => (
          <UserRow key={student.id} item={student} />
        ))}

        <View className="h-10" />
      </ScrollView>
    </SafeAreaView>
  );
}
