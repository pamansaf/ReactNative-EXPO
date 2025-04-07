import { View, Text, TouchableOpacity, Alert } from "react-native";
import React from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useNavigation } from "@react-navigation/native";

const Product = ({ id, emoji, name, price, isSold }) => {
  const navigation = useNavigation();

  const onPurchase = () => {
    const docRef = doc(db, "products", id);
    updateDoc(docRef, {
      isSold: true,
    });
  };

  const onDelete = () => {
    Alert.alert("Hapus Product", "Apakah Anda ingin menghapus produt ini?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Yes",
        style: "default",
        onPress: onDeleteProduct,
      },
    ]);
  };

  const onDeleteProduct = () => {
    const docRef = doc(db, "products", id);
    deleteDoc(docRef);
  };

  return (
    <View
      style={{ elevation: 3 }}
      className="flex-row justify-between bg-white p-2 my-1 rounded-md"
    >
      <View className="flex-row items-center">
        <View className="bg-cyan-50 p-2 rounded-md border border-cyan-100">
          <Text className="text-6xl">{emoji}</Text>
        </View>
        <View className="pl-3">
          <Text className="text-base font-bold">{name}</Text>
          <Text className="text-slate-500 pb-2">Rp. {price} / pcs</Text>
          {isSold ? (
            <TouchableOpacity className="w-16 bg-slate-400 items-center py-1 rounded">
              <Text className=" text-xs text-white">Purchase</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={onPurchase}
              className="w-16 bg-indigo-500 items-center py-1 rounded"
            >
              <Text className=" text-xs text-white">Purchase</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
      <View className="justify-between">
        <View className="flex-row justify-end items-center gap-3 px-1">
          <TouchableOpacity>
            <AntDesign name="edit" size={17} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={onDelete}>
            <AntDesign name="delete" size={17} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Product;
