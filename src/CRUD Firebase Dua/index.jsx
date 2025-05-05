import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import React, { useState } from "react";
import {
  addDoc,
  collection,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../../firebase";

const CRUDFirebaseDua = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");

  const SubmitData = () => {
    addDoc(collection(db, "users"), {
      userName: userName,
      email: email,
    })
      .then(() => {
        console.log("data submited");
      })
      .catch((error) => {
        console.log(error);
      });
    if (SubmitData) {
      ToastAndroid.show("data tersimpan", ToastAndroid.SHORT);
    }
  };

  const UpdateData = () => {
    updateDoc(doc(db, "users", "id"), {
      userName: userName,
      email: email,
    })
      .then(() => {
        console.log("data update");
      })
      .catch((error) => {
        console.log(error);
      });
    if (UpdateData) {
      ToastAndroid.show("data update", ToastAndroid.SHORT);
    }
  };

  const DeleteData = () => {
    deleteDoc(doc(db, "users", "id"));
  };
  return (
    <View className="flex-1 items-center p-4">
      <Text className="pb-5">CRUD Firebase Dua</Text>
      <TextInput
        placeholder="User Name"
        value={userName}
        onChangeText={(value) => setUserName(value)}
        className="w-full bg-white p-3 border border-slate-300 rounded-md mb-2"
      />
      <TextInput
        placeholder="Email Address"
        value={email}
        onChangeText={(value) => setEmail(value)}
        className="w-full bg-white p-3 border border-slate-300 rounded-md mb-2"
      />

      <TouchableOpacity
        onPress={SubmitData}
        className="bg-green-500 px-3 py-2 rounded-md mt-3"
      >
        <Text className="text-white">Submit Data</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={UpdateData}
        className="bg-blue-500 px-3 py-2 rounded-md mt-3"
      >
        <Text className="text-white">Update Data</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={DeleteData}
        className="bg-red-500 px-3 py-2 rounded-md mt-3"
      >
        <Text className="text-white">Delete Data</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CRUDFirebaseDua;
