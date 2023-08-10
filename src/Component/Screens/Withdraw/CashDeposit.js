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
import SelectDropdown from "react-native-select-dropdown";
import { useDispatch, useSelector } from "react-redux";
import {
  GetCashDepositList,
  WithDrawRequest,
} from "../../../Redux/Action/WalletAction";
import { async } from "../../utils/ValidationSchema";
import AsyncStorage from "@react-native-async-storage/async-storage";
const CashDeposit = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const [addCashError, setAddCashError] = useState("");
  const [nameError, setNameError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [cityError, setCityError] = useState("");
  const [Name, setName] = useState("");

  const [user, setUser] = useState({
    fullname: "",
    phoneNumber: "",
    city: "",
    addCash: "",
  });
  const CashDepositList = useSelector(
    (state) => state?.CashDeposit?.CashDepositlist_data
  );
  const coins = route?.params?.coins;
  console.log("coins", coins);
  console.log("cashdeposite", CashDepositList);
  const [newId, setnewId] = useState("");
  const User_ID = async () => {
    let data = await AsyncStorage.getItem("UserId");
    console.log("data>>>>>>?", data);
    setnewId(data);
  };

  useEffect(() => {
    dispatch(GetCashDepositList());
    User_ID();
  }, []);
  const onSubmit = () => {
    if (user.addCash == "") {
      setAddCashError("Please Select the Option!");
    }
    if (user.fullname == "") {
      setNameError(" Name is Required!");
    }
    if (user.phoneNumber == "") {
      setPhoneError("Phone Number is Required!");
    }
    if (user.city == "") {
      setCityError("City is Required!");
    }
    if (user.addCash == "") {
      setAddCashError("Please select the option");
    } else {
      const PayloadData = {
        notes: `${"CashDepositTransfer"},${user?.addCash},${user?.fullname},${
          user?.phoneNumber
        },${user?.city}`,
        amount: coins,
        user_id: newId,
        type_id: 6,
      };
      dispatch(
        WithDrawRequest(PayloadData),
        navigation.navigate("WithdrawDetails")
      );
    }
  };
  const data = CashDepositList?.map((item) => {
    console.log(item.name);
    return item.name;
  });
  console.log(data);
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
              {String.CashDeposit}
            </Text>
          </View>
          <Divider />

          <View style={styles.viewStyle}>
            <Text style={styles.textStyle}>{String.AddNewCash}</Text>

            {/* drop down */}

            <SelectDropdown
              data={data}
              onSelect={(selectedItem, index) => {
                setUser({ ...user, addCash: selectedItem }, setAddCashError());
              }}
              buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem;
              }}
              rowTextForSelection={(item, index) => {
                return item;
              }}
              buttonStyle={styles.dropdownBtnStyle}
              buttonTextStyle={styles.dropdownBtnTxtStyle}
              renderDropdownIcon={(isOpened) => {
                return (
                  <AntDesign
                    name={isOpened ? "up" : "down"}
                    size={24}
                    color={colors.aqua}
                    style={{ left: 10 }}
                  />
                );
              }}
              dropdownIconPosition={"right"}
              dropdownStyle={styles.dropdownDropdownStyle}
              rowStyle={styles.dropdownRowStyle}
              rowTextStyle={styles.dropdownRowTxtStyle}
            />

            {user.addCash == "" || null ? (
              <Text style={styles.errorStyle}>{addCashError}</Text>
            ) : null}
          </View>
          <View style={styles.viewStyle}>
            <Text style={styles.textStyle}>{String.fullname}</Text>

            <TextInput
              style={styles.TextInputStyle}
              value={user.fullname}
              onChangeText={(text) =>
                setUser({ ...user, fullname: text }, setNameError(""))
              }
            />
            <Text style={styles.errorStyle}>{nameError}</Text>
          </View>
          <View style={styles.viewStyle}>
            <Text style={styles.textStyle}>{String.Phone_Number}</Text>

            <TextInput
              style={styles.TextInputStyle}
              value={user.phoneNumber}
              keyboardType={"numeric"}
              onChangeText={(text) =>
                setUser({ ...user, phoneNumber: text }, setPhoneError(""))
              }
            />
            <Text style={styles.errorStyle}>{phoneError}</Text>
          </View>
          <View style={styles.viewStyle}>
            <Text style={styles.textStyle}>{String.city}</Text>

            <TextInput
              style={styles.TextInputStyle}
              value={user.city}
              onChangeText={(text) =>
                setUser({ ...user, city: text }, setCityError(""))
              }
            />
            <Text style={styles.errorStyle}>{cityError}</Text>
          </View>

          <View style={styles.buttonView}>
            <TouchableOpacity style={styles.buttonTouchable} onPress={onSubmit}>
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

export default CashDeposit;

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
    height: 40,
    top: 10,
  },
  TextInputStyle: {
    height: 30,
    left: 2,
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
    top: 5,
  },

  dropdownBtnStyle: {
    top: 10,
    width: "90%",
    height: 40,
    backgroundColor: colors.black,
    borderBottomColor: colors.aqua,

    borderBottomWidth: 3,
    marginBottom: 15,
    top: -1,

    borderWidth: 1,
  },
  dropdownBtnTxtStyle: {
    color: colors.white,
    textAlign: "left",
  },
  dropdownDropdownStyle: {
    backgroundColor: colors.white,
  },
  dropdownRowStyle: {
    backgroundColor: colors.black,
    borderBottomColor: colors.aqua,
  },
  dropdownRowTxtStyle: {
    color: colors.white,
    textAlign: "left",
  },
});
