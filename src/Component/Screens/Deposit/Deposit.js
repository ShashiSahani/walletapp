import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Linking,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { String } from "../../utils/String";
import { TextInput } from "react-native-gesture-handler";
import { colors } from "../../utils/colors";
import { ColorPropType } from "deprecated-react-native-prop-types";
import { shadow } from "react-native-paper";

const Deposit = ({ navigation }) => {
  const [value, setValue] = useState("");
  const [conisError, setCoinsError] = useState(false);

  const handleInputChange = (text) => {
    setValue(text);
    setCoinsError(false);
  };
  const handleSubmit = () => {
    if (/^\d+$/.test(value) && value > 9) {
      setCoinsError(false);
      navigation.navigate("PaymentMethhod");
    }
    if (!(value > 9)) {
      setCoinsError("Coins should be 10 or More then 10");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar />
      <View
        style={{
          height: "100%",
          backgroundColor: colors.aqua,
          flexDirection: "row",
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            marginTop: 5,
            marginLeft: 10,
            alignItems: "center",

            borderRadius: 50,
            height: 50,
          }}
        >
          <Ionicons
            name="arrow-back-circle-sharp"
            size={44}
            color={colors.white}
          />
        </TouchableOpacity>

        <View
          style={{
            flex: 1,
            alignItems: "center",
            top: 10,
            right: 28,
          }}
        >
          <Text style={{ color: colors.white, fontSize: 25 }}>
            {String.Deposit}
          </Text>
        </View>

        <View
          style={{
            flex: 1,
            backgroundColor: colors.black,
            height: "100%",
            width: "100%",
            borderWidth: 1,
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15,
            marginTop: 80,
            position: "absolute",
          }}
        >
          <View style={styles.depositConatiner}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <FontAwesome5
                name="coins"
                size={45}
                color={colors.white}
                style={{ right: 10 }}
              />

              <Text style={{ color: colors.blueText, fontSize: 20, left: 5 }}>
                {String.Wallet_Balance}
              </Text>
            </View>
          </View>

          <View style={styles.totalBalance}>
            <View style={{ flexDirection: "row", top: 20 }}>
              <View
                style={{
                  backgroundColor: colors.white,
                  height: 2,
                  flex: 1,
                  alignSelf: "center",
                }}
              />
              <Text
                style={{
                  alignSelf: "center",
                  paddingHorizontal: 5,
                  fontSize: 24,
                  color: colors.white,
                }}
              >
                {String.Deposit_Coins}
              </Text>
              <View
                style={{
                  backgroundColor: colors.white,
                  height: 2,
                  flex: 1,
                  alignSelf: "center",
                }}
              />
            </View>
          </View>
          <View>
            <TextInput
              value={value}
              onChangeText={handleInputChange}
              keyboardType="numeric"
              style={styles.input}
              placeholder={String.enterCoins}
              placeholderTextColor={colors.graycolor}
            />
            

            <Text style={{ color: colors.red, marginLeft: 15 }}>
              {conisError}
            </Text>

            <Text style={styles.inputbottom}>{String.Minimum_Deposit}</Text>
          </View>
          <TouchableOpacity onPress={handleSubmit}>
            <View style={styles.dipositButton}>
              <Text style={{ color: colors.white, fontSize: 20 }}>
                {String.Deposit_Coins}
              </Text>
            </View>
          </TouchableOpacity>
          <View
            style={{
              position: "absolute",
              marginTop: 580,
              marginLeft: 350,
            }}
          >
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
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Deposit;
const styles = StyleSheet.create({
  depositConatiner: {
    flexDirection: "row",
    backgroundColor: colors.graycolor,
    borderWidth: 1,
    borderColor: colors.black,
    marginLeft: "auto",
    marginRight: "auto",
    width: "80%",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: colors.shadowColor,
    shadowOpacity: 0.9,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 4 },
    height: "20%",
    color: colors.white,
    marginTop: -20,
  },
  withDraw: {
    shadowColor: colors.shadowColor,
    shadowOpacity: 0.2,
    shadowRadius: 3,
    marginTop: 50,
    shadowOpacity: 0.9,
    shadowOffset: { width: 1, height: 4 },
  },
  input: {
    marginTop: 30,
    backgroundColor: colors.black,
    color: colors.white,
    fontSize: 16,

    height: 60,
    margin: 12,
    borderWidth: 3,
    padding: 10,
    borderBottomColor: colors.aqua,
    borderColor: colors.black,
  },
  inputbottom: {
    marginTop: 5,
    color: colors.white,
    alignSelf: "center",
    fontSize: 20,
  },
  dipositButton: {
    backgroundColor: colors.aqua,
    marginTop: 30,
    height: 50,
    width: "50%",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    shadowColor: colors.white,
    shadowOpacity: 0.6,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 3 },
  },
});
