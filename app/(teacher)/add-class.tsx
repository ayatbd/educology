import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
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
  Link,
  Paperclip,
  UploadCloud,
} from "lucide-react-native";

const AddClassScreen = () => {
  const [title, setTitle] = useState("");
  const [zoomLink, setZoomLink] = useState("");

  // Reusable Input Label Component
  const Label = ({ children }: { children: string }) => (
    <Text className="text-zinc-500 text-lg mb-2 mt-4 ml-1 font-medium">
      {children}
    </Text>
  );

  // Reusable Toolbar Button
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
    <SafeAreaView className="flex-1 bg-black">
      <StatusBar barStyle="light-content" />

      {/* Header */}
      <View className="py-4 items-center">
        <Text className="text-2xl font-bold text-[#3B75A2]">Add Class</Text>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView
          contentContainerStyle={{ paddingBottom: 100 }}
          className="px-4"
          showsVerticalScrollIndicator={false}
        >
          {/* Title Input */}
          <Label>Title</Label>
          <TextInput
            placeholder="Enter Class Name"
            placeholderTextColor="#9ca3af"
            className="bg-white rounded-2xl h-14 px-4 text-black text-lg"
            value={title}
            onChangeText={setTitle}
          />

          {/* Date & Time Section */}
          <Label>Expected Live Class starting Date & Time</Label>
          <View className="flex-row gap-3">
            <View className="flex-1 flex-row items-center bg-white rounded-2xl h-14 px-4 justify-between">
              <Text className="text-gray-400 text-lg">DD-MM-YYYY</Text>
              <Calendar size={20} color="#333" />
            </View>
            <View className="flex-1 flex-row items-center bg-white rounded-2xl h-14 px-4 justify-between">
              <Text className="text-gray-400 text-lg">-- : -- AM</Text>
              <Clock size={20} color="#333" />
            </View>
          </View>

          {/* Rich Text Editor UI */}
          <Label>Add Class Details</Label>
          <View className="bg-white rounded-2xl overflow-hidden min-h-[250px]">
            {/* Toolbar Row 1 */}
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

            {/* Toolbar Row 2 */}
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

            {/* Editor Area */}
            <TextInput
              multiline
              className="flex-1 p-4 text-lg text-black text-top"
              textAlignVertical="top"
            />
          </View>

          {/* Attached Document Section */}
          <Label>Attached Document (Optional)</Label>
          <View className="bg-white rounded-2xl p-6 items-center">
            <UploadCloud size={40} color="#333" strokeWidth={1.5} />
            <TouchableOpacity className="bg-[#2A4559] px-10 py-3 rounded-full mt-3">
              <Text className="text-white font-bold text-lg">Upload File</Text>
            </TouchableOpacity>
          </View>

          {/* Zoom Link Section */}
          <Label>Share Zoom Link</Label>
          <View className="bg-white rounded-2xl min-h-[100px] p-4">
            <TextInput
              placeholder="Paste your class link here..."
              placeholderTextColor="#9ca3af"
              multiline
              className="text-lg text-black"
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Bottom Upload Button */}
      <View className="absolute bottom-6 left-0 right-0 px-4">
        <TouchableOpacity
          className="bg-[#D4A76A] h-16 rounded-full items-center justify-center shadow-lg"
          activeOpacity={0.8}
        >
          <Text className="text-white text-2xl font-bold">Upload</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default AddClassScreen;
