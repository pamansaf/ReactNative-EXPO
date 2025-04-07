import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../CRUD Firebase/Home";
import Login from "../CRUD Firebase/Login";
import Register from "../CRUD Firebase/Register";
import AddPage from "../CRUD Firebase/AddPage";
import UpdatePage from "../CRUD Firebase/UpdatePage";
import Penjumlahan from "../AsyncStorage/Penjumlahan";
import CrudSatu from "../CRUD Satu";
import AddSatu from "../CRUD Satu/AddSatu";
import Product from "../CRUD Satu/Product";
import { TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import UpdateSatu from "../CRUD Satu/UpdateSatu";

const Stack = createNativeStackNavigator();

const Navigation = () => {
  const navigation = useNavigation();
  return (
    <Stack.Navigator initialRouteName="CrudSatu">
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="AddPage" component={AddPage} />
      <Stack.Screen name="UpdatePage" component={UpdatePage} />
      <Stack.Screen name="Penjumlahan" component={Penjumlahan} />
      <Stack.Screen
        name="CrudSatu"
        component={CrudSatu}
        options={{
          headerRight: () => {
            return (
              <TouchableOpacity onPress={() => navigation.navigate("AddSatu")}>
                <Ionicons name="add-circle" size={30} color="blue" />
              </TouchableOpacity>
            );
          },
        }}
      />
      <Stack.Screen name="AddSatu" component={AddSatu} />
      <Stack.Screen name="UpdateSatu" component={UpdateSatu} />
      <Stack.Screen name="Product" component={Product} />
    </Stack.Navigator>
  );
};
export default Navigation;
