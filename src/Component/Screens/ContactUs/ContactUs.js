import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Linking,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { String } from "../../utils/String";
import { colors } from "../../utils/colors";
import * as WebBrowser from "expo-web-browser";
const ContactUS = ({ navigation }) => {
  const redirectToGmail = async () => {
    const url = "https://mail.google.com/mail/u/0/#inbox"; // replace with the appropriate account index

    const result = await WebBrowser.openBrowserAsync(url);

    if (result.type === "cancel") {
      console.log("Redirection cancelled");
    }
  };
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
              {String.ContactUS}
            </Text>
          </View>
        </View>
      </View>
      <View
        style={{
          flex: 1,
          backgroundColor: colors.black,
        }}
      >
        <TouchableOpacity onPress={redirectToGmail}>
          <View
            style={{ justifyContent: "center", alignItems: "center", top: 20 }}
          >
            <MaterialIcons
              name="quick-contacts-mail"
              size={35}
              color={colors.white}
            />
          </View>
        </TouchableOpacity>
        <Text
          style={{
            color: colors.white,
            marginTop: 40,
            justifyContent: "center",
            alignSelf: "center",
          }}
        >
          {String.Query}
        </Text>
        <View
          style={{
            height: 2,
            backgroundColor: colors.white,
            marginTop: 50,
          }}
        ></View>
        <View
          style={{ justifyContent: "center", alignItems: "center", top: 20 }}
        >
          <Text style={{ color: colors.white }}>
            {String.TermsAndConditions}
          </Text>
        </View>
      </View>
      <View style={{ backgroundColor: colors.black }}>
        <TouchableOpacity
          style={{
            height: 40,
            marginTop: "auto",
            width: 40,
            backgroundColor: colors.green,
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

export default ContactUS;
const styles = StyleSheet.create({});
