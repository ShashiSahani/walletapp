import React, { useEffect, useState } from "react";
import { View, StyleSheet, Image, Text, Keyboard } from "react-native";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import { SimpleLineIcons } from "@expo/vector-icons";
import { DrawerActions } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { String } from "../../utils/String";
import { colors } from "../../utils/colors";
import { TouchableOpacity } from "react-native-gesture-handler";
import Toast, { BaseToast } from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Clipboard from "expo-clipboard";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

const toastConfig = {
  /*
    Overwrite 'success' type,
    by modifying the existing `BaseToast` component
  */
  success: (props) => (
    <View
      style={{
        height: 60,
      }}
    >
      <BaseToast
        {...props}
        style={{
          borderLeftColor: colors.aqua,
          backgroundColor: colors.aqua,
          alignItems: "center",
          justifyContent: "center",
          width: "80%",
        }}
        contentContainerStyle={{}}
        text1Style={{
          fontSize: 15,
          fontWeight: "600",
          color: colors.white,
        }}
        text2Style={{
          color: colors.white,
        }}
      />
    </View>
  ),
};

const CustomSidebarMenu = ({ navigation, props }) => {
  const [text, setText] = useState();
  const [newId, setnewId] = useState("");
  const navigations = useNavigation();

  const userData = useSelector((state) => state.user?.userDetail);
  const User_ID = async () => {
    let data = await AsyncStorage.getItem("UserId");
    console.log("data>>>>>>?", data);
    setnewId(data);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    Clipboard.setStringAsync(text);

    //removeToken()
    User_ID();
  }, [userData, newId]);

  const handleCopy = async () => {
    await Clipboard.setStringAsync(text);
    alert("Copied to clipboard!");
  };

  const removeToken = async () => {
    try {
      await AsyncStorage.removeItem(
        "UserToken",
        navigation.navigate("MainScren")
      );
    } catch (err) {
      console.log(err);
    }
    Keyboard.dismiss();
  };
  return (
    <View style={{ flex: 1, marginTop: 50, backgroundColor: colors.Darkblack }}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={[styles.userInfoSection, { flexDirection: "row" }]}>
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "space-evenly",
                flexDirection: "row",
              }}
            >
              <Image
                source={require("../../../assets/newlogo.png")}
                style={{
                  height: 150,
                  width: 150,
                  borderRadius: 75,
                  borderWidth: 5,
                  borderColor: colors.sideBar,
                }}
              />
              <SimpleLineIcons
                name="close"
                size={34}
                color={colors.sideBar}
                style={{ marginTop: -180 }}
                onPress={() => navigation.dispatch(DrawerActions.closeDrawer())}
              />
            </View>
          </View>
          <View
            style={{
              height: 2,
              backgroundColor: colors.sideBar,
              marginTop: 20,
            }}
          ></View>
          <View
            style={{
              flex: 1,
              left: 20,
            }}
          >
            <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
              <View
                style={{
                  flexDirection: "row",
                  marginTop: 20,
                }}
              >
                <FontAwesome name="user" size={32} color={colors.sideBar} />
                <Text
                  style={{
                    color: colors.sideBar,
                    fontSize: 20,
                    marginLeft: 30,
                    fontWeight: "bold",
                  }}
                >
                  {String.Profile}
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Passbook")}>
              <View
                style={{
                  flexDirection: "row",

                  marginTop: 20,
                }}
              >
                <FontAwesome5
                  name="book-open"
                  size={28}
                  color={colors.sideBar}
                />

                <Text
                  style={{
                    color: colors.sideBar,
                    fontSize: 20,
                    marginLeft: 20,
                    fontWeight: "bold",
                  }}
                >
                  {String.Passbook2}
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: 20,
                }}
              >
                <FontAwesome5 name="tags" size={28} color={colors.sideBar} />
                <Text
                  style={{
                    color: colors.sideBar,
                    fontSize: 20,
                    marginLeft: 20,
                    fontWeight: "bold",
                  }}
                >
                  {String.ReferralCode}
                </Text>
              </View>
            </TouchableOpacity>
            <View></View>

            <TouchableOpacity
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginRight: 130,
                marginTop: 8,
                borderColor: colors.sideBar,
                left: 10,
              }}
              onPress={() => {
                Toast.show({
                  type: "success",
                  text1: "Copy!!",
                  text2: "Referral Code Copy ",
                  visibilityTime: 2000,
                  onShow: () => {},
                  onHide: () => {},
                  position: "bottom",
                });
              }}
            >
              <Text style={styles.copiedText}>{userData?.refer_code}</Text>
              <FontAwesome5
                name="copy"
                size={24}
                color={colors.sideBar}
                onPress={handleCopy}
              />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate("ContactUS")}>
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  marginTop: 20,
                }}
              >
                <FontAwesome5
                  name="question-circle"
                  size={30}
                  color={colors.sideBar}
                />
                <Text
                  style={{
                    color: colors.sideBar,
                    fontSize: 20,
                    marginLeft: 20,
                    fontWeight: "bold",
                  }}
                >
                  {String.TermsAndConditions}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            height: 2,
            backgroundColor: colors.sideBar,
            marginTop: 20,
          }}
        ></View>
        <TouchableOpacity
          onPress={() => {
            removeToken();
          }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              marginTop: 20,
              marginLeft: 20,
            }}
          >
            <AntDesign name="logout" size={28} color={colors.sideBar} />
            <Text
              style={{
                color: colors.sideBar,
                fontSize: 20,
                marginLeft: 25,

                fontWeight: "bold",
              }}
            >
              {String.Logout}
            </Text>
          </View>
        </TouchableOpacity>
        <Toast
          config={toastConfig}
          ref={(ref) => {
            Toast.setRef(ref);
          }}
        />
      </DrawerContentScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  copiedText: {
    marginTop: 10,
    color: colors.sideBar,
    fontSize: 16,
    fontWeight: 600,
    left: 9,
    top: -5,
  },
});

export default CustomSidebarMenu;
