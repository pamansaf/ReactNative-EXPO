import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { getLocalStorage } from "../../Storage";

const Home = () => {
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
      <View className="border-b items-center pb-2">
        <Text className="text-slate-600">Selamat Datang</Text>
        <Text className=" text-base font-bold">{user?.displayName}</Text>
      </View>
      <View className="border-b items-center py-2">
        <Text className=" text-base font-bold text-slate-600">
          Jadwal Kuliah <Text>{user?.displayName}</Text>
        </Text>
      </View>
      <View className="border-b items-center py-2"></View>
    </View>
  );
};

export default Home;
