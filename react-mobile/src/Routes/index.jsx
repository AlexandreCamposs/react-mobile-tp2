import React, { useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../Page/Home";
import Login from "../Components/Login";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useNavigation } from "@react-navigation/native";

const Stack = createStackNavigator();

const Routes = () => {
  const navigation = useNavigation();

  useEffect(() => {
    async function getToken() {
      const token = await AsyncStorage.getItem("@user");
      if (token) {
        navigation.navigate("home");
      } else {
        navigation.navigate("login");
      }
    }
    getToken();
  }, []);

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="home"
        component={Home}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="login"
        component={Login}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default Routes;
