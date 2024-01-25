import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  Keyboard,
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
import styles from "./styles";
import auth from "@react-native-firebase/auth";
import { MaterialIcons } from "@expo/vector-icons";

export default function Verify() {
  const route = useRoute();
  const isFocuse = useIsFocused();
  const navigation = useNavigation();
  //usestates
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
      if (getresponse) {
        setVerificationId(
          getresponse.verificationId ? getresponse.verificationId : ""
        );
        setMobileNumber(
          getresponse.mobileNumber ? getresponse.mobileNumber : ""
        );
      }
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
      navigation.navigate("logout");
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
      <View style={styles.logincontainer}>
        <View style={{ marginBottom: 20, alignItems: "center" }}>
          <Image
            source={require("../images/firebaselogo.png")}
            style={styles.firebaseimage}
          />
        </View>
        <View style={styles.card}>
          <Text style={styles.otp_heading}>OTP Verification</Text>
          <Text style={{ color: "gray" }}>
            Enter OTP send to +91 {mobileNumber}
          </Text>
          <View style={styles.otpcontainer}>
            {otp.map((value, index) => (
              <TextInput
                key={index}
                style={otpError ? styles.error_otpinput : styles.otpinput}
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
            style={loading ? styles.disble_button : styles.button}
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
              <Text fontWeight="bold" style={styles.buttontext}>
                Verify
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
