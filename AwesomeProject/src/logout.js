import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, BackHandler } from "react-native";
import {
  useNavigation,
  useIsFocused,
  useRoute,
} from "@react-navigation/native";
import styles from "./styles";
import { Feather } from "@expo/vector-icons";

export default function Logout() {
  const route = useRoute();
  const isFocuse = useIsFocused();
  const navigation = useNavigation();

  const handleBack = () => {
    const routeName = route.name;
    //orders
    if (isFocuse) {
      if (routeName === "logout") {
        navigation.navigate("Mobilenumberverify");
        return true;
      }
      return false;
    }
  };
  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", handleBack);

    return () => {
      BackHandler.removeEventListener("hardwareBackPress", handleBack);
    };
  }, [isFocuse]);

  return (
    <View style={styles.logout_container}>
      <Feather name="check-circle" size={100} color="#23794E" />
      <Text style={styles.successtext}>Verified Successfully</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Mobilenumberverify")}
      >
        <Text style={styles.buttontext}>Click to go back</Text>
      </TouchableOpacity>
    </View>
  );
}
