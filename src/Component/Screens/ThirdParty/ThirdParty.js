import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Linking,
} from "react-native";
import { colors } from "../../utils/colors";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { String } from "../../utils/String";
import { TextInput } from "react-native-gesture-handler";
import { ThirdPartyTransactionAction } from "../../../Redux/Action/WalletAction";
import { useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const amoutRegex = /^[0-9]+$/;

const ThirdParty = ({ navigation }) => {
  const [email, setEmail] = useState();
  const [amount, setAmouts] = useState();
  const [emailError, setEmailError] = useState();
  const [amoutError, setEmountError] = useState();
  const dispatch = useDispatch();
  const [newId, setnewId] = useState("");
  const User_ID = async () => {
    let data = await AsyncStorage.getItem("UserId");
    setnewId(data);
  };

  useEffect(() => {
    User_ID();
  }, []);

  const validateEmail = () => {
    if (email == "") {
      setEmailError("Invalid email address");
    }
    if (amount == "") {
      setEmountError("Please enter a valid number");
    }

    const PayloadData = {
      notes: `${"ThirdParty"}:${email}`,
      amount: amount,
      user_id: newId,
    };

    dispatch(ThirdPartyTransactionAction(PayloadData));
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
            top: 10,
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
          <Text style={{ color: colors.white, fontSize: 25, top: 10 }}>
            {String.ThirdParty}
          </Text>
        </View>

        <View
          style={{
            flex: 1,
            backgroundColor: colors.black,
            height: "100%",
            width: "100%",
            borderWidth: 1,
            marginTop: 80,
            position: "absolute",
          }}
        >
          <View>
            <Text style={styles.emailLable}>{String.Id}</Text>
            <TextInput
              placeholder="abc@gmail.com"
              style={styles.input}
              value={email}
              // onChangeText={setEmail}

              onChangeText={(text) => {
                setEmail(text), setEmailError();
              }}
              //onBlur={validateEmail}
            />
          </View>

          <Text style={{ color: colors.red, left: 20 }}>{emailError}</Text>

          <View>
            <Text style={styles.emailLable}>{String.Enter_Amout}</Text>
            <TextInput
              placeholder="More Than 100"
              keyboardType={"numeric"}
              style={styles.input}
              value={amount}
              //onBlur={handleBlur}
              onChangeText={(text) => {
                // setAmouts text , setEmountError());
                setAmouts(text), setEmountError();
              }}
            />
          </View>

          <Text style={{ color: colors.red, left: 20 }}>{amoutError}</Text>

          <TouchableOpacity onPress={validateEmail}>
            <View style={styles.button}>
              <Text style={{ color: colors.white, fontSize: 20 }}>
                {String.Submit}
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <View
          style={{
            position: "absolute",
            marginTop: 580,
            marginLeft: 350,
          }}
        >
          <TouchableOpacity
            style={styles.whatappWrapper}
            onPress={() => {
              Linking.openURL("http://api.whatsapp.com/send?phone=962");
            }}
          >
            <FontAwesome name="whatsapp" size={34} color={colors.white} />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ThirdParty;
const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: colors.black,
    color: colors.white,
    fontSize: 20,

    marginTop: 15,
    borderBottomColor: colors.aqua,
    borderWidth: 3,
  },
  emailLable: {
    fontSize: 20,
    borderRadius: 20,
    marginTop: 20,
    color: colors.white,
    marginLeft: 20,
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
  whatappWrapper: {
    height: 40,
    marginTop: "auto",
    width: 40,
    backgroundColor: colors.green,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "flex-end",
    right: 25,
  },
});
