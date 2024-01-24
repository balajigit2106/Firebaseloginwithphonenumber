import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  Keyboard,
  StyleSheet,
  BackHandler,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import {
  useRoute,
  useIsFocused,
  useNavigation,
} from "@react-navigation/native";
import auth from "@react-native-firebase/auth";
import { MaterialIcons } from "@expo/vector-icons";

export default function Verify() {
  const route = useRoute();
  const isFocuse = useIsFocused();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [verificationId, setVerificationId] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [otpError, setOtpError] = useState("");
  const inputRefs = useRef(
    Array(6)
      .fill(0)
      .map((_, index) => index)
  );

  useEffect(() => {
    if (isFocuse) {
      setOtpError("");
      setOtp(["", "", "", "", "", ""]);
      const getresponse = route.params;
      console.log("eeeeeeee", getresponse);
      setVerificationId(getresponse.verificationId);
      setMobileNumber(getresponse.mobileNumber);
    }
  }, [isFocuse]);

  const handleOtpChange = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value;

    // Move to the next input field if the current one is filled
    if (index < 5 && value !== "") {
      inputRefs.current[index + 1].focus();
    }

    setOtp(newOtp);
  };

  const handleBackspace = (index) => {
    // Focus on the previous input field and clear its value
    if (index > 0) {
      const newOtp = [...otp];
      newOtp[index - 1] = "";
      inputRefs.current[index - 1].focus();
      setOtp(newOtp);
    }
  };

  const handleVerify = async () => {
    Keyboard.dismiss();
    let otpValidate = "";

    if (otp.length <= 0) {
      otpValidate = "Please enter OTP";
      setOtpError("Please enter OTP");
    } else if (otp.includes("")) {
      setOtpError("Please enter valid OTP");
      otpValidate = "Please enter valid OTP";
    }
    if (otpValidate) return;
    setLoading(true);
    const concatenatedString = otp.join("");
    try {
      const credential = auth.PhoneAuthProvider.credential(
        verificationId,
        concatenatedString
      );
      await auth().signInWithCredential(credential);
      console.log("Successfully Verified");
    } catch (error) {
      console.error("Error confirming code:", error.message);
      if (
        error.message ===
        "[auth/invalid-verification-code] The verification code from SMS/TOTP is invalid. Please check and enter the correct verification code again."
      ) {
        setOtpError(
          " Invalid OTP. Please check and enter the correct OTP again"
        );
      }
      if (
        error.message ===
        "[auth/session-expired] The sms code has expired. Please re-send the verification code to try again."
      ) {
        setOtpError(
          " The sms code has expired. Please re-send the verification code to try again."
        );
      }
      setLoading(false);
    }
  };
  const handleBack = () => {
    const routeName = route.name;
    //orders
    if (isFocuse) {
      if (routeName === "verify") {
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
    <ScrollView keyboardShouldPersistTaps="handled">
      <View style={styles.container}>
        <View style={{ marginBottom: 20, alignItems: "center" }}>
          <Image
            source={require("../images/firebaselogo.png")}
            style={styles.image}
          />
        </View>
        <View style={styles.card}>
          <Text style={styles.heading}>OTP Verification</Text>
          <Text style={styles.welcometext}>
            Enter OTP send to +91 {mobileNumber}
          </Text>
          <View style={styles.otpcontainer}>
            {otp.map((value, index) => (
              <TextInput
                key={index}
                style={otpError ? styles.errorinput : styles.input}
                value={value}
                maxLength={1}
                keyboardType="numeric"
                onChangeText={(text) => handleOtpChange(index, text)}
                onKeyPress={({ nativeEvent }) => {
                  if (nativeEvent.key === "Backspace") {
                    handleBackspace(index);
                  }
                }}
                ref={(ref) => (inputRefs.current[index] = ref)}
              />
            ))}
          </View>
          {otpError ? (
            <View style={{ flexDirection: "row", marginTop: 2 }}>
              <MaterialIcons
                name="error-outline"
                color="#d32f2f"
                size={18}
                style={{ marginTop: 1, marginRight: 3 }}
              />
              <Text style={{ color: "#d32f2f" }}>{otpError}</Text>
            </View>
          ) : (
            ""
          )}
          <TouchableOpacity
            style={loading ? styles.signupdisble_button : styles.signup_button}
            onPress={handleVerify}
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
              <Text fontWeight="bold" style={styles.signup_buttontext}>
                Verify
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
    fontSize: 20,
    marginBottom: 6,
  },
  welcometext: {
    color: "gray",
  },
  otpcontainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    marginBottom: 5,
  },
  input: {
    width: 40,
    height: 40,
    borderWidth: 2,
    borderColor: "gray",
    textAlign: "center",
    fontSize: 16,
  },
  errorinput: {
    width: 40,
    height: 40,
    borderWidth: 2,
    borderColor: "#d32f2f",
    textAlign: "center",
    fontSize: 16,
  },
  prefixText: {
    marginRight: 10,
    fontSize: 16,
  },
  loading_buttontext: {
    fontWeight: "700",
    color: "white",
  },
  signup_buttontext: {
    color: "white",
    fontWeight: "600",
  },
  signup_button: {
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
  signupdisble_button: {
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
