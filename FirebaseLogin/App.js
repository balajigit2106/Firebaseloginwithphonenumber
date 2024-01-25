import React from "react";
import { StatusBar } from "react-native";
import Verify from "./src/verify";
import Logout from "./src/logout";
import "react-native-gesture-handler";
import MobileNumber from "./src/mobilenumber";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <Stack.Navigator initialRouteName="Mobilenumberverify">
        <Stack.Screen
          name="verify"
          component={Verify}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Mobilenumberverify"
          component={MobileNumber}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="logout"
          component={Logout}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
