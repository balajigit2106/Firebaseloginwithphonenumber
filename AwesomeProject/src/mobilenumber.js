import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  ScrollView,
  Keyboard,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
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
      <View style={styles.container}>
        <View style={{ marginBottom: 20, alignItems: "center" }}>
          <Image
            source={require("../images/firebaselogo.png")}
            style={styles.image}
          />
        </View>
        <View style={styles.card}>
          <Text style={styles.heading}>Welcome!</Text>
          <Text style={styles.welcometext}>Verify your number in firebase</Text>
          <View
            style={
              mobileNumberError
                ? styles.error_inputContainer
                : styles.inputContainer
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
              <Text fontWeight="bold" style={styles.buttontext}>
                Get Code
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: 90,
  },
  image: {
    height: 150,
    width: 300,
  },
  card: {
    width: 320,
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 30,
    elevation: 4,
    shadowColor: "rgba(0, 0, 0, 0.60)",
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 8,
  },
  heading: {
    fontWeight: "600",
    fontSize: 24,
    marginBottom: 6,
  },
  welcometext: {
    color: "gray",
    marginBottom: 14,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
  },
  error_inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#d32f2f",
    borderRadius: 5,
    padding: 10,
  },
  prefixText: {
    marginRight: 10,
    fontSize: 16,
  },
  loading_buttontext: {
    fontWeight: "700",
    color: "white",
  },
  buttontext: {
    color: "white",
    fontWeight: "600",
  },
  button: {
    backgroundColor: "#5383EC",
    width: "100%",
    height: 44,
    borderRadius: 19,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginTop: 20,
    marginBottom: 10,
  },
  disble_button: {
    backgroundColor: "#5383EC",
    opacity: 0.7,
    width: "100%",
    height: 44,
    borderRadius: 19,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginTop: 20,
    marginBottom: 10,
  },
});
