import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import Navigation from "./src/Navigation";
import { StatusBar } from "expo-status-bar";

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Navigation />
    </NavigationContainer>
  );
}
