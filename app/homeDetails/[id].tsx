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
import {
  Calendar,
  Users,
  CheckCircle2,
  BookOpen,
  ClipboardList,
  Clock,
  Plus,
  MessageSquare,
} from "lucide-react-native";

type StateCardProps = {
  icon: React.ReactNode;
  value: string;
  label: string;
  subIcon?: React.ReactNode;
};

type LectureCardTypes = {
  title: string;
  date: string;
  time: string;
  instructorImg: string;
  instructor: string;
  postedDate: string;
  comments: string;
};

export default function ClassDetailsScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="light-content" backgroundColor="black" />

      {/* Top Header Title */}
      <View className="items-center py-4">
        <Text className="text-slate-500 text-xl font-bold">Class Details</Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        {/* Course Info Header */}
        <View className="px-5 mb-4">
          <View className="flex-row justify-between items-start">
            <View>
              <Text className="text-[#5B9BD5] text-lg font-bold">
                Grade 10 – Mathematics
              </Text>
              <Text className="text-gray-400 text-sm mt-1">Mathematics</Text>
              <Text className="text-gray-500 text-xs mt-1">
                Total Enrolled Student : 12
              </Text>
            </View>
            <View className="bg-cyan-100 px-4 py-1 rounded-full">
              <Text className="text-cyan-700 text-xs font-bold">Active</Text>
            </View>
          </View>
        </View>

        {/* Stats Grid */}
        <View className="px-5 flex-row flex-wrap justify-between gap-y-4">
          <StatCard
            icon={<Calendar color="#4CAF50" size={28} />}
            value="90%"
            label="Attendance"
            subIcon={
              <CheckCircle2
                size={16}
                color="#4CAF50"
                className="absolute bottom-0 right-0"
              />
            }
          />
          <StatCard
            icon={<BookOpen color="#FF9800" size={28} />}
            value="90%"
            label="HomeWork Submitted"
          />
          <StatCard
            icon={<ClipboardList color="#ECD06F" size={28} />}
            value="71%"
            label="Avg. Grade"
          />
          <StatCard
            icon={<Clock color="#3B82F6" size={28} />}
            value="12%"
            label="Overdue Tasks"
          />
        </View>

        {/* Generate Report Button */}
        <View className="px-5 mt-6">
          <TouchableOpacity className="bg-[#CCA35E] rounded-full py-3 items-center">
            <Text className="text-white font-semibold text-base">
              Generate Report
            </Text>
          </TouchableOpacity>
        </View>

        {/* Toggle Tabs (Overview / Participants) */}
        <View className="px-5 mt-6 flex-row gap-4">
          <TouchableOpacity className="flex-1 bg-[#34465B] flex-row items-center justify-center py-3 rounded-full border border-slate-600">
            <Calendar color="white" size={18} className="mr-2" />
            <Text className="text-white font-medium">Class Overview</Text>
          </TouchableOpacity>

          <TouchableOpacity className="flex-1 bg-white flex-row items-center justify-center py-3 rounded-full">
            <Users color="#333" size={18} className="mr-2" />
            <Text className="text-slate-800 font-medium">Participants</Text>
          </TouchableOpacity>
        </View>

        {/* Sub Navigation (Classes / Exam / Announcement) */}
        <View className="px-5 mt-6 border-b border-gray-800 flex-row">
          <View className="mr-6 border-b-2 border-[#5B9BD5] pb-3">
            <Text className="text-[#5B9BD5] font-semibold text-base">
              Classes
            </Text>
          </View>
          <View className="mr-6 pb-3">
            <Text className="text-gray-500 font-semibold text-base">
              Examination
            </Text>
          </View>
          <View className="pb-3">
            <Text className="text-gray-500 font-semibold text-base">
              Announcement
            </Text>
          </View>
        </View>

        {/* Add Class Button */}
        <View className="px-5 mt-6">
          <TouchableOpacity className="bg-[#CCA35E] rounded-full py-3 flex-row items-center justify-center gap-2">
            <Plus color="white" size={24} />
            <Text className="text-white font-semibold text-lg">Add Class</Text>
          </TouchableOpacity>
        </View>

        {/* Class List */}
        <View className="px-5 mt-6 gap-4">
          {lectures.map((lecture, index) => (
            <LectureCard key={index} data={lecture} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// --- Reusable Components ---

const StatCard = ({ icon, value, label, subIcon }: StateCardProps) => (
  <View className="bg-[#F2FFF9] w-[48%] rounded-xl p-4 h-28 justify-between relative">
    <View className="flex-row justify-between items-start">
      <View className="bg-gray-100 p-2 rounded-lg">{icon}</View>
      <Text className="text-[#A68656] text-3xl font-serif">{value}</Text>
    </View>
    <View className="flex-row items-end justify-end">
      {subIcon}
      <Text className="text-gray-600 text-xs font-medium text-right mt-1 w-full">
        {label}
      </Text>
    </View>
  </View>
);

const LectureCard = ({ data }: { data: LectureCardTypes }) => (
  <View className="bg-[#FDFDFD] rounded-xl p-4">
    <Text className="text-lg font-bold text-[#34465B]">{data.title}</Text>
    <Text className="text-gray-500 text-xs mt-1">
      Live Class starting Time : {data.date}
    </Text>

    <View className="flex-row items-center mt-3 border-b border-gray-200 pb-3">
      <Image
        source={{ uri: data.instructorImg }}
        className="w-8 h-8 rounded-full"
      />
      <View className="ml-2">
        <Text className="text-[#4F7da4] text-sm font-semibold">
          {data.instructor}
        </Text>
        <Text className="text-gray-400 text-[10px]">{data.postedDate}</Text>
      </View>
    </View>

    <View className="mt-2 flex-row items-center">
      <MessageSquare size={14} color="#666" />
      <Text className="text-gray-500 text-xs ml-1">{data.comments}</Text>
    </View>
  </View>
);

// --- Mock Data ---

const lectures = [
  {
    title: "Lecture-1 (Algebra Part-1)",
    date: "29 Jan, 2026 | 10:00 AM",
    instructor: "Rakibul Hasan",
    instructorImg:
      "https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg",
    postedDate: "19 Nov,2026 | 12:00PM",
    comments: "02",
  },
  {
    title: "Lecture-2 (Algebra Part-2)",
    date: "02 Feb, 2026 | 10:00 AM",
    instructor: "Rakibul Hasan",
    instructorImg:
      "https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg",
    postedDate: "19 Nov,2026 | 12:00PM",
    comments: "05",
  },
];
