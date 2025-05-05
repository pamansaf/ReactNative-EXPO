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
import CrudSQLite from "../SQLite";
import CRUDFirebaseDua from "../CRUD Firebase Dua";
import AsyncStorageDua from "../AsyncStorage Dua";
import Dictionary from "../Dictionary";
import Calculator from "./../Calculator/index";
import CalculatorDua from "../CalculatorDua";
import Contact from "../AsyncStorage/Contact";
import CreateContact from "../AsyncStorage/Contact/CreateContact";

const Stack = createNativeStackNavigator();

const Navigation = () => {
  const navigation = useNavigation();
  return (
    <Stack.Navigator initialRouteName="CrudSQLite">
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

      {/* AsyncStorage Dua */}
      <Stack.Screen name="AsyncStorageDua" component={AsyncStorageDua} />

      {/* SQLite */}
      <Stack.Screen name="CrudSQLite" component={CrudSQLite} />

      {/* CRUD Firebase Dua */}
      <Stack.Screen name="CRUDFirebaseDua" component={CRUDFirebaseDua} />

      {/* Dictionary */}
      <Stack.Screen name="Dictionary" component={Dictionary} />

      {/* Calculator */}
      <Stack.Screen name="Calculator" component={Calculator} />
      <Stack.Screen name="CalculatorDua" component={CalculatorDua} />

      {/* Kartu Peserta */}
      <Stack.Screen
        name="Contact"
        component={Contact}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="CreateContact" component={CreateContact} />
    </Stack.Navigator>
  );
};
export default Navigation;
