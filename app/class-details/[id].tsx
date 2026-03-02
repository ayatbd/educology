import { useGetClassesQuery } from "@/redux/api/classApi";
import { useGetTasksQuery } from "@/redux/api/tasksApi";
import { useRouter } from "expo-router";
import {
  BookOpen,
  Calendar,
  CheckCircle2,
  ClipboardList,
  Clock,
  MessageSquare,
  Plus,
  Users,
} from "lucide-react-native";
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

type TabType = "classes" | "examination" | "homework";

type StateCardProps = {
  icon: React.ReactNode;
  value: string;
  label: string;
  subIcon?: React.ReactNode;
};

type LectureCardTypes = {
  title: string;
  date: string;
  instructorImg: string;
  instructor: string;
  postedDate: string;
  comments: string;
};

export default function ClassDetailsScreen() {
  const router = useRouter();
  const { data: classes, isLoading } = useGetClassesQuery(undefined);
  const lectures = classes?.data || [];
  const { data: tasksData, isLoading: isLoadingHomework } =
    useGetTasksQuery(undefined);
  const tasks = tasksData?.data?.result || [];
  const homeworks = tasks.filter(
    (task: any) => task.type?.toLowerCase() === "homework",
  );
  const exam = tasks.filter((task: any) => task.type?.toLowerCase() === "exam");
  console.log(exam);

  const [activeTab, setActiveTab] = useState<TabType>("classes");

  if (isLoading) return <Text>Loading...</Text>;
  if (isLoadingHomework) return <Text>Loading...</Text>;
  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="white" />

      <View className="items-center py-4">
        <Text className="text-slate-500 text-xl font-bold">Class Details</Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
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

        <View className="px-5 mt-6">
          <TouchableOpacity className="bg-[#CCA35E] rounded-full py-3 items-center">
            <Text className="text-white font-semibold text-base">
              Generate Report
            </Text>
          </TouchableOpacity>
        </View>

        <View className="px-5 mt-6 flex-row gap-4">
          <TouchableOpacity
            onPress={() => router.push("/class-overview")}
            className="flex-1 flex-row items-center justify-center py-3 rounded-full border border-slate-300"
          >
            <Calendar color="#333" size={18} className="mr-2" />
            <Text className="text-slate-800 font-medium">Class Overview</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.push("/participants")}
            className="flex-1 flex-row items-center justify-center py-3 rounded-full border border-slate-300"
          >
            <Users color="#333" size={18} className="mr-2" />
            <Text className="text-slate-800 font-medium">Participants</Text>
          </TouchableOpacity>
        </View>

        <View className="px-5 mt-6 border-b border-gray-100 flex-row">
          {(["classes", "examination", "homework"] as TabType[]).map((tab) => (
            <TouchableOpacity
              key={tab}
              onPress={() => setActiveTab(tab)}
              className={`mr-6 pb-3 ${activeTab === tab ? "border-b-2 border-[#5B9BD5]" : ""}`}
            >
              <Text
                className={`font-semibold text-base capitalize ${
                  activeTab === tab ? "text-[#5B9BD5]" : "text-gray-400"
                }`}
              >
                {tab === "examination" ? "Examination" : tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {activeTab === "classes" && (
          <View>
            <View className="px-5 mt-6">
              <TouchableOpacity
                onPress={() => router.push("/add-class")}
                className="bg-[#CCA35E] rounded-full py-3 flex-row items-center justify-center gap-2"
              >
                <Plus color="white" size={24} />
                <Text className="text-white font-semibold text-lg">
                  Add Class
                </Text>
              </TouchableOpacity>
            </View>

            <View className="px-5 mt-6 gap-4">
              {lectures?.map((lecture: LectureCardTypes, index: number) => (
                <LectureCard key={index} data={lecture} />
              ))}
            </View>
          </View>
        )}
        {activeTab === "homework" && (
          <View>
            <View className="px-5 mt-6">
              <TouchableOpacity
                onPress={() => router.push("/add-homework")}
                className="bg-[#CCA35E] rounded-full py-3 flex-row items-center justify-center gap-2"
              >
                <Plus color="white" size={24} />
                <Text className="text-white font-semibold text-lg">
                  Add Homework*
                </Text>
              </TouchableOpacity>
            </View>

            <View className="px-5 mt-6 gap-4">
              {homeworks?.map((homework: any, index: number) => (
                <LectureCard key={index} data={homework} />
              ))}
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const StatCard = ({ icon, value, label, subIcon }: StateCardProps) => (
  <View className="bg-[#F2FFF9] w-[48%] rounded-xl p-4 h-28 justify-between relative">
    <View className="flex-row justify-between items-start">
      <View className="bg-white p-2 rounded-lg shadow-sm">{icon}</View>
      <Text className="text-[#A68656] text-3xl font-serif">{value}</Text>
    </View>
    <View className="flex-row items-end justify-end">
      {subIcon}
      <Text className="text-gray-600 text-[10px] font-medium text-right mt-1 w-full leading-3">
        {label}
      </Text>
    </View>
  </View>
);

const LectureCard = ({ data }: { data: LectureCardTypes }) => (
  <View className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm">
    <Text className="text-lg font-bold text-[#34465B]">{data.title}</Text>
    <Text className="text-gray-400 text-xs mt-1">
      Live Class starting Time : {data.date}
    </Text>

    <View className="flex-row items-center mt-3 border-b border-gray-100 pb-3">
      <Image
        source={{ uri: data.instructorImg }}
        className="w-8 h-8 rounded-full bg-gray-200"
      />
      <View className="ml-2">
        <Text className="text-[#4F7da4] text-sm font-semibold">
          {data.instructor}
        </Text>
        <Text className="text-gray-400 text-[10px]">{data.postedDate}</Text>
      </View>
    </View>

    <View className="mt-2 flex-row items-center">
      <MessageSquare size={14} color="#94a3b8" />
      <Text className="text-gray-400 text-xs ml-1">
        {data.comments} Comments
      </Text>
    </View>
  </View>
);

// const lectures = [
//   {
//     title: "Lecture-1 (Algebra Part-1)",
//     date: "29 Jan, 2026 | 10:00 AM",
//     instructor: "Rakibul Hasan",
//     instructorImg: "https://i.pravatar.cc/150?u=1",
//     postedDate: "19 Nov, 2026 | 12:00PM",
//     comments: "02",
//   },
//   {
//     title: "Lecture-2 (Algebra Part-2)",
//     date: "02 Feb, 2026 | 10:00 AM",
//     instructor: "Rakibul Hasan",
//     instructorImg: "https://i.pravatar.cc/150?u=1",
//     postedDate: "19 Nov, 2026 | 12:00PM",
//     comments: "05",
//   },
// ];
