import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
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
import { WithDrawRequest } from "../../../Redux/Action/WalletAction";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";

const AddBankDetails = ({ navigation, route }) => {
  const [error, setError] = useState("");
  const [bankError, setBankError] = useState(false);
  const [accountNumberError, setaccountNumberError] = useState(false);
  const [IFSCError, setIFSCError] = useState(false);
  const [accountHolderError, setAccountHolderError] = useState(false);
  const coins = route?.params?.coins;

  const dispatch = useDispatch();
  const [bankDetails, setBankDetail] = useState({
    bankName: "",
    accountnumber: "",
    IFSC: "",
    accountholder: "",
  });
  const [newId, setnewId] = useState("");
  const User_ID = async () => {
    let data = await AsyncStorage.getItem("UserId");

    setnewId(data);
  };
  useEffect(() => {
    User_ID();
  }, []);
  const onSubmit = () => {
    if (bankDetails.bankName == "") {
      setBankError("Bank Name is Required!!");
    }
    if (bankDetails.accountnumber == "") {
      setaccountNumberError("Account number is Required!");
    }
    if (bankDetails.IFSC == "") {
      setIFSCError("IFSC Required!");
    }
    if (bankDetails.accountholder == "") {
      setAccountHolderError("Account Holder Name is Required!");
    } else {
      const PayloadData = {
        notes: `${"BankTransfer"},${bankDetails.bankName},${
          bankDetails.accountnumber
        },${bankDetails.IFSC},${bankDetails.accountholder}`,
        accountnumber: bankDetails.accountholder,
        amount: coins,
        user_id: newId,
        type_id: 1,
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
              {String.AddYourBankAccount}
            </Text>
          </View>
          <Divider />
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Text style={styles.textStyle}>{String.AddDetails}</Text>
          </View>
          <View style={styles.viewStyle}>
            <Text style={styles.textStyle}>{String.BankName}</Text>

            <TextInput
              style={styles.TextInputStyle}
              value={bankDetails.bankName}
              onChangeText={(text) => {
                setBankDetail(
                  { ...bankDetails, bankName: text },
                  setBankError("")
                );
              }}
              autoCapitalize="characters"
            />
            <Text style={styles.errorStyle}>{bankError}</Text>
          </View>
          <View style={styles.viewStyle}>
            <Text style={styles.textStyle}>{String.AccountNumber}</Text>

            <TextInput
              keyboardType="numeric"
              style={styles.TextInputStyle}
              value={bankDetails.accountnumber}
              onChangeText={(text) => {
                setBankDetail(
                  { ...bankDetails, accountnumber: text },
                  setaccountNumberError("")
                );
              }}
            />
            <Text style={styles.errorStyle}>{accountNumberError}</Text>
          </View>
          <View style={styles.viewStyle}>
            <Text style={styles.textStyle}>{String.IFSC}</Text>

            <TextInput
              style={styles.TextInputStyle}
              value={bankDetails.IFSC}
              onChangeText={(text) => {
                setBankDetail({ ...bankDetails, IFSC: text }, setIFSCError(""));
              }}
              autoCapitalize="characters"
            />
            <Text style={styles.errorStyle}>{IFSCError}</Text>
          </View>
          <View style={styles.viewStyle}>
            <Text style={styles.textStyle}>{String.AccountHolder}</Text>

            <TextInput
              style={styles.TextInputStyle}
              value={bankDetails.accountholder}
              onChangeText={(text) =>
                setBankDetail(
                  { ...bankDetails, accountholder: text },
                  setAccountHolderError("")
                )
              }
              autoCapitalize="characters"
            />
            <Text style={styles.errorStyle}>{accountHolderError}</Text>
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

export default AddBankDetails;

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

    color: colors.white,
    borderBottomColor: colors.aqua,
  },
  buttonView: {
    justifyContent: "center",
    alignItems: "center",
    margin: 30,

    elevation: 5,
    backgroundColor: colors.black,
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
    color: colors.red,
  },
});
