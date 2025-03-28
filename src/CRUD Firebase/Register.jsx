import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
  Alert,
} from "react-native";
import React, { useState } from "react";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";

const Register = () => {
  const navigation = useNavigation();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleRegister = () => {
    if (!name || !email || !password) {
      ToastAndroid.show("Please fill all details", ToastAndroid.BOTTOM);
      Alert.alert("Please Enter Name, Email and Password");
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        ToastAndroid.show("Registrasi berhasl", ToastAndroid.BOTTOM);
        navigation.replace("Login");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        if (errorCode == "auth/email-already-in-use") {
          ToastAndroid.show("Email already exist", ToastAndroid.BOTTOM);
          Alert.alert("Email already exist");
        }
        // ..
      });
  };
  return (
    <View className="flex-1 p-5">
      <View className="items-center pb-3">
        <MaterialCommunityIcons name="account-circle" size={90} color="gray" />
      </View>
      <View>
        <TextInput
          placeholder="Full Name"
          value={name}
          onChangeText={(value) => setName(value)}
          className="bg-white p-3 border border-slate-300 rounded-lg my-1"
        />
        <TextInput
          placeholder="Email Address"
          value={email}
          onChangeText={(value) => setEmail(value)}
          className="bg-white p-3 border border-slate-300 rounded-lg my-1"
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={(value) => setPassword(value)}
          secureTextEntry={true}
          className="bg-white p-3 border border-slate-300 rounded-lg my-1"
        />
      </View>
      <TouchableOpacity
        onPress={handleRegister}
        className="items-center p-3 bg-blue-500 rounded-full mt-5"
      >
        <Text className="text-white ">Register</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("Login")}
        className="items-center mt-2"
      >
        <Text>
          Sudah Punya Account?{" "}
          <Text className="text-blue-500 font-bold">Login</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Register;
