import { View, Text, Image, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const CreateContact = () => {
  const navigation = useNavigation();
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [number, setNumber] = useState();

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

  const addContact = async () => {
    const data = { image, name, number };
    try {
      const jsonValue = JSON.stringify(data);
      await AsyncStorage.setItem("contact", jsonValue);
      navigation.navigate("Contact");
      console.log("data save");
    } catch (e) {
      // saving error
    }
  };

  return (
    <View className="py-4 px-10">
      <Text className="text-lg font-bold text-center mb-5">Contact Detail</Text>
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
      <View>
        <View className="flex-row items-center bg-white px-3 py-1 border border-slate-300 rounded-md mb-2">
          <View className="w-5 h-5 justify-center items-center">
            <FontAwesome5 name="user-alt" size={18} color="gray" />
          </View>
          <TextInput
            placeholder="Enter Name"
            value={name}
            onChangeText={(value) => setName(value)}
            className="pl-2"
          />
        </View>
        <View className="flex-row items-center bg-white px-3 py-1 border border-slate-300 rounded-md mb-2">
          <View className="w-5 h-5 justify-center items-center">
            <FontAwesome5 name="mobile-alt" size={18} color="gray" />
          </View>
          <TextInput
            placeholder="Enter Number"
            value={number}
            onChangeText={(value) => setNumber(value)}
            keyboardType="numeric"
            className="pl-2"
          />
        </View>
      </View>
      <TouchableOpacity
        onPress={addContact}
        className="bg-indigo-500 p-3 rounded-md mt-3"
      >
        <Text className="text-white text-center">Add Contact</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CreateContact;
