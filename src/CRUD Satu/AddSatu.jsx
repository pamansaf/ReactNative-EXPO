import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import EmojiPicker from "rn-emoji-keyboard";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase";
import { useNavigation } from "@react-navigation/native";

const AddSatu = () => {
  const navigation = useNavigation();
  const [isOpen, setIsOpen] = useState(false);
  const [newItem, setNewItem] = useState({
    emoji: "📷",
    name: "",
    price: 0,
    isSold: false,
    createAt: new Date(),
  });

  const handlePick = (emojiObject) => {
    setNewItem({
      ...newItem,
      emoji: emojiObject.emoji,
    });
  };

  const onSend = async () => {
    await addDoc(collection(db, "products"), newItem);
    navigation.goBack();
  };

  const selectedItem = (item) => {
    console.log("selected item", item);
  };

  return (
    <View className="flex-1 p-4">
      <View className="items-center">
        <Text className="text-2xl font-bold">Sell a new product</Text>
        <Text onPress={() => setIsOpen(true)} className="text-[99px]">
          {newItem.emoji}
        </Text>
        <EmojiPicker
          onEmojiSelected={handlePick}
          open={isOpen}
          onClose={() => setIsOpen(false)}
        />
      </View>
      <TextInput
        placeholder="Product Name"
        onChangeText={(text) => setNewItem({ ...newItem, name: text })}
        className="bg-white p-3 my-1 rounded-md"
      />
      <TextInput
        placeholder="Rp. Price"
        onChangeText={(text) => setNewItem({ ...newItem, price: text })}
        keyboardType="number-pad"
        className="bg-white p-3 my-1 rounded-md"
      />
      <TouchableOpacity
        onPress={onSend}
        className="bg-blue-500 items-center py-3 px-5  my-5 rounded"
      >
        <Text className="text-white">Publish</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddSatu;
