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

const Withdraw = ({ navigation }) => {
  const [coins, setCoins] = useState("");
  const [error, setError] = useState({ field: "", message: "" });
  const [value, setValue] = useState("");
  const [coinsError, setCoinsError] = useState(false);
  const handleInputChange = (text) => {
    setValue(text);
    setCoinsError(false);
  };
  const handleSubmit = () => {
    if (/^\d+$/.test(value) && value > 9) {
      setCoinsError(false);
      navigation.navigate("WithdrawDetails");
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
          backgroundColor: colors.gray,
          flexDirection: "row",
        }}
      >
        <TouchableOpacity
          style={{
            borderRadius: 30,
            height: 50,
            marginLeft: 10,
            marginTop: 5,
          }}
          onPress={() => navigation.goBack()}
        >
          <Ionicons
            name="arrow-back-circle-sharp"
            size={44}
            color={colors.white}
            style={{}}
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
          <Text style={{ color: colors.textcolor, fontSize: 25 }}>
            {String.Withdraw}
          </Text>
        </View>

        <View
          style={{
            flex: 1,
            backgroundColor: colors.black,
            // backgroundColor: "pink",
            height: "100%",
            width: "100%",
            borderWidth: 1,
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15,
            marginTop: 80,
            position: "absolute",
          }}
        >
          <View style={styles.walletConatiner}>
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
            <TouchableOpacity
              style={{
                justifyContent: "center",
                alignItems: "center",
                marginLeft: 20,
              }}
            ></TouchableOpacity>
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
                {String.WithdrawCoins}
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
              style={styles.input}
              placeholder={String.enterCoins}
              keyboardType="number-pad"
              placeholderTextColor={colors.graycolor}
            />

            <Text style={{ color: colors.red, marginLeft: 15 }}>
              {coinsError}
            </Text>

            <Text style={styles.inputbottom}>{String.Minimum}</Text>
          </View>
          <TouchableOpacity onPress={handleSubmit}>
            <View style={styles.withDrawbutton}>
              <Text
                style={{ color: colors.white, fontSize: 20, fontWeight: 500 }}
              >
                {String.WithdrawCoins}
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

export default Withdraw;
const styles = StyleSheet.create({
  walletConatiner: {
    flexDirection: "row",
    backgroundColor: colors.wallet,
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
    borderColor: colors.black,
    borderWidth: 1,
  },
  withDrawContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },

  input: {
    marginTop: 30,
    backgroundColor: colors.black,
    borderBottomColor: colors.gray,
    borderColor: colors.black,

    color: colors.textcolor,
    placeholderTextColor: colors.textcolor,
    fontSize: 16,

    height: 60,
    margin: 12,
    borderWidth: 5,
    padding: 10,
  },
  inputbottom: {
    marginTop: 5,
    color: colors.white,
    alignSelf: "center",
    fontSize: 20,
  },
  withDrawbutton: {
    backgroundColor: colors.aqua,
    marginTop: 30,
    height: 50,
    width: "50%",
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",

    shadowColor: colors.shadowColor,
    shadowOpacity: 0.6,
    shadowRadius: 2,

    shadowOffset: { width: 0, height: 3 },
  },
});
