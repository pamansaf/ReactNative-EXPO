import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import React, { useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useNavigation } from "@react-navigation/native";

const AddPage = () => {
  const navigation = useNavigation();
  const [hari, setHari] = useState();
  const [jam, setJam] = useState();
  const [mataKuliah, setMataKuliah] = useState();
  const [error, setError] = useState(null);

  const handleAdd = async () => {
    await setDoc(doc(db, "jadwal"), {
      hari,
      jam,
      mataKuiah,
    });
    if (handleAdd) {
      return navigation.navigate("Home");
    }
  };
  return (
    <View className="py-4 px-10">
      <View className="border-b items-center pb-3 mb-5">
        <Text className=" text-base font-bold text-slate-700">
          Input Jadwal Baru
        </Text>
      </View>
      <View>
        <TextInput
          placeholder="Hari"
          value={hari}
          onChangeText={(value) => setHari(value)}
          className="bg-white p-3 border border-slate-300 rounded-lg my-1"
        />
        <TextInput
          placeholder="Jam"
          value={jam}
          onChangeText={(value) => setJam(value)}
          className="bg-white p-3 border border-slate-300 rounded-lg my-1"
        />
        <TextInput
          placeholder="Mata Kuliah"
          value={mataKuliah}
          onChangeText={(value) => setMataKuliah(value)}
          className="bg-white p-3 border border-slate-300 rounded-lg my-1"
        />
        <TouchableOpacity
          onPress={handleAdd}
          className="items-center p-3 bg-blue-500 rounded-full mt-5"
        >
          <Text className="text-white ">+ Tambah</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AddPage;
