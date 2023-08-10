import { StatusBar } from "expo-status-bar";
import React, { useRef, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { colors } from "../../../utils/colors";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import PhoneInput from "react-native-phone-number-input";
import { String } from "../../../utils/String";
import { useDispatch, useSelector } from "react-redux";
import {
  registrationClick,
  sendOtp,
} from "../../../../Redux/Action/AuthAction";
import Otp from "../Otp/Otp";
import { color } from "react-native-reanimated";
const Register = ({ navigation }) => {
  const dispatch = useDispatch();
  const [value, setValue] = useState("");
  const [formattedValue, setFormattedValue] = useState("");
  const [valid, setValid] = useState(false);
  const [showPassword, setshowPassword] = useState(false);
  const [showPassword1, setshowPassword1] = useState(false);
  const [User, setUser] = useState({
    name: "",
    email: "",
    country_code: 91,
    phone: "",
    password: "",
    confirmPassword: "",
    country: 101,
  });
  const [name, setNameError] = useState("");
  const [email, setEmailError] = useState("");
  const [countrycode, setCountyCodeError] = useState("");
  const [phone, setPhoneError] = useState("");
  const [password, setpassWordError] = useState("");
  const [confirmPassword, setConfirmpassWordError] = useState("");

  const userData = () => {
    const Data = useSelector((state) => console.log("state", state));
  };
  userData();
  const passwordClick = () => {
    setshowPassword(!showPassword);
  };
  const passwordClick1 = () => {
    setshowPassword1(!showPassword1);
  };
  const onSubmit = (values) => {
    var reg =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (User.name == "") {
      setNameError("Name is required !");
    }
    if (reg.test(email)) {
      setEmailError("Invalid Email Address");
    } //

    if (User.phone == "") {
      setPhoneError("Phone No is required !");
    }
    if (User.country_code == "") {
      setCountyCodeError("please select Country code");
    }
    if (User.password == "" && User.password.length < 6) {
      setpassWordError("Password must be at least 6 characters !");
    }
    if (User.confirmPassword != User.password) {
      setConfirmpassWordError("Passwords not match");
    }
    if (User.confirmPassword == "") {
      setConfirmpassWordError("Please Enter Confirmation Password");
    } else {
      const payload = {
        name: User.name,
        email: User.email,
        country_code: User.country_code,
        phone: User.phone,
        password: User.password,
        country: User.country,
      };
      if (payload) {
        dispatch(registrationClick(payload));
      }
    }
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.aqua }}>
      <View>
        <ScrollView
          style={{
            backgroundColor: colors.black,
            height: "100%",
            marginTop: 40,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
            style={{
              marginTop: 20,
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
              {String.Register}
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
              {String.Name}
            </Text>

            <View style={{ marginTop: 5 }}>
              <TextInput
                style={styles.textInputStyle}
                placeholder={String.Name}
                keyboardType="numeric"
                placeholderTextColor={colors.white}
                value={User.name}
                onChangeText={(text) => {
                  setUser({ ...User, name: text }, setNameError());
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
              {name}
            </Text>
          </View>
          <View style={{ marginTop: 10 }}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "400",
                color: colors.white,
                left: 12,
              }}
            >
              {String.Email_id}
            </Text>

            <View style={{ marginTop: 5 }}>
              <TextInput
                style={styles.textInputStyle}
                placeholder={String.Email_id}
                keyboardType="numeric"
                placeholderTextColor={colors.white}
                value={User.email}
                onChangeText={(text) => {
                  setUser({ ...User, email: text }, setEmailError());
                }}
              />
            </View>
            <Text
              style={{
                color: colors.red,
                justifyContent: "flex-start",
                alignItems: "flex-start",
                marginLeft: 20,
                margin: 5,
              }}
            >
              {email}
            </Text>
          </View>
          <View style={{ marginTop: 10 }}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "400",
                color: colors.white,
                left: 12,
              }}
            >
              {String.Mobile_number}
            </Text>
            <View style={{ marginTop: 10 }}>
              <PhoneInput
                defaultValue={User.phone}
                defaultCode="IN"
                layout="first"
                onChangeText={(text) => {
                  setUser({ ...User, phone: text }, setPhoneError());
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
                  borderWidth: 3,
                }}
                textInputStyle={{
                  borderColor: colors.aqua,
                  color: colors.white,
                }}
                countryPickerButtonStyle={{
                  backgroundColor: colors.black,
                  borderColor: colors.aqua,
                  borderWidth: 3,
                }}
              />
            </View>
            <Text
              style={{
                color: colors.red,
                justifyContent: "flex-start",
                alignItems: "flex-start",
                marginLeft: 20,
                margin: 5,
              }}
            >
              {phone}
            </Text>
          </View>
          <View style={{ marginTop: 10 }}>
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
                style={styles.textInputStyle}
                placeholder={String.Password}
                keyboardType="numeric"
                placeholderTextColor={colors.white}
                secureTextEntry={showPassword ? true : false}
                value={User.password}
                onChangeText={(text) => {
                  setUser({ ...User, password: text }, setpassWordError());
                }}
              />
            </View>
            <Text
              style={{
                color: colors.red,
                justifyContent: "flex-start",
                alignItems: "flex-start",
                marginLeft: 20,
                margin: 5,
              }}
            >
              {password}
            </Text>
            <TouchableOpacity
              onPress={passwordClick}
              style={{
                alignItems: "flex-end",
                right: 40,
                position: "absolute",
                top: 55,
              }}
            >
              {showPassword ? (
                <Entypo name="eye-with-line" size={24} color={colors.aqua} />
              ) : (
                <Entypo name="eye" size={24} color={colors.aqua} />
              )}
            </TouchableOpacity>
          </View>
          <View style={{ marginTop: 10 }}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "400",
                color: colors.white,
                left: 12,
              }}
            >
              {String.Confirm_password}
            </Text>

            <View style={{ marginTop: 10 }}>
              <TextInput
                style={styles.textInputStyle}
                placeholder={String.Confirm_password}
                keyboardType="numeric"
                placeholderTextColor={colors.white}
                secureTextEntry={showPassword1 ? true : false}
                value={User.confirmPassword}
                onChangeText={(text) => {
                  setUser(
                    { ...User, confirmPassword: text },
                    setConfirmpassWordError()
                  );
                }}
              />
            </View>
            <Text
              style={{
                color: colors.red,
                justifyContent: "flex-start",
                alignItems: "flex-start",
                marginLeft: 20,
                margin: 5,
              }}
            >
              {confirmPassword}
            </Text>
            <TouchableOpacity
              onPress={passwordClick1}
              style={{
                alignItems: "flex-end",
                right: 40,
                position: "absolute",
                top: 55,
              }}
            >
              {showPassword1 ? (
                <Entypo name="eye-with-line" size={24} color={colors.aqua} />
              ) : (
                <Entypo name="eye" size={24} color={colors.aqua} />
              )}
            </TouchableOpacity>
          </View>

          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              margin: 30,
              marginBottom: 30,
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
                marginBottom: 30,
              }}
            >
              <Text
                style={{
                  fontSize: 19,
                  fontWeight: "bold",
                  color: colors.white,
                }}
              >
                {String.Register}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  textInputStyle: {
    height: 40,
    margin: 12,
    borderWidth: 3,
    padding: 10,
    borderColor: colors.aqua,
    width: "90%",
    borderRadius: 5,
    color: colors.white,
  },
});

export default Register;
