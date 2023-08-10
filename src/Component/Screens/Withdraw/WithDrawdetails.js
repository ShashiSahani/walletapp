import React from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Text,
  FlatList,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { String } from "../../utils/String";
import { useSelector } from "react-redux";
import { colors } from "../../utils/colors";

const WithdrawDetails = ({ navigation, route }) => {
  const Userdeatil = useSelector((state) => state?.user?.userDetail);
  console.log("UserD", Userdeatil);
  const coins = route?.params?.coinsData;
  console.log("coins", coins);
  const data = [
    {
      id: 1,
      Payment_name: "Bank Details",
      img_url: require("../../../assets/bank.png"),
      navigationScreen: "AddBankDetails",
    },
    {
      id: 2,
      Payment_name: "Paytm wallet",
      img_url: require("../../../assets/paytm.png"),
      navigationScreen: "PaytmModal",
    },
    {
      id: 3,
      Payment_name: "Google pay",
      img_url: require("../../../assets/google_pay.png"),
      navigationScreen: "Googlepaydetails",
    },
    {
      id: 4,
      Payment_name: "Phone Pay ",
      img_url: require("../../../assets/phone_pe.png"),
      navigationScreen: "Phonepaydetails",
    },
    {
      id: 5,
      Payment_name: "UPI",
      img_url: require("../../../assets/upi.png"),
      navigationScreen: "Upidetails",
    },
    {
      id: 6,
      Payment_name: "CashDeposite",
      img_url: require("../../../assets/hawala.png"),
      navigationScreen: "CashDeposit",
    },
    {
      id: 7,
      Payment_name: "Others",
      img_url: require("../../../assets/payment.png"),
      navigationScreen: "OtherData",
    },
  ];

  const renderItem = ({ item }) => {
    console.log("item", item);
    return (
      <View
        style={{
          height: 70,
          width: "90%",
          justifyContent: "space-between",
          alignItems: "center",
          borderColor: "#3d4562",
          borderWidth: 1,
          left: 20,
          right: 10,
          backgroundColor: "#3d4562",
          borderRadius: 10,
          flexDirection: "row",
          marginVertical: 20,
        }}
      >
        <Image
          source={item?.img_url}
          style={{ height: 40, width: 40, left: 20, borderRadius: 40 }}
        />
        <Text
          style={{
            color: colors.white,
            fontSize: 16,
            fontWeight: "600",
            textAlign: "center",
          }}
        >
          {item?.Payment_name}
        </Text>
        <View
          style={{
            backgroundColor: colors.aqua,
            height: 40,
            width: "28%",
            borderRadius: 40,
            right: 10,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(item.navigationScreen, {
                coins: coins,
              });
            }}
            style={{ justifyContent: "center", alignItems: "center", flex: 1 }}
          >
            <Text
              style={{ color: colors.white, fontSize: 16, fontWeight: 600 }}
            >
              {String.AddNew}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
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
          <Text style={{ color: colors.white, fontSize: 25 }}>
            {String.Withdraw_details}
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            backgroundColor: "#17202A",
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
          <View style={{ marginTop: 10, marginBottom: 30 }}>
            <FlatList
              data={data}
              renderItem={renderItem}
              ListHeaderComponent={() => {
                return (
                  <View
                    style={{
                      marginTop: 30,
                    }}
                  >
                    <View
                      style={{
                        height: 90,
                        width: "90%",
                        justifyContent: "center",
                        alignItems: "center",
                        borderColor: colors.wallet,
                        borderWidth: 1,
                        left: 20,
                        right: 10,
                        backgroundColor: colors.aqua,
                        borderRadius: 10,
                      }}
                    >
                      <Text
                        style={{
                          color: colors.white,
                          fontSize: 16,
                          fontWeight: "600",
                        }}
                      >
                        {Userdeatil?.name}
                      </Text>
                      <Text
                        style={{
                          color: colors.white,
                          fontSize: 16,
                          fontWeight: "600",
                          top: 5,
                        }}
                      >
                        {" "}
                        + {Userdeatil?.country_code} {Userdeatil?.phone}
                      </Text>
                    </View>
                  </View>
                );
              }}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default WithdrawDetails;
