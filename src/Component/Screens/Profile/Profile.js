import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Linking,
  TextInput,
  ActivityIndicator,
  Modal,
  Alert,
  Pressable,
  Image,
} from "react-native";
import { Entypo, FontAwesome } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Foundation } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { String } from "../../utils/String";
import { colors } from "../../utils/colors";

import { AntDesign } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GetUserDetails } from "../../../Redux/Action/AuthAction";
const Profile = ({ navigation }) => {
  const userDetail = useSelector((state) => state?.user.userDetail);

  const [newid, setnewId] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [hidePassword, setHidePassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [passwordInput, setPassWordInput] = useState({
    password: "",
    confirmPassword: "",
  });

  const passwordOnSubmit = () => {
    if (passwordInput.password == "") {
      setPasswordError("Password is Required!!");
    }
    if (passwordInput.confirmPassword == "") {
      setConfirmPasswordError("Comfirm Password is Required!");
    }
    if (passwordInput.password !== passwordInput.confirmPassword) {
      setConfirmPasswordError("Confirm password is not matched");
    } else {
      setConfirmPasswordError("");
    }
  };
  const dispatch = useDispatch();
  const User_ID = async () => {
    let data = await AsyncStorage.getItem("UserId");

    setnewId(data);
  };
  useEffect(() => {
    if (newid != undefined) {
      dispatch(GetUserDetails({ id: newid }));
      User_ID();
    }
  }, [newid]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.black }}>
      <StatusBar />
      <View style={{ backgroundColor: colors.aqua, height: "14%" }}>
        <View
          style={{
            flexDirection: "row",
            marginTop: 20,
          }}
        >
          <TouchableOpacity onPress={() => navigation.navigate("Dashboard")}>
            <Ionicons
              name="arrow-back-circle-outline"
              size={38}
              color={colors.white}
              style={{ marginLeft: 10 }}
            />
          </TouchableOpacity>
          <View
            style={{
              flex: 1,

              justifyContent: "center",
              alignItems: "center",
              marginRight: 50,
            }}
          >
            <Text
              style={{
                color: colors.white,
                fontSize: 20,
                fontWeight: "bold",
              }}
            >
              {String.Profile}
            </Text>
          </View>
        </View>
      </View>
      <View
        style={{
          flex: 1,
          // backgroundColor: "#17202A",
          backgroundColor: colors.black,
        }}
      >
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: 20,
          }}
        >
          <Image
            style={{
              color: colors.aqua,
              borderColor: colors.aqua,
              height: 70,
              width: 70,
              borderWidth: 3,
              borderRadius: 35,
            }}
            source={require("../../../assets/newlogo.png")}
          />
        </View>
        {userDetail ? (
          <View
            style={{
              marginTop: 20,
            }}
          >
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <TextInput
                style={styles.textInputStyle}
                value={userDetail.name}
              />
              <FontAwesome
                name="user-circle"
                size={24}
                color={colors.iconColor}
                style={styles.iconStyle}
              />
            </View>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <TextInput
                style={styles.textInputStyle}
                value={userDetail?.email}
              />
              <MaterialCommunityIcons
                name="email-mark-as-unread"
                size={30}
                color={colors.iconColor}
                style={styles.iconStyle}
              />
            </View>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <TextInput
                style={styles.textInputStyle}
                value={userDetail?.phone}
              />
              <Foundation
                name="telephone"
                size={25}
                color={colors.iconColor}
                style={styles.iconStyle}
              />
            </View>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TextInput
                style={styles.textInputStyle}
                value={`Member Since: ${userDetail?.created_at?.substr(0, 10)}`}
              />
            </View>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TextInput
                style={styles.textInputStyle}
                value={`Dealership : ${
                  userDetail?.as_dealer === "0" ? "Not Active" : "Active"
                }}`}
              />
            </View>
            <TouchableOpacity
              style={styles.button}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{ fontSize: 16, fontWeight: 400, color: colors.white }}
                >
                  {String.Changed_password}
                </Text>
              </View>
            </TouchableOpacity>
            <View>
              <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                  Alert.alert("Model has been closed");
                  setModalVisible(!modalVisible);
                }}
              >
                <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                    {/* close Icon in Mode  */}
                    <View style={styles.closecircleostyle}>
                      <Pressable onPress={() => setModalVisible(!modalVisible)}>
                        <AntDesign
                          name="closecircleo"
                          size={24}
                          color={colors.textcolor}
                        />
                      </Pressable>
                    </View>
                    <View>
                      <Text
                        style={{
                          justifyContent: "center",
                          alignItems: "center",
                          alignSelf: "center",
                          color: colors.textcolor,
                          fontSize: 14,
                          fontWeight: "bold",
                        }}
                      >
                        {String.Enter_Details_Create_new_password}
                      </Text>
                      <View
                        style={{
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <TextInput
                          style={styles.textInputStyle}
                          placeholder={String.newPassword}
                          placeholderTextColor={colors.textcolor}
                          secureTextEntry={hidePassword ? true : false}
                          value={passwordInput.password}
                          onChangeText={(text) =>
                            setPassWordInput(
                              { ...passwordInput, password: text },
                              setPasswordError("")
                            )
                          }
                        />
                        <View
                          style={{
                            position: "absolute",
                            justifyContent: "flex-end",
                            right: 25,
                          }}
                        >
                          {hidePassword ? (
                            <Entypo
                              name="eye-with-line"
                              size={24}
                              color={colors.aqua}
                              onPress={() => setHidePassword(!hidePassword)}
                            />
                          ) : (
                            <Entypo
                              name="eye"
                              size={24}
                              color={colors.aqua}
                              onPress={() => setHidePassword(!hidePassword)}
                            />
                          )}
                        </View>
                        {passwordInput ? (
                          <Text style={{ color: colors.red }}>
                            {passwordError}
                          </Text>
                        ) : null}
                      </View>
                      <View
                        style={{
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <TextInput
                          style={styles.textInputStyle}
                          placeholder={String.comfirmPassword}
                          placeholderTextColor={colors.textcolor}
                          secureTextEntry={hidePassword ? true : false}
                          value={passwordInput.confirmPassword}
                          onChangeText={(text) =>
                            setPassWordInput(
                              { ...passwordInput, confirmPassword: text },
                              setConfirmPasswordError("")
                            )
                          }
                        />
                        {confirmPasswordError ? (
                          <Text style={{ color: colors.red }}>
                            {confirmPasswordError}
                          </Text>
                        ) : null}
                        <View
                          style={{
                            position: "absolute",
                            justifyContent: "flex-end",
                            right: 25,
                          }}
                        >
                          {hidePassword ? (
                            <Entypo
                              name="eye-with-line"
                              size={24}
                              color={colors.aqua}
                              onPress={() => setHidePassword(!hidePassword)}
                            />
                          ) : (
                            <Entypo
                              name="eye"
                              size={24}
                              color={colors.aqua}
                              onPress={() => setHidePassword(!hidePassword)}
                            />
                          )}
                        </View>
                      </View>
                      <View
                        style={{
                          justifyContent: "space-evenly",
                          alignItems: "center",
                          alignSelf: "center",
                          flexDirection: "row",
                        }}
                      >
                        <TouchableOpacity
                          onPress={() => setModalVisible(!modalVisible)}
                        >
                          <View style={styles.cancelButton}>
                            <Text
                              style={{
                                fontSize: 12,
                                fontWeight: 600,
                                color: colors.white,
                              }}
                            >
                              {String.Cancle}
                            </Text>
                          </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={passwordOnSubmit}>
                          <View style={styles.comfirmPasswordBotton}>
                            <Text
                              style={{
                                fontSize: 12,
                                fontWeight: 600,
                                color: colors.white,
                              }}
                            >
                              {String.Confirm_password}
                            </Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
              </Modal>
            </View>
          </View>
        ) : (
          <ActivityIndicator
            size="large"
            style={{
              flex: 1,
              justifyContent: "center",
            }}
          />
        )}
      </View>
      <View style={{ backgroundColor: colors.black }}>
        <TouchableOpacity
          style={{
            height: 40,
            marginTop: "auto",
            width: 40,
            backgroundColor: "#25D366",
            borderRadius: 40,
            alignItems: "center",
            justifyContent: "center",
            alignSelf: "flex-end",
            right: 25,
          }}
          onPress={() => {
            Linking.openURL("http://api.whatsapp.com/send?phone=962");
          }}
        >
          <FontAwesome name="whatsapp" size={34} color={colors.white} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Profile;
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 2,
  },
  closecircleostyle: {
    top: 20,
    right: 10,
    alignItems: "flex-end",
    marginBottom: 30,
  },
  modalView: {
    margin: 20,
    top: 10,
    backgroundColor: colors.black,
    borderColor: colors.aqua,
    borderWidth: 1,

    shadowOffset: { width: -2, height: 100 },
    shadowColor: "#fff",
    shadowOpacity: 0.9,
    shadowRadius: 3,

    borderRadius: 20,
    width: 300,
    height: 350,

    shadowColor: "#fff",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },

  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  textInputStyle: {
    height: 50,
    margin: 12,
    width: "90%",
    borderWidth: 5,
    padding: 10,
    borderColor: colors.black,
    borderBottomColor: colors.aqua,
    color: colors.textcolor,
    fontSize: 18,
  },
  iconStyle: {
    alignItems: "flex-end",
    right: 40,
    position: "absolute",
    bottom: 25,
  },
  button: {
    backgroundColor: colors.aqua,
    marginTop: 30,
    height: 50,
    width: "50%",
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",

    shadowColor: colors.white,
    shadowOpacity: 0.6,
    shadowRadius: 2,

    shadowOffset: { width: 0, height: 3 },
  },
  cancelButton: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: colors.aqua,
    color: colors.white,
    borderWidth: 1,
    borderRadius: 15,
    width: 90,
    height: 40,
    right: 10,
    marginTop: 10,
  },
  comfirmPasswordBotton: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: colors.aqua,
    borderWidth: 1,
    borderRadius: 15,
    left: 10,
    width: 90,
    height: 40,
    marginTop: 10,
  },
});
