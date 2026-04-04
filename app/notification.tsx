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
import { useGetNotificationsQuery } from "../redux/api/notificationApi";

// 1. Define the Type
interface Notification {
  id: string;
  title: string;
  description: string;
  time: string;
  isUnread?: boolean;
}

export default function NotificationScreen() {
  const router = useRouter();

  const { data: notificationsData } = useGetNotificationsQuery(undefined);
  console.log(notificationsData);
  const notifications = notificationsData?.data?.notifications || [];
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

        <Text className="text-2xl font-bold text-slate-700">Notifications</Text>

        <View className="w-10" />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        {notifications?.map((item: Notification) => (
          <TouchableOpacity
            key={item.id}
            activeOpacity={0.7}
            className={`flex-row px-6 py-5 ${item.isUnread ? "bg-emerald-50/40" : "bg-transparent"}`}
          >
            {/* Icon Container */}
            <View className="mt-1">
              <View className="relative">
                <BellRing size={24} color="#334155" strokeWidth={2.5} />
                <View className="absolute top-0 right-0 w-2 h-2 bg-slate-700 rounded-full border border-white" />
              </View>
            </View>

            <View className="flex-1 ml-4">
              <Text className="text-lg font-bold text-slate-800 leading-tight">
                {item?.title}
              </Text>
              <Text className="text-slate-500 text-sm mt-1 leading-5">
                {item?.description}
              </Text>
              <Text className="text-emerald-600/70 font-medium text-xs mt-2">
                {item?.time}
              </Text>
            </View>
          </TouchableOpacity>
        ))}

        <View className="h-10" />
      </ScrollView>
    </SafeAreaView>
  );
}
