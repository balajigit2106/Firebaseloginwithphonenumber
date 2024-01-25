import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  logincontainer: {
    alignItems: "center",
    marginTop: 90,
  },
  firebaseimage: {
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
  welcome_heading: {
    fontWeight: "600",
    fontSize: 24,
    marginBottom: 6,
  },
  welcometext: {
    color: "gray",
    marginBottom: 14,
  },
  mobile_inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
  },
  error_mobileinputContainer: {
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
  buttontext: {
    color: "white",
    fontWeight: "600",
  },
  loading_buttontext: {
    fontWeight: "700",
    color: "white",
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
  //verify
  otp_heading: {
    fontWeight: "600",
    fontSize: 20,
    marginBottom: 6,
  },
  otpcontainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    marginBottom: 5,
  },
  otpinput: {
    width: 40,
    height: 40,
    borderWidth: 2,
    borderColor: "gray",
    textAlign: "center",
    fontSize: 16,
  },
  error_otpinput: {
    width: 40,
    height: 40,
    borderWidth: 2,
    borderColor: "#d32f2f",
    textAlign: "center",
    fontSize: 16,
  },
  //logout
  logout_container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 48,
  },
  successtext: {
    fontWeight: "600",
    marginTop: 10,
    fontSize: 18,
  },
});
export default styles;
