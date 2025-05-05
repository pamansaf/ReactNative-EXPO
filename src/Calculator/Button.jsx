import { Text, TouchableOpacity } from "react-native";
import React from "react";

const Button = ({ title, type, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={
        type == "top"
          ? "w-14 h-14 justify-center items-center p-2 bg-slate-700  rounded-lg my-1 mx-3"
          : type == "right"
          ? "w-14 h-14 justify-center items-center p-2 bg-blue-500  rounded-lg my-1 mx-3"
          : "w-14 h-14 justify-center items-center p-2 bg-slate-100  rounded-lg my-1 mx-3"
      }
    >
      <Text
        className={
          type == "number" ? "text-2xl text-black" : "text-2xl text-white"
        }
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
