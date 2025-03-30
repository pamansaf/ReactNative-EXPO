import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../CRUD Firebase/Home";
import Login from "../CRUD Firebase/Login";
import Register from "../CRUD Firebase/Register";
import AddPage from "../CRUD Firebase/AddPage";
import UpdatePage from "../CRUD Firebase/UpdatePage";
import Penjumlahan from "../AsyncStorage/Penjumlahan";

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <Stack.Navigator initialRouteName="Register">
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="AddPage" component={AddPage} />
      <Stack.Screen name="UpdatePage" component={UpdatePage} />
      <Stack.Screen name="Penjumlahan" component={Penjumlahan} />
    </Stack.Navigator>
  );
};
export default Navigation;
