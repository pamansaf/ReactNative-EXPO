import {
  View,
  Text,
  Alert,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  FlatList,
  Modal,
  ToastAndroid,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as ImagePicker from "expo-image-picker";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

const AsyncStorageDua = () => {
  const [notes, setNotes] = useState([]);
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  useEffect(() => {
    loadNotes();
  }, []);

  const loadNotes = async () => {
    try {
      const storeNotes = await AsyncStorage.getItem("notes");
      if (storeNotes !== null) setNotes(JSON.parse(storeNotes));
    } catch (error) {
      Alert.alert("Error", "Failed to load notes");
    }
  };

  const saveNotes = async (updateNotes) => {
    try {
      await AsyncStorage.setItem("notes", JSON.stringify(updateNotes));
    } catch (error) {
      Alert.alert("Error", "Failed to save notes");
    }
  };

  const addNote = () => {
    if (image.trim() == "" || title.trim() == "" || content.trim() == "") {
      Alert.alert("Error", "Title and content cannot be empty");
      return;
    }
    if (editingId) {
      // Update existing note
      const updateNotes = notes.map((note) =>
        note.id === editingId
          ? {
              ...note,
              image,
              title,
              content,
              createAt: new Date().toISOString(),
            }
          : note
      );
      setNotes(updateNotes);
      saveNotes(updateNotes);
      setEditingId(null);
      setModalVisible(!modalVisible);
      ToastAndroid.show("Note updated successfully", ToastAndroid.SHORT);
    } else {
      // Add new note
      const newNote = {
        id: Date.now().toString(),
        image,
        title,
        content,
        createAt: new Date().toISOString(),
      };
      ToastAndroid.show("Note added successfully", ToastAndroid.SHORT);
      const updateNotes = [...notes, newNote];
      setNotes(updateNotes);
      saveNotes(updateNotes);
      setModalVisible(!modalVisible);
    }

    // Reset form
    setImage(null);
    setTitle("");
    setContent("");
  };

  const editNote = (note) => {
    setImage(note.image);
    setTitle(note.title);
    setContent(note.content);
    setEditingId(note.id);
    setModalVisible(!modalVisible);
  };

  const deleteNote = (id) => {
    Alert.alert("Delete Note", "Are you sure to delete this note?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Delete",
        onPress: () => {
          const updateNotes = notes.filter((note) => note.id !== id);
          setNotes(updateNotes);
          saveNotes(updateNotes);
        },
        style: "destructive",
      },
    ]);
  };

  const formatDate = (dateFormat) => {
    const date = new Date(dateFormat);
    return date.toLocaleDateString();
  };

  const clearForm = () => {
    setImage(nul);
    setTitle("");
    setContent("");
    setEditingId("");
    setModalVisible(!modalVisible);
  };
  return (
    <SafeAreaView>
      <LinearGradient
        colors={["#e0f2fe", "#fefce8", "#fdf4ff"]}
        className="w-full min-h-screen p-3"
      >
        <View style={{ elevation: 1 }} className="bg-[#2486ff] p-3 rounded-md">
          <View className="flex-row justify-between items-center">
            <Text className="text-xl font-bold text-white">My Notes</Text>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <Ionicons name="add-circle-outline" size={30} color="white" />
            </TouchableOpacity>
          </View>
          <Text className="text-sm font-semibold text-white mt-2">
            Total : {notes.length}
          </Text>
        </View>

        {/* Seacrh */}
        {/* <View className="flex-row justify-between items-center mt-1">
          <View
            style={{ elevation: 1 }}
            className="h-10 flex-1 flex-row justify-between items-center bg-[#2486ff] mr-1 rounded-md px-3 "
          >
            <AntDesign name="search1" size={18} color="white" />
            <TextInput
              placeholder="Search..."
              placeholderTextColor="#cbd5e1"
              cursorColor="white"
              className="flex-1 pl-2 text-white font-semibold"
            />
            <TouchableOpacity>
              <AntDesign name="close" size={18} color="white" />
            </TouchableOpacity>
          </View>
        </View> */}

        {/* form add note */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            // Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <View className="flex-1 justify-center items-center bg-slate-500/60">
            <LinearGradient
              style={{ elevation: 3 }}
              colors={["#e0f2fe", "#fefce8", "#fdf4ff"]}
              className="w-[90%] justify-center items-center p-4 pb-6 m-4 rounded-lg"
            >
              <Text className="text-lg text-[#2486ff] font-bold mb-3">
                Form Add New Note
              </Text>
              <View className="items-center mb-5">
                {image ? (
                  <Image
                    alt="photo"
                    source={{ uri: image }}
                    className="w-48 h-52 rounded-md"
                  />
                ) : (
                  <FontAwesome5
                    name="user-plus"
                    size={100}
                    color="gray"
                    onPress={() => pickImage()}
                  />
                )}
              </View>
              <TextInput
                placeholder="Note Title"
                value={title}
                onChangeText={setTitle}
                className="w-full border border-slate-300 p-3 rounded-md mb-2 bg-white"
              />
              <TextInput
                placeholder="Note Content"
                value={content}
                onChangeText={setContent}
                multiline={true}
                textAlignVertical="top"
                className="w-full h-48 border border-slate-300 p-3 rounded-md mb-4 bg-white"
              />
              <TouchableOpacity
                onPress={clearForm}
                className="w-full bg-slate-400 p-3 rounded items-center mb-2"
              >
                <Text className="text-white font-bold">Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={addNote}
                className="w-full bg-[#2486ff] p-3 rounded items-center"
              >
                <Text className="text-white font-bold">
                  {editingId ? "Update Note" : "Add Note"}
                </Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
        </Modal>

        {/* renderin notes */}
        <View className="flex-1 mt-2">
          {notes.length === 0 ? (
            <View className="items-center justify-center p-8">
              <Ionicons name="document-text-outline" size={99} color="#ccc" />
              <Text className="text-lg text-[#999] font-bold mt-4">
                No notes yet
              </Text>
              <Text className="text-sm text-[#999] font-bold mt-1">
                Add your first note now
              </Text>
              <TouchableOpacity
                onPress={() => setModalVisible(true)}
                className="bg-[#2486ff] px-7 py-2 rounded-md items-center mt-2"
              >
                <Text className="text-sm text-white">+ Add New Note</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <FlatList
              data={notes}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <View
                  style={{ elevation: 1 }}
                  className="flex-row bg-white px-3 py-2 rounded-lg mb-2"
                >
                  <View>
                    <Image
                      alt="photo"
                      source={{ uri: item.image }}
                      className="w-20 h-20 rounded-md"
                    />
                  </View>
                  <View className="pl-2">
                    <Text className="flex-1 text-[16px] text-slate-600 font-bold">
                      {item.title}
                    </Text>
                    <Text className="text-sm text-slate-600 mb-1 ">
                      {item.content}
                    </Text>
                    <View className="flex-row justify-between items-center">
                      <Text className="text-xs text-slate-500">
                        Date : {formatDate(item.createAt)}
                      </Text>
                      <View className="flex-row justify-end items-center">
                        <TouchableOpacity onPress={() => editNote(item)}>
                          <AntDesign name="edit" size={17} color="#2486ff" />
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => deleteNote(item.id)}
                          className="ml-5"
                        >
                          <AntDesign name="delete" size={17} color="#ef4444" />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
              )}
            />
          )}
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default AsyncStorageDua;
