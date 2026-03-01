import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router"; // To get course ID from URL
import {
  Calendar,
  Clock,
  ChevronDown,
  AlignCenter,
  AlignLeft,
  AlignRight,
  List,
  ListOrdered,
  Type,
  Highlighter,
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Paperclip,
  UploadCloud,
} from "lucide-react-native";

import { useAddClassMutation } from "@/redux/api/classApi";

const AddClassScreen = () => {
  const router = useRouter();
  // Usually, you pass the course ID as a parameter to this screen
  const { id: courseId } = useLocalSearchParams<{ id: string }>();

  // 1. Setup State for all fields
  const [title, setTitle] = useState("");
  const [date, setDate] = useState(""); // Format: YYYY-MM-DD
  const [time, setTime] = useState(""); // Format: 10:00 AM
  const [details, setDetails] = useState("");
  const [link, setLink] = useState("");

  const [addClass, { isLoading }] = useAddClassMutation();

  // 2. Handle Submit Logic
  const handleUpload = async () => {
    if (!title || !date || !time || !details || !link) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    const payload = {
      course: courseId || "69918b0e5c764119a79a4191", // Fallback to your provided ID
      title,
      date,
      time,
      details,
      link,
    };

    try {
      await addClass(payload).unwrap();
      Alert.alert("Success", "Class added successfully!", [
        { text: "OK", onPress: () => router.back() },
      ]);
    } catch (error: any) {
      const msg = error?.data?.message || "Failed to add class.";
      Alert.alert("Error", msg);
    }
  };

  const Label = ({ children }: { children: string }) => (
    <Text className="text-zinc-500 text-lg mb-2 mt-4 ml-1 font-medium">
      {children}
    </Text>
  );

  const ToolBtn = ({
    children,
    borderRight = true,
  }: {
    children: React.ReactNode;
    borderRight?: boolean;
  }) => (
    <TouchableOpacity
      className={`flex-1 items-center justify-center py-2 ${borderRight ? "border-r border-zinc-200" : ""}`}
    >
      {children}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <StatusBar barStyle="dark-content" />

      <View className="py-4 items-center">
        <Text className="text-2xl font-bold text-[#3B75A2]">Add Class</Text>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView
          contentContainerStyle={{ paddingBottom: 120 }}
          className="px-4"
          showsVerticalScrollIndicator={false}
        >
          <Label>Title</Label>
          <TextInput
            placeholder="Enter Class Name"
            placeholderTextColor="#9ca3af"
            className="bg-white rounded-2xl h-14 px-4 text-black text-lg"
            value={title}
            onChangeText={setTitle}
          />

          <Label>Expected Live Class starting Date & Time</Label>
          <View className="flex-row gap-3">
            <View className="flex-1 flex-row items-center bg-white rounded-2xl h-14 px-4 justify-between">
              <TextInput
                placeholder="YYYY-MM-DD"
                placeholderTextColor="#9ca3af"
                className="flex-1 text-black text-lg"
                value={date}
                onChangeText={setDate}
              />
              <Calendar size={20} color="#333" />
            </View>
            <View className="flex-1 flex-row items-center bg-white rounded-2xl h-14 px-4 justify-between">
              <TextInput
                placeholder="HH:MM AM"
                placeholderTextColor="#9ca3af"
                className="flex-1 text-black text-lg"
                value={time}
                onChangeText={setTime}
              />
              <Clock size={20} color="#333" />
            </View>
          </View>

          <Label>Add Class Details</Label>
          <View className="bg-white rounded-2xl overflow-hidden min-h-[250px]">
            <View className="flex-row border-b border-zinc-200">
              <TouchableOpacity className="flex-[1.5] flex-row items-center justify-between px-3 py-3 border-r border-zinc-200">
                <Text className="text-[#3B75A2] font-bold text-lg">
                  Paragraph
                </Text>
                <ChevronDown size={20} color="#3B75A2" />
              </TouchableOpacity>
              <ToolBtn>
                <AlignLeft size={20} color="#333" />
              </ToolBtn>
              <ToolBtn>
                <AlignCenter size={20} color="#333" />
              </ToolBtn>
              <ToolBtn>
                <AlignRight size={20} color="#333" />
              </ToolBtn>
              <ToolBtn>
                <ListOrdered size={20} color="#333" />
              </ToolBtn>
              <ToolBtn borderRight={false}>
                <List size={20} color="#333" />
              </ToolBtn>
            </View>

            <View className="flex-row border-b border-zinc-200">
              <ToolBtn>
                <Type size={20} color="#333" />
              </ToolBtn>
              <ToolBtn>
                <Highlighter size={20} color="#333" />
              </ToolBtn>
              <ToolBtn>
                <Bold size={20} color="#333" />
              </ToolBtn>
              <ToolBtn>
                <Italic size={20} color="#333" />
              </ToolBtn>
              <ToolBtn>
                <Underline size={20} color="#333" />
              </ToolBtn>
              <ToolBtn>
                <Strikethrough size={20} color="#333" />
              </ToolBtn>
              <View className="flex-1 items-center justify-center border-l border-zinc-200">
                <Paperclip size={20} color="#333" />
              </View>
            </View>

            <TextInput
              multiline
              placeholder="Enter class details here..."
              placeholderTextColor="#9ca3af"
              className="flex-1 p-4 text-lg text-black"
              textAlignVertical="top"
              value={details}
              onChangeText={setDetails}
            />
          </View>

          {/* <Label>Attached Document (Optional)</Label>
          <View className="bg-white rounded-2xl p-6 items-center">
            <UploadCloud size={40} color="#333" strokeWidth={1.5} />
            <TouchableOpacity className="bg-[#2A4559] px-10 py-3 rounded-full mt-3">
              <Text className="text-white font-bold text-lg">Upload File</Text>
            </TouchableOpacity>
          </View> */}

          <Label>Share Zoom Link</Label>
          <View className="bg-white rounded-2xl min-h-[100px] p-4">
            <TextInput
              placeholder="Paste your class link here..."
              placeholderTextColor="#9ca3af"
              multiline
              className="text-lg text-black"
              value={link}
              onChangeText={setLink}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <View className="absolute bottom-6 left-0 right-0 px-4">
        <TouchableOpacity
          className={`h-16 rounded-full items-center justify-center shadow-lg ${isLoading ? "bg-gray-400" : "bg-[#D4A76A]"}`}
          activeOpacity={0.8}
          onPress={handleUpload}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text className="text-white text-2xl font-bold">Upload</Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default AddClassScreen;
