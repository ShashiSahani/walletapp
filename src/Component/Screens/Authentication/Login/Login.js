import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  Modal,
  ScrollView,
} from "react-native";
import { colors } from "../../../utils/colors";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import PhoneInput from "react-native-phone-number-input";
import { String } from "../../../utils/String";
import { useDispatch, useSelector } from "react-redux";
import {
  loginClick,
  LoginStatus,
  LogoutStatus,
  sendOtp,
} from "../../../../Redux/Action/AuthAction";
import OTPInputView from "@twotalltotems/react-native-otp-input";
import { SendOtpApi } from "../../../../Redux/api/authApi";

const Login = ({ navigation }) => {
  const dispatch = useDispatch();
  const sendOtpstate = useSelector((state) => state?.user?.userDetail);
  console.log("sendOtpstate", sendOtpstate);
  const [formattedValue, setFormattedValue] = useState("");
  const [showPassword, setshowPassword] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible1, setModalVisible1] = useState(false);

  const [indication, setIndication] = useState(false);
  const [error, setError] = useState("");
  const [passwordError, setpasswordError] = useState("");
  const [user, setUser] = useState({
    phone: "",
    password: "",
  });
  const [modaltext, setModaltext] = useState("");
  const [modaltextError, setModaltextError] = useState("");
  const [confirmationpassword, setconfirmationpassword] = useState("");

  const countries = useSelector((state) => console.log(state));
  console.log("countries", countries);

  const passwordClick = () => {
    setshowPassword(!showPassword);
  };

  const token = useSelector(
    (state) => state?.user?.loginData?.data?.data[0]?.token
  );

  const onSubmit = () => {
    if (user.password == "") {
      setpasswordError("plaese Enter A password !.");
    }
    if (user.phone == "") {
      setError("Phone no is required !");
    }

    dispatch(
      loginClick({
        phone: user.phone,
        password: user.password,
      })
    );
    setIndication(false);
  };

  const forgotPasswordResponce = useSelector(
    (state) => state?.user?.forgotPassRespState?.data
  );
  console.log("forgotPasswordResponce", forgotPasswordResponce);

  useEffect(() => {
    if (token == undefined || null || "") {
      dispatch(LoginStatus(true));
    } else {
      dispatch(LoginStatus(false));
    }
  }, [token]);

  useEffect(() => {
    if (token == undefined || null || "") {
      dispatch(LogoutStatus(true));
    } else {
      dispatch(LogoutStatus(false));
    }
  }, [token]);
  //const userData = useSelector((state) => state?.user?.data?.data?.data);
  const userData = useSelector((state) => console.log("tate", state));

  console.log("userData", userData);
  const Otpmodal = () => {
    return (
      <Modal
        animationType="slide"
        //animationInTiming = {13900}
        transparent={true}
        visible={modalVisible1}
        // animationOut = "slide"
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        <OTPInputView
          style={{ width: "80%", height: 200 }}
          pinCount={6}
          // code={this.state.code} //You can supply this prop or not. The component will be
          // used as a controlled / uncontrolled component respectively.
          // onCodeChanged = {code => { this.setState({code})}}
          autoFocusOnLoad
          codeInputFieldStyle={styles.underlineStyleBase}
          codeInputHighlightStyle={styles.underlineStyleHighLighted}
          onCodeFilled={(code) => {
            console.log(`Code is ${code}, you are good to go!`);
          }}
          keyboardType="number-pad"
        />
      </Modal>
    );
  };

  const handleCloseModal = () => {
    setModalVisible1();
  };
  const ModalOpne = () => {
    if (modaltext == "") {
      setModaltextError("plaese Enter A password !.");
    } else {
      const paylaod = {
        email: modaltext,
      };
      console.log("payload", paylaod);

      dispatch(
        sendOtp(paylaod),
        setTimeout(() => {
          navigation.navigate("Otp", handleCloseModal());
        }, 3000)
      );
    }
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.aqua }}>
      <StatusBar animated={true} backgroundColor="white" />
      <View>
        <ScrollView
          style={{
            backgroundColor: colors.black,
            height: "100%",
            marginTop: 40,
          }}
        >
          <Modal
            animationType="slide"
            //animationInTiming = {13900}
            transparent={true}
            visible={modalVisible}
            // animationOut = "slide"
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
            }}
          >
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                marginTop: 22,
              }}
            >
              <View style={styles.modalView}>
                <View
                  style={{
                    justifyContent: "flex-end",
                    alignItems: "flex-end",
                    right: 10,
                    top: 5,
                  }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      setModalVisible(!modalVisible);
                    }}
                  >
                    <AntDesign
                      name="closecircleo"
                      size={24}
                      color={colors.white}
                    />
                  </TouchableOpacity>
                </View>
                <Text style={styles.modalText}>{String.Enter_Mail_ID}.</Text>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "600",
                    color: colors.white,
                    left: 30,
                    top: 5,
                  }}
                >
                  {String.Email_id}
                </Text>

                <View style={{}}>
                  <TextInput
                    style={{
                      height: 40,
                      margin: 12,
                      borderWidth: 3,
                      padding: 5,
                      borderColor: colors.black,
                      borderBottomColor: colors.aqua,
                      width: "80%",
                      justifyContent: "center",
                      alignSelf: "center",

                      color: colors.white,
                    }}
                    value={modaltext}
                    onChangeText={(value) => {
                      setModaltext(value), setModaltextError();
                    }}
                    placeholder={String.Password}
                    placeholderTextColor={colors.white}
                  />

                  <Text
                    style={{
                      color: colors.red,
                      justifyContent: "flex-start",
                      alignItems: "flex-start",
                      marginLeft: 20,
                      margin: 2,
                      left: 25,
                    }}
                  >
                    {modaltextError}
                  </Text>
                </View>
                <TouchableOpacity
                  style={{ ...styles.openButton, backgroundColor: colors.aqua }}
                  onPress={() => {
                    ModalOpne();
                    setModalVisible1(true);
                  }}
                >
                  <Text style={styles.textStyle}>{String.Submit}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
          <View style={{}}>
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}
              style={{
                marginTop: 10,
                justifyContent: "flex-end",
                alignItems: "flex-end",
                right: 10,
              }}
            >
              <AntDesign name="closecircleo" size={30} color={colors.white} />
            </TouchableOpacity>
            <View style={{ marginTop: 50 }}>
              <Text
                style={{
                  fontSize: 30,
                  fontWeight: "400",
                  color: colors.white,
                  left: 12,
                }}
              >
                {String.Login}
              </Text>
            </View>
            <View style={{ marginTop: 30 }}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "400",
                  color: colors.white,
                  left: 12,
                }}
              >
                {String.Phone_Number}
              </Text>
              <View style={{ marginTop: 10 }}>
                <PhoneInput
                  defaultValue={user.phone}
                  defaultCode="IN"
                  layout="first"
                  onChangeText={(text) => {
                    setUser({ ...user, phone: text }, setError());
                  }}
                  onChangeFormattedText={(text) => {
                    setFormattedValue(text);
                  }}
                  codeTextStyle={{ color: colors.white }}
                  withDarkTheme
                  withShadow
                  autoFocus
                  containerStyle={{ width: "90%", left: 15 }}
                  textContainerStyle={{
                    backgroundColor: colors.black,
                    borderColor: colors.aqua,
                    borderWidth: 2,
                  }}
                  textInputStyle={{
                    borderColor: colors.white,
                    color: colors.white,
                  }}
                  countryPickerButtonStyle={{
                    backgroundColor: colors.black,
                    borderColor: colors.aqua,
                    borderWidth: 2,
                  }}
                />
              </View>

              <Text
                style={{
                  color: "red",
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                  marginLeft: 20,
                  margin: 5,
                }}
              >
                {error}
              </Text>
            </View>
            <View style={{ marginTop: 30 }}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "400",
                  color: colors.white,
                  left: 12,
                }}
              >
                {String.Password}
              </Text>

              <View style={{ marginTop: 10 }}>
                <TextInput
                  style={{
                    height: 50,
                    margin: 12,
                    borderWidth: 2,
                    padding: 10,
                    borderColor: colors.aqua,
                    width: "90%",
                    color: colors.white,
                  }}
                  value={user.password}
                  onChangeText={(text) => {
                    setUser({ ...user, password: text }, setpasswordError());
                  }}
                  placeholder={String.Password}
                  placeholderTextColorF={colors.white}
                  secureTextEntry={showPassword ? true : false}
                />
              </View>
              <Text
                style={{
                  color: "red",
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                  marginLeft: 20,
                  margin: 5,
                }}
              >
                {passwordError}
              </Text>
              <TouchableOpacity
                onPress={passwordClick}
                style={{
                  alignItems: "flex-end",
                  right: 40,
                  position: "absolute",
                  top: 60,
                }}
              >
                {showPassword ? (
                  <Entypo name="eye-with-line" size={24} color={colors.aqua} />
                ) : (
                  <Entypo name="eye" size={24} color={colors.aqua} />
                )}
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              onPress={() => {
                setModalVisible(true);
              }}
              style={{ alignItems: "flex-end", marginTop: 5, right: 20 }}
            >
              <Text
                style={{ fontSize: 20, color: colors.white, fontWeight: "400" }}
              >
                {String.ForgotPassword}
              </Text>
            </TouchableOpacity>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                margin: 30,
              }}
            >
              <TouchableOpacity
                onPress={() => onSubmit()}
                style={{
                  height: 50,
                  width: "70%",
                  borderColor: colors.aqua,
                  borderWidth: 5,
                  backgroundColor: colors.aqua,
                  borderRadius: 5,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: 19,
                    fontWeight: "bold",
                    color: colors.black,
                  }}
                >
                  {String.Login_Capital}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  modalView: {
    margin: 20,
    backgroundColor: colors.black,
    borderRadius: 20,
    height: 230,
    width: "65%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    width: "50%",
    alignSelf: "center",
    justifyContent: "center",
  },
  textStyle: {
    color: colors.white,
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    textAlign: "center",
    fontSize: 16,

    fontWeight: "500",
    marginTop: 10,
    color: colors.white,
  },
  borderStyleBase: {
    width: 30,
    height: 45,
  },

  borderStyleHighLighted: {
    borderColor: "#03DAC6",
  },

  underlineStyleBase: {
    width: 30,
    height: 45,
    borderWidth: 0,
    borderBottomWidth: 1,
  },

  underlineStyleHighLighted: {
    borderColor: "#03DAC6",
  },
});

export default Login;
