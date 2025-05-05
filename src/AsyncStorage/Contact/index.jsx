import { View, Text, TouchableOpacity } from "react-native";
import React, { useLayoutEffect } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Contact = ({ navigation }) => {
  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("contact");
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // error reading value
    }
  };

  // useLayoutEffect(() => {
  //   navigation.setOptions({
  //     headerRight: () => {},
  //   });
  // }, []);
  return (
    <View>
      <View
        style={{ elevation: 1 }}
        className="flex-row justify-between items-center w-ful bg-white px-4 pb-3 pt-10"
      >
        <Text className="text-lg font-bold">Contact</Text>
        <TouchableOpacity onPress={() => navigation.navigate("CreateContact")}>
          <AntDesign name="plus" size={20} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Contact;
