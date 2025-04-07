import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { getLocalStorage } from "../../Storage";
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

const Home = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState();

  const GetUserDetail = async () => {
    const userInfo = await getLocalStorage("userDetail");
    console.log(userInfo);
    setUser(userInfo);
  };

  useEffect(() => {
    GetUserDetail();
  }, []);

  return (
    <View className="flex-1 p-4 pt-10">
      <View className="border-b items-center pb-5">
        <Ionicons name="school" size={75} color="black" />
        <Text className="text-slate-600">Selamat Datang</Text>
        <Text className=" text-base font-bold">{user?.displayName}</Text>
      </View>
      <View className="border-b items-center py-3">
        <Text className=" text-base font-bold text-slate-600">
          Jadwal Kuliah <Text>{user?.displayName}</Text>
        </Text>
      </View>
      <View className="border-b py-4">
        <TouchableOpacity
          onPress={() => navigation.navigate("AddPage")}
          className="flex-row justify-between items-center"
        >
          <AntDesign name="addfile" size={24} color="#475569" />
          <Text className=" text-sm font-bold text-slate-600">
            Tambah Jadwal Baru
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity className="w-1/3 mx-auto items-center py-2 bg-slate-700 rounded-full mt-10">
        <Text className="text-white ">Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;
