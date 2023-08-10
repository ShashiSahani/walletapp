import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Text,
  TextInput,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { String } from "../../utils/String";
import { colors } from "../../utils/colors";
import { Divider } from "react-native-paper";
import { useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { WithDrawRequest } from "../../../Redux/Action/WalletAction";

const Upidetails = ({ navigation, route }) => {
  const [bankError, setBankError] = useState(false);
  const [paytm_numerError, setpaytm_numerError] = useState("");

  const [bankDetails, setBankDetail] = useState({
    Name: "",
    upiId: "",
  });
  const coins = route?.params?.coins;
  console.log("coins", coins);
  const [newId, setnewId] = useState("");
  const User_ID = async () => {
    let data = await AsyncStorage.getItem("UserId");
    console.log("data>>>>>>?", data);
    setnewId(data);
  };
  useEffect(() => {
    User_ID();
  }, []);
  const dispatch = useDispatch();
  const onSubmit = () => {
    if (bankDetails.Name == "") {
      setBankError(" Name is Required!!");
    }
    if (bankDetails.upiId == "") {
      setpaytm_numerError("UPI ID  is required");
    } else {
      const PayloadData = {
        notes: `${"UPI"},${bankDetails?.Name},${bankDetails?.PhonepayNumber}`,
        amount: coins,
        user_id: newId,
        type_id: 2,
      };
      dispatch(
        WithDrawRequest(PayloadData),
        navigation.navigate("WithdrawDetails")
      );
    }
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.aqua }}>
      <StatusBar animated={true} />

      <View
        style={{
          backgroundColor: colors.black,
          height: "100%",
          borderWidth: 1,
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
          top: 40,
        }}
      >
        <ScrollView
          style={{
            backgroundColor: colors.black,
            height: "100%",
            top: -30,
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            position: "absolute",
            width: "100%",
          }}
        >
          <View
            style={{
              width: 50,
              height: 70,
              justifyContent: "center",
              alignItems: "center",
              alignSelf: "flex-end",
              right: 10,
            }}
          >
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <AntDesign name="closecircleo" size={34} color={colors.white} />
            </TouchableOpacity>
          </View>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 20,
            }}
          >
            <Text
              style={{
                color: colors.white,
                fontSize: 18,
                fontWeight: 600,
              }}
            >
              {String.Add_UPI_ID}
            </Text>
          </View>
          <Divider />

          <View style={styles.viewStyle}>
            <Text style={styles.textStyle}>{String.Name}</Text>

            <TextInput
              style={styles.TextInputStyle}
              value={bankDetails.Name}
              onChangeText={(text) => {
                setBankDetail({ ...bankDetails, Name: text }, setBankError(""));
              }}
            />
            <Text style={styles.errorStyle}>{bankError}</Text>
          </View>
          <View style={styles.viewStyle}>
            <Text style={styles.textStyle}>{String.UPI_ID}</Text>

            <TextInput
              style={styles.TextInputStyle}
              value={bankDetails.upiId}
              onChangeText={(text) => {
                setBankDetail(
                  { ...bankDetails, upiId: text },
                  setpaytm_numerError("")
                );
              }}
            />
            <Text style={styles.errorStyle}>{paytm_numerError}</Text>
          </View>

          <View style={styles.buttonView}>
            <TouchableOpacity
              style={styles.buttonTouchable}
              onPress={() => {
                onSubmit();
              }}
            >
              <Text
                style={{
                  fontSize: 19,
                  fontWeight: "bold",
                  color: colors.white,
                }}
              >
                {String.Submit}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  viewStyle: {
    justifyContent: "center",
    left: 20,
    top: 10,
  },
  textStyle: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 300,
    top: 10,
  },
  TextInputStyle: {
    height: 30,
    margin: 12,
    borderWidth: 3,
    padding: 5,
    right: 15,
    borderColor: colors.black,
    width: "90%",
    borderRadius: 5,
    color: colors.white,
    borderBottomColor: colors.aqua,
  },
  buttonView: {
    justifyContent: "center",
    alignItems: "center",
    margin: 30,

    borderRadius: 0,
  },
  buttonTouchable: {
    height: 50,
    width: "50%",
    borderColor: colors.aqua,
    borderWidth: 5,
    backgroundColor: colors.aqua,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  errorStyle: {
    color: "red",
  },
});

export default Upidetails;
