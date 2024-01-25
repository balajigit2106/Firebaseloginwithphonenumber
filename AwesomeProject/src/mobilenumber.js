import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  ScrollView,
  Keyboard,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import styles from "./styles";
import auth from "@react-native-firebase/auth";
import { useNavigation, useIsFocused } from "@react-navigation/native";

export default function MobileNumber() {
  const navigation = useNavigation();
  const isFocus = useIsFocused();
  const [verificationId, setVerificationId] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [mobileNumberError, setMobileNumberError] = useState("");
  const [loading, setLoading] = useState(false);
  console.log("verify", verificationId);

  useEffect(() => {
    if (isFocus) {
      setMobileNumber("");
      setLoading(false);
      setMobileNumberError("");
    }
  }, [isFocus]);

  const handleMobile = (text) => {
    setMobileNumber(text);
    if (text.length <= 0) {
      setMobileNumberError(" Mobile number is required");
    } else if (text.length < 10) {
      setMobileNumberError(" Mobile number is not valid");
    } else {
      setMobileNumberError("");
    }
  };

  const signInWithPhoneNumber = async () => {
    Keyboard.dismiss();
    let mobileValidate;
    if (mobileNumber.length <= 0) {
      mobileValidate = " Mobile number is required";
    } else if (mobileNumber.length < 10) {
      mobileValidate = " Mobile number is not valid";
    } else {
      mobileValidate = "";
    }

    setMobileNumberError(mobileValidate);
    if (mobileValidate || mobileNumberError) return;
    setLoading(true);
    try {
      const confirmation = await auth().signInWithPhoneNumber(
        `+91${mobileNumber}`
      );
      setVerificationId(confirmation._verificationId);
      setTimeout(() => {
        navigation.navigate("verify", {
          verificationId: confirmation._verificationId,
          mobileNumber: mobileNumber,
        });
      }, 4000);
    } catch (error) {
      setLoading(false);
      console.log("Error sending confirmation code:", error.message);
    }
  };

  return (
    <ScrollView keyboardShouldPersistTaps="handled">
      <View style={styles.logincontainer}>
        <View style={{ marginBottom: 20, alignItems: "center" }}>
          <Image
            source={require("../images/firebaselogo.png")}
            style={styles.firebaseimage}
          />
        </View>
        <View style={styles.card}>
          <TouchableOpacity onPress={() => navigation.navigate("logout")}>
            <Text style={styles.welcome_heading}>Welcome!</Text>
          </TouchableOpacity>
          <Text style={styles.welcometext}>Verify your number in firebase</Text>
          <View
            style={
              mobileNumberError
                ? styles.error_mobileinputContainer
                : styles.mobile_inputContainer
            }
          >
            <Text style={styles.prefixText}>+91</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your mobile number"
              keyboardType="phone-pad"
              value={mobileNumber}
              onChangeText={handleMobile}
              maxLength={10}
            />
          </View>
          {mobileNumberError ? (
            <Text
              style={{
                paddingVertical: 4,
                paddingHorizontal: 2,
                color: "#d32f2f",
              }}
            >
              {mobileNumberError}
            </Text>
          ) : (
            ""
          )}
          <TouchableOpacity
            style={loading ? styles.disble_button : styles.button}
            onPress={signInWithPhoneNumber}
            disabled={loading ? true : false}
          >
            {loading ? (
              <View style={{ flexDirection: "row" }}>
                <ActivityIndicator
                  size="small"
                  color="#5383EC"
                  style={{ paddingRight: 10 }}
                />
                <Text style={styles.loading_buttontext}>Loading...</Text>
              </View>
            ) : (
              <Text style={styles.buttontext}>Get Code</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
