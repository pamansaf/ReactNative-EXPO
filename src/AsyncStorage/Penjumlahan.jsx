// https://www.youtube.com/@HeroDevCH  ===============================

import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Penjumlahan = () => {
  const [totalJumlah, setTotalJumlah] = useState(0);

  //   Store Data
  const storeTotalJumlah = async (value) => {
    try {
      await AsyncStorage.setItem("totalJumlah", value);
    } catch (e) {
      // saving error
    }
  };

  //   Read data
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("totalJumlah");
      if (value !== null) {
        // value previously stored
        console.log("nilai dalan local storage = ", value);
        setTotalJumlah(+value);
      }
    } catch (e) {
      // error reading value
    }
  };

  useEffect(() => {
    getData();
  }, []);

  //   Remove Data
  const removeData = async () => {
    try {
      await AsyncStorage.removeItem("totalJumlah");
    } catch (error) {}
  };

  const handleTotalJumlah = () => {
    const newTotalUpdate = totalJumlah + 10;
    setTotalJumlah(newTotalUpdate);
    storeTotalJumlah(newTotalUpdate?.toString());
  };

  return (
    <View className="flex-1 justify-center items-center">
      <Text className="italic underline pb-3">Penjumlahan AsyncStorage</Text>
      <Text className="text-xl font-bold pb-3">
        Total Penjumlahan = {totalJumlah}
      </Text>
      <TouchableOpacity
        onPress={handleTotalJumlah}
        className="bg-slate-500 px-5 py-2 rounded-md mb-3"
      >
        <Text className="text-white">Tambahkan 10</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={removeData}
        className="bg-slate-500 px-5 py-2 rounded-md"
      >
        <Text className="text-white">Remove Data</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Penjumlahan;
