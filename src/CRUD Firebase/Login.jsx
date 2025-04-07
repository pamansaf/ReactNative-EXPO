import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import React, { useState } from "react";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { setLocalStorage } from "../../Storage";

const Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert("Please Enter Email and Password");
      return;
    }
    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        // Signed in
        const user = userCredential.user;
        await setLocalStorage("userDetail", user);
        navigation.replace("CrudSatu");

        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorCode == "auth/invalid-credential") {
          Alert.alert("Invalid email or password");
        }
      });
  };
  return (
    <View className="flex-1 p-5">
      <View className="items-center pb-3">
        <MaterialCommunityIcons name="account-circle" size={90} color="gray" />
      </View>
      <View>
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
        onPress={handleLogin}
        className="items-center p-3 bg-blue-500 rounded-full mt-5"
      >
        <Text className="text-white">Login</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("Register")}
        className="items-center mt-2"
      >
        <Text>
          Belum Punya Account?{" "}
          <Text className="text-blue-500 font-bold">Register</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;
